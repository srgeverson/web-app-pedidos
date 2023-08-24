// import React, { useEffect, useState, createContext, useContext } from "react";
// import { nomeVariaveis } from "../Config";

// const AppContext = createContext({});

// const AuthProvider = (props) => {

//   const [token, setToken] = useState(undefined);

//   const getToken = () => setToken(localStorage.getItem(nomeVariaveis.token));

//   const limparToken = () => localStorage.removeItem(nomeVariaveis.token);

//   const salvarToken = (accessToken) =>{
//     localStorage.setItem(nomeVariaveis.token, JSON.stringify(accessToken));
//     getToken();
//   }

//   useEffect(() => {
//     if(!token){
//       console.log('provider...');
//       getToken();
//     }
//     // eslint-disable-next-line
//   }, [token]);

//   return (
//     <AppContext.Provider value={{ token, getToken, limparToken, salvarToken }}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// const useAuth = () => useContext(AppContext);

// export { AuthProvider, useAuth };

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