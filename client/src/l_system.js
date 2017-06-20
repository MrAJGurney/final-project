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

  GenerateCode() {
    let temporaryCode = null;
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

  ProcessCode() {
    return this.system.processing(this.code);
  }

}

export default LindenmayerSystem;
