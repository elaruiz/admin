import React from 'react';
import { Button } from 'react-bootstrap';
import Icon from './Icon';

export default ({icon, iconRotate = false, ...props}) => (
    <Button {...props}>
        {icon && <Icon icon={icon} className={{'fa-spin': iconRotate}}/>} {props.children}
    </Button>
);