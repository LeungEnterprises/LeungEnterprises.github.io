/**
 * add-html.js
 * Adds .html extension to extensionless URLs
 */

const url = require('url');

$(document).ready(() => {
  $('a').each((i, el) => {
    const $el = $(el);
    const href = $el.attr('href');
    if (href) {
      const parsed = url.parse(href);
      if (parsed.pathname.match(/^(\/[\w\d]+)+$/) !== null) {
        parsed.pathname += '.html';
      }
      const urlStr = url.format(parsed);
      $el.attr('href', urlStr);
    }
  });
});