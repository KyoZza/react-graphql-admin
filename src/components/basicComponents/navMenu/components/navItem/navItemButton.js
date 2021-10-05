import React from 'react';
import PropTypes from 'prop-types';

import { NavItem } from '../navItem';

import Styles from './navItem.module.css';

const NavItemButton = ({onClick, icon, children}) => 
  <button className={Styles.button} onClick={onClick}>
    <NavItem icon={icon}>{ children }</NavItem>
  </button>


NavItemButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element,
  children: PropTypes.node.isRequired
}

export default NavItemButton;