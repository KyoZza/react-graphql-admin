import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALERT_MESSAGES } from './lib';

import { Alert } from './components';

import Styles from './alerts.module.css'

const Alerts = ({}) => {
  const { data } = useQuery(GET_ALERT_MESSAGES);

  return (
    <div className={Styles.container}>
      {
        data && data.alertMessages.length > 0 ?
        data.alertMessages.map(alertMessage =>
          <Alert
            key={alertMessage.id}
            id={alertMessage.id}
            type={alertMessage.type}
          >{ alertMessage.message }</Alert>
        ) :
        null
      }
    </div>
  )
}

Alerts.propTypes = {

}

export default Alerts;