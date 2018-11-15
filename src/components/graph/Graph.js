import React, { useState, useEffect  } from 'react';
import moment from 'moment';

function Graph(props) {

  const [obj, setObj] = useState(props.obj);

  // useEffect(() => {
  //   fireStore.collection("users").doc(auth.currentUser.uid).get().then(function (doc) {
  //     setObj(doc.data())
  //   })
  // }, {});

  //console.log(obj)

  return (
    <div className="Graph">

    <h3>This is the Graph section</h3>

    </div>
  );
}

export default Graph; 