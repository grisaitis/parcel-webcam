import _ from 'lodash';
import {imagenetClasses} from './imagenetClasses.js';


function imagenetClassesTopK(classProbabilities, k) {
  const probs = classProbabilities;
  const sorted = _.reverse(_.sortBy(probs.map((prob, index) => [prob, index]), probIndex => probIndex[0]));
  const topK = _.take(sorted, k).map(probIndex => {
    const iClass = imagenetClasses[probIndex[1]];
    return {
      id: iClass[0],
      index: parseInt(probIndex[1], 10),
      name: iClass[1].replace(/_/g, ' '),
      probability: probIndex[0]
    };
  });
  return topK;
}

export {imagenetClassesTopK};