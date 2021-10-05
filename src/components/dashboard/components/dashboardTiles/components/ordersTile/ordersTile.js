import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { GET_ORDER_COUNT } from './lib';

import { TileFront, TileBack } from '../tileParts';
import { FlipTile } from '../../../../../basicComponents/tiles';

import OrdersIcon from '@material-ui/icons/Assignment';


const OrdersTile = ({}) => {
  const { data, loading } = useQuery(GET_ORDER_COUNT);

  return (
    <Link to="/orders">
      <FlipTile
        front={
          <TileFront 
            icon={<OrdersIcon fontSize="inherit"/>}
            title="注文数"
            // value={data && 
            //   data.orders.length +
            //   data.agentOrders.length
            // }
            value={243}
            loading={loading}
          />
        }
        back={
          <TileBack 
            loading={loading}
            keyValuePairs={[
              {
                key: '普通の注文',
                value: 186,
                // value: data && data.orders.length
              },
              {
                key: 'エージェントの注文',
                value: 59
                // value: data && data.agentOrders.length
              },
              {
                key: '請求書',
                value: 201
                // value: data && data.invoices.length
              }
            ]}
          />
        }
      />
    </Link>
  )
}

// UsersTile.propTypes = {

// }

export default OrdersTile;