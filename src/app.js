import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client, ApolloInitialLoad } from './graphql';

import Pages from './pages';

import './app.css';


document.addEventListener('submit', e => e.preventDefault());

const App = () =>
  <ApolloProvider client={client}>
    <ApolloInitialLoad/>
    <div className="App">
      <Pages/>
    </div>
  </ApolloProvider>;

export default App;