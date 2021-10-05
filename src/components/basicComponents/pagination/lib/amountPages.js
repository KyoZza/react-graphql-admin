/**
 * @param {Number} amountItems 
 * @param {Number} itemsPerPage 
 * @returns {Number} amount of pages
 */
export function getAmountPages(amountItems, itemsPerPage) {
  return Math.ceil(amountItems / itemsPerPage);
}