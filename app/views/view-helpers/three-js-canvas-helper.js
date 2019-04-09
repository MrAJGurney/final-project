import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Vector3,
} from '../../libs/three.module';

class ThreeJsCanvasHelper {
  constructor(canvas) {
    this.renderer = new WebGLRenderer();
    this.scene = new Scene();

    this.camera = null;
    this.createCamera();

    this.canvas = canvas;
    this.animate = () => {};

    this.shapes = [];

    this.createCanvas();
    this.createRenderLoop();

    this.center = null;
    this.zoom = null;
    this.tutorialMode = true;
    this.rotate = false;
  }

  resizeWindow() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  createCanvas(canvas) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvas.appendChild(this.renderer.domElement);
  }

  createCamera() {
    const fieldOfView = 75;
    const aspectRatio = window.innerWidth / window.innerHeight;
    const nearClippingPlane = 0.1;
    const farClippingPlane = 2000;

    const camera = new PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearClippingPlane,
        farClippingPlane);

    if (this.center !== undefined && this.zoom !== undefined) {
      camera.position.set(-(this.zoom), this.center.y, this.center.x);

      camera.lookAt(new Vector3(0, this.center.y, this.center.x));
    }

    this.camera = camera;
  }

  createRenderLoop() {
    const render = () => {
      requestAnimationFrame(render);
      if (!this.tutorialMode) {
        this.shapes.forEach((shape) => {
          shape.animation();
        });
      }

      if (this.center !== null && this.center !== undefined) {
        if (this.rotate) {
          const axis = new Vector3(0, 1, 0);
          const angle = Math.PI / 512;
          this.camera.position.applyAxisAngle(axis, angle);
          this.camera.lookAt(new Vector3(0, this.center.y, this.center.x));
        }
      }

      this.renderer.render(this.scene, this.camera);
    };
    render();
  }

  addShape(shape) {
    this.shapes.push(shape);
    this.scene.add(shape.shape);
  }

  clearScene() {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
  }
}

export default ThreeJsCanvasHelper;
