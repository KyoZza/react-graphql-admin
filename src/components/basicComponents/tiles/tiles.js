import React from 'react';
import PropTypes from 'prop-types';

import Styles from './tiles.module.css';

const Tiles = ({children}) => 
  <div className={Styles.container}>
    { children }
  </div>


Tiles.propTypes = {
  children: PropTypes.node.isRequired
}

export default Tiles;