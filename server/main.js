import Koa from 'koa'
import convert from 'koa-convert'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import historyApiFallback from 'koa-connect-history-api-fallback'
import serve from 'koa-static'
import proxy from 'koa-proxy'
import config from '../config'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'

if (config.env !== 'development') {
  throw Error('Server should not run outside of live development mode')
}

const app = new Koa()

// Enable koa-proxy if it has been enabled in the config.
if (config.proxy && config.proxy.enabled) {
  app.use(convert(proxy(config.proxy.options)))
}

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(convert(historyApiFallback({
  verbose: false,
})))

const compiler = webpack(webpackConfig)
const { publicPath } = webpackConfig.output
app.use(webpackDevMiddleware(compiler, publicPath))
app.use(webpackHMRMiddleware(compiler))
app.use(convert(serve(config.utils_paths.client('static'))))

export default app
