import React from 'react';
import PropTypes from 'prop-types';

import Styles from './buttonWrapper.module.css';

const ButtonWrapper = ({children, tight, alignEnd, wrap, marginTop}) =>
  <div 
    className={tight ? Styles.wrapperTight : Styles.wrapper}
    style={{
      justifyContent: alignEnd ? 'flex-end' : 'flex-start',
      flexWrap: wrap ? 'wrap' : 'nowrap',
      minWidth: wrap ? 'unset' : 'max-content'
    }}
  >
    { children }
  </div>
  
ButtonWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  tight: PropTypes.bool,
  alignEnd: PropTypes.bool,
  marginTop: PropTypes.bool,
  wrap: PropTypes.bool
}

export default ButtonWrapper;