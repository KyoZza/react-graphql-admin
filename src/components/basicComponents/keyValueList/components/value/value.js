import React from 'react';
import PropTypes from 'prop-types';

import Styles from './value.module.css';

const Value = ({children, main}) => 
  <div className={main ? [Styles.container, Styles.main].join(' ') : Styles.container}>
    { children }
  </div>

Value.propTypes = {
  children: PropTypes.node.isRequired,
  main: PropTypes.bool
}

export default Value;