import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Layout, Icon, Drawer } from 'antd'


import { auth } from "./firebase";
import './App.scss';
//import 'antd/dist/antd.css'; 

import Login from './components/Login';
import UserHome from './components/UserHome';
import CreateAccount from './components/CreateAccount';
import Invite from './components/Invite';
import Spinner from './components/Spinner'

function App() {

  const [user, setUser] = useGlobal('user')
  const [uid, setUid] = useGlobal('uid') 
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)

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

  const openMenu = () => {
    console.log('menu opened')
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
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

  const { Header } = Layout;

    return (
      loading ? <Spinner />
      : 
      <Router>
        <div>
            <Layout>
              <Header style={{backgroundColor: '#8E44AD', textAlign: 'center'}} className="header">
              {/* <span style={{float: 'left', fontSize: '2em', color: '#34495e'}} onClick={openMenu}><Icon type="menu-unfold"/></span> */}
              <span style={{fontSize: '2.4em'}}><b>Two D Stats</b></span>
              { user? <span style={{float: 'right'}} onClick={logout}>Log Out</span> : null}
              </Header>

              <Drawer
                title='Menu'
                placement='left'
                closable={false}
                onClose={onClose}
                visible={visible}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Drawer>

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
