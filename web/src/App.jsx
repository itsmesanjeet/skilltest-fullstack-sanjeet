import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadToken } from './redux/features/user/userThunk';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';
import Employees from './pages/Employees';
import Login from './pages/Login';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const isInitialized = useSelector((state) => state.user.isInitialized);

  // Create Apollo Client
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user.isAuthenticated && !loading && isInitialized) {
      window.location.href = '/login';
    }
  }, [user.isAuthenticated, loading, isInitialized]);

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  if (loading && !isInitialized) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <ApolloProvider client={client}>
      <>
        {user.isAuthenticated ? (
          <Employees />
        ) : (
          <Login />
        )}
      </>
    </ApolloProvider>
  );
}

export default App;
