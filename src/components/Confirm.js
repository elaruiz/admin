import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from './ModalShim';

const Confirm = ({
                     title = null,
                     message = '',
                     show = false,
                     onHide = () => {},
                     onAccept = () => {},
                     onCancel = () => {}
                 }) => {
    return (
        <Modal show={show} onHide={onHide}>
            { title && <Modal.Header closeButton>{title}</Modal.Header>}
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onAccept}>Aceptar</Button>
                <Button onClick={onCancel}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default Confirm;