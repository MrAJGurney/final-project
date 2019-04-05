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
    let node = 0;
    let dimensions = {
      maxNorth: 0,
      maxEast: 0,
      maxSouth: 0,
      maxWest: 0
    };

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

          dimensions.maxNorth = Math.max(dimensions.maxNorth, endCoord.y);
          dimensions.maxEast = Math.max(dimensions.maxEast, endCoord.x);
          dimensions.maxSouth = Math.min(dimensions.maxSouth, endCoord.y);
          dimensions.maxWest = Math.min(dimensions.maxWest, endCoord.x);

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
      }
    }

    return {dimensions: dimensions, lines: lines};
  }
}

export default DRAGON_CURVE;
