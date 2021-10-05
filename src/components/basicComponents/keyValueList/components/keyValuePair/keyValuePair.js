import React from 'react';
import PropTypes from 'prop-types';

import Styles from './keyValuePair.module.css';

const KeyValuePair = ({children}) => 
  <li className={Styles.container}>
    { children }
  </li>

KeyValuePair.propTypes = {
  children: PropTypes.node.isRequired
}

export default KeyValuePair;