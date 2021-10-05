import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { GET_USERS } from './lib';
import { VERIFY_USER, DELETE_USER } from '../userDetails';
import { parseTimestamp } from '../../../../lib/date'
import { getDisplayUserType, getDisplayUserStatus } from '../../../../lib/types'

import { Table, TableColumn, TableRow } from '../../../basicComponents/table';
import { Prompt } from '../../../basicComponents/prompt';
import { OverlayLoad } from '../../../basicComponents/loading';
import { ButtonSecondary } from '../../../basicComponents/button';
import { pushSuccessAlert, pushErrorAlert } from '../../../basicComponents/alerts';

import testUsers from './testUsers';

const UserList = () => {
  const [showDeleteUserPrompt, setShowDeleteUserPrompt] = useState(null);

  const { data, loading: usersLoading, refetch } = useQuery(GET_USERS);

  const [verifyUser, { loading: verifyLoading}] = useMutation(VERIFY_USER, {
    onCompleted: () => {
      refetch();
      pushSuccessAlert('ユーザーが確認されました。')
    },
    onError: error => pushErrorAlert(error.message)
  });

  const [deleteUser, { loading: deleteLoading}] = useMutation(DELETE_USER, {
    onCompleted: () => {
      refetch();
      pushSuccessAlert('ユーザーが削除されました。');
      setShowDeleteUserPrompt(null);
    },
    onError: error => pushErrorAlert(error.message)
  });


  return (
    <>
      { showDeleteUserPrompt && 
        <Prompt
          onCancel={() => setShowDeleteUserPrompt(null)}
          onConfirm={() => deleteUser({ variables: { id: showDeleteUserPrompt.id }})}
        >
          本当に{showDeleteUserPrompt.name}を削除しますか？
        </Prompt>
      }

      {
        usersLoading || verifyLoading || deleteLoading  ? <OverlayLoad/> :
        <Table
          head={
            <TableRow head>
              <TableColumn head>名前</TableColumn>
              <TableColumn head>メール</TableColumn>
              <TableColumn head>電話番号</TableColumn>
              <TableColumn head>タイプ</TableColumn>
              <TableColumn head>ステータス</TableColumn>
              <TableColumn head>入会日</TableColumn>
              <TableColumn head>更新日</TableColumn>
              <TableColumn head></TableColumn>
              <TableColumn head></TableColumn>
            </TableRow>
          }
        >
          {
            // data && data.users.map(user => 
            testUsers.map(user => 
              <TableRow key={user.id}>
                <TableColumn><Link to={`/users/user/${user.id}`}>{ user.name }</Link></TableColumn>
                <TableColumn>{ user.email }</TableColumn>
                <TableColumn>{ user.phoneNumbers[0] ? user.phoneNumbers[0].number : '-' }</TableColumn>
                <TableColumn>{ getDisplayUserType(user.userType) }</TableColumn>
                <TableColumn>{ getDisplayUserStatus(user.status) }</TableColumn>
                <TableColumn>{ parseTimestamp(user.createdAt, true) }</TableColumn>
                <TableColumn>{ parseTimestamp(user.updatedAt, true) }</TableColumn>

                <TableColumn>
                  { user.isVerified ||
                    <ButtonSecondary 
                      onClick={() => verifyUser({
                        variables: { email: user.email }
                      })}
                    >
                      確認
                    </ButtonSecondary>
                  }
                </TableColumn>
                <TableColumn>
                  <ButtonSecondary 
                    danger
                    onClick={() => setShowDeleteUserPrompt({
                      id: user.id,
                      name: user.name
                    })}
                  >
                    削除
                  </ButtonSecondary>
                </TableColumn>
              </TableRow>
            )
          }
        </Table>
      }
    </>
  )
}

export default UserList;