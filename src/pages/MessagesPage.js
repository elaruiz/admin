import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePageTitle } from '../constants/functions';
import { deleteMessage, getAllMessages } from '../redux/actions/MessagesAdminActions';
import Confirm from '../components/Confirm';
import AdminTable, { defaultActions } from '../components/AdminTable';
import moment from 'moment/moment';

class MessagesPage extends Component {

    state = {
        showingDeleteConfirm: false,
        messageToDelete: null
    };

    componentDidMount = () => {
        changePageTitle('Mensajes');
        if (!this.props.list.length) {
            this.props.actions.getMessages();
        }
    };

    render = () => {
        const { list, loading } = this.props;
        const { showingDeleteConfirm } = this.state;
        const buttons = [
            {
                icon: 'eye',
                text: 'Leer',
                action: this.readMessage
            },
            { ...defaultActions.delete, action: this.showConfirm }
        ];
        return [
            <Confirm
                key={'modal'}
                title={'Eliminar Mensaje'}
                show={showingDeleteConfirm}
                message={'¿Seguro que desea eliminar el mensaje seleccionado?'}
                onHide={this.hideConfirm}
                onCancel={this.hideConfirm}
                onAccept={this.deleteMessage}
            />,
            <AdminTable
                key={'table'}
                loading={loading}
                list={list}
                headers={['Remitente', 'Asunto', 'Fecha']}
                fields={[
                    'sender',
                    'subject',
                    (m) => moment(m.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY hh:mm:ss a')
                ]}
                fieldProps={[{ className: 'fit' }, null, { className: 'fit text-right' }]}
                canCreate={false}
                buttons={buttons}
            />
        ];
    };

    readMessage = (id) => {
        this.props.history.push(`/messages/${id}/read`);
    };

    deleteMessage = () => {
        const { messageToDelete } = this.state;
        const { actions } = this.props;
        actions.deleteMessage(messageToDelete);
        this.hideConfirm();
    };

    hideConfirm = () => {
        this.setState({
            showingDeleteConfirm: false,
            messageToDelete: null
        })
    };

    showConfirm = (id) => {
        this.setState({
            showingDeleteConfirm: true,
            messageToDelete: id
        });
    };
}

export default connect(
    state => {
        return { ...state.messages };
    },
    dispatch => {
        return {
            getMessages: (page) => dispatch(getAllMessages(page)),
            deleteMessage: (id) => dispatch(deleteMessage(id))
        };
    },
    (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, { actions: dispatchProps })
)(MessagesPage);