import React from 'react';
import PropTypes from 'prop-types';

import Styles from './validation.module.css'

const ValidationSuccess = ({msg}) => 
  <i className={Styles.success}>{ msg }</i>

ValidationSuccess.propTypes = {
  msg: PropTypes.string.isRequired
}

export default ValidationSuccess;