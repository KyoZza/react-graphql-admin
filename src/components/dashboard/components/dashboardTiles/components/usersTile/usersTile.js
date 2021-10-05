import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { GET_USER_COUNT } from './lib';
import { USER_TYPE } from '../../../../../../lib/types';

import { TileFront, TileBack } from '../tileParts';
import { FlipTile } from '../../../../../basicComponents/tiles';

import UsersIcon from '@material-ui/icons/PeopleAlt';


const UsersTile = ({}) => {
  const { data, loading } = useQuery(GET_USER_COUNT);

  return (
    <Link to="/users">
      <FlipTile
        front={
          <TileFront 
            icon={<UsersIcon fontSize="inherit"/>}
            title="ユーザー数"
            value={99}
            // value={data && data.users.length + data.agents.length}
            loading={loading}
          />
        }
        back={
          <TileBack 
            loading={loading}
            keyValuePairs={[
              {
                key: USER_TYPE.patient.ui,
                value: 40
                // value: data && data.users
                //   .filter(user => user.userType === USER_TYPE.patient.db).length
              },
              {
                key: USER_TYPE.family.ui,
                value: 17
                // value: data && data.users
                //   .filter(user => user.userType === USER_TYPE.family.db).length
              },
              {
                key: USER_TYPE.careCenter.ui,
                value: 10
                // value: data && data.users
                //   .filter(user => user.userType === USER_TYPE.careCenter.db).length
              },
              {
                key: USER_TYPE.practitioner.ui,
                value: 21
                // value: data && data.users
                //   .filter(user => user.userType === USER_TYPE.practitioner.db).length
              },    
              {
                key: 'エージェント',
                value: 7
                // value: data && data.agents.length
              },
              {
                key: USER_TYPE.admin.ui,
                value: 4
                // value: data && data.users
                //   .filter(user => user.userType === USER_TYPE.admin.db).length
              },
            ]}
          />
        }
      />
    </Link>
  )
}

// UsersTile.propTypes = {

// }

export default UsersTile;