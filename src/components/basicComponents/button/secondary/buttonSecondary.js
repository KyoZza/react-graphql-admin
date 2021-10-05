import React from 'react';
import PropTypes from 'prop-types';

import Styles from './buttonSecondary.module.css';

const ButtonSecondary = ({onClick, children, danger, disabled}) => 
  <button 
    onClick={onClick}
    className={getSecondaryButtonStyle(danger)}
    type='button'
    disabled={disabled}
  >
    { children }
  </button>

ButtonSecondary.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
}

export default ButtonSecondary;

/**
 * @param {Boolean} danger 
 * @returns {String} button style
 */
export const getSecondaryButtonStyle = (danger) => danger ? [Styles.button, Styles.danger].join(' ') : Styles.button;