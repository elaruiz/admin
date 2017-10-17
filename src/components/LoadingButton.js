import React from 'react';
import IconButton from './IconButton';

export default ({ loading, icon = null,...props }) => (
    <IconButton {...props} icon={loading ? 'circle-o-notch' : icon} iconRotate={loading}/>
);