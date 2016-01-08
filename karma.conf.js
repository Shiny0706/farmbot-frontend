
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
    exclude: [
    ],
    preprocessors: {
      "src/**/*.js": ["webpack"],
      "test/**/*.js": ["webpack"]
    },
    webpack: webpackConf,
    webpackMiddleware: { },
    plugins: [
        require("karma-webpack")
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
