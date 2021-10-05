import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { GET_AGENTS } from './lib';
import { VERIFY_AGENT, DELETE_AGENT } from '../agentDetails';
import { parseTimestamp } from '../../../../lib/date'
import { getDisplayUserStatus } from '../../../../lib/types'

import { Table, TableColumn, TableRow } from '../../../basicComponents/table';
import { Prompt } from '../../../basicComponents/prompt';
import { OverlayLoad } from '../../../basicComponents/loading';
import { ButtonSecondary } from '../../../basicComponents/button';
import { pushSuccessAlert, pushErrorAlert } from '../../../basicComponents/alerts';

const AgentList = () => {
  const [showDeleteAgentPrompt, setShowDeleteAgentPrompt] = useState(null);

  const { data, loading: agentsLoading, refetch } = useQuery(GET_AGENTS);

  const [verifyAgent, { loading: verifyLoading}] = useMutation(VERIFY_AGENT, {
    onCompleted: () => pushSuccessAlert('エージェントが確認されました。'),
    onError: error => pushErrorAlert(error.message)
  });

  const [deleteAgent, { loading: deleteLoading}] = useMutation(DELETE_AGENT, {
    onCompleted: () => {
      refetch();
      pushSuccessAlert('エージェントが削除されました。');
      setShowDeleteAgentPrompt(null);
    },
    onError: error => pushErrorAlert(error.message)
  });


  return (
    <>
      { showDeleteAgentPrompt && 
        <Prompt
          onCancel={() => setShowDeleteAgentPrompt(null)}
          onConfirm={() => deleteAgent({ variables: { id: showDeleteAgentPrompt.id }})}
        >
          本当に{showDeleteAgentPrompt.name}を削除しますか？
        </Prompt>
      }

      {
        agentsLoading || verifyLoading || deleteLoading ? <OverlayLoad/> :
        <Table
          head={
            <TableRow head>
              <TableColumn head>名前</TableColumn>
              <TableColumn head>メール</TableColumn>
              <TableColumn head>電話番号</TableColumn>
              <TableColumn head>ステータス</TableColumn>
              <TableColumn head>入会日</TableColumn>
              <TableColumn head>更新日</TableColumn>
              <TableColumn head></TableColumn>
              <TableColumn head></TableColumn>
            </TableRow>
          }
        >
          {
            data && data.agents.map(agent => 
              <TableRow key={agent.id}>
                <TableColumn><Link to={`/users/agent/${agent.id}`}>{ agent.name }</Link></TableColumn>
                <TableColumn>{ agent.email }</TableColumn>
                <TableColumn>{ agent.phoneNumber ? agent.phoneNumber.number : '-' }</TableColumn>
                <TableColumn>{ getDisplayUserStatus(agent.status) }</TableColumn>
                <TableColumn>{ parseTimestamp(agent.createdAt, true) }</TableColumn>
                <TableColumn>{ parseTimestamp(agent.updatedAt, true) }</TableColumn>

                <TableColumn>
                  { agent.isVerified ||
                    <ButtonSecondary 
                      onClick={() => verifyAgent({
                        variables: { id: agent.id }
                      })}
                    >
                      確認
                    </ButtonSecondary>
                  }
                </TableColumn>
                <TableColumn>
                  <ButtonSecondary 
                    danger
                    onClick={() => setShowDeleteAgentPrompt({
                      id: agent.id,
                      name: agent.name
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

export default AgentList;