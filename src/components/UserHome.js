import React, { useState, useEffect  } from 'react';
import { useGlobal } from 'reactn';
import { db } from '../firebase'

import AddPoints from './addPoints/AddPoints'

function UserHome(props) {

  const [obj, setObj] = useState(null); 
  const [uid, setUid] = useGlobal('uid')
  const [user, setUser] = useGlobal('user') 



  useEffect(() => {
    db.child('users/' + uid).once("value", function (snap) {
      console.log(snap.val())
      setObj(snap.val())
      console.log(user.email)
      console.log(snap.child('points').val())
    });
  }, {});

  return (
    <div className="UserHome">
        <h3>User Home</h3>
        <p>{ obj ? <div>{obj.firstName} loves {obj.twoDFirstName} </div> : 'loading....' }</p>
        { obj ? <AddPoints twoDUid={obj.twoDUid} /> : 'loading....' } 
    </div>
  );
}

export default UserHome; 
 