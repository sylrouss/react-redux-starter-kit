import express from 'express'
import history from 'connect-history-api-fallback'
import _debug from 'debug'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import config from '../config'

const debug = _debug('app:bin:server')
const port = config.server_port
const host = config.server_host

if (config.env !== 'development') {
  throw Error('Server should not run outside development')
}

const app = express()

app.use(history({ verbose: false })) // rewrites all routes requests to the /index.html file (ignoring file requests)
app.use(express.static(config.utils_paths.client('static')))

const compiler = webpack(webpackConfig)
const paths = config.utils_paths
const serverOptions = {
  publicPath: webpackConfig.output.publicPath,
  contentBase: paths.client(),
  hot: true,
  quiet: config.compiler_quiet,
  noInfo: config.compiler_quiet,
  lazy: false,
  stats: config.compiler_stats,
}
app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler))

app.listen(port, (error) => {
  if (error) {
    debug(error)
  } else {
    debug(`==> 💻  Listening on ${ host }:${ port }`)
  }
})
