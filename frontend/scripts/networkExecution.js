// import ndarray from 'ndarray';
// import ops from 'ndarray-ops';
import {InferenceSession} from 'onnxjs';
// import {imagenetClasses} from './imagenetClasses.js';
import {preprocess} from './preprocessing.js';
import {imagenetClassesTopK} from './postprocessing.js';


// squeezenet
const modelURL = "https://raw.githubusercontent.com/Microsoft/onnxjs-demo/data/data/examples/models/squeezenetV1_8.onnx";
// mobilenetv2
// const modelURL = "https://cdn.glitch.com/e0ad323d-8751-4597-8e2c-14efb7b33253%2Fmobilenetv2-1.0.onnx?v=1568312613791";
// shufflenet
// const modelURL = "https://cdn.glitch.com/e0ad323d-8751-4597-8e2c-14efb7b33253%2Fmodel.onnx?v=1568314174499";
const session = new InferenceSession();
session.loadModel(modelURL).then(() => {console.log("model loaded");});


function runNetWithCamera() {
  const video = document.querySelector('video');
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  // console.log(["hi", video.width, video.height]);
  context.drawImage(video, 0, 0, 224, 224);
  const preprocessedData = preprocess(context);
  const outputData = session.run([preprocessedData]).then(output => {
    return output.values().next().value;
  }).catch((error) => {
    console.log(error);
  });
  outputData.then((outputDataTensor) => {
    // squeezenet or shufflenet
    const predClass = imagenetClassesTopK(Array.prototype.slice.call(outputDataTensor.data), 5);
    // mobilenetv2
    // const predClass = imagenetClassesTopK(Array.prototype.slice.call(softmax(outputDataTensor.data)), 5);
    makeListFromTopK(predClass);
  })
}


function makeListFromTopK(topK) {
  const classProbsList = document.getElementById("classProbsList");
  classProbsList.innerHTML = '';  // clear list?
  for (var i = 0; i < 5; i++) {
    var node = document.createElement("li");
    var textnode = document.createTextNode("");
    node.appendChild(textnode);
    node.innerHTML = `${topK[i]["name"]}: ${topK[i]["probability"]}`;
    classProbsList.appendChild(node);
  }
}

function softmax(arr) {
  const C = Math.max(...arr);
  const d = arr.map((y) => Math.exp(y - C)).reduce((a, b) => a + b);
  return arr.map((value, index) => { 
      return Math.exp(value - C) / d;
  });
}


export {runNetWithCamera};