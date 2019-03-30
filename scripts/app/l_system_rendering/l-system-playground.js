import Canvas from './three_js_renderer/canvas';
import Shape from './three_js_renderer/shape';

import {Vector3} from '../../libs/three.module';

class LSystemPlayground {
  constructor(canvasElement) {
    this._throwIfAbsent(canvasElement);
    this.canvasElement = canvasElement;

    this.configure = this.configure.bind(this);
  }

  configure(params) {
    const {
      rotationEnabled,
      tutorialMode,
      displayCode
    } = params;
    this._throwIfAbsent(rotationEnabled, "params");
    this._throwIfAbsent(tutorialMode, "params");
    this._throwIfAbsent(displayCode, "params");
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
    const canvas = new Canvas(canvasElement);

    const cube = Shape.cube();
    canvas.AddShape(cube);

    renderShape.lines.forEach((line) => {
      let lineStart = new Vector3(0, line.start.x, line.start.y);
      let lineEnd = new Vector3(0, line.end.x, line.end.y);
      let node = line.node;
      canvas.AddShape(Shape.line(lineStart, lineEnd, node, this.params.tutorialMode));
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
        } else {
          console.log("Displayed all", index, "segments");
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

    if (this.params.displayCode) {
      console.log('|=CODE START=|');
      console.log(renderShape.code.join(''));
      console.log('|=CODE END=|');
      console.log('');
      console.log('');
      console.log('');
    }
    console.log("Model:", this.params.model);
    console.log("Gens:", this.params.generations);
    console.log("Rotation:", this.params.rotationEnabled);
    console.log("Step-through:", this.params.tutorialMode);
    console.log("Delay:", delay);
    console.log("No. of chars", renderShape.code.length);
    console.log("No. of lines:", renderShape.lines.length);
  }
}

export default LSystemPlayground;
