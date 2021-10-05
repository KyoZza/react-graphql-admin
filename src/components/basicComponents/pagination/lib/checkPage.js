import { FIRST_PAGE } from '../lib';

/**
 * @param {Number} currentPage 
 * @param {Number} amountPages 
 * @returns {Boolean} True if the current page is the last page, else false
 */
export function reachedLastPage(currentPage, amountPages) {
  return currentPage === amountPages;
}

/**
 * @param {Number} currentPage 
 * @returns {Boolean} True if the current page is the first page, else false
 */
export function reachedFirstPage(currentPage) {
  return currentPage === FIRST_PAGE;
}