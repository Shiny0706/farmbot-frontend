webpackConf = Object.assign({}, require('./webpack.dev.config'));
webpackConf.entry = {}; // don't need to specify the entry option

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ["jasmine"],
    files: [
      'src/index.js',
      'test/**/*test.js'
    ],
    exclude: [ ],
    preprocessors: {
      "src/**/*.js": ["webpack", "sourcemap", "coverage"],
      "test/**/*.js": ["webpack", "sourcemap", "coverage"]
    },
    webpack: webpackConf,
    webpackMiddleware: { },
    plugins: [
        require("karma-coverage"),
        require("karma-sourcemap-loader"),
        require("karma-jasmine"),
        require("karma-spec-reporter"),
        require("karma-chrome-launcher"),
        require("karma-webpack")
    ],
    reporters: [
      'spec',
      'coverage'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    webpackServer: { noInfo: true }
  })
}
