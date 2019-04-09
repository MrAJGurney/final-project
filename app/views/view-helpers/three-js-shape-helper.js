import {
  MeshBasicMaterial,
  BoxGeometry,
  Mesh,
  LineBasicMaterial,
  Geometry,
  Line,
} from '../../libs/three.module';

class ThreeJsShapeHelper {
  static cube() {
    const material = new MeshBasicMaterial();
    material.color.setHSL(0.5, 1, 0.5);
    const geometry = new BoxGeometry(1, 1, 1);
    const cube = new Mesh(geometry, material);
    cube.position.set(0, -0.5, 0);
    return {
      shape: cube,
      animation: () => {
        const size = -0.01;
        cube.material.color.offsetHSL(size, 0, 0);
      },
    };
  }

  static line(start, end, node, tutorialMode) {
    const material = new LineBasicMaterial();
    material.color.setHSL((node % 500) / 500, 1, 0.6);

    const geometry = new Geometry();
    geometry.vertices.push(start);
    geometry.vertices.push(end);
    const line = new Line(geometry, material);

    line.visible = !tutorialMode;
    return {
      shape: line,
      animation: () => {
        const size = -0.01;
        line.material.color.offsetHSL(size, 0, 0);
      },
    };
  }
}

export default ThreeJsShapeHelper;
