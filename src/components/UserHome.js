import React, { useState, useEffect  } from 'react';
import { auth, fireStore } from '../firebase'
import {  Col, Divider  } from 'antd';

import AddPoints from './addPoints/AddPoints'
import UsersPoints from './usersPoints/UsersPoints'
import Graph from './graph/Graph'

function UserHome(props) {

  const [obj, setObj] = useState(null);
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fireStore.collection("users").doc(auth.currentUser.uid).get().then(function (doc) {
      setObj(doc.data())
    })
  }, {});

  console.log(obj)

  const usersPoints = () => {
    setSelected('usersPoints')
  }

  const addPoints = () => {
    setSelected('addPoints')
  }

  const graph = () => {
    setSelected('graph')
  }

  let renderedThing = () => {
    if (selected === 'addPoints') {
      return <AddPoints twoDUid={obj.twoDUid} />
    } else if (selected === 'graph') {
      return <Graph obj={obj} />
    } else {
      return <UsersPoints obj={obj} />
    }
  }

  const style = {margin: '25px'}

  return (
    <div className="UserHome">
      {!obj ? 'loading....'
        :
        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 16, offset: 4 }} style={{ marginTop: '5em' }} >

          <Divider orientation="left">
            <span style={style} onClick={usersPoints}>{obj.firstName}'s Points</span>
            <span style={style} onClick={addPoints}>Give {obj.twoDFirstName} Points</span>
            <span style={style} onClick={graph}>See Graph</span></Divider>

          {renderedThing()}

        </Col>
      }
    </div>
  );
}

export default UserHome; 
 