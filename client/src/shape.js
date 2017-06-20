const THREE = require('../js/three');

class Shape {

  static cube() {
    var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, -0.5, 0);
    return {
      shape: cube,
      animation: () => {}
    };
  }

  static line(start, end) {
    var material = new THREE.LineBasicMaterial({color: 0xFF22FF});
    var geometry = new THREE.Geometry();
    geometry.vertices.push(start);
    geometry.vertices.push(end);
    var line = new THREE.Line(geometry, material);
    return {
      shape: line,
      animation: () => {}
    };
  }

}

export default Shape;
