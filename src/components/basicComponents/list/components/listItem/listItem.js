import React from 'react';
import PropTypes from 'prop-types';

import Styles from './listItem.module.css';

const ListItem = ({children}) => 
  <div className={Styles.container}>{ children }</div>


ListItem.propTypes = {
  children: PropTypes.node.isRequired
}

export default ListItem;