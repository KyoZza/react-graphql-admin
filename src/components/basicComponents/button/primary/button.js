import React from 'react';
import PropTypes from 'prop-types';
import { ButtonLoad } from '../../loading';

import Styles from './button.module.css';

const Button = ({onClick, children, type, main, danger, disabled, fitContent, loading}) => 
  <button 
    onClick={onClick}
    className={getButtonStyle(main, danger)}
    type={type}
    style={fitContent ? {width: 'max-content', minWidth: 'max-content'} : {}}
    disabled={disabled || loading}
  >
    { loading ? <ButtonLoad main={main}/> : children }
  </button>

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  main: PropTypes.bool,
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  fitContent: PropTypes.bool,
  loading: PropTypes.bool
}

export default Button;

/**
 * @param {Boolean} main 
 * @param {Boolean} danger 
 * @returns {String} button style
 */
export const getButtonStyle = (main, danger) => {
  let style = '';

  if(main) style = [Styles.button, Styles.main].join(' ');
  else if(danger) style = [Styles.button, Styles.danger].join(' ');
  else style = [Styles.button, Styles.default].join(' ');

  return style;
}