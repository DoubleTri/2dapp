import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from "../firebase";

class UserHome extends Component {

render() {
    return ( 
        <div className = "UserHome" >
            <h3>User Home</h3>
            <p>{this.props.login.result}</p>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
   })
  
const mapDispatchToProps = dispatch => ({
    // simpleAction: (obj) => dispatch(simpleAction(obj)),
    // add: (color) => dispatch(add(color))
})
  
  
export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
