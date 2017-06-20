const FRACTAL_PLANT = {
  variables: (['X', 'F']),
  constants: (['+', '-', '[', ']']),
  axiom: (['X']),
  rules: {
    'X': ([
      'F',
      '[',
      '-',
      'X',
      ']',
      '[',
      'X',
      ']',
      'F',
      '[',
      '-',
      'X',
      ']',
      '+',
      'F',
      'X'
    ]),
    'F': (['F', 'F'])
  },
  processing: (code) => {
    const lines = [];
    const stack = [];

    let startCoord = {
      x: 0,
      y: 0
    };
    let angle = -25;
    let maxDimension = 0;
    let node = 0;

    for (let character of code) {
      switch (character) {
        case 'F':
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
          maxDimension = Math.max(endCoord.x, (endCoord.y * 2), maxDimension);

          lines.push({start: startCoord, end: endCoord, node: node});
          startCoord = endCoord;
          node++;
          break;
        case 'X':
          // Do nothing
          break;
        case '+':
          angle -= 25;
          break;
        case '-':
          angle += 25;
          break;
        case '[':
          stack.push({startCoord: startCoord, angle: angle, node: node});
          break;
        case ']':
          let stackReturn = stack.pop();
          startCoord = stackReturn.startCoord;
          angle = stackReturn.angle;
          node = stackReturn.node;
          break;
        default:
          console.log('NO RULE ASSISGNED TO CHARACTER:', character);
      }
    }

    return {maxDimension: maxDimension, lines: lines};
  }
}

module.exports = FRACTAL_PLANT;
