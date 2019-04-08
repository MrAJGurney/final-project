import ControlPanelModel from './models/control-panel-model';
import ControlPanelView from './views/control-panel-view';
import ControlPanelController from './controllers/control-panel-controller';

import LSystemModel from './models/l-system-model';
import LSystemView from './views/l-system-view';
import LSystemController from './controllers/l-system-controller';

import EventBus from './event-bus';
import L_SYSTEM_CONFIGS from './l-system-configs';

const DEFAULT_CONFIG = L_SYSTEM_CONFIGS.DRAGON_CURVE;
const ON_CONFIG_SELECTED = 'on-config-selected';

window.onload = function() {
  const eventBus = new EventBus();
  _initializeControlPanel(eventBus);
  _initializeLSystemComponent(eventBus);
}

function _initializeControlPanel(eventBus) {
  const controlPanelModel = new ControlPanelModel(L_SYSTEM_CONFIGS);

  const lSystemSelector = document.querySelector('#l-system-selector');
  const controlPanelView = new ControlPanelView(lSystemSelector);

  const controlPanelController = new ControlPanelController(controlPanelModel, controlPanelView, eventBus);
}

function _initializeLSystemComponent(eventBus) {
  const lSystemModel = new LSystemModel();

  const canvas = document.querySelector('#visualiser');
  const lSystemView = new LSystemView(canvas);

  const lSystemController = new LSystemController(lSystemModel, lSystemView);
  lSystemController.run(DEFAULT_CONFIG);

  eventBus.subscribe(ON_CONFIG_SELECTED, (data) => {
    const { lSystemKey } = data;
    const config = L_SYSTEM_CONFIGS[lSystemKey];
    lSystemController.run(config);
  });
}
