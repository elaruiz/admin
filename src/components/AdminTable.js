import React from 'react';
import Loading from './Loading';
import { Table } from 'react-bootstrap';
import IconButton from './IconButton';
import LoadingButton from './LoadingButton';
import { resolveFields } from '../constants/functions';

export const defaultActions = {
    edit: {
        icon: 'edit',
        text: 'Editar',
        action: (id) => {
        }
    },
    'delete': {
        icon: 'trash',
        text: 'Eliminar',
        props: {
            bsStyle: 'danger'
        },
        action: (id) => {
        }
    }
};

const ObjectRow = ({
                       object,
                       fields = [],
                       fieldProps = [],
                       idField = 'id',
                       buttons = []
                   }) => {
    return (
        <tr className={object.deleting && 'danger'}>
            {
                fields.map((field, i) => (
                    <td key={`field${i}`} {...fieldProps[i]}>
                        {
                            (typeof field === 'string') ? resolveFields(object, field) : field(object)
                        }
                    </td>
                ))
            }
            {
                !object.deleting ? (
                    buttons.length ? (
                        buttons.map(({ icon = '', text, action, props = {} }, i) => (
                            <td className='fit' key={`action${object[idField]}${i}`}>
                                <LoadingButton
                                    {...props}
                                    icon={icon}
                                    onClick={() => action(object[idField])}>
                                    {text}
                                </LoadingButton>
                            </td>
                        ))
                    ) : null
                ) : (
                    <td className={'fit text-center'} colSpan={buttons.length}>
                        <LoadingButton bsStyle={'link'} loading block disabled>Eliminando</LoadingButton>
                    </td>
                )
            }
        </tr>
    );
};

const AdminTable = ({
                        loading,
                        list = [],
                        headers = [],
                        fields = [],
                        canCreate = true,
                        onCreate = () => {
                        },
                        onEdit = (id) => {
                        },
                        onDelete = (id) => {
                        },
                        headerProps = [],
                        fieldProps = [],
                        createButtonText = 'Agregar',
                        idField = 'id',
                        buttons = [
                            { ...defaultActions.edit, action: onEdit },
                            { ...defaultActions.delete, action: onDelete }
                        ]
                    }) => {
    return [
        (canCreate && (
                <p key={'addbutton'}>
                    <IconButton icon={'plus'} className={'btn-primary'} onClick={onCreate}>
                        {createButtonText}
                    </IconButton>
                </p>
            )
        ),
        <Table striped hover responsive key={'table'}>
            <thead>
            <tr>
                {
                    headers.map((header, i) => <th key={`header${i}`} {...headerProps[i]}>{header}</th>)
                }
                {buttons.length ? <th colSpan={buttons.length}>&nbsp;</th> : null}
            </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr>
                    <td colSpan={headers.length + buttons.length}>
                        <Loading/>
                    </td>
                </tr>
            ) : (
                list.length ? (
                    list.map(object => <ObjectRow object={object}
                                                  idField={idField}
                                                  fields={fields}
                                                  fieldProps={fieldProps}
                                                  buttons={buttons}
                                                  key={`object${object[idField]}`}/>)
                ) : (
                    <tr>
                        <td colSpan={headers.length + buttons.length} className={'text-center'}>
                            <p>No hay registros para mostrar</p>
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </Table>
    ];
};

export default AdminTable;