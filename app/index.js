import ControlPanelModel from './models/control-panel-model';
import ControlPanelView from './views/control-panel-view';
import ControlPanelController from './controllers/control-panel-controller';

import LSystemModel from './models/l-system-model';
import LSystemView from './views/l-system-view';
import LSystemController from './controllers/l-system-controller';

import EventBus from './event-bus';
import CONFIG from './config';
import MODELS from './resources/models.js'

const ON_CONFIG_SELECTED = 'on-config-selected';

window.onload = function() {
  const eventBus = new EventBus();
  _initializeControlPanel(eventBus);
  _initializeLSystemComponent(eventBus);
}

function _initializeControlPanel(eventBus) {
  const modelNames = Object.keys(MODELS);
  const controlPanelModel = new ControlPanelModel(modelNames);

  const lSystemSelector = document.querySelector('#l-system-selector');
  const controlPanelView = new ControlPanelView(lSystemSelector);

  const controlPanelController = new ControlPanelController(controlPanelModel, controlPanelView, eventBus);
}

function _initializeLSystemComponent(eventBus) {
  const { model } = CONFIG;
  const lSystemModel = new LSystemModel(model);

  const canvas = document.querySelector('#visualiser');
  const lSystemView = new LSystemView(canvas);

  const lSystemController = new LSystemController(lSystemModel, lSystemView);
  lSystemController.configure(CONFIG);
  lSystemController.run();

  eventBus.subscribe(ON_CONFIG_SELECTED, (data) => {
    // TODO: Handle the selection appropriatly
    window.alert("New L-system selected: " + data.selectedOption);
  });
}
