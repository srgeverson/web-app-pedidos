import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { publicURL, rotas } from '../Config';
import { useAppContext } from '../Context';

const AuthorizeProvider = () => {
  const { token } = useAppContext();
  if (token)
    return <Outlet />
  else
    return <Navigate to={`${publicURL}${rotas.login}`} state={{ statusCode: 401, mensagem: 'Usuário não autenticado!' }} replace />
}

export default AuthorizeProvider;