import React from 'react';
import PropTypes from 'prop-types';

import Styles from './overlay.module.css';

const Overlay = ({children, onClose, visible, opacity, center, padding, isModal }) => 
  <div
    className={padding ? [Styles.container, Styles.padding].join(' ') : Styles.container} 
    style={{
      display: visible ? 'flex' : 'none',
      justifyContent: center && !isModal ? 'center' : 'unset', 
      alignItems: center ? 'center' : 'unset', 
      opacity
    }}
  >
    { onClose && <div className={Styles.space} onClick={onClose}/> }
    { children }
  </div>

Overlay.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
  center: PropTypes.bool,
  isModal: PropTypes.bool,
  padding: PropTypes.bool,
  opacity: PropTypes.number
}

export default Overlay;