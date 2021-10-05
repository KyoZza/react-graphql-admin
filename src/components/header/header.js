import React from 'react';
import PropTypes from 'prop-types';

import { Logo } from './components/logo'
import { Menu } from './components/menu'

import { header } from './header.module.css';

const Header = ({handleDrawer}) => 
  <header className={header}>
    <Logo/>
    <Menu handleDrawer={handleDrawer}/>
  </header>

Header.propTypes = {
  handleDrawer: PropTypes.func.isRequired
}

export default Header;