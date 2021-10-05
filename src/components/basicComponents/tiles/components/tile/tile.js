import React from 'react';
import PropTypes from 'prop-types';

import Styles from './tile.module.css';

const Tile = ({hoverable, children}) => 
  <div 
    className={
      hoverable ? 
      [Styles.container, Styles.hoverable].join(' ') : 
      Styles.container
    }
  >
    { children }
  </div>


Tile.propTypes = {
  hoverable: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default Tile;