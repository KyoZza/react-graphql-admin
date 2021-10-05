import React from 'react'

import { DashboardTiles } from './components';
// import { LinkButton } from '../basicComponents/button';


import Styles from './dashboard.module.css';

const Dashboard = () => 
  <div className={Styles.container}>
    <h1>ダッシュボード</h1>

    <DashboardTiles/>
  </div>

export default Dashboard
