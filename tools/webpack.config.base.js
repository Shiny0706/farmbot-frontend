module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(bower_components|node_modules)/,
      loader: 'babel',
      query: { presets: ['react', 'es2015'] }
    }],
  },
  output: {
    libraryTarget: 'umd',
    library: 'fb_frontend',
  },
  resolve: {
    extensions: [
      '',
      '.js',
    ],
  },
};
