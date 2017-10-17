import React, { Component } from 'react';
import ErrorImage from '../img/404.jpg';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { changePageTitle } from '../constants/functions';

import '../sass/ErrorPage.css';

class ErrorPage extends Component {
    componentDidMount = () => {
        changePageTitle('Error - Página no encontrada')
    };

    render = () => {
        return (
            <Col xs={12} className={'text-center'}>
                <img className={'error-image'} src={ErrorImage} alt={'Página no encontrada'}/>
                <p>
                    <Link to={'/'}>Regresar al inicio</Link>
                </p>
            </Col>
        );
    };
}

export default ErrorPage;