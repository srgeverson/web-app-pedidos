import React from 'react';
import { Link } from 'react-router-dom';
import { publicURL } from '../../../core/Config';

const MenuEsquerdo = ({ ativo }) => {
    return (
        <nav className={ativo ? "sidebar bg-secondary" : "sidebar bg-secondary toggled"}>
            <ul className="list-unstyled">
                <li><Link to={`${publicURL}/`}><span className='ms-1'>Página Inicial</span></Link></li>
                <li><Link to={`${publicURL}/produto`}><span className='ms-1'>Produtos</span></Link></li>
                <li><Link to={`${publicURL}/fornecedor`}><span className='ms-1'>Fornecedores</span></Link></li>
                <li><Link to={`${publicURL}/pedido`}><span className='ms-1'>Pedidos</span></Link></li>
            </ul>
        </nav>
    );
}

export default MenuEsquerdo;