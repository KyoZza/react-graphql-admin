import React, { useState }  from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { UPDATE_PASSWORD } from './lib';
import { ValidationError, ValidationSuccess } from '../../../basicComponents/validation';
import { AUTH_USER_ID } from '../../../../graphql/commonQueries';

import { Button } from '../../../basicComponents/button';
import { NewPassword } from '../../../auth';

const Password = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { data } = useQuery(AUTH_USER_ID);
  const [updatePassword, { error, loading }] = useMutation(UPDATE_PASSWORD, {
    onCompleted: () => {
      setUpdateSuccess(true);
      setOldPassword('');
      setNewPassword1('');
      setNewPassword2('');
    },
    onError: () => null
  });

  const onSubmit = () => 
    updatePassword({
      variables: {
        id: data && data.authUserId,
        oldPassword,
        newPassword: newPassword1
      }
    });
  

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="oldPassword">現在のパスワード</label>
      <input type="password" name="oldPassword" required 
        autoFocus
        value={oldPassword} 
        onChange={e => setOldPassword(e.target.value)}
        placeholder="********"
      />

      <NewPassword
        label="新しいパスワード"
        password={newPassword1}
        passwordRepeat={newPassword2}
        onChangePassword={setNewPassword1}
        onChangePasswordRepeat={setNewPassword2}
      />   

      { error && <ValidationError msg={error.message}/> }
      { updateSuccess && <ValidationSuccess msg='パスワードが更新されました。'/> }

      <Button main loading={loading}>更新</Button>
    </form>
  )
}

export default Password