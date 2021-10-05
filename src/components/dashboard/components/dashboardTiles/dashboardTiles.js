import React from 'react';

import { UsersTile, OrdersTile } from './components';
import { Tiles } from '../../../basicComponents/tiles';

const DashboardTiles = ({}) => 
  <Tiles>
    <UsersTile/>
    <OrdersTile/>
  </Tiles>


export default DashboardTiles;