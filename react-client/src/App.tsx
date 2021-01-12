import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import AuthContextProvider from './context/AuthContext';
import SignIn from './domain/auth/SignIn';
import SignUp from './domain/auth/SignUp';
import Calendar from './domain/calendar';
import NotFound from './domain/errors/NotFound';
import Home from './domain/home';
import Layout from './domain/layout';
import Progress from './domain/progress';
import Workouts from './domain/workouts';

function App() {
  return (
    <div className='App'>
      <AuthContextProvider>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route exact path='/' component={Home} />
              <Route path='/workouts' component={Workouts} />
              <Route path='/progress' component={Progress} />
              <Route path='/calendar' component={Calendar} />
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
