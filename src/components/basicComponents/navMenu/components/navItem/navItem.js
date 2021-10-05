import React from 'react';
import PropTypes from 'prop-types';

import Styles from './navItem.module.css';

const NavItem = ({icon, children}) => 
  <div className={Styles.container}>
    { icon }
    { children }
  </div>


NavItem.propTypes = {
  icon: PropTypes.element,
  children: PropTypes.node.isRequired
}

export default NavItem;