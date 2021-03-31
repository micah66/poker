const path = require('path')

module.exports = {
  entry: {
    index: "./site/index.js",
  },
  output: {
    path: path.resolve(__dirname, "public", "dist"),
    filename: "[name]_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    publicPath: "/dist",
    contentBase: "./public"
  }
}
