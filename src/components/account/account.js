import React from 'react';
import { Redirect, useLocation, Route } from 'react-router-dom';
import { TabMenu, TabItem } from '../basicComponents/tabMenu';
import { 
  Profile as ProfileSettings, 
  Email as EmailSettings, 
  Password as PasswordSettings 
} from './components';

import Styles from './account.module.css';

const Account = () => {
  const { pathname } = useLocation();

  if(pathname === '/account') return <Redirect to="/account/profile"/>

  return (
    <div className={Styles.container}>
      <h1>アカウント設定</h1>
      <TabMenu>
        <TabItem to="/account/profile">プロフィール</TabItem>
        <TabItem to="/account/email">メールを変更</TabItem>
        <TabItem to="/account/password">パスワードを変更</TabItem>
      </TabMenu>

      <Route path="/account/profile" exact component={ProfileSettings}/>
      <Route path="/account/email" exact component={EmailSettings}/>
      <Route path="/account/password" exact component={PasswordSettings}/>
    </div>
  )
}

export default Account;