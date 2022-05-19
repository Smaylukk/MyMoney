import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Image, Table } from "react-bootstrap";
import { Context } from '..';
import plus from '../assets/plus.png'
import minus from '../assets/minus.png'
import pencil from '../assets/pencil.png'
import ModalDocument from './modals/ModalDocument';

const DocumentsBar = observer(() => {
  const { money } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false)
  const [currentDocumentId, setCurrentDocumentId] = useState(null)

  return (
    <>
      <ButtonGroup aria-label="Basic example" className='mb-2'>
        <Button
          variant="success"
          onClick={(e) => {
            e.preventDefault()
            setCurrentDocumentId(null)
            setModalVisible(true)
          }}>
          Додати
        </Button>
      </ButtonGroup>
      <div style={{ height: '80vh', 'overflow-y': 'auto' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Дата</th>
              <th>Опис</th>
              <th>Сума</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {
              money.documents
                .filter((val) => val.walletId === money.selectedWallet.id)
                .map((el, index) =>
                  <tr
                    key={el.id}
                    onDoubleClick={() => {
                      alert('dbl click')
                    }}
                  >
                    <td width={40}>
                      <Image
                        width={20}
                        height={20}
                        src={el.type === 'in' ? plus : minus}
                        fluid
                        rounded
                      />
                    </td>
                    <td>{new Date(el.date).toLocaleString()}</td>
                    <td>{el.summ}</td>
                    <td>{el.comment}</td>
                    <td>
                      <Image
                        className='ms-auto border border-1 border-secondary border'
                        role='button'
                        width={20}
                        height={20}
                        src={pencil}
                        fluid
                        rounded
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setCurrentDocumentId(el.id)
                          setModalVisible(true)
                        }}
                      />
                    </td>
                  </tr>
                )
            }
          </tbody>
        </Table>
      </div>
      <ModalDocument
        show={modalVisible}
        onHide={() => {
          setModalVisible(false)
          money.setUpdate(true)
        }}
        documentId={currentDocumentId}
      />
    </>
  );
});

export default DocumentsBar;