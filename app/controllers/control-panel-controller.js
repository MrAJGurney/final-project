const ON_CONFIG_SELECTED = 'on-config-selected';

class ControlPanelController {
  constructor(controlPanelModel, controlPanelView, eventBus) {
    this.controlPanelModel = controlPanelModel;
    this.controlPanelView = controlPanelView;
    this.eventBus = eventBus;

    this._publishOptionSelected = this._publishOptionSelected.bind(this);

    this._configureSelectElement();
  }

  _configureSelectElement() {
    const { controlPanelModel, controlPanelView } = this;

    const modelNames = controlPanelModel.getModelNames();
    controlPanelView.populateSelectElement(modelNames);
    controlPanelView.addListenerToSelectElement(this._publishOptionSelected)
  }

  _publishOptionSelected() {
    const { controlPanelView, eventBus } = this;

    const selectedOption = controlPanelView.getSelectedOption();
    eventBus.publish(ON_CONFIG_SELECTED, {selectedOption: selectedOption})
  }
}

export default ControlPanelController;
