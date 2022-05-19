import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { changeDocument, createDocument, deleteDocument, getDocument, getAllWallet } from '../../http/moneyAPI';

const ModalDocument = observer(({show, onHide, documentId}) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, -1))
  const [type, setType] = useState('in')
  const [source, setSource] = useState('')
  const [comment, setComment] = useState('')
  const [summ, setSumm] = useState(0)
  const [wallet, setWallet] = useState(0)
  const [walletList, setWalletList] = useState([])
  const [readonly, setReadonly] = useState(false)

  useEffect(() => {
    //отримання списку гаманців
    getAllWallet()
      .then(data => {
        setWalletList(data);
      })
  }, [show])

  useEffect(() => {
    //читання даних гаманця
    //console.log(documentId);
    if (documentId !== null) {
      getDocument(documentId)
        .then(data => {
          if (data) {
            setDate(new Date(data.date).toISOString().slice(0, -1))
            setType(data.type)
            setSource(data.source)
            setComment(data.comment)
            setSumm(data.summ)
            setWallet(data.walletId);
          }
        })
        .catch(reason => console.log(reason))
    }else{
      setDate(new Date().toISOString().slice(0, -5))
      setType('in')
      setSource('')
      setComment('')
      setSumm(0)
      setWallet(0);
    }
  }, [show])

  const saveThisDocument = () => {
    if (wallet === 0) {
      alert('Не вибрано гаманець')
      return;
    }

    setReadonly(true)
    if (documentId === null) {
      createDocument({ 
        date,
        type,
        source,
        comment,
        summ,
        walletId: wallet
       })
        .then(data => onHide())
        .catch(reason => console.log(reason))  
        .finally(() => setReadonly(false))
    } else {
      changeDocument(documentId, {
        date: new Date(date).toISOString(),
        type,
        source,
        comment,
        summ,
        walletId: wallet
      })
        .then(data => onHide())
        .catch(reason => console.log(reason))
        .finally(() => setReadonly(false))
    }
  }

  const deleteThisDocument = () => {
    setReadonly(true)

    if (documentId !== null) {
      deleteDocument(documentId)
        .then(data => onHide())
        .catch(reason => console.log(reason))
        .finally(() => setReadonly(false))
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      disabled={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Операція
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Гаманець</Form.Label>
            <Form.Select
              aria-label="Гаманець"
              value={wallet}
              onChange={e => setWallet(e.target.value)}
            >
              <option value={0}>Виберіть гаманець</option>
              {walletList.map(el =>
                <option key={el.id} value={el.id}>{el.name}</option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Дата операції</Form.Label>
            <Form.Control
              value={date}
              type='datetime-local'
              onChange={e => {
                setDate(e.target.value)
              }}
              placeholder={"Введіть дату операції"}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Тип операції</Form.Label>
            <Form.Select
              aria-label="Тип операції"
              value={type}
              onChange={e => setType(e.target.value)}>
              <option value={'in'}>Надходження</option>
              <option value={'out'}>Витрата</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{type === 'in' ? 'Від кого' : 'Кому'}</Form.Label>
            <Form.Control
              value={source}
              onChange={e => setSource(e.target.value)}
              placeholder={""}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Опис</Form.Label>
            <Form.Control
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder={"Введіть опис операції"}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Сума</Form.Label>
            <Form.Control
              value={summ}
              type='number'
              onChange={e => setSumm(Number(e.target.value))}
              placeholder={"Введіть суму операції"}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="outline-dark" 
          disabled={readonly} 
          onClick={onHide}>
            Закрити
        </Button>
        {(documentId !== null) && 
          <Button 
          variant="outline-danger" 
            disabled={readonly} 
          onClick={deleteThisDocument}>
            Видалити
          </Button>}
        <Button 
          variant="outline-success" 
          disabled={readonly} 
          onClick={saveThisDocument}>
          Зберегти
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default ModalDocument;