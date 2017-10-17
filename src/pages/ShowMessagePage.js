import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessageInfo } from '../redux/actions/MessagesAdminActions';
import { Col, ControlLabel, Form, FormControl, FormGroup, Panel } from 'react-bootstrap';
import moment from 'moment/moment';
import 'moment/locale/es';
import IconButton from '../components/IconButton';
import Loading from '../components/Loading';

class ShowMessagePage extends Component {
    componentDidMount = () => {
        const { actions, match } = this.props;
        actions.getMessage(match.params.messageId);
    };

    render = () => {
        const { loadingMessage, message } = this.props;
        const messageDate = moment(message.created_at, 'YYYY-MM-DD HH:mm:ss');
        return loadingMessage ? (
            <Loading showText text={'Cargando Mensaje...'}/>
        ) : [
            <p key={'gobackbutton'}>
                <IconButton icon={'chevron-left'} onClick={this.goBack}>
                    Regresar
                </IconButton>
            </p>,
            <Panel key={'msgpanel'} bsStyle={'primary'} header={message.subject}>
                <Form horizontal>
                    <FormGroup>
                        <Col sm={2} xs={12}>
                            <ControlLabel>Remitente</ControlLabel>
                        </Col>
                        <Col sm={10} xs={12}>
                            <FormControl.Static>
                                {message.sender}&nbsp;
                                {
                                    message.mail ? (
                                        (<a href={`mailto:${message.email}`}>{message.email}</a>)
                                    ) : null
                                }

                            </FormControl.Static>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2} xs={12}>
                            <ControlLabel>Fecha</ControlLabel>
                        </Col>
                        <Col sm={10} xs={12}>
                            <FormControl.Static>
                                {`${messageDate.format('DD MMMM YYYY')} a las ${messageDate.format('hh:mm:ss a')}`}&nbsp;
                                ({messageDate.fromNow()})
                            </FormControl.Static>
                        </Col>
                    </FormGroup>
                    {
                        message.phone && (
                            <FormGroup>
                                <Col sm={2} xs={12}>
                                    <ControlLabel>Teléfono</ControlLabel>
                                </Col>
                                <Col sm={10} xs={12}>
                                    <FormControl.Static>
                                        <a href={`tel:${message.phone}`}>{message.phone}</a>
                                    </FormControl.Static>
                                </Col>
                            </FormGroup>
                        )
                    }
                    {message.content}
                </Form>
            </Panel>
        ];
    };

    goBack = () => {
        this.props.history.goBack();
    }
}

export default connect(
    state => {
        return { ...state.messages };
    },
    dispatch => {
        return {
            getMessage: (id) => dispatch(getMessageInfo(id))
        };
    },
    (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, { actions: dispatchProps })
)(ShowMessagePage);