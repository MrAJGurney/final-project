const THREE = require('../js/three');

class Canvas {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.camera = this.CreateCamera();

    this.canvas = canvas;
    this.Animate = () => {};

    this.CreateCanvas();
    this.CreateRenderLoop();
  }

  RenderLoop() {}

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

    return (camera);
  }

  CreateRenderLoop() {
    const render = () => {
      requestAnimationFrame(render);
      this.Animate();
      this.renderer.render(this.scene, this.camera);
    };
    render();
  }

}

export default Canvas;
