module.exports = {
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /(bower_components|node_modules)/,
        loader: 'ts'
      }],
  },
  output: {
    libraryTarget: 'umd',
    library: 'fb_frontend',
  },
  ts: {
    configFileName: "tsconfig.json"
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.ts',
      '.tsx'
    ],
  },
};
