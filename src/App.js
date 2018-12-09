import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Layout } from 'antd'


import { auth } from "./firebase";
import './App.scss';
import 'antd/dist/antd.css'; 

import Login from './components/Login';
import UserHome from './components/UserHome';
import CreateAccount from './components/CreateAccount';
import Invite from './components/Invite';
import Spinner from './components/Spinner'

function App() {

  const [user, setUser] = useGlobal('user')
  const [uid, setUid] = useGlobal('uid') 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged((newUser) => {
      setUser(newUser)
      newUser ? setUid(newUser.uid) && console.log('uid loaded') : console.log('no user')
      setLoading(false)
    })
  }, [])

  const logout = () => {
    console.log('logged out...')
    auth.signOut();
    setUser(null);
    return <Redirect to="/login"/>
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

  const { Header } = Layout;

    return (
      loading ? <Spinner />
      : 
      <Router>
        <div>
            <Layout>
              <Header style={{backgroundColor: '#547D8B', textAlign: 'center'}} className="header">
              <span style={{fontSize: '2.4em'}}>The 2D App</span>{ user? <span style={{float: 'right'}} onClick={logout}>Log Out</span> : null}
              </Header>
            </Layout>
           
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
