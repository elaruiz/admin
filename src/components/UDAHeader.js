import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doLogout } from '../redux/actions/UserActions';
import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MENUS } from '../constants/constants';

import '../sass/UDAHeader.css';

class UDAHeader extends Component {
    render = () => {
        const { user, actions } = this.props;
        return (
            <header>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to={'/'}>Logo</Link>
                        </Navbar.Brand>
                        {user && <Navbar.Toggle/>}
                    </Navbar.Header>
                    <Navbar.Collapse>
                        {
                            user && (
                                <Nav className={'visible-xs'}>
                                    {
                                        MENUS.map((menu, i) => (
                                            <NavItem href={`/#${menu.url}`} key={`navmenu${i}`}>{menu.text}</NavItem>
                                        ))
                                    }
                                </Nav>
                            )
                        }

                        <Nav pullRight>
                            {
                                user && (
                                    <NavDropdown title={user.name} id={'user-menu-dropdown'}>
                                        <MenuItem>Mi Perfil</MenuItem>
                                        <MenuItem divider/>
                                        <MenuItem onClick={actions.doLogout}>Cerrar sesión</MenuItem>
                                    </NavDropdown>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
            </header>
        );
    };
}

export default connect(
    state => {
        return { ...state.user }
    },
    dispatch => {
        return {
            doLogout: () => dispatch(doLogout())
        }
    },
    (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, { actions: dispatchProps })
)(UDAHeader);