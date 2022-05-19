import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Image, ListGroup } from "react-bootstrap";
import { Context } from '..';
import ModalWallet from './modals/ModalWallet';
import pencil from "../assets/pencil.png"

const WalletBar = observer(() => {
  const { money } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false)
  const [currentWalletId, setCurrentWalletId] = useState(null)

  return (
    <>
      <ButtonGroup aria-label="Basic example" className='mb-2'>
        <Button 
          variant="success"
          onClick={(e) => {
            e.preventDefault()
            setCurrentWalletId(null)
            setModalVisible(true)
            }}>
          Додати
        </Button>
      </ButtonGroup>
      <ListGroup style={{ height: '80vh', 'overflow-y': 'auto'}}>
        {
          money.wallets.map((el, index) => 
            <ListGroup.Item 
              key={el.id} 
              variant='light'
              onClick={(e) => {
                e.preventDefault()
                if (money.selectedWallet === el) {
                  money.setSelectedWallet({});
                } else {
                  money.setSelectedWallet(el);
                }
              }}>
              <Card 
                bg={money.selectedWallet.id === el.id ? 'warning' : 'success'}
                text='white'>
                <Card.Header as="h5">
                  {el.name}
                </Card.Header>
                <Card.Body className='d-flex'>
                  <Card.Title>{el.sum === null ? 0 : el.sum} {el.currency}</Card.Title>
                  <Image
                    className='ms-auto border border-2 border-secondary border'
                    role='button'
                    width={30}
                    height={30}
                    src={pencil}
                    fluid
                    rounded
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setCurrentWalletId(el.id)
                      setModalVisible(true)
                    }}
                  />
                </Card.Body>
              </Card>
            </ListGroup.Item>
        )}
      </ListGroup>
      <ModalWallet 
        show={modalVisible} 
        onHide={() => {
          money.setUpdate(true)
          setModalVisible(false)
        }}
        walletId={currentWalletId}
      />
    </>
  );
});

export default WalletBar;