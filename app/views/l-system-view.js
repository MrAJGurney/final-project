import ThreeJsCanvasHelper from './view-helpers/three-js-canvas-helper';
import ThreeJsShapeHelper from './view-helpers/three-js-shape-helper';

import {Vector3} from '../libs/three.module';

class LSystemView {
  constructor(canvasElement) {
    this._throwIfAbsent(canvasElement);
    this.canvasElement = canvasElement;

    this.canvas = new ThreeJsCanvasHelper(canvasElement);
  }

  run(lSystemModel, params) {
    this._configure(params);
    this.canvas.clearScene();

    const cube = ThreeJsShapeHelper.cube();
    this.canvas.AddShape(cube);

    lSystemModel.lines.forEach((line) => {
      let lineStart = new Vector3(0, line.start.x, line.start.y);
      let lineEnd = new Vector3(0, line.end.x, line.end.y);
      let node = line.node;
      this.canvas.AddShape(ThreeJsShapeHelper.line(lineStart, lineEnd, node, this.params.tutorialMode));
    });

    this.canvas.tutorialMode = this.params.tutorialMode;
    this.canvas.rotate = this.params.rotationEnabled;

    const delay = Math.ceil(10000 / lSystemModel.lines.length);

    if (this.params.tutorialMode) {
      let buttonPressed = false;
      let index = 1; // 0 is the box
      const displayShapes = () => {
        if (index < this.canvas.shapes.length) {
          this.canvas.shapes[index].shape.visible = true;
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

    this.canvas.center = {
      x: (lSystemModel.dimensions.maxNorth - lSystemModel.dimensions.maxSouth) / 2 + lSystemModel.dimensions.maxSouth,
      y: (lSystemModel.dimensions.maxEast - lSystemModel.dimensions.maxWest) / 2 + lSystemModel.dimensions.maxWest
    };

    this.canvas.zoom = Math.max(lSystemModel.dimensions.maxNorth - lSystemModel.dimensions.maxSouth, lSystemModel.dimensions.maxEast - lSystemModel.dimensions.maxWest) * (5 / 7);

    this.canvas.CreateCamera();
  }

  _configure(params) {
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
}

export default LSystemView;
