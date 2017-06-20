const THREE = require('../js/three');

class Shape {

  static cube() {
    var material = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF/*, wireframe: true */
    });
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, -0.5, 0);
    return {
      shape: cube,
      animation: () => {}
    };
  }

  static line(start, end, node) {
    var material = new THREE.LineBasicMaterial();
    material.color.setHSL((node % 400) / 400, 1, 0.5);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(start);
    geometry.vertices.push(end);
    var line = new THREE.Line(geometry, material);
    return {
      shape: line,
      animation: () => {
        let size = -0.01;
        line.material.color.offsetHSL(size, 0, 0);
      }
    };
  }

}

export default Shape;
