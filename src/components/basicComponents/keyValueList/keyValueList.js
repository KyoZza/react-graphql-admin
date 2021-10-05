import React from 'react';
import PropTypes from 'prop-types';

import Styles from './keyValueList.module.css';

const KeyValueList = ({children, noMargin}) => 
  <ul 
    className={Styles.container}
    style={noMargin ? {margin: 0} : {}}
  >
    { children }
  </ul>


KeyValueList.propTypes = {
  children: PropTypes.node,
  noMargin: PropTypes.bool
}

export default KeyValueList;