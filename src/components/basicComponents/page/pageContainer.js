import React, { useState, createRef, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { clearLoginState } from '../../../graphql';
import { Header } from '../../header';
import { Drawer, DRAWER_WIDTH } from '../drawer';
import { NavMenu } from '../navMenu';
import { Alerts} from '../alerts';

import Styles from './pageContainer.module.css';

const PageContainer = ({children}) => {
  const pageRef = createRef();
  const { pathname } = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSwipePos, setDrawerSwipePos] = useState(0);
  const [hasTouchListener, setHasTouchListener] = useState(false);
  const drawerOpenRef = useRef(drawerOpen);
    
  let drawerSwipe = false;
  let preventRerenderFlag = false;

  /**
   * N pixels from the right side of the screen. 
   * Within these pixels the app listens for touch events to open the drawer
   */ 
  const POS_RIGHT = 50;
  /**
   * The difference between the previous and the current swipe position 
   * needs to be at least N pixels, in order to trigger an update
   */ 
  const SWIPE_DELTA = 10;
  
  
  const handleTouchStart = useCallback(
    e => {
      // Get touch position from the right side of the screen 
      const pos = window.innerWidth - e.touches[0].clientX;
  
      // Only enably swiping on the drawer if the touch gesture got initiated from the right side of the screen
      // Or half of the drawer's left side when it's opened
      if(((!drawerOpenRef.current && pos <= POS_RIGHT) || (drawerOpenRef.current && pos >=  DRAWER_WIDTH / 2)) && !drawerSwipe) 
        // eslint-disable-next-line
        drawerSwipe = true;
    }, []
  ); 

  const handleTouchMove = useCallback(
    e => {
      // Get touch position from the right side of the screen 
      const pos = window.innerWidth - e.touches[0].clientX;
  
      if(drawerSwipe && Math.abs(drawerSwipePos - pos) > SWIPE_DELTA && !preventRerenderFlag) {
        // prevent vertical scrolling while doing a touch gesture to open the drawer
        e.preventDefault(); 
        // eslint-disable-next-line
        preventRerenderFlag = true;
        setDrawerSwipePos(pos > DRAWER_WIDTH ? DRAWER_WIDTH : pos);
        // eslint-disable-next-line
        preventRerenderFlag = false;
      }
  
    }, [drawerSwipe, drawerSwipePos]
  );


  const handleTouchEnd = useCallback(
    e => {
      if(drawerSwipe) {
        setDrawerSwipePos(drawerSwipePos => {
          if(drawerSwipePos === 0) return 0; 
          else if (drawerSwipePos > DRAWER_WIDTH / 2) {
            setDrawerOpen(true);
            return DRAWER_WIDTH;
          }
          else if( drawerSwipePos <= DRAWER_WIDTH / 2) {
            setDrawerOpen(false);
            return 0;
          }
  
          return drawerSwipePos
        }); 
      }
      // eslint-disable-next-line
      drawerSwipe = false;
    }, [drawerSwipe, drawerSwipePos, drawerOpen]
  ) 


  useEffect(() => {
    if(pageRef.current && !hasTouchListener) {
      pageRef.current.addEventListener('touchstart', handleTouchStart);
      pageRef.current.addEventListener('touchmove', handleTouchMove, {passive: false});
      pageRef.current.addEventListener('touchend', handleTouchEnd);
      setHasTouchListener(true);
    }
  }, [pageRef, hasTouchListener, handleTouchStart, handleTouchMove, handleTouchEnd]);

  useEffect(() => {
    drawerOpenRef.current = drawerOpen;
  }, [drawerOpen]);

  /**
   * On page change (different pathname), clear the login state if there is no token
   */
  useEffect(() => {
    if(!localStorage.getItem('token')) clearLoginState();
  }, [pathname]);

  return (
    <div 
      className={Styles.content}
      ref={pageRef} 
    >
      <Header handleDrawer={() => setDrawerOpen(!drawerOpen)}/>

      <Alerts/>

      <div className={Styles.container}>
        {/* Display drawer on bigger devices (and only if authenticated)*/}
        { !!localStorage.getItem('token') &&
          <aside className={Styles.sideBar}>
            <NavMenu/>
          </aside>
        }
        <main className={Styles.main}>
          { children }
        </main>
      </div>
      {/* Display drawer on small devices */}
      <Drawer 
        onClose={() => setDrawerOpen(false)} 
        open={drawerOpen}
        drawerSwipePos={drawerSwipePos}
      >
        <NavMenu/>
      </Drawer>
    </div>
  )
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageContainer;