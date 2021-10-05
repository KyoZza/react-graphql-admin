import React from 'react';
import PropTypes from 'prop-types';

import Styles from './tableRow.module.css';

const TableRow = ({head, children}) => 
  <tr className={head ? Styles.container : [Styles.container, Styles.body].join(' ')}>
    { children }
  </tr>

TableRow.propTypes = {
  head: PropTypes.bool,
  children: PropTypes.node
}

export default TableRow;
