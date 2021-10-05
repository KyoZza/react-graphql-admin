/**
 * @param {Array} items 
 * @param {Number} currentPage 
 * @param {Number} itemsPerPage 
 * @returns {Array} Items to display on the current page.
 */
export function getPageItems(items, currentPage, itemsPerPage) {
  // currentPage - 1 because Pagination is not 0 indexed
  const currentPagePointer = (currentPage - 1) * itemsPerPage;
  return items.slice(currentPagePointer, currentPagePointer + itemsPerPage);
}