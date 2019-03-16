import Canvas from './canvas';
import Shape from './shape';
import LindenmayerSystem from './l_system';
import LSystemPlayground from './l-system-playground';

const MODELS = require('../models/models');

/* = = = = = = = = = = = = = = = = = = = = */
/* = = = = = = = = OPTIONS = = = = = = = = */
/* = = = = = = = = = = = = = = = = = = = = */

// const modelType = 'FRACTAL_BINARY_TREE';
// const modelType = 'FRACTAL_PLANT';
const modelType = 'DRAGON_CURVE';

const generations = 10;

const rotationEnabled = true

const tutorialMode = false;

const displayCode = true;

/* = = = = = = = = = = = = = = = = = = = = */
/* = = = = = = = = OPTIONS = = = = = = = = */
/* = = = = = = = = = = = = = = = = = = = = */

const params = {
  modelType: modelType,
  generations: generations,
  rotationEnabled: rotationEnabled,
  tutorialMode: tutorialMode,
  displayCode: displayCode
}


const collaborators = {
  Canvas: Canvas,
  Shape: Shape,
  LindenmayerSystem: LindenmayerSystem
}

window.onload = function() {

  const canvasElement = document.querySelector('div.canvas');
  const lSystemPlayground = new LSystemPlayground(collaborators, params, canvasElement);
  lSystemPlayground.run();
}
