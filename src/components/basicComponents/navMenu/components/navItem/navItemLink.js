import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import { NavItem } from '../navItem';

import Styles from './navItem.module.css';

const NavItemLink = ({to, icon, children}) => {
  const { pathname } = useLocation();

  return (
    <Link className={pathname.startsWith(to) ? [Styles.link, Styles.active].join(' ') : Styles.link} to={to}>
      <NavItem icon={icon}>{ children }</NavItem>
    </Link>
  )
}


NavItemLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element,
  children: PropTypes.node.isRequired
}

export default NavItemLink;