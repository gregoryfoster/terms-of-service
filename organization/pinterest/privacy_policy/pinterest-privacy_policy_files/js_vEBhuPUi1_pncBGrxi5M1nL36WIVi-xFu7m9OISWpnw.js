// Do some initial setup.
jQuery(document).ready(function() {
  var version = Drupal.settings.mixpanel.library_version,
      uid     = Drupal.settings.mixpanel.defaults.uid;

  // Calls Mixpanel functions in a version independent way.
  function wrapper(args) {
    var func = args[0];
    if (version === '1.0') {
      mpq.push(args);
    }
    else {
      mixpanel[func].apply(mixpanel, args.slice(1));
    }
  }

  // Uniquely identify the user.
  if (uid) {
    wrapper(["identify", uid]);
  }

  // Register properties about the user.
  wrapper(["register", Drupal.settings.mixpanel.defaults]);

  // Only supported in version 2!
  if (version === '2.0' && uid) {
    // Super basic support for 'People'.
    mixpanel.people.identify(Drupal.settings.mixpanel.defaults.uid);
    mixpanel.people.set(Drupal.settings.mixpanel.people);
  }
});
;
(function ($) {

  /**
   * Presave entered titles during ajax callback.
   */
  Drupal.behaviors.saveCollapsibleElementsTitles = {
    attach: function (context, settings) {

      if (typeof Drupal.settings.collapsible_titles == 'undefined') {
        Drupal.settings.collapsible_titles = [];
      }
      else {
        for (var item in settings.collapsible_titles) {
          $('[name="' + item + '"]').attr('value', settings.collapsible_titles[item].title);
        }
      }

      $('[name*="field_collapsible_elements_token_add_more"]').die().live('click', function (e) {
        $('textarea[name*="field_collapsible_elements_token"]').each(function () {
          var title_expand = $(this).closest('.text-format-wrapper').find('[name*="expand_title"]').attr('value');
          var name_expand = $(this).closest('.text-format-wrapper').find('[name*="expand_title"]').attr('name');
          var title_collapse = $(this).closest('.text-format-wrapper').find('[name*="collapse_title"]').attr('value');
          var name_collapse = $(this).closest('.text-format-wrapper').find('[name*="collapse_title"]').attr('name');
          Drupal.settings.collapsible_titles[name_expand] = {title: title_expand};
          Drupal.settings.collapsible_titles[name_collapse] = {title: title_collapse};
        });
      });

      $('#edit-actions input').die().live('click', function () {
        var $textarea = $('textarea[name*="field_collapsible_elements_token"]');
        var arr = [];
        $textarea.closest('div.text-format-wrapper').each(function () {
          var $this = $(this);
          var title_expand = $this.find('[name*="expand_title"]').attr('value');
          var title_collapse = $this.find('[name*="collapse_title"]').attr('value');
          arr.push({expand_title: title_expand, collapse_title: title_collapse});
        });
        $('textarea[name*="field_collapsible_elements_title"]').text(JSON.stringify(arr));
      });
    }
  }

  Drupal.behaviors.showExample = {
    attach: function (context, settings) {
      $hideWrappers = $('.hide-element-wrapper', context);
      if ($hideWrappers.length) {
        function IsNumeric(input) {
          return (input - 0) == input && ('' + input).replace(/^\s+|\s+$/g, "").length > 0;
        }

        $('<span class="hide-element-btn"></span>').prependTo($hideWrappers);
        $('.hide-element-btn').click(function (e) {
          var $this = $(this);
          var $wrapper = $this.closest('.hide-element-wrapper');
          var wrapperClass = $wrapper.attr('class');
          var wrapperClasses = wrapperClass.split(' ');
          var dataClass = '';
          for (var i = 0, len = wrapperClasses.length; i < len; i++) {
            if (IsNumeric(wrapperClasses[i].slice(-1))) dataClass = wrapperClasses[i];
          }
//          var dataClass = '.hide-element-expand[data-hide="' + dataClass + '"]';
//          $(dataClass).trigger('click');
          $('[data-hide="' + dataClass + '"]').removeClass('is-active');
          $('.hide-element-expand[data-hide="' + dataClass + '"]').addClass('is-active');
          $('.' + dataClass).removeClass('is-expanded').slideUp(250);
        });
      }

      $('.collapse-nav', context).click(function () {
        var $this = $(this);
        var thisTarget = '.' + $this.attr('data-hide');
        var $target = $(thisTarget);

        $(this).siblings().removeClass('is-active');
        $(this).addClass('is-active');

        if ($target.hasClass('is-expanded')) {
          $target.removeClass('is-expanded').slideUp(250);
        } else {
          $target.slideDown(250, function () {
            $target.addClass('is-expanded')
          })
        }
      });

      this._clipboardCopyLink(settings);
      var collapsible_index = _getQueryArgumentValue('collapsible-element');

      if (collapsible_index) {
        // Scroll to collapsible element
        if (('span.show-element-expand[data-hide="hide-element-' + collapsible_index + '"]').length) {
          $('html, body').animate({
            scrollTop: $('span.show-element-expand[data-hide="hide-element-' + collapsible_index + '"]').offset().top - 30
          }, 2000);
        }
        // Open collapsible element
        $('.show-element-expand[data-hide="hide-element-' + collapsible_index + '"]').trigger('click');
      }
    },

    _clipboardCopyLink: function (settings) {
      var $copyLink = $('.copy-to-clipboard-link.collapsible-block a');

      $copyLink.bind('click', function (e) {
        e.preventDefault();

        var id = $(this).attr('data-hide-index');
        window.prompt("Copy to clipboard: Ctrl+C, Enter", window.location.origin + window.location.pathname + '?collapsible-element=' + id + window.location.hash);
      });
    }
  };

  /**
   * Helper function to find query value by argument
   *
   * @param {string} arg_name Query argument name
   *
   * @return {string, boolean} Value for specified query argument.
   * False in case if query is empty or argument was not found.
   */
  function _getQueryArgumentValue(arg_name) {
    // Get query
    var query = window.location.search.slice(window.location.search.indexOf('?') + 1),
      query_arr = [];

    if (query.length < 1) return false;

    // Explode by '&'
    var temp = query.split('&');

    // Now make an array key => value where key will be argument name, and value - argument value.
    for (var i = 0; i < temp.length; i++) {
      var arg = temp[i];
      arg = arg.split('=');
      query_arr[arg[0]] = arg[1];
    }

    if (typeof query_arr[arg_name] != 'undefined') return query_arr[arg_name];
    return false;
  }

}(jQuery));;
(function ($) {

Drupal.googleanalytics = {};

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      // Is the clicked URL internal?
      if (Drupal.googleanalytics.isInternal(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox')) {
          // Do nothing here. The custom event will handle all tracking.
          //console.info("Click on .colorbox item has been detected.");
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (Drupal.settings.googleanalytics.trackDownload && Drupal.googleanalytics.isDownload(this.href)) {
          // Download link clicked.
          ga("send", "event", "Downloads", Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(), Drupal.googleanalytics.getPageUrl(this.href));
        }
        else if (Drupal.googleanalytics.isInternalSpecial(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          ga("send", "pageview", { "page": Drupal.googleanalytics.getPageUrl(this.href) });
        }
      }
      else {
        if (Drupal.settings.googleanalytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          ga("send", "event", "Mails", "Click", this.href.substring(7));
        }
        else if (Drupal.settings.googleanalytics.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (Drupal.settings.googleanalytics.trackDomainMode != 2 || (Drupal.settings.googleanalytics.trackDomainMode == 2 && !Drupal.googleanalytics.isCrossDomain(this.hostname, Drupal.settings.googleanalytics.trackCrossDomains))) {
            // External link clicked / No top-level cross domain clicked.
            ga("send", "event", "Outbound links", "Click", this.href);
          }
        }
      }
    });
  });

  // Track hash changes as unique pageviews, if this option has been enabled.
  if (Drupal.settings.googleanalytics.trackUrlFragments) {
    window.onhashchange = function() {
      ga('send', 'pageview', location.pathname + location.search + location.hash);
    }
  }

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  $(document).bind("cbox_complete", function () {
    var href = $.colorbox.element().attr("href");
    if (href) {
      ga("send", "pageview", { "page": Drupal.googleanalytics.getPageUrl(href) });
    }
  });

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
Drupal.googleanalytics.isCrossDomain = function (hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
};

/**
 * Check whether this is a download URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isDownload = function (url) {
  var isDownload = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  return isDownload.test(url);
};

/**
 * Check whether this is an absolute internal URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternal = function (url) {
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return isInternal.test(url);
};

/**
 * Check whether this is a special URL or not.
 *
 * URL types:
 *  - gotwo.module /go/* links.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternalSpecial = function (url) {
  var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
  return isInternalSpecial.test(url);
};

/**
 * Extract the relative internal URL from an absolute internal URL.
 *
 * Examples:
 * - http://mydomain.com/node/1 -> /node/1
 * - http://example.com/foo/bar -> http://example.com/foo/bar
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   Internal website URL
 */
Drupal.googleanalytics.getPageUrl = function (url) {
  var extractInternalUrl = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return url.replace(extractInternalUrl, '');
};

/**
 * Extract the download file extension from the URL.
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   The file extension of the passed url. e.g. "zip", "txt"
 */
Drupal.googleanalytics.getDownloadExtension = function (url) {
  var extractDownloadextension = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  var extension = extractDownloadextension.exec(url);
  return (extension === null) ? '' : extension[1];
};

})(jQuery);
;
