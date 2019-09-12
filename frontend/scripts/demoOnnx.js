import {InferenceSession, Tensor} from 'onnxjs';


function useOnnx() {
  // don't work...
  // const modelFilepath = "https://github.com/microsoft/onnxjs-demo/blob/data/data/examples/models/add.onnx";
  // const modelFilepath = "https://s3.amazonaws.com/onnx-model-zoo/mobilenet/mobilenetv2-1.0/mobilenetv2-1.0.onnx";
  // const modelFilepath = "/assets/add.onnx";
  // const modelFilepath = "https://cdn.glitch.com/e0ad323d-8751-4597-8e2c-14efb7b33253%2Fadd.onnx";
  
  // does work...
  // const modelFilepath = "https://raw.githubusercontent.com/Microsoft/onnxjs-demo/data/data/examples/models/add.onnx";
  const modelFilepath = "https://raw.githubusercontent.com/Microsoft/onnxjs-demo/data/data/examples/models/squeezenetV1_8.onnx";

  const session = new InferenceSession({backendHint: "webgl"});
  session.loadModel(modelFilepath).then(_ => {
    // const x = new Float32Array(3 * 4 * 5).fill(1);
    // const y = new Float32Array(3 * 4 * 5).fill(2);
    // const tensorX = new Tensor(x, 'float32', [3, 4, 5]);
    // const tensorY = new Tensor(y, 'float32', [3, 4, 5]);
    const x = new Float32Array(1*3*224*224).fill(1);
    const y = new Float32Array(1*3*224*224).fill(2);
    const tensorX = new Tensor(x, 'float32', [1,3,224,224]);
    const tensorY = new Tensor(y, 'float32', [1,3,224,224]);
    
    console.log(tensorX.data);
    console.log(tensorY.data);
    session.run([tensorX]).then((outputMap) => {
      console.log(outputMap);
      // const outputData = outputMap.get('sum')
      const outputData = outputMap.get('softmaxout_1');
      console.log(outputData);
      console.log(outputData.data);
    });
  }).catch((e) => {
    console.log("error!");
    console.log(e);
  });
}


export {useOnnx};