//  javascript:(function(){_my_script=document.createElement('SCRIPT');_my_script.type='text/javascript';_my_script.src='STORIFY_BASE_URL/public/js/bookmarklet.js?x='+(Math.random());document.getElementsByTagName('head')[0].appendChild(_my_script);})();

STORIFY_BOOKMARKLET_LOADED = (typeof STORIFY_BOOKMARKLET_LOADED != 'undefined') ? STORIFY_BOOKMARKLET_LOADED : false;

(function() {

  if (STORIFY_BOOKMARKLET_LOADED) return;

  if(typeof STORIFY_BASE_URL == 'undefined')
    STORIFY_BASE_URL = 'http://storify.com';

  //STORIFY_BASE_URL = 'http://preview.storify.com';
  //STORIFY_BASE_URL = 'http://staging.storify.com';
  //STORIFY_BASE_URL = 'http://localhost.storify.com:3000';

  var stories = false
    , contextualMenuNode = false
    , $
    , jQuery
    , currentTextSelection = ''
    , favicon = '';


  /******** Load jQuery if not present *********/
  if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {

    var script_tag = document.createElement('script');
    script_tag.setAttribute("type", "text/javascript");
    script_tag.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    script_tag.onload = scriptLoadHandler;
    script_tag.onreadystatechange = function() { // Same thing but for IE
      if (this.readyState == 'complete' || this.readyState == 'loaded') {
        scriptLoadHandler();
      }
    };
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
  } else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    $ = jQuery;
    main();
  }

  /******** Called once jQuery has loaded ******/
  function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    $ = jQuery;
    // Call our main function
    main();
  }


  /**
   * Strict Percent Encoding conforming to RFC 3986.
   *
   * Based on: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/encodeURIComponent
   * 
   * @param {String} str
   */

  function strictEncodeURIComponent (str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28')
                                  .replace(/\)/g, '%29').replace(/\*/g, '%2A');
  }


  function storify_setBehaviourContextualMenu(node) {
    jQuery(document).keyup(function(e) {
      // esc
      if (e.keyCode == 27) {
        storify_close();
      }
    });

    node.find('#STORIFY_OVERLAY_BACKGROUND, #storify_closeBookmarkletBtn').click(function() {
      storify_close();
    });
  }


  function storify_close() {
    if (contextualMenuNode) contextualMenuNode.fadeOut('slow');
  }


  function storify_openContextualMenu(permalink, storyElement_str) {
    if (!permalink) permalink = window.location.href;

    var posX
      , posY
      , html = ''
      , overlayWidth = 445
      , overlayHeight = 560;

    posX = (window.innerWidth - overlayWidth) / 2;
    posY = Math.max((window.innerHeight - overlayHeight) / 2, 10);
    html = '<div id="STORIFY_OVERLAY_BACKGROUND" style="background:rgba(0,0,0,0.5);width:100%;height:100%;position:fixed;z-index:1000;top:0;left:0;"></div>';

    var iframeSRC = STORIFY_BASE_URL + '/import?permalink=' + strictEncodeURIComponent(permalink)
                  + '&text=' + strictEncodeURIComponent(currentTextSelection)
                  + '&title=' + strictEncodeURIComponent(document.title)
                  + '&favicon=' + strictEncodeURIComponent(favicon)
                  + "&storyElement=" + strictEncodeURIComponent(storyElement_str);

    if (contextualMenuNode) {
      /*
      contextualMenuNode.css('left',Math.round(node.offset().left));
      contextualMenuNode.css('top',Math.round(node.offset().top+16));
      */
      contextualMenuNode.find('#STORIFY_IFRAME').attr('src', iframeSRC);
      contextualMenuNode.attr('permalink', permalink);
      contextualMenuNode.fadeIn('slow');
      //      storify_setBehaviourContextualMenu(contextualMenuNode);
      return;
    }

    html += '<div id="storify_closeBookmarkletBtn" style="margin:0;padding:0;cursor:pointer;z-index:10010;width:29px;height:29px;position:fixed;top:' + (posY - 13) + 'px;left:' + (posX + overlayWidth + 3) + 'px;"><img src="http://static.storify.com/css/img/cross_bookmarklet.png" border=0 style="margin:0;padding:0;" /></div><div class="storify_ContextualMenu" permalink="' + permalink + '" style="-webkit-box-shadow:0 0 10px rgba(0,0,0,0.5);-moz-box-shadow:0 0 10px rgba(0,0,0,0.5);-moz-border-radius:7px;-webkit-border-radius:7px;background:none repeat scroll 0 0 white;border:5px solid rgba(0,0,0,0.4);color:black;top:' + posY + 'px;left:' + posX + 'px;text-align:left;padding:5px;position:fixed;width:' + overlayWidth + 'px;z-index:10000;">\n\
        <iframe id="STORIFY_IFRAME" src="' + iframeSRC + '" width="' + (overlayWidth) + '" height="' + (overlayHeight) + '" frameborder="no" scrolling="no"></iframe>\n\
        </div>';

    contextualMenuNode = $('<div id="STORIFY_OVERLAY">' + html + '</div>');
    storify_setBehaviourContextualMenu(contextualMenuNode);

    jQuery('body').append(contextualMenuNode);
  }


  /******** Our main function ********/
  function main() {

    STORIFY_APPNAME = (typeof STORIFY_APPNAME == 'string') ? STORIFY_APPNAME : jQuery('html').attr('STORIFY_APPNAME') || null;
    
    currentTextSelection = (window.getSelection) ? window.getSelection().toString() : document.selection.createRange().text;
    favicon = jQuery('link[rel*=icon]').attr('href') || '';
    if (favicon.substr(0, 1) == '/') {
      favicon = 'http://' + window.location.href.replace(/^(http:\/\/)(www\.)?/i, '').replace(/\/.*/g, '') + favicon;
    }

    if (currentTextSelection != '') currentTextSelection = currentTextSelection.replace(/\n|\r/g, ' ').substr(0, 500);

    var menubar = jQuery('<div style="z-index:1000;width:100%;overflow:hidden;background:rgba(255, 255, 204, 0.85);text-shadow:1px 1px 1px #DDD;"><div style="overflow:hidden;margin:10px;">\n\
                <div class="storify_icon" style="float:left;margin-right:5px;padding:0;"><img src="http://static.storify.com/css/img/favicon.ico" border=0 /></div>\n\
                <div class="storify_activated" style="float:left;padding:0px;"><strong style="margin-right:5px;">Storify activated!</strong>\n\
                You can now click on [Storify this] on the statuses you want to use in your stories</div></div></div>');

    var u = document.location.href
      , matches = u.match(/(https?:\/\/twitter.com\/(.{1,15})\/status(es)?\/([0-9]{3,25}))/i);

    if (matches && (typeof STORIFY_APPNAME != 'string' || STORIFY_APPNAME != 'storifychrome')) {
        storify_openContextualMenu();
    } else {
      var m2 = u.match(/^https?:\/\/twitter.com(\/.*)?/i);
      if (!m2) {

        /******************************/
        /***** SEARCH.TWITTER.COM *****/
        /******************************/
        if (u.match(/search.twitter.com/i)) {
          jQuery('body').prepend(menubar);

          jQuery('li.result .info a.lit').each(function() {
            var self = this;
            var permalink = jQuery(this).attr('href');
            var anchor = jQuery('<a class="storify_openContextualMenu" href="' + permalink + '" style="background:url(http://static.storify.com/css/img/favicon.ico) no-repeat scroll 0 0px transparent;color:#007BCC;padding:0px;margin-left:5px;display:inline;height:16px;padding-left:18px;">Storify this</a>');
            jQuery(this).after(anchor);
            anchor.click(function(e) {
              e.preventDefault();
              storify_openContextualMenu($(this).attr("href"));
              return false;
            });
          });
          return;
        }

        /************************/
        /***** COTWEET.COM *****/
        /************************/
        if(u.match(/cotweet\.com/i)) {
          jQuery.getScript("http://static.storify.com/js/storifythis.js");
          
          var ids = [];

          setInterval(function(ids) {
            jQuery('.result').each(function() {
              var data = jQuery(this)[0].controller.data;
              var username = data.twitterer.username;
              var id_str = data.tweet_id_str;
              var permalink = 'http://twitter.com/'+username+'/status/'+id_str;
              if(!(ids.indexOf(id_str) > -1))
                jQuery(this).prepend('<div style="margin-left:40px;"><a class="retweet-button storify-this" data-via="http://cotweet.com" href="'+permalink+'">Storify this</a></div>');

              ids.push(id_str);
            });
          },10000, ids);
          return;
        }
        
        /************************/
        /***** TOPSY.COM *****/
        /************************/
        if(u.match(/topsy\.com/i)) {
          jQuery.getScript("http://static.storify.com/js/storifythis.js");
          
          // tweets
          jQuery('.tweet-attribs').each(function() {
            var permalink = jQuery(this).find(".date").attr('href');
            jQuery(this).append('<a class="retweet-button storify-this" href="'+permalink+'">Storify this</a>');
          });
          
          // photos
          jQuery('a.x-result-image-thumbnail').each(function() {
            var permalink = jQuery(this).attr('href');
            jQuery(this).after('<a class="retweet-button storify-this" href="'+permalink+'">Storify this</a>');
          });

          // videos
          jQuery('a.video-thumbnail').each(function() {
            var permalink = jQuery(this).attr('href');
            jQuery(this).before('<a class="retweet-button storify-this" href="'+permalink+'">Storify this</a>');
          });

          // link
          jQuery('a.x-result-link-title').each(function() {
            var permalink = jQuery(this).attr('href');
            jQuery(this).after('<a class="retweet-button storify-this" href="'+permalink+'">Storify this</a>');
          });

          return;
          
        }

        /************************/
        /***** FACEBOOK.COM *****/
        /************************/
        if (u.match(/^https?:\/\/(www\.)?facebook\.com/)) {
          var fbFeedItems = '.UIIntentionalStory, .uiStreamStory, .mall_post, .uiUfiComment';

          var strip_tags = function(input, allowed) {
            if (typeof input != 'string') return '';
            // Strips HTML and PHP tags from a string
            allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
            var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
              commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
            return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {
              if ($0.toLowerCase().substring(0, 2) == '<a') {
                var matches = $0.match(/href=[\'"]?([^\'" >]+)/i);
                if(!matches || matches.length<2) return '';
                var href = matches[1];
                $0 = $0.indexOf(' ') > -1 ? $0.substr(0, $0.indexOf(' ')) + '>' : $0;
                $0 = $0.substring(0, $0.length - 1) + ' href="' + href + '">';
              } else {
                $0 = $0.indexOf(' ') > -1 ? $0.substr(0, $0.indexOf(' ')) + '>' : $0;
              }
              return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
            });

          };

          var buildStorifyButton = function(storyElement) {
                        
            var storyElement_str = JSON.stringify(storyElement);

            var storifyAction = $('<a/>', {
                href: '',
                'class': 'storify-action',
                'data-storyElement': storyElement_str,
                html: '<span><i></i>Storify </span>',
                click: function(e) {
                  e.preventDefault();
                  var thisStoryElement = JSON.parse(storyElement_str);
                  var currentTextSelection = (window.getSelection) ? window.getSelection().toString() : document.selection.createRange().text;
                  if(currentTextSelection.length > 0 && thisStoryElement.description.indexOf(currentTextSelection) > -1) {
                    thisStoryElement.description = currentTextSelection;
                  }
                  var thisStoryElement_str = JSON.stringify(thisStoryElement);                    
                  storify_openContextualMenu(thisStoryElement.permalink, thisStoryElement_str);
                }
              });
            
            return storifyAction;
              
          }

          var fbStyle = $('<style/>', {
            type: 'text/css',
            html: '.storify-action span i { display: inline-block; position: relative; width: 15px; height: 15px; margin: 0 3px -3px 0; outline: none; vertical-align: baseline; text-indent: -99999px; background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAACA0lEQVQ4EaVTu2pCQRCde30iKiIWgmDUgGClYKGViKVgY5vG3o8QP8GPiJVia2kjWImvRiFFVCx8ofhAfN3sGbJiIFUysHu5e2bOnJ2ZVTRNo/+YHsGFQuFNVdWX/X6vCEJmPJ/PpNczTNfrlQTO/4owq9Wq3e/3z2Kx+M4eAnw9Ho+q0WgkAbCzz+cjLAQul0uazWa02+1YrPAli8Xyih8m2Gw2N7PZrCIYKxaLUTqdJhBKG41GVKlUaLvdshLEPAiEqodsj8dDiUSCgxuNBiFbJBKh+XxOl8uF+ZBExrACmRn3drvdZLfb2bHdbtNwOKROp0OHw4FOpxNnl/5wUrHJA9xXFJJABMtmsxSNRmm1WrES4NIXX9gPAlQdGXu9HoMoYi6Xo3w+T6FQiIl/JYD3M1CtVqlcLtN4POZaBAIBVuP3+/kazP69/VAAEshH35vNJpVKJa48zlwuFwWDQSaQycDBBJIRgShgJpPhVqLy3W6X6wIf4Ah+Nu7C7XYjnU7H2cPhMKVSKS6a1+slh8NBTqeTh2kwGPCVQIQYmGyjAmYMDoqI/sfjcUomk+yEIarX6zSZTJ7bqDwITCaTDkMCgul0SrVajVqtFonpZMmLxYLW6zXjCEJNEPMgEHI+xGi+iKUYDAYNEvv9PnA2tFe+E3Gg2Gw2TVzrEyBeHzv9dfsC+WJPa3H1emkAAAAASUVORK5CYII=) no-repeat; }'
                + '.storify-action:hover { color: #0074B7; }'
                + '.storify-action:hover span i { background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAACnElEQVQ4EaVTW0tUYRRd58ycuTg6mJfxkoYIiRQmpWEEpdVDL0JFFPXSU5ff0BWkn9Cb0Ev0Ej1FEaVljPZQCYGFRUnmqEmNNTedmTPn2tqfGD3XHs6Z813W2muv/X2a7/v4nwgK+Obk8qOnc4XB1aKjBTT4HufWLQ8RDnRNg+l6CPI/zDHXtMZY0D+6PZ68frBtWBMF+0ZnrdWibRjc4FJQUNfQ3RBBX2tMfadyFcymy0gXbYheh5saY4b96uLOkFLABcvQNcPjqs/XqZ56XD7Qiqihi0AVyYU1XH22hJU1CyEmEIwsKAKRDSoxHR89TVFc6Eso8Oh0Gpmyg+HuWsxnTJQsFxqTeNyrMJsEnhStAWXbRVd9BE3VhpDjwccMXnwt4OGnLHIkKlRc+qDDFakCYCiN9AgeJzX+MiVHZZLFkSNtOLmjDkvZCglcZaSAJaFgJBSBT1NcPlHqSs4X8GQupxb7t1Zj9Hgn7p/twuHOOEzbk0pVMsFIKA88Nk5qk3C549rYIt4sruHcngR6W2IYaK9mWe1YNx28pJmxEMsQJsaGAs+l+6oOWI4Hm8/dt2mcuPMBN8ZTPBMuOraEsX9bDYoVm62i58T8IaCtalLAjVVBXDnUhjO9DUjR+cc0MktfJBwmkTZvJPurBJnkQUOZLh/rT+DSQDPylLuruQot8TDaa8NIZU1MfM6hij55rH/zCmx4wPZCp4k8OJNf8rj9+jtO707g/ECLyjzFVt6aWsbMyjoiQV2ZSDGqj4ogbiCUMT2Ewwbe/yhjZHwJ9979Qk04AJvZFljKt3yF4IAitCwHdRE9JANFMNQaHHs+vTD4M1/WeB/8PEuamPHYaxrLPFEjgCgzl5RVvtYQj/pDezuSQqAuk3z8a/wGmINUQIeW7asAAAAASUVORK5CYII=) no-repeat;}'
          });

          jQuery('body').prepend(fbStyle);
          // Photo page, e.g. https://www.facebook.com/photo.php?fbid=10150768232565462&set=o.6250307292&type=1&theater
          if(match = window.location.href.match(/facebook\.com\/photo\.php\?fbid=([0-9]{1,30})/)) {
            var fbid = match[1];
            
            storyElement = {
                permalink: "https://www.facebook.com/photo.php?fbid="+fbid
              , elementClass: "photo"
              , title: strip_tags(jQuery(".fbPhotosPhotoCaption").html())
              , author: {
                  name: jQuery(".fbPhotoContributorName").find("a").html()
                , href: jQuery("#fbPhotoPageAuthorPic").find("a").attr("href")
                , avatar: jQuery("#fbPhotoPageAuthorPic").find("img").attr("src")
              }
              , image: {
                  src: jQuery("#fbPhotoImage").attr("src")
                , href: "https://www.facebook.com/photo.php?fbid="+fbid
              }
              , via: "https://www.facebook.com/photo.php?fbid="+fbid
            }
            
            var storifyBtn = buildStorifyButton(storyElement);
            jQuery(".fbPhotosPhotoActions").append(storifyBtn);
            return;
          }

          if (jQuery(fbFeedItems).size() > 1) {
            
            if(typeof STORIFY_APPNAME != 'string' || STORIFY_APPNAME != 'storifychrome')
              jQuery('body').prepend(menubar);
              
            // Public page, e.g. http://facebook.com/storify
            jQuery(fbFeedItems).live('mouseover', function(e) {
              var elem = jQuery(this), storyElement;

              if ( elem.hasClass('storifyed') )
                return;
              
              if(elem.hasClass('uiUfiComment')) {
                storyElement = {
                  description: elem.find(".commentContent span[data-jsid=text]").text().replace(/(See More)$/,''),
                  elementClass: "fbpost",
                  created_at: elem.find("abbr").attr("data-date"),
                  author: {
                    name: elem.find("a.actorName").text(),
                    href: elem.find("a.actorName").attr("href"),
                    avatar: elem.find("img.uiProfilePhoto").attr("src")
                  }
                };

                storyElement.via = window.location.href;
                if(storyElement.author.href)
                  storyElement.permalink = window.location.href+'#'+storyElement.author.href.replace(/https?:\/\/(www\.)?facebook\.com\/(profile\.php\?id=)?/i,'');
              }
              else {  
                storyElement = {
                  description: elem.find(".UIStory_Message,.messageBody").html(),
                  elementClass: "fbpost",
                  created_at: elem.find("abbr").attr("data-date"),
                  author: {
                    name: elem.find(".UIIntentionalStory_Names a,.actorName a:first,.actorDescription a:first").text(),
                    href: elem.find(".UIIntentionalStory_Names a,.actorName a:first,.actorDescription a:first").attr("href"),
                    avatar: elem.find("img.UIProfileImage,img.uiProfilePhoto").attr("src")
                  },
                  metadata: JSON.parse(elem.attr("data-ft"))
                };
                
                var slug = elem.find(".UIIntentionalStory_Time a,.uiStreamSource a").attr("href");
                if (slug) {
                  if (slug.charAt(0) == '/') {
                    storyElement.permalink = 'http://www.facebook.com' + slug;
                  } else {
                    storyElement.permalink = slug;
                  }
                }

                if (elem.find(".uiStreamAttachments").size() > 0) {
                  storyElement.image = {
                    src: elem.find(".uiStreamAttachments img").attr("src"),
                    title: elem.find(".uiStreamAttachments .uiAttachmentTitle").text(),
                    description: elem.find(".uiStreamAttachments .uiAttachmentDesc").text(),
                    href: elem.find(".uiStreamAttachments .uiAttachmentTitle a").attr("href")
                  };
                }
              }
              
              var storifyButton = buildStorifyButton(storyElement);
                
              elem.hover(function() {
                storifyButton.show();
              },function() {
                storifyButton.hide();
              })

              elem.addClass('storifyed');
              if(elem.hasClass('uiUfiComment')) elem.find('.commentActions').append(' · ', storifyButton);
              else elem.find('.UIActionLinks').prepend(' · ', storifyButton);
              
            });
            return;
          } else {
            if(typeof STORIFY_APPNAME != 'string' || STORIFY_APPNAME != 'storifychrome') {
              STORIFY_BOOKMARKLET_LOADED = false; // We should be able to reclick the bookmarklet on the same page (and reload it)
              storify_openContextualMenu();
            }
          }
        } else {
          // Unknown page
          if(typeof STORIFY_APPNAME != 'string' || STORIFY_APPNAME != 'storifychrome') {
            STORIFY_BOOKMARKLET_LOADED = false; // We should be able to reclick the bookmarklet on the same page (and reload it)
            storify_openContextualMenu();
          }
        }
      } else {

        /***********************/
        /***** TWITTER.COM *****/
        /***********************/

        if (jQuery('.storify_openContextualMenu').size() == 0) {
          if(typeof STORIFY_APPNAME != 'string' || STORIFY_APPNAME != 'storifychrome')
            jQuery('body').prepend(menubar);

          if (jQuery('span.entry-meta').size() > 0) {
            jQuery('span.entry-meta').each(function() {
              if (!$(this).hasClass('retweet-meta')) {
                var node = jQuery(this).parents('li').attr('id');
                if (node) {
                  var id = node.substr(7);
                  var permalink = jQuery(this).parents('li').find('a.entry-date').attr('href');
                  var anchor = $('<a class="storify_openContextualMenu" href="' + permalink + '" style="background:url(http://static.storify.com/css/img/favicon.ico) no-repeat scroll 0 0px transparent;float:left;color:#007BCC;padding:0px;margin-right:5px;display:inline-table;height:16px;padding-left:18px;">Storify this</a>&nbsp; ');
                  jQuery(this).prepend(anchor);
                  anchor.click(function(e) {
                    e.preventDefault();
                    storify_openContextualMenu($(this).attr("href"));
                    return false;
                  });
                }
              }
            });
          } else {
            // NewTWITTER
            menubar.css('position', 'fixed').css('top', 40);

            var inArray = function(str, array) {
              for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] == str) return true;
              }
              return false;
            };

            var permalink_memory = [];
            jQuery('.stream-tweet, .permalink-tweet').live('hover', function() {
              var node = jQuery(this).find('.tweet-actions');
              var tweetClass = ($(this).hasClass('permalink-tweet')) ? 'permalink' : 'stream';
              var permalink = node.siblings('.tweet-timestamp').attr('href').replace('/#!', 'http://twitter.com');
              if (inArray(tweetClass + ':' + permalink, permalink_memory)) return;

              permalink_memory.push(tweetClass + ':' + permalink);
              var anchor = $('&nbsp;&nbsp; <a class="storify_openContextualMenu" href="' + permalink + '" style="margin-left:5px;background:url(http://static.storify.com/css/img/favicon.ico) no-repeat scroll 0 -2px transparent;color:#007BCC;display:inline;height:16px;padding-left:18px;"> Storify this </a>');

              node.append(anchor);

              anchor.click(function(e) {
                e.preventDefault();
                storify_openContextualMenu($(this).attr("href"));
                return false;
              });

            });
          }

          menubar.hover(function() {
            $('.storify_openContextualMenu').css('background-color', 'yellow');
          },
          function() {
            $('.storify_openContextualMenu').css('background-color', 'transparent');
          });
        }
      }
    }
  }


  STORIFY_BOOKMARKLET_LOADED = true;
})();
