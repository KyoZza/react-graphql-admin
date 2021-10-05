import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { IS_AUTHENTICATED } from '../../graphql/commonQueries';
import { Redirect } from 'react-router-dom';


const AuthProtection = Page => {
  const { data } = useQuery(IS_AUTHENTICATED);

  /**
   * Render the given page if the user is authenticated
   * otherwise redirect to the login screen
   */ 
  return data && data.isAuthenticated ? 
    <Page/> : <Redirect to="/login"/>;
}

AuthProtection.propTypes = {
  Page: PropTypes.element.isRequired
}

export default AuthProtection;