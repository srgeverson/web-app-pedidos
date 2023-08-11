import React from 'react';
import { Link } from 'react-router-dom';
import { publicURL, rotas } from '../../../core/Config';
import { Navbar } from 'reactstrap';
import '../../../assets/styles/barraDeFerramentas.css';

const BarraDeFerramentas = ({ alternarMenu }) => {
    return (
        <Navbar color="info" dark expand="md">
            <div><span className="navbar-toggler-icon cursor mr-1" onClick={() => alternarMenu()}></span></div>
            <div><Link className="navbar-brand" to={`${publicURL}${rotas.paginaInicial}`}>Sistema de Gestão de Pedidos</Link></div>
            <div></div>
        </Navbar>
    );
}

export default BarraDeFerramentas;