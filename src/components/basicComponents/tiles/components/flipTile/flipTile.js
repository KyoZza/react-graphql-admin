import React from 'react';
import PropTypes from 'prop-types';

import Styles from './flipTile.module.css';

const FlipTile = ({front, back}) => 
  <div className={Styles.container}>
    <div className={Styles.wrapper}>
      <div className={Styles.front}>
        { front }
      </div>
      <div className={Styles.back}>
        { back }
      </div>
    </div>
  </div>


FlipTile.propTypes = {
  front: PropTypes.node.isRequired,
  back: PropTypes.node
}

export default FlipTile;