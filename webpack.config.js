/**
 * Webpack main configuration file
 */

const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const environment = require('./configuration/environment');




const templateFiles = fs.readdirSync(environment.paths.source)
  .filter((file) => ['.html', '.ejs'].includes(path.extname(file).toLowerCase())).map((filename) => ({
    input: filename,
    output: filename.replace(/\.ejs$/, '.html'),
  }));

const htmlPluginEntries = templateFiles.map((template) => new HTMLWebpackPlugin({
  inject: true,
  hash: false,
  filename: template.output,
  template: path.resolve(environment.paths.source, template.input),
  favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
}));

module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, 'js', 'app.js'),
  },
  output: {
    filename: 'js/[name].js',
    path: environment.paths.output,
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',

            options: {
              postcssOptions: {
                plugins: [
                autoprefixer({

                })
              ]
              },
              sourceMap: true
            }


          },
          'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: 'images/design/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: 'images/design/[name].[hash:6][ext]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'removeViewBox',
                      active: false,
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, 'images'),
          to: path.resolve(environment.paths.output, 'images'),
          toType: 'dir',
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
        {
          from: path.resolve(environment.paths.source, 'videos'),
          to: path.resolve(environment.paths.output, 'videos'),
          toType: 'dir',
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
        {
          from: path.resolve(environment.paths.source, 'vendor'),
          to: path.resolve(environment.paths.output, 'vendor'),
          toType: 'dir',
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
        {
          from: path.resolve(environment.paths.source, 'fonts'),
          to: path.resolve(environment.paths.output, 'fonts'),
          toType: 'dir',
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
      ],
    }),
    {
      apply: (compiler) => {//Events after and before compilation
        compiler.hooks.compile.tap('MyPlugin_compile', () => {
          // Runs be4 compilation begin
          // Lets coppy static assets
          Object.values(environment.paths.vendorList).forEach((val) => {
            fs.copyFileSync(path.resolve(val), path.resolve(environment.paths.source, 'vendor', path.basename(val)));
          });
          Object.values(environment.paths.vendorListCss).forEach((val) => {
            fs.copyFileSync(path.resolve(val), path.resolve(environment.paths.source, 'vendor/css', path.basename(val)));
          });
        });
      },
    },
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          // hook after build complete
          // console.log(path.resolve(environment.paths.source, 'fonts/ttf'));
          // convertFont(path.resolve(environment.paths.source, 'fonts/ttf'), path.resolve(environment.paths.source, 'fonts'), 'svg,eot,ttf,woff');
        });
      },
    },
  ].concat(htmlPluginEntries),
  target: 'web',
};
