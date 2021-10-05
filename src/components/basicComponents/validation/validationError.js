import React from 'react';
import PropTypes from 'prop-types';

import Styles from './validation.module.css'

const ValidationError = ({msg}) => 
  <i className={Styles.error}>{ msg.replace('GraphQL error: ', '') }</i>

ValidationError.propTypes = {
  msg: PropTypes.string.isRequired
}

export default ValidationError;