import React, { useState, useEffect  } from 'react';
import { auth, fireStore } from '../firebase'
import {  Col, Divider  } from 'antd';

import AddPoints from './addPoints/AddPoints'

function UserHome(props) {

  const [obj, setObj] = useState(null);
  const [pointTotal, setPointTotal] = useState(null); 

  useEffect(() => {
    let pointArr = [];  

    fireStore.collection("users").doc(auth.currentUser.uid).get().then(function (doc) {
      setObj(doc.data())

      doc.data().points.forEach((pointObj, i) => {
        pointArr.push(pointObj.value);
        if(i === doc.data().points.length -1){
          setPointTotal(pointArr.reduce((a, b) => a + b, 0))
        }
      })
    })
  }, {});

  return (
    <div className="UserHome">
    
    <Col xs={{ span: 20, offset: 2 }} sm={{ span: 12, offset: 6 }} style={{ marginTop: '5em' }} >
    {!obj ? 'loading....'
    :
    <div> 
    <Divider orientation="left">{obj ? obj.firstName + "'s" : null } Recent Points Received</Divider>
     
          {obj.points.map((pointObj, i) => {
            return <li key={i}><b>{pointObj.value}</b> on {Date.now()} for {pointObj.reason}</li>
          })}

          <br />

          <div>Total Points (week of) = {pointTotal}</div>
          
        <Divider orientation="left">Give Points to {obj ? obj.twoDFirstName : null}</Divider>
        <AddPoints twoDUid={obj.twoDUid} />  
        </div> 
        }
      </Col>
    </div>
  );
}

export default UserHome; 
 