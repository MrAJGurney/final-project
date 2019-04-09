import FRACTAL_BINARY_TREE from './resources/fractal-binary-tree';
import FRACTAL_PLANT from './resources/fractal-plant';
import DRAGON_CURVE from './resources/dragon-curve';

const FRACTAL_BINARY_TREE_CONFIG = {
  model: FRACTAL_BINARY_TREE,
  modelName: 'fractal binary tree',
  generations: 8,
  rotationEnabled: true,
  tutorialMode: false,
};

const FRACTAL_PLANT_CONFIG = {
  model: FRACTAL_PLANT,
  modelName: 'fractal plant',
  generations: 6,
  rotationEnabled: true,
  tutorialMode: false,
};

const DRAGON_CURVE_CONFIG = {
  model: DRAGON_CURVE,
  modelName: 'dragon curve',
  generations: 10,
  rotationEnabled: true,
  tutorialMode: false,
};

const L_SYSTEM_CONFIGS = {
  FRACTAL_BINARY_TREE: FRACTAL_BINARY_TREE_CONFIG,
  FRACTAL_PLANT: FRACTAL_PLANT_CONFIG,
  DRAGON_CURVE: DRAGON_CURVE_CONFIG,
};

export default L_SYSTEM_CONFIGS;
