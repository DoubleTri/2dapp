import React, { useState, useEffect  } from 'react';
import { auth, fireStore } from '../firebase'
import {  Col, Divider  } from 'antd';

import AddPoints from './addPoints/AddPoints'
import UsersPoints from './usersPoints/UsersPoints'
import Graph from './graph/Graph'
import Waiting from './waiting/Waiting'

function UserHome(props) {

  const [obj, setObj] = useState(null);
  const [id, setId] = useState(null)
  const [currentUserObj, setCurrentUserObj] = useState(null)
  const [twoDObj, setTwoDObj] = useState(null)
  const [selected, setSelected] = useState('usersPoints')

  useEffect( async () => {
    await fireStore.collection("users").where('uids', 'array-contains', auth.currentUser.uid).get().then(snap => {
      let doc = snap.docs[0].data()
        setObj(doc)
        setId(snap.docs[0].id)
        if (doc.partnerA.uid === auth.currentUser.uid){
          setCurrentUserObj(doc.partnerA);
          setTwoDObj(doc.partnerB);
        }else{
          setCurrentUserObj(doc.partnerB);
          setTwoDObj(doc.partnerA);
        }
      })
  }, {});

  console.log(id)

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
    if (obj.uids.length === 1) {
      return <Waiting />
    } else if (selected === 'addPoints') {
      return <AddPoints twoDObj={twoDObj} id={id}/>
    } else if (selected === 'graph') {
      return <Graph currentUserObj={currentUserObj} twoDObj={twoDObj} />
    } else if (selected === 'usersPoints') {
      return <UsersPoints currentUserObj={currentUserObj} />
    } else {
      return 'loading....'
    }
  }

  const style = {margin: '25px'}

  return (
    <div className="UserHome">
      {currentUserObj && twoDObj ? 
        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 16, offset: 4 }} style={{ marginTop: '5em' }} >

          <Divider orientation="left">
            <span style={style} onClick={usersPoints}>{currentUserObj.firstName}'s Points</span>
            <span style={style} onClick={addPoints}>Give {twoDObj.firstName} Points</span>
            <span style={style} onClick={graph}>See Graph</span></Divider>

          {renderedThing()}

        </Col>
        :
        'Loading....'
      }
    </div>
  );
}

export default UserHome; 
 