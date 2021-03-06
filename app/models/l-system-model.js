class LSystemModel {
  constructor(lSystemConfigs) {
    this.lSystemConfigs = lSystemConfigs;
  }

  getLSystemConfigs() {
    return this.lSystemConfigs;
  }

  configure(system) {
    this.system = {
      constants: system.constants,
      variables: system.variables,
      axiom: system.axiom,
      rules: system.rules,
      processing: system.processing,
    };
    this.code = this.system.axiom;
    this.lines = null;
    this.dimensions = {
      maxNorth: 0,
      maxEast: 0,
      maxSouth: 0,
      maxWest: 0,
    };
  }

  generateCode() {
    let temporaryCode = null;
    temporaryCode = this.code.map((symbol) => {
      if (this.system.constants.includes(symbol)) {
        return symbol;
      } else if (this.system.variables.includes(symbol)) {
        return this.system.rules[symbol];
      }
    });
    this.code = [].concat(...temporaryCode);
  }

  processCode() {
    const generatedObject = this.system.processing(this.code);
    this.lines = generatedObject.lines;
    this.dimensions = generatedObject.dimensions;
  }
}

export default LSystemModel;
