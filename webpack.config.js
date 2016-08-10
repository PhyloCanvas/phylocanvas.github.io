const webpack = require('webpack');
const StaticSiteGeneratorPlugin =
  require('static-site-generator-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PHYLOCANVAS_VERSION =
  require('./package.json').devDependencies.phylocanvas;

const isProd = process.env.NODE_ENV === 'production';

const entryPoint = './src/index.js';

const commonLoaders = [
  { test: /\.(png|jpg|jpeg|gif)$/, loader: 'file' },
  { test: /\.json$/, loader: 'json' },
];

const commonPlugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    PHYLOCANVAS_VERSION: JSON.stringify(PHYLOCANVAS_VERSION),
  }),
];

const babelPresets = [ 'react', 'es2015', 'stage-0' ];

const commonConfig = {

  output: {
    filename: 'index.js',
    path: __dirname,
    publicPath: '/',
    /* IMPORTANT!
     * You must compile to UMD or CommonJS
     * so it can be required in a Node context: */
    libraryTarget: 'umd',
  },

  postcss() {
    return [ require('postcss-cssnext') ];
  },
};

const devConfig = Object.assign({}, commonConfig, {
  devtool: '#eval-source-map',

  entry: {
    main: [
      'webpack-hot-middleware/client',
      entryPoint,
    ],
  },

  module: {
    loaders: [
      { test: /.css$/, loaders: [ 'style', 'css', 'postcss' ] },
      { test: /\.js$/,
        loader: 'babel',
        query: {
          presets: babelPresets,
          plugins: [
            [ 'react-transform', {
              transforms: [ {
                transform: 'react-transform-hmr',
                imports: [ 'react' ],
                locals: [ 'module' ],
              }, {
                transform: 'react-transform-catch-errors',
                imports: [ 'react', 'redbox-react' ],
              } ],
            } ],
          ],
        },
        include: /src/,
      },
      ...commonLoaders,
    ],
  },

  plugins: [
    ...commonPlugins,
    new webpack.HotModuleReplacementPlugin(),
  ],

});

const prodConfig = Object.assign({}, commonConfig, {

  entry: {
    main: entryPoint,
  },

  module: {
    loaders: [
      { test: /.css$/, loader: ExtractTextPlugin.extract('css!postcss') },
      { test: /\.js$/,
        loader: 'babel',
        query: {
          presets: babelPresets,
        },
        include: /src/,
      },
      ...commonLoaders,
    ],
  },

  plugins: [
    ...commonPlugins,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin('styles.css'),
  ],

});

const paths = [
  '/',
  '/docs/',
  '/docs/test/',
  // '/docs/install/',
  // '/docs/features/',
  // '/docs/events/',
  // '/docs/plugins/',
  // '/docs/migrating-from-v1x/',
  // '/docs/development/',
];

const staticSiteConfig = Object.assign({}, prodConfig, {

  module: {
    loaders: [
      { test: /.css$/, loader: ExtractTextPlugin.extract('css!postcss') },
      { test: /\.js$/,
        loader: 'babel',
        query: {
          presets: babelPresets,
          plugins: [ 'remove-webpack' ],
        },
        include: /src/,
      },
      ...commonLoaders,
    ],
  },

  plugins: [
    ...prodConfig.plugins,
    new StaticSiteGeneratorPlugin('main', paths, null),
  ],

});


module.exports = isProd ? [ staticSiteConfig, prodConfig ] : devConfig;
