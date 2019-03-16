import {Vector3} from '../js/three.module';

const MODELS = require('../models/models');

class LSystemPlayground {
  constructor(collaborators, params, canvasElement) {
    const {
      modelType,
      generations,
      rotationEnabled,
      tutorialMode,
      displayCode
    } = params;
    this._throwIfAbsent(modelType, "params");
    this._throwIfAbsent(generations, "params");
    this._throwIfAbsent(rotationEnabled, "params");
    this._throwIfAbsent(tutorialMode, "params");
    this._throwIfAbsent(displayCode, "params");
    this.params = params;

    const {
      Canvas,
      Shape,
      LindenmayerSystem
    } = collaborators;
    this._throwIfAbsent(Canvas, "collaborators");
    this._throwIfAbsent(Shape, "collaborators");
    this._throwIfAbsent(LindenmayerSystem, "collaborators");
    this.collaborators = collaborators;

    this._throwIfAbsent(canvasElement);
    this.canvasElement = canvasElement;
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


  run() {
    const { canvasElement } = this;
    const canvas = new this.collaborators.Canvas(canvasElement);

    const cube = this.collaborators.Shape.cube();
    canvas.AddShape(cube);

    const renderShape = new this.collaborators.LindenmayerSystem(MODELS[this.params.modelType]);

    [...Array(this.params.generations)].forEach(() => {
      renderShape.GenerateCode()
    });
    renderShape.ProcessCode()

    renderShape.lines.forEach((line) => {
      let lineStart = new Vector3(0, line.start.x, line.start.y);
      let lineEnd = new Vector3(0, line.end.x, line.end.y);
      let node = line.node;
      canvas.AddShape(this.collaborators.Shape.line(lineStart, lineEnd, node, this.params.tutorialMode));
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
    console.log("Model:", this.params.modelType);
    console.log("Gens:", this.params.generations);
    console.log("Rotation:", this.params.rotationEnabled);
    console.log("Step-through:", this.params.tutorialMode);
    console.log("Delay:", delay);
    console.log("No. of chars", renderShape.code.length);
    console.log("No. of lines:", renderShape.lines.length);
  }
}

export default LSystemPlayground;
