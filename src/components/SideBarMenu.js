import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { MENUS } from '../constants/constants';
import Icon from './Icon';

import '../sass/SideBarMenu.css';

const ServiceStatus = ({ status, text }) => [
    <Icon icon={status === 'unknown' ? 'circle-o-notch' : (status === 'OK') ? 'check' : 'remove'}
          className={{
              'fa-spin': status === 'unknown',
              'sidebarmenu-icon': true,
              'unknown': status === 'unknown',
              'ok': status === 'OK',
              'error': status === 'error'
          }}
    />,
    text
];

const SideBarMenu = ({ services }) => [
    <ListGroup key={'navitems'}>
        {
            MENUS.map((menu, i) => (
                <Link key={`sidemenu${i}`} to={menu.url} className={'list-group-item'}>
                    <Icon className={'sidebarmenu-icon'} icon={menu.icon}/>
                    {menu.text}
                </Link>
            ))
        }
    </ListGroup>,
    <ListGroup key={'services'}>
        <ListGroupItem bsStyle={'info'}>
            Estado de los Servicios
        </ListGroupItem>
        <ListGroupItem>
            <ServiceStatus status={'unknown'} text={'Scrapper'}/>
        </ListGroupItem>
        <ListGroupItem>
            <ServiceStatus status={services.scrapper_api} text={'Scrapper API'}/>
        </ListGroupItem>
        <ListGroupItem>
            <ServiceStatus status={services.catastro_api} text={'Catastro'}/>
        </ListGroupItem>
        <ListGroupItem>
            <ServiceStatus status={services.processor_api} text={'Procesador de Datos'}/>
        </ListGroupItem>
    </ListGroup>
];
export default SideBarMenu;