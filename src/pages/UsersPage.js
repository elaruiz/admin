import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteUser, getAllUsers } from '../redux/actions/UserAdminActions';
import { Pagination } from 'react-bootstrap';
import Confirm from '../components/Confirm';
import AdminTable from '../components/AdminTable';
import Icon from '../components/Icon';
import { changePageTitle } from '../constants/functions';

class UsersPage extends Component {
    state = {
        showingDeleteConfirm: false,
        userToDelete: null
    };

    componentDidMount = () => {
        changePageTitle('Usuarios');
        if (!this.props.list.length) {
            this.props.actions.getUsers(this.props.currentPage);
        }
    };

    render = () => {
        const { list, loading, totalPages, currentPage } = this.props;
        const { showingDeleteConfirm } = this.state;
        let pagination = null;
        if (totalPages > 1) {
            pagination = (
                <Pagination key={'pagination'}
                    className='pull-right'
                    boundaryLinks={true}
                    activePage={currentPage}
                    prev={currentPage > 1}
                    next={currentPage < totalPages}
                    first={currentPage > 5}
                    last={currentPage < totalPages - 5}
                    items={totalPages}
                    maxButtons={5}
                    onSelect={this.changePage}
                />
            );
        }
        return [
            pagination,
            <Confirm key={'modal'}
                     title={'Eliminar Usuario'}
                     show={showingDeleteConfirm}
                     message={'¿Seguro que desea eliminar el usuario seleccionado?'}
                     onHide={this.hideConfirm}
                     onCancel={this.hideConfirm}
                     onAccept={this.deleteUser}
            />,
            <AdminTable key={'table'}
                        loading={loading}
                        list={list}
                        headers={['Nombre', 'Email', 'Administrador']}
                        fields={['name', 'email', u => (u.admin) ? <Icon icon={'check'}/> : '']}
                        fieldProps={[null, null, { className: 'text-center' }]}
                        headerProps={[null, null, { className: 'text-center' }]}
                        onCreate={this.createUser}
                        onEdit={this.editUser}
                        onDelete={this.showConfirm}
                        createButtonText={'Agregar Usuario'}
            />
        ];
    };

    createUser = () => {
        this.props.history.push('/users/create');
    };

    editUser = (id) => {
        this.props.history.push(`/users/${id}/edit`);
    };

    deleteUser = () => {
        const { userToDelete } = this.state;
        const { actions } = this.props;
        actions.deleteUser(userToDelete);
        this.hideConfirm();
    };

    hideConfirm = () => {
        this.setState({
            showingDeleteConfirm: false,
            userToDelete: null
        })
    };

    showConfirm = (id) => {
        this.setState({
            showingDeleteConfirm: true,
            userToDelete: id
        });
    };

    changePage = (eventKey) => {
        //window.location.href=`/#/users?page=${eventKey}`;
        this.props.actions.getUsers(eventKey);
    }
}

export default connect(
    state => {
        return { ...state.users }
    },
    dispatch => {
        return {
            getUsers: (page) => dispatch(getAllUsers(page)),
            deleteUser: (id) => dispatch(deleteUser(id))
        }
    },
    (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, { actions: dispatchProps })
)(UsersPage);