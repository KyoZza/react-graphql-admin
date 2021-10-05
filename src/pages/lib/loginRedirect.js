import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { IS_AUTHENTICATED } from '../../graphql/commonQueries';
import { Redirect } from 'react-router-dom';


const LoginRedirect = Page => {
  const { data } = useQuery(IS_AUTHENTICATED);

  /**
   * Redirect to the account page if the user is authenticated
   * otherwise render the given page 
   */ 
  return data && data.isAuthenticated ? 
    <Redirect to="/dashboard"/> : <Page/>;
}

LoginRedirect.propTypes = {
  Page: PropTypes.element.isRequired
}

export default LoginRedirect;