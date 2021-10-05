import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ADMINS } from './lib';
import { USER_TYPE } from '../../../../lib/types';
import { parseTimestamp } from '../../../../lib/date';

import { Table, TableColumn, TableRow } from '../../../basicComponents/table';
import { OverlayLoad } from '../../../basicComponents/loading';
// import { Button } from '../../../basicComponents/button';


const AdminList = () => {
  const { data, loading } = useQuery(GET_ADMINS);

  return (
    loading ? <OverlayLoad/> :
    <Table
      head={
        <TableRow head>
          <TableColumn head>名前</TableColumn>
          <TableColumn head>電話番号</TableColumn>
          <TableColumn head>入会日</TableColumn>
        </TableRow>
      }
    >
      {
        data && data.users.map((user, i) => 
          <TableRow key={i}>
            <TableColumn>{ user.name }</TableColumn>
            <TableColumn>{ user.phoneNumbers[0] ? user.phoneNumbers[0].number : '-'}</TableColumn>
            <TableColumn>{ parseTimestamp(user.createdAt) }</TableColumn>
          </TableRow>
        )
      }
    </Table>
  )
}

export default AdminList;