import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { Context } from '..';
import { authRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE, MONEY_ROUTE } from '../utils/consts';

const AppRouter = observer(() => {
  const {user} = useContext(Context);

  //console.log(user);
  return (
    <Routes>
      {user.isAuth === true && authRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={Component} />
      )}
      
      {publicRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} element={Component} />
      )}
      <Route key={'*'} path={'*'} element={user.isAuth ? <Navigate to={MONEY_ROUTE} /> : <Navigate to={LOGIN_ROUTE} /> } />
    </Routes>
  )
})

export default AppRouter;