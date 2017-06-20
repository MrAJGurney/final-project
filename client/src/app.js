import Canvas from './canvas';
import Shape from './shape';
import LindenmayerSystem from './l_system';

const MODELS = require('../models/models');
const THREE = require('../js/three');

function app() {
  const canvas = new Canvas(document.querySelector('div.canvas'));

  const cube = Shape.cube();
  canvas.AddShape(cube);

  const renderShape = new LindenmayerSystem(MODELS.FRACTAL_PLANT);
  const generations = 6;

  [...Array(generations)].forEach(() => {
    renderShape.GenerateCode()
  });
  renderShape.ProcessCode()

  renderShape.lines.forEach((line) => {
    let lineStart = new THREE.Vector3(0, line.start.x, line.start.y);
    let lineEnd = new THREE.Vector3(0, line.end.x, line.end.y);
    let node = line.node;
    // console.log(node);
    canvas.AddShape(Shape.line(lineStart, lineEnd, node));
  });

  canvas.modelHeight = renderShape.maxDimension;
  canvas.CreateCamera();
}

window.onload = function() {
  app();
}
