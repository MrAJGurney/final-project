import Canvas from './canvas';
import Shape from './shape';
import LindenmayerSystem from './l_system';
import LSystemPlayground from './l-system-playground';
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
