import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from "./firebase";
import logo from './logo.svg';
import { SwatchesPicker  } from 'react-color';
import './App.scss';

import { simpleAction, add } from './actions/simpleAction'

class App extends Component {

  componentWillMount() {
    db.on("value", snap => { 
      this.props.simpleAction(snap.val());
    })
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
     <h1 className="App-title" style={{color: this.props.simpleReducer.result}}>Welcome to React</h1>
      <div className="App-intro">
        <SwatchesPicker onChange={ this.add } />
        <ul>{this.props.simpleReducer.pastColor ? Object.values(this.props.simpleReducer.pastColor).map((color, i) => 
          <li key={i} style={{color: color}}>{color}</li>)
        :
        "loading...."
        }
        </ul>
      </div>
    </header>
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
