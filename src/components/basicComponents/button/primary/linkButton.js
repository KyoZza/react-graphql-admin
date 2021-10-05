import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getButtonStyle } from './button';

const LinkButton = ({to, onClick, children, main, danger, disabled, fitContent}) => 
  <Link 
    to={to}
    onClick={onClick}
    className={getButtonStyle(main, danger)}
    style={fitContent ? {width: 'fit-content', minWidth: 'fit-content'} : {}}
    disabled={disabled}
  >
    { children }
  </Link>

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  cancel: PropTypes.bool,
  main: PropTypes.bool,
  disabled: PropTypes.bool,
  fitContent: PropTypes.bool,
}

export default LinkButton;