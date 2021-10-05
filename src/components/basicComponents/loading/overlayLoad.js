import React from 'react';
import PropTypes from 'prop-types';
import { Overlay } from '../overlay';

import Styles from './loading.module.css';

const OverlayLoad = () => 
  <Overlay visible center>
    <div className={[Styles.loading, Styles.overlay].join(' ')}/>
  </Overlay>

OverlayLoad.propTypes = {
}

export default OverlayLoad;