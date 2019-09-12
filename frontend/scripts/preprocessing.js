import ndarray from 'ndarray';
import ops from 'ndarray-ops';
import {Tensor, InferenceSession} from 'onnxjs';


function preprocess(ctx) {
  // source: https://github.com/microsoft/onnxjs-demo/blob/master/src/components/models/Squeezenet.vue
  window.ctx = ctx
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  console.log([ctx.canvas.width, ctx.canvas.height])
  console.log(imageData.data.length);
  console.log(imageData.data.length/4);
  console.log(imageData.data.length/4/224);
  const mean = list => list.reduce((prev, curr) => prev + curr) / list.length;
  console.log(mean(imageData.data));
  const { data, width, height } = imageData;
  console.log(data);

  // data processing
  const dataTensor = ndarray(new Float32Array(data), [width, height, 4]);
  const dataProcessedTensor = ndarray(new Float32Array(width * height * 3), [1, 3, width, height]);
  ops.assign(dataProcessedTensor.pick(0, 0, null, null), dataTensor.pick(null, null, 0));
  ops.assign(dataProcessedTensor.pick(0, 1, null, null), dataTensor.pick(null, null, 1));
  ops.assign(dataProcessedTensor.pick(0, 2, null, null), dataTensor.pick(null, null, 2));
  // ops.divseq(dataProcessedTensor, 255);
  // ops.subseq(dataProcessedTensor.pick(0, 0, null, null), 0.485);
  // ops.subseq(dataProcessedTensor.pick(0, 1, null, null), 0.456);
  // ops.subseq(dataProcessedTensor.pick(0, 2, null, null), 0.406);
  // ops.divseq(dataProcessedTensor.pick(0, 0, null, null), 0.229);
  // ops.divseq(dataProcessedTensor.pick(0, 1, null, null), 0.224);
  // ops.divseq(dataProcessedTensor.pick(0, 2, null, null), 0.225);
  
  // ops.divseq(dataProcessedTensor.pick(0, null, null, null), 0.5);
  // ops.addseq(dataProcessedTensor.pick(0, null, null, null), 3);

  const tensor = new Tensor(new Float32Array(width * height * 3), 'float32', [1, 3, width, height]);
  tensor.data.set(dataProcessedTensor.data);
  console.log(tensor);
  console.log(mean(tensor.data));
  return tensor;
}

export {preprocess};