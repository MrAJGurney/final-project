class ControlPanelView {
  constructor(lSystemSelector) {
    this.lSystemSelector = lSystemSelector;
  }

  populateSelectElement(modelNames) {
    const { lSystemSelector } = this;

    modelNames.forEach((modelName) => {
      const option = this._createOptionElement(modelName);
      lSystemSelector.appendChild(option);
    });
  }

  _createOptionElement(modelName) {
    const option = document.createElement("option");
    option.value = modelName;
    option.text = modelName;
    return option;
  }

  addListenerToSelectElement(callback) {
    const { lSystemSelector } = this;
    lSystemSelector.addEventListener('change', callback);
  }

  getSelectedOption() {
    const { lSystemSelector } = this;
    let selectedOption = null;

    for ( let i = 0; i < lSystemSelector.options.length; i++ ) {
        if ( lSystemSelector.options[i].selected === true ) {
          selectedOption = lSystemSelector.options[i].value
          break;
        }
    }

    return selectedOption
  }
}

export default ControlPanelView;
