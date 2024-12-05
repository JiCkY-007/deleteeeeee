import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

import { fileURLToPath } from "url";
import TerserPlugin from "terser-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "production", // Default to development; use 'production' for production builds
  entry: "./src/main.jsx",
  output: {
    path: path.resolve(__dirname, 'dist/admin'),
    clean: true,
    filename: '[name].[contenthash].js', // Use hashed filenames for caching
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|bmp|woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/i,
        oneOf: [
          {
            resourceQuery: /url/, // For SVGs imported as URLs
            type: "asset/resource",
          },
          {
            issuer: /\.[jt]sx?$/, // For SVGs used as React components
            use: ["@svgr/webpack"],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Ensure this matches your index.html location
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: { directory: path.resolve(__dirname, "dist") }, // Correct static path
    port: 3002,
    hot: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all", // Automatically split shared chunks
      name: 'vendors', // Separate vendor chunks
    },
    runtimeChunk: {
      name: 'runtime', // Split runtime code for caching
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  // For production builds
  ...(process.env.NODE_ENV === 'production' && {
    mode: "production",
    devtool: false,
  }),
};
