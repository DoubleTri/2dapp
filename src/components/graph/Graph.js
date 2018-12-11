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
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    let handleResize = () => {
      setWidth(window.innerWidth)
      console.log(width)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

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

  let height = 300
  let graphWidth = width/2

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

     
     
  
<Col span={20} offset={2} >
<div style={{  display: 'table', margin: '0 auto'}} >
      <LineChart
        axes
        dataPoints
        grid
        xType={'text'}
        clickHandler={(d) => `${setPastWeek(d.id)} ${setWeekEnding(d.x)}`}
        width={graphWidth}
        height={height}
        data={data}
      />
      </div>
  </Col>

<Col span={20} offset={2} >
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