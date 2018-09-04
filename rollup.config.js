import babel from 'rollup-plugin-babel';

const config = {
  input: 'src/font-awesome.js',
  output: { file: 'font-awesome.nomodule.js', format: 'iife', sourcemap: false },
  plugins: [
    babel({
      presets: [['env', { modules: false }]],
      plugins: ['external-helpers']
    })
  ]
};

export default config;
