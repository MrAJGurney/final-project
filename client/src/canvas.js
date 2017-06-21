const THREE = require('../js/three');

class Canvas {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();

    this.camera = null;
    this.CreateCamera();

    this.canvas = canvas;
    this.Animate = () => {};

    this.shapes = [];

    this.CreateCanvas();
    this.CreateRenderLoop();

    this.center = null;
    this.zoom = null;
    this.tutorialMode = true;
  }

  CreateCanvas(canvas) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvas.appendChild(this.renderer.domElement);
  }

  CreateCamera() {
    let fieldOfView = 75;
    let aspectRatio = window.innerWidth / window.innerHeight;
    let nearClippingPlane = 0.1;
    let farClippingPlane = 2000;

    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearClippingPlane, farClippingPlane);

    if (this.center !== undefined && this.zoom !== undefined) {
      camera.position.set(this.zoom, this.center.y, this.center.x);

      camera.lookAt(new THREE.Vector3(0, this.center.y, this.center.x));
    }

    this.camera = camera;
  }

  CreateRenderLoop() {
    let firstRender = true;
    const render = () => {
      requestAnimationFrame(render);
      if (!this.tutorialMode) {
        this.shapes.forEach((shape) => {
          shape.animation()
        });
      }

      if (this.center !== null && this.center !== undefined) {
        if (!this.tutorialMode) {

          const axis = new THREE.Vector3(0, 1, 0);
          const angle = Math.PI / 512;
          this.camera.position.applyAxisAngle(axis, angle);
          this.camera.lookAt(new THREE.Vector3(0, this.center.y, this.center.x));
        }
      }

      this.renderer.render(this.scene, this.camera);
    };
    render();
  }

  AddShape(shape) {
    this.shapes.push(shape);
    this.scene.add(shape.shape);
  }

}

export default Canvas;
