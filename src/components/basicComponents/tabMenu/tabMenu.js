import React from 'react';
import PropTypes from 'prop-types'; 


import Styles from './tabMenu.module.css'

const TabMenu = ({children}) => {
  return (
    <nav 
      className={Styles.container}
      style={{gridTemplateColumns: `repeat(${children.length}, 1fr)`}}
    >
      { children }
    </nav>
  )
}

TabMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default TabMenu;