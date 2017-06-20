const DRAGON_CURVE = {
  variables: (['X', 'Y']),
  constants: (['F', '+', '-']),
  axiom: (['F', 'X']),
  rules: {
    'X': (['X', '+', 'Y', 'F', '+']),
    'Y': (['-', 'F', 'X', '-', 'Y'])
  },
  processing: (code) => {
    const lines = [];
    const stack = [];

    let startCoord = {
      x: 0,
      y: 0
    };
    let angle = 90;
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
          angle -= 90;
          break;
        case '-':
          angle += 90;
          break;
        case 'X':
        case 'Y':
          // Do nothing
          break;
        default:
          console.log('NO RULE ASSISGNED TO CHARACTER:', character);
      }
    }

    return {maxDimension: maxDimension, lines: lines};
  }
}

module.exports = DRAGON_CURVE;
