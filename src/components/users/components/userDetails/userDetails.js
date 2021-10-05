import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';
import { GET_USER, DELETE_USER, VERIFY_USER } from './lib';
import { GET_USERS } from '../userList/lib';
import { parseTimestamp } from '../../../../lib/date'
import { getDisplayUserType } from '../../../../lib/types'

import { 
  KeyValueList, 
  KeyValuePair, 
  Key, 
  Value 
} from '../../../basicComponents/keyValueList';
import { OverlayLoad } from '../../../basicComponents/loading';
import { ButtonWrapper, ButtonSecondary } from '../../../basicComponents/button';
import { Prompt } from '../../../basicComponents/prompt';
import { pushSuccessAlert, pushErrorAlert } from '../../../basicComponents/alerts';

import testUsers from '../userList/testUsers';

const UserDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  const [showDeleteUserPrompt, setShowDeleteUserPrompt] = useState(false);

  const {loading: userLoading, refetch } = useQuery(GET_USER, { 
    variables: { id },
    // redirect back to users page if there was an error finding the user
    // onError: () => history.push('/users')
  });

  // use fake data for this sample
  const data = { user: testUsers.find(user => user.id === parseInt(id)) };
  if(!data) history.push('/users');

  const [verifyUser, { loading: verifyUserLoading}] = useMutation(VERIFY_USER, {
    onCompleted: () => {
      refetch();
      pushSuccessAlert('ユーザーが確認されました。')
    },
    onError: error => pushErrorAlert(error.message)
  });

  const [deleteUser, { loading: deleteUserLoading }] = useMutation(DELETE_USER, {
    onCompleted: () => {
      pushSuccessAlert('ユーザーが削除されました。');
      // redirect back to users page after removal
      history.push('/users');
    },
    onError: error => pushErrorAlert(error.message),
    refetchQueries: [{query: GET_USERS}]
  })


  return (
    <>
      <h2>ユーザーの詳細</h2>

      { showDeleteUserPrompt && 
        <Prompt
          onCancel={() => setShowDeleteUserPrompt(false)}
          onConfirm={() => deleteUser({ variables: { id }})}
        >
          本当に{ data ? data.user.name : 'このユーザー' }を削除しますか？
        </Prompt>
      }

      <ButtonWrapper tight alignEnd>
        { (data && data.user.isVerified) ||
          <ButtonSecondary onClick={() => verifyUser({variables: { email: data.user.email}})}>確認</ButtonSecondary>
        }
        <ButtonSecondary onClick={() => setShowDeleteUserPrompt(true)} danger>削除</ButtonSecondary>
      </ButtonWrapper>


      {
        userLoading || deleteUserLoading || verifyUserLoading ? <OverlayLoad/> :

        <KeyValueList>
          <KeyValuePair>
            <Key>名前</Key>
            <Value>{ data.user.name }</Value>
          </KeyValuePair>
          <KeyValuePair>
            <Key>名前（ふりがな）</Key>
            <Value>{ data.user.nameKana }</Value>
          </KeyValuePair>
          <KeyValuePair>
            <Key>ID</Key>
            <Value>{ data.user.id }</Value>
          </KeyValuePair>
          <KeyValuePair>
            <Key>メール</Key>
            <Value><a href={`mailto:${data.user.email}`}>{ data.user.email }</a></Value>
          </KeyValuePair>
          <KeyValuePair>
            <Key>電話番号</Key>
            <Value>
              {
                data.user.phoneNumbers[0] ?
                <a href={`tel:${data.user.phoneNumbers[0].number}`}>
                  { data.user.phoneNumbers[0].number }
                </a> : null
              }
            </Value>
          </KeyValuePair>
          <KeyValuePair>
            <Key>ユーザータイプ</Key>
            <Value>{ getDisplayUserType(data.user.userType) }</Value>
          </KeyValuePair>
          <KeyValuePair>
            <Key>入会日</Key>
            <Value>{ parseTimestamp(data.user.createdAt, true) }</Value>
          </KeyValuePair>
          <KeyValuePair>
            <Key>更新日</Key>
            <Value>{ parseTimestamp(data.user.updatedAt, true) }</Value>
          </KeyValuePair>
        </KeyValueList>
      }
    </>
  )
}

export default UserDetails;