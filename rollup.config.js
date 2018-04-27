import babel from 'rollup-plugin-babel';
import includePaths from 'rollup-plugin-includepaths';
import * as path from 'path';

const includePathOptions = {
  paths: ['node_modules/gluonjs'],
  extensions: ['.js']
};

const config = {
  input: 'src/fontAwesome.js',
  output: { file: 'fontAwesome.nomodule.js', format: 'iife', sourcemap: false },
  plugins: [
    includePaths(includePathOptions),
    babel({
      presets: [['env', { modules: false }]],
      plugins: ['external-helpers']
    })
  ]
};

export default config;
