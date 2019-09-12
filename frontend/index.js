import React from 'react';
import ReactDOM from 'react-dom';
import Webcam from 'react-webcam';
// import {useOnnx} from './scripts/demoOnnx.js';
import {runNetWithCamera} from './scripts/networkExecution.js';


const Main = () => {
  // useOnnx();
  const videoConstraints = {
    facingMode: "environment",
    // facingMode: "user",
    frameRate: 20,
    height: 600,
    width: 600
  };
  return (
    <div>
      <Webcam
        videoConstraints={videoConstraints}
        audio={false}
        overflow={"hidden"}
      />
      <br></br>
      <button
        onClick={runNetWithCamera}
        style={{height: "100px", width: "100%"}}
      >
        What am i?
      </button>
    </div>
  );
};

ReactDOM.render(<Main />, document.querySelector('#app'));
