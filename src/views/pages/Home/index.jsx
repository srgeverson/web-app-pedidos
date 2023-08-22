import React, { useEffect, useState } from 'react';
import UsuarioService from '../../../service/UsuarioService';
import Alerta from '../../components/Alerta';
import ModalCarregando from '../../components/ModalCarregando';
import { useLocation } from 'react-router-dom';

const Home = () => {

    const usuarioService = new UsuarioService();
    const [retorno, setRetorno] = useState('');
    const [aguardando, setAguardando] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location && location.state)
            setRetorno(location.state);
        gerarToken();
        // eslint-disable-next-line
    }, []);

    const gerarToken = async () => {
        setAguardando(true);
        const tokenExistente = usuarioService.getToken()
        console.log(tokenExistente)
        if (!tokenExistente) {
            const tokenGerado = await usuarioService.token();
            console.log(tokenGerado);
            if (tokenGerado.statusCode)
                setRetorno(tokenGerado);
            else
                usuarioService.salvarToken(tokenGerado.access_token);
        }
        setAguardando(false);
    }

    return (
        <div className="d-flex justify-content-between">
            <div className="alert alert-success" role="alert">
            <Alerta retorno={retorno} />
            <ModalCarregando isOpen={aguardando} pagina='Autenticando a aplicação...' />
                <h4 className="alert-heading">Bem-vindo ao nosso Sistema de Gestão de Pedidos!</h4>
                <p>É com imenso prazer que lhe damos as boas-vindas à nossa plataforma de gestão de pedidos. Estamos aqui para simplificar e otimizar todo o processo de gerenciamento de pedidos, desde o momento em que são feitos até a sua conclusão.</p>
                <hr />
                <p className="mb-0">Mais uma vez, seja bem-vindo ao nosso Sistema de Gestão de Pedidos! Esperamos que você desfrute da praticidade e eficiência que ele oferece em todas as etapas do seu processo de pedido.
                </p>
            </div>
        </div>
    );
}

export default Home;