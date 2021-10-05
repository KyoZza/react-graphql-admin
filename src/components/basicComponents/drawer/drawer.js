import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

import { Overlay } from '../overlay';

import { container } from './drawer.module.css';

export const DRAWER_WIDTH = 250;

const Drawer = ({children, onClose, open, drawerSwipePos}) => {
  const drawerRef = createRef();

  const initialPos = `${-(DRAWER_WIDTH+50)}px`;
  const [posRight, setPosRight] = useState(initialPos);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  
  const disableTransition = (drawerSwipePos !== DRAWER_WIDTH && drawerSwipePos !== 0) && { transition: 'unset' };
  

  useEffect(() => {
    drawerSwipePos ? setPosRight(`${-DRAWER_WIDTH + drawerSwipePos}px`) : setPosRight(initialPos);
  }, [drawerSwipePos, initialPos]);
  
  useEffect(() => {
    open ? setPosRight('0') : setPosRight(initialPos);
  }, [open, initialPos]);

  useEffect(() => {
    if(drawerRef.current) {
      // Convert the drawer's 'right'-css value into a positve integer value
      const valueRight = parseInt(drawerRef.current.style.right.replace('px', '')) + DRAWER_WIDTH;
      // Calculate  a value between 0 and 1, representing the opacity of the overlay
      const opacityValue = valueRight < 0 ? 0 : valueRight / DRAWER_WIDTH;
      setOverlayOpacity(opacityValue);
    }
  }, [drawerRef])


  return (
    <>
      <Overlay onClose={onClose} visible={open || !!disableTransition || (drawerSwipePos === DRAWER_WIDTH && posRight !== initialPos)} opacity={overlayOpacity}/>
      <div
        ref={drawerRef}
        className={container} 
        style={{right: posRight, ...disableTransition}}
      >
        { (open || !!disableTransition  || drawerSwipePos === DRAWER_WIDTH) && children }
      </div>
    </>
  )
}

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  drawerSwipePos: PropTypes.number
}

export default Drawer;