import React, { useState, useEffect  } from 'react';
import { auth, fireStore } from '../../firebase';
import moment from 'moment';
import {  Col, Row  } from 'antd';

import { LineChart } from 'react-easy-chart';

function Graph(props) {

  const [currentUserObj, setCurrentUserObj] = useState(props.currentUserObj);
  const [twoDObj, setTwoDObj] = useState(props.twoDObj)
  const [weekEnding, setWeekEnding] = useState(null) 
  const [pastWeek, setPastWeek] = useState(null)

  var dbData = []

  currentUserObj.pastPoints.forEach(obj => {
    let date = Number(Object.keys(obj))
    dbData.push({
      x: moment(new Date(date)).format('MMM Do').toString(),
      y: Object.values(obj)[0].pointTotal,
      id: Object.values(obj)[0].points 
    })
  })

  let data = [dbData];


  return (
    <div className="graph">

    <h3>This is the Graph section</h3>

    <section id="clickHandler">
            <h2>Click Handler</h2>

            <p>
              The chart will send out a clickHandler event from the dataPoints (see above). The
              dataPoints will need to be set. This can be used by your react application in anyway
              you would require. The event handler provides the point data.
            </p>
            </section>

     
     
  
<Col m={{ span: 20, offset: 2 }} xl={{ span: 12 }}>
{/* <Col sm={20} md={10} > */}
      <LineChart
        axes
        dataPoints
        grid
        xType={'text'}
        clickHandler={(d) => `${setPastWeek(d.id)} ${setWeekEnding(d.x)}`}
        width={450}
        height={300}
        //interpolate={'cardinal'}
        data={data}
      />
  </Col>

<Col m={{ span: 20, offset: 2 }} xl={{ span: 12 }} style={{paddingLeft: '50px'}}>
{/* <Col sm={20} md={10} > */}
      <div>{!weekEnding ? null : <div style={{ marginBottom: '10px'}}><b>{weekEnding}</b></div>}</div>

      <div>{!pastWeek ? null :
        <div>{pastWeek.map((pointObj, i) => {
          // return console.log(pointObj)
          return <li className='pointEvent' key={i}><span id="pointTitleLine"><b>{pointObj.value} {pointObj.value > 1 ? 'Points' : 'Point'}</b> {moment(pointObj.date).calendar()} </span>
            <br /> {pointObj.reason} <hr /></li>
        })
        }</div>
      }</div>
    </Col>

          



    </div>
  );
}

export default Graph; 