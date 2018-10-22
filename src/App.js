import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db, auth } from "./firebase";
import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import './App.scss';
import 'antd/dist/antd.css'; 

import Login from './components/Login';
import UserHome from './components/UserHome';

import { simpleAction, login, store } from './actions/simpleAction'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      store: null
    }
  }

  componentWillMount() {

    db.on("value", snap => {
      this.props.store(snap.val());
    })

    auth.onAuthStateChanged(user => {
      if (user) {
        let user = auth.currentUser
        this.handleLogin(user.email)
        this.setState({ user: user.email })
        console.log(user.email)
        
      } else {
        console.log(this.props.login.email)
      }
    })

  }

  logout() {
    console.log('logged out...')
    auth.signOut();
    this.setState({ user: null })
    this.handleLogin(null)
  }

  handleLogin(email) {
    this.props.login(email)
    console.log('handleLogin fired ' + email)
  }

  add = (color, event) => {
    this.props.add(color.hex);
   }



 render() {

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        this.state.user ? (
          <Component {...props} email={this.state.user}/>
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
  //  <div className="App">
  //   <header className="App-header">
  //    <img src={logo} className="App-logo" alt="logo" />
  //   </header>
  //   {this.state.user? null : <Login />}
  //   <p onClick={this.logout.bind(this)}>Log Out</p>
  //  </div>

  <Router>
  <div>
  <p onClick={this.logout.bind(this)}>Log Out</p>
    <Switch>

      <PrivateRoute exact path="/" component={UserHome} />
      
      <Route path="/login" render={() => (
        !this.state.user? (<Route component={(props) =>
          (<Login {...props} />)}
        />)
          :  <Redirect
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
}

const mapStateToProps = state => ({
  ...state
 })

const mapDispatchToProps = dispatch => ({
  simpleAction: (obj) => dispatch(simpleAction(obj)),
  login: (email) => dispatch(login(email)),
  store: (storeObj) => dispatch(store(storeObj))
 })


 export default connect(mapStateToProps, mapDispatchToProps)(App);
