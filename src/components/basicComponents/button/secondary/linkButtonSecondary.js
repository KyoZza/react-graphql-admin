import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getSecondaryButtonStyle } from './buttonSecondary';

const LinkButtonSecondary = ({to, children, danger, disabled}) => 
  <Link 
    to={to}
    className={getSecondaryButtonStyle(danger)}
    disabled={disabled}
  >
    { children }
  </Link>

LinkButtonSecondary.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  cancel: PropTypes.bool,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default LinkButtonSecondary;