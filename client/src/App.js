import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { check } from "./http/userAPI";

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check()
    .then(data => {
      user.setUser(data)
      user.setIsAuth(true)
    })
    .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return(
      <Container className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight}}>
        <Spinner animation='border' />
      </Container>
    )
  }

  return (
    <BrowserRouter>
      <div >
        <NavBar />
        <AppRouter />
      </div>
    </BrowserRouter>
    
  );
})

export default App;
