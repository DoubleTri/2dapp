import React, { useState, useEffect  } from 'react';
import { auth, fireStore } from '../firebase'
import {  Col, Tabs, Icon  } from 'antd';

import AddPoints from './addPoints/AddPoints'
import UsersPoints from './usersPoints/UsersPoints'
import Graph from './graph/Graph'
import Waiting from './waiting/Waiting'
import Spinner from './Spinner'

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


  const TabPane = Tabs.TabPane;

  return (
    <div className="UserHome">
      {obj ?
        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 16, offset: 4 }} style={{ marginTop: '5em' }} >

          {twoDObj && currentUserObj ?
            <div>

              <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="user" />{currentUserObj.firstName}'s Points</span>} key="1">
                  <UsersPoints currentUserObj={currentUserObj} weekEnding={obj.weekEnding} />
                </TabPane>

                <TabPane tab={<span><Icon type="heart" />Give {twoDObj.firstName} Points</span>} key="2">
                  <AddPoints twoDObj={twoDObj} id={id} partner={partner} weekEnding={obj.weekEnding} />
                </TabPane>

                <TabPane tab={<span><Icon type="line-chart" />Graphs</span>} key="3">
                  <Graph currentUserObj={currentUserObj} twoDObj={twoDObj} />
                </TabPane>
              </Tabs>

            </div>
            :
            null}
          {selected === 'waiting' ? <Waiting twoD={obj.twoDFirstName} /> : null}
        </Col>
        :
        <Spinner />
      }
    </div>
  );
}

export default UserHome; 
 