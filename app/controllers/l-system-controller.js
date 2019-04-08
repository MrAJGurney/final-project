class LSystemController {
  constructor(lSystemModel, lSystemView) {
    this._throwIfAbsent(lSystemModel);
    this._throwIfAbsent(lSystemView);

    this.lSystemModel = lSystemModel;
    this.lSystemView = lSystemView;
  }

  run(params) {
    this._configure(params);

    [...Array(this.params.generations)].forEach(() => {
      this.lSystemModel.GenerateCode()
    });
    this.lSystemModel.ProcessCode()

    this.lSystemView.run(this.lSystemModel, params);
  }

  _configure(params) {
    const {
      model,
      generations
    } = params;
    this._throwIfAbsent(model, "params");
    this._throwIfAbsent(generations, "params");
    this.params = params;

    this.lSystemModel.configure(model);
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
}

export default LSystemController;
