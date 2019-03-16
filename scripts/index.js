import Canvas from './app/l_system_rendering/canvas';
import Shape from './app/l_system_rendering/shape';
import LindenmayerSystem from './app/l_system_parsing/l_system';
import LSystemPlayground from './app/l_system_parsing/l-system-playground';
import CONFIG from './config';

const collaborators = {
  Canvas: Canvas,
  Shape: Shape,
  LindenmayerSystem: LindenmayerSystem
}

window.onload = function() {

  const canvasElement = document.querySelector('div.canvas');
  const lSystemPlayground = new LSystemPlayground(collaborators, CONFIG, canvasElement);
  lSystemPlayground.run();
}
