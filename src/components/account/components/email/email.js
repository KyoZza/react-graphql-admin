import React, { useState, createRef } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { LOAD_EMAIL, UPDATE_EMAIL, coverEmail } from './lib';
import { ValidationError, ValidationSuccess } from '../../../basicComponents/validation';

import { Button } from '../../../basicComponents/button';

const Email = () => {
  const emailRef = createRef();

  const [oldEmail, setOldEmail] = useState('');
  const [newEmail1, setNewEmail1] = useState('');
  const [newEmail2, setNewEmail2] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { data } = useQuery(LOAD_EMAIL, {
    onCompleted: () => setOldEmail((data && coverEmail(data.loginWithToken.data.email)) || '')
  });

  const [updateEmail, { error, loading }] = useMutation(UPDATE_EMAIL, {
    onCompleted: () => {
      setUpdateSuccess(true);
      setOldEmail(newEmail1);
      setNewEmail1('');
      setNewEmail2('');
    },
    onError: () => null
  });

  const onSubmit = () => {
    updateEmail({
      variables: {
        id: data && data.loginWithToken.data.id,
        oldEmail,
        newEmail: newEmail1
      }
    })
  }

  /**
   * Check if both password match. If not,
   * set a custom validity message to the input field
   */
  const checkEmailMatch = () => 
    newEmail1 && newEmail2 && newEmail1 !== newEmail2 && 
    emailRef.current.setCustomValidity('メールが一致しません');

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="oldEmail">現在のメールアドレス</label>
      <input name="oldEmail" type="email" placeholder="例）yamada.hanako@admin.jp" required 
        autoFocus
        value={oldEmail} 
        onChange={e => setOldEmail(e.target.value)}
        pattern="(?!^.\*{2,}@)^.+"
        title="メールを完成させてください。"
      />

      <label htmlFor="newEmail">新しいメールアドレス</label>
      <input name="newMail" type="email" placeholder="例）yamada.hanako@admin.jp" required 
        onChange={e => {
          setNewEmail1(e.target.value);
          emailRef.current.setCustomValidity('');
        }} 
        value={newEmail1}
        onBlur={checkEmailMatch}

      />
      
      <label htmlFor="newEmailRepeat">新しいメールアドレスを再入力</label>
      <input name="newEmailRepeat" type="email" placeholder="例）yamada.hanako@admin.jp" required 
        ref={emailRef}
        onBlur={checkEmailMatch}
        onChange={e => {
          setNewEmail2(e.target.value);
          emailRef.current.setCustomValidity('');
        }} 
        value={newEmail2}
      />

      { error && <ValidationError msg={error.message}/> }
      { updateSuccess && <ValidationSuccess msg='メールが更新されました。'/> }

      <Button main loading={loading}>更新</Button>
    </form>
  )
}

export default Email;