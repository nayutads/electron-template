import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const isDev = process.env.NODE_ENV === "development";

const main: Configuration = {
  mode: isDev ? "development" : "production",
  resolve: {
    extensions: [".js", ".ts", ".json"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  devtool: isDev ? "inline-source-map" : false,
  target: "electron-main",
  entry: {
    main: "./src/mainprocess/main.ts",
  },
};

const preload: Configuration = {
  mode: isDev ? "development" : "production",
  resolve: {
    extensions: [".js", ".ts"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  devtool: isDev ? "inline-source-map" : false,
  target: "electron-preload",
  entry: {
    preload: "./src/preload.ts",
  },
};

const renderer: Configuration = {
  mode: isDev ? "development" : "production",
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
    filename: "[name].js",
    assetModuleFilename: "images/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: isDev },
          },
        ],
      },
      {
        test: /\.(bmp|ico|gif|jpe?g|png|svg|ttf|eot|woff?2?)$/,
        type: "asset/resource",
      },
    ],
  },
  devtool: isDev ? "inline-source-map" : false,
  target: "web",
  entry: {
    renderer: "./src/rendererprocess/app.tsx",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: !isDev,
      inject: "body",
      filename: "index.html",
      scriptLoading: "blocking",
    }),
    new MiniCssExtractPlugin(),
  ],
};

export default [main, preload, renderer];
