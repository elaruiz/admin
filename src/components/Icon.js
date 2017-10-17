import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import * as classnames from "classnames";

const Icon = ({ icon = '', className = {}, ...props }) => {
    let classes = classnames('fa-fw',className);
    return <Glyphicon bsClass='fa' className={classes} glyph={icon} {...props}/>
};

export default Icon;