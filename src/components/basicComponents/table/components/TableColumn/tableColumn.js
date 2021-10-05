import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Styles from './tableColumn.module.css';

const TableColumn = ({head, link, error, success, fitContent, children}) => {
  let dataStyle = Styles.container;
  if(error) dataStyle = [dataStyle, Styles.error].join(' ');
  else if(success) dataStyle = [dataStyle, Styles.success].join(' ');

  return head ?
    <th className={head ? [Styles.container, Styles.head].join(' ') : Styles.container}
      style={fitContent ? {
        width: '1px',
        minWidth: 'unset',
        whiteSpace: 'nowrap'
      } : {}}
    >
      { children }
    </th>
    :
    <td className={dataStyle}
      style={fitContent ? {
        width: '1px',
        minWidth: 'unset',
        whiteSpace: 'nowrap'
      } : {}}
    >
      {
        link ?
        <Link to={link}>{ children }</Link> :
        children 
      }
    </td>
}

TableColumn.propTypes = {
  head: PropTypes.bool,
  link: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  fitContent: PropTypes.bool,
  children: PropTypes.node
}

export default TableColumn;
