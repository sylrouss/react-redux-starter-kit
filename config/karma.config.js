import { argv } from 'yargs'
import config from '../config'
import webpackConfig from './webpack.config'
import _debug from 'debug'

const debug = _debug('app:karma')
const paths = config.utils_paths

debug('Create configuration.')

const karmaConfig = {
  basePath: '../',
  files: [
    './node_modules/promise-polyfill/promise.js',
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    {
      pattern: paths.base('tests/test-bundler.js'),
      watched: false,
      served: true,
      included: true,
    },
  ],
  singleRun: !argv.watch,
  frameworks: [
    'intl-shim',
    'mocha',
  ],
  preprocessors: {
    [paths.base('tests/test-bundler.js')]: ['webpack', 'sourcemap'],
  },
  junitReporter: {
    outputFile: 'test-results.xml',
  },
  reporters: ['spec', 'junit'],
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'inline-source-map',
    resolve: {
      ...webpackConfig.resolve,
      alias: {
        ...webpackConfig.resolve.alias,
        sinon: 'sinon/pkg/sinon.js',
      },
    },
    plugins: webpackConfig.plugins,
    module: {
      noParse: [
        /\/sinon\.js/,
      ],
      rules: webpackConfig.module.rules.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports-loader',
        },
      ]),
    },
    externals: {
      ...webpackConfig.externals,
      jsdom: 'window',
      cheerio: 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
      'text-encoding': 'window',
    },
  },
  webpackMiddleware: {
    noInfo: true,
  },
  coverageReporter: {
    reporters: config.coverage_reporters,
  },
}

if (config.coverage_enabled) {
  karmaConfig.reporters.push('coverage')
  karmaConfig.webpack.module.rules.push({
    test: /\.(js|jsx)$/,
    loader: 'isparta-loader',
    include: [ paths.base('src') ],
    exclude: [
      paths.base('src/client.js'),
      paths.base('src/routes.js'),
      paths.base('src/redux/createStore.js'),
      paths.base('node_modules'),
    ],
  })
}

// cannot use `export default` because of Karma.
module.exports = (cfg) => cfg.set(karmaConfig)
