import _debug from 'debug'
import express from 'express'
import history from 'connect-history-api-fallback'
import webpack from 'webpack'
import config from '../config'
import webpackConfig from '../config/webpack.config'

if (config.env !== 'development') {
  throw Error('Server should not run outside development')
}

const app = express()
const compiler = webpack(webpackConfig)
const debug = _debug('app:bin:server')

app.use(history({ verbose: false })) // rewrites all routes requests to the /index.html file (ignoring file requests)
app.use(express.static(config.utils_paths.base('src/static')))
app.use(require('webpack-dev-middleware')(compiler, {
  hot: true,
  lazy: false,
  noInfo: config.compiler_quiet,
  publicPath: webpackConfig.output.publicPath,
  quiet: config.compiler_quiet,
  stats: config.compiler_stats,
}))
app.use(require('webpack-hot-middleware')(compiler))

app.listen(config.server_port, (error) => {
  if (error) {
    debug(error)
  } else {
    debug(`==> 💻  Listening on ${ config.server_port }:${ config.server_host }`)
  }
})
