import { reachedFirstPage, reachedLastPage } from '../lib';

/**
 * @param {Number} currentPage 
 * @param {Number} amountPages 
 * @param {Function} callback 
 */
export function toNextPage(currentPage, amountPages, callback) {
  !reachedLastPage(currentPage, amountPages) && callback(currentPage+1);
}

/**
 * @param {Number} currentPage 
 * @param {Function} callback 
 */
export function toPrevPage(currentPage, callback) {
  !reachedFirstPage(currentPage) && callback(currentPage-1);
}