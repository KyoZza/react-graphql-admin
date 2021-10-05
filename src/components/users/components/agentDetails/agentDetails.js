import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';
import { GET_AGENT, DELETE_AGENT, VERIFY_AGENT } from './lib';
import { GET_AGENTS } from '../agentList/lib';
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

const AgentDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  const [showDeleteAgentPrompt, setShowDeleteAgentPrompt] = useState(false);

  const { data, loading: agentLoading } = useQuery(GET_AGENT, { 
    variables: { id },
    // redirect back to users page if there was an error finding the user
    onError: () => history.push('/users')
  });

  const [verifyAgent, { loading: verifyAgentLoading}] = useMutation(VERIFY_AGENT, {
    onCompleted: () => pushSuccessAlert('エージェントが確認されました。'),
    onError: error => pushErrorAlert(error.message)
  });

  const [deleteAgent, { loading: deleteAgentLoading }] = useMutation(DELETE_AGENT, {
    onCompleted: () => {
      pushSuccessAlert('エージェントが削除されました。');
      // redirect back to users page after removal
      history.push('/users/agent');
    },
    onError: error => pushErrorAlert(error.message),
    refetchQueries: [{query: GET_AGENTS}]
  })


  return (
    <>
      <h2>エージェントの詳細</h2>

      { showDeleteAgentPrompt && 
        <Prompt
          onCancel={() => setShowDeleteAgentPrompt(false)}
          onConfirm={() => deleteAgent({ variables: { id }})}
        >
          本当に{ data ? data.agent.name : 'このエージェント' }を削除しますか？
        </Prompt>
      }

      <ButtonWrapper tight alignEnd>
        { (data && data.agent.isVerified) ||
          <ButtonSecondary onClick={() => verifyAgent({variables: { id: data.agent.id}})}>確認</ButtonSecondary>
        }
        <ButtonSecondary onClick={() => setShowDeleteAgentPrompt(true)} danger>削除</ButtonSecondary>
      </ButtonWrapper>


      {
        agentLoading || deleteAgentLoading || verifyAgentLoading || !data ? <OverlayLoad/> :

        <KeyValueList>
          <KeyValuePair>
            <Key>名前</Key>
            <Value>{ data.agent.name }</Value>
          </KeyValuePair>
          <KeyValuePair>
            <Key>名前（ふりがな）</Key>
            <Value>{ data.agent.nameKana }</Value>
          </KeyValuePair>
          <KeyValuePair>
            <Key>ID</Key>
            <Value>{ data.agent.id }</Value>
          </KeyValuePair>
          <KeyValuePair>
            <Key>メール</Key>
            <Value><a href={`mailto:${data.agent.email}`}>{ data.agent.email }</a></Value>
          </KeyValuePair>
          <KeyValuePair>
            <Key>電話番号</Key>
            <Value>
              {
                data.agent.phoneNumber ?
                <a href={`tel:${data.agent.phoneNumber.number}`}>
                  { data.agent.phoneNumber.number }
                </a> : null
              }
            </Value>
          </KeyValuePair>
          <KeyValuePair>
            <Key>入会日</Key>
            <Value>{ parseTimestamp(data.agent.createdAt, true) }</Value>
          </KeyValuePair>
          <KeyValuePair>
            <Key>更新日</Key>
            <Value>{ parseTimestamp(data.agent.updatedAt, true) }</Value>
          </KeyValuePair>
        </KeyValueList>
      }
    </>
  )
}

export default AgentDetails;