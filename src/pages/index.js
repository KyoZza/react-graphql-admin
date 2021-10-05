import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { loginRedirect, authProtection } from './lib';

// import { Footer } from '../components/footer';

import HomePage from './homePage';
// import SignUpPage from './signupPage';
import DashboardPage from './dashboardPage';
import UsersPage from './usersPage';
import OrdersPage from './ordersPage';
import AccountPage from './accountPage';

import _404Page from './404Page';


const Pages = () => 
  <Router>
    <Switch>
      <Route path={['/', '/login']} exact component={() => loginRedirect(HomePage)}/>
      {/* <Route path="/signup" exact component={() => loginRedirect(SignUpPage)}/> */}
      
      {/* Auth Protected Routes */}
      <Route path={[
        '/dashboard'
      ]} exact 
        component={() => authProtection(DashboardPage)}
      />
      <Route path={[
        '/users',
        '/users/user',
        '/users/user/:id',
        '/users/agent',
        '/users/agent/:id',
        '/users/admin',
        ]} exact 
        component={() => authProtection(UsersPage)}
      />
      <Route path={[
        '/orders',
        '/orders/order',
        '/orders/order/:id',
        '/orders/agent-order',
        '/orders/agent-order/:id',
        '/orders/invoice',
        '/orders/invoice/:id',
      ]} exact 
        component={() => authProtection(OrdersPage)}
      />
      <Route path={[
          '/account',
          '/account/profile',
          '/account/email',
          '/account/password',
        ]} exact 
        component={() => authProtection(AccountPage)}
      />

      
      {/* UNMATCHED ROUTES  Display custom 404 Page*/}
      <Route component={_404Page}/>
    </Switch>
    {/* <Footer/> */}
  </Router>

export default Pages;