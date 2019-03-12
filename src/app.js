import Canvas from './canvas';
import Shape from './shape';
import LindenmayerSystem from './l_system';

const MODELS = require('../models/models');
const THREE = require('../js/three');

function app() {
  const canvas = new Canvas(document.querySelector('div.canvas'));

  const cube = Shape.cube();
  canvas.AddShape(cube);

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

  const renderShape = new LindenmayerSystem(MODELS[modelType]);

  [...Array(generations)].forEach(() => {
    renderShape.GenerateCode()
  });
  renderShape.ProcessCode()

  renderShape.lines.forEach((line) => {
    let lineStart = new THREE.Vector3(0, line.start.x, line.start.y);
    let lineEnd = new THREE.Vector3(0, line.end.x, line.end.y);
    let node = line.node;
    canvas.AddShape(Shape.line(lineStart, lineEnd, node, tutorialMode));
  });

  canvas.tutorialMode = tutorialMode;
  canvas.rotate = rotationEnabled;

  const delay = Math.ceil(10000 / renderShape.lines.length);

  if (tutorialMode) {
    let buttonPressed = false;
    let index = 1; // 0 is the box
    const displayShapes = () => {
      if (index < canvas.shapes.length) {
        canvas.shapes[index].shape.visible = true;
        index++;
        setTimeout(displayShapes, delay);
      } else {
        console.log("Displayed all", index, "segments");
      }
    };
    document.onkeydown = () => {
      if (!buttonPressed) {
        buttonPressed = true;
        displayShapes(1);
      }
    }
  }

  canvas.center = {
    x: (renderShape.dimensions.maxNorth - renderShape.dimensions.maxSouth) / 2 + renderShape.dimensions.maxSouth,
    y: (renderShape.dimensions.maxEast - renderShape.dimensions.maxWest) / 2 + renderShape.dimensions.maxWest
  };

  canvas.zoom = Math.max(renderShape.dimensions.maxNorth - renderShape.dimensions.maxSouth, renderShape.dimensions.maxEast - renderShape.dimensions.maxWest) * (5 / 7);

  canvas.CreateCamera();

  if (displayCode) {
    console.log('|=CODE START=|');
    console.log(renderShape.code.join(''));
    console.log('|=CODE END=|');
    console.log('');
    console.log('');
    console.log('');
  }
  console.log("Model:", modelType);
  console.log("Gens:", generations);
  console.log("Rotation:", rotationEnabled);
  console.log("Step-through:", tutorialMode);
  console.log("Delay:", delay);
  console.log("No. of chars", renderShape.code.length);
  console.log("No. of lines:", renderShape.lines.length);
}

window.onload = function() {
  app();
}