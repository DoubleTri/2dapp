import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from "../firebase";

class UserHome extends Component {

componentWillMount() {
   
    db.child('users').orderByChild('email').equalTo(this.props.login.email).on("value", function (snap) {
        snap.forEach(function (data) {
          console.log(data.key)
      })
    })

}

render() {
    return ( 
        <div className = "UserHome" >
            <h3>User Home</h3>
            <p>{this.props.login.email}</p>
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
