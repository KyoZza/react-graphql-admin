import React from 'react';
import PropTypes from 'prop-types';

import Styles from './select.module.css';

const Select = ({name, placeholder, onChange, value, options = [], autoFocus, disabled, required}) => 
  <select
    name={name} 
    className={
      placeholder && (value === undefined || value === null  || value === '' ) ? 
      [Styles.container, Styles.placeholder].join(' ')  :
      Styles.container
    }
    value={value || value === 0 ? value : ''} 
    onChange={onChange}
    disabled={disabled} 
    autoFocus={autoFocus} 
    required={required} 
    style={placeholder && (value === undefined || value === null  || value === '' ) ? {color : 'grey'} : {}}
  >
    { placeholder && <option value="" disabled hidden>{ placeholder }</option> }

    {
      options.map((option, i) => {
        let key, value;
        if(typeof option === 'object') {
          key = option.key;
          value = option.value;
        } else {
          value = key = option;
        }

        return <option key={i} value={value}>{ key }</option>
      })
    }
  </select>


Select.propTypes = {
  name: PropTypes.string, 
  placeholder: PropTypes.string, 
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    })
  ])), 
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    })
  ]), 
  onChange: PropTypes.func.isRequired, 
  autoFocus: PropTypes.bool, 
  disabled: PropTypes.bool, 
  required: PropTypes.bool
}

export default Select;