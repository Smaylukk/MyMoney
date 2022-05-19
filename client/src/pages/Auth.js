import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, MONEY_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = observer(() => {
  const {user, money} = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLoginPage = location.pathname === LOGIN_ROUTE

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const buttonClick = async () => {
    try {
      let data;
      if (isLoginPage) {
        data = await login(email, password)
        //console.log(data);
      } else {
        data = await registration(email, username, password)
        //console.log(data); 
      }
      
      user.setUser(data)
      user.setIsAuth(true)
      money.setUpdate(true)

      navigate(MONEY_ROUTE)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Container 
      className='d-flex justify-content-center align-items-center'
      style={{height: window.innerHeight - 56}}
    >
      <Card style={{width: 600}} className='p-3'>
        <h2 className='m-auto'>{isLoginPage ? 'Авторизація' : 'Реєстрація'}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control 
            className='mt-3'
            placeholder='Введіть ваш email...'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isLoginPage &&
            <Form.Control
              className='mt-3'
              placeholder="Введіть ваше ім'я..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /> }
          <Form.Control
            className='mt-3'
            placeholder='Введіть ваш пароль...'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Row className='d-flex justify-content-between mt-3'>
            <div className='d-flex align-items-center'>
              Немає аккаунту? <NavLink to={ isLoginPage ? REGISTRATION_ROUTE: LOGIN_ROUTE }>{isLoginPage ? 'Зареєструтесь' : 'Авторизуйтесь'}</NavLink>
              <Button
                variant={'outline-success'}
                className='ms-auto'
                onClick={() => buttonClick()}>
                {isLoginPage ? 'Увійти' : 'Зареєструватись'}
              </Button>
            </div>
          </Row>
          
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;