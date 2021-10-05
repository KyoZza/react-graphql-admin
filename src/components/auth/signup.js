import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { CREATE_USER } from './lib';
// import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Button } from '../basicComponents/button';
import { NewPassword } from '.';
import { ValidationError } from '../basicComponents/validation';

import Styles from './auth.module.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');
  const [nameKana, setNameKana] = useState('');


  const client = useApolloClient();
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser: { token, data: userData }}) => {
      localStorage.setItem('token', token);

      client.writeData({ data: {
        isAuthenticated: !!token,
        authUserId: userData.id
      }});
    },
    onError: _ => null
  });

  const onSubmit = () => {
    createUser({
      variables: {
        email,
        password: password1,
        name,
        nameKana,
        userType: 'Training Center' //#TODO change later
      }
    })
  }

  return (
    <div className={Styles.container}>
      <h1>サインアップ</h1>
      
      <form onSubmit={onSubmit}>
        <label htmlFor="name">お名前</label>
        <input type="text" name="name" placeholder="例）山田花子" required 
          autoFocus
          value={name} 
          onChange={e => setName(e.target.value)}
        />

        <label htmlFor="nameFurigana">お名前（ふりがな）</label>
        <input type="text" name="nameFurigana" placeholder="例）やまだはなこ" required 
          onChange={e => setNameKana(e.target.value)} 
          value={nameKana}
        />

        <label htmlFor="email">メール</label>
        <input type="text" name="email" placeholder="例）yamada.hanako@admin.jp" required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <NewPassword
          password={password1}
          passwordRepeat={password2}
          onChangePassword={setPassword1}
          onChangePasswordRepeat={setPassword2}
        />   

        { error && <ValidationError msg={error.message}/> }

        <Button main loading={loading}>登録</Button>
        <Link className={Styles.link} to="/login">ログインの方はこちら</Link>
      </form>
    </div>
  )
}

SignUp.propTypes = {

}

export default SignUp;