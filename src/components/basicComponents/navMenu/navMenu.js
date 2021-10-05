import React, { useState } from 'react';
import { useQuery, useApolloClient, useLazyQuery } from '@apollo/react-hooks';
import { NavItem, NavItemLink, NavItemButton } from './components/navItem';
import { AUTH_USER_NAV_DATA } from './lib';
import { clearLoginState } from '../../../graphql'
import { IS_AUTHENTICATED } from '../../../graphql/commonQueries';

// import SignUpIcon from '@material-ui/icons/PersonAdd';
// import LoginIcon from '@material-ui/icons/VpnKey';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import UsersIcon from '@material-ui/icons/PeopleAlt';
import OrdersIcon from '@material-ui/icons/Assignment';
// import ScheduleIcon from '@material-ui/icons/DateRange';
import Styles from './navMenu.module.css';

const NavMenu = props => {
  const isAuthenticated = !!localStorage.getItem('token');
  const [name, setName] = useState('')

  const client = useApolloClient();
  client.query({
    query: AUTH_USER_NAV_DATA
  })
  .then(({data}) => setName(data.loginWithToken.data.name))
  .catch(error => null);


  return (
    isAuthenticated ?
    <nav className={Styles.container}> 
      <NavItem>{ name }</NavItem>
      <NavItemLink to="/dashboard" icon={<DashboardIcon fontSize="inherit"/>}>ダッシュボード</NavItemLink>
      <NavItemLink to="/users" icon={<UsersIcon fontSize="inherit"/>}>ユーザー</NavItemLink>
      <NavItemLink to="/orders" icon={<OrdersIcon fontSize="inherit"/>}>注文一覧</NavItemLink>
      <NavItemLink to="/account" icon={<SettingsIcon fontSize="inherit"/>}>アカウント設定</NavItemLink>
      <NavItemButton onClick={() => clearLoginState(client)} icon={<LogoutIcon fontSize="inherit"/>}>ログアウト</NavItemButton>   
    </nav> :
    null
  )
}

NavMenu.propTypes = {

}

export default NavMenu;