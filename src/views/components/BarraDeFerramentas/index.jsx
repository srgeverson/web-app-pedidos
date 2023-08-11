import React from 'react';
import { Link } from 'react-router-dom';
import { publicURL } from '../../../core/Config';
import { Navbar } from 'reactstrap';
import '../../../assets/styles/barraDeFerramentas.css';

const BarraDeFerramentas = ({ alternarMenu }) => {
    return (
        <Navbar color="success navbar-dark" light expand="md">
            <span className="navbar-toggler-icon cursor mr-1" onClick={() => alternarMenu()}></span>
            <Link className="navbar-brand" to={`${publicURL}/`}>Sistema de Gestão de Pedidos</Link>
        </Navbar>
    );
}

export default BarraDeFerramentas;