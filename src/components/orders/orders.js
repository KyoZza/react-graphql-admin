import React from 'react';
import { Redirect, useLocation, Route, Switch } from 'react-router-dom';
import { TabMenu, TabItem } from '../basicComponents/tabMenu';
import { 
  OrderList, 
  AgentOrderList, 
  InvoiceList 
} from './components';

import Styles from './orders.module.css';

const Orders = () => {
  const { pathname } = useLocation();

  if(pathname === '/orders') return <Redirect to="/orders/order"/>

  return (
    <div className={Styles.container}>
      <h1>注文一覧</h1>

      <TabMenu>
        <TabItem to="/orders/order">普通の注文</TabItem>
        <TabItem to="/orders/agent-order">エージェントの注文</TabItem>
        <TabItem to="/orders/invoice">請求書</TabItem>
      </TabMenu>

      <Switch>
        <Route path="/orders/order" exact component={OrderList}/>
        <Route path="/orders/order/:id" exact component={OrderList}/>
        <Route path="/orders/agent-order" exact component={AgentOrderList}/>
        <Route path="/orders/agent-order/:id" exact component={AgentOrderList}/>
        <Route path="/orders/invoice" exact component={InvoiceList}/>
        <Route path="/orders/invoice/:id" exact component={InvoiceList}/>
      </Switch>
    </div>
  )
}

export default Orders;