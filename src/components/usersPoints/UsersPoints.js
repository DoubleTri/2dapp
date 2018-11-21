import React, { useState, useEffect  } from 'react';
import moment from 'moment';

function UsersPoints(props) {

  const [currentUserObj, setCurrentUserObj] = useState(null);

  useEffect(() => {
    setCurrentUserObj(props.currentUserObj)
  }, [props.currentUserObj])

  return (
    <div className="UsersPoints">
    {currentUserObj ? 
        <div>
            <div id="pointTotalLine"><b>Total Points</b> (week ending {moment(currentUserObj.points.weekEnding).calendar()} ) = <b>{currentUserObj.points.pointTotal}</b></div>
            <br />
            {currentUserObj.points.points.map((pointObj, i) => {
              return <li key={i}><span id="pointTitleLine"><b>{pointObj.value} {pointObj.value > 1 ? 'Points' : 'Point'}</b> {moment(pointObj.date).calendar()} </span>
                <br /> {pointObj.reason} <hr /></li>
            })}
            </div>
    : 'LOADING....'}
    </div>
  );
}

export default UsersPoints; 