import React from 'react';
import PropTypes from 'prop-types';

import Styles from './tileFront.module.css';
import { TileLoad } from '../../../../../basicComponents/loading';


const TileFront = ({icon, title, value, loading}) => 
  <div className={Styles.container}>
    {
      loading ? <TileLoad/> :

      <>
        <i className={Styles.icon}>{ icon }</i>
        
        <div className={Styles.wrapper}>
          <h4 className={Styles.title}>{ title }:</h4>
          <i className={Styles.value}>{ value }</i>
        </div>
      </>
    }
  </div>

TileFront.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node,
  loading: PropTypes.bool
}

export default TileFront;