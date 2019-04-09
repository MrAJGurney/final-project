import ControlPanelModel from './models/control-panel-model';
import ControlPanelView from './views/control-panel-view';
import ControlPanelController from './controllers/control-panel-controller';

import LSystemModel from './models/l-system-model';
import LSystemView from './views/l-system-view';
import LSystemController from './controllers/l-system-controller';

class App {
  constructor(config, elements, eventBus) {
    this.config = config;
    this.elements = elements;
    this.eventBus = eventBus;

    this._initializeControlPanel();
    this._initializeLSystemComponent();
  }

  _initializeControlPanel() {
    const {
      config,
      elements,
      eventBus,
    } = this;

    const {
      lSystemSelector,
    } = elements;

    const controlPanelModel = new ControlPanelModel(config);
    const controlPanelView = new ControlPanelView(lSystemSelector);

    new ControlPanelController(
        controlPanelModel,
        controlPanelView,
        eventBus);
  }

  _initializeLSystemComponent() {
    const {
      config,
      elements,
      eventBus,
    } = this;

    const {
      visualiser,
    } = elements;

    const lSystemModel = new LSystemModel(config);
    const lSystemView = new LSystemView(visualiser);

    new LSystemController(
        lSystemModel,
        lSystemView,
        eventBus);
  }
}

export default App;
