import React, { useState, useEffect  } from 'react';
import { useGlobal } from 'reactn';
import { fireStore } from '../firebase'

import AddPoints from './addPoints/AddPoints'

function UserHome(props) {

  console.log('home component')
  const [obj, setObj] = useState(null); 
  const [uid, setUid] = useGlobal('uid')

  useEffect(() => {
    fireStore.collection("users").doc(uid).get().then(function (doc) {
      //console.log("UserHome data:", doc.data());
      setObj(doc.data())
    })
  }, [uid]);

  let pointTotal = null
  
  obj ? obj.points.map((pointObj, i) => {
    pointTotal = pointTotal + pointObj.value
  })
  :
  pointTotal = "loading..."

  return (
    <div className="UserHome">
    {console.log('home rendered')}
        <h3>User Home</h3>
      <div>{obj ?
        <div>
          {obj.firstName} loves {obj.twoDFirstName}
          <br />
     
          {obj.points.map((pointObj, i) => {
            return <li key={i}>{pointObj.value + ' ' + pointObj.reason}</li>
          })}

          <br />

          <div>{pointTotal}</div>
          
        </div>
        
        : 'loading....'}</div>

        { obj ? <AddPoints twoDUid={obj.twoDUid} /> : 'loading....' } 
    </div>
  );
}

export default UserHome; 
 