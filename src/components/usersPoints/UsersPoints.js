import React, { useState, useEffect  } from 'react';
import moment from 'moment';

function UsersPoints(props) {

  const [obj, setObj] = useState(props.obj);

  // useEffect(() => {
  //   fireStore.collection("users").doc(auth.currentUser.uid).get().then(function (doc) {
  //     setObj(doc.data())
  //   })
  // }, {});

  //console.log(obj)

  return (
    <div className="UsersPoints">
      {!obj ? 'loading....'
        :<div>
            <div id="pointTotalLine"><b>Total Points</b> (week ending {moment(obj.points.weekEnding).calendar()} ) = <b>{obj.points.pointTotal}</b></div>
            <br />
            {obj.points.points.map((pointObj, i) => {
              return <li key={i}><span id="pointTitleLine"><b>{pointObj.value} {pointObj.value > 1 ? 'Points' : 'Point'}</b> {moment(pointObj.date).calendar()} </span>
                <br /> {pointObj.reason} <hr /></li>
            })}
            </div>
      }
    </div>
  );
}

export default UsersPoints; 