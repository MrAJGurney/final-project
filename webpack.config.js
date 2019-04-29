const config = {
  entry: './app/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  mode: `development`,
};

module.exports = config;
