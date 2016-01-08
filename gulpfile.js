var rollup = require('rollup').rollup;
var babel = require('rollup-plugin-babel');

var config = {
  entry: './src/index.js',
  plugins: [
    babel({
      presets: ['react', 'stage-0'],
      exclude: 'node_modules/**'
    })
  ]
};

function finish(bundle) {
  bundle.write({
    format: 'iife',
    dest: 'qqq.js'
  });
}

gulp.task('rollup', function() { rollup(config).then(finish); });
