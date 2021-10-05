import React from 'react';
import PropTypes from 'prop-types';

import Styles from './loading.module.css';

const ButtonLoad = ({main}) => 
  <div className={[Styles.loading, main ? Styles.buttonMain : Styles.button].join(' ')}/>

ButtonLoad.propTypes = {
  main: PropTypes.bool
}

export default ButtonLoad;