import Canvas from './canvas';
import Shape from './shape';
import LindenmayerSystem from './l_system';
const THREE = require('../js/three');

function app() {
  const canvas = new Canvas(document.querySelector('div.canvas'));

  const cube = Shape.cube();
  canvas.AddShape(cube);

  const fractalBinaryTree = new LindenmayerSystem({
    variables: (['0', '1']),
    constants: (['[', ']']),
    axiom: (['0']),
    rules: {
      '1': (['1', '1']),
      '0': (['1', '[', '0', ']', '0'])
    },
    processing: (symbol) => {}
  });

  fractalBinaryTree.GetCode(5);
  fractalBinaryTree.ProcessCode().forEach((line) => {
    let lineStart = new THREE.Vector3(0, line.start.x, line.start.y);
    let lineEnd = new THREE.Vector3(0, line.end.x, line.end.y);
    canvas.AddShape(Shape.line(lineStart, lineEnd));
  });
}

window.onload = function() {
  app();
}
