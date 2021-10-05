import React from 'react';
import PropTypes from 'prop-types';

import Styles from './loading.module.css';

const TileLoad = () => 
  <div className={[Styles.loading, Styles.tile].join(' ')}/>

TileLoad.propTypes = {
  main: PropTypes.bool
}

export default TileLoad;