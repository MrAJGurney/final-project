// import LindenmayerSystemNode from './l_system_node';

class LindenmayerSystem {
  constructor(system) {
    this.system = {
      constants: system.constants,
      variables: system.variables,
      axiom: system.axiom,
      rules: system.rules,
      processing: system.processing
    }
    this.code = this.system.axiom;
  }

  GetCode(generations) {
    let temporaryCode = null;
    for (let i = 0; i < generations; i++) {
      temporaryCode = this.code.map((symbol) => {
        if (this.system.constants.includes(symbol)) {
          return symbol;
        } else if (this.system.variables.includes(symbol)) {
          return this.system.rules[symbol];
        } else {
          console.log('UNASSIGNED SYMBOL:', symbol);
        }
      });
      this.code = [].concat.apply([], temporaryCode);
    }
  }

  ProcessCode() {
    // Fractal (Binary) Tree
    const code = this.code;
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

}

export default LindenmayerSystem;
