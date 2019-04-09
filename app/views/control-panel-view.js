class ControlPanelView {
  constructor(lSystemSelector) {
    this.lSystemSelector = lSystemSelector;
  }

  populateSelectElement(lSystems) {
    const {
      lSystemSelector,
    } = this;

    Object.keys(lSystems).forEach((lSystemKey) => {
      const option = this._createOptionElement(
          lSystemKey,
          lSystems[lSystemKey]);
      lSystemSelector.appendChild(option);
    });
  }

  _createOptionElement(lSystemKey, lSystem) {
    const option = document.createElement('option');
    option.value = lSystemKey;
    option.text = lSystem.modelName;
    return option;
  }

  addListenerToSelectElement(callback) {
    const {
      lSystemSelector,
    } = this;
    lSystemSelector.addEventListener('change', callback);
  }

  getSelectedOption() {
    const {
      lSystemSelector,
    } = this;
    let selectedOption = null;

    for (let i = 0; i < lSystemSelector.options.length; i++) {
      if (lSystemSelector.options[i].selected === true) {
        selectedOption = lSystemSelector.options[i].value;
        break;
      }
    }

    return selectedOption;
  }
}

export default ControlPanelView;
