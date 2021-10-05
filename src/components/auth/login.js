import React, { useState } from 'react';
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import { LOGIN_USER } from './lib';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Button } from '../basicComponents/button';
import { ValidationError } from '../basicComponents/validation';

import Styles from './auth.module.css';
import { isAdmin } from '../../lib/roles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const client = useApolloClient();
  // use this login method when actual backend is provided
  // const [login, { loading }] = useLazyQuery(LOGIN_USER, {
  //   onCompleted: ({ login: { token, data: userData }}) => {
  //     // Make sure only Admins have access to the page
  //     if (!isAdmin(userData.userType)) {
  //       setError({ message: 'アドミンしかアクセスできません。' })
  //       return;
  //     }
      
  //     localStorage.setItem('token', token);

  //     client.writeData({ data: {
  //       isAuthenticated: !!token,
  //       authUserId: userData.id
  //     }});
  //   },

  //   onError: error => {
  //     setError(error);
  //     // clear password field
  //     setPassword('');
  //   }
  // });

  const [loading, setLoading] = useState(false);
  // fake login function. Just for demonstration purposes, as no backend is provided.
  const login = async () => {
      setLoading(true);
      setTimeout(()=> {
        const token = 'foo'
        setLoading(false);
        
        localStorage.setItem('token', token);
  
        client.writeData({ data: {
          isAuthenticated: !!token,
          authUserId: 'bar'
        }});
      }, 2000);
  };

  const onSubmit = () => login({variables: { email, password }});

  return (
    <div className={Styles.container}>
      <h1>ログイン</h1>
      
      <form onSubmit={onSubmit}>
        <label htmlFor="email">メール</label>
        <input type="text" name="email" required 
          autoFocus
          value={email} 
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="password">パスワード</label>
        <input type="password" name="password" required 
          value={password} 
          onChange={e => setPassword(e.target.value)}
        />

        { error && <ValidationError msg={error.message}/> }

        <Button main loading={loading}>ログイン</Button>
        {/* <Link className={Styles.link} to="/signup">サインアップの方はこちら</Link> */}
      </form>
    </div>
  )
}

Login.propTypes = {

}

export default Login;