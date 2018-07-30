(function($) {
  $(document).on('ready', function() {
    var localTz = moment.tz.guess();
    // Display all auction times in browser-local timezone
    $('.auction-time').each(function(idx, time) {
      var timeEl = $(time);
      var localTzMoment = moment(timeEl.attr('datetime')).tz(localTz);
      timeEl.text(localTzMoment.format('ha z'));
    })

    $("#filter-dropdown").dropdown({
      align: "right",
      styles: {
        'margin-bottom': '10px'
      },
      onClick: function(value) {
        window.location.href = "?filter=" + value + "#auctionData";
      }
    });
  })
})(jQuery);
