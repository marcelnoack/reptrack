import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import AuthContextProvider from './context/AuthContext';
import SignIn from './domain/auth/SignIn';
import SignUp from './domain/auth/SignUp';
import NotFound from './domain/errors/NotFound';
import Layout from './domain/layout';

function App() {
  return (
    <div className='App'>
      <AuthContextProvider>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <PrivateRoute path='/protected'>
                <h1>Protected</h1>
              </PrivateRoute>
              <Route path='*' component={NotFound} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
