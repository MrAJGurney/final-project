import LSystemPlayground from './app/l_system_rendering/l-system-playground';
import LindenmayerSystem from './app/l_system_parsing/l_system';
import LSystemController from './app/l_system_controller';

import CONFIG from './config';

window.onload = function() {
  const { model } = CONFIG;
  const lSystemModel = new LindenmayerSystem(model);

  const canvas = document.querySelector('div.canvas');
  const lSystemView = new LSystemPlayground(canvas);

  const lSystemController = new LSystemController(lSystemModel, lSystemView);
  lSystemController.configure(CONFIG);
  lSystemController.run();
}
