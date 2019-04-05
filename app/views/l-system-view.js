import ThreeJsCanvasHelper from './view-helpers/three-js-canvas-helper';
import ThreeJsShapeHelper from './view-helpers/three-js-shape-helper';

import {Vector3} from '../libs/three.module';

class LSystemView {
  constructor(canvasElement) {
    this._throwIfAbsent(canvasElement);
    this.canvasElement = canvasElement;

    this.configure = this.configure.bind(this);
  }

  configure(params) {
    const {
      rotationEnabled,
      tutorialMode,
    } = params;
    this._throwIfAbsent(rotationEnabled, "params");
    this._throwIfAbsent(tutorialMode, "params");
    this.params = params;
  }

  _throwIfAbsent(parameter, group) {
    const inGroup = group === undefined;
    if (parameter === undefined) {
      if (inGroup) {
        throw Error("In " + group + ", missing: " + parameter);
      } else {
        throw Error("Missing: " + parameter);
      }
    }
  }

  run(renderShape) {
    const { canvasElement } = this;
    const canvas = new ThreeJsCanvasHelper(canvasElement);

    const cube = ThreeJsShapeHelper.cube();
    canvas.AddShape(cube);

    renderShape.lines.forEach((line) => {
      let lineStart = new Vector3(0, line.start.x, line.start.y);
      let lineEnd = new Vector3(0, line.end.x, line.end.y);
      let node = line.node;
      canvas.AddShape(ThreeJsShapeHelper.line(lineStart, lineEnd, node, this.params.tutorialMode));
    });

    canvas.tutorialMode = this.params.tutorialMode;
    canvas.rotate = this.params.rotationEnabled;

    const delay = Math.ceil(10000 / renderShape.lines.length);

    if (this.params.tutorialMode) {
      let buttonPressed = false;
      let index = 1; // 0 is the box
      const displayShapes = () => {
        if (index < canvas.shapes.length) {
          canvas.shapes[index].shape.visible = true;
          index++;
          setTimeout(displayShapes, delay);
        }
      };
      document.onkeydown = () => {
        if (!buttonPressed) {
          buttonPressed = true;
          displayShapes(1);
        }
      }
    }

    canvas.center = {
      x: (renderShape.dimensions.maxNorth - renderShape.dimensions.maxSouth) / 2 + renderShape.dimensions.maxSouth,
      y: (renderShape.dimensions.maxEast - renderShape.dimensions.maxWest) / 2 + renderShape.dimensions.maxWest
    };

    canvas.zoom = Math.max(renderShape.dimensions.maxNorth - renderShape.dimensions.maxSouth, renderShape.dimensions.maxEast - renderShape.dimensions.maxWest) * (5 / 7);

    canvas.CreateCamera();
  }
}

export default LSystemView;
