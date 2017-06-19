const THREE = require('../js/three');

class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.camera = this.CreateCamera();
    this.scene = new THREE.Scene();

    this.CreateCanvas();
  }

  CreateCanvas(canvas) {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvas.appendChild(renderer.domElement);
  }

  CreateCamera() {
    let fieldOfView = 75;
    let aspectRatio = window.innerWidth / window.innerHeight;
    let nearClippingPlane = 0.1;
    let farClippingPlane = 1000;

    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearClippingPlane, farClippingPlane);

    return (camera);
  }

}

export default Canvas;
