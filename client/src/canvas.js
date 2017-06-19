const THREE = require('../js/three');

class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.scene = new THREE.Scene();

    this.AssignCanvas();
  }

  AssignCanvas(canvas) {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvas.appendChild(renderer.domElement);
  }

}

export default Canvas;
