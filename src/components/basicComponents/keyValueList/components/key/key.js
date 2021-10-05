import React from 'react';
import PropTypes from 'prop-types';

import Styles from './key.module.css';

const Key = ({children}) => 
  <strong className={Styles.container}>
    { children }:
  </strong>

Key.propTypes = {
  children: PropTypes.string.isRequired
}

export default Key;