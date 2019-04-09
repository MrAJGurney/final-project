import ControlPanelModel from './models/control-panel-model';
import ControlPanelView from './views/control-panel-view';
import ControlPanelController from './controllers/control-panel-controller';

import LSystemModel from './models/l-system-model';
import LSystemView from './views/l-system-view';
import LSystemController from './controllers/l-system-controller';

import EventBus from './resources/event-bus/event-bus';
import EVENT_TOPICS from './resources/event-bus/event-topics';
import CONFIG from './resources/config';

window.onload = function() {
  const eventBus = new EventBus(EVENT_TOPICS);
  _initializeControlPanel(eventBus);
  _initializeLSystemComponent(eventBus);

  window.addEventListener('resize', _onWindowResize(eventBus), false);
};

function _onWindowResize(eventBus) {
  return (() => {
    eventBus.publish('ON_WINDOW_RESIZE');
  });
}

function _initializeControlPanel(eventBus) {
  const controlPanelModel = new ControlPanelModel(CONFIG);

  const lSystemSelector = document.querySelector('#l-system-selector');
  const controlPanelView = new ControlPanelView(lSystemSelector);

  new ControlPanelController(
      controlPanelModel,
      controlPanelView,
      eventBus);
}

function _initializeLSystemComponent(eventBus) {
  const lSystemModel = new LSystemModel(CONFIG);

  const canvas = document.querySelector('#visualiser');
  const lSystemView = new LSystemView(canvas);

  new LSystemController(
      lSystemModel,
      lSystemView,
      eventBus);
}
