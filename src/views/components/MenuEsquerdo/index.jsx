import React from 'react';
import { Link } from 'react-router-dom';
import { publicURL, rotas } from '../../../core/Config';

const MenuEsquerdo = ({ ativo }) => {
    return (
        <nav className={ativo ? "sidebar bg-secondary" : "sidebar bg-secondary toggled"}>
            <ul className="list-unstyled">
                <li><Link to={`${publicURL}${rotas.paginaInicial}`}><span className='ms-1'>Página Inicial</span></Link></li>
                <li><Link to={`${publicURL}${rotas.listaDeProdutos}`}><span className='ms-1'>Produtos</span></Link></li>
                <li><Link to={`${publicURL}${rotas.listaDeFornecedor}`}><span className='ms-1'>Fornecedores</span></Link></li>
                <li><Link to={`${publicURL}${rotas.listaDePedidos}`}><span className='ms-1'>Pedidos</span></Link></li>
            </ul>
        </nav>
    );
}

export default MenuEsquerdo;