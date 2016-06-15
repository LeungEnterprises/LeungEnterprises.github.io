const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;

const rootpath = path.join(__dirname, '..');
const fontLoaders = [
  {
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file'
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=image/svg+xml'
  },
];
const fileLoaders = [
  {
    test: /\.(mp4|mov)$/,
    loader: 'file',
  },
];
const pagesHtmlPlugins = [
  {
    filename: 'index',
    title: 'Home',
    description: 'Leung Enterprises is a Philly-based software company. We build modern software products spanning from web dev to mobile to frontend.',
  },
  {
    filename: 'work',
    title: 'Work',
    description: 'Leung Enterprises has worked with a diverse variety of technologies and frameworks, such as Node.js, Ionic, and Angular.'
  },
  {
    filename: 'about',
    title: 'About',
    description: 'Founded in September 2014, Leung Enterprises now offers custom software solutions and consulting for a discriminating clientele.'
  },
  {
    filename: '404',
    title: '404',
    description: '404 - Page Not Found'
  },
].map((page) => {
  return new HtmlPlugin({
    filename: `${page.filename}.html`,
    template: path.join(rootpath, 'src', `${page.filename}.jade`),
    title: page.title,
    description: page.description,
    inject: 'div',
  });
});

module.exports = {
  entry: path.join(rootpath, 'index.js'),
  output: {
    path: path.join(rootpath, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      ...fontLoaders,
      ...fileLoaders,
      {
        test: require.resolve('jquery'),
        loader: 'expose?jQuery!expose?$'
      },
      {
        test: /\.jade$/,
        loader: 'jade',
        query: {
          pretty: true,
          filters: [
            {
              name: 'babel',
              filter: 'require("jade-babel")({})',
            },
          ],
        },
      },
      {
        test: /\.scss$/,
        // we can use extract-text-plugin in production
        loaders: ['style', 'css', 'postcss', 'sass'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel'],
      }
    ]
  },
  plugins: [
    // Spread requires Node v5.0+ btw
    ...pagesHtmlPlugins,
    new DefinePlugin({
      MODE: '"DEV"', // it's a find and replace so we have to quote the string
    }),
  ],
  postcss() {
    return [require('autoprefixer')]
  },
};