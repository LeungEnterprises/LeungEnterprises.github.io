/**
 * trianglify.js
 * Sets up trianglification on elements with the 'trianglify' class
 */

const trianglify = require('trianglify');

// pages to skip trianglifying the footer on
// also needs to be set in custom.scss:160
const EXEMPT_FOOTER = ['home', 'work'];

$(document).ready(() => {
  let footerSelector = 'body';
  EXEMPT_FOOTER.forEach((page) => {
    footerSelector += `:not(.${page})`;
  });
  footerSelector += ' > footer';
  $(footerSelector).addClass('trianglify');
  
  let elements = $('.trianglify');
  elements.each((i, el) => {
    genTriangles(el);
  });
  
  function genTriangles(el) {
    const colorFunc = (x, y) => {
      return 'hsl(0,0%,'+Math.floor(Math.abs(x*100))+'%)';
    };
    // .inner so we can get padding too
    const height = $(el).innerHeight();
    const width = $(el).innerWidth();
    const pattern = trianglify({
      height,
      width,
      cell_size: 100,
      color_function: colorFunc
    });
    const image = pattern.png();
    const $background = $('<div class="trianglify-background"></div>');
    $background.css({
      'background-image': `url(${image})`,
    });
    $(el).append($background);
  }
});
