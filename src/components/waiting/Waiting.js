import React, { useState, useEffect  } from 'react';
import moment from 'moment';

function Waiting(props) {

  const [obj, setObj] = useState(props.obj);

  // useEffect(() => {
  //   fireStore.collection("users").doc(auth.currentUser.uid).get().then(function (doc) {
  //     setObj(doc.data())
  //   })
  // }, {});

  //console.log(obj)

  return (
    <div className="Waiting">

    <h3>This is the Waiting section</h3>

    </div>
  );
}

export default Waiting; 