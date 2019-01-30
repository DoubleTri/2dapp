import React, { useState, useEffect  } from 'react';
import { auth, fireStore } from '../../firebase';
import moment from 'moment';
import {  Col, Row  } from 'antd';

import { LineChart } from 'react-easy-chart';

function Graph(props) {

  const [currentUserObj, setCurrentUserObj] = useState(props.currentUserObj);
  const [twoDObj, setTwoDObj] = useState(props.twoDObj)
  const [name, setName] = useState(null)
  const [display, setDisplay] = useState('dbDataUser')
  const [selectedId, setSelectedId] = useState('dbDataUser')
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

  var dbDataUser = []
  var dbDataTwoD = []

  currentUserObj.pastPoints.forEach(obj => {
    let date = Number(Object.keys(obj))
    dbDataUser.push({
      x: moment(new Date(date)).format('MMM Do').toString(),
      y: Object.values(obj)[0].pointTotal,
      id: Object.values(obj)[0].points,
      name: currentUserObj.firstName  
    })
  })

  twoDObj.pastPoints.forEach(obj => {
    let date = Number(Object.keys(obj))
    dbDataTwoD.push({
      x: moment(new Date(date)).format('MMM Do').toString(),
      y: Object.values(obj)[0].pointTotal,
      id: Object.values(obj)[0].points,
      name: twoDObj.firstName 
    })
  })

  let data = display === 'dbDataTwoD' ? [dbDataTwoD] : [dbDataUser];

  let height = 300
  let graphWidth = width <= 576 ? width : width/2

  let selected = (item) => {
    setDisplay(item)
    setSelectedId(item);
    //console.log(object);
  }

  let style = (selected) => {
    return selected === selectedId ? 
      {padding: '2em', color: '#4c1965ff', fontWeight: 'bold', textDecoration: 'underline #4c1965ff'} 
      : 
      {padding: '2em'} 
  }

  return (
    <div className="graph">

    <h3>This is the Graph section</h3>

    <div><span id='dbDataUser' style={style('dbDataUser')} onClick={() => selected('dbDataUser')} >{currentUserObj.firstName}</span>
      <span id='dbDataTwoD' style={style('dbDataTwoD')} onClick={() => selected('dbDataTwoD')} >{twoDObj.firstName}</span>
      <span id='both' style={style('both')} onClick={() => selected('both')} >Both</span>
    </div>
    <br />
    <div>
      {display === 'both' ? <div style={{ fontWeight: 'bold' }}><div style={{ color: 'green' }}>{currentUserObj.firstName}</div> 
        <div style={{ color: 'blue' }}>{twoDObj.firstName}</div></div> : null}
    </div>      
  
<Col>
<div style={{ marginLeft: '-2em'}}>
      <LineChart
        axes
        dataPoints
        grid
        xType={'text'}
        clickHandler={(d) => `${setPastWeek(d.id)} ${setName(d.name)} ${setWeekEnding(d.x)} ${setPointTotal(d.y)}`}
        width={graphWidth}
        height={height}
        lineColors={display !== 'both' ? ['gray'] : ['green', 'blue']}
        data={display !== 'both' ? data : [dbDataUser, dbDataTwoD]}
      />
      </div>
  </Col>

<Col span={20} offset={2} >
      <div>{!weekEnding ? null : <div style={{ marginBottom: '10px'}}><b>{name}: {weekEnding} <p>Total Points = {pointTotal}</p></b>{console.log(weekEnding)}</div>}</div>

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