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
    processing: (code) => {
      const lines = [];
      const stack = [];

      let startCoord = {
        x: 0,
        y: 0
      };
      let angle = 0;

      for (let character of code) {
        switch (character) {
          case '0':
          case '1':
            let direction = {
              x: 1,
              y: 0
            };
            let newDirection = {
              x: (direction.x * Math.cos(angle * Math.PI / 180)) - (direction.y * Math.sin(angle * Math.PI / 180)),
              y: (direction.x * Math.sin(angle * Math.PI / 180)) + (direction.y * Math.cos(angle * Math.PI / 180))
            };
            let endCoord = {
              x: startCoord.x + newDirection.x,
              y: startCoord.y + newDirection.y
            };
            lines.push({start: startCoord, end: endCoord});
            startCoord = endCoord;
            break;
          case '[':
            stack.push({startCoord: startCoord, angle: angle});
            angle -= 45;
            break;
          case ']':
            let stackReturn = stack.pop();
            startCoord = stackReturn.startCoord;
            angle = stackReturn.angle;
            angle += 45;
            break;
          default:
            console.log('NO RULE ASSISGNED TO CHARACTER:', character);
        }
      }

      return lines;
    }
  });

  [...Array(5)].forEach(() => {
    fractalBinaryTree.GenerateCode()
  });
  fractalBinaryTree.ProcessCode().forEach((line) => {
    let lineStart = new THREE.Vector3(0, line.start.x, line.start.y);
    let lineEnd = new THREE.Vector3(0, line.end.x, line.end.y);
    canvas.AddShape(Shape.line(lineStart, lineEnd));
  });
}

window.onload = function() {
  app();
}
