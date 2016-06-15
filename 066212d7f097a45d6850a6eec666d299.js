'use strict';

/* global $ */

/**
 * work.js
 * Sets portfolio images
 */
$(document).ready(function () {
  $('.portfolio-item').each(function (i, el) {
    var image = $(el).attr('data-image');
    var $bgDiv = $('<div class="portfolio-item-bg"></div>');
    $bgDiv.css({
      'background-image': 'url(' + image + ')',
      'background-size': 'cover',
      height: $(el).innerWidth()
    });
    $(el).append($bgDiv);
    $(window).resize(function () {
      $bgDiv.css('height', $(el).innerWidth());
    });
  });
  // For some reason there's a space under the squares unless
  // a resize is triggered
  $(window).trigger('resize');
});