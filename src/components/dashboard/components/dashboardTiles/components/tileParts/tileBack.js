import React from 'react';
import PropTypes from 'prop-types';
import { TileLoad } from '../../../../../basicComponents/loading';

import { 
  KeyValueList,
  KeyValuePair,
  Key,
  Value  
} from '../../../../../basicComponents/keyValueList';

import Styles from './tileBack.module.css';


const TileBack = ({loading, keyValuePairs = []}) => 
  <div className={Styles.container}>
    {
      loading ? <TileLoad/> :

      <>
        <KeyValueList noMargin>
          {
            keyValuePairs.map((pair, i) =>
              <KeyValuePair key={i.toString()}>
                <Key>{ pair.key }</Key>
                <Value main>{ pair.value }</Value>
              </KeyValuePair>
            )
          }
        </KeyValueList>
      </>
    }
  </div>

TileBack.propTypes = {
  loading: PropTypes.bool,
  keyValuePairs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    })
  )
}

export default TileBack;