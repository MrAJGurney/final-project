var config = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};

module.exports = config;
