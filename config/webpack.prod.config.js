const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SitemapWebpackPlugin = require('sitemap-webpack-plugin');

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
const pages = [
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
];
const pagesHtmlPlugins = pages.map((page) => {
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
        loader: ExtractTextPlugin.extract(['css', 'postcss', 'sass']),
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
      MODE: '"PROD"', // it's a find and replace so we have to quote the string
    }),
    new ExtractTextPlugin('bundle.css', {
      allChunks: true,
    }),
    new CopyWebpackPlugin([{
      from: 'src/CNAME',
      to: 'CNAME',
      toType: 'file',
    }]),
    new SitemapWebpackPlugin(
      'https://www.leungenterprises.com',
      pages.map((page) => {
        return '/' + page.filename;
      }),
      'sitemap.xml'
    ),
  ],
  postcss() {
    return [require('autoprefixer'), require('postcss-flexibility')]
  },
};