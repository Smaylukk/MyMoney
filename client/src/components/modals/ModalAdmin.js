import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { changePassword } from '../../http/userAPI';

const ModalAdmin = ({ show, onHide }) => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    setPassword('')
    setNewPassword('')
    setRepeatNewPassword('')
    setUsername('')
  }, [show])

  const changePasswordHandler = async () => {
    //validation
    if (newPassword !== repeatNewPassword) {
      alert('Нові паролі не співпадають')
      return
    }

    try {
      const res = await changePassword(password, newPassword)
      alert(res.message)
      onHide()
    } catch (error) {
      alert(error.message)
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
          Адмін панель
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Зміна паролю</h4>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Поточний пароль</Form.Label>
            <Form.Control
              value={password}
              type='password'
              onChange={e => setPassword(e.target.value)}
              placeholder={"Введіть поточний пароль"}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Новий пароль</Form.Label>
            <Form.Control
              value={newPassword}
              type='password'
              onChange={e => setNewPassword(e.target.value)}
              placeholder={"Введіть новий пароль"}
              isInvalid={newPassword !== repeatNewPassword}
            />
          </Form.Group><Form.Group className="mb-3">
            <Form.Label>Повторно новий пароль</Form.Label>
            <Form.Control
              value={repeatNewPassword}
              type='password'
              onChange={e => setRepeatNewPassword(e.target.value)}
              placeholder={"Введіть повторно новий пароль"}
              isInvalid={newPassword !== repeatNewPassword}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onHide}>Закрити</Button>
        <Button variant="outline-success" onClick={changePasswordHandler}>Змінити пароль</Button>
      </Modal.Footer>

      <Modal.Body>
        <h4>Зміна імені користувача</h4>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Нове ім'я користувача</Form.Label>
            <Form.Control
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder={"Введіть нове ім'я користувача"}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onHide}>Закрити</Button>
        <Button variant="outline-success" onClick={onHide}>Змінити ім'я</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAdmin;