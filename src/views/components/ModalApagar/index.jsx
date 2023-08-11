
import React from 'react';
import { FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

import BotaoCancelar from '../BotaoCancelar';
import BotaoApagar from '../BotaoApagar';

const ModalApagar = (props) => {
    return (
        <div>
            <Modal isOpen={props.isOpen} toggle={props.toogle}>
                <ModalHeader toggle={props.toogle}>Excluir {props.apagar}</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <div>
                            <Alert color="danger">
                                <h4 className="alert-heading">Atenção!</h4>
                                <p>
                                    Após a confirmação desta tela, os dados não poderão ser recuperados!
                                </p>
                                <hr />
                                <p className="mb-0">
                                    Tem certeza que quer excluir?
                                </p>
                            </Alert>
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <BotaoCancelar className="m-1" onClickCancelar={props.toogle} />
                    <span onClick={() => props.apagarObjeto()}>
                        <BotaoApagar className="m-1" aguardando={props.aguardando} />
                    </span>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalApagar;