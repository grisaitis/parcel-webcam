import React from 'react';
import ReactDOM from 'react-dom';
import Webcam from 'react-webcam';

const Main = () => {
  const videoConstraints = {
    facingMode: "user",
    frameRate: 3,
    zoom: 2.0,
    brightness: 0.5
  };
  return (
    <div>
      <Webcam 
        audio={false}
        width={"100%"}
        videoConstraints={videoConstraints}
      />
    </div>
  );
};

ReactDOM.render(<Main />, document.querySelector('#app'));
