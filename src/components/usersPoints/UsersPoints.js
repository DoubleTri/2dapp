import React, { useState, useEffect  } from 'react';
import moment from 'moment';
import Spinner from '../Spinner';

function UsersPoints(props) {

  const [currentUserObj, setCurrentUserObj] = useState(null);

  useEffect(() => {
    setCurrentUserObj(props.currentUserObj)
  }, [props.currentUserObj])

  return (
    <div className="UsersPoints">
    {currentUserObj ? 
        <div>
            <div id="pointTotalLine"><b>Total Points</b> (week ending {moment(new Date(props.weekEnding - 500)).format('MMMM Do [ at midnight]').toString()} ) = <b>{currentUserObj.points.pointTotal}</b></div>
            {currentUserObj.pastPoints.length !== 0 ? <div>Last week's total = {Object.values(currentUserObj.pastPoints[currentUserObj.pastPoints.length -1])[0].pointTotal}</div> : null }
            <br />
            {currentUserObj.points.points.map((pointObj, i) => {
              return <li className='pointEvent' key={i}><span id="pointTitleLine"><b>{pointObj.value} {pointObj.value > 1 ? 'Points' : 'Point'}</b> {moment(pointObj.date).calendar()} </span>
                <br /> {pointObj.reason} <hr /></li>
          })}
        </div>
        : null}
    </div>
  );
}

export default UsersPoints; 