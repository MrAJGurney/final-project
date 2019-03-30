import LSystemView from './views/l-system-view';
import LSystemModel from './models/l-system-model';
import LSystemController from './controllers/l-system-controller';

import CONFIG from './config';

window.onload = function() {
  const { model } = CONFIG;
  const lSystemModel = new LSystemModel(model);

  const canvas = document.querySelector('div.canvas');
  const lSystemView = new LSystemView(canvas);

  const lSystemController = new LSystemController(lSystemModel, lSystemView);
  lSystemController.configure(CONFIG);
  lSystemController.run();
}
