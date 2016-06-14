/* global $ */

/**
 * work.js
 * Sets portfolio images
 */
$(document).ready(() => {
  $('.portfolio-item').each((i, el) => {
    const image = $(el).attr('data-image');
    const $bgDiv = $('<div class="portfolio-item-bg"></div>');
    $bgDiv.css({
      'background-image': `url(${image})`,
      'background-size': 'cover',
      height: $(el).innerWidth(),
    });
    $(el).append($bgDiv);
    $(window).resize(() => {
      $bgDiv.css('height', $(el).innerWidth());
    });
  });
  // For some reason there's a space under the squares unless
  // a resize is triggered
  $(window).trigger('resize');
});
