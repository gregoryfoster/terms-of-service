(function ($) {
  Drupal.behaviors.pinterest_language_switcher = {
    attach: function (context, settings) {
      // Define configurations.
      this.languageDetectedCookieName = 'languageIsDetected';
      this.expDays = 1;
      this.drupalCallbackPath = 'language_detect.php';

      // Verify if redirect is needed before doing anything.
      if (this.needsRedirect()) {
        $.ajax({
          type: "GET",
          url: Drupal.settings.basePath + this.drupalCallbackPath,
          // Avoid varnish from caching this particular page. It will append ?_[timestamp] for every request.
          cache: false,
          // Pass our behaviour object to closure.
          language_switcher: this,
          success: function (data) {
            // Get browser language preferences from Accept-Language header.
            var browser_language = data;

            // Match first preferable language.
            var re = /(?:[, ]|^)([a-zA-Z-]+|\*)(?:;q=([0-9.]+))?(?:$|\s*,\s*)/;
            var drupal_language = re.exec(browser_language)[1].split("-")[0];

            // Find language_switcher block link with needed language.
            var language_links = $('.language-switcher-locale-url li').filter(function () {
              return $(this).hasClass(drupal_language);
            }).find('a');
            // If found, set cookie and execute click.
            if (language_links.length > 0) {
              // Set cookie to remember that browser language was detected.
              this.language_switcher.setCookie(
                this.language_switcher.languageDetectedCookieName, 'true', this.language_switcher.expDays
              );
              // Click on language switcher link.
              language_links[0].click();
            }
          }
        });
      }
    },

    // Check if redirect is needed. Normally we want to redirect users to browser language not too often.
    needsRedirect: function () {
      // Check if there is already a language prefix.
      if (!Drupal.settings.pathPrefix.length) {
      // Check for cookie that proves that language was already set and ignore authenticated users.
      return this.getCookie(this.languageDetectedCookieName).length == 0 &&
        Drupal.settings.language_switcher.user_uid == 0;
      }
    },

    // Get cookie by name.
    getCookie: function (cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    },

    // Set cookie for a period of time specified in days.
    setCookie: function (cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
    }
  };
})(jQuery);
;
/**
 * Created by sorin1 on 12/3/15.
 */
(function ($) {

  Drupal.behaviors.securePage = {
    attach: function (context) {

      if (typeof Drupal.settings.securedpaths != 'undefined' && Drupal.settings.currentUser == 0) {
        var securedPaths = Drupal.settings.securedpaths,
            currentPath = window.location.pathname.trim(),
        newCurrentPath = currentPath.replace(Drupal.settings.pathPrefix, "").replace(/\/+/g, "/");

        securedPaths = securedPaths.map(function (str) {
          return str.trim();
        });

        var match = securedPaths.indexOf(newCurrentPath);
        if (match != -1) {
          window.location.href = location.origin + Drupal.settings.basePath + Drupal.settings.pathPrefix + 'login?next=' + newCurrentPath;
        }
      }
    }
  }

})(jQuery);
;
(function ($) {
  var docCookies = {
    getItem: function (sKey) {
      if (!sKey) { return null; }
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
      if (!this.hasItem(sKey)) { return false; }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function (sKey) {
      if (!sKey) { return false; }
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: function () {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
      return aKeys;
    }
  };

  /* This function checks if there is a pinterest_autologin_attempted cookie set. If so, it will not attempt
     an auto-login. If there is no cookie set, it will set the cookie (they last 24 hours) and then attempt
     an auto-login.
  */
  Drupal.behaviors.checkCookie = {
    attach: function (context) {

      if (typeof Drupal.settings.autologin != 'undefined' &&  Drupal.settings.autologin.autologin_setting == 1 && !docCookies.hasItem("pinterest_autologin_attempt")) {
        //See if we've already tries to autologin

            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 1000 * 36000;
            now.setTime(expireTime);
            docCookies.setItem("pinterest_autologin_attempt", "true", now, "/");
            if (Drupal.settings.currentUser == 0) {
              if (undefined != $(".arrow").next().attr('href')) {
                window.location = window.location.origin + $(".arrow").next().attr('href') + '&autologin=true';
              }
            }
        }
      }
  };
  
})(jQuery);

;
/*
--------------------------------------------------------------------------
(c) 2007 Lawrence Akka
 - jquery version of the spamspan code (c) 2006 SpamSpan (www.spamspan.com)

This program is distributed under the terms of the GNU General Public
Licence version 2, available at http://www.gnu.org/licenses/gpl.txt
--------------------------------------------------------------------------
*/

(function ($) { //Standard drupal jQuery wrapper.  See http://drupal.org/update/modules/6/7#javascript_compatibility
// load SpamSpan
Drupal.behaviors.spamspan = {
  attach: function(context, settings) {
    // get each span with class spamspan
    $("span.spamspan", context).each(function (index) {
      // Replace each <spam class="t"></spam> with .
      if ($('span.t', this).length) {
        $('span.t', this).replaceWith('.');
      }
      
      // For each selected span, set mail to the relevant value, removing spaces
      var _mail = ($("span.u", this).text() +
        "@" +
        $("span.d", this).text())
        .replace(/\s+/g, '');
      // Find the header text, and remove the round brackets from the start and end
      var _headerText = $("span.h", this).text().replace(/^ ?\((.*)\) ?$/, "$1");
      // split into individual headers, and return as an array of header=value pairs
      var _headers = $.map(_headerText.split(/, /), function(n, i){
        return (n.replace(/: /,"="));
      });
      // Find the anchor text, and remove the round brackets from the start and end
      var _anchorText = $("span.t", this).text().replace(/^ \((.*)\)$/, "$1");
      // Build the mailto URI
      var _mailto = "mailto:" + encodeURIComponent(_mail);
      var _headerstring = _headers.join('&');
      _mailto += _headerstring ? ("?" + _headerstring) : '';
      // create the <a> element, and replace the original span contents
      // Issue https://www.drupal.org/node/1540732
      // .attr("href", _mailto) replaced by .attr("href", decodeURIComponent(_mailto))
      $(this).after(
        $("<a></a>")
          .attr("href", decodeURIComponent(_mailto))
          .html(_anchorText ? _anchorText : _mail)
          .addClass("spamspan")
      ).remove();
    });
  }
};
}) (jQuery);;
