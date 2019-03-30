class LSystemController {
  constructor(lSystemModel, lSystemView) {
    this._throwIfAbsent(lSystemModel);
    this._throwIfAbsent(lSystemView);

    this.lSystemModel = lSystemModel;
    this.lSystemView = lSystemView;

    this.configure = this.configure.bind(this);
  }

  configure(params) {
    const {
      model,
      generations
    } = params;
    this._throwIfAbsent(model, "params");
    this._throwIfAbsent(generations, "params");
    this.params = params;

    this.lSystemView.configure(params);
  }

  _throwIfAbsent(parameter, group) {
    const inGroup = group === undefined;
    if (parameter === undefined) {
      if (inGroup) {
        throw Error("In " + group + ", missing: " + parameter);
      } else {
        throw Error("Missing: " + parameter);
      }
    }
  }

  run() {
    [...Array(this.params.generations)].forEach(() => {
      this.lSystemModel.GenerateCode()
    });
    this.lSystemModel.ProcessCode()

    this.lSystemView.run(this.lSystemModel);
  }
}

export default LSystemController;
