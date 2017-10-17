import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

class _BaseMessage extends Component {

    state = {
        visible: null
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.visible !== this.props.visible) {
            this.setState({
                visible: nextProps.visible
            });
        }
    };

    componentDidMount = () => {
        this.setState({
            visible: this.props.visible
        })
    };

    render = () => {
        const { visible } = this.state;
        const {
            message = null,
            dismissible,
            title = null,
            onDismiss = this.dismissAlert
        } = this.props;

        if (visible && message) {
            return (
                <Alert bsStyle={this.style}
                       onDismiss={(dismissible) ? onDismiss : null}
                       className={{ 'alert-dismissible': dismissible }}>
                    {(title !== null) && <h4>{title}</h4>}
                    {message}
                </Alert>
            );
        }
        return null;
    };

    get style() {
        return '';
    }

    dismissAlert = () => {
        this.setState({
            visible: false
        });
    }
}

_BaseMessage.defaultProps = {
    title: null,
    dismissible: false
};

_BaseMessage.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    dismissible: PropTypes.bool
};

class _ErrorMessage extends _BaseMessage {
    get style() {
        return 'danger';
    }
}

class _InfoMessage extends _BaseMessage {
    get style() {
        return 'info';
    }
}

class _WarningMessage extends _BaseMessage {
    get style() {
        return 'warning';
    }
}

class _SuccessMessage extends _BaseMessage {
    get style() {
        return 'success';
    }
}

const Message = {
    Success: _SuccessMessage,
    Warning: _WarningMessage,
    Info: _InfoMessage,
    Error: _ErrorMessage,
    Danger: _ErrorMessage
};

export default Message;