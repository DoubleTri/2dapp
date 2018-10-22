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

import Login from './components/Login';

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
        console.log(user)
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

  handleChange(color, event) {
    console.log("color: " + color.hex)
  }

  add = (color, event) => {
    this.props.add(color.hex);
   }

 render() {
  return (
   <div className="App">
    <header className="App-header">
     <img src={logo} className="App-logo" alt="logo" />
    </header>
    {this.state.user? null : <Login />}
    <p onClick={this.logout.bind(this)}>Log Out</p>
   </div>
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
