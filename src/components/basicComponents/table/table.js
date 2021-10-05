import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination, getAmountPages, getPageItems, FIRST_PAGE } from '../pagination';


import Styles from './table.module.css';

const Table = ({itemsPerPage = 10, head, children = []}) => {
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);

  return (
    <>
      <div className={Styles.overflowWrapper}>
        <table className={Styles.container}>
          {
            head &&
            <thead className={Styles.head}>
              { head }
            </thead>
          }
          <tbody className={Styles.body}>
            { Array.isArray(children) ?
              getPageItems(children, currentPage, itemsPerPage) :
              children
            }
          </tbody>
        </table>
      </div>

      {
        Array.isArray(children) &&
        <Pagination 
          currentPage={currentPage}
          onPrev={setCurrentPage}
          onNext={setCurrentPage}
          amountPages={getAmountPages(children.length, itemsPerPage)}
        />
      }
    </>
  )
}


Table.propTypes = {
  itemsPerPage: PropTypes.number,
  head: PropTypes.node,
  children: PropTypes.node
}

export default Table;