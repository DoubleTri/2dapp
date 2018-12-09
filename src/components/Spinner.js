import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

function Spinner() {

    return (
        <div className='heartLoader'>
        <BeatLoader
        color={'red'}
      />
      </div>
    )
}

export default Spinner;