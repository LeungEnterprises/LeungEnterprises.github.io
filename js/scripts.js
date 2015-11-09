$(document).ready(() => {
  // IE detection; their flexbox implementation is a bit wonky
  let msie = (function msieversion() {
    let ua = window.navigator.userAgent;
    let msie = ua.indexOf("MSIE ");

    return (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./));
  })();

  if (msie) {
    $('html').addClass('msie');
    $('body').prepend(`
      <div class="topbar">
        <span>
          It seems that you're using Internet Explorer.  Please switch to a more standards-compliant browser such as 
          <a class="btn btn-primary btn-xs" target="_blank" href="https://www.google.com/chrome/">Chrome</a>
          or <a class="btn btn-primary btn-xs" target="_blank" href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a> 
          for the best experience.
        </span>
      </div>
    `);
    $('.main').css({'margin-top': '50px'});
    // We'll let IE have a loading animation.
    /*
    $('#loader').addClass('hidden');
    $('#loader-overlay').append('<span class="text-5x text-light">&hellip;</span>');
    */
  }

  // Preloader Animation
  $(window).load(() => {
    $('#loader').fadeOut();
    $('#loader-overlay').delay(100).fadeOut('slow');
    $('body').delay(100).css({'overflow':'visible'});
  });

  // Smooth Scroll from CSS-Tricks
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 48 // 48 is jumbotron padding
          }, 1000);
          return false;
        }
      }
    });
  });
  // change desktop header on scroll
  if ($(window).innerWidth() >= 768) {
    $(window).scroll(() => {
      if ($(window).scrollTop() > 50) {
        if (!$('header.desktop').hasClass('open')) {
          $('header.desktop').addClass('open');
        }
      } else {
        if ($('header.desktop').hasClass('open')) {
          $('header.desktop').removeClass('open');
        }
      }
    });
  }
  // change mobile header on scroll
  if ($(window).innerWidth() < 768) {
    $(window).scroll(() => {
      if ($(window).scrollTop() > 5) {
        if ($('header.mobile').hasClass('unscrolled')) {
          $('header.mobile').removeClass('unscrolled');
        }
      } else {
        if (!$('header.mobile').hasClass('unscrolled')) {
          $('header.mobile').addClass('unscrolled');
        }
      }
    });
  }
  // initialize WOW.js, but not on iOS or IE
  let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (!iOS) {
    new WOW().init();
  }
});
