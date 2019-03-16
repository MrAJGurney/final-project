import {MeshBasicMaterial, BoxGeometry, Mesh, LineBasicMaterial, Geometry, Line} from '../../../libs/three.module';

class Shape {

  static cube() {
    var material = new MeshBasicMaterial();
    material.color.setHSL(0.5, 1, 0.5);
    var geometry = new BoxGeometry(1, 1, 1);
    var cube = new Mesh(geometry, material);
    cube.position.set(0, -0.5, 0);
    return {
      shape: cube,
      animation: () => {
        let size = -0.01;
        cube.material.color.offsetHSL(size, 0, 0);
      }
    };
  }

  static line(start, end, node, tutorialMode) {
    var material = new LineBasicMaterial();
    material.color.setHSL((node % 500) / 500, 1, 0.6);

    var geometry = new Geometry();
    geometry.vertices.push(start);
    geometry.vertices.push(end);
    var line = new Line(geometry, material);

    line.visible = !tutorialMode;
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
