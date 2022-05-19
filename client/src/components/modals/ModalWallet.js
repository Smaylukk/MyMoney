import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { changeWallet, createWallet, deleteWallet, getAllCurrency, getWallet } from '../../http/moneyAPI';

const ModalWallet = ({show, onHide, walletId}) => {
  const [name, setName] = useState('')
  const [currency, setCurrency] = useState(0)
  const [currencyList, setCurrencyList] = useState([])

  useEffect(() => {
    //отримання списку валют
    getAllCurrency()
    .then(data => {
      setCurrencyList(data);
    })
  }, [])

  useEffect(() => {
    //читання даних гаманця
    //console.log(walletId);
    if (walletId !== null) {
      getWallet(walletId)
        .then(data => {
          setName(data.name)
          setCurrency(data.currencyId)
        })
    }else{
      setName('')
      setCurrency(0)
    }
  }, [show])

  const saveThisWallet = () => {
    if (walletId === null) {
      createWallet({ name, currencyId: currency })
        .then(data => onHide())
        .catch(reason => console.log(reason))  
    } else {
      changeWallet( walletId, {name, currencyId: currency })
        .then(data => onHide())
        .catch(reason => console.log(reason))
    }
  }

  const deleteThisWallet = () => {
    if (walletId !== null) {
      deleteWallet(walletId)
        .then(data => onHide())
        .catch(reason => console.log(reason))
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Гаманець
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Назва гаманця</Form.Label>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={"Введіть назву гаманця"}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Валюта гаманця</Form.Label>
            <Form.Select
              aria-label="Валюта гаманця"
              value={currency}
              onChange={e => setCurrency(e.target.value)}
            >
              <option value={0}>Виберіть валюту</option>
              {currencyList.map(el =>
                <option key={el.id} value={el.id}>{el.name}</option>
              )}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onHide}>Закрити</Button>
        {(walletId !== null) && <Button variant="outline-danger" onClick={deleteThisWallet}>Видалити</Button>}
        <Button variant="outline-success" onClick={saveThisWallet}>Зберегти</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWallet;