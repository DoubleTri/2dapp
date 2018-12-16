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
  const [pointTotal, setPointTotal] = useState(null)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    let handleResize = () => {
      setWidth(window.innerWidth)
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
  let graphWidth = width <= 576 ? width : width/2

  return (
    <div className="graph">

    <h3>This is the Graph section</h3>
     
  
<Col>
<div style={{ marginLeft: '-2em'}}>
      <LineChart
        axes
        dataPoints
        grid
        xType={'text'}
        clickHandler={(d) => `${setPastWeek(d.id)} ${setWeekEnding(d.x)} ${setPointTotal(d.y)}`}
        width={graphWidth}
        height={height}
        data={data}
      />
      </div>
  </Col>

<Col span={20} offset={2} >
      <div>{!weekEnding ? null : <div style={{ marginBottom: '10px'}}><b>{weekEnding} <p>Total Points = {pointTotal}</p></b>{console.log(weekEnding)}</div>}</div>

      <div>{!pastWeek ? null :
        <div>
        {pastWeek.map((pointObj, i) => {
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