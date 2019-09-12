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
    video: { width: 224, height: 224 }
  };
  return (
    <div>
      <Webcam
        videoConstraints={videoConstraints}
        width={"224px"}
        height={"224px"}
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
