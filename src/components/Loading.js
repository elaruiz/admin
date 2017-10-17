import React from 'react';
import '../sass/Loading.css';
import classnames from 'classnames';
import Icon from "./Icon";

export default ({ size = 'normal', showText = false, text = null }) => {
    const classes = classnames('fa-stack', {
        'fa-1x': size === 'small',
        'fa-2x': size === 'medium',
        'fa-3x': size === 'normal',
        'fa-4x': size === 'big',
        'fa-5x': size === 'huge'
    });
    return (
        <div className='loading-container'>
            <span className={classes}>
                <Icon icon={'circle-o-notch'} className='fa-stack-2x fa-spin'/>
                <Icon icon={'building-o'} className='fa-stack-1x'/>
            </span>
            <p>{showText ? text || 'Cargando...' : null}</p>
        </div>
    );
};