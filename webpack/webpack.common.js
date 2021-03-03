const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/scripts/index.js'),
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: Path.resolve(__dirname, '../public'), to: '.' }] }),
    new CopyWebpackPlugin({ patterns: [{ from: Path.resolve(__dirname, '../src/img'), to: 'img' }] }),
    new CopyWebpackPlugin({ patterns: [{ from: Path.resolve(__dirname, '../src/images'), to: 'images' }] }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/html/pages/home/index.hbs'),
      filename: "index.html",
      // template: "!!ejs-compiled-loader!./src/index.ejs"
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/html/pages/arthcoin/index.hbs'),
      filename: "arth.html",
      // template: "!!ejs-compiled-loader!./src/index.ejs"
    }),
	  new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/html/pages/arthFerrum/index.hbs'),
      filename: "staking.html",
      // template: "!!ejs-compiled-loader!./src/index.ejs"
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/html/pages/team/index.hbs'),
      filename: "about.html",
      // template: "!!ejs-compiled-loader!./src/index.ejs"
    }),
	new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/html/pages/brand/index.hbs'),
      filename: "brandkit.html",
      // template: "!!ejs-compiled-loader!./src/index.ejs"
    }),
	new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/html/pages/privacy-policy/index.hbs'),
      filename: "privacy-policy.html",
      // template: "!!ejs-compiled-loader!./src/index.ejs"
    }),
	new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/html/pages/tokenomics/index.hbs'),
      filename: "tokenomics.html",
      // template: "!!ejs-compiled-loader!./src/index.ejs"
    }),	
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(hbs|handlebars)$/,
        use: {
          loader: "handlebars-loader",
        }
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]',
          },
        },
      },
      {
        test: /\.(ejs)$/,
        loader: "ejs-compiled-loader"
      }
    ],
  },
};