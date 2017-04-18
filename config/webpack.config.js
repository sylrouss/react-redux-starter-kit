import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from '../config'
import _debug from 'debug'

const debug = _debug('app:webpack:config')
const paths = config.utils_paths
const { __DEV__, __PROD__, __TEST__ } = config.globals

debug('Create configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    modules: [
      paths.client(),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
    alias: {
      STYLES: paths.base(config.dir_client) + '/styles',
      ACTIONS: paths.base(config.dir_client) + '/redux/modules',
      COMPONENTS: paths.base(config.dir_client) + '/components',
      SRC: paths.client(),
      UTILS: paths.base(config.dir_client) + '/utils',
    },
  },
  module: {},
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = paths.base(config.dir_client) + '/client.js'
const includePaths = [
  paths.client(),
  paths.base('tests'),
]
const excludePaths = [
  paths.base('node_modules'),
]

webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY_PATH, `webpack-hot-middleware/client?path=${ config.compiler_public_path }__webpack_hmr`]
    : [APP_ENTRY_PATH],
  vendor: config.compiler_vendor,
}

webpackConfig.output = {
  filename: `[name].[${ config.compiler_hash_type }].js`,
  path: paths.base(config.dir_dist),
  publicPath: config.compiler_public_path,
}

webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin({
    template: paths.client('index.html'),
    hash: false,
    favicon: undefined,
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true,
    },
  }),
]

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoEmitOnErrorsPlugin).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enable plugins for production (UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { dead_code: true, unused: true },
      minimize: true,
      sourceMap: true,
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor'],
  }))
}

const extractCSS = new ExtractTextPlugin({
  allChunks: true,
  filename: 'css/[name].[contenthash].css',
  disable: __DEV__,
})
webpackConfig.plugins.push(extractCSS)

webpackConfig.module.rules = [
  {
    test: /\.(js|jsx)$/,
    use: 'eslint-loader',
    include: includePaths,
    exclude: excludePaths,
    enforce: 'pre',
  },
  {
    test: /\.(js|jsx)$/,
    include: includePaths,
    exclude: excludePaths,
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      plugins: ['transform-runtime', 'react-intl'],
      presets: ['es2015', 'react', 'stage-0'],
    },
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
  {
    test: /\.less$/,
    include: includePaths,
    exclude: excludePaths,
    use: extractCSS.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
            modules: true,
            sourceMap: true,
          },
        },
        'postcss-loader',
        'less-loader',
      ],
    }),
  },
  {
    test: /\.css$/,
    use: extractCSS.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        'postcss-loader',
      ],
    }),
  },
  {
    test: /\.woff(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: '[path][name].[ext]',
          prefix: 'fonts/',
        },
      },
    ],
  },
  {
    test: /\.ttf(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: '[path][name].[ext]',
          prefix: 'fonts/',
        },
      },
    ],
  },
  {
    test: /\.eot(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: '[path][name].[ext]',
          prefix: 'fonts/',
        },
      },
    ],
  },
  {
    test: /\.txt(\?.*)?$/,
    loader: 'raw-loader',
  },
  {
    test: /\.svg(\?.*)?$/,
    loader: 'url-loader',
  },
  {
    test: /\.(png|jpg)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
]

export default webpackConfig
