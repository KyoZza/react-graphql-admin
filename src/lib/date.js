/**
 * @readonly
 * @enum {Number}
 */
export const DAY = {
  sunday:     0,
  monday:     1,
  tuesday:    2,
  wednesday:  3,
  thursday:   4,
  friday:     5,
  saturday:   6
};

/**
 * @readonly
 * @type {{en: String, jp: String}[]}
 */
export const DAY_NAMES = [
  { en: 'Sun',  jp: '日' },
  { en: 'Mon',  jp: '月' },
  { en: 'Tue',  jp: '火' },
  { en: 'Wed',  jp: '水' },
  { en: 'Thu',  jp: '木' },
  { en: 'Fri',  jp: '金' },
  { en: 'Sat',  jp: '土' }
];

/**
 * @readonly
 * @enum {Number}
 */
export const MONTH = {
  january:    0,
  february:   1,
  march:      2,
  april:      3,
  may:        4,
  june:       5,
  july:       6,
  august:     7,
  september:  8,
  october:    9,
  november:  10,
  december:  11,
};

/**
 * @readonly
 * @type {{en: String, jp: String}[]}
 */
export const MONTH_NAMES = [
  { en: 'January',    jp: '1月' },
  { en: 'February',   jp: '2月' },
  { en: 'March',      jp: '3月' },
  { en: 'April',      jp: '4月' },
  { en: 'May',        jp: '5月' },
  { en: 'June',       jp: '6月' },
  { en: 'July',       jp: '7月' },
  { en: 'August',     jp: '8月' },
  { en: 'September',  jp: '9月' },
  { en: 'October',    jp: '10月' },
  { en: 'November',   jp: '11月' },
  { en: 'December',   jp: '12月' },
];

/**
 * @param {Number} month as integer value 
 * @param {Boolean} japanese Whether the month should be displayed in Japanese or English (default)
 * @returns {String} Name representation of a month
 */
export function convertMonthNumber (month, japanese) {
  try {
    return japanese ? MONTH_NAMES[month].jp : MONTH_NAMES[month].en;
  } catch (error) {
    return '';
  }
}


/**
 * @param {Number} timestamp 
 * @param {Boolean} japanese Whether the month should be displayed in Japanese or English (default)
 * @returns {String} DateTime representation of a timestamp
 */
export function parseTimestamp (timestamp, japanese) {
  try {
    const dateTime = new Date(parseInt(timestamp));

    if(dateTime.toString() === 'Invalid Date')
      throw dateTime.toString();

    const [date, time] = dateTime.toLocaleString('en-US').split(',');
    const [mm, dd, yyyy] = date.split('/');


    return japanese ?
    `${yyyy}年${mm}月${dd}日 ${time.replace(/\s+/g, '')}` :
      `${yyyy}/${mm}/${dd} ${time.replace(/\s+/g, '')}`;

  } catch (error) {
    return '無効';
  }
}