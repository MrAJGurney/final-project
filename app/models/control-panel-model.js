class ControlPanelModel {
  constructor(modelNames) {
    this.modelNames = modelNames;
  }

  getModelNames() {
    return Array.from(this.modelNames);
  }
}

export default ControlPanelModel;
