import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { toNextPage, toPrevPage, reachedFirstPage, reachedLastPage } from './lib';

import Styles from './pagination.module.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const Pagination = ({currentPage, amountPages, onNext, onPrev}) => {
  // Scroll app to the top whenever the page changes
  useEffect(() => {
    document.querySelector('.App').scrollTo(0, 0);
  }, [currentPage]);

  // Make sure the currentPage has a valid value, even if amountPages hanges unexpectedly
  useEffect(() => {
    if(amountPages < currentPage)
      onPrev(amountPages)
  }, [amountPages, currentPage, onPrev]);

  // Don't render the Pagination if there is only one page or an invalid 'amountPages' value
  if(amountPages <= 1) return null;


  return (
    <div className={Styles.container}>
      <div className={Styles.wrapper}>
        <button 
          className={Styles.pageSwitch} 
          onClick={() => toPrevPage(currentPage, onPrev)}
          disabled={reachedFirstPage(currentPage, amountPages)}
        >
          <NavigateBeforeIcon fontSize="large" color="inherit"/>
        </button>
        
        <div className={Styles.pageInfo}>{currentPage}／{amountPages}</div>
        
        <button 
          className={Styles.pageSwitch} 
          onClick={() => toNextPage(currentPage, amountPages, onNext)}
          disabled={reachedLastPage(currentPage, amountPages)}
        >
          <NavigateNextIcon fontSize="large" color="inherit"/>
        </button>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  amountPages: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
}

export default Pagination;