import React from 'react';
import { Redirect, useLocation, Route, Switch } from 'react-router-dom';
import { TabMenu, TabItem } from '../basicComponents/tabMenu';
import { 
  AdminList, 
  UserList, 
  UserDetails,
  AgentList,
  AgentDetails
} from './components';

import Styles from './users.module.css';

const Users = () => {
  const { pathname } = useLocation();

  if(pathname === '/users') return <Redirect to="/users/user"/>

  return (
    <div className={Styles.container}>
      <h1>ユーザー</h1>
      <TabMenu>
        <TabItem to="/users/user">普通のユーザー</TabItem>
        <TabItem to="/users/agent">エージェント</TabItem>
        <TabItem to="/users/admin">アドミン</TabItem>
      </TabMenu>

      <Switch>
        <Route path="/users/user" exact component={UserList}/>
        <Route path="/users/agent" exact component={AgentList}/>
        <Route path="/users/admin" exact component={AdminList}/>
        <Route path="/users/user/:id" exact component={UserDetails}/>
        <Route path="/users/agent/:id" exact component={AgentDetails}/>
      </Switch>

    </div>
  )
}

export default Users;