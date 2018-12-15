import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

function Spinner() {

    return (
        <div className='heartLoader'>
        <BeatLoader
        color={'#4c1965ff'}
      />
      </div>
    )
}

export default Spinner;