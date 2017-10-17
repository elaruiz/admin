import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doLogin } from '../redux/actions/UserActions';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import Messages from './Messages';
import Icon from './Icon';
import LoadingButton from './LoadingButton';

import '../sass/LoginForm.css';

class LoginForm extends Component {

    state = {
        user: '',
        pass: ''
    };

    render = () => {
        const { loading, error } = this.props;
        let errorMessage = null;

        if(error) {
            if (error.message === 'Failed to fetch') {
                errorMessage = 'Error de conexión con el servidor';
            }
            if (error.status === 401) {
                errorMessage = 'Usuario o contraseña incorrectos';
            }
        }

        return (
            <form className={'login-form'} onSubmit={this.submitForm}>
                <Messages.Error visible={errorMessage !== null}
                                message={errorMessage}
                                dismissible/>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon><Icon icon={'user'}/></InputGroup.Addon>
                        <FormControl
                            type={'text'}
                            value={this.state.user}
                            placeholder={'Usuario'}
                            disabled={loading}
                            onChange={this.updateUser}
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon><Icon icon={'key'}/></InputGroup.Addon>
                        <FormControl
                            type='password'
                            disabled={loading}
                            value={this.state.pass}
                            placeholder='Contraseña'
                            onChange={this.updatePass}/>
                    </InputGroup>
                </FormGroup>

                <LoadingButton block type={'submit'}
                               bsStyle={'primary'}
                               loading={loading}
                               disabled={loading}>
                    {loading ? 'Iniciando Sesión' : 'Iniciar Sesión'}
                </LoadingButton>
            </form>
        );
    };

    updateUser = (event) => {
        this.setState({
            user: event.target.value
        });
    };

    updatePass = (event) => {
        this.setState({
            pass: event.target.value
        });
    };

    submitForm = (e) => {
        e.preventDefault();
        const { user, pass } = this.state;
        this.props.actions.doLogin(user, pass);
    };
}

export default connect(
    state => ({
        loading: state.user.loading,
        error: state.user.error
    }),
    dispatch => {
        return {
            doLogin: (user, pass) => dispatch(doLogin(user, pass))
        }
    },
    (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, { actions: dispatchProps })
)(LoginForm)