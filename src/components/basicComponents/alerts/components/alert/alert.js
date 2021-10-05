import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ALERT_TYPE, removeAlert } from './lib';

import Styles from './alert.module.css';
import CloseIcon from '@material-ui/icons/Close';

const Alert = ({id, type, children: message}) => {
  const [right, setRight] = useState(undefined);
  const [opacity, setOpacity] = useState(undefined);

  useEffect(() => {
    /**
     * Set right value to 0 after the component mounted (activates transition) 
     * Added the timeout of 1ms to avoid the Firefox bug where only the 
     * first Alert got animated
     */ 
    const helperTimeout = setTimeout(() => setRight(0), 1);
    
    // Timer when the alert starts to fade
    const OPACITY_TIMER = 6000;
    const opacityTimeout = setTimeout(() => setOpacity(0), OPACITY_TIMER);

    // Timer when the alert gets removed 
    const REMOVE_TIMER = OPACITY_TIMER + 900;
    const alertTimeout = setTimeout(() => removeAlert(id), REMOVE_TIMER);

    return () => {
      setRight(undefined);
      setOpacity(undefined);
      clearTimeout(helperTimeout);
      clearTimeout(opacityTimeout);
      clearTimeout(alertTimeout);
    }
  }, [id])

  let transitionObject = {};
  if(right !== undefined) transitionObject['right'] = right;
  if(opacity !== undefined) transitionObject['opacity'] = opacity;

  return (
    <div 
      className={[Styles.container, Styles[type]].join(' ')}
      style={transitionObject}
    >
      <p className={Styles.message}>{ message }</p>
      <button 
        className={Styles.close}
        onClick={() => removeAlert(id)}
      >
        <CloseIcon fontSize="inherit" color="inherit"/>
      </button>
    </div>
  )
}

Alert.types = ALERT_TYPE;

Alert.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(ALERT_TYPE)).isRequired,
  children: PropTypes.string.isRequired
}

export default Alert;