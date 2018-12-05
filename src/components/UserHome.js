import React, { useState, useEffect  } from 'react';
import { auth, fireStore } from '../firebase'
import {  Col, Divider  } from 'antd';
import Loader from 'react-loader-spinner'

import AddPoints from './addPoints/AddPoints'
import UsersPoints from './usersPoints/UsersPoints'
import Graph from './graph/Graph'
import Waiting from './waiting/Waiting'

function UserHome(props) {

  const [obj, setObj] = useState(null);
  const [id, setId] = useState(null)
  const [currentUserObj, setCurrentUserObj] = useState(null)
  const [partner, setPartner] = useState(null)
  const [twoDObj, setTwoDObj] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    // App.js updates user info much fasten then the DB.  
    // Thus when a second user signed up for the first time via the invite page the program would crash becase a user was there but there was no doc in the DB yet.  
    // My solution was to put the .get() function in an if statement...
    // If doc, run function. Else wait 2.5 seconds and try again.  
    let dbCheck = () => {
      fireStore.collection("users").where('uids', 'array-contains', auth.currentUser.uid).get().then((snap) => {
        if (snap.docs.length === 0) {
          setTimeout(function () { dbCheck() }, 2500);
        } else {
          let doc = snap.docs[0].data()

          if (doc.uids.length === 1) { setSelected('waiting') } else { setSelected('usersPoints') }

          setObj(doc)
          setId(snap.docs[0].id) 

          if (doc.partnerA.uid === auth.currentUser.uid) {
            setCurrentUserObj(doc.partnerA);
            setTwoDObj(doc.partnerB);
            setPartner('partnerB');
          } else {
            setCurrentUserObj(doc.partnerB);
            setTwoDObj(doc.partnerA);
            setPartner('partnerA');
          }
        }
      })
    }
    dbCheck()
  }, {});

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
    if (selected === 'waiting') {
      return <Waiting twoD={obj.twoDFirstName} />
    } else if (selected === 'addPoints') {
      return <AddPoints twoDObj={twoDObj} id={id} partner={partner}  weekEnding={obj.weekEnding}/>
    } else if (selected === 'graph') {
      return <Graph currentUserObj={currentUserObj} twoDObj={twoDObj} />
    } else if (selected === 'usersPoints') {
      return <UsersPoints currentUserObj={currentUserObj} weekEnding={obj.weekEnding}/>
    }
  }

  const on = {margin: '25px', textDecoration: 'underline', fontSize: '110%'}
  const off = {margin: '25px', color: 'gray'}

  return (
    <div className="UserHome">
      {obj ? 
        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 16, offset: 4 }} style={{ marginTop: '5em' }} >

        {twoDObj && currentUserObj ? 
        <div>
          <Divider orientation="left">
            <span style={ selected === 'usersPoints' ? on : off } onClick={usersPoints}>{currentUserObj.firstName}'s Points</span>
            <span style={ selected === 'addPoints' ? on : off } onClick={addPoints}>Give {twoDObj.firstName} Points</span>
            <span style={ selected === 'graph' ? on : off } onClick={graph}>See Graph</span></Divider>
            </div>
            :
            null}

          {renderedThing()}

        </Col>
        :
        <div className='heartLoader' ><Loader
        type="Hearts"
        color="red"
        width="300" /></div>
      }
    </div>
  );
}

export default UserHome; 
 