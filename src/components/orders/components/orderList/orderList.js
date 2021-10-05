import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { GET_ORDERS } from './lib';
import { parseTimestamp } from '../../../../lib/date'
import { formatPrice } from '../../../../lib/currency'
import { OWNER_TYPE } from '../../../../lib/types';

import { Table, TableColumn, TableRow } from '../../../basicComponents/table';
import { OverlayLoad } from '../../../basicComponents/loading';
import { Checkbox } from '../../../basicComponents/input';

const OrderList = () => {
  const { data, loading } = useQuery(GET_ORDERS);
  const [splitByPatients, setSplitByPatients] = useState(false);


  return (
    loading ? <OverlayLoad/> :
    <>
      <Checkbox checked={splitByPatients} onChange={setSplitByPatients}>入居者による分割</Checkbox>
      <Table
        head={
          <TableRow head>
            <TableColumn head>ID</TableColumn>
            <TableColumn head>日付</TableColumn>
            <TableColumn head>担当者</TableColumn>
            <TableColumn head>美容師</TableColumn>
            { splitByPatients ? 
              <TableColumn head>入居者</TableColumn> :
              <TableColumn head>人数</TableColumn>
            }
            <TableColumn head>価格</TableColumn>
            <TableColumn head>ステータス</TableColumn>
          </TableRow>
        }
      >
        {
          splitByPatients ?
          data && data.orders.map(order => 
            order.details.map((patientInfo, j) => 
              <TableRow key={`${order.id} ${j}`}>
                <TableColumn>{ order.id }</TableColumn>
                <TableColumn>{ parseTimestamp(order.date, true) }</TableColumn>
                <TableColumn>
                  {/* #TODO add like to carecenter (once CC Detail page is done)  */}
                  {/* <Link to="">{ order.orderer.owner.name }</Link> */}
                  { order.orderer.owner.name }
                </TableColumn>
                <TableColumn>
                  <Link to={`/users/user/${order.belongTo.owner.id}`}>{ order.belongTo.owner.name }</Link>
                </TableColumn>
                <TableColumn>{ patientInfo.patient.name }</TableColumn>
                <TableColumn>{ formatPrice(
                  order.orderer.owner.type === OWNER_TYPE.organization ? 
                  patientInfo.services[0].price.forOrganization : patientInfo.services[0].price.forIndividual
                )}</TableColumn>
                <TableColumn>{ order.status }</TableColumn>
              </TableRow>
          )).flat()
          :
          data && data.orders.map(order => 
            <TableRow key={order.id}>
              <TableColumn>{ order.id }</TableColumn>
              <TableColumn>{ parseTimestamp(order.date, true) }</TableColumn>
              <TableColumn>
                {/* #TODO add like to carecenter (once CC Detail page is done)  */}
                {/* <Link to="">{ order.orderer.owner.name }</Link> */}
                { order.orderer.owner.name }
              </TableColumn>
              <TableColumn>
                <Link to={`/users/user/${order.belongTo.owner.id}`}>{ order.belongTo.owner.name }</Link>
              </TableColumn>
              <TableColumn>{ order.details.length }</TableColumn>
              <TableColumn>{ formatPrice(
                // Sums up the service fee for each patient.
                order.details.map((patientInfo) => 
                  order.orderer.owner.type === OWNER_TYPE.organization ? 
                  patientInfo.services[0].price.forOrganization : patientInfo.services[0].price.forIndividual
                ).reduce((prevVal, curVal) => prevVal + curVal)
              )}</TableColumn>
              <TableColumn>{ order.status }</TableColumn>
            </TableRow>
          )
        }
      </Table>
    </>
  )
}

export default OrderList;