import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { db, auth } from "./firebase";
import logo from './logo.svg';
import './App.scss';
import 'antd/dist/antd.css'; 

import Login from './components/Login';
import UserHome from './components/UserHome';
import CreateAccount from './components/CreateAccount';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => { auth.onAuthStateChanged((newUser) => { 
    setUser(newUser)
  }) }, [auth.onAuthStateChanged])

  const logout = () => {
    console.log('logged out...')
    auth.signOut();
    setUser(null)
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} email={user.email}/>
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );

    return (
      <Router>
        <div>

          {/* Header will go below */}
          <p onClick={logout}>Log Out</p> 
          <Switch>

            {/* <Route exact path="/create-account" component={CreateAccount} /> */}

            <PrivateRoute exact path="/" component={UserHome} />

            <Route path="/create-account" render={() => (
              !user ? (<Route component={(props) =>
                (<CreateAccount {...props} />)}
              />)
                : <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
            )} />

            <Route path="/login" render={() => (
              !user ? (<Route component={(props) =>
                (<Login {...props} />)}
              />)
                : <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
            )} />

          </Switch>
        </div>
      </Router>
    );
  }

 export default App;
