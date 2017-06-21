import Canvas from './canvas';
import Shape from './shape';
import LindenmayerSystem from './l_system';

const MODELS = require('../models/models');
const THREE = require('../js/three');

function app() {
  const canvas = new Canvas(document.querySelector('div.canvas'));

  const cube = Shape.cube();
  canvas.AddShape(cube);

  const renderShape = new LindenmayerSystem(MODELS.DRAGON_CURVE);
  const generations = 8;

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

  canvas.center = {
    x: (renderShape.dimensions.maxNorth - renderShape.dimensions.maxSouth) / 2 + renderShape.dimensions.maxSouth,
    y: (renderShape.dimensions.maxEast - renderShape.dimensions.maxWest) / 2 + renderShape.dimensions.maxWest
  };

  canvas.zoom = Math.max(renderShape.dimensions.maxNorth - renderShape.dimensions.maxSouth, renderShape.dimensions.maxEast - renderShape.dimensions.maxWest) * (3 / 4);

  canvas.CreateCamera();
}

window.onload = function() {
  app();
}
