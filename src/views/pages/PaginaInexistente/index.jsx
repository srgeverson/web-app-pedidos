import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { publicURL } from '../../../core/Config';
import '../../../assets/styles/paginaInexistente.css';

const PaginaInexistente = () => {
    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>
                                Oops!
                            </h1>
                            <h2>
                                Erro 404</h2>
                            <div className="error-details">
                                Desculpe, ocorreu um erro, página solicitada não encontrada ou servidor temporariamente indisponível!
                            </div>
                            <div className="error-actions">
                                <Link to={`${publicURL}/`} className="btn btn-primary btn-lg mt-1">
                                    <span className="glyphicon glyphicon-home"></span>
                                    Página Inicial
                                </Link>
                                <Button onClick={() => (alert("Tem que desenvolver um componente pra cá!"))} className="btn btn-default btn-lg mt-1">
                                    <span className="glyphicon glyphicon-envelope"></span>
                                    Contate o Suporte
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaInexistente;