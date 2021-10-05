import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination, getAmountPages, getPageItems, FIRST_PAGE } from '../pagination';

import Styles from './list.module.css';

const List = ({itemsPerPage = 10, children}) => {
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  
  return (
    <div className={Styles.container}>
      <div className={Styles.listItems}>{ getPageItems(children, currentPage, itemsPerPage) }</div>
      <Pagination 
        currentPage={currentPage}
        onPrev={setCurrentPage}
        onNext={setCurrentPage}
        amountPages={getAmountPages(children.length, itemsPerPage)}
      />
    </div>
  )
}

List.propTypes = {
  children: PropTypes.node.isRequired,
  itemsPerPage: PropTypes.number
}

export default List;