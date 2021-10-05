import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import Styles from './tabItem.module.css';

const TabItem = ({to, children}) => {
  const { pathname } = useLocation();

  return (
    <Link to={to} className={pathname === to ? [Styles.item, Styles.active].join(' ') : Styles.item}>
      { children }
    </Link>
  )
}

TabItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}

export default TabItem;