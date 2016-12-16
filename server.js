var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath
}).listen(4000, '0.0.0.0', function (err, result) {
  if (err) console.log(err);
  console.log('Running at http://0.0.0.0:4000');
});
