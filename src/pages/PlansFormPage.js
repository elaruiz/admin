import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlanInfo, savePlan } from '../redux/actions/PlanAdminActions';
import { Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import LoadingButton from '../components/LoadingButton';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { resetSavingState } from '../redux/actions/GlobalActions';
import { changePageTitle, hasError } from '../constants/functions';

class PlansFormPage extends Component {

    state = {
        plan: {},
        error: null,
    };

    componentWillReceiveProps = (nextProps) => {
        const nextPlan = nextProps.plan;
        const nextSaving = nextProps.saving;
        const nextSaved = nextProps.saved;
        const { actions, plan, saving, history } = this.props;

        if (nextPlan.id !== plan.id) {
            this.setState({
                plan: { ...nextPlan }
            }, () => {
                changePageTitle(`Planes - ${this.state.plan.id !== -1 ? 'Editar Plan' : 'Crear Plan'}`)
            });
        }
        if (nextSaving !== saving && !nextSaving && nextSaved) {
            history.push('/plans');
            actions.resetSavingState();
        }
        if (nextProps.error !== null) {
            nextProps.error.json()
                .then(json => this.setState({ error: json }));
        }
    };

    componentDidMount = () => {
        const { match, actions } = this.props;

        if (match.params.planId) {
            actions.getPlanInfo(match.params.planId);
        } else {
            actions.getPlanInfo(0);
        }
    };

    componentWillUnmount = () => {
        this.props.actions.resetSavingState();
    };

    render = () => {
        const { loading, saving } = this.props;
        const { plan, error } = this.state;

        return (
            <Form horizontal onSubmit={this.submit}>
                {
                    loading ? (
                        <Loading showText text={'Cargando datos del plan'}/>
                    ) : [
                        <FormGroup key='fg1' validationState={hasError(error, 'name') ? 'error' : null}>
                            <Col componentClass={ControlLabel} sm={2} xs={12}>Nombre</Col>
                            <Col sm={10} xs={12}>
                                <FormControl type={'text'}
                                             disabled={saving}
                                             onChange={(e) => this.updatePlan('name', e.target.value)}
                                             value={plan.name}/>
                                <FormControl.Feedback/>
                            </Col>
                        </FormGroup>,
                        <FormGroup key='fg2' validationState={hasError(error, 'description') ? 'error' : null}>
                            <Col componentClass={ControlLabel} sm={2} xs={12}>Descripción</Col>
                            <Col sm={10} xs={12}>
                                <FormControl type={'text'}
                                             disabled={saving}
                                             onChange={(e) => this.updatePlan('description', e.target.value)}
                                             value={plan.description}/>
                                <FormControl.Feedback/>
                            </Col>
                        </FormGroup>,
                        <FormGroup key='fg3' validationState={hasError(error, 'reports') ? 'error' : null}>
                            <Col componentClass={ControlLabel} sm={2} xs={12}>Reportes</Col>
                            <Col sm={2} xs={12}>
                                <FormControl type={'number'}
                                             disabled={saving}
                                             onChange={(e) => this.updatePlan('reports', e.target.value)}
                                             value={plan.reports}/>
                                <FormControl.Feedback/>
                            </Col>
                        </FormGroup>,
                        <FormGroup key='fg4'
                            validationState={hasError(error, 'price') || hasError(error, 'currency') ? 'error' : null}>
                            <Col componentClass={ControlLabel} sm={2} xs={12}>Precio</Col>
                            <Col sm={2} xs={6}>
                                <FormControl type={'number'}
                                             disabled={saving}
                                             onChange={(e) => this.updatePlan('price', e.target.value)}
                                             value={plan.price}/>
                                <FormControl.Feedback/>
                            </Col>
                            <Col sm={2} xs={6}>
                                <FormControl componentClass={'select'}
                                             className={'no-feedback'}
                                             disabled={saving}
                                             onChange={(e) => this.updatePlan('currency', e.target.value)}
                                             value={plan.currency}>
                                    <option value={'EUR'}>€ (EUR)</option>
                                    <option value={'USD'}>$ (USD)</option>
                                </FormControl>
                            </Col>
                        </FormGroup>,
                        <FormGroup key='fg5'
                            validationState={hasError(error, 'interval_count') || hasError(error, 'interval_time') ? 'error' : null}>
                            <Col componentClass={ControlLabel} sm={2} xs={12}>Período</Col>
                            <Col sm={2} xs={6}>
                                <FormControl type={'number'}
                                             disabled={saving}
                                             onChange={(e) => this.updatePlan('interval_count', e.target.value)}
                                             value={plan.interval_count}/>
                                <FormControl.Feedback/>
                            </Col>
                            <Col sm={2} xs={6}>
                                <FormControl componentClass={'select'} disabled={saving}
                                             className={'no-feedback'}
                                             value={plan.interval_time}
                                             onChange={(e) => this.updatePlan('interval_time', e.target.value)}>
                                    <option value={'day'}>Día(s)</option>
                                    <option value={'week'}>Semana(s)</option>
                                    <option value={'month'}>Mes(es)</option>
                                    <option value={'year'}>Año(s)</option>
                                </FormControl>
                            </Col>
                        </FormGroup>,
                        <FormGroup key='fg6'>
                            <Col sm={10} smOffset={2} xs={12}>
                                <LoadingButton className='btn-primary' icon={'save'} type={'submit'}
                                               loading={saving}>
                                    Guardar
                                </LoadingButton>&nbsp;
                                <Link className={'btn btn-default'} to={'/plans'}>Cancelar</Link>
                            </Col>
                        </FormGroup>
                    ]
                }
            </Form>
        )
    };

    updatePlan = (field, value) => {
        let newPlan = { ...this.state.plan };
        newPlan[field] = value;
        this.setState({
            plan: newPlan
        });
    };

    submit = (e) => {
        e.preventDefault();
        this.props.actions.savePlan(this.state.plan);
    }
}

export default connect(
    state => {
        return { ...state.plans }
    },
    dispatch => {
        return {
            getPlanInfo: (planId) => dispatch(getPlanInfo(planId)),
            savePlan: (plan) => dispatch(savePlan(plan)),
            resetSavingState: () => dispatch(resetSavingState())
        }
    },
    (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, { actions: dispatchProps })
)(PlansFormPage);