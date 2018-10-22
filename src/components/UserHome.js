import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from "../firebase";

class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: this.props.login.email
        }
      }

componentWillMount() {

}

render() {

    var points = this.props.store.store ?
        <ul>
            {Object.values(this.props.store.store.users.Boss.points).map((point, i) => {
            return <li key={i}>{point}</li>}) }
        </ul> 
        : 'loading...';

    return ( 
        <div className = "UserHome" >
            <h3>User Home</h3>
            <p>{this.props.login.email}</p>
            <p>{points}</p>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
   })
  
const mapDispatchToProps = dispatch => ({
    // simpleAction: (obj) => dispatch(simpleAction(obj)),
    // login: (email) => dispatch(login(email))
})
  
  
export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
