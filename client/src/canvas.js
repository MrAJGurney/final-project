const THREE = require('../js/three');

class Canvas {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.camera = this.CreateCamera();

    this.canvas = canvas;
    this.Animate = () => {};

    this.shapes = [];

    this.CreateCanvas();
    this.CreateRenderLoop();
  }

  CreateCanvas(canvas) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvas.appendChild(this.renderer.domElement);
  }

  CreateCamera() {
    let fieldOfView = 75;
    let aspectRatio = window.innerWidth / window.innerHeight;
    let nearClippingPlane = 0.1;
    let farClippingPlane = 1000;

    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearClippingPlane, farClippingPlane);

    camera.position.set(20, 15, 0);
    camera.lookAt(new THREE.Vector3(0, 15, 0));

    return (camera);
  }

  CreateRenderLoop() {
    const render = () => {
      requestAnimationFrame(render);
      // this.shapes.forEach((shape) => {
      //   shape.animation()
      // });
      const axis = new THREE.Vector3(0, 1, 0);
      const angle = Math.PI / 512;
      this.camera.position.applyAxisAngle(axis, angle);
      this.camera.lookAt(new THREE.Vector3(0, 15, 0));
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
