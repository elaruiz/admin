import React, { Component } from 'react';
import { Checkbox, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import LoadingButton from '../components/LoadingButton';
import { connect } from 'react-redux';
import { getUserInfo, saveUser } from '../redux/actions/UserAdminActions';
import { Link } from 'react-router-dom';
import { resetSavingState } from '../redux/actions/GlobalActions';
import { changePageTitle, hasError } from '../constants/functions';
import Loading from '../components/Loading';

class UsersEditPage extends Component {

    state = {
        user: {},
        error: null,
    };

    componentDidMount = () => {
        const { match, actions } = this.props;

        if (match.params.userId) {
            actions.getUserInfo(match.params.userId);
        } else {
            actions.getUserInfo(0);
        }
    };

    componentWillReceiveProps = (nextProps) => {
        const nextUser = nextProps.user;
        const nextSaving = nextProps.saving;
        const nextSaved = nextProps.saved;
        const { actions, user, saving, history } = this.props;
        if (nextUser.id !== user.id) {
            this.setState({
                user: { ...nextUser }
            }, () => {
                changePageTitle(`Usuarios - ${this.state.user.id !== -1 ? 'Editar Usuario' : 'Crear Usuario'}`)
            });
        }
        if (nextSaving !== saving && !nextSaving && nextSaved) {
            history.push('/users');
            actions.resetSavingState();
        }
        if (nextProps.error !== null) {
            nextProps.error.json()
                .then(json => this.setState({ error: json }));
        }
    };

    componentWillUnmount = () => {
        this.props.actions.resetSavingState();
    };

    render = () => {
        const { saving, loading } = this.props;
        const { user, error } = this.state;
        return (
            <Form horizontal onSubmit={this.saveUser}>
                {
                    loading ? (
                        <Loading showText text={'Cargando datos del usuario'}/>
                    ) : [
                        <FormGroup key='fg1' validationState={hasError(error, 'name') ? 'error' : null}>
                            <Col componentClass={ControlLabel} sm={2} xs={12}>Nombre</Col>
                            <Col sm={10} xs={12}>
                                <FormControl disabled={saving} type={'text'}
                                             onChange={(e) => this.updateUser('name', e.target.value)}
                                             value={user.name}/>
                            </Col>
                        </FormGroup>,
                        <FormGroup key='fg2' validationState={hasError(error, 'email') ? 'error' : null}>
                            <Col componentClass={ControlLabel} sm={2} xs={12}>Email</Col>
                            <Col sm={10} xs={12}>
                                <FormControl disabled={saving} type={'email'}
                                             onChange={(e) => this.updateUser('email', e.target.value)}
                                             value={user.email}/>
                            </Col>
                        </FormGroup>,
                        <FormGroup key='fg3' validationState={hasError(error, 'password') ? 'error' : null}>
                            <Col componentClass={ControlLabel} sm={2} xs={12}>Contraseña</Col>
                            <Col sm={10} xs={12}>
                                <FormControl disabled={saving} type={'password'}
                                             onChange={(e) => this.updateUser('password', e.target.value)}/>
                            </Col>
                        </FormGroup>,
                        <FormGroup key='fg4'>
                            <Col componentClass={ControlLabel} sm={2} xs={12}>Confirmar Contraseña</Col>
                            <Col sm={10} xs={12}>
                                <FormControl disabled={saving} type={'password'}
                                             onChange={(e) => this.updateUser('password2', e.target.value)}/>
                            </Col>
                        </FormGroup>,
                        <FormGroup key='fg5'>
                            <Col sm={10} smOffset={2} xs={12}>
                                <Checkbox disabled={saving} checked={user.admin}
                                          onChange={(e) => this.updateUser('admin', e.target.checked)}>
                                    Usuario Administrador
                                </Checkbox>
                            </Col>
                        </FormGroup>,
                        <FormGroup key='fg6'>
                            <Col sm={10} smOffset={2} xs={12}>
                                <LoadingButton className='btn-primary' icon={'save'} type={'submit'}
                                               loading={saving}>
                                    Guardar
                                </LoadingButton>&nbsp;
                                <Link className={'btn btn-default'} to={'/users'}>Cancelar</Link>
                            </Col>
                        </FormGroup>
                    ]
                }
            </Form>
        );
    };

    updateUser = (field, value) => {
        let newUser = { ...this.state.user };
        newUser[field] = value;
        this.setState({
            user: newUser
        });
    };

    saveUser = (e) => {
        e.preventDefault();
        this.props.actions.saveUser(this.state.user);
    }
}

export default connect(
    state => {
        return { ...state.users }
    },
    dispatch => {
        return {
            getUserInfo: (userId) => dispatch(getUserInfo(userId)),
            saveUser: (user) => dispatch(saveUser(user)),
            resetSavingState: () => dispatch(resetSavingState())
        }
    },
    (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, { actions: dispatchProps })
)(UsersEditPage);