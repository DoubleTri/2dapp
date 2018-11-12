import React, { useState, useEffect  } from 'react';
import { useGlobal } from 'reactn';
import { auth, fireStore } from '../firebase'
import {  Col, Divider  } from 'antd';

import AddPoints from './addPoints/AddPoints'

function UserHome(props) {

  console.log('home component')
  const [obj, setObj] = useState(null); 
  const [uid, setUid] = useGlobal('uid')

  useEffect(() => {
    fireStore.collection("users").doc(auth.currentUser.uid).get().then(function (doc) {
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
    <Col xs={{ span: 20, offset: 2 }} sm={{ span: 12, offset: 6 }} style={{ marginTop: '5em' }} >
    <Divider orientation="left">{obj ? obj.firstName + "'s" : null } Recent Points Received</Divider>
      <div>{obj ?
        <div>
     
          {obj.points.map((pointObj, i) => {
            return <li key={i}><b>{pointObj.value}</b> on {Date.now()} for {pointObj.reason}</li>
          })}

          <br />

          <div>Total Points (week of {Date.now().toString} ) = {pointTotal}</div>
          
        </div>
        
        : 'loading....'}</div>
        <Divider orientation="left">Give Points to {obj ? obj.twoDFirstName : null}</Divider>
        { obj ? <AddPoints twoDUid={obj.twoDUid} /> : 'loading....' } 
      </Col>
    </div>
  );
}

export default UserHome; 
 