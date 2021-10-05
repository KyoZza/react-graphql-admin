/**
 * Converts a numeric price (eg. 3000) to formated string (eg. ¥3,000)
 * @param {Number} price 
 * @returns {String} formatted price
 */
export function formatPrice(price) {
  if(price <= 0) return '';
  // return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').concat('円');
  return '¥' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}