import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Context } from '..'
import BalanceBar from '../components/BalanceBar';
import DocumentsBar from '../components/DocumentsBar';
import WalletBar from '../components/WalletBar';
import { getAllDocument, getBalanceCurrency, getBalanceWallets } from '../http/moneyAPI';

const Money = observer(() => {
  const {money} = useContext(Context)
  const [loadingBalance, setLoadingBalance] = useState(true)
  const [loadingWallet, setLoadingWallet] = useState(true)
  const [loadingDocs, setLoadingDocs] = useState(true)
  const [update, setUpdate] = useState(true)
  
  useEffect(() => {
    //console.log('Upd 1');
    if (money.update) {
      //console.log('Upd 2');
      setLoadingBalance(true)
      setLoadingWallet(true)
      setLoadingDocs(true)

      getBalanceCurrency()
        .then(data => money.setBalance(data))
        .catch(reason => money.setBalance([]))
        .finally(() => setLoadingBalance(false))

      getBalanceWallets()
        .then(data => money.setWallets(data))
        .catch(reason => money.setWallets([]))
        .finally(() => setLoadingWallet(false))

      getAllDocument()
        .then(data => money.setDocuments(data))
        .catch(reason => money.setDocuments([]))
        .finally(() => setLoadingDocs(false))
    
      money.setUpdate(false)
    }
  }, [money.update])

  return (
    <Container>
      <Row className='mt-2'>
        <Col md={2}>
          <h2>Ваш баланс:</h2>
          {loadingBalance ? <Spinner animation="border" variant="primary" /> : <BalanceBar />}
        </Col>
        <Col md={5}>
          <h2>Ваші гаманці:</h2>
          {loadingWallet ? <Spinner animation="border" variant="success" /> : <WalletBar />}
        </Col>
        <Col md={5}>
          <h2>Операції:</h2>
          {loadingDocs ? <Spinner animation="border" variant="info" /> : <DocumentsBar/>}
        </Col>
      </Row>
    </Container>
  );
});

export default Money;