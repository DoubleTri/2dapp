import React, { useState, useEffect  } from 'react';
import { db } from '../firebase'

import AddPoints from './addPoints/AddPoints'

function UserHome(props) {

  const [obj, setObj] = useState(null); 

  useEffect(() => {
    db.ref('users').orderByChild('email').equalTo(props.email).once("value", function (snap) {
      snap.forEach(function (data) {
        db.ref('users/' + data.key).once("value", function (snapTwo) {
          snap.forEach(function (name) { setObj(snapTwo.val()) })
        })
      });
    });
  }, [props.email]);

  return (
    <div className="UserHome">
        <h3>User Home</h3>
        <p>{ obj ? obj.name : 'loading....' }</p>
        <AddPoints />
    </div>
  );
}

export default UserHome; 
 