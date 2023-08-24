// import React, { useContext } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { Context } from '../context';
// import { publicURL } from '../Config';

// const AuthorizeRoutes = () => {
//     const { token } = useContext(Context);
//     if (token)
//         return <Outlet />
//     else
//         return <Navigate to={`${publicURL}/`} state={{ erro: true, mensagem: 'Usuário não autenticado!' }} replace />
// }

// export default AuthorizeRoutes;
import React, { createContext, useContext, useEffect, useState } from "react";
import { nomeVariaveis } from "../Config";
import ModalCarregando from "../../views/components/ModalCarregando";

const AppContext = createContext();

const AuthorizeContext = ({ children }) => {

    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getToken = () => {
            const tokenLocal = localStorage.getItem(nomeVariaveis.token);
            if (tokenLocal)
                setToken(tokenLocal);
            setLoading(false);
        }

        getToken();
    }, []);

    const handleLogout = () => localStorage.removeItem(nomeVariaveis.token);

    const salvarToken = (tokenParaSalvar) => localStorage.setItem(nomeVariaveis.token, tokenParaSalvar);

    if (loading)
        return <ModalCarregando isOpen={true} pagina='Procurando usuário logado...' />;
    return (
        <AppContext.Provider value={{ token, handleLogout, salvarToken }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => useContext(AppContext);

export { AuthorizeContext, useAppContext };