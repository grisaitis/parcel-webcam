import React from 'react';
import ReactDOM from 'react-dom';
import Webcam from 'react-webcam';
import {useOnnx} from './scripts/useOnnx.js';
import {runInference} from './scripts/squeezeNet.js';


const Main = () => {
  // useOnnx();
  const videoConstraints = {
    // facingMode: "environment",
    facingMode: "user",
    frameRate: 10
  };
  const webcam = new Webcam({
    "audio": true
  });
  console.log(webcam);
  window.webcam = webcam;
  
  return (
    <div>
      <Webcam
        videoConstraints={videoConstraints}
        width={"300"}
        audio={false}
      />
    </div>
  );
};

ReactDOM.render(<Main />, document.querySelector('#app'));
