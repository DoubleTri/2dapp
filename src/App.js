import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { db, auth } from "./firebase";
import './App.scss';
import 'antd/dist/antd.css'; 

import Login from './components/Login';
import UserHome from './components/UserHome';
import CreateAccount from './components/CreateAccount';
import Invite from './components/Invite';


function App() {

  const [user, setUser] = useGlobal('user')
  const [uid, setUid] = useGlobal('uid') 
  const [loading, setLoading] = useState(true)

  console.log(loading)
  console.log(user)
  console.log(uid)

  useEffect(() => {
    auth.onAuthStateChanged((newUser) => {
      setUser(newUser)
      newUser ? setUid(newUser.uid) : console.log('no user')
      setLoading(false)
    })
  }, [auth.onAuthStateChanged])

  const logout = () => {
    console.log('logged out...')
    auth.signOut();
    setUser(null)
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      render={(props) =>
        user ? (
          <Component />
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

  // const RestrictedRoute = ({ component: Component, ...rest }) => (
  //   <Route
  //     {...rest}
  //     render={props =>
  //       !user ? (
  //         <Component {...props} />
  //       ) : (
  //           <Redirect
  //             to={{
  //               pathname: "/",
  //               state: { from: props.location }
  //             }}
  //           />
  //         )
  //     }
  //   />
  // );

    return (
      loading ? 'loading.....'
      : 
      <Router>
        <div>

          {/* Header will go below */}
          { user? <p onClick={logout}>Log Out</p> : null} 
          <Switch>

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

            <Route path="/invite/:user" render={() => (
              !user ? (<Route component={(props) =>
                (<Invite {...props} />)}
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
