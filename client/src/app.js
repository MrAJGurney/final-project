import Canvas from './canvas';
import Shape from './shape';

function app() {
  const canvas = new Canvas(document.querySelector('div.canvas'));
  const shape = new Shape();
  const cube = shape.cube();
  canvas.scene.add(cube);
  canvas.camera.position.z = 5;

  canvas.Animate = () => {
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
  };
}

window.onload = function() {
  app()
};
