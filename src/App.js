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

import { simpleAction, add } from './actions/simpleAction'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentWillMount() {

    db.on("value", snap => {
      this.props.simpleAction(snap.val());
    })

    auth.onAuthStateChanged(user => {
      if (user) {
        let user = auth.currentUser
        this.setState({ user })
        console.log(user.uid)
        this.handleLogin(user.email)
      } else {
        console.log('no user')
      }
    })

  }

  logout() {
    console.log('logged out...')
    auth.signOut();
    this.setState({ user: null })
  }

  handleLogin(email) {
    console.log('redux funciton called.... ' + email)
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
          <Component {...props} />
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
        !this.state.user ? (<Route component={(props) =>
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
  add: (color) => dispatch(add(color))
 })


 export default connect(mapStateToProps, mapDispatchToProps)(App);
