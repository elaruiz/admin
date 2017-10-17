import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Grid, PageHeader, Row } from 'react-bootstrap';

import HomePage from '../pages/HomePage';
import UsersPage from '../pages/UsersPage';
import UsersFormPage from '../pages/UsersFormPage';
import PlansPage from '../pages/PlansPage';
import PlansFormPage from '../pages/PlansFormPage';
import MessagesPage from '../pages/MessagesPage';
import ShowMessagePage from '../pages/ShowMessagePage';
import ErrorPage from '../pages/ErrorPage';

import UDAHeader from './UDAHeader';
import LoginForm from './LoginForm';
import SideBarMenu from './SideBarMenu';
import UDAFooter from './UDAFooter';
import Loading from './Loading';

import '../sass/App.css';

const App = ({ user, loadingInfo, services }) => {
    return (
        <HashRouter>
            <div id={'wrap'}>
                <UDAHeader/>
                <Grid id={'main-content'} style={{'display': !user && 'flex'}}>
                    {user && (
                        <Row>
                            <Col sm={12}>
                                <PageHeader id={'main-header'}>UDA - Administración</PageHeader>
                            </Col>
                        </Row>
                    )}
                    {
                        user ? (
                            <Row className={'content'}>
                                <Col sm={3} className={'hidden-xs'}>
                                    <SideBarMenu services={services}/>
                                </Col>
                                <Col sm={9} xs={12}>
                                    <Switch>
                                        <Route exact path='/' component={HomePage}/>

                                        <Route exact path='/users' component={UsersPage}/>
                                        <Route path='/users/:userId/edit' component={UsersFormPage}/>
                                        <Route path='/users/create' component={UsersFormPage}/>

                                        <Route exact path='/plans' component={PlansPage}/>
                                        <Route path='/plans/:planId/edit' component={PlansFormPage}/>
                                        <Route path='/plans/create' component={PlansFormPage}/>

                                        <Route exact path='/messages' component={MessagesPage}/>
                                        <Route path='/messages/:messageId/read' component={ShowMessagePage}/>

                                        <Route component={ErrorPage}/>
                                    </Switch>
                                </Col>
                            </Row>
                        ) : (
                            <Row id={'login-form-container'}>
                                <Col sm={4}>
                                    {loadingInfo ? <Loading size={'huge'} showText text={'Cargando...'}/> :
                                        <LoginForm/>}
                                </Col>
                            </Row>
                        )
                    }
                </Grid>
                <UDAFooter/>
            </div>
        </HashRouter>
    );
};

export default connect(
    state => ({
        user: state.user.user,
        loadingInfo: state.user.loadingInfo,
        services: state.services
    })
)(App)