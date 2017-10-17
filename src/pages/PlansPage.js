import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePlan, getAllPlans } from '../redux/actions/PlanAdminActions';
import Confirm from '../components/Confirm';
import AdminTable from '../components/AdminTable';
import { changePageTitle } from '../constants/functions';


class PlansPage extends Component {
    state = {
        showingDeleteConfirm: false,
        planToDelete: null
    };

    componentDidMount = () => {
        changePageTitle('Planes');
        if (!this.props.list.length) {
            this.props.actions.getPlans();
        }
    };

    render = () => {
        const { list, loading } = this.props;
        const { showingDeleteConfirm } = this.state;
        const headerProps = [
            null, null,
            {
                className: 'text-right fit'
            }
        ];
        const fieldProps = [
            null, null,
            {
                className: 'text-right fit'
            }
        ];
        return [
            <Confirm key={'modal'}
                     title={'Eliminar Plan'}
                     show={showingDeleteConfirm}
                     message={'¿Seguro que desea eliminar el plan seleccionado?'}
                     onHide={this.hideConfirm}
                     onCancel={this.hideConfirm}
                     onAccept={this.deletePlan}
            />,
            <AdminTable key={'table'}
                        loading={loading}
                        list={list}
                        headers={['Nombre', 'Descripción', 'Precio']}
                        fields={[
                            'name',
                            'description',
                            (p) => `${p.price} ${p.currency}`.toUpperCase()
                        ]}
                        headerProps={headerProps}
                        fieldProps={fieldProps}
                        createButtonText={'Agregar Plan'}
                        onCreate={this.createPlan}
                        onEdit={this.editPlan}
                        onDelete={this.showConfirm}
            />
        ];
    };

    createPlan = () => {
        this.props.history.push('/plans/create');
    };

    editPlan = (id) => {
        this.props.history.push(`/plans/${id}/edit`);
    };

    deletePlan = () => {
        const { planToDelete } = this.state;
        const { actions } = this.props;
        actions.deletePlan(planToDelete);
        this.hideConfirm();
    };

    hideConfirm = () => {
        this.setState({
            showingDeleteConfirm: false,
            planToDelete: null
        })
    };

    showConfirm = (id) => {
        this.setState({
            showingDeleteConfirm: true,
            planToDelete: id
        });
    };
}

export default connect(
    state => {
        return { ...state.plans }
    },
    dispatch => {
        return {
            getPlans: () => dispatch(getAllPlans()),
            deletePlan: (id) => dispatch(deletePlan(id))
        }
    },
    (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, { actions: dispatchProps })
)(PlansPage);