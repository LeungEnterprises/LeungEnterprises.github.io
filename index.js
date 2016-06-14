/* global MODE */

/**
 * CSS Files
 */
require('./src/scss/main.scss');

/**
 * JS Dependencies
 */
const $ = require('jquery');
require('bootstrap-sass');
if (MODE === 'DEV') {
  require('./src/js/add-html');
}
require('./src/js/navbar');
require('./src/js/trianglify');