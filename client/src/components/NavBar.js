import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Context } from '..';
import ModalAdmin from './modals/ModalAdmin';

const NavBar = observer(() => {
  const {user} = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false)
  
  const logout = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
  }

  return (
    <>
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">
            My money {user.isAuth ? `- ${user.user.email}(${user.user.username})` : ''}
        </Navbar.Brand>
        <Nav className="ms-auto">
          {user.isAuth ?
          <>
            <Button 
              className='ms-2' 
              variant={'outline-light'}
              onClick={() => setModalVisible(true)}
            >
              Адмін панель
            </Button>
            <Button 
              className='ms-2' 
              variant={'outline-light'} 
              onClick={logout}
            >
              Вийти
            </Button>
          </>
          :
          <Button variant={'outline-light'} onClick={() => logout()}>Авторизація</Button>
          }
        </Nav>
      </Container>
    </Navbar>
    <ModalAdmin show={modalVisible} onHide={() => setModalVisible(false)}/>
    </>
    )
    
});

export default NavBar;