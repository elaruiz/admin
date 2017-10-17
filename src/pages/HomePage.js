import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePageTitle } from '../constants/functions';

class HomePage extends Component {
    componentDidMount = () => {
        changePageTitle('UDA - Administración')
    };

    render = () => {
        return [
            <p key={1}>Texto</p>,
            <p key={2}>Texto</p>,
            <p key={3}>Texto</p>
        ];
    };
};

export default connect(
    state => {
        return {
            user: state.user.user
        }
    }
)(HomePage);