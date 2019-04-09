class LSystemController {
  constructor(lSystemModel, lSystemView, eventBus) {
    this._throwIfAbsent(lSystemModel);
    this._throwIfAbsent(lSystemView);

    this.lSystemModel = lSystemModel;
    this.lSystemView = lSystemView;
    this.eventBus = eventBus;

    eventBus.subscribe("ON_CONFIG_SELECTED", this._onConfigSelected.bind(this));
    eventBus.subscribe("ON_WINDOW_RESIZE", this._onWindowResized.bind(this));
  }

  _onConfigSelected(data) {
    const { lSystemKey } = data;
    const lSystemConfigs = this.lSystemModel.getLSystemConfigs();
    const config = lSystemConfigs[lSystemKey];
    this.run(config);
  }

  _onWindowResized() {
    const { lSystemView } = this;
    lSystemView.resizeWindow();
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
