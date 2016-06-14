const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

const compiler = webpack(config);

const server = new WebpackDevServer(compiler);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Webpack Dev Server listening on port ${port}!`);
});