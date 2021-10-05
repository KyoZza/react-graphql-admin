import React from 'react';
import PropTypes from 'prop-types';

import Styles from './checkbox.module.css';


const Checkbox = ({checked, onChange, required, name, id, disabled, children}) => 
  <div className={Styles.container}>
    <input 
      type="checkbox" 
      className={Styles.input} 
      name={name} 
      id={children + id || ''} 
      onChange={e => onChange(e.target.checked)} 
      checked={checked} 
      required={required} 
      disabled={disabled}
    />
    <label className={Styles.label} htmlFor={children + id || ''}>{children}</label>
  </div>
  

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

export default Checkbox;


// export default function CheckBox({label, onChange, className = null, checked = false, required = false, name='', id = '', disabled = false}) {
//   return (
//     <div className={Styles.checkbox + (className === null ? '' : ' ' + className)}>
//       <input type="checkbox" name={name} id={label + id} onChange={onChange} checked={checked} required={required} disabled={disabled}/>
//       <label htmlFor={label + id}>{label}</label>
//     </div>
//   )
// }
