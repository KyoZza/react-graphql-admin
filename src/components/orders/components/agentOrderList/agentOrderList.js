import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { GET_AGENT_ORDERS } from './lib';
import { parseTimestamp } from '../../../../lib/date'
import { formatPrice } from '../../../../lib/currency'
import { OWNER_TYPE } from '../../../../lib/types';

import { Table, TableColumn, TableRow } from '../../../basicComponents/table';
import { OverlayLoad } from '../../../basicComponents/loading';

const AgentOrderList = () => {
  const { data, loading } = useQuery(GET_AGENT_ORDERS);

  return (
    loading ? <OverlayLoad/> :
    <Table
      head={
        <TableRow head>
          <TableColumn head>ID</TableColumn>
          <TableColumn head>日付</TableColumn>
          <TableColumn head>担当者</TableColumn>
          <TableColumn head>美容師</TableColumn>
          <TableColumn head>人数</TableColumn>
          <TableColumn head>価格</TableColumn>
          <TableColumn head>ステータス</TableColumn>
        </TableRow>
      }
    >
      {
        data && data.agentOrders.map((order, i) => 
          <TableRow key={i}>
            <TableColumn>{ order.id }</TableColumn>
            <TableColumn>{ parseTimestamp(order.date, true) }</TableColumn>
            <TableColumn>
                <Link to={`/users/agent/${order.agent.id}`}>{ order.agent.name }</Link>
              </TableColumn>
              <TableColumn>
                <Link to={`/users/user/${order.belongTo.owner.id}`}>{ order.belongTo.owner.name }</Link>
              </TableColumn>
            <TableColumn>{ 
              order.services.map(service => service.quantity)
              .reduce((prevVal, curVal) => prevVal + curVal) 
            }
            </TableColumn>
            <TableColumn>{ formatPrice(
              // Sums up the total service fee 
              order.services.map(service => 
                service.service.price.forOrganization * service.quantity
              ).reduce((prevVal, curVal) => prevVal + curVal)
            )}
            </TableColumn>
            <TableColumn>{ order.status }</TableColumn>
          </TableRow>
        )
      }
    </Table>
  )
}

export default AgentOrderList;