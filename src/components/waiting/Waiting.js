import React, { useState, useEffect  } from 'react';
import moment from 'moment';

function Waiting(props) {

  const [obj, setObj] = useState(props.obj);

  return (
    <div className="Waiting">

    <h3>Waiting for {props.twoD} to create an account.</h3>

    </div>
  );
}

export default Waiting; 