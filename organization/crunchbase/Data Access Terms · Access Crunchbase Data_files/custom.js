var stickyFooter = (function() {
  var map = {
    'body' : document.body,
  }
  var _init = function() {
    setTimeout(function() {
      start();
    }, 100)
    _resize();
  }
  var _resize = function() {
    setTimeout(function() {
      $(window).resize(function () {
        start();
      });
    }, 500);
  }
  var isSmallDocument = function() {
    return document.body.clientHeight < (window.outerHeight - 240) ? true : false;
  }
  var start = function() {
    if ( isSmallDocument() ) {
      return $(map.body).addClass('sticky-footer');
    } else {
      return $(map.body).removeClass('sticky-footer');
    }
  }
  return {
    map : map,
    isSmallDocument : isSmallDocument,
    init: _init,
  }
})();

$(function() {
  stickyFooter.init();
});