import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';

import { iconButton } from './menu.module.css'

const Menu = ({handleDrawer}) => 
  <button
    className={iconButton}
    onClick={handleDrawer}
  >
    <MenuIcon fontSize="inherit"/>
  </button>

Menu.propTypes = {
  handleDrawer: PropTypes.func.isRequired
}

export default Menu;