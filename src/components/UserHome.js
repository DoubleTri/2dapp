import React, { useState, useEffect  } from 'react';
import { auth, fireStore } from '../firebase'
import {  Col, Divider, Row  } from 'antd';
import moment from 'moment';

import AddPoints from './addPoints/AddPoints'

function UserHome(props) {

  const [obj, setObj] = useState(null);
  const [pointTotal, setPointTotal] = useState(null); 

  useEffect(() => {
    let pointArr = [];  

    fireStore.collection("users").doc(auth.currentUser.uid).get().then(function (doc) {
      setObj(doc.data())

      // doc.data().points.forEach((pointObj, i) => {
      //   pointArr.push(pointObj.value);
      //   if(i === doc.data().points.length -1){
      //     setPointTotal(pointArr.reduce((a, b) => a + b, 0))
      //   }
      // })
    })
  }, {});

  console.log(obj)

  return (
    <div className="UserHome">
      {!obj ? 'loading....'
        :
        <Row gutter={16}>
          <Col xs={{ span: 20, offset: 2 }} sm={{ span: 12, offset: 6 }} style={{ marginTop: '5em' }} >
            <Divider orientation="left">{obj.firstName + "'s"} Recent Points Received</Divider>
            <br />
            <div id="pointTotalLine"><b>Total Points</b> (week ending {moment(obj.points.weekEnding).calendar()} ) = <b>{pointTotal}</b></div>
            <br />
            {obj.points.points.map((pointObj, i) => {
              return <li key={i}><span id="pointTitleLine"><b>{pointObj.value} {pointObj.value > 1 ? 'Points' : 'Point'}</b> {moment(pointObj.date).calendar()} </span>
                <br /> {pointObj.reason} <hr /></li>
            })}
          </Col>

          <Col xs={{ span: 20, offset: 2 }} sm={{ span: 12, offset: 6 }} style={{ marginTop: '5em' }} >
            <Divider orientation="left">Give Points to {obj.twoDFirstName}</Divider>
            <AddPoints twoDUid={obj.twoDUid} />
          </Col>
        </Row>
      }
    </div>
  );
}

export default UserHome; 
 