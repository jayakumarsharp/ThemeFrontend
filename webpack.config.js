const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/", // Set your public path here
  },

  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      util: require.resolve("util/"),
      process: require.resolve("process/browser"),
      vm: require.resolve("vm-browserify"),
    },
    alias: {
      assets: path.resolve(__dirname, "src/assets/"),
      components: path.resolve(__dirname, "src/components/"),
      examples: path.resolve(__dirname, "src/examples/"),
      context: path.resolve(__dirname, "src/context/"),
      layouts: path.resolve(__dirname, "src/layouts/"),
      Api: path.resolve(__dirname, "src/api/"),
      hooks: path.resolve(__dirname, "src/hooks/"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
      regeneratorRuntime: "regenerator-runtime/runtime",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      // favicon: "./public/favicon.png",
      manifest: "./public/manifest.json",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      //  {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env', '@babel/preset-react']
      //     }
      //   }
      // },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    historyApiFallback: true, // Add this line if you are using React Router
  },
};
