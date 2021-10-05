import React, { createRef } from 'react';
import PropTypes from 'prop-types';


const NewPassword = ({label = 'パスワード', password, passwordRepeat, onChangePassword, onChangePasswordRepeat }) => {
  const passwordRef = createRef();

  // Regex pattern to check whether the given password meets the requirments
  const PW_PATTERN = '(?=^.{6,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$';
  // input title which describes the password requirements
  const PW_TITLE = '少なくとも1大文字、1小文字、1数字。最低6文字';


  /**
   * Check if both password match. If not,
   * set a custom validity message to the input field
   */
  const checkPasswordMatch = () => 
    password !== passwordRepeat && 
    passwordRef.current.setCustomValidity('パスワードが一致しません');
  

  return (
    <>
      <label htmlFor="password">{label}</label>
      <input type="password" name="password" required 
        pattern={PW_PATTERN} 
        title={PW_TITLE}
        value={password} 
        onChange={e => onChangePassword(e.target.value)}
        placeholder="********"
      />
      
      <label htmlFor="passwordRepeat">{label}を再入力</label>
      <input type="password" name="passwordRepeat" required 
        pattern={PW_PATTERN} 
        title={PW_TITLE} 
        value={passwordRepeat} 
        onChange={e => {
          onChangePasswordRepeat(e.target.value);
          passwordRef.current.setCustomValidity('');
        }}
        onBlur={checkPasswordMatch}
        ref={passwordRef}
        placeholder="********"
      />
    </>
  )
}

NewPassword.propTypes = {
  label: PropTypes.string,
  password: PropTypes.string.isRequired,
  passwordRepeat: PropTypes.string.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onChangePasswordRepeat: PropTypes.func.isRequired
}

export default NewPassword;