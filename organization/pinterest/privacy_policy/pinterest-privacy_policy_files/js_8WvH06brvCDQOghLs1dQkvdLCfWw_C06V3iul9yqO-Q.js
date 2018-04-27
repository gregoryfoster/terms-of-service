/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);;
/* Modernizr 2.7.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-inputtypes-svg-touch-cssclasses-addtest-teststyles-prefixes-elem_details
 */
;window.Modernizr=function(a,b,c){function y(a){j.cssText=a}function z(a,b){return y(n.join(a+";")+(b||""))}function A(a,b){return typeof a===b}function B(a,b){return!!~(""+a).indexOf(b)}function C(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:A(f,"function")?f.bind(d||b):f}return!1}function D(){e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),q[a[d]]=!!e;return q}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.7.1",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o={svg:"http://www.w3.org/2000/svg"},p={},q={},r={},s=[],t=s.slice,u,v=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},w={}.hasOwnProperty,x;!A(w,"undefined")&&!A(w.call,"undefined")?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:v(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},p.svg=function(){return!!b.createElementNS&&!!b.createElementNS(o.svg,"svg").createSVGRect};for(var E in p)x(p,E)&&(u=E.toLowerCase(),e[u]=p[E](),s.push((e[u]?"":"no-")+u));return e.input||D(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},y(""),i=k=null,e._version=d,e._prefixes=n,e.testStyles=v,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+s.join(" "):""),e}(this,this.document),Modernizr.addTest("details",function(){var a=document,b=a.createElement("details"),c,d,e;return"open"in b?(d=a.body||function(){var b=a.documentElement;return c=!0,b.insertBefore(a.createElement("body"),b.firstElementChild||b.firstChild)}(),b.innerHTML="<summary>a</summary>b",b.style.display="block",d.appendChild(b),e=b.offsetHeight,b.open=!0,e=e!=b.offsetHeight,d.removeChild(b),c&&d.parentNode.removeChild(d),e):!1});;
var FORMALIZE=(function(b,e,f,a){var h="placeholder" in f.createElement("input");var i="autofocus" in f.createElement("input");var g="webkitAppearance" in f.createElement("select").style;var d=!!(b.browser.msie&&parseInt(b.browser.version,10)===6);var c=!!(b.browser.msie&&parseInt(b.browser.version,10)===7);return{go:function(){for(var j in FORMALIZE.init){FORMALIZE.init[j]();}},init:{detect_webkit:function(){if(!g){return;}b("html").addClass("is_webkit");},full_input_size:function(){if(!c||!b("textarea, input.input_full").length){return;}b("textarea, input.input_full").wrap('<span class="input_full_wrap"></span>');},ie6_skin_inputs:function(){if(!d||!b("input, select, textarea").length){return;}var j=/button|submit|reset/;var k=/date|datetime|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/;b("input").each(function(){var l=b(this);if(this.getAttribute("type").match(j)){l.addClass("ie6_button");if(this.disabled){l.addClass("ie6_button_disabled");}}else{if(this.getAttribute("type").match(k)){l.addClass("ie6_input");if(this.disabled){l.addClass("ie6_input_disabled");}}}});b("textarea, select").each(function(){if(this.disabled){b(this).addClass("ie6_input_disabled");}});},autofocus:function(){if(i||!b(":input[autofocus]").length){return;}b(":input[autofocus]:visible:first").focus();},placeholder:function(){if(h||!b(":input[placeholder]").length){return;}FORMALIZE.misc.add_placeholder();b(":input[placeholder]").each(function(){var j=b(this);var k=j.attr("placeholder");j.focus(function(){if(j.val()===k){j.val("").removeClass("placeholder_text");}}).blur(function(){FORMALIZE.misc.add_placeholder();});j.closest("form").submit(function(){if(j.val()===k){j.val("").removeClass("placeholder_text");}}).bind("reset",function(){setTimeout(FORMALIZE.misc.add_placeholder,50);});});}},misc:{add_placeholder:function(){if(h||!b(":input[placeholder]").length){return;}b(":input[placeholder]").each(function(){var j=b(this);var k=j.attr("placeholder");if(!j.val()||j.val()===k){j.val(k).addClass("placeholder_text");}});}}};})(jQuery,this,this.document);jQuery(document).ready(function(){FORMALIZE.go();});;
(function ($) {

  /**
   * @see http://github.com/NV/placeholder.js
   */
  jQuery.fn.textPlaceholder = function () {
    return this.each(function(){
      var that = this;
      if (that.placeholder && 'placeholder' in document.createElement(that.tagName)) return;
      var placeholder = that.getAttribute('placeholder');
      var input = jQuery(that);
      if (that.value === '' || that.value == placeholder) {
        input.addClass('text-placeholder');
        that.value = placeholder;
      }
      input.focus(function(){
        if (input.hasClass('text-placeholder')) {
          this.value = '';
          input.removeClass('text-placeholder')
        }
      });
      input.blur(function(){
        if (this.value === '') {
          input.addClass('text-placeholder');
          this.value = placeholder;
        } else {
          input.removeClass('text-placeholder');
        }
      });
      that.form && jQuery(that.form).submit(function(){
        if (input.hasClass('text-placeholder')) {
          that.value = '';
        }
      });
    });
  };


  /**
   * Apply placeholder.js for elements having placeholder attribute.
   */
  Drupal.behaviors.cirlceThemeExample = {
    attach: function (context) {
      $("[placeholder]").textPlaceholder();
    }
  };

})(jQuery);



;
(function ($) {

  var isMobile = function() {
    return $(window).width() < 770;
  }

  /**
   * Apply placeholder.js for elements having placeholder attribute.
   */
  Drupal.behaviors.pinterestDeafult = {
    attach: function (context) {
      $('body').removeClass('no-js');
    }
  };

  /**
   * scrollTo initialization
   * - back to top btn
   */
  Drupal.behaviors.scrollToinit = {
    attach: function (context) {
      $('.back-to-top', context).click(function(){
        $.scrollTo(0, 300, {axis: 'y'});
      });
    }
  };

  /**
   * Set the right active trail for side menu(articles and guide pages)
   */
  Drupal.behaviors.setActiveTrail = {
    attach: function (context) {
      if($('.node-type-guide', context).length){
        var guide_menu = $('.guide-menu');
        getMenuLink();
      }

      if($('.node-type-article', context).length){
        var guide_menu = $('.sidebar-tree-content');
        getMenuLink(guide_menu);
      }

      function getMenuLink(menu){
        var current_path = window.location.pathname;
        $('a',menu).removeClass('active');
        $('a[href='+current_path+']', menu).addClass('active');
      }
    }
  };

  /**
   * Language switcher on mobile devices.
   */
  Drupal.behaviors.languageSwitcher = {
    attach: function (context) {
      var active_lang = $('#block-locale-language ul li.active a').attr('lang');
      $('#block-locale-language select option[value="'+active_lang+'"]').attr('selected','selected');

      $langSelect = $('#block-locale-language select', context);
      $langSelect.change(function (e) {
        var newLang = $(this).val();
        window.location.href = $('#block-locale-language .language-switcher-locale-url li a')
          .filter(function(a,b) {
            return $(b).attr('lang') == newLang;
          }).attr('href');
        $(':selected', this).attr('selected', null);
      });
      $("#block-locale-language select option[value='pt-br']").html('Brazil');
      $("#block-locale-language select option[value='pt-pt']").html('Portugal');
    }
  };

  /**
   * Implement responsive header images.
   */
  Drupal.behaviors.responsiveImages = {
    attach: function (context) {
      var $body = $('body');

      if (!$body.hasClass('src-processed')) {
        $body.addClass('src-processed');

        var changeSrc = function(revert) {
          revert = typeof revert == 'undefined' ? false : revert;
          var $images = $('img');
          for (var i = 0, len = $images.length; i < len; i++) {
            var $this = $images.eq(i);
            if (!!$this.attr('data-mobile')) {
              if (!revert) {
                if ($this.attr('src') != $this.attr('data-mobile')) {
                  $this.attr('src', $this.attr('data-mobile'));
                }
              } else {
                if ($this.attr('src') != $this.attr('data-desktop')) {
                  $this.attr('src', $this.attr('data-desktop'));
                }
              }
            }
          }
        };

        if (isMobile()) {
          $body.removeClass('mobile-src').addClass('mobile-src');
          changeSrc();
        }

        $(window).resize(function(e) {
          if (isMobile()) {
            $body.removeClass('descktop-src');
            if ($body.hasClass('mobile-src')) {
              // do nothing.
            } else {
              $body.removeClass('mobile-src').addClass('mobile-src');
              changeSrc();
              if($('.node-type-press').length){
                $('.about-header-bg').imagefill({throttle: 1000 / 150});
              }
            }
          } else {
            $body.removeClass('mobile-src');
            if ($body.hasClass('descktop-src')) {
              // do nothing
            } else {
              $body.removeClass('descktop-src').addClass('descktop-src');
              changeSrc(true);
              if($('.node-type-press').length){
                $('.about-header-bg').imagefill({throttle: 1000 / 150});
              }
            }
          }
        });
      }

    }
  };

  Drupal.behaviors.sidebarTree = {
    attach: function (context) {
      if($('.sidebar-tree-content', context).length){
        $('.view-grouping-header', context).click(function(){
          $(this).parent().toggleClass('is-opened');
          $(this).siblings('.view-grouping-content').slideToggle(200);
        });
        $('.view-grouping-content a.active', context)
          .parents('.view-grouping')
          .addClass('is-opened no-animate')
          .find('.view-grouping-content')
          .css('display', 'block');
      }
    }
  };

  Drupal.behaviors.simpleDropdown = {
    attach: function (context) {
      function makeDropdown(el, mobile) {
        var $el = $(context).find(el);
        if ($el.length) {
          if (typeof mobile == 'undefined') mobile = false;
          $el.click(function (e) {
            if (!mobile || isMobile()) {
              e.preventDefault();
              var $this = $(this);
              $this.toggleClass('is-active');
              $this.next().slideToggle(250, function () {
                var $body = $("html, body");
                $body.animate({scrollTop : $this.next().offset().top}, 250, 'swing');
              });
            }
          });
        }
      }

      makeDropdown('.current-language');
      makeDropdown('.region-footer-second .block-title', true);
    }
  }

  Drupal.behaviors.userMenu = {
    attach: function (context) {
      var $userImage = $('.user-picture', context);

      if ($userImage.length) {
        $('*',$userImage).addClass('insider');
        $userImage.addClass('insider');

        $userImage.find('a').click(function (e) {
          e.preventDefault();
        });

        $userImage.closest('.block-pinterest-user-menu').attr('role', 'group');

        $userImage.click(function (e) {
          e.preventDefault();
          var $this = $(this);
          $this.toggleClass('is-opened');
          // Show user menu on icon click.
          $this.closest('.user-picture').siblings('.user-menu')
              .find('.menu-user-menu').slideToggle(250, function(){
                $(this).css('overflow', 'visible');
              });
        });

        $('body').live('click', function(event){
          var target = $(event.target);

          if (!target.hasClass('insider')) {
            $userImage.removeClass('is-opened');
            $userImage.closest('.user-picture').siblings('.user-menu').find('.menu-user-menu').slideUp(250, function () {
              $(this).css('overflow', 'visible');
            });
          }
        });
      }
    }
  }

  Drupal.behaviors.trobleshootingAnswers = {
    attach: function (context) {
      var $answer = $('.trobleshooting-answers .trobleshooting-answer', context);
      var $question = $('.trobleshooting-question');
      if ($answer.length) {
        $answer.addClass('inactive');
        $question.click(function(){
          var $this = $(this);
          var parent_classes = $this.parents('.platform-elements').attr('class').split(' ');
          var parent_class = parent_classes[1];
          var $currIndex = $(this).attr('data-index');
          $this.addClass('active').siblings().removeClass('active');
          $this.parent('.trobleshooting-questions').addClass('active');


          $('.'+parent_class+' .trobleshooting-answers .trobleshooting-answer')
            .filter('[data-index='+$currIndex+']').removeClass('inactive')
            .siblings().removeClass('inactive').addClass('inactive');
        });
      }
    }
  }

  Drupal.behaviors.browseTopicsColumns = {
    attach: function (context) {
      if ($('body').hasClass('page-browse-help-topics')) {
        var $sections = $('.view-browse-help-topics-section-page', context);
        if ($sections.length) {

          // Check which of two columns is height
          var whosBigger = function($container) {
            var $first = $container.find('.column-1');
            var $second = $container.find('.column-2');
            if ($first.height() > $second.height()) return $second;
            else return $first;
          }

          // Wrapper classes.
          var wrapperOne = '<div class="topic-column column-1"></div>';
          var wrapperTwo = '<div class="topic-column column-2"></div>';

          for (var i = 0, len = $sections.length; i < len; i++) {
            var $this = $($sections[i]).find('.view-content');
            var $topics = $this.children('.help-topic-group');
            if ($topics.length == 1) {
              // If section has only one topic, whar it in second column.
              $topics.eq(0).wrap(wrapperTwo);
            } else {
              $topics.eq(0).wrap(wrapperOne);
              $topics.eq(1).wrap(wrapperTwo);
            }
            $topics = $this.children('.help-topic-group');
            if ($topics.length) {
              // If more topics are left, append them to created columns.
              for (var j = 0, lenj = $topics.length; j < lenj; j++) {
                $topic = $topics.eq(j);
                $(whosBigger($this)).append($topic);
              }
            }
          }

        }
      }
    }
  }

  Drupal.behaviors.copyrightsPosition = {
    attach: function (context) {
      var $copyright = $('.footer-copyrighted', context);
      if ($copyright.length) {
        // Add a copy of copyrights to footer for mobile.
        $copyclone = $copyright.clone();
        $('.footer-two').append($copyclone);
      }
    }
  }

  Drupal.behaviors.frontMobileLinks = {
    attach: function (context) {
      var $blocks = $('.front .node-cta', context);
      if ($blocks.length) {
        for (var i = 0, len = $blocks.length; i < len; i++) {
          var $this = $blocks.eq(i);
          if ($this.find('.field-name-title a').length) {
            var $newlink = $this.find('.field-name-title a').clone();
            $newlink.text('');
            $this.append($newlink);
          }
        }
      }
    }
  }

  Drupal.behaviors.fixedPositioning = {
    attach: function (context) {
      // проверяем поддержку position: fixed;[start]
      var isFixedSupported = (function(){
        var isSupported = null;
        if (document.createElement) {
          var el = document.createElement("div");
          if (el && el.style) {
            el.style.position = "fixed";
            el.style.top = "10px";
            var root = document.body;
            if (root && root.appendChild && root.removeChild) {
              root.appendChild(el);
              isSupported = el.offsetTop === 10;
              root.removeChild(el);
            }
          }
        }
        return isSupported;
      })();

      // добавляем контекст для "старичков"
      window.onload = function(){
        if (!isFixedSupported){
          document.body.className += ' no-fixed-supported';
        }
        // первичный scroll
        window.scrollBy(0, 1);
      }

      var topbar = $('.region-header #search-block-form .form-item-search-block-form');

      window.ontouchstart = function(e) {
        if (isMobile()) {
          if (event.target !== topbar) {
            topbar.style = "";
          }
        }
      }

      window.onscroll = function(){
        if (isMobile()) {
          var scrollTop = window.scrollY;
          topbar.css('top', scrollTop + 'px');
        }
      };
    }
  }
  /**
   * nsfw pins on click functionality.
   */
  Drupal.behaviors.nsfwPins = {
    attach: function (context) {
      if ($('.nsfw').length > 0) {
        $('.nsfw').click(function (event) {
          if (event.target.localName === "img") {
            if(typeof event.currentTarget.isShowing === 'undefined') { //if the element is not showing stop propagation.
              event.stopPropagation();
              event.currentTarget.isShowing = 1;
              event.target.style.opacity = 1;
              event.currentTarget.lastElementChild.style.display = "none";
            }
          }
        });
      }
    }
  }



  Drupal.behaviors.searchFormMobile = {
    attach: function (context) {

      if ($('body.help-subsite').hasClass('front')) {
        return;
      }
        Drupal.behaviors.searchFormMobile.search();
    },
    search: function (context) {
      $searchForm = $('#search-block-form', context);
      if ($searchForm.length) {
        // Append overlay, cansel and search icon to header.
        var cancelString = '<span class="mobile-cancel-btn btn btn-grey">' + Drupal.t('Cancel') + '</span>';
        $searchForm.append('<span class="mobile-search-btn"></span>');
        $searchForm.prepend('<span class="grey-overlay"></span>');
        $searchForm.find('.form-item-search-block-form').append(cancelString);

        var closeSearch = function () {
          $searchForm.find('.form-item-search-block-form').animate({'top': -45}, 220);
          $searchForm.find('.grey-overlay').toggle();
          $searchForm.find('.form-text').val('');
          $('body').addClass('hide-autocomplete').removeClass('fixed-height');
          $('#header-wrapper').removeClass('mobile-show-form');
          $('.not-front .ui-autocomplete.ui-menu').empty();
          document.ontouchmove = function(e){ return true; } // enabling scroll for iphone
        }

        var showForm = function () {
          $searchForm.find('.form-item-search-block-form').animate({'top': 0}, 220);
          $searchForm.find('.grey-overlay').toggle();
          $('body').removeClass('hide-autocomplete').addClass('fixed-height');
          $('#header-wrapper').addClass('mobile-show-form');

          var windowHeight = $(window).height();
          $('body').css('height', windowHeight);

          document.ontouchmove = function(e){ e.preventDefault(); } // disabling scroll for iphone
        }
        // Show form on search icon click.
        $searchForm.find('.mobile-search-btn').click(function (e) {
          showForm();
        });
        // Close form on overlay click.
        $searchForm.find('.grey-overlay').click(function (e) {
          closeSearch();
        });
        // Close form on cancel button click.
        $searchForm.find('.mobile-cancel-btn').click(function (e) {
          closeSearch();
        });
      }
    }
  }

})(jQuery);
;
/*! Hammer.JS - v1.0.9 - 2014-03-18
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */


!function(a,b){"use strict";function c(){d.READY||(s.determineEventTypes(),o.each(d.gestures,function(a){u.register(a)}),s.onTouch(d.DOCUMENT,m,u.detect),s.onTouch(d.DOCUMENT,n,u.detect),d.READY=!0)}var d=function(a,b){return new d.Instance(a,b||{})};d.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},d.HAS_POINTEREVENTS=a.navigator.pointerEnabled||a.navigator.msPointerEnabled,d.HAS_TOUCHEVENTS="ontouchstart"in a,d.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android|silk/i,d.NO_MOUSEEVENTS=d.HAS_TOUCHEVENTS&&a.navigator.userAgent.match(d.MOBILE_REGEX),d.EVENT_TYPES={},d.UPDATE_VELOCITY_INTERVAL=16,d.DOCUMENT=a.document;var e=d.DIRECTION_DOWN="down",f=d.DIRECTION_LEFT="left",g=d.DIRECTION_UP="up",h=d.DIRECTION_RIGHT="right",i=d.POINTER_MOUSE="mouse",j=d.POINTER_TOUCH="touch",k=d.POINTER_PEN="pen",l=d.EVENT_START="start",m=d.EVENT_MOVE="move",n=d.EVENT_END="end";d.plugins=d.plugins||{},d.gestures=d.gestures||{},d.READY=!1;var o=d.utils={extend:function(a,c,d){for(var e in c)a[e]!==b&&d||(a[e]=c[e]);return a},each:function(a,c,d){var e,f;if("forEach"in a)a.forEach(c,d);else if(a.length!==b){for(e=-1;f=a[++e];)if(c.call(d,f,e,a)===!1)return}else for(e in a)if(a.hasOwnProperty(e)&&c.call(d,a[e],e,a)===!1)return},hasParent:function(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1},getCenter:function(a){var b=[],c=[];return o.each(a,function(a){b.push("undefined"!=typeof a.clientX?a.clientX:a.pageX),c.push("undefined"!=typeof a.clientY?a.clientY:a.pageY)}),{pageX:(Math.min.apply(Math,b)+Math.max.apply(Math,b))/2,pageY:(Math.min.apply(Math,c)+Math.max.apply(Math,c))/2}},getVelocity:function(a,b,c){return{x:Math.abs(b/a)||0,y:Math.abs(c/a)||0}},getAngle:function(a,b){var c=b.pageY-a.pageY,d=b.pageX-a.pageX;return 180*Math.atan2(c,d)/Math.PI},getDirection:function(a,b){var c=Math.abs(a.pageX-b.pageX),d=Math.abs(a.pageY-b.pageY);return c>=d?a.pageX-b.pageX>0?f:h:a.pageY-b.pageY>0?g:e},getDistance:function(a,b){var c=b.pageX-a.pageX,d=b.pageY-a.pageY;return Math.sqrt(c*c+d*d)},getScale:function(a,b){return a.length>=2&&b.length>=2?this.getDistance(b[0],b[1])/this.getDistance(a[0],a[1]):1},getRotation:function(a,b){return a.length>=2&&b.length>=2?this.getAngle(b[1],b[0])-this.getAngle(a[1],a[0]):0},isVertical:function(a){return a==g||a==e},toggleDefaultBehavior:function(a,b,c){if(b&&a&&a.style){o.each(["webkit","moz","Moz","ms","o",""],function(d){o.each(b,function(b,e){d&&(e=d+e.substring(0,1).toUpperCase()+e.substring(1)),e in a.style&&(a.style[e]=!c&&b)})});var d=function(){return!1};"none"==b.userSelect&&(a.onselectstart=!c&&d),"none"==b.userDrag&&(a.ondragstart=!c&&d)}}};d.Instance=function(a,b){var e=this;return c(),this.element=a,this.enabled=!0,this.options=o.extend(o.extend({},d.defaults),b||{}),this.options.stop_browser_behavior&&o.toggleDefaultBehavior(this.element,this.options.stop_browser_behavior,!1),this.eventStartHandler=s.onTouch(a,l,function(a){e.enabled&&u.startDetect(e,a)}),this.eventHandlers=[],this},d.Instance.prototype={on:function(a,b){var c=a.split(" ");return o.each(c,function(a){this.element.addEventListener(a,b,!1),this.eventHandlers.push({gesture:a,handler:b})},this),this},off:function(a,b){var c,d,e=a.split(" ");return o.each(e,function(a){for(this.element.removeEventListener(a,b,!1),c=-1;d=this.eventHandlers[++c];)d.gesture===a&&d.handler===b&&this.eventHandlers.splice(c,1)},this),this},trigger:function(a,b){b||(b={});var c=d.DOCUMENT.createEvent("Event");c.initEvent(a,!0,!0),c.gesture=b;var e=this.element;return o.hasParent(b.target,e)&&(e=b.target),e.dispatchEvent(c),this},enable:function(a){return this.enabled=a,this},dispose:function(){var a,b;for(this.options.stop_browser_behavior&&o.toggleDefaultBehavior(this.element,this.options.stop_browser_behavior,!0),a=-1;b=this.eventHandlers[++a];)this.element.removeEventListener(b.gesture,b.handler,!1);return this.eventHandlers=[],s.unbindDom(this.element,d.EVENT_TYPES[l],this.eventStartHandler),null}};var p=null,q=!1,r=!1,s=d.event={bindDom:function(a,b,c){var d=b.split(" ");o.each(d,function(b){a.addEventListener(b,c,!1)})},unbindDom:function(a,b,c){var d=b.split(" ");o.each(d,function(b){a.removeEventListener(b,c,!1)})},onTouch:function(a,b,c){var e=this,f=function(f){var g=f.type.toLowerCase();if(!g.match(/mouse/)||!r){g.match(/touch/)||g.match(/pointerdown/)||g.match(/mouse/)&&1===f.which?q=!0:g.match(/mouse/)&&!f.which&&(q=!1),g.match(/touch|pointer/)&&(r=!0);var h=0;q&&(d.HAS_POINTEREVENTS&&b!=n?h=t.updatePointer(b,f):g.match(/touch/)?h=f.touches.length:r||(h=g.match(/up/)?0:1),h>0&&b==n?b=m:h||(b=n),(h||null===p)&&(p=f),c.call(u,e.collectEventData(a,b,e.getTouchList(p,b),f)),d.HAS_POINTEREVENTS&&b==n&&(h=t.updatePointer(b,f))),h||(p=null,q=!1,r=!1,t.reset())}};return this.bindDom(a,d.EVENT_TYPES[b],f),f},determineEventTypes:function(){var a;a=d.HAS_POINTEREVENTS?t.getEvents():d.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],d.EVENT_TYPES[l]=a[0],d.EVENT_TYPES[m]=a[1],d.EVENT_TYPES[n]=a[2]},getTouchList:function(a){return d.HAS_POINTEREVENTS?t.getTouchList():a.touches?a.touches:(a.identifier=1,[a])},collectEventData:function(a,b,c,d){var e=j;return(d.type.match(/mouse/)||t.matchType(i,d))&&(e=i),{center:o.getCenter(c),timeStamp:(new Date).getTime(),target:d.target,touches:c,eventType:b,pointerType:e,srcEvent:d,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return u.stopDetect()}}}},t=d.PointerEvent={pointers:{},getTouchList:function(){var a=[];return o.each(this.pointers,function(b){a.push(b)}),a},updatePointer:function(a,b){return a==n?delete this.pointers[b.pointerId]:(b.identifier=b.pointerId,this.pointers[b.pointerId]=b),Object.keys(this.pointers).length},matchType:function(a,b){if(!b.pointerType)return!1;var c=b.pointerType,d={};return d[i]=c===i,d[j]=c===j,d[k]=c===k,d[a]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},u=d.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(a,b){this.current||(this.stopped=!1,this.current={inst:a,startEvent:o.extend({},b),lastEvent:!1,lastVelocityEvent:!1,velocity:!1,name:""},this.detect(b))},detect:function(a){if(this.current&&!this.stopped){a=this.extendEventData(a);var b=this.current.inst.options;return o.each(this.gestures,function(c){return this.stopped||b[c.name]===!1||c.handler.call(c,a,this.current.inst)!==!1?void 0:(this.stopDetect(),!1)},this),this.current&&(this.current.lastEvent=a),a.eventType==n&&!a.touches.length-1&&this.stopDetect(),a}},stopDetect:function(){this.previous=o.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(a){var b=this.current,c=b.startEvent;(a.touches.length!=c.touches.length||a.touches===c.touches)&&(c.touches=[],o.each(a.touches,function(a){c.touches.push(o.extend({},a))}));var e,f,g=a.timeStamp-c.timeStamp,h=a.center.pageX-c.center.pageX,i=a.center.pageY-c.center.pageY,j=b.lastVelocityEvent,k=b.velocity;return j&&a.timeStamp-j.timeStamp>d.UPDATE_VELOCITY_INTERVAL?(k=o.getVelocity(a.timeStamp-j.timeStamp,a.center.pageX-j.center.pageX,a.center.pageY-j.center.pageY),b.lastVelocityEvent=a,b.velocity=k):b.velocity||(k=o.getVelocity(g,h,i),b.lastVelocityEvent=a,b.velocity=k),a.eventType==n?(e=b.lastEvent&&b.lastEvent.interimAngle,f=b.lastEvent&&b.lastEvent.interimDirection):(e=b.lastEvent&&o.getAngle(b.lastEvent.center,a.center),f=b.lastEvent&&o.getDirection(b.lastEvent.center,a.center)),o.extend(a,{deltaTime:g,deltaX:h,deltaY:i,velocityX:k.x,velocityY:k.y,distance:o.getDistance(c.center,a.center),angle:o.getAngle(c.center,a.center),interimAngle:e,direction:o.getDirection(c.center,a.center),interimDirection:f,scale:o.getScale(c.touches,a.touches),rotation:o.getRotation(c.touches,a.touches),startEvent:c}),a},register:function(a){var c=a.defaults||{};return c[a.name]===b&&(c[a.name]=!0),o.extend(d.defaults,c,!0),a.index=a.index||1e3,this.gestures.push(a),this.gestures.sort(function(a,b){return a.index<b.index?-1:a.index>b.index?1:0}),this.gestures}};d.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,correct_for_drag_min_distance:!0,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(a,b){if(u.current.name!=this.name&&this.triggered)return b.trigger(this.name+"end",a),void(this.triggered=!1);if(!(b.options.drag_max_touches>0&&a.touches.length>b.options.drag_max_touches))switch(a.eventType){case l:this.triggered=!1;break;case m:if(a.distance<b.options.drag_min_distance&&u.current.name!=this.name)return;if(u.current.name!=this.name&&(u.current.name=this.name,b.options.correct_for_drag_min_distance&&a.distance>0)){var c=Math.abs(b.options.drag_min_distance/a.distance);u.current.startEvent.center.pageX+=a.deltaX*c,u.current.startEvent.center.pageY+=a.deltaY*c,a=u.extendEventData(a)}(u.current.lastEvent.drag_locked_to_axis||b.options.drag_lock_to_axis&&b.options.drag_lock_min_distance<=a.distance)&&(a.drag_locked_to_axis=!0);var d=u.current.lastEvent.direction;a.drag_locked_to_axis&&d!==a.direction&&(a.direction=o.isVertical(d)?a.deltaY<0?g:e:a.deltaX<0?f:h),this.triggered||(b.trigger(this.name+"start",a),this.triggered=!0),b.trigger(this.name,a),b.trigger(this.name+a.direction,a);var i=o.isVertical(a.direction);(b.options.drag_block_vertical&&i||b.options.drag_block_horizontal&&!i)&&a.preventDefault();break;case n:this.triggered&&b.trigger(this.name+"end",a),this.triggered=!1}}},d.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(a,b){switch(a.eventType){case l:clearTimeout(this.timer),u.current.name=this.name,this.timer=setTimeout(function(){"hold"==u.current.name&&b.trigger("hold",a)},b.options.hold_timeout);break;case m:a.distance>b.options.hold_threshold&&clearTimeout(this.timer);break;case n:clearTimeout(this.timer)}}},d.gestures.Release={name:"release",index:1/0,handler:function(a,b){a.eventType==n&&b.trigger(this.name,a)}},d.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_min_touches:1,swipe_max_touches:1,swipe_velocity:.7},handler:function(a,b){if(a.eventType==n){if(a.touches.length<b.options.swipe_min_touches||a.touches.length>b.options.swipe_max_touches)return;(a.velocityX>b.options.swipe_velocity||a.velocityY>b.options.swipe_velocity)&&(b.trigger(this.name,a),b.trigger(this.name+a.direction,a))}}},d.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},has_moved:!1,handler:function(a,b){var c,d,e;a.eventType==l?this.has_moved=!1:a.eventType!=m||this.moved?a.eventType==n&&"touchcancel"!=a.srcEvent.type&&a.deltaTime<b.options.tap_max_touchtime&&!this.has_moved&&(c=u.previous,d=c&&c.lastEvent&&a.timeStamp-c.lastEvent.timeStamp,e=!1,c&&"tap"==c.name&&d&&d<b.options.doubletap_interval&&a.distance<b.options.doubletap_distance&&(b.trigger("doubletap",a),e=!0),(!e||b.options.tap_always)&&(u.current.name="tap",b.trigger(u.current.name,a))):this.has_moved=a.distance>b.options.tap_max_distance}},d.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(a,b){return b.options.prevent_mouseevents&&a.pointerType==i?void a.stopDetect():(b.options.prevent_default&&a.preventDefault(),void(a.eventType==l&&b.trigger(this.name,a)))}},d.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1,transform_within_instance:!1},triggered:!1,handler:function(a,b){if(u.current.name!=this.name&&this.triggered)return b.trigger(this.name+"end",a),void(this.triggered=!1);if(!(a.touches.length<2)){if(b.options.transform_always_block&&a.preventDefault(),b.options.transform_within_instance)for(var c=-1;a.touches[++c];)if(!o.hasParent(a.touches[c].target,b.element))return;switch(a.eventType){case l:this.triggered=!1;break;case m:var d=Math.abs(1-a.scale),e=Math.abs(a.rotation);if(d<b.options.transform_min_scale&&e<b.options.transform_min_rotation)return;u.current.name=this.name,this.triggered||(b.trigger(this.name+"start",a),this.triggered=!0),b.trigger(this.name,a),e>b.options.transform_min_rotation&&b.trigger("rotate",a),d>b.options.transform_min_scale&&(b.trigger("pinch",a),b.trigger("pinch"+(a.scale<1?"in":"out"),a));break;case n:this.triggered&&b.trigger(this.name+"end",a),this.triggered=!1}}}},"function"==typeof define&&define.amd?define(function(){return d}):"object"==typeof module&&module.exports?module.exports=d:a.Hammer=d}(window);
//# sourceMappingURL=/sites/about/themes/custom/pinterest_about/js/hammer.min.map
;
/*!
 * imagesLoaded PACKAGED v3.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("eventEmitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(this,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function c(e){this.img=e}function f(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++){var s=i[r];this.addImage(s)}}},s.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),c.prototype=new t,c.prototype.check=function(){var e=v[this.img.src]||new f(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},c.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return f.prototype=new t,f.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},f.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},f.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},f.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},f.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},f.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});
;
/**
 * imagefill.js
 * Author & copyright (c) 2013: John Polacek
 * johnpolacek.com
 * https://twitter.com/johnpolacek
 *
 * Dual MIT & GPL license
 */
(function(e){e.fn.imagefill=function(t){function l(){n.each(function(){i=e(this).find("img").width()/e(this).find("img").height();var t=e(this).width();var n=e(this).height();var r=t/n;if(r<i){e(this).find("img").css({width:"auto",height:n,top:0,left:-(n*i-t)/2})}else{e(this).find("img").css({width:t,height:"auto",top:-(t/i-n)/2,left:0})}})}function c(){var t=0,r=0;n.each(function(){r+=e(this).height();t+=e(this).width()});if(s!==r||o!==t){l()}setTimeout(c,a.throttle)}var n=this,r=n.find("img").addClass("loading").css({position:"absolute"}),i=1/1,s=0,o=0,u={runOnce:false,throttle:200},a=e.extend({},u,t);var f=n.css("position");n.css({overflow:"hidden",position:f==="static"?"relative":f});n.each(function(){s+=e(this).height();o+=e(this).width()});n.imagesLoaded().done(function(e){i=r.width()/r.height();r.removeClass("loading");l();if(!a.runOnce){c()}});return this}})(jQuery)
;
(function(t,e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else if(typeof exports==="object"){module.exports=e(require("jquery"))}else{e(t.jQuery)}})(this,function(t){t.transit={version:"0.9.12",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var e=document.createElement("div");var n={};function i(t){if(t in e.style)return t;var n=["Moz","Webkit","O","ms"];var i=t.charAt(0).toUpperCase()+t.substr(1);for(var r=0;r<n.length;++r){var s=n[r]+i;if(s in e.style){return s}}}function r(){e.style[n.transform]="";e.style[n.transform]="rotateY(90deg)";return e.style[n.transform]!==""}var s=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;n.transition=i("transition");n.transitionDelay=i("transitionDelay");n.transform=i("transform");n.transformOrigin=i("transformOrigin");n.filter=i("Filter");n.transform3d=r();var a={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var o=n.transitionEnd=a[n.transition]||null;for(var u in n){if(n.hasOwnProperty(u)&&typeof t.support[u]==="undefined"){t.support[u]=n[u]}}e=null;t.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeInCubic:"cubic-bezier(.550,.055,.675,.190)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};t.cssHooks["transit:transform"]={get:function(e){return t(e).data("transform")||new f},set:function(e,i){var r=i;if(!(r instanceof f)){r=new f(r)}if(n.transform==="WebkitTransform"&&!s){e.style[n.transform]=r.toString(true)}else{e.style[n.transform]=r.toString()}t(e).data("transform",r)}};t.cssHooks.transform={set:t.cssHooks["transit:transform"].set};t.cssHooks.filter={get:function(t){return t.style[n.filter]},set:function(t,e){t.style[n.filter]=e}};if(t.fn.jquery<"1.8"){t.cssHooks.transformOrigin={get:function(t){return t.style[n.transformOrigin]},set:function(t,e){t.style[n.transformOrigin]=e}};t.cssHooks.transition={get:function(t){return t.style[n.transition]},set:function(t,e){t.style[n.transition]=e}}}p("scale");p("scaleX");p("scaleY");p("translate");p("rotate");p("rotateX");p("rotateY");p("rotate3d");p("perspective");p("skewX");p("skewY");p("x",true);p("y",true);function f(t){if(typeof t==="string"){this.parse(t)}return this}f.prototype={setFromString:function(t,e){var n=typeof e==="string"?e.split(","):e.constructor===Array?e:[e];n.unshift(t);f.prototype.set.apply(this,n)},set:function(t){var e=Array.prototype.slice.apply(arguments,[1]);if(this.setter[t]){this.setter[t].apply(this,e)}else{this[t]=e.join(",")}},get:function(t){if(this.getter[t]){return this.getter[t].apply(this)}else{return this[t]||0}},setter:{rotate:function(t){this.rotate=b(t,"deg")},rotateX:function(t){this.rotateX=b(t,"deg")},rotateY:function(t){this.rotateY=b(t,"deg")},scale:function(t,e){if(e===undefined){e=t}this.scale=t+","+e},skewX:function(t){this.skewX=b(t,"deg")},skewY:function(t){this.skewY=b(t,"deg")},perspective:function(t){this.perspective=b(t,"px")},x:function(t){this.set("translate",t,null)},y:function(t){this.set("translate",null,t)},translate:function(t,e){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(t!==null&&t!==undefined){this._translateX=b(t,"px")}if(e!==null&&e!==undefined){this._translateY=b(e,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var t=(this.scale||"1,1").split(",");if(t[0]){t[0]=parseFloat(t[0])}if(t[1]){t[1]=parseFloat(t[1])}return t[0]===t[1]?t[0]:t},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var e=0;e<=3;++e){if(t[e]){t[e]=parseFloat(t[e])}}if(t[3]){t[3]=b(t[3],"deg")}return t}},parse:function(t){var e=this;t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,n,i){e.setFromString(n,i)})},toString:function(t){var e=[];for(var i in this){if(this.hasOwnProperty(i)){if(!n.transform3d&&(i==="rotateX"||i==="rotateY"||i==="perspective"||i==="transformOrigin")){continue}if(i[0]!=="_"){if(t&&i==="scale"){e.push(i+"3d("+this[i]+",1)")}else if(t&&i==="translate"){e.push(i+"3d("+this[i]+",0)")}else{e.push(i+"("+this[i]+")")}}}}return e.join(" ")}};function c(t,e,n){if(e===true){t.queue(n)}else if(e){t.queue(e,n)}else{t.each(function(){n.call(this)})}}function l(e){var i=[];t.each(e,function(e){e=t.camelCase(e);e=t.transit.propertyMap[e]||t.cssProps[e]||e;e=h(e);if(n[e])e=h(n[e]);if(t.inArray(e,i)===-1){i.push(e)}});return i}function d(e,n,i,r){var s=l(e);if(t.cssEase[i]){i=t.cssEase[i]}var a=""+y(n)+" "+i;if(parseInt(r,10)>0){a+=" "+y(r)}var o=[];t.each(s,function(t,e){o.push(e+" "+a)});return o.join(", ")}t.fn.transition=t.fn.transit=function(e,i,r,s){var a=this;var u=0;var f=true;var l=t.extend(true,{},e);if(typeof i==="function"){s=i;i=undefined}if(typeof i==="object"){r=i.easing;u=i.delay||0;f=typeof i.queue==="undefined"?true:i.queue;s=i.complete;i=i.duration}if(typeof r==="function"){s=r;r=undefined}if(typeof l.easing!=="undefined"){r=l.easing;delete l.easing}if(typeof l.duration!=="undefined"){i=l.duration;delete l.duration}if(typeof l.complete!=="undefined"){s=l.complete;delete l.complete}if(typeof l.queue!=="undefined"){f=l.queue;delete l.queue}if(typeof l.delay!=="undefined"){u=l.delay;delete l.delay}if(typeof i==="undefined"){i=t.fx.speeds._default}if(typeof r==="undefined"){r=t.cssEase._default}i=y(i);var p=d(l,i,r,u);var h=t.transit.enabled&&n.transition;var b=h?parseInt(i,10)+parseInt(u,10):0;if(b===0){var g=function(t){a.css(l);if(s){s.apply(a)}if(t){t()}};c(a,f,g);return a}var m={};var v=function(e){var i=false;var r=function(){if(i){a.unbind(o,r)}if(b>0){a.each(function(){this.style[n.transition]=m[this]||null})}if(typeof s==="function"){s.apply(a)}if(typeof e==="function"){e()}};if(b>0&&o&&t.transit.useTransitionEnd){i=true;a.bind(o,r)}else{window.setTimeout(r,b)}a.each(function(){if(b>0){this.style[n.transition]=p}t(this).css(l)})};var z=function(t){this.offsetWidth;v(t)};c(a,f,z);return this};function p(e,i){if(!i){t.cssNumber[e]=true}t.transit.propertyMap[e]=n.transform;t.cssHooks[e]={get:function(n){var i=t(n).css("transit:transform");return i.get(e)},set:function(n,i){var r=t(n).css("transit:transform");r.setFromString(e,i);t(n).css({"transit:transform":r})}}}function h(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function b(t,e){if(typeof t==="string"&&!t.match(/^[\-0-9\.]+$/)){return t}else{return""+t+e}}function y(e){var n=e;if(typeof n==="string"&&!n.match(/^[\-0-9\.]+/)){n=t.fx.speeds[n]||t.fx.speeds._default}return b(n,"ms")}t.transit.getTransitionValue=d;return t});;
(function ($) {

  /**
   * Helper function to check if is mobile or not.
   * @return {boolean}
   */
  function isMobile() {
    return $(window).width() < 770;
  }

  /**
   * Helper function to check if is retina or not.
   * @return {boolean}
   */
  function isRetina() {
    return (window.devicePixelRatio > 1);
  }

  /**
   * Helper function to check if extension is installed or not.
   * @return {boolean}
   */
  function isExtensionInstalled() {
    // Check for the pinterest extension and fall back to the attribute style data() test.
    return (jQuery('body').hasClass('desktop')
      && (jQuery('body').data('pinterest-extension-installed') || jQuery('body[data-pinterest-extension-installed]:not([data-pinterest-extension-installed=""])').length >= 1)
    );
  }

  /**
   * Helper function to check current platform.
   */

  function _checkPlatforms() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
      return 'ios';
    }
    else if (userAgent.match(/Android/i)) {
      return 'android';
    }
    else {
      return 'desktop';
    }
  }


  function browserButtonPageMag(el, browser) {
    var positions = {
      chrome: [372, -20],
      firefox: [366, -19],
      safari: [304, -41],
      ie: [375, -6]
    };
    var position = positions[browser] || positions['chrome'];
    el.css('left', position[0]).css('top', position[1]);
    el.on('load', function () {
      var springSystem = new rebound.SpringSystem();
      var popSpring = springSystem.createSpring(120, 5);
      popSpring.setCurrentValue(0.4);

      popSpring.addListener({
        onSpringUpdate: function () {
          el.css('scale', popSpring.getCurrentValue());
        }
      });

      setTimeout(function () {
        el.css('opacity', 1);
        popSpring.setEndValue(1);
      }, 1000);
    });
  }

  Drupal.behaviors.checkMobilePlatform = {
    attach: function (context) {
      var currentPlatform = _checkPlatforms;
      $('body').addClass(currentPlatform);
    }
  }

  Drupal.behaviors.responsiveHeaderImage = {
    attach: function (context) {
      // Article header background image
      $('.about-header-bg').imagefill({throttle: 1000 / 150});
      // Frontpage header mobile image
      $('.bg-video .file-image .content').imagefill({throttle: 1000 / 150});
      // Frontpage footer background image
      $('.pinterest-landing-join-bg .field-name-field-pin-icon').imagefill({throttle: 1000 / 150});
    }
  }

  // Put Language block second if it stays first.
  Drupal.behaviors.footerLanguages = {
    attach: function (context) {
      var $languageBlock = $('.footer-one .block-locale', context);
      if ($languageBlock.length && $languageBlock.index() == 0) {
        $('.footer-one').append($languageBlock);
      }
    }
  }

  Drupal.behaviors.mobileMenu = {
    attach: function (context) {
      $('.mobile-menu-switcher').click(function () {
        if ($('body').hasClass('side-menu-visible')) {
          $('body').removeClass('side-menu-visible');
          setTimeout(function () {
            $('body').removeClass('dummyclass');
          }, 700);
        }
        else {
          $('body').addClass('side-menu-visible');
          setTimeout(function () {
            $('body').addClass('dummyclass');
          }, 700);
        }
      });

      $(window).resize(function () {
        if ($('.side-menu-visible').length) {
          if ($('html').outerWidth() > 760) {
            $('body').removeClass('side-menu-visible');
          }
        }
      });
    }
  }

  /**
   * Discover section build slide.
   */
  Drupal.behaviors.sliderPreparation = {
    attach: function (context) {
      var $discoverSlidesWrapper = $('.panel-discover .node-boards-on-slide', context);
      if ($discoverSlidesWrapper.length) {
        var $discoverSlides = $discoverSlidesWrapper.find('.field-name-field-board-on-slide-reference');
        for (var i = 0, len = $discoverSlides.length; i < len; i += 3) {
          $discoverSlides.slice(i, i + 3).wrapAll("<div class='slider-item'></div>");
        }
        var $slides = $discoverSlidesWrapper.find('.slider-item');
        for (var i = 0, len = $slides.length; i < len; i++) {
          var $this = $slides.eq(i);
          for (var j = 0; j < 3; j++) {
            $this
              .find('.field-name-field-board-on-slide-reference').eq(j)
              .addClass('slide-inner-' + j);
          }
        }
        var $titles = $discoverSlidesWrapper.find('.field-name-field-description-long-text');
        if ($titles.length) {
          for (var i = 0, len = $titles.length; i < len; i++) {
            var $this = $titles.eq(i);
            if ($this.prev().hasClass('slider-item')) {
              $this.prev().find('.field-name-field-launche-title-text')
                .text($this.text());
              $this.remove();
            }
          }
        }
      }
    }
  };

  Drupal.behaviors.responsiveVideos = {
    attach: function (context, settings) {
      setTimeout(function () {
        $('iframe[src*="youtube.com"], iframe[src*="vimeo.com"], .media-vimeo-outer-wrapper, .media-youtube-outer-wrapper', context).wrap('<div class="video-container"/>');
      }, 1000);
    }
  };

  Drupal.behaviors.installAppButton = {
    attach: function (context, settings) {
      // Ensure the default settings are set.
      settings.installAppButton = settings.installAppButton || {current_node_en_path: "", confirm_path: ""};

      var f = this;

      // Check for the browser extension and run any check that are needed.
      f.runExtensionChecks(context, settings);

      var apps = [ // Apps data
          {
            'f': 'opera',
            'n': 'Opera',
            'r': /OPR/,
            'u': 'https://addons.opera.com/en/extensions/details/pinterest-8/?display=en',
            'd': 'https://addons.opera.com/en/extensions/',
            'oneclick': true
          },
          {
            'f': 'chrome',
            'n': 'Chrome',
            'r': /Chrome/,
            'u': 'https://chrome.google.com/webstore/detail/gpdjojdkbbmdfjfahjcgigfpmkopogic',
            'd': 'https://support.google.com/chrome/answer/154007?hl=en',
            'oneclick': true
          },
          {
            'f': 'firefox',
            'n': 'Firefox',
            'r': /Firefox/,
            'u': 'https://assets.pinterest.com/ext/Pinterest_Firefox.xpi'
          },
          {
            'f': 'safari',
            'n': 'Safari',
            'r': /Macintosh(.*)AppleWebKit(.*)Version\/(6|7|8|9)/,
            'u': 'https://assets.pinterest.com/ext/Pinterest-Safari.safariextz'
          },
          {
            'f': 'ie',
            'n': 'Internet Explorer',
            'r': /(MSIE|Trident)/,
            'u': 'http://about.pinterest.com/assets/ext/Pinterest-IE-0.0.4.exe'
          },
          {
            'f': 'oldOpera',
            'n': 'Older Opera',
            'r': /Opera/,
            'u': 'https://addons.opera.com/en/search/?query=pinterest'
          }
        ],
        $button = $('.install-app-button'), // Install app button
        $bookmarklet = $('.browser-button-wrapper.bookmarklet-wrapper');

      // Get App info for current browser
      var currentApp = f.getBrowser($button, apps),
        is_edge = false;

      f.switchContainers(context, f);

      if (currentApp.f == 'chrome' && (typeof window.chrome == 'undefined' || typeof window.chrome.webstore == 'undefined')) {
        $('.browser-button-wrapper:not(.bookmarklet-wrapper)').attr('style', 'display: none !important');
        var lang = Drupal.settings.pathPrefix.slice(0, -1),
          $href = $bookmarklet.find('.install-app-button .btn-text a.bookmarklet-link'),
          href_link = $href.attr('href');

        $href.attr('href', href_link.replace('{lang}', lang));
        is_edge = true;
      }

      if (currentApp && !is_edge) {
        $bookmarklet.attr('style', 'display: none !important');
        // Change Browser Name
        $('.change-browser-name').text(currentApp.n);

        // Add a custom class to our button icon.
        $button.find('.icon-browser').addClass('icon-' + currentApp.f);

        // Add the class to the body as well.
        $('body').addClass(currentApp.f);
        $('.web-desktop-bb-hero').addClass(currentApp.f);

        // Change description text
        $how_to_text = $('.how-to');
        $how_to_text.hide();
        $how_to_text.filter(function () {
          return $(this).hasClass(currentApp.f)
        }).show();
      }

      if (currentApp || is_edge) {
        // Replace images for each browser.
        $('.screenshot img').each(function () {
          var browser = 'chrome'; // Default.

          if ($.inArray(currentApp.f, ['firefox', 'safari', 'ie']) >= 0) {
            browser = currentApp.f;
          } else {
            browser = 'chrome';
          }
          var src = $(this).data('src').replace("browsername", browser);

          // Replace Retina images.
          if (isRetina()) {
            src = (src + "").replace('1x', '2x');
          }
          $(this).attr('src', src);

          if ($(this).hasClass('browser-button-mag')) {
            browserButtonPageMag($(this), browser);
          }
        });
      }

      // Act on button click
      $button.bind('click', function () {
        if (currentApp) { // Check for available apps
          // Send analytics event.
          if (typeof _gaq !== 'undefined') {
            _gaq.push(['_trackEvent', 'install_browser_button', currentApp.n]);
          }
          switch (currentApp.n) { // Install on different browsers
            case 'Chrome':
              f.installChrome($button, currentApp);
              break;
            case 'Firefox':
            case 'Safari':
            case 'Opera':
              f.installByDownload(currentApp);
              break;
            case 'Older Opera':
              f.oldOpera(currentApp);
              break;
            case 'Internet Explorer':
              f.playWithIE(currentApp);
              break;
          }

          // Reload the page so that we can detect if the extension is installed.
          setTimeout(function () {
            window.location.reload(false);
          }, 5000);
        }
        else { // If no browser match
          alert(Drupal.t('Sorry, we don\'t have an app for your browser.'));
        }
      });
    },

    /**
     * Helper function to switch containers for App and Bookmarklet
     *
     * @param {object} context Current page context
     * @param {object} f Current Behavior methods
     */
    switchContainers: function (context, f) {
      var $app_container = $('.pin-it-app-container', context),
        $bookmarklet_container = $('.pin-it-bookmarklet-container', context),
        $switch_to_bookmarklet = $('.install-app-switch-bookmarklet', context),
        $switch_to_app = $('.add-boockmarklet-switch-install-app', context);
      if ($app_container.length && $bookmarklet_container.length) {
        $bookmarklet_container.hide();

        // Build Bookmarklet button
        f.buildBookmarklet(context, $bookmarklet_container);

        if ($switch_to_bookmarklet.length) {
          $switch_to_bookmarklet.bind('click', function () {
            $app_container.hide();
            $bookmarklet_container.show();
          });
        }

        if ($switch_to_app.length) {
          $switch_to_app.bind('click', function () {
            $bookmarklet_container.hide();
            $app_container.show();
          });
        }
      }
    },

    /**
     * Helper function to build the Bookmarklet
     *
     * @param {object} context Current page context
     * @param {object} $bookmarklet_container Bookmarklet container.
     */
    buildBookmarklet: function (context, $bookmarklet_container) {
      var $bookmarklet = $('.add-bookmarklet-button', context);

      $bookmarklet.wrapInner('<a class="pin-it-bookmarklet-links"/>');

      $bookmarklet_link = $('.pin-it-bookmarklet-links');

      $bookmarklet_link.attr('href', "javascript:void((function(d){var%20e=d.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','//assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);d.body.appendChild(e)})(document));");

      $bookmarklet_link.bind('click', function (e) {
        e.preventDefault();
        alert(Drupal.t('To install the Pin It button, drag it to your bookmarks toolbar!'));
      });

    },

    /**
     * Get App info for current browser
     *
     * @param {object} $button Install App button
     * @param {array} apps Array with apps info
     *
     * return {object, boolean} Object if match, false if no.
     */
    getBrowser: function ($button, apps) {
      var userAgent = window.navigator.userAgent; // Browser userAgent

      if (userAgent.match(/iP/) || userAgent.match(/Android/)) {
        // hide Install App button for iPhones or Android devices
        $button.hide();
        return false;
      }

      for (var i = 0; i < apps.length; i++) { // Check for matching
        if (userAgent.match(apps[i].r)) {
          return apps[i];
        }
      }

      // False if no match
      return false;
    },

    /**
     * Install app on Chrome
     *
     * @param {object} $button Install App button
     * @param {object} currentApp Object with app to be installed
     */
    installChrome: function ($button, currentApp) {
      if (typeof chrome === 'object') { // Check for chrome object
        var install = false;
        if (chrome.app) { // Check for chrome app
          if (!chrome.app.isInstalled) { // If not installed
            install = true;
          } else { // Make button gray if installed
            $button.text(Drupal.t('Already Installed'));
            $button.addClass('gray');
          }
        }
        var success = function (str) { // success callback after install
          console.log('success: ' + str);
        };
        var failure = function (str) { // error callbacl after install
          console.log('failure: ' + str);
          if (str.indexOf('User cancelled install') < 0) { // Do not open tab if user canceled install
            window.open(currentApp.u, '', '_blank'); // Open chrome install app page in new tab
          }
        };
        if (install === true) { // If app needs to be installed
          // Add app declaration to HEAD
          $('head').append('<link  rel="chrome-webstore-item" href="' + currentApp.u + '"/>');
          chrome.webstore.install(currentApp.u, success, failure); // Open app install dialog
        }
      }
      else {
        window.open(currentApp.u, '', '_blank'); // Open chrome install app page in new tab
      }
    },

    /**
     * Simple app install by triggering file download
     *
     * @param {object} currentApp Object with app to be installed
     */
    installByDownload: function (currentApp) {
      window.location.href = currentApp.u;
    },

    /**
     * Open app search page for old opera
     *
     * @param {object} currentApp Object with app to be installed
     */
    oldOpera: function (currentApp) {
      window.open(currentApp.u, '', '_blank');
    },

    /**
     * Play with IE. Download or watch youtube for IE 7 && 8 && 9
     *
     * @param {object} currentApp Object with app to be installed
     */
    playWithIE: function (currentApp) {
      var youtube = { // Links for watch youtube
          'ie8': 'http://www.youtube.com/watch/?v=jl-zKQ5na1A',
          'ie9': 'http://www.youtube.com/watch/?v=ZVNMhNe_Zok'
        },
        userAgent = window.navigator.userAgent; // Browser userAgent

      if (userAgent.match(/MSIE 7/) || userAgent.match(/MSIE 8/)) { // redirect to YouTube Video
        window.location.href = youtube.ie8;
      }
      if (userAgent.match(/MSIE 9/)) { // redirect to YouTube Video
        window.location.href = youtube.ie9;
      }
      window.location.href = currentApp.u; // Start Download if ok.
    },

    /**
     * Run extension checks.
     */
    runExtensionChecks: function (context, settings, lastCheck) {
      var f = this;
      lastCheck = typeof lastCheck !== 'undefined' ? lastCheck : Date.now();
      if (isExtensionInstalled()) {
        if (settings.installAppButton.current_node_en_path === 'browser-button') {
          // Check for the extension.
          window.location.href = settings.installAppButton.confirm_path;
        } else {
          $('browser-button-link').attr('href', settings.installAppButton.confirm_path);
        }
      } else if ((Date.now() - lastCheck) < 8000) {
        window.setTimeout(function () {
          f.runExtensionChecks(context, settings, lastCheck);
        }, 350);
      }
    }
  };

  Drupal.behaviors.addPathPrefixToLinks = {
    attach: function (context, settings) {
      // Find all internal links
      var $links = $('.section-careers #page .about-header-description, .view-id-careers.view-display-id-panel_pane_1', context)
        .find('a[href^="/"]:not(.language-link)');
      $links.each(function () {
        var href = $(this).attr('href').substring(1),
          pathPrefix = Drupal.settings.pathPrefix;
        // If link doesn't have path prefix - add one.
        if (href.indexOf(pathPrefix) < 0 && (href != pathPrefix.slice(0, -1))) {
          href = '/' + pathPrefix + href;
          $(this).attr('href', href);
        }
      });
    }
  }

  Drupal.behaviors.imageBlockCheck = {
    attach: function (context, settings) {
      if ($('.section-job-openings')) {
        $('.article-image-block').each(function (index) {
          if ($(this).find('.article-image-block-img img').length == 0) {
            $(this).addClass('no-image');
          }
        });
      }
      ;
    }
  }

  Drupal.behaviors.mobileVideoPlay = {
    attach: function (context, settings) {
      $('.node-type-landing-page .panel-video .field-name-field-image').click(function () {
        $(this).siblings('.field-name-field-youtube-video-embed').find('iframe').bind();
      })
    }
  }

}(jQuery));
;
!function(){function a(a,b){var c=a.indexOf(b);-1!=c&&a.splice(c,1)}var b={},c=b.util={},d=Array.prototype.concat,e=Array.prototype.slice;c.bind=function(a,b){var c=e.call(arguments,2);return function(){a.apply(b,d.call(c,e.call(arguments)))}},c.extend=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};var f=b.SpringSystem=function(a){this._springRegistry={},this._activeSprings=[],this.listeners=[],this._idleSpringIndices=[],this.looper=a||new j,this.looper.springSystem=this};c.extend(f.prototype,{_springRegistry:null,_isIdle:!0,_lastTimeMillis:-1,_activeSprings:null,listeners:null,_idleSpringIndices:null,setLooper:function(a){this.looper=a,a.springSystem=this},createSpring:function(a,b){var c;return c=void 0===a||void 0===b?i.DEFAULT_ORIGAMI_SPRING_CONFIG:i.fromOrigamiTensionAndFriction(a,b),this.createSpringWithConfig(c)},createSpringWithBouncinessAndSpeed:function(a,b){var c;return c=void 0===a||void 0===b?i.DEFAULT_ORIGAMI_SPRING_CONFIG:i.fromBouncinessAndSpeed(a,b),this.createSpringWithConfig(c)},createSpringWithConfig:function(a){var b=new g(this);return this.registerSpring(b),b.setSpringConfig(a),b},getIsIdle:function(){return this._isIdle},getSpringById:function(a){return this._springRegistry[a]},getAllSprings:function(){var a=[];for(var b in this._springRegistry)this._springRegistry.hasOwnProperty(b)&&a.push(this._springRegistry[b]);return a},registerSpring:function(a){this._springRegistry[a.getId()]=a},deregisterSpring:function(b){a(this._activeSprings,b),delete this._springRegistry[b.getId()]},advance:function(a,b){for(;this._idleSpringIndices.length>0;)this._idleSpringIndices.pop();for(var c=0,d=this._activeSprings.length;d>c;c++){var e=this._activeSprings[c];e.systemShouldAdvance()?e.advance(a/1e3,b/1e3):this._idleSpringIndices.push(this._activeSprings.indexOf(e))}for(;this._idleSpringIndices.length>0;){var f=this._idleSpringIndices.pop();f>=0&&this._activeSprings.splice(f,1)}},loop:function(a){var b;-1===this._lastTimeMillis&&(this._lastTimeMillis=a-1);var c=a-this._lastTimeMillis;this._lastTimeMillis=a;var d=0,e=this.listeners.length;for(d=0;e>d;d++)b=this.listeners[d],b.onBeforeIntegrate&&b.onBeforeIntegrate(this);for(this.advance(a,c),0===this._activeSprings.length&&(this._isIdle=!0,this._lastTimeMillis=-1),d=0;e>d;d++)b=this.listeners[d],b.onAfterIntegrate&&b.onAfterIntegrate(this);this._isIdle||this.looper.run()},activateSpring:function(a){var b=this._springRegistry[a];-1==this._activeSprings.indexOf(b)&&this._activeSprings.push(b),this.getIsIdle()&&(this._isIdle=!1,this.looper.run())},addListener:function(a){this.listeners.push(a)},removeListener:function(b){a(this.listeners,b)},removeAllListeners:function(){this.listeners=[]}});var g=b.Spring=function p(a){this._id="s"+p._ID++,this._springSystem=a,this.listeners=[],this._currentState=new h,this._previousState=new h,this._tempState=new h};c.extend(g,{_ID:0,MAX_DELTA_TIME_SEC:.064,SOLVER_TIMESTEP_SEC:.001}),c.extend(g.prototype,{_id:0,_springConfig:null,_overshootClampingEnabled:!1,_currentState:null,_previousState:null,_tempState:null,_startValue:0,_endValue:0,_wasAtRest:!0,_restSpeedThreshold:.001,_displacementFromRestThreshold:.001,listeners:null,_timeAccumulator:0,_springSystem:null,destroy:function(){this.listeners=[],this.frames=[],this._springSystem.deregisterSpring(this)},getId:function(){return this._id},setSpringConfig:function(a){return this._springConfig=a,this},getSpringConfig:function(){return this._springConfig},setCurrentValue:function(a,b){return this._startValue=a,this._currentState.position=a,b||this.setAtRest(),this.notifyPositionUpdated(!1,!1),this},getStartValue:function(){return this._startValue},getCurrentValue:function(){return this._currentState.position},getCurrentDisplacementDistance:function(){return this.getDisplacementDistanceForState(this._currentState)},getDisplacementDistanceForState:function(a){return Math.abs(this._endValue-a.position)},setEndValue:function(a){if(this._endValue==a&&this.isAtRest())return this;this._startValue=this.getCurrentValue(),this._endValue=a,this._springSystem.activateSpring(this.getId());for(var b=0,c=this.listeners.length;c>b;b++){var d=this.listeners[b],e=d.onSpringEndStateChange;e&&e(this)}return this},getEndValue:function(){return this._endValue},setVelocity:function(a){return a===this._currentState.velocity?this:(this._currentState.velocity=a,this._springSystem.activateSpring(this.getId()),this)},getVelocity:function(){return this._currentState.velocity},setRestSpeedThreshold:function(a){return this._restSpeedThreshold=a,this},getRestSpeedThreshold:function(){return this._restSpeedThreshold},setRestDisplacementThreshold:function(a){this._displacementFromRestThreshold=a},getRestDisplacementThreshold:function(){return this._displacementFromRestThreshold},setOvershootClampingEnabled:function(a){return this._overshootClampingEnabled=a,this},isOvershootClampingEnabled:function(){return this._overshootClampingEnabled},isOvershooting:function(){var a=this._startValue,b=this._endValue;return this._springConfig.tension>0&&(b>a&&this.getCurrentValue()>b||a>b&&this.getCurrentValue()<b)},advance:function(a,b){var c=this.isAtRest();if(!c||!this._wasAtRest){var d=b;b>g.MAX_DELTA_TIME_SEC&&(d=g.MAX_DELTA_TIME_SEC),this._timeAccumulator+=d;for(var e,f,h,i,j,k,l,m,n,o,p=this._springConfig.tension,q=this._springConfig.friction,r=this._currentState.position,s=this._currentState.velocity,t=this._tempState.position,u=this._tempState.velocity;this._timeAccumulator>=g.SOLVER_TIMESTEP_SEC;)this._timeAccumulator-=g.SOLVER_TIMESTEP_SEC,this._timeAccumulator<g.SOLVER_TIMESTEP_SEC&&(this._previousState.position=r,this._previousState.velocity=s),e=s,f=p*(this._endValue-t)-q*s,t=r+e*g.SOLVER_TIMESTEP_SEC*.5,u=s+f*g.SOLVER_TIMESTEP_SEC*.5,h=u,i=p*(this._endValue-t)-q*u,t=r+h*g.SOLVER_TIMESTEP_SEC*.5,u=s+i*g.SOLVER_TIMESTEP_SEC*.5,j=u,k=p*(this._endValue-t)-q*u,t=r+j*g.SOLVER_TIMESTEP_SEC*.5,u=s+k*g.SOLVER_TIMESTEP_SEC*.5,l=u,m=p*(this._endValue-t)-q*u,n=1/6*(e+2*(h+j)+l),o=1/6*(f+2*(i+k)+m),r+=n*g.SOLVER_TIMESTEP_SEC,s+=o*g.SOLVER_TIMESTEP_SEC;this._tempState.position=t,this._tempState.velocity=u,this._currentState.position=r,this._currentState.velocity=s,this._timeAccumulator>0&&this._interpolate(this._timeAccumulator/g.SOLVER_TIMESTEP_SEC),(this.isAtRest()||this._overshootClampingEnabled&&this.isOvershooting())&&(this._springConfig.tension>0?(this._startValue=this._endValue,this._currentState.position=this._endValue):(this._endValue=this._currentState.position,this._startValue=this._endValue),this.setVelocity(0),c=!0);var v=!1;this._wasAtRest&&(this._wasAtRest=!1,v=!0);var w=!1;c&&(this._wasAtRest=!0,w=!0),this.notifyPositionUpdated(v,w)}},notifyPositionUpdated:function(a,b){for(var c=0,d=this.listeners.length;d>c;c++){var e=this.listeners[c];a&&e.onSpringActivate&&e.onSpringActivate(this),e.onSpringUpdate&&e.onSpringUpdate(this),b&&e.onSpringAtRest&&e.onSpringAtRest(this)}},systemShouldAdvance:function(){return!this.isAtRest()||!this.wasAtRest()},wasAtRest:function(){return this._wasAtRest},isAtRest:function(){return Math.abs(this._currentState.velocity)<this._restSpeedThreshold&&(this.getDisplacementDistanceForState(this._currentState)<=this._displacementFromRestThreshold||0===this._springConfig.tension)},setAtRest:function(){return this._endValue=this._currentState.position,this._tempState.position=this._currentState.position,this._currentState.velocity=0,this},_interpolate:function(a){this._currentState.position=this._currentState.position*a+this._previousState.position*(1-a),this._currentState.velocity=this._currentState.velocity*a+this._previousState.velocity*(1-a)},getListeners:function(){return this.listeners},addListener:function(a){return this.listeners.push(a),this},removeListener:function(b){return a(this.listeners,b),this},removeAllListeners:function(){return this.listeners=[],this},currentValueIsApproximately:function(a){return Math.abs(this.getCurrentValue()-a)<=this.getRestDisplacementThreshold()}});var h=function(){};c.extend(h.prototype,{position:0,velocity:0});var i=b.SpringConfig=function(a,b){this.tension=a,this.friction=b},j=b.AnimationLooper=function(){this.springSystem=null;var a=this,b=function(){a.springSystem.loop(Date.now())};this.run=function(){c.onFrame(b)}};b.SimulationLooper=function(a){this.springSystem=null;var b=0,c=!1;a=a||16.667,this.run=function(){if(!c){for(c=!0;!this.springSystem.getIsIdle();)this.springSystem.loop(b+=a);c=!1}}},b.SteppingSimulationLooper=function(){this.springSystem=null;var a=0;this.run=function(){},this.step=function(b){this.springSystem.loop(a+=b)}};var k=b.OrigamiValueConverter={tensionFromOrigamiValue:function(a){return 3.62*(a-30)+194},origamiValueFromTension:function(a){return(a-194)/3.62+30},frictionFromOrigamiValue:function(a){return 3*(a-8)+25},origamiFromFriction:function(a){return(a-25)/3+8}},l=b.BouncyConversion=function(a,b){this.bounciness=a,this.speed=b;var c=this.normalize(a/1.7,0,20);c=this.projectNormal(c,0,.8);var d=this.normalize(b/1.7,0,20);this.bouncyTension=this.projectNormal(d,.5,200),this.bouncyFriction=this.quadraticOutInterpolation(c,this.b3Nobounce(this.bouncyTension),.01)};c.extend(l.prototype,{normalize:function(a,b,c){return(a-b)/(c-b)},projectNormal:function(a,b,c){return b+a*(c-b)},linearInterpolation:function(a,b,c){return a*c+(1-a)*b},quadraticOutInterpolation:function(a,b,c){return this.linearInterpolation(2*a-a*a,b,c)},b3Friction1:function(a){return 7e-4*Math.pow(a,3)-.031*Math.pow(a,2)+.64*a+1.28},b3Friction2:function(a){return 44e-6*Math.pow(a,3)-.006*Math.pow(a,2)+.36*a+2},b3Friction3:function(a){return 4.5e-7*Math.pow(a,3)-332e-6*Math.pow(a,2)+.1078*a+5.84},b3Nobounce:function(a){var b=0;return b=18>=a?this.b3Friction1(a):a>18&&44>=a?this.b3Friction2(a):this.b3Friction3(a)}}),c.extend(i,{fromOrigamiTensionAndFriction:function(a,b){return new i(k.tensionFromOrigamiValue(a),k.frictionFromOrigamiValue(b))},fromBouncinessAndSpeed:function(a,c){var d=new b.BouncyConversion(a,c);return this.fromOrigamiTensionAndFriction(d.bouncyTension,d.bouncyFriction)},coastingConfigWithOrigamiFriction:function(a){return new i(0,k.frictionFromOrigamiValue(a))}}),i.DEFAULT_ORIGAMI_SPRING_CONFIG=i.fromOrigamiTensionAndFriction(40,7),c.extend(i.prototype,{friction:0,tension:0});var m={};c.hexToRGB=function(a){if(m[a])return m[a];a=a.replace("#",""),3===a.length&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]);var b=a.match(/.{2}/g),c={r:parseInt(b[0],16),g:parseInt(b[1],16),b:parseInt(b[2],16)};return m[a]=c,c},c.rgbToHex=function(a,b,c){return a=a.toString(16),b=b.toString(16),c=c.toString(16),a=a.length<2?"0"+a:a,b=b.length<2?"0"+b:b,c=c.length<2?"0"+c:c,"#"+a+b+c};var n=b.MathUtil={mapValueInRange:function(a,b,c,d,e){var f=c-b,g=e-d,h=(a-b)/f;return d+h*g},interpolateColor:function(a,b,d,e,f,g){e=void 0===e?0:e,f=void 0===f?1:f,b=c.hexToRGB(b),d=c.hexToRGB(d);var h=Math.floor(c.mapValueInRange(a,e,f,b.r,d.r)),i=Math.floor(c.mapValueInRange(a,e,f,b.g,d.g)),j=Math.floor(c.mapValueInRange(a,e,f,b.b,d.b));return g?"rgb("+h+","+i+","+j+")":c.rgbToHex(h,i,j)},degreesToRadians:function(a){return a*Math.PI/180},radiansToDegrees:function(a){return 180*a/Math.PI}};c.extend(c,n);var o;"undefined"!=typeof window&&(o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}),o||"undefined"==typeof process||"node"!==process.title||(o=setImmediate),c.onFrame=function(a){return o(a)},"undefined"!=typeof exports?c.extend(exports,b):"undefined"!=typeof window&&(window.rebound=b)}();
;
(function ($) {

/**
 * Toggle content container height
 * @param {HTMLElement} el - The DOM element.
 * @param {{
 *   expandedClass: string,
 *   height: number,
 *   maxHeight: number
 * }} options - The options.
 */
function ToggleNav(el, options) {
  this.el = $(el);

  // Option processing.
  var options = $.extend({}, ToggleNav.DEFAULTS, options, this.el.data());
  this.expandedClass = options.expandedClass;
  this.navEl = options.nav ? $(options.nav) :
    this.el.attr('href') ? $(this.el.attr('href')) :
      this.el.next();
  this.headerEl = this._findHeader(options.header);
  this.direction = options.direction ||
    (this.headerEl.css('bottom') === 'auto' ? 'down' : 'up');
  this.transitionDuration = parseInt(options.transitionDuration, 10);
  this.transitionEasing = options.transitionEasing;

  // Instance variables.
  this.isExpanded = false;

  this.init();
}

/**
 * Find the specified header containing the nav.
 * @private
 */
ToggleNav.prototype._findHeader = function(headerSel, nav) {
  // If provided in options, use that.
  if (headerSel) {
    return $(headerSel);
  }
  // Otherwise find the closest fixed position parent.
  var parents = this.el.parents();
  for (var i = 0, el; (el = parents.eq(i)).length; i++) {
    if (el.css('position') === 'fixed') {
      return el;
    }
  }

  // Um?
  return this.el.parent();
};

/**
 * ToggleNav Default Settings
 */
ToggleNav.DEFAULTS = {
  direction: null,
  expandedClass: 'is-open',
  header: null,
  transitionDuration: 300,
  transitionEasing: 'ease',
  nav: null
};

/**
 * Initialize ToggleNav
 */
ToggleNav.prototype.init = function() {
  this.el.on('click.aranja.togglenav', this.handleToggle.bind(this));
};

/**
 * Collapse navigation
 */
ToggleNav.prototype.collapse = function() {
  this.isExpanded = false;

  // Enable page scrolling
  $(document.body).css('overflow', '');
  $(document).off('touchmove.aranja.togglenav');

  this.headerEl.removeClass(this.expandedClass);

  if (this.direction === 'down') {
    this.navEl.transition({y: 0}, this.transitionDuration, this.transitionEasing);
  } else {
    this.headerEl.transition({y: 0}, this.transitionDuration, this.transitionEasing);
  }

  this.el.trigger('navcollapse');
};

/**
 * Expand navigation
 */
ToggleNav.prototype.expand = function() {
  this.isExpanded = true;

  // Disable page scrolling to not interfere with scroll-to-collapse plugin.
  $(document.body).css('overflow', 'hidden');
  $(document).on('touchmove.aranja.togglenav', function(e){ e.preventDefault(); });

  // Any other expand styles and animations.
  this.headerEl.addClass(this.expandedClass);

  if (this.direction === 'down') {
    this.navEl.transition({y: this.navEl.height()}, this.transitionDuration, this.transitionEasing);
  } else {
    this.headerEl.transition({y: -this.navEl.height()}, this.transitionDuration, this.transitionEasing);
  }

  this.el.trigger('navexpand');
};

/**
 * Handle Toggle Event
 */
ToggleNav.prototype.handleToggle = function(event) {
  event.preventDefault();

  if (this.isExpanded) {
    this.collapse();
  } else {
    this.expand();
  }
};

/**
 * jQuery plugin
 */
$.fn.toggleNav = function(options) {
  return this.each(function() {
    var el = $(this);
    var data = el.data('pinterest.togglenav');
    var opts = typeof options === 'object' && options;

    if (!data) { el.data('pinterest.togglenav', (data = new ToggleNav(el, opts))); }
    if (typeof options == 'string') { data[options](); }
  });
};


/**
 * Data API
 */
$(function() {
  $('[data-toggle-nav]').toggleNav();
});

}(jQuery));

;
/*! Video.js v4.6.4 Copyright 2014 Brightcove, Inc. https://github.com/videojs/video.js/blob/master/LICENSE */ 
(function() {var b=void 0,f=!0,j=null,l=!1;function m(){return function(){}}function q(a){return function(){return this[a]}}function r(a){return function(){return a}}var t;document.createElement("video");document.createElement("audio");document.createElement("track");function u(a,c,d){if("string"===typeof a){0===a.indexOf("#")&&(a=a.slice(1));if(u.Aa[a])return u.Aa[a];a=u.w(a)}if(!a||!a.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");return a.player||new u.Player(a,c,d)}
var videojs=u;window.je=window.ke=u;u.Ub="4.6";u.Pc="https:"==document.location.protocol?"https://":"http://";u.options={techOrder:["html5","flash"],html5:{},flash:{},width:300,height:150,defaultVolume:0,playbackRates:[],children:{mediaLoader:{},posterImage:{},textTrackDisplay:{},loadingSpinner:{},bigPlayButton:{},controlBar:{},errorDisplay:{}},notSupportedMessage:"No compatible source was found for this video."};"GENERATED_CDN_VSN"!==u.Ub&&(videojs.options.flash.swf=u.Pc+"vjs.zencdn.net/"+u.Ub+"/video-js.swf");
u.Aa={};"function"===typeof define&&define.amd?define([],function(){return videojs}):"object"===typeof exports&&"object"===typeof module&&(module.exports=videojs);u.pa=u.CoreObject=m();u.pa.extend=function(a){var c,d;a=a||{};c=a.init||a.h||this.prototype.init||this.prototype.h||m();d=function(){c.apply(this,arguments)};d.prototype=u.l.create(this.prototype);d.prototype.constructor=d;d.extend=u.pa.extend;d.create=u.pa.create;for(var e in a)a.hasOwnProperty(e)&&(d.prototype[e]=a[e]);return d};
u.pa.create=function(){var a=u.l.create(this.prototype);this.apply(a,arguments);return a};u.d=function(a,c,d){var e=u.getData(a);e.D||(e.D={});e.D[c]||(e.D[c]=[]);d.v||(d.v=u.v++);e.D[c].push(d);e.X||(e.disabled=l,e.X=function(c){if(!e.disabled){c=u.oc(c);var d=e.D[c.type];if(d)for(var d=d.slice(0),k=0,p=d.length;k<p&&!c.wc();k++)d[k].call(a,c)}});1==e.D[c].length&&(document.addEventListener?a.addEventListener(c,e.X,l):document.attachEvent&&a.attachEvent("on"+c,e.X))};
u.p=function(a,c,d){if(u.sc(a)){var e=u.getData(a);if(e.D)if(c){var g=e.D[c];if(g){if(d){if(d.v)for(e=0;e<g.length;e++)g[e].v===d.v&&g.splice(e--,1)}else e.D[c]=[];u.jc(a,c)}}else for(g in e.D)c=g,e.D[c]=[],u.jc(a,c)}};u.jc=function(a,c){var d=u.getData(a);0===d.D[c].length&&(delete d.D[c],document.removeEventListener?a.removeEventListener(c,d.X,l):document.detachEvent&&a.detachEvent("on"+c,d.X));u.Eb(d.D)&&(delete d.D,delete d.X,delete d.disabled);u.Eb(d)&&u.Dc(a)};
u.oc=function(a){function c(){return f}function d(){return l}if(!a||!a.Fb){var e=a||window.event;a={};for(var g in e)"layerX"!==g&&("layerY"!==g&&"keyboardEvent.keyLocation"!==g)&&("returnValue"==g&&e.preventDefault||(a[g]=e[g]));a.target||(a.target=a.srcElement||document);a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;a.preventDefault=function(){e.preventDefault&&e.preventDefault();a.returnValue=l;a.rd=c;a.defaultPrevented=f};a.rd=d;a.defaultPrevented=l;a.stopPropagation=function(){e.stopPropagation&&
e.stopPropagation();a.cancelBubble=f;a.Fb=c};a.Fb=d;a.stopImmediatePropagation=function(){e.stopImmediatePropagation&&e.stopImmediatePropagation();a.wc=c;a.stopPropagation()};a.wc=d;if(a.clientX!=j){g=document.documentElement;var h=document.body;a.pageX=a.clientX+(g&&g.scrollLeft||h&&h.scrollLeft||0)-(g&&g.clientLeft||h&&h.clientLeft||0);a.pageY=a.clientY+(g&&g.scrollTop||h&&h.scrollTop||0)-(g&&g.clientTop||h&&h.clientTop||0)}a.which=a.charCode||a.keyCode;a.button!=j&&(a.button=a.button&1?0:a.button&
4?1:a.button&2?2:0)}return a};u.k=function(a,c){var d=u.sc(a)?u.getData(a):{},e=a.parentNode||a.ownerDocument;"string"===typeof c&&(c={type:c,target:a});c=u.oc(c);d.X&&d.X.call(a,c);if(e&&!c.Fb()&&c.bubbles!==l)u.k(e,c);else if(!e&&!c.defaultPrevented&&(d=u.getData(c.target),c.target[c.type])){d.disabled=f;if("function"===typeof c.target[c.type])c.target[c.type]();d.disabled=l}return!c.defaultPrevented};
u.W=function(a,c,d){function e(){u.p(a,c,e);d.apply(this,arguments)}e.v=d.v=d.v||u.v++;u.d(a,c,e)};var v=Object.prototype.hasOwnProperty;u.e=function(a,c){var d,e;d=document.createElement(a||"div");for(e in c)v.call(c,e)&&(-1!==e.indexOf("aria-")||"role"==e?d.setAttribute(e,c[e]):d[e]=c[e]);return d};u.$=function(a){return a.charAt(0).toUpperCase()+a.slice(1)};u.l={};u.l.create=Object.create||function(a){function c(){}c.prototype=a;return new c};
u.l.wa=function(a,c,d){for(var e in a)v.call(a,e)&&c.call(d||this,e,a[e])};u.l.B=function(a,c){if(!c)return a;for(var d in c)v.call(c,d)&&(a[d]=c[d]);return a};u.l.fd=function(a,c){var d,e,g;a=u.l.copy(a);for(d in c)v.call(c,d)&&(e=a[d],g=c[d],a[d]=u.l.Sa(e)&&u.l.Sa(g)?u.l.fd(e,g):c[d]);return a};u.l.copy=function(a){return u.l.B({},a)};u.l.Sa=function(a){return!!a&&"object"===typeof a&&"[object Object]"===a.toString()&&a.constructor===Object};
u.bind=function(a,c,d){function e(){return c.apply(a,arguments)}c.v||(c.v=u.v++);e.v=d?d+"_"+c.v:c.v;return e};u.ta={};u.v=1;u.expando="vdata"+(new Date).getTime();u.getData=function(a){var c=a[u.expando];c||(c=a[u.expando]=u.v++,u.ta[c]={});return u.ta[c]};u.sc=function(a){a=a[u.expando];return!(!a||u.Eb(u.ta[a]))};u.Dc=function(a){var c=a[u.expando];if(c){delete u.ta[c];try{delete a[u.expando]}catch(d){a.removeAttribute?a.removeAttribute(u.expando):a[u.expando]=j}}};
u.Eb=function(a){for(var c in a)if(a[c]!==j)return l;return f};u.o=function(a,c){-1==(" "+a.className+" ").indexOf(" "+c+" ")&&(a.className=""===a.className?c:a.className+" "+c)};u.r=function(a,c){var d,e;if(-1!=a.className.indexOf(c)){d=a.className.split(" ");for(e=d.length-1;0<=e;e--)d[e]===c&&d.splice(e,1);a.className=d.join(" ")}};u.A=u.e("video");u.M=navigator.userAgent;u.Uc=/iPhone/i.test(u.M);u.Tc=/iPad/i.test(u.M);u.Vc=/iPod/i.test(u.M);u.Sc=u.Uc||u.Tc||u.Vc;var aa=u,w;var x=u.M.match(/OS (\d+)_/i);
w=x&&x[1]?x[1]:b;aa.Zd=w;u.Rc=/Android/i.test(u.M);var ba=u,y;var z=u.M.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),A,B;z?(A=z[1]&&parseFloat(z[1]),B=z[2]&&parseFloat(z[2]),y=A&&B?parseFloat(z[1]+"."+z[2]):A?A:j):y=j;ba.Tb=y;u.Wc=u.Rc&&/webkit/i.test(u.M)&&2.3>u.Tb;u.Xb=/Firefox/i.test(u.M);u.$d=/Chrome/i.test(u.M);u.ec=!!("ontouchstart"in window||window.Qc&&document instanceof window.Qc);
u.Bb=function(a){var c,d,e,g;c={};if(a&&a.attributes&&0<a.attributes.length){d=a.attributes;for(var h=d.length-1;0<=h;h--){e=d[h].name;g=d[h].value;if("boolean"===typeof a[e]||-1!==",autoplay,controls,loop,muted,default,".indexOf(","+e+","))g=g!==j?f:l;c[e]=g}}return c};
u.ce=function(a,c){var d="";document.defaultView&&document.defaultView.getComputedStyle?d=document.defaultView.getComputedStyle(a,"").getPropertyValue(c):a.currentStyle&&(d=a["client"+c.substr(0,1).toUpperCase()+c.substr(1)]+"px");return d};u.Db=function(a,c){c.firstChild?c.insertBefore(a,c.firstChild):c.appendChild(a)};u.Na={};u.w=function(a){0===a.indexOf("#")&&(a=a.slice(1));return document.getElementById(a)};
u.ya=function(a,c){c=c||a;var d=Math.floor(a%60),e=Math.floor(a/60%60),g=Math.floor(a/3600),h=Math.floor(c/60%60),k=Math.floor(c/3600);if(isNaN(a)||Infinity===a)g=e=d="-";g=0<g||0<k?g+":":"";return g+(((g||10<=h)&&10>e?"0"+e:e)+":")+(10>d?"0"+d:d)};u.bd=function(){document.body.focus();document.onselectstart=r(l)};u.Td=function(){document.onselectstart=r(f)};u.trim=function(a){return(a+"").replace(/^\s+|\s+$/g,"")};u.round=function(a,c){c||(c=0);return Math.round(a*Math.pow(10,c))/Math.pow(10,c)};
u.yb=function(a,c){return{length:1,start:function(){return a},end:function(){return c}}};
u.get=function(a,c,d,e){var g,h,k,p;d=d||m();"undefined"===typeof XMLHttpRequest&&(window.XMLHttpRequest=function(){try{return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(c){}try{return new window.ActiveXObject("Msxml2.XMLHTTP")}catch(d){}throw Error("This browser does not support XMLHttpRequest.");});h=new XMLHttpRequest;k=u.Fd(a);p=window.location;k.protocol+k.host!==p.protocol+p.host&&window.XDomainRequest&&!("withCredentials"in
h)?(h=new window.XDomainRequest,h.onload=function(){c(h.responseText)},h.onerror=d,h.onprogress=m(),h.ontimeout=d):(g="file:"==k.protocol||"file:"==p.protocol,h.onreadystatechange=function(){4===h.readyState&&(200===h.status||g&&0===h.status?c(h.responseText):d(h.responseText))});try{h.open("GET",a,f),e&&(h.withCredentials=f)}catch(n){d(n);return}try{h.send()}catch(s){d(s)}};
u.Kd=function(a){try{var c=window.localStorage||l;c&&(c.volume=a)}catch(d){22==d.code||1014==d.code?u.log("LocalStorage Full (VideoJS)",d):18==d.code?u.log("LocalStorage not allowed (VideoJS)",d):u.log("LocalStorage Error (VideoJS)",d)}};u.qc=function(a){a.match(/^https?:\/\//)||(a=u.e("div",{innerHTML:'<a href="'+a+'">x</a>'}).firstChild.href);return a};
u.Fd=function(a){var c,d,e,g;g="protocol hostname port pathname search hash host".split(" ");d=u.e("a",{href:a});if(e=""===d.host&&"file:"!==d.protocol)c=u.e("div"),c.innerHTML='<a href="'+a+'"></a>',d=c.firstChild,c.setAttribute("style","display:none; position:absolute;"),document.body.appendChild(c);a={};for(var h=0;h<g.length;h++)a[g[h]]=d[g[h]];e&&document.body.removeChild(c);return a};function D(){}var E=window.console||{log:D,warn:D,error:D};
function F(a,c){var d=Array.prototype.slice.call(c);a?d.unshift(a.toUpperCase()+":"):a="log";u.log.history.push(d);d.unshift("VIDEOJS:");if(E[a].apply)E[a].apply(E,d);else E[a](d.join(" "))}u.log=function(){F(j,arguments)};u.log.history=[];u.log.error=function(){F("error",arguments)};u.log.warn=function(){F("warn",arguments)};
u.od=function(a){var c,d;a.getBoundingClientRect&&a.parentNode&&(c=a.getBoundingClientRect());if(!c)return{left:0,top:0};a=document.documentElement;d=document.body;return{left:u.round(c.left+(window.pageXOffset||d.scrollLeft)-(a.clientLeft||d.clientLeft||0)),top:u.round(c.top+(window.pageYOffset||d.scrollTop)-(a.clientTop||d.clientTop||0))}};u.oa={};u.oa.Jb=function(a,c){var d,e,g;a=u.l.copy(a);for(d in c)c.hasOwnProperty(d)&&(e=a[d],g=c[d],a[d]=u.l.Sa(e)&&u.l.Sa(g)?u.oa.Jb(e,g):c[d]);return a};
u.a=u.pa.extend({h:function(a,c,d){this.c=a;this.j=u.l.copy(this.j);c=this.options(c);this.T=c.id||(c.el&&c.el.id?c.el.id:a.id()+"_component_"+u.v++);this.wd=c.name||j;this.b=c.el||this.e();this.N=[];this.Oa={};this.Pa={};this.uc();this.J(d);if(c.Ec!==l){var e,g;e=u.bind(this.m(),this.m().reportUserActivity);this.d("touchstart",function(){e();clearInterval(g);g=setInterval(e,250)});a=function(){e();clearInterval(g)};this.d("touchmove",e);this.d("touchend",a);this.d("touchcancel",a)}}});t=u.a.prototype;
t.dispose=function(){this.k({type:"dispose",bubbles:l});if(this.N)for(var a=this.N.length-1;0<=a;a--)this.N[a].dispose&&this.N[a].dispose();this.Pa=this.Oa=this.N=j;this.p();this.b.parentNode&&this.b.parentNode.removeChild(this.b);u.Dc(this.b);this.b=j};t.c=f;t.m=q("c");t.options=function(a){return a===b?this.j:this.j=u.oa.Jb(this.j,a)};t.e=function(a,c){return u.e(a,c)};t.w=q("b");t.ia=function(){return this.u||this.b};t.id=q("T");t.name=q("wd");t.children=q("N");t.qd=function(a){return this.Oa[a]};
t.ja=function(a){return this.Pa[a]};t.V=function(a,c){var d,e;"string"===typeof a?(e=a,c=c||{},d=c.componentClass||u.$(e),c.name=e,d=new window.videojs[d](this.c||this,c)):d=a;this.N.push(d);"function"===typeof d.id&&(this.Oa[d.id()]=d);(e=e||d.name&&d.name())&&(this.Pa[e]=d);"function"===typeof d.el&&d.el()&&this.ia().appendChild(d.el());return d};
t.removeChild=function(a){"string"===typeof a&&(a=this.ja(a));if(a&&this.N){for(var c=l,d=this.N.length-1;0<=d;d--)if(this.N[d]===a){c=f;this.N.splice(d,1);break}c&&(this.Oa[a.id]=j,this.Pa[a.name]=j,(c=a.w())&&c.parentNode===this.ia()&&this.ia().removeChild(a.w()))}};t.uc=function(){var a,c,d,e;a=this;if(c=this.options().children)if(c instanceof Array)for(var g=0;g<c.length;g++)d=c[g],"string"==typeof d?(e=d,d={}):e=d.name,a[e]=a.V(e,d);else u.l.wa(c,function(c,d){d!==l&&(a[c]=a.V(c,d))})};t.S=r("");
t.d=function(a,c){u.d(this.b,a,u.bind(this,c));return this};t.p=function(a,c){u.p(this.b,a,c);return this};t.W=function(a,c){u.W(this.b,a,u.bind(this,c));return this};t.k=function(a,c){u.k(this.b,a,c);return this};t.J=function(a){a&&(this.ca?a.call(this):(this.Za===b&&(this.Za=[]),this.Za.push(a)));return this};t.Ea=function(){this.ca=f;var a=this.Za;if(a&&0<a.length){for(var c=0,d=a.length;c<d;c++)a[c].call(this);this.Za=[];this.k("ready")}};t.o=function(a){u.o(this.b,a);return this};
t.r=function(a){u.r(this.b,a);return this};t.show=function(){this.b.style.display="block";return this};t.G=function(){this.b.style.display="none";return this};function G(a){a.r("vjs-lock-showing")}t.disable=function(){this.G();this.show=m()};t.width=function(a,c){return H(this,"width",a,c)};t.height=function(a,c){return H(this,"height",a,c)};t.jd=function(a,c){return this.width(a,f).height(c)};
function H(a,c,d,e){if(d!==b)return a.b.style[c]=-1!==(""+d).indexOf("%")||-1!==(""+d).indexOf("px")?d:"auto"===d?"":d+"px",e||a.k("resize"),a;if(!a.b)return 0;d=a.b.style[c];e=d.indexOf("px");return-1!==e?parseInt(d.slice(0,e),10):parseInt(a.b["offset"+u.$(c)],10)}
function I(a){var c,d,e,g,h,k,p,n;c=0;d=j;a.d("touchstart",function(a){1===a.touches.length&&(d=a.touches[0],c=(new Date).getTime(),g=f)});a.d("touchmove",function(a){1<a.touches.length?g=l:d&&(k=a.touches[0].pageX-d.pageX,p=a.touches[0].pageY-d.pageY,n=Math.sqrt(k*k+p*p),22<n&&(g=l))});h=function(){g=l};a.d("touchleave",h);a.d("touchcancel",h);a.d("touchend",function(a){d=j;g===f&&(e=(new Date).getTime()-c,250>e&&(a.preventDefault(),this.k("tap")))})}
u.s=u.a.extend({h:function(a,c){u.a.call(this,a,c);I(this);this.d("tap",this.q);this.d("click",this.q);this.d("focus",this.Va);this.d("blur",this.Ua)}});t=u.s.prototype;
t.e=function(a,c){var d;c=u.l.B({className:this.S(),role:"button","aria-live":"polite",tabIndex:0},c);d=u.a.prototype.e.call(this,a,c);c.innerHTML||(this.u=u.e("div",{className:"vjs-control-content"}),this.wb=u.e("span",{className:"vjs-control-text",innerHTML:this.sa||"Need Text"}),this.u.appendChild(this.wb),d.appendChild(this.u));return d};t.S=function(){return"vjs-control "+u.a.prototype.S.call(this)};t.q=m();t.Va=function(){u.d(document,"keyup",u.bind(this,this.da))};
t.da=function(a){if(32==a.which||13==a.which)a.preventDefault(),this.q()};t.Ua=function(){u.p(document,"keyup",u.bind(this,this.da))};u.Q=u.a.extend({h:function(a,c){u.a.call(this,a,c);this.ad=this.ja(this.j.barName);this.handle=this.ja(this.j.handleName);this.d("mousedown",this.Wa);this.d("touchstart",this.Wa);this.d("focus",this.Va);this.d("blur",this.Ua);this.d("click",this.q);this.c.d("controlsvisible",u.bind(this,this.update));a.d(this.Ac,u.bind(this,this.update));this.R={}}});t=u.Q.prototype;
t.e=function(a,c){c=c||{};c.className+=" vjs-slider";c=u.l.B({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},c);return u.a.prototype.e.call(this,a,c)};t.Wa=function(a){a.preventDefault();u.bd();this.R.move=u.bind(this,this.Kb);this.R.end=u.bind(this,this.Lb);u.d(document,"mousemove",this.R.move);u.d(document,"mouseup",this.R.end);u.d(document,"touchmove",this.R.move);u.d(document,"touchend",this.R.end);this.Kb(a)};
t.Lb=function(){u.Td();u.p(document,"mousemove",this.R.move,l);u.p(document,"mouseup",this.R.end,l);u.p(document,"touchmove",this.R.move,l);u.p(document,"touchend",this.R.end,l);this.update()};t.update=function(){if(this.b){var a,c=this.Cb(),d=this.handle,e=this.ad;isNaN(c)&&(c=0);a=c;if(d){a=this.b.offsetWidth;var g=d.w().offsetWidth;a=g?g/a:0;c*=1-a;a=c+a/2;d.w().style.left=u.round(100*c,2)+"%"}e.w().style.width=u.round(100*a,2)+"%"}};
function J(a,c){var d,e,g,h;d=a.b;e=u.od(d);h=g=d.offsetWidth;d=a.handle;if(a.j.Vd)return h=e.top,e=c.changedTouches?c.changedTouches[0].pageY:c.pageY,d&&(d=d.w().offsetHeight,h+=d/2,g-=d),Math.max(0,Math.min(1,(h-e+g)/g));g=e.left;e=c.changedTouches?c.changedTouches[0].pageX:c.pageX;d&&(d=d.w().offsetWidth,g+=d/2,h-=d);return Math.max(0,Math.min(1,(e-g)/h))}t.Va=function(){u.d(document,"keyup",u.bind(this,this.da))};
t.da=function(a){37==a.which?(a.preventDefault(),this.Gc()):39==a.which&&(a.preventDefault(),this.Hc())};t.Ua=function(){u.p(document,"keyup",u.bind(this,this.da))};t.q=function(a){a.stopImmediatePropagation();a.preventDefault()};u.Y=u.a.extend();u.Y.prototype.defaultValue=0;u.Y.prototype.e=function(a,c){c=c||{};c.className+=" vjs-slider-handle";c=u.l.B({innerHTML:'<span class="vjs-control-text">'+this.defaultValue+"</span>"},c);return u.a.prototype.e.call(this,"div",c)};u.ga=u.a.extend();
function ca(a,c){a.V(c);c.d("click",u.bind(a,function(){G(this)}))}u.ga.prototype.e=function(){var a=this.options().kc||"ul";this.u=u.e(a,{className:"vjs-menu-content"});a=u.a.prototype.e.call(this,"div",{append:this.u,className:"vjs-menu"});a.appendChild(this.u);u.d(a,"click",function(a){a.preventDefault();a.stopImmediatePropagation()});return a};u.I=u.s.extend({h:function(a,c){u.s.call(this,a,c);this.selected(c.selected)}});
u.I.prototype.e=function(a,c){return u.s.prototype.e.call(this,"li",u.l.B({className:"vjs-menu-item",innerHTML:this.j.label},c))};u.I.prototype.q=function(){this.selected(f)};u.I.prototype.selected=function(a){a?(this.o("vjs-selected"),this.b.setAttribute("aria-selected",f)):(this.r("vjs-selected"),this.b.setAttribute("aria-selected",l))};
u.L=u.s.extend({h:function(a,c){u.s.call(this,a,c);this.za=this.va();this.V(this.za);this.O&&0===this.O.length&&this.G();this.d("keyup",this.da);this.b.setAttribute("aria-haspopup",f);this.b.setAttribute("role","button")}});t=u.L.prototype;t.ra=l;t.va=function(){var a=new u.ga(this.c);this.options().title&&a.ia().appendChild(u.e("li",{className:"vjs-menu-title",innerHTML:u.$(this.options().title),Rd:-1}));if(this.O=this.createItems())for(var c=0;c<this.O.length;c++)ca(a,this.O[c]);return a};
t.ua=m();t.S=function(){return this.className+" vjs-menu-button "+u.s.prototype.S.call(this)};t.Va=m();t.Ua=m();t.q=function(){this.W("mouseout",u.bind(this,function(){G(this.za);this.b.blur()}));this.ra?K(this):L(this)};t.da=function(a){a.preventDefault();32==a.which||13==a.which?this.ra?K(this):L(this):27==a.which&&this.ra&&K(this)};function L(a){a.ra=f;a.za.o("vjs-lock-showing");a.b.setAttribute("aria-pressed",f);a.O&&0<a.O.length&&a.O[0].w().focus()}
function K(a){a.ra=l;G(a.za);a.b.setAttribute("aria-pressed",l)}u.F=function(a){"number"===typeof a?this.code=a:"string"===typeof a?this.message=a:"object"===typeof a&&u.l.B(this,a);this.message||(this.message=u.F.gd[this.code]||"")};u.F.prototype.code=0;u.F.prototype.message="";u.F.prototype.status=j;u.F.Ra="MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" ");
u.F.gd={1:"You aborted the video playback",2:"A network error caused the video download to fail part-way.",3:"The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",4:"The video could not be loaded, either because the server or network failed or because the format is not supported.",5:"The video is encrypted and we do not have the keys to decrypt it."};for(var M=0;M<u.F.Ra.length;M++)u.F[u.F.Ra[M]]=M,u.F.prototype[u.F.Ra[M]]=M;
var N,O,P,Q;
N=["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "),"webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "),"webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "),"mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "),"msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")];
O=N[0];for(Q=0;Q<N.length;Q++)if(N[Q][1]in document){P=N[Q];break}if(P){u.Na.Ab={};for(Q=0;Q<P.length;Q++)u.Na.Ab[O[Q]]=P[Q]}
u.Player=u.a.extend({h:function(a,c,d){this.P=a;a.id=a.id||"vjs_video_"+u.v++;c=u.l.B(da(a),c);this.z={};this.Bc=c.poster;this.xb=c.controls;a.controls=l;c.Ec=l;u.a.call(this,this,c,d);this.controls()?this.o("vjs-controls-enabled"):this.o("vjs-controls-disabled");u.Aa[this.T]=this;c.plugins&&u.l.wa(c.plugins,function(a,c){this[a](c)},this);var e,g,h,k,p,n;e=u.bind(this,this.reportUserActivity);this.d("mousedown",function(){e();clearInterval(g);g=setInterval(e,250)});this.d("mousemove",function(a){if(a.screenX!=
p||a.screenY!=n)p=a.screenX,n=a.screenY,e()});this.d("mouseup",function(){e();clearInterval(g)});this.d("keydown",e);this.d("keyup",e);h=setInterval(u.bind(this,function(){this.na&&(this.na=l,this.userActive(f),clearTimeout(k),k=setTimeout(u.bind(this,function(){this.na||this.userActive(l)}),2E3))}),250);this.d("dispose",function(){clearInterval(h);clearTimeout(k)})}});t=u.Player.prototype;t.j=u.options;
t.dispose=function(){this.k("dispose");this.p("dispose");u.Aa[this.T]=j;this.P&&this.P.player&&(this.P.player=j);this.b&&this.b.player&&(this.b.player=j);clearInterval(this.Ya);this.Ba();this.g&&this.g.dispose();u.a.prototype.dispose.call(this)};function da(a){var c={sources:[],tracks:[]};u.l.B(c,u.Bb(a));if(a.hasChildNodes()){var d,e,g,h;a=a.childNodes;g=0;for(h=a.length;g<h;g++)d=a[g],e=d.nodeName.toLowerCase(),"source"===e?c.sources.push(u.Bb(d)):"track"===e&&c.tracks.push(u.Bb(d))}return c}
t.e=function(){var a=this.b=u.a.prototype.e.call(this,"div"),c=this.P;c.removeAttribute("width");c.removeAttribute("height");if(c.hasChildNodes()){var d,e,g,h,k;d=c.childNodes;e=d.length;for(k=[];e--;)g=d[e],h=g.nodeName.toLowerCase(),"track"===h&&k.push(g);for(d=0;d<k.length;d++)c.removeChild(k[d])}a.id=c.id;a.className=c.className;c.id+="_html5_api";c.className="vjs-tech";c.player=a.player=this;this.o("vjs-paused");this.width(this.j.width,f);this.height(this.j.height,f);c.parentNode&&c.parentNode.insertBefore(a,
c);u.Db(c,a);this.b=a;this.d("loadstart",this.Bd);this.d("ended",this.xd);this.d("play",this.Nb);this.d("firstplay",this.zd);this.d("pause",this.Mb);this.d("progress",this.Cd);this.d("durationchange",this.yc);this.d("fullscreenchange",this.Ad);return a};
function R(a,c,d){a.g&&(a.ca=l,a.g.dispose(),a.Hb&&(a.Hb=l,clearInterval(a.Ya)),a.Ib&&S(a),a.g=l);"Html5"!==c&&a.P&&(u.f.mc(a.P),a.P=j);a.Ca=c;a.ca=l;var e=u.l.B({source:d,parentEl:a.b},a.j[c.toLowerCase()]);d&&(d.src==a.z.src&&0<a.z.currentTime&&(e.startTime=a.z.currentTime),a.z.src=d.src);a.g=new window.videojs[c](a,e);a.g.J(function(){this.c.Ea();if(!this.n.progressEvents){var a=this.c;a.Hb=f;a.Ya=setInterval(u.bind(a,function(){this.z.sb<this.buffered().end(0)?this.k("progress"):1==this.bufferedPercent()&&
(clearInterval(this.Ya),this.k("progress"))}),500);a.g&&a.g.W("progress",function(){this.n.progressEvents=f;var a=this.c;a.Hb=l;clearInterval(a.Ya)})}this.n.timeupdateEvents||(a=this.c,a.Ib=f,a.d("play",a.Kc),a.d("pause",a.Ba),a.g&&a.g.W("timeupdate",function(){this.n.timeupdateEvents=f;S(this.c)}))})}function S(a){a.Ib=l;a.Ba();a.p("play",a.Kc);a.p("pause",a.Ba)}t.Kc=function(){this.lc&&this.Ba();this.lc=setInterval(u.bind(this,function(){this.k("timeupdate")}),250)};
t.Ba=function(){clearInterval(this.lc);this.k("timeupdate")};t.Bd=function(){this.error(j);this.paused()?(T(this,l),this.W("play",function(){T(this,f)})):this.k("firstplay")};t.tc=l;function T(a,c){c!==b&&a.tc!==c&&((a.tc=c)?(a.o("vjs-has-started"),a.k("firstplay")):a.r("vjs-has-started"))}t.Nb=function(){u.r(this.b,"vjs-paused");u.o(this.b,"vjs-playing")};t.zd=function(){this.j.starttime&&this.currentTime(this.j.starttime);this.o("vjs-has-started")};
t.Mb=function(){u.r(this.b,"vjs-playing");u.o(this.b,"vjs-paused")};t.Cd=function(){1==this.bufferedPercent()&&this.k("loadedalldata")};t.xd=function(){this.j.loop&&(this.currentTime(0),this.play())};t.yc=function(){var a=U(this,"duration");a&&(0>a&&(a=Infinity),this.duration(a),Infinity===a?this.o("vjs-live"):this.r("vjs-live"))};t.Ad=function(){this.isFullscreen()?this.o("vjs-fullscreen"):this.r("vjs-fullscreen")};
function V(a,c,d){if(a.g&&!a.g.ca)a.g.J(function(){this[c](d)});else try{a.g[c](d)}catch(e){throw u.log(e),e;}}function U(a,c){if(a.g&&a.g.ca)try{return a.g[c]()}catch(d){throw a.g[c]===b?u.log("Video.js: "+c+" method not defined for "+a.Ca+" playback technology.",d):"TypeError"==d.name?(u.log("Video.js: "+c+" unavailable on "+a.Ca+" playback technology element.",d),a.g.ca=l):u.log(d),d;}}t.play=function(){V(this,"play");return this};t.pause=function(){V(this,"pause");return this};
t.paused=function(){return U(this,"paused")===l?l:f};t.currentTime=function(a){return a!==b?(V(this,"setCurrentTime",a),this.Ib&&this.k("timeupdate"),this):this.z.currentTime=U(this,"currentTime")||0};t.duration=function(a){if(a!==b)return this.z.duration=parseFloat(a),this;this.z.duration===b&&this.yc();return this.z.duration||0};t.buffered=function(){var a=U(this,"buffered"),c=a.length-1,d=this.z.sb=this.z.sb||0;a&&(0<=c&&a.end(c)!==d)&&(d=a.end(c),this.z.sb=d);return u.yb(0,d)};
t.bufferedPercent=function(){return this.duration()?this.buffered().end(0)/this.duration():0};t.volume=function(a){if(a!==b)return a=Math.max(0,Math.min(1,parseFloat(a))),this.z.volume=a,V(this,"setVolume",a),u.Kd(a),this;a=parseFloat(U(this,"volume"));return isNaN(a)?1:a};t.muted=function(a){return a!==b?(V(this,"setMuted",a),this):U(this,"muted")||l};t.ab=function(){return U(this,"supportsFullScreen")||l};t.vc=l;t.isFullscreen=function(a){return a!==b?(this.vc=!!a,this):this.vc};
t.isFullScreen=function(a){u.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")');return this.isFullscreen(a)};
t.requestFullscreen=function(){var a=u.Na.Ab;this.isFullscreen(f);a?(u.d(document,a.fullscreenchange,u.bind(this,function(c){this.isFullscreen(document[a.fullscreenElement]);this.isFullscreen()===l&&u.p(document,a.fullscreenchange,arguments.callee);this.k("fullscreenchange")})),this.b[a.requestFullscreen]()):this.g.ab()?V(this,"enterFullScreen"):(this.sd=f,this.kd=document.documentElement.style.overflow,u.d(document,"keydown",u.bind(this,this.pc)),document.documentElement.style.overflow="hidden",
u.o(document.body,"vjs-full-window"),this.k("enterFullWindow"),this.k("fullscreenchange"));return this};t.exitFullscreen=function(){var a=u.Na.Ab;this.isFullscreen(l);if(a)document[a.exitFullscreen]();else this.g.ab()?V(this,"exitFullScreen"):(ea(this),this.k("fullscreenchange"));return this};t.pc=function(a){27===a.keyCode&&(this.isFullscreen()===f?this.exitFullscreen():ea(this))};
function ea(a){a.sd=l;u.p(document,"keydown",a.pc);document.documentElement.style.overflow=a.kd;u.r(document.body,"vjs-full-window");a.k("exitFullWindow")}
t.src=function(a){if(a===b)return U(this,"src");if(a instanceof Array){var c;a:{c=a;for(var d=0,e=this.j.techOrder;d<e.length;d++){var g=u.$(e[d]),h=window.videojs[g];if(h){if(h.isSupported())for(var k=0,p=c;k<p.length;k++){var n=p[k];if(h.canPlaySource(n)){c={source:n,g:g};break a}}}else u.log.error('The "'+g+'" tech is undefined. Skipped browser support check for that tech.')}c=l}c?(a=c.source,c=c.g,c==this.Ca?this.src(a):R(this,c,a)):(this.error({code:4,message:this.options().notSupportedMessage}),
this.Ea())}else a instanceof Object?window.videojs[this.Ca].canPlaySource(a)?this.src(a.src):this.src([a]):(this.z.src=a,this.ca?(V(this,"src",a),"auto"==this.j.preload&&this.load(),this.j.autoplay&&this.play()):this.J(function(){this.src(a)}));return this};t.load=function(){V(this,"load");return this};t.currentSrc=function(){return U(this,"currentSrc")||this.z.src||""};t.Xa=function(a){return a!==b?(V(this,"setPreload",a),this.j.preload=a,this):U(this,"preload")};
t.autoplay=function(a){return a!==b?(V(this,"setAutoplay",a),this.j.autoplay=a,this):U(this,"autoplay")};t.loop=function(a){return a!==b?(V(this,"setLoop",a),this.j.loop=a,this):U(this,"loop")};t.poster=function(a){if(a===b)return this.Bc;this.Bc=a;V(this,"setPoster",a);this.k("posterchange")};
t.controls=function(a){return a!==b?(a=!!a,this.xb!==a&&((this.xb=a)?(this.r("vjs-controls-disabled"),this.o("vjs-controls-enabled"),this.k("controlsenabled")):(this.r("vjs-controls-enabled"),this.o("vjs-controls-disabled"),this.k("controlsdisabled"))),this):this.xb};u.Player.prototype.Sb;t=u.Player.prototype;
t.usingNativeControls=function(a){return a!==b?(a=!!a,this.Sb!==a&&((this.Sb=a)?(this.o("vjs-using-native-controls"),this.k("usingnativecontrols")):(this.r("vjs-using-native-controls"),this.k("usingcustomcontrols"))),this):this.Sb};t.ba=j;t.error=function(a){if(a===b)return this.ba;if(a===j)return this.ba=a,this.r("vjs-error"),this;this.ba=a instanceof u.F?a:new u.F(a);this.k("error");this.o("vjs-error");u.log.error("(CODE:"+this.ba.code+" "+u.F.Ra[this.ba.code]+")",this.ba.message,this.ba);return this};
t.ended=function(){return U(this,"ended")};t.seeking=function(){return U(this,"seeking")};t.na=f;t.reportUserActivity=function(){this.na=f};t.Rb=f;t.userActive=function(a){return a!==b?(a=!!a,a!==this.Rb&&((this.Rb=a)?(this.na=f,this.r("vjs-user-inactive"),this.o("vjs-user-active"),this.k("useractive")):(this.na=l,this.g&&this.g.W("mousemove",function(a){a.stopPropagation();a.preventDefault()}),this.r("vjs-user-active"),this.o("vjs-user-inactive"),this.k("userinactive"))),this):this.Rb};
t.playbackRate=function(a){return a!==b?(V(this,"setPlaybackRate",a),this):this.g&&this.g.n&&this.g.n.playbackRate?U(this,"playbackRate"):1};u.Ha=u.a.extend();u.Ha.prototype.j={ee:"play",children:{playToggle:{},currentTimeDisplay:{},timeDivider:{},durationDisplay:{},remainingTimeDisplay:{},liveDisplay:{},progressControl:{},fullscreenToggle:{},volumeControl:{},muteToggle:{},playbackRateMenuButton:{}}};u.Ha.prototype.e=function(){return u.e("div",{className:"vjs-control-bar"})};
u.Yb=u.a.extend({h:function(a,c){u.a.call(this,a,c)}});u.Yb.prototype.e=function(){var a=u.a.prototype.e.call(this,"div",{className:"vjs-live-controls vjs-control"});this.u=u.e("div",{className:"vjs-live-display",innerHTML:'<span class="vjs-control-text">Stream Type </span>LIVE',"aria-live":"off"});a.appendChild(this.u);return a};u.ac=u.s.extend({h:function(a,c){u.s.call(this,a,c);a.d("play",u.bind(this,this.Nb));a.d("pause",u.bind(this,this.Mb))}});t=u.ac.prototype;t.sa="Play";
t.S=function(){return"vjs-play-control "+u.s.prototype.S.call(this)};t.q=function(){this.c.paused()?this.c.play():this.c.pause()};t.Nb=function(){u.r(this.b,"vjs-paused");u.o(this.b,"vjs-playing");this.b.children[0].children[0].innerHTML="Pause"};t.Mb=function(){u.r(this.b,"vjs-playing");u.o(this.b,"vjs-paused");this.b.children[0].children[0].innerHTML="Play"};u.eb=u.a.extend({h:function(a,c){u.a.call(this,a,c);a.d("timeupdate",u.bind(this,this.fa))}});
u.eb.prototype.e=function(){var a=u.a.prototype.e.call(this,"div",{className:"vjs-current-time vjs-time-controls vjs-control"});this.u=u.e("div",{className:"vjs-current-time-display",innerHTML:'<span class="vjs-control-text">Current Time </span>0:00',"aria-live":"off"});a.appendChild(this.u);return a};u.eb.prototype.fa=function(){var a=this.c.$a?this.c.z.currentTime:this.c.currentTime();this.u.innerHTML='<span class="vjs-control-text">Current Time </span>'+u.ya(a,this.c.duration())};
u.fb=u.a.extend({h:function(a,c){u.a.call(this,a,c);a.d("timeupdate",u.bind(this,this.fa))}});u.fb.prototype.e=function(){var a=u.a.prototype.e.call(this,"div",{className:"vjs-duration vjs-time-controls vjs-control"});this.u=u.e("div",{className:"vjs-duration-display",innerHTML:'<span class="vjs-control-text">Duration Time </span>0:00',"aria-live":"off"});a.appendChild(this.u);return a};
u.fb.prototype.fa=function(){var a=this.c.duration();a&&(this.u.innerHTML='<span class="vjs-control-text">Duration Time </span>'+u.ya(a))};u.gc=u.a.extend({h:function(a,c){u.a.call(this,a,c)}});u.gc.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-time-divider",innerHTML:"<div><span>/</span></div>"})};u.mb=u.a.extend({h:function(a,c){u.a.call(this,a,c);a.d("timeupdate",u.bind(this,this.fa))}});
u.mb.prototype.e=function(){var a=u.a.prototype.e.call(this,"div",{className:"vjs-remaining-time vjs-time-controls vjs-control"});this.u=u.e("div",{className:"vjs-remaining-time-display",innerHTML:'<span class="vjs-control-text">Remaining Time </span>-0:00',"aria-live":"off"});a.appendChild(this.u);return a};u.mb.prototype.fa=function(){this.c.duration()&&(this.u.innerHTML='<span class="vjs-control-text">Remaining Time </span>-'+u.ya(this.c.duration()-this.c.currentTime()))};
u.Ia=u.s.extend({h:function(a,c){u.s.call(this,a,c)}});u.Ia.prototype.sa="Fullscreen";u.Ia.prototype.S=function(){return"vjs-fullscreen-control "+u.s.prototype.S.call(this)};u.Ia.prototype.q=function(){this.c.isFullscreen()?(this.c.exitFullscreen(),this.wb.innerHTML="Fullscreen"):(this.c.requestFullscreen(),this.wb.innerHTML="Non-Fullscreen")};u.lb=u.a.extend({h:function(a,c){u.a.call(this,a,c)}});u.lb.prototype.j={children:{seekBar:{}}};
u.lb.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-progress-control vjs-control"})};u.cc=u.Q.extend({h:function(a,c){u.Q.call(this,a,c);a.d("timeupdate",u.bind(this,this.ma));a.J(u.bind(this,this.ma))}});t=u.cc.prototype;t.j={children:{loadProgressBar:{},playProgressBar:{},seekHandle:{}},barName:"playProgressBar",handleName:"seekHandle"};t.Ac="timeupdate";t.e=function(){return u.Q.prototype.e.call(this,"div",{className:"vjs-progress-holder","aria-label":"video progress bar"})};
t.ma=function(){var a=this.c.$a?this.c.z.currentTime:this.c.currentTime();this.b.setAttribute("aria-valuenow",u.round(100*this.Cb(),2));this.b.setAttribute("aria-valuetext",u.ya(a,this.c.duration()))};t.Cb=function(){return this.c.currentTime()/this.c.duration()};t.Wa=function(a){u.Q.prototype.Wa.call(this,a);this.c.$a=f;this.Wd=!this.c.paused();this.c.pause()};t.Kb=function(a){a=J(this,a)*this.c.duration();a==this.c.duration()&&(a-=0.1);this.c.currentTime(a)};
t.Lb=function(a){u.Q.prototype.Lb.call(this,a);this.c.$a=l;this.Wd&&this.c.play()};t.Hc=function(){this.c.currentTime(this.c.currentTime()+5)};t.Gc=function(){this.c.currentTime(this.c.currentTime()-5)};u.ib=u.a.extend({h:function(a,c){u.a.call(this,a,c);a.d("progress",u.bind(this,this.update))}});u.ib.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text">Loaded: 0%</span>'})};
u.ib.prototype.update=function(){this.b.style&&(this.b.style.width=u.round(100*this.c.bufferedPercent(),2)+"%")};u.$b=u.a.extend({h:function(a,c){u.a.call(this,a,c)}});u.$b.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-play-progress",innerHTML:'<span class="vjs-control-text">Progress: 0%</span>'})};u.Ka=u.Y.extend({h:function(a,c){u.Y.call(this,a,c);a.d("timeupdate",u.bind(this,this.fa))}});u.Ka.prototype.defaultValue="00:00";
u.Ka.prototype.e=function(){return u.Y.prototype.e.call(this,"div",{className:"vjs-seek-handle","aria-live":"off"})};u.Ka.prototype.fa=function(){var a=this.c.$a?this.c.z.currentTime:this.c.currentTime();this.b.innerHTML='<span class="vjs-control-text">'+u.ya(a,this.c.duration())+"</span>"};u.ob=u.a.extend({h:function(a,c){u.a.call(this,a,c);a.g&&(a.g.n&&a.g.n.volumeControl===l)&&this.o("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.g.n&&a.g.n.volumeControl===l?this.o("vjs-hidden"):this.r("vjs-hidden")}))}});
u.ob.prototype.j={children:{volumeBar:{}}};u.ob.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-volume-control vjs-control"})};u.nb=u.Q.extend({h:function(a,c){u.Q.call(this,a,c);a.d("volumechange",u.bind(this,this.ma));a.J(u.bind(this,this.ma))}});t=u.nb.prototype;t.ma=function(){this.b.setAttribute("aria-valuenow",u.round(100*this.c.volume(),2));this.b.setAttribute("aria-valuetext",u.round(100*this.c.volume(),2)+"%")};
t.j={children:{volumeLevel:{},volumeHandle:{}},barName:"volumeLevel",handleName:"volumeHandle"};t.Ac="volumechange";t.e=function(){return u.Q.prototype.e.call(this,"div",{className:"vjs-volume-bar","aria-label":"volume level"})};t.Kb=function(a){this.c.muted()&&this.c.muted(l);this.c.volume(J(this,a))};t.Cb=function(){return this.c.muted()?0:this.c.volume()};t.Hc=function(){this.c.volume(this.c.volume()+0.1)};t.Gc=function(){this.c.volume(this.c.volume()-0.1)};
u.hc=u.a.extend({h:function(a,c){u.a.call(this,a,c)}});u.hc.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})};u.pb=u.Y.extend();u.pb.prototype.defaultValue="00:00";u.pb.prototype.e=function(){return u.Y.prototype.e.call(this,"div",{className:"vjs-volume-handle"})};
u.ha=u.s.extend({h:function(a,c){u.s.call(this,a,c);a.d("volumechange",u.bind(this,this.update));a.g&&(a.g.n&&a.g.n.volumeControl===l)&&this.o("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.g.n&&a.g.n.volumeControl===l?this.o("vjs-hidden"):this.r("vjs-hidden")}))}});u.ha.prototype.e=function(){return u.s.prototype.e.call(this,"div",{className:"vjs-mute-control vjs-control",innerHTML:'<div><span class="vjs-control-text">Mute</span></div>'})};
u.ha.prototype.q=function(){this.c.muted(this.c.muted()?l:f)};u.ha.prototype.update=function(){var a=this.c.volume(),c=3;0===a||this.c.muted()?c=0:0.33>a?c=1:0.67>a&&(c=2);this.c.muted()?"Unmute"!=this.b.children[0].children[0].innerHTML&&(this.b.children[0].children[0].innerHTML="Unmute"):"Mute"!=this.b.children[0].children[0].innerHTML&&(this.b.children[0].children[0].innerHTML="Mute");for(a=0;4>a;a++)u.r(this.b,"vjs-vol-"+a);u.o(this.b,"vjs-vol-"+c)};
u.qa=u.L.extend({h:function(a,c){u.L.call(this,a,c);a.d("volumechange",u.bind(this,this.update));a.g&&(a.g.n&&a.g.n.Nc===l)&&this.o("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.g.n&&a.g.n.Nc===l?this.o("vjs-hidden"):this.r("vjs-hidden")}));this.o("vjs-menu-button")}});u.qa.prototype.va=function(){var a=new u.ga(this.c,{kc:"div"}),c=new u.nb(this.c,u.l.B({Vd:f},this.j.le));a.V(c);return a};u.qa.prototype.q=function(){u.ha.prototype.q.call(this);u.L.prototype.q.call(this)};
u.qa.prototype.e=function(){return u.s.prototype.e.call(this,"div",{className:"vjs-volume-menu-button vjs-menu-button vjs-control",innerHTML:'<div><span class="vjs-control-text">Mute</span></div>'})};u.qa.prototype.update=u.ha.prototype.update;u.bc=u.L.extend({h:function(a,c){u.L.call(this,a,c);this.Mc();this.Lc();a.d("loadstart",u.bind(this,this.Mc));a.d("ratechange",u.bind(this,this.Lc))}});t=u.bc.prototype;
t.e=function(){var a=u.a.prototype.e.call(this,"div",{className:"vjs-playback-rate vjs-menu-button vjs-control",innerHTML:'<div class="vjs-control-content"><span class="vjs-control-text">Playback Rate</span></div>'});this.xc=u.e("div",{className:"vjs-playback-rate-value",innerHTML:1});a.appendChild(this.xc);return a};t.va=function(){var a=new u.ga(this.m()),c=this.m().options().playbackRates;if(c)for(var d=c.length-1;0<=d;d--)a.V(new u.kb(this.m(),{rate:c[d]+"x"}));return a};
t.ma=function(){this.w().setAttribute("aria-valuenow",this.m().playbackRate())};t.q=function(){for(var a=this.m().playbackRate(),c=this.m().options().playbackRates,d=c[0],e=0;e<c.length;e++)if(c[e]>a){d=c[e];break}this.m().playbackRate(d)};function fa(a){return a.m().g&&a.m().g.n.playbackRate&&a.m().options().playbackRates&&0<a.m().options().playbackRates.length}t.Mc=function(){fa(this)?this.r("vjs-hidden"):this.o("vjs-hidden")};
t.Lc=function(){fa(this)&&(this.xc.innerHTML=this.m().playbackRate()+"x")};u.kb=u.I.extend({kc:"button",h:function(a,c){var d=this.label=c.rate,e=this.Cc=parseFloat(d,10);c.label=d;c.selected=1===e;u.I.call(this,a,c);this.m().d("ratechange",u.bind(this,this.update))}});u.kb.prototype.q=function(){u.I.prototype.q.call(this);this.m().playbackRate(this.Cc)};u.kb.prototype.update=function(){this.selected(this.m().playbackRate()==this.Cc)};
u.Ja=u.s.extend({h:function(a,c){u.s.call(this,a,c);a.poster()&&this.src(a.poster());(!a.poster()||!a.controls())&&this.G();a.d("posterchange",u.bind(this,function(){this.src(a.poster())}));a.d("play",u.bind(this,this.G))}});var ga="backgroundSize"in u.A.style;u.Ja.prototype.e=function(){var a=u.e("div",{className:"vjs-poster",tabIndex:-1});ga||a.appendChild(u.e("img"));return a};u.Ja.prototype.src=function(a){var c=this.w();a!==b&&(ga?c.style.backgroundImage='url("'+a+'")':c.firstChild.src=a)};
u.Ja.prototype.q=function(){this.m().controls()&&this.c.play()};u.Zb=u.a.extend({h:function(a,c){u.a.call(this,a,c);a.d("canplay",u.bind(this,this.G));a.d("canplaythrough",u.bind(this,this.G));a.d("playing",u.bind(this,this.G));a.d("seeking",u.bind(this,this.show));a.d("seeked",u.bind(this,this.G));a.d("ended",u.bind(this,this.G));a.d("waiting",u.bind(this,this.show))}});u.Zb.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-loading-spinner"})};u.bb=u.s.extend();
u.bb.prototype.e=function(){return u.s.prototype.e.call(this,"div",{className:"vjs-big-play-button",innerHTML:'<span aria-hidden="true"></span>',"aria-label":"play video"})};u.bb.prototype.q=function(){this.c.play()};u.gb=u.a.extend({h:function(a,c){u.a.call(this,a,c);this.update();a.d("error",u.bind(this,this.update))}});u.gb.prototype.e=function(){var a=u.a.prototype.e.call(this,"div",{className:"vjs-error-display"});this.u=u.e("div");a.appendChild(this.u);return a};
u.gb.prototype.update=function(){this.m().error()&&(this.u.innerHTML=this.m().error().message)};
u.t=u.a.extend({h:function(a,c,d){c=c||{};c.Ec=l;u.a.call(this,a,c,d);var e,g;g=this;e=this.m();a=function(){if(e.controls()&&!e.usingNativeControls()){var a;g.d("mousedown",g.q);g.d("touchstart",function(c){c.preventDefault();a=this.c.userActive()});g.d("touchmove",function(){a&&this.m().reportUserActivity()});I(g);g.d("tap",g.Dd)}};c=u.bind(g,g.Hd);this.J(a);e.d("controlsenabled",a);e.d("controlsdisabled",c);this.J(function(){this.networkState&&0<this.networkState()&&this.m().k("loadstart")})}});
t=u.t.prototype;t.Hd=function(){this.p("tap");this.p("touchstart");this.p("touchmove");this.p("touchleave");this.p("touchcancel");this.p("touchend");this.p("click");this.p("mousedown")};t.q=function(a){0===a.button&&this.m().controls()&&(this.m().paused()?this.m().play():this.m().pause())};t.Dd=function(){this.m().userActive(!this.m().userActive())};t.Pb=m();t.n={volumeControl:f,fullscreenResize:l,playbackRate:l,progressEvents:l,timeupdateEvents:l};u.media={};
u.f=u.t.extend({h:function(a,c,d){this.n.volumeControl=u.f.dd();this.n.playbackRate=u.f.cd();this.n.movingMediaElementInDOM=!u.Sc;this.n.fullscreenResize=f;u.t.call(this,a,c,d);for(d=u.f.hb.length-1;0<=d;d--)u.d(this.b,u.f.hb[d],u.bind(this,this.md));if((c=c.source)&&this.b.currentSrc!==c.src)this.b.src=c.src;if(u.ec&&a.options().nativeControlsForTouch!==l){var e,g,h,k;e=this;g=this.m();c=g.controls();e.b.controls=!!c;h=function(){e.b.controls=f};k=function(){e.b.controls=l};g.d("controlsenabled",
h);g.d("controlsdisabled",k);c=function(){g.p("controlsenabled",h);g.p("controlsdisabled",k)};e.d("dispose",c);g.d("usingcustomcontrols",c);g.usingNativeControls(f)}a.J(function(){this.P&&(this.j.autoplay&&this.paused())&&(delete this.P.poster,this.play())});this.Ea()}});t=u.f.prototype;t.dispose=function(){u.t.prototype.dispose.call(this)};
t.e=function(){var a=this.c,c=a.P,d;if(!c||this.n.movingMediaElementInDOM===l)c?(d=c.cloneNode(l),u.f.mc(c),c=d,a.P=j):c=u.e("video",{id:a.id()+"_html5_api",className:"vjs-tech"}),c.player=a,u.Db(c,a.w());d=["autoplay","preload","loop","muted"];for(var e=d.length-1;0<=e;e--){var g=d[e];a.j[g]!==j&&(c[g]=a.j[g])}return c};t.md=function(a){"error"==a.type?this.m().error(this.error().code):(a.bubbles=l,this.m().k(a))};t.play=function(){this.b.play()};t.pause=function(){this.b.pause()};t.paused=function(){return this.b.paused};
t.currentTime=function(){return this.b.currentTime};t.Jd=function(a){try{this.b.currentTime=a}catch(c){u.log(c,"Video is not ready. (Video.js)")}};t.duration=function(){return this.b.duration||0};t.buffered=function(){return this.b.buffered};t.volume=function(){return this.b.volume};t.Pd=function(a){this.b.volume=a};t.muted=function(){return this.b.muted};t.Md=function(a){this.b.muted=a};t.width=function(){return this.b.offsetWidth};t.height=function(){return this.b.offsetHeight};
t.ab=function(){return"function"==typeof this.b.webkitEnterFullScreen&&(/Android/.test(u.M)||!/Chrome|Mac OS X 10.5/.test(u.M))?f:l};t.nc=function(){var a=this.b;a.paused&&a.networkState<=a.Yd?(this.b.play(),setTimeout(function(){a.pause();a.webkitEnterFullScreen()},0)):a.webkitEnterFullScreen()};t.nd=function(){this.b.webkitExitFullScreen()};t.src=function(a){this.b.src=a};t.load=function(){this.b.load()};t.currentSrc=function(){return this.b.currentSrc};t.poster=function(){return this.b.poster};
t.Pb=function(a){this.b.poster=a};t.Xa=function(){return this.b.Xa};t.Od=function(a){this.b.Xa=a};t.autoplay=function(){return this.b.autoplay};t.Id=function(a){this.b.autoplay=a};t.controls=function(){return this.b.controls};t.loop=function(){return this.b.loop};t.Ld=function(a){this.b.loop=a};t.error=function(){return this.b.error};t.seeking=function(){return this.b.seeking};t.ended=function(){return this.b.ended};t.playbackRate=function(){return this.b.playbackRate};
t.Nd=function(a){this.b.playbackRate=a};t.networkState=function(){return this.b.networkState};u.f.isSupported=function(){try{u.A.volume=0.5}catch(a){return l}return!!u.A.canPlayType};u.f.tb=function(a){try{return!!u.A.canPlayType(a.type)}catch(c){return""}};u.f.dd=function(){var a=u.A.volume;u.A.volume=a/2+0.1;return a!==u.A.volume};u.f.cd=function(){var a=u.A.playbackRate;u.A.playbackRate=a/2+0.1;return a!==u.A.playbackRate};var W,ha=/^application\/(?:x-|vnd\.apple\.)mpegurl/i,ia=/^video\/mp4/i;
u.f.zc=function(){4<=u.Tb&&(W||(W=u.A.constructor.prototype.canPlayType),u.A.constructor.prototype.canPlayType=function(a){return a&&ha.test(a)?"maybe":W.call(this,a)});u.Wc&&(W||(W=u.A.constructor.prototype.canPlayType),u.A.constructor.prototype.canPlayType=function(a){return a&&ia.test(a)?"maybe":W.call(this,a)})};u.f.Ud=function(){var a=u.A.constructor.prototype.canPlayType;u.A.constructor.prototype.canPlayType=W;W=j;return a};u.f.zc();u.f.hb="loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" ");
u.f.mc=function(a){if(a){a.player=j;for(a.parentNode&&a.parentNode.removeChild(a);a.hasChildNodes();)a.removeChild(a.firstChild);a.removeAttribute("src");if("function"===typeof a.load)try{a.load()}catch(c){}}};
u.i=u.t.extend({h:function(a,c,d){u.t.call(this,a,c,d);var e=c.source;d=c.parentEl;var g=this.b=u.e("div",{id:a.id()+"_temp_flash"}),h=a.id()+"_flash_api";a=a.j;var k=u.l.B({readyFunction:"videojs.Flash.onReady",eventProxyFunction:"videojs.Flash.onEvent",errorEventProxyFunction:"videojs.Flash.onError",autoplay:a.autoplay,preload:a.Xa,loop:a.loop,muted:a.muted},c.flashVars),p=u.l.B({wmode:"opaque",bgcolor:"#000000"},c.params),n=u.l.B({id:h,name:h,"class":"vjs-tech"},c.attributes),s;e&&(e.type&&u.i.ud(e.type)?
(a=u.i.Ic(e.src),k.rtmpConnection=encodeURIComponent(a.vb),k.rtmpStream=encodeURIComponent(a.Qb)):k.src=encodeURIComponent(u.qc(e.src)));this.setCurrentTime=function(a){s=a;this.b.vjs_setProperty("currentTime",a)};this.currentTime=function(){return this.seeking()?s:this.b.vjs_getProperty("currentTime")};u.Db(g,d);c.startTime&&this.J(function(){this.load();this.play();this.currentTime(c.startTime)});u.Xb&&this.J(function(){u.d(this.w(),"mousemove",u.bind(this,function(){this.m().k({type:"mousemove",
bubbles:l})}))});if(c.iFrameMode===f&&!u.Xb){var C=u.e("iframe",{id:h+"_iframe",name:h+"_iframe",className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0});k.readyFunction="ready";k.eventProxyFunction="events";k.errorEventProxyFunction="errors";u.d(C,"load",u.bind(this,function(){var a,d=C.contentWindow;a=C.contentDocument?C.contentDocument:C.contentWindow.document;a.write(u.i.rc(c.swf,k,p,n));d.player=this.c;d.ready=u.bind(this.c,function(c){var d=this.g;d.b=a.getElementById(c);
u.i.ub(d)});d.events=u.bind(this.c,function(a,c){this&&"flash"===this.Ca&&this.k(c)});d.errors=u.bind(this.c,function(a,c){u.log("Flash Error",c)})}));g.parentNode.replaceChild(C,g)}else u.i.ld(c.swf,g,k,p,n)}});t=u.i.prototype;t.dispose=function(){u.t.prototype.dispose.call(this)};t.play=function(){this.b.vjs_play()};t.pause=function(){this.b.vjs_pause()};
t.src=function(a){if(a===b)return this.currentSrc();u.i.td(a)?(a=u.i.Ic(a),this.ge(a.vb),this.he(a.Qb)):(a=u.qc(a),this.b.vjs_src(a));if(this.c.autoplay()){var c=this;setTimeout(function(){c.play()},0)}};t.currentSrc=function(){var a=this.b.vjs_getProperty("currentSrc");if(a==j){var c=this.rtmpConnection(),d=this.rtmpStream();c&&d&&(a=u.i.Qd(c,d))}return a};t.load=function(){this.b.vjs_load()};t.poster=function(){this.b.vjs_getProperty("poster")};t.Pb=m();t.buffered=function(){return u.yb(0,this.b.vjs_getProperty("buffered"))};
t.ab=r(l);t.nc=r(l);var ja=u.i.prototype,X="rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),ka="error networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" ");function la(){var a=X[Y],c=a.charAt(0).toUpperCase()+a.slice(1);ja["set"+c]=function(c){return this.b.vjs_setProperty(a,c)}}
function ma(a){ja[a]=function(){return this.b.vjs_getProperty(a)}}var Y;for(Y=0;Y<X.length;Y++)ma(X[Y]),la();for(Y=0;Y<ka.length;Y++)ma(ka[Y]);u.i.isSupported=function(){return 10<=u.i.version()[0]};u.i.tb=function(a){if(!a.type)return"";a=a.type.replace(/;.*/,"").toLowerCase();if(a in u.i.pd||a in u.i.Jc)return"maybe"};u.i.pd={"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"};u.i.Jc={"rtmp/mp4":"MP4","rtmp/flv":"FLV"};
u.i.onReady=function(a){a=u.w(a);var c=a.player||a.parentNode.player,d=c.g;a.player=c;d.b=a;u.i.ub(d)};u.i.ub=function(a){a.w().vjs_getProperty?a.Ea():setTimeout(function(){u.i.ub(a)},50)};u.i.onEvent=function(a,c){u.w(a).player.k(c)};u.i.onError=function(a,c){var d=u.w(a).player,e="FLASH: "+c;"srcnotfound"==c?d.error({code:4,message:e}):d.error(e)};
u.i.version=function(){var a="0,0,0";try{a=(new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}catch(c){try{navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(a=(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1])}catch(d){}}return a.split(",")};
u.i.ld=function(a,c,d,e,g){a=u.i.rc(a,d,e,g);a=u.e("div",{innerHTML:a}).childNodes[0];d=c.parentNode;c.parentNode.replaceChild(a,c);var h=d.childNodes[0];setTimeout(function(){h.style.display="block"},1E3)};
u.i.rc=function(a,c,d,e){var g="",h="",k="";c&&u.l.wa(c,function(a,c){g+=a+"="+c+"&amp;"});d=u.l.B({movie:a,flashvars:g,allowScriptAccess:"always",allowNetworking:"all"},d);u.l.wa(d,function(a,c){h+='<param name="'+a+'" value="'+c+'" />'});e=u.l.B({data:a,width:"100%",height:"100%"},e);u.l.wa(e,function(a,c){k+=a+'="'+c+'" '});return'<object type="application/x-shockwave-flash"'+k+">"+h+"</object>"};u.i.Qd=function(a,c){return a+"&"+c};
u.i.Ic=function(a){var c={vb:"",Qb:""};if(!a)return c;var d=a.indexOf("&"),e;-1!==d?e=d+1:(d=e=a.lastIndexOf("/")+1,0===d&&(d=e=a.length));c.vb=a.substring(0,d);c.Qb=a.substring(e,a.length);return c};u.i.ud=function(a){return a in u.i.Jc};u.i.Yc=/^rtmp[set]?:\/\//i;u.i.td=function(a){return u.i.Yc.test(a)};
u.Xc=u.a.extend({h:function(a,c,d){u.a.call(this,a,c,d);if(!a.j.sources||0===a.j.sources.length){c=0;for(d=a.j.techOrder;c<d.length;c++){var e=u.$(d[c]),g=window.videojs[e];if(g&&g.isSupported()){R(a,e);break}}}else a.src(a.j.sources)}});u.Player.prototype.textTracks=function(){return this.Da=this.Da||[]};
function na(a,c,d,e,g){var h=a.Da=a.Da||[];g=g||{};g.kind=c;g.label=d;g.language=e;c=u.$(c||"subtitles");var k=new window.videojs[c+"Track"](a,g);h.push(k);k.Qa()&&a.J(function(){setTimeout(function(){k.show()},0)})}function oa(a,c,d){for(var e=a.Da,g=0,h=e.length,k,p;g<h;g++)k=e[g],k.id()===c?(k.show(),p=k):d&&(k.K()==d&&0<k.mode())&&k.disable();(c=p?p.K():d?d:l)&&a.k(c+"trackchange")}
u.C=u.a.extend({h:function(a,c){u.a.call(this,a,c);this.T=c.id||"vjs_"+c.kind+"_"+c.language+"_"+u.v++;this.Fc=c.src;this.hd=c["default"]||c.dflt;this.Sd=c.title;this.de=c.srclang;this.vd=c.label;this.aa=[];this.qb=[];this.ka=this.la=0;this.c.d("fullscreenchange",u.bind(this,this.$c))}});t=u.C.prototype;t.K=q("H");t.src=q("Fc");t.Qa=q("hd");t.title=q("Sd");t.label=q("vd");t.ed=q("aa");t.Zc=q("qb");t.readyState=q("la");t.mode=q("ka");
t.$c=function(){this.b.style.fontSize=this.c.isFullScreen()?140*(screen.width/this.c.width())+"%":""};t.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-"+this.H+" vjs-text-track"})};t.show=function(){pa(this);this.ka=2;u.a.prototype.show.call(this)};t.G=function(){pa(this);this.ka=1;u.a.prototype.G.call(this)};
t.disable=function(){2==this.ka&&this.G();this.c.p("timeupdate",u.bind(this,this.update,this.T));this.c.p("ended",u.bind(this,this.reset,this.T));this.reset();this.c.ja("textTrackDisplay").removeChild(this);this.ka=0};function pa(a){0===a.la&&a.load();0===a.ka&&(a.c.d("timeupdate",u.bind(a,a.update,a.T)),a.c.d("ended",u.bind(a,a.reset,a.T)),("captions"===a.H||"subtitles"===a.H)&&a.c.ja("textTrackDisplay").V(a))}
t.load=function(){0===this.la&&(this.la=1,u.get(this.Fc,u.bind(this,this.Ed),u.bind(this,this.yd)))};t.yd=function(a){this.error=a;this.la=3;this.k("error")};t.Ed=function(a){var c,d;a=a.split("\n");for(var e="",g=1,h=a.length;g<h;g++)if(e=u.trim(a[g])){-1==e.indexOf("--\x3e")?(c=e,e=u.trim(a[++g])):c=this.aa.length;c={id:c,index:this.aa.length};d=e.split(" --\x3e ");c.startTime=qa(d[0]);c.xa=qa(d[1]);for(d=[];a[++g]&&(e=u.trim(a[g]));)d.push(e);c.text=d.join("<br/>");this.aa.push(c)}this.la=2;this.k("loaded")};
function qa(a){var c=a.split(":");a=0;var d,e,g;3==c.length?(d=c[0],e=c[1],c=c[2]):(d=0,e=c[0],c=c[1]);c=c.split(/\s+/);c=c.splice(0,1)[0];c=c.split(/\.|,/);g=parseFloat(c[1]);c=c[0];a+=3600*parseFloat(d);a+=60*parseFloat(e);a+=parseFloat(c);g&&(a+=g/1E3);return a}
t.update=function(){if(0<this.aa.length){var a=this.c.options().trackTimeOffset||0,a=this.c.currentTime()+a;if(this.Ob===b||a<this.Ob||this.Ta<=a){var c=this.aa,d=this.c.duration(),e=0,g=l,h=[],k,p,n,s;a>=this.Ta||this.Ta===b?s=this.zb!==b?this.zb:0:(g=f,s=this.Gb!==b?this.Gb:c.length-1);for(;;){n=c[s];if(n.xa<=a)e=Math.max(e,n.xa),n.Ma&&(n.Ma=l);else if(a<n.startTime){if(d=Math.min(d,n.startTime),n.Ma&&(n.Ma=l),!g)break}else g?(h.splice(0,0,n),p===b&&(p=s),k=s):(h.push(n),k===b&&(k=s),p=s),d=Math.min(d,
n.xa),e=Math.max(e,n.startTime),n.Ma=f;if(g)if(0===s)break;else s--;else if(s===c.length-1)break;else s++}this.qb=h;this.Ta=d;this.Ob=e;this.zb=k;this.Gb=p;k=this.qb;p="";a=0;for(c=k.length;a<c;a++)p+='<span class="vjs-tt-cue">'+k[a].text+"</span>";this.b.innerHTML=p;this.k("cuechange")}}};t.reset=function(){this.Ta=0;this.Ob=this.c.duration();this.Gb=this.zb=0};u.Vb=u.C.extend();u.Vb.prototype.H="captions";u.dc=u.C.extend();u.dc.prototype.H="subtitles";u.Wb=u.C.extend();u.Wb.prototype.H="chapters";
u.fc=u.a.extend({h:function(a,c,d){u.a.call(this,a,c,d);if(a.j.tracks&&0<a.j.tracks.length){c=this.c;a=a.j.tracks;for(var e=0;e<a.length;e++)d=a[e],na(c,d.kind,d.label,d.language,d)}}});u.fc.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-text-track-display"})};u.Z=u.I.extend({h:function(a,c){var d=this.ea=c.track;c.label=d.label();c.selected=d.Qa();u.I.call(this,a,c);this.c.d(d.K()+"trackchange",u.bind(this,this.update))}});
u.Z.prototype.q=function(){u.I.prototype.q.call(this);oa(this.c,this.ea.T,this.ea.K())};u.Z.prototype.update=function(){this.selected(2==this.ea.mode())};u.jb=u.Z.extend({h:function(a,c){c.track={K:function(){return c.kind},m:a,label:function(){return c.kind+" off"},Qa:r(l),mode:r(l)};u.Z.call(this,a,c);this.selected(f)}});u.jb.prototype.q=function(){u.Z.prototype.q.call(this);oa(this.c,this.ea.T,this.ea.K())};
u.jb.prototype.update=function(){for(var a=this.c.textTracks(),c=0,d=a.length,e,g=f;c<d;c++)e=a[c],e.K()==this.ea.K()&&2==e.mode()&&(g=l);this.selected(g)};u.U=u.L.extend({h:function(a,c){u.L.call(this,a,c);1>=this.O.length&&this.G()}});u.U.prototype.ua=function(){var a=[],c;a.push(new u.jb(this.c,{kind:this.H}));for(var d=0;d<this.c.textTracks().length;d++)c=this.c.textTracks()[d],c.K()===this.H&&a.push(new u.Z(this.c,{track:c}));return a};
u.Fa=u.U.extend({h:function(a,c,d){u.U.call(this,a,c,d);this.b.setAttribute("aria-label","Captions Menu")}});u.Fa.prototype.H="captions";u.Fa.prototype.sa="Captions";u.Fa.prototype.className="vjs-captions-button";u.La=u.U.extend({h:function(a,c,d){u.U.call(this,a,c,d);this.b.setAttribute("aria-label","Subtitles Menu")}});u.La.prototype.H="subtitles";u.La.prototype.sa="Subtitles";u.La.prototype.className="vjs-subtitles-button";
u.Ga=u.U.extend({h:function(a,c,d){u.U.call(this,a,c,d);this.b.setAttribute("aria-label","Chapters Menu")}});t=u.Ga.prototype;t.H="chapters";t.sa="Chapters";t.className="vjs-chapters-button";t.ua=function(){for(var a=[],c,d=0;d<this.c.textTracks().length;d++)c=this.c.textTracks()[d],c.K()===this.H&&a.push(new u.Z(this.c,{track:c}));return a};
t.va=function(){for(var a=this.c.textTracks(),c=0,d=a.length,e,g,h=this.O=[];c<d;c++)if(e=a[c],e.K()==this.H&&e.Qa()){if(2>e.readyState()){this.ae=e;e.d("loaded",u.bind(this,this.va));return}g=e;break}a=this.za=new u.ga(this.c);a.ia().appendChild(u.e("li",{className:"vjs-menu-title",innerHTML:u.$(this.H),Rd:-1}));if(g){e=g.aa;for(var k,c=0,d=e.length;c<d;c++)k=e[c],k=new u.cb(this.c,{track:g,cue:k}),h.push(k),a.V(k)}0<this.O.length&&this.show();return a};
u.cb=u.I.extend({h:function(a,c){var d=this.ea=c.track,e=this.cue=c.cue,g=a.currentTime();c.label=e.text;c.selected=e.startTime<=g&&g<e.xa;u.I.call(this,a,c);d.d("cuechange",u.bind(this,this.update))}});u.cb.prototype.q=function(){u.I.prototype.q.call(this);this.c.currentTime(this.cue.startTime);this.update(this.cue.startTime)};u.cb.prototype.update=function(){var a=this.cue,c=this.c.currentTime();this.selected(a.startTime<=c&&c<a.xa)};
u.l.B(u.Ha.prototype.j.children,{subtitlesButton:{},captionsButton:{},chaptersButton:{}});
if("undefined"!==typeof window.JSON&&"function"===window.JSON.parse)u.JSON=window.JSON;else{u.JSON={};var Z=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;u.JSON.parse=function(a,c){function d(a,e){var k,p,n=a[e];if(n&&"object"===typeof n)for(k in n)Object.prototype.hasOwnProperty.call(n,k)&&(p=d(n,k),p!==b?n[k]=p:delete n[k]);return c.call(a,e,n)}var e;a=String(a);Z.lastIndex=0;Z.test(a)&&(a=a.replace(Z,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));
if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return e=eval("("+a+")"),"function"===typeof c?d({"":e},""):e;throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");}}
u.ic=function(){var a,c,d=document.getElementsByTagName("video");if(d&&0<d.length)for(var e=0,g=d.length;e<g;e++)if((c=d[e])&&c.getAttribute)c.player===b&&(a=c.getAttribute("data-setup"),a!==j&&(a=u.JSON.parse(a||"{}"),videojs(c,a)));else{u.rb();break}else u.Oc||u.rb()};u.rb=function(){setTimeout(u.ic,1)};"complete"===document.readyState?u.Oc=f:u.W(window,"load",function(){u.Oc=f});u.rb();u.Gd=function(a,c){u.Player.prototype[a]=c};var ra=this;ra.Xd=f;function $(a,c){var d=a.split("."),e=ra;!(d[0]in e)&&e.execScript&&e.execScript("var "+d[0]);for(var g;d.length&&(g=d.shift());)!d.length&&c!==b?e[g]=c:e=e[g]?e[g]:e[g]={}};$("videojs",u);$("_V_",u);$("videojs.options",u.options);$("videojs.players",u.Aa);$("videojs.TOUCH_ENABLED",u.ec);$("videojs.cache",u.ta);$("videojs.Component",u.a);u.a.prototype.player=u.a.prototype.m;u.a.prototype.options=u.a.prototype.options;u.a.prototype.init=u.a.prototype.h;u.a.prototype.dispose=u.a.prototype.dispose;u.a.prototype.createEl=u.a.prototype.e;u.a.prototype.contentEl=u.a.prototype.ia;u.a.prototype.el=u.a.prototype.w;u.a.prototype.addChild=u.a.prototype.V;
u.a.prototype.getChild=u.a.prototype.ja;u.a.prototype.getChildById=u.a.prototype.qd;u.a.prototype.children=u.a.prototype.children;u.a.prototype.initChildren=u.a.prototype.uc;u.a.prototype.removeChild=u.a.prototype.removeChild;u.a.prototype.on=u.a.prototype.d;u.a.prototype.off=u.a.prototype.p;u.a.prototype.one=u.a.prototype.W;u.a.prototype.trigger=u.a.prototype.k;u.a.prototype.triggerReady=u.a.prototype.Ea;u.a.prototype.show=u.a.prototype.show;u.a.prototype.hide=u.a.prototype.G;
u.a.prototype.width=u.a.prototype.width;u.a.prototype.height=u.a.prototype.height;u.a.prototype.dimensions=u.a.prototype.jd;u.a.prototype.ready=u.a.prototype.J;u.a.prototype.addClass=u.a.prototype.o;u.a.prototype.removeClass=u.a.prototype.r;u.a.prototype.buildCSSClass=u.a.prototype.S;u.Player.prototype.ended=u.Player.prototype.ended;$("videojs.MediaLoader",u.Xc);$("videojs.TextTrackDisplay",u.fc);$("videojs.ControlBar",u.Ha);$("videojs.Button",u.s);$("videojs.PlayToggle",u.ac);
$("videojs.FullscreenToggle",u.Ia);$("videojs.BigPlayButton",u.bb);$("videojs.LoadingSpinner",u.Zb);$("videojs.CurrentTimeDisplay",u.eb);$("videojs.DurationDisplay",u.fb);$("videojs.TimeDivider",u.gc);$("videojs.RemainingTimeDisplay",u.mb);$("videojs.LiveDisplay",u.Yb);$("videojs.ErrorDisplay",u.gb);$("videojs.Slider",u.Q);$("videojs.ProgressControl",u.lb);$("videojs.SeekBar",u.cc);$("videojs.LoadProgressBar",u.ib);$("videojs.PlayProgressBar",u.$b);$("videojs.SeekHandle",u.Ka);
$("videojs.VolumeControl",u.ob);$("videojs.VolumeBar",u.nb);$("videojs.VolumeLevel",u.hc);$("videojs.VolumeMenuButton",u.qa);$("videojs.VolumeHandle",u.pb);$("videojs.MuteToggle",u.ha);$("videojs.PosterImage",u.Ja);$("videojs.Menu",u.ga);$("videojs.MenuItem",u.I);$("videojs.MenuButton",u.L);$("videojs.PlaybackRateMenuButton",u.bc);u.L.prototype.createItems=u.L.prototype.ua;u.U.prototype.createItems=u.U.prototype.ua;u.Ga.prototype.createItems=u.Ga.prototype.ua;$("videojs.SubtitlesButton",u.La);
$("videojs.CaptionsButton",u.Fa);$("videojs.ChaptersButton",u.Ga);$("videojs.MediaTechController",u.t);u.t.prototype.features=u.t.prototype.n;u.t.prototype.n.volumeControl=u.t.prototype.n.Nc;u.t.prototype.n.fullscreenResize=u.t.prototype.n.be;u.t.prototype.n.progressEvents=u.t.prototype.n.fe;u.t.prototype.n.timeupdateEvents=u.t.prototype.n.ie;u.t.prototype.setPoster=u.t.prototype.Pb;$("videojs.Html5",u.f);u.f.Events=u.f.hb;u.f.isSupported=u.f.isSupported;u.f.canPlaySource=u.f.tb;
u.f.patchCanPlayType=u.f.zc;u.f.unpatchCanPlayType=u.f.Ud;u.f.prototype.setCurrentTime=u.f.prototype.Jd;u.f.prototype.setVolume=u.f.prototype.Pd;u.f.prototype.setMuted=u.f.prototype.Md;u.f.prototype.setPreload=u.f.prototype.Od;u.f.prototype.setAutoplay=u.f.prototype.Id;u.f.prototype.setLoop=u.f.prototype.Ld;u.f.prototype.enterFullScreen=u.f.prototype.nc;u.f.prototype.exitFullScreen=u.f.prototype.nd;u.f.prototype.playbackRate=u.f.prototype.playbackRate;u.f.prototype.setPlaybackRate=u.f.prototype.Nd;
$("videojs.Flash",u.i);u.i.isSupported=u.i.isSupported;u.i.canPlaySource=u.i.tb;u.i.onReady=u.i.onReady;$("videojs.TextTrack",u.C);u.C.prototype.label=u.C.prototype.label;u.C.prototype.kind=u.C.prototype.K;u.C.prototype.mode=u.C.prototype.mode;u.C.prototype.cues=u.C.prototype.ed;u.C.prototype.activeCues=u.C.prototype.Zc;$("videojs.CaptionsTrack",u.Vb);$("videojs.SubtitlesTrack",u.dc);$("videojs.ChaptersTrack",u.Wb);$("videojs.autoSetup",u.ic);$("videojs.plugin",u.Gd);$("videojs.createTimeRange",u.yb);
$("videojs.util",u.oa);u.oa.mergeOptions=u.oa.Jb;})();
;
/*
	BigVideo - The jQuery Plugin for Big Background Video (and Images)
	by John Polacek (@johnpolacek)

	Dual licensed under MIT and GPL.

	Dependencies: jQuery, jQuery UI (Slider), Video.js, ImagesLoaded
*/

(function (factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// Register as an anonymous AMD module:
		define([
			'jquery',
			'videojs',
			'imagesloaded',
			'jquery-ui'
		], factory);
	} else {
		factory(jQuery, videojs);
	}
})(function($, videojs) {

	$.BigVideo = function(options) {

		var defaults = {
			// If you want to use a single mp4 source, set as true
			useFlashForFirefox:true,
			// If you are doing a playlist, the video won't play the first time
			// on a touchscreen unless the play event is attached to a user click
			forceAutoplay:false,
			controls:false,
			doLoop:false,
			container:$('body'),
			shrinkable:false
		};

		var BigVideo = this,
			player,
			vidEl = '.big-video-vid',
			wrap = $('<div class="big-video-wrap"></div>'),
			video = $(''),
			mediaAspect = 16 / 9,
			vidDur = 0,
			defaultVolume = 0.8,
			isInitialized = false,
			isSeeking = false,
			isPlaying = false,
			isQueued = false,
			isAmbient = false,
			playlist = [],
			currMediaIndex,
			currMediaType;

		var settings = $.extend({}, defaults, options);
		var container = settings.container;
		var vid = container.find(vidEl);

    var settings = $.extend({}, defaults, options);

    function updateSize() {
      var containerW = settings.container.outerWidth() < $(window).width() ? settings.container.outerWidth() : $(window).width(),
        containerH = settings.container.outerHeight() < $(window).height() ? settings.container.outerHeight() : $(window).height(),
        containerAspect = containerW/containerH;

      if (settings.container.is($('body'))) {
        $('html,body').css('height',$(window).height() > $('body').css('height','auto').height() ? '100%' : 'auto');
      }

      if (containerAspect < mediaAspect) {
        // taller
        if (currMediaType == 'video') {
          vid
            .width(containerH*mediaAspect)
            .height(containerH);
          if (!settings.shrinkable) {
            $(vidEl)
              .css('top',0)
              .css('left',-(containerH*mediaAspect-containerW)/2)
              .css('height',containerH);
          } else {
            $(vidEl)
              .css('top',-(containerW/mediaAspect-containerH)/2)
              .css('left',0)
              .css('height',containerW/mediaAspect);
          }
          $(vidEl+'_html5_api')
            .css('width',containerH*mediaAspect)
            .css('height',containerH);
          $(vidEl+'_flash_api')
            .css('width',containerH*mediaAspect)
            .css('height',containerH);
        } else {
          // is image
          $('.big-video-image')
            .css({
              width: 'auto',
              height: containerH,
              top:0,
              left:-(containerH*mediaAspect-containerW)/2
            });
        }
      } else {
        // wider
        if (currMediaType == 'video') {
          vid
            .width(containerW)
            .height(containerW/mediaAspect);
          $(vidEl)
            .css('top',-(containerW/mediaAspect-containerH)/2)
            .css('left',0)
            .css('height',containerW/mediaAspect);
          $(vidEl+'_html5_api')
            .css('width',$(vidEl+'_html5_api').parent().width()+"px")
            .css('height','auto');
          $(vidEl+'_flash_api')
            .css('width',containerW)
            .css('height',containerW/mediaAspect);
        } else {
          // is image
          $('.big-video-image')
            .css({
              width: containerW,
              height: 'auto',
              top:-(containerW/mediaAspect-containerH)/2,
              left:0
            });
        }
      }
    }

		function initPlayControl() {
			// create video controls
			var markup = ''+
				'<div class="big-video-control-container">'+
					'<div class="big-video-control">'+
						'<a href="#" class="big-video-control-play"></a>'+
						'<div class="big-video-control-middle">'+
							'<div class="big-video-control-bar">'+
								'<div class="big-video-control-bound-left"></div>'+
								'<div class="big-video-control-progress"></div>'+
								'<div class="big-video-control-track"></div>'+
								'<div class="big-video-control-bound-right"></div>'+
							'</div>'+
						'</div>'+
					'	<div class="big-video-control-timer"></div>'+
					'</div>'+
				'</div>';
			settings.container.append(markup);

			// hide until playVideo
			$('.big-video-control-container').css('display','none');
			$('.big-video-control-timer').css('display','none');

			// add events
			$('.big-video-control-track').slider({
				animate: true,
				step: 0.01,
				slide: function(e,ui) {
					isSeeking = true;
					$('.big-video-control-progress').css('width',(ui.value-0.16)+'%');
					player.currentTime((ui.value/100)*player.duration());
				},
				stop:function(e,ui) {
					isSeeking = false;
					player.currentTime((ui.value/100)*player.duration());
				}
			});
			$('.big-video-control-bar').click(function(e) {
				player.currentTime((e.offsetX/$(this).width())*player.duration());
			});
			$('.big-video-control-play').click(function(e) {
				e.preventDefault();
				playControl('toggle');
			});
			player.on('timeupdate', function() {
				if (!isSeeking && (player.currentTime()/player.duration())) {
					var currTime = player.currentTime();
					var minutes = Math.floor(currTime/60);
					var seconds = Math.floor(currTime) - (60*minutes);
					if (seconds < 10) seconds='0'+seconds;
					var progress = player.currentTime()/player.duration()*100;
					$('.big-video-control-track').slider('value',progress);
					$('.big-video-control-progress').css('width',(progress-0.16)+'%');
					$('.big-video-control-timer').text(minutes+':'+seconds+'/'+vidDur);
				}
			});
		}

		function playControl(a) {
			var action = a || 'toggle';
			if (action == 'toggle') action = isPlaying ? 'pause' : 'play';
			if (action == 'pause') {
				player.pause();
				$('.big-video-control-play').css('background-position','-16px');
				isPlaying = false;

			} else if (action == 'play') {
				player.play();
				$('.big-video-control-play').css('background-position','0');
				isPlaying = true;
			} else if (action == 'skip') {
				nextMedia();
			}
		}

		function setUpAutoPlay() {
			player.play();
			settings.container.off('click',setUpAutoPlay);
		}

		function nextMedia() {
			currMediaIndex++;
			if (currMediaIndex === playlist.length) currMediaIndex=0;
			playVideo(playlist[currMediaIndex]);
		}

		function playVideo(source) {

			// clear image
			$(vidEl).css('display','block');
			currMediaType = 'video';
			player.src(source);
			isPlaying = true;
			if (isAmbient) {
				$('.big-video-control-container').css('display','none');
				player.ready(function(){
					player.volume(0);
				});
				doLoop = true;
			} else {
				$('.big-video-control-container').css('display','block');
				player.ready(function(){
					player.volume(defaultVolume);
				});
				doLoop = false;
			}
			$('.big-video-image').css('display','none');
			$(vidEl).css('display','block');
		}

		function showPoster(source) {
			// remove old image
			$('.big-video-image').remove();

			// hide video
			player.pause();
			$(vidEl).css('display','none');
			$('.big-video-control-container').css('display','none');

			// show image
			currMediaType = 'image';
			var bgImage = $('<img class="big-video-image" src='+source+' />');
			wrap.append(bgImage);

			$('.big-video-image').imagesLoaded(function() {
				mediaAspect = $('.big-video-image').width() / $('.big-video-image').height();
				updateSize();
			});
		}

		BigVideo.init = function() {
			if (!isInitialized) {
				// create player
				settings.container.prepend(wrap);
				var autoPlayString = settings.forceAutoplay ? 'autoplay' : '';
				player = $('<video class="'+vidEl.substr(1)+'" class="video-js vjs-default-skin" height="1" width="1" preload="auto" data-setup="{}" '+autoPlayString+' webkit-playsinline></video>');
				player.css('position','absolute');
				wrap.append(player);

				vid = container.find(vidEl);

				var videoTechOrder = ['html5','flash'];
				// If only using mp4s and on firefox, use flash fallback
				var ua = navigator.userAgent.toLowerCase();
				var isFirefox = ua.indexOf('firefox') != -1;
				if (settings.useFlashForFirefox && (isFirefox)) {
					videoTechOrder = ['flash', 'html5'];
				}

				player = videojs(vid[0], {
					controls:false,
					autoplay:true,
					preload:'auto',
					techOrder:videoTechOrder
				});

				// add controls
				if (settings.controls) initPlayControl();

				// set initial state
				updateSize();
				isInitialized = true;
				isPlaying = false;

				if (settings.forceAutoplay) {
					$('body').on('click', setUpAutoPlay);
				}

				$('.big-video-vid_flash_api')
					.attr('scale','noborder')
					.attr('width','100%')
					.attr('height','100%');

				// set events
				$(window).on('resize.bigvideo', function() {
					updateSize();
				});

				player.on('loadedmetadata', function(data) {
					if ($('.big-video-vid_flash_api').length > 0) {
						// use flash callback to get mediaAspect ratio
						var vidWidth = vid.width();
						var vidHeight = vid.height();
						mediaAspect = ( vidWidth / vidHeight );
						// mediaAspect = container.find('.big-video-vid_flash_api').vjs_getProperty('videoWidth')/container.find('.big-video-vid_flash_api').vjs_getProperty('videoHeight');
						// mediaAspect = container.find('.big-video-vid_flash_api').videoWidth/container.find('.big-video-vid_flash_api').videoHeight;
						// mediaAspect = player.videoWidth / player.videoHeight;
						// mediaAspect = (vid.height() / vid.height());
					} else {
						var vidWidth = vid.width();
						var vidHeight = vid.height();
						mediaAspect = ( vidWidth / vidHeight );
					}
					updateSize();
					var dur = Math.round(player.duration());
					var durMinutes = Math.floor(dur/60);
					var durSeconds = dur - durMinutes*60;
					if (durSeconds < 10) durSeconds='0'+durSeconds;
					vidDur = durMinutes+':'+durSeconds;
				});

				player.on('ended', function() {
					if (settings.doLoop) {
						player.currentTime(0);
						player.play();
					}
					if (isQueued) {
						nextMedia();
					}
				});
			}
		};

		/**
		 * Show video or image file
		 *
		 * @param source: The file to show, can be:
		 *		- an array with objects for video files types
		 *		- a string to a single video file
		 *		- a string to a image file
		 * @param options: An object with those possible attributes:
		 *		- boolean "ambient" to set video to loop
		 *		- function onShown
		 */
		BigVideo.show = function(source,options) {
			if (options === undefined) options = {};
			isAmbient = options.ambient === true;
			if (isAmbient || options.doLoop) settings.doLoop = true;

			if (typeof(source) === 'string') {
				// if input was a string, try show that image or video
				var ext = ( source.lastIndexOf('?') > 0 ) ? source.substring(source.lastIndexOf('.')+1, source.lastIndexOf('?')) : source.substring( source.lastIndexOf('.')+1);
				if (ext == 'jpg' || ext == 'gif' || ext == 'png') {
					showPoster(source);
				} else if (ext == 'mp4' || ext == 'ogg' || ext == 'ogv'|| ext == 'webm') {
					playVideo(source);
					if (options.onShown) options.onShown();
					isQueued = false;
				}
			} else if ($.isArray(source)) {
				// if the input was an array, pass it to videojs
				playVideo(source);
			} else if (typeof(source) === "object" && source.src && source.type) {
				// if the input was an object with valid attributes, wrap it in an
				// array and pass it to videojs
				playVideo([source]);
			} else {
				// fail without valid input
				throw("BigVideo.show received invalid input for parameter source");
			}
		};

		/**
		 * Show a playlist of video files
		 *
		 * @param files: array of elements to pass to BigVideo.show in sequence
		 * @param options: An object with those possible attributes:
		 *		- boolean "ambient" to set video to loop
		 *		- function onShown
		 */
		BigVideo.showPlaylist = function (files, options) {
			if (!$.isArray(files)) {
				throw("BigVideo.showPlaylist parameter files accepts only arrays");
			}

			if (options === undefined) options = {};
			isAmbient = options.ambient === true;
			if (isAmbient || options.doLoop) settings.doLoop = true;

			playlist = files;
			currMediaIndex = 0;
			this.show(playlist[currMediaIndex]);
			if (options.onShown) options.onShown();
			isQueued = true;
		};

		// Expose Video.js player
		BigVideo.getPlayer = function() {
			return player;
		};

		// Remove/dispose the player
		BigVideo.remove = BigVideo.dispose = function() {
			isInitialized = false;

			wrap.remove();
			$(window).off('resize.bigvideo');

			if(player) {
				player.off('loadedmetadata');
				player.off('ended');
				player.dispose();
			}
		};

		// Expose BigVideoJS player actions play, pause, skip (if a playlist is available)
		// Example: BigVideo.triggerPlayer('skip')
		BigVideo.triggerPlayer = function(action){
			playControl(action);
		};

		return BigVideo;
		
	};
});;
/*!
Waypoints - 3.1.1
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var n in t){var r=t[n];for(var s in this.waypoints[n]){var a,l,h,p,u,c=this.waypoints[n][s],d=c.options.offset,f=c.triggerPoint,w=0,y=null==f;c.element!==c.element.window&&(w=c.adapter.offset()[r.offsetProp]),"function"==typeof d?d=d.apply(c):"string"==typeof d&&(d=parseFloat(d),c.options.offset.indexOf("%")>-1&&(d=Math.ceil(r.contextDimension*d/100))),a=r.contextScroll-r.contextOffset,c.triggerPoint=w+a-d,l=f<r.oldScroll,h=c.triggerPoint>=r.oldScroll,p=l&&h,u=!l&&!h,!y&&p?(c.queueTrigger(r.backward),o[c.group.id]=c.group):!y&&u?(c.queueTrigger(r.forward),o[c.group.id]=c.group):y&&r.oldScroll>=c.triggerPoint&&(c.queueTrigger(r.forward),o[c.group.id]=c.group)}}for(var g in o)o[g].flushTriggers();return this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();;
/*! Lazy Load 1.9.5 - MIT license - Copyright 2010-2015 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);;
/*!
* jQuery Cycle2; version: 2.1.6 build: 20141007
* http://jquery.malsup.com/cycle2/
* Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL
*/
!function(a){"use strict";function b(a){return(a||"").toLowerCase()}var c="2.1.6";a.fn.cycle=function(c){var d;return 0!==this.length||a.isReady?this.each(function(){var d,e,f,g,h=a(this),i=a.fn.cycle.log;if(!h.data("cycle.opts")){(h.data("cycle-log")===!1||c&&c.log===!1||e&&e.log===!1)&&(i=a.noop),i("--c2 init--"),d=h.data();for(var j in d)d.hasOwnProperty(j)&&/^cycle[A-Z]+/.test(j)&&(g=d[j],f=j.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,b),i(f+":",g,"("+typeof g+")"),d[f]=g);e=a.extend({},a.fn.cycle.defaults,d,c||{}),e.timeoutId=0,e.paused=e.paused||!1,e.container=h,e._maxZ=e.maxZ,e.API=a.extend({_container:h},a.fn.cycle.API),e.API.log=i,e.API.trigger=function(a,b){return e.container.trigger(a,b),e.API},h.data("cycle.opts",e),h.data("cycle.API",e.API),e.API.trigger("cycle-bootstrap",[e,e.API]),e.API.addInitialSlides(),e.API.preInitSlideshow(),e.slides.length&&e.API.initSlideshow()}}):(d={s:this.selector,c:this.context},a.fn.cycle.log("requeuing slideshow (dom not ready)"),a(function(){a(d.s,d.c).cycle(c)}),this)},a.fn.cycle.API={opts:function(){return this._container.data("cycle.opts")},addInitialSlides:function(){var b=this.opts(),c=b.slides;b.slideCount=0,b.slides=a(),c=c.jquery?c:b.container.find(c),b.random&&c.sort(function(){return Math.random()-.5}),b.API.add(c)},preInitSlideshow:function(){var b=this.opts();b.API.trigger("cycle-pre-initialize",[b]);var c=a.fn.cycle.transitions[b.fx];c&&a.isFunction(c.preInit)&&c.preInit(b),b._preInitialized=!0},postInitSlideshow:function(){var b=this.opts();b.API.trigger("cycle-post-initialize",[b]);var c=a.fn.cycle.transitions[b.fx];c&&a.isFunction(c.postInit)&&c.postInit(b)},initSlideshow:function(){var b,c=this.opts(),d=c.container;c.API.calcFirstSlide(),"static"==c.container.css("position")&&c.container.css("position","relative"),a(c.slides[c.currSlide]).css({opacity:1,display:"block",visibility:"visible"}),c.API.stackSlides(c.slides[c.currSlide],c.slides[c.nextSlide],!c.reverse),c.pauseOnHover&&(c.pauseOnHover!==!0&&(d=a(c.pauseOnHover)),d.hover(function(){c.API.pause(!0)},function(){c.API.resume(!0)})),c.timeout&&(b=c.API.getSlideOpts(c.currSlide),c.API.queueTransition(b,b.timeout+c.delay)),c._initialized=!0,c.API.updateView(!0),c.API.trigger("cycle-initialized",[c]),c.API.postInitSlideshow()},pause:function(b){var c=this.opts(),d=c.API.getSlideOpts(),e=c.hoverPaused||c.paused;b?c.hoverPaused=!0:c.paused=!0,e||(c.container.addClass("cycle-paused"),c.API.trigger("cycle-paused",[c]).log("cycle-paused"),d.timeout&&(clearTimeout(c.timeoutId),c.timeoutId=0,c._remainingTimeout-=a.now()-c._lastQueue,(c._remainingTimeout<0||isNaN(c._remainingTimeout))&&(c._remainingTimeout=void 0)))},resume:function(a){var b=this.opts(),c=!b.hoverPaused&&!b.paused;a?b.hoverPaused=!1:b.paused=!1,c||(b.container.removeClass("cycle-paused"),0===b.slides.filter(":animated").length&&b.API.queueTransition(b.API.getSlideOpts(),b._remainingTimeout),b.API.trigger("cycle-resumed",[b,b._remainingTimeout]).log("cycle-resumed"))},add:function(b,c){var d,e=this.opts(),f=e.slideCount,g=!1;"string"==a.type(b)&&(b=a.trim(b)),a(b).each(function(){var b,d=a(this);c?e.container.prepend(d):e.container.append(d),e.slideCount++,b=e.API.buildSlideOpts(d),e.slides=c?a(d).add(e.slides):e.slides.add(d),e.API.initSlide(b,d,--e._maxZ),d.data("cycle.opts",b),e.API.trigger("cycle-slide-added",[e,b,d])}),e.API.updateView(!0),g=e._preInitialized&&2>f&&e.slideCount>=1,g&&(e._initialized?e.timeout&&(d=e.slides.length,e.nextSlide=e.reverse?d-1:1,e.timeoutId||e.API.queueTransition(e)):e.API.initSlideshow())},calcFirstSlide:function(){var a,b=this.opts();a=parseInt(b.startingSlide||0,10),(a>=b.slides.length||0>a)&&(a=0),b.currSlide=a,b.reverse?(b.nextSlide=a-1,b.nextSlide<0&&(b.nextSlide=b.slides.length-1)):(b.nextSlide=a+1,b.nextSlide==b.slides.length&&(b.nextSlide=0))},calcNextSlide:function(){var a,b=this.opts();b.reverse?(a=b.nextSlide-1<0,b.nextSlide=a?b.slideCount-1:b.nextSlide-1,b.currSlide=a?0:b.nextSlide+1):(a=b.nextSlide+1==b.slides.length,b.nextSlide=a?0:b.nextSlide+1,b.currSlide=a?b.slides.length-1:b.nextSlide-1)},calcTx:function(b,c){var d,e=b;return e._tempFx?d=a.fn.cycle.transitions[e._tempFx]:c&&e.manualFx&&(d=a.fn.cycle.transitions[e.manualFx]),d||(d=a.fn.cycle.transitions[e.fx]),e._tempFx=null,this.opts()._tempFx=null,d||(d=a.fn.cycle.transitions.fade,e.API.log('Transition "'+e.fx+'" not found.  Using fade.')),d},prepareTx:function(a,b){var c,d,e,f,g,h=this.opts();return h.slideCount<2?void(h.timeoutId=0):(!a||h.busy&&!h.manualTrump||(h.API.stopTransition(),h.busy=!1,clearTimeout(h.timeoutId),h.timeoutId=0),void(h.busy||(0!==h.timeoutId||a)&&(d=h.slides[h.currSlide],e=h.slides[h.nextSlide],f=h.API.getSlideOpts(h.nextSlide),g=h.API.calcTx(f,a),h._tx=g,a&&void 0!==f.manualSpeed&&(f.speed=f.manualSpeed),h.nextSlide!=h.currSlide&&(a||!h.paused&&!h.hoverPaused&&h.timeout)?(h.API.trigger("cycle-before",[f,d,e,b]),g.before&&g.before(f,d,e,b),c=function(){h.busy=!1,h.container.data("cycle.opts")&&(g.after&&g.after(f,d,e,b),h.API.trigger("cycle-after",[f,d,e,b]),h.API.queueTransition(f),h.API.updateView(!0))},h.busy=!0,g.transition?g.transition(f,d,e,b,c):h.API.doTransition(f,d,e,b,c),h.API.calcNextSlide(),h.API.updateView()):h.API.queueTransition(f))))},doTransition:function(b,c,d,e,f){var g=b,h=a(c),i=a(d),j=function(){i.animate(g.animIn||{opacity:1},g.speed,g.easeIn||g.easing,f)};i.css(g.cssBefore||{}),h.animate(g.animOut||{},g.speed,g.easeOut||g.easing,function(){h.css(g.cssAfter||{}),g.sync||j()}),g.sync&&j()},queueTransition:function(b,c){var d=this.opts(),e=void 0!==c?c:b.timeout;return 0===d.nextSlide&&0===--d.loop?(d.API.log("terminating; loop=0"),d.timeout=0,e?setTimeout(function(){d.API.trigger("cycle-finished",[d])},e):d.API.trigger("cycle-finished",[d]),void(d.nextSlide=d.currSlide)):void 0!==d.continueAuto&&(d.continueAuto===!1||a.isFunction(d.continueAuto)&&d.continueAuto()===!1)?(d.API.log("terminating automatic transitions"),d.timeout=0,void(d.timeoutId&&clearTimeout(d.timeoutId))):void(e&&(d._lastQueue=a.now(),void 0===c&&(d._remainingTimeout=b.timeout),d.paused||d.hoverPaused||(d.timeoutId=setTimeout(function(){d.API.prepareTx(!1,!d.reverse)},e))))},stopTransition:function(){var a=this.opts();a.slides.filter(":animated").length&&(a.slides.stop(!1,!0),a.API.trigger("cycle-transition-stopped",[a])),a._tx&&a._tx.stopTransition&&a._tx.stopTransition(a)},advanceSlide:function(a){var b=this.opts();return clearTimeout(b.timeoutId),b.timeoutId=0,b.nextSlide=b.currSlide+a,b.nextSlide<0?b.nextSlide=b.slides.length-1:b.nextSlide>=b.slides.length&&(b.nextSlide=0),b.API.prepareTx(!0,a>=0),!1},buildSlideOpts:function(c){var d,e,f=this.opts(),g=c.data()||{};for(var h in g)g.hasOwnProperty(h)&&/^cycle[A-Z]+/.test(h)&&(d=g[h],e=h.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,b),f.API.log("["+(f.slideCount-1)+"]",e+":",d,"("+typeof d+")"),g[e]=d);g=a.extend({},a.fn.cycle.defaults,f,g),g.slideNum=f.slideCount;try{delete g.API,delete g.slideCount,delete g.currSlide,delete g.nextSlide,delete g.slides}catch(i){}return g},getSlideOpts:function(b){var c=this.opts();void 0===b&&(b=c.currSlide);var d=c.slides[b],e=a(d).data("cycle.opts");return a.extend({},c,e)},initSlide:function(b,c,d){var e=this.opts();c.css(b.slideCss||{}),d>0&&c.css("zIndex",d),isNaN(b.speed)&&(b.speed=a.fx.speeds[b.speed]||a.fx.speeds._default),b.sync||(b.speed=b.speed/2),c.addClass(e.slideClass)},updateView:function(a,b){var c=this.opts();if(c._initialized){var d=c.API.getSlideOpts(),e=c.slides[c.currSlide];!a&&b!==!0&&(c.API.trigger("cycle-update-view-before",[c,d,e]),c.updateView<0)||(c.slideActiveClass&&c.slides.removeClass(c.slideActiveClass).eq(c.currSlide).addClass(c.slideActiveClass),a&&c.hideNonActive&&c.slides.filter(":not(."+c.slideActiveClass+")").css("visibility","hidden"),0===c.updateView&&setTimeout(function(){c.API.trigger("cycle-update-view",[c,d,e,a])},d.speed/(c.sync?2:1)),0!==c.updateView&&c.API.trigger("cycle-update-view",[c,d,e,a]),a&&c.API.trigger("cycle-update-view-after",[c,d,e]))}},getComponent:function(b){var c=this.opts(),d=c[b];return"string"==typeof d?/^\s*[\>|\+|~]/.test(d)?c.container.find(d):a(d):d.jquery?d:a(d)},stackSlides:function(b,c,d){var e=this.opts();b||(b=e.slides[e.currSlide],c=e.slides[e.nextSlide],d=!e.reverse),a(b).css("zIndex",e.maxZ);var f,g=e.maxZ-2,h=e.slideCount;if(d){for(f=e.currSlide+1;h>f;f++)a(e.slides[f]).css("zIndex",g--);for(f=0;f<e.currSlide;f++)a(e.slides[f]).css("zIndex",g--)}else{for(f=e.currSlide-1;f>=0;f--)a(e.slides[f]).css("zIndex",g--);for(f=h-1;f>e.currSlide;f--)a(e.slides[f]).css("zIndex",g--)}a(c).css("zIndex",e.maxZ-1)},getSlideIndex:function(a){return this.opts().slides.index(a)}},a.fn.cycle.log=function(){window.console&&console.log&&console.log("[cycle2] "+Array.prototype.join.call(arguments," "))},a.fn.cycle.version=function(){return"Cycle2: "+c},a.fn.cycle.transitions={custom:{},none:{before:function(a,b,c,d){a.API.stackSlides(c,b,d),a.cssBefore={opacity:1,visibility:"visible",display:"block"}}},fade:{before:function(b,c,d,e){var f=b.API.getSlideOpts(b.nextSlide).slideCss||{};b.API.stackSlides(c,d,e),b.cssBefore=a.extend(f,{opacity:0,visibility:"visible",display:"block"}),b.animIn={opacity:1},b.animOut={opacity:0}}},fadeout:{before:function(b,c,d,e){var f=b.API.getSlideOpts(b.nextSlide).slideCss||{};b.API.stackSlides(c,d,e),b.cssBefore=a.extend(f,{opacity:1,visibility:"visible",display:"block"}),b.animOut={opacity:0}}},scrollHorz:{before:function(a,b,c,d){a.API.stackSlides(b,c,d);var e=a.container.css("overflow","hidden").width();a.cssBefore={left:d?e:-e,top:0,opacity:1,visibility:"visible",display:"block"},a.cssAfter={zIndex:a._maxZ-2,left:0},a.animIn={left:0},a.animOut={left:d?-e:e}}}},a.fn.cycle.defaults={allowWrap:!0,autoSelector:".cycle-slideshow[data-cycle-auto-init!=false]",delay:0,easing:null,fx:"fade",hideNonActive:!0,loop:0,manualFx:void 0,manualSpeed:void 0,manualTrump:!0,maxZ:100,pauseOnHover:!1,reverse:!1,slideActiveClass:"cycle-slide-active",slideClass:"cycle-slide",slideCss:{position:"absolute",top:0,left:0},slides:"> img",speed:500,startingSlide:0,sync:!0,timeout:4e3,updateView:0},a(document).ready(function(){a(a.fn.cycle.defaults.autoSelector).cycle()})}(jQuery),/*! Cycle2 autoheight plugin; Copyright (c) M.Alsup, 2012; version: 20130913 */
function(a){"use strict";function b(b,d){var e,f,g,h=d.autoHeight;if("container"==h)f=a(d.slides[d.currSlide]).outerHeight(),d.container.height(f);else if(d._autoHeightRatio)d.container.height(d.container.width()/d._autoHeightRatio);else if("calc"===h||"number"==a.type(h)&&h>=0){if(g="calc"===h?c(b,d):h>=d.slides.length?0:h,g==d._sentinelIndex)return;d._sentinelIndex=g,d._sentinel&&d._sentinel.remove(),e=a(d.slides[g].cloneNode(!0)),e.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"),e.css({position:"static",visibility:"hidden",display:"block"}).prependTo(d.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"),e.find("*").css("visibility","hidden"),d._sentinel=e}}function c(b,c){var d=0,e=-1;return c.slides.each(function(b){var c=a(this).height();c>e&&(e=c,d=b)}),d}function d(b,c,d,e){var f=a(e).outerHeight();c.container.animate({height:f},c.autoHeightSpeed,c.autoHeightEasing)}function e(c,f){f._autoHeightOnResize&&(a(window).off("resize orientationchange",f._autoHeightOnResize),f._autoHeightOnResize=null),f.container.off("cycle-slide-added cycle-slide-removed",b),f.container.off("cycle-destroyed",e),f.container.off("cycle-before",d),f._sentinel&&(f._sentinel.remove(),f._sentinel=null)}a.extend(a.fn.cycle.defaults,{autoHeight:0,autoHeightSpeed:250,autoHeightEasing:null}),a(document).on("cycle-initialized",function(c,f){function g(){b(c,f)}var h,i=f.autoHeight,j=a.type(i),k=null;("string"===j||"number"===j)&&(f.container.on("cycle-slide-added cycle-slide-removed",b),f.container.on("cycle-destroyed",e),"container"==i?f.container.on("cycle-before",d):"string"===j&&/\d+\:\d+/.test(i)&&(h=i.match(/(\d+)\:(\d+)/),h=h[1]/h[2],f._autoHeightRatio=h),"number"!==j&&(f._autoHeightOnResize=function(){clearTimeout(k),k=setTimeout(g,50)},a(window).on("resize orientationchange",f._autoHeightOnResize)),setTimeout(g,30))})}(jQuery),/*! caption plugin for Cycle2;  version: 20130306 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{caption:"> .cycle-caption",captionTemplate:"{{slideNum}} / {{slideCount}}",overlay:"> .cycle-overlay",overlayTemplate:"<div>{{title}}</div><div>{{desc}}</div>",captionModule:"caption"}),a(document).on("cycle-update-view",function(b,c,d,e){if("caption"===c.captionModule){a.each(["caption","overlay"],function(){var a=this,b=d[a+"Template"],f=c.API.getComponent(a);f.length&&b?(f.html(c.API.tmpl(b,d,c,e)),f.show()):f.hide()})}}),a(document).on("cycle-destroyed",function(b,c){var d;a.each(["caption","overlay"],function(){var a=this,b=c[a+"Template"];c[a]&&b&&(d=c.API.getComponent("caption"),d.empty())})})}(jQuery),/*! command plugin for Cycle2;  version: 20140415 */
function(a){"use strict";var b=a.fn.cycle;a.fn.cycle=function(c){var d,e,f,g=a.makeArray(arguments);return"number"==a.type(c)?this.cycle("goto",c):"string"==a.type(c)?this.each(function(){var h;return d=c,f=a(this).data("cycle.opts"),void 0===f?void b.log('slideshow must be initialized before sending commands; "'+d+'" ignored'):(d="goto"==d?"jump":d,e=f.API[d],a.isFunction(e)?(h=a.makeArray(g),h.shift(),e.apply(f.API,h)):void b.log("unknown command: ",d))}):b.apply(this,arguments)},a.extend(a.fn.cycle,b),a.extend(b.API,{next:function(){var a=this.opts();if(!a.busy||a.manualTrump){var b=a.reverse?-1:1;a.allowWrap===!1&&a.currSlide+b>=a.slideCount||(a.API.advanceSlide(b),a.API.trigger("cycle-next",[a]).log("cycle-next"))}},prev:function(){var a=this.opts();if(!a.busy||a.manualTrump){var b=a.reverse?1:-1;a.allowWrap===!1&&a.currSlide+b<0||(a.API.advanceSlide(b),a.API.trigger("cycle-prev",[a]).log("cycle-prev"))}},destroy:function(){this.stop();var b=this.opts(),c=a.isFunction(a._data)?a._data:a.noop;clearTimeout(b.timeoutId),b.timeoutId=0,b.API.stop(),b.API.trigger("cycle-destroyed",[b]).log("cycle-destroyed"),b.container.removeData(),c(b.container[0],"parsedAttrs",!1),b.retainStylesOnDestroy||(b.container.removeAttr("style"),b.slides.removeAttr("style"),b.slides.removeClass(b.slideActiveClass)),b.slides.each(function(){var d=a(this);d.removeData(),d.removeClass(b.slideClass),c(this,"parsedAttrs",!1)})},jump:function(a,b){var c,d=this.opts();if(!d.busy||d.manualTrump){var e=parseInt(a,10);if(isNaN(e)||0>e||e>=d.slides.length)return void d.API.log("goto: invalid slide index: "+e);if(e==d.currSlide)return void d.API.log("goto: skipping, already on slide",e);d.nextSlide=e,clearTimeout(d.timeoutId),d.timeoutId=0,d.API.log("goto: ",e," (zero-index)"),c=d.currSlide<d.nextSlide,d._tempFx=b,d.API.prepareTx(!0,c)}},stop:function(){var b=this.opts(),c=b.container;clearTimeout(b.timeoutId),b.timeoutId=0,b.API.stopTransition(),b.pauseOnHover&&(b.pauseOnHover!==!0&&(c=a(b.pauseOnHover)),c.off("mouseenter mouseleave")),b.API.trigger("cycle-stopped",[b]).log("cycle-stopped")},reinit:function(){var a=this.opts();a.API.destroy(),a.container.cycle()},remove:function(b){for(var c,d,e=this.opts(),f=[],g=1,h=0;h<e.slides.length;h++)c=e.slides[h],h==b?d=c:(f.push(c),a(c).data("cycle.opts").slideNum=g,g++);d&&(e.slides=a(f),e.slideCount--,a(d).remove(),b==e.currSlide?e.API.advanceSlide(1):b<e.currSlide?e.currSlide--:e.currSlide++,e.API.trigger("cycle-slide-removed",[e,b,d]).log("cycle-slide-removed"),e.API.updateView())}}),a(document).on("click.cycle","[data-cycle-cmd]",function(b){b.preventDefault();var c=a(this),d=c.data("cycle-cmd"),e=c.data("cycle-context")||".cycle-slideshow";a(e).cycle(d,c.data("cycle-arg"))})}(jQuery),/*! hash plugin for Cycle2;  version: 20130905 */
function(a){"use strict";function b(b,c){var d;return b._hashFence?void(b._hashFence=!1):(d=window.location.hash.substring(1),void b.slides.each(function(e){if(a(this).data("cycle-hash")==d){if(c===!0)b.startingSlide=e;else{var f=b.currSlide<e;b.nextSlide=e,b.API.prepareTx(!0,f)}return!1}}))}a(document).on("cycle-pre-initialize",function(c,d){b(d,!0),d._onHashChange=function(){b(d,!1)},a(window).on("hashchange",d._onHashChange)}),a(document).on("cycle-update-view",function(a,b,c){c.hash&&"#"+c.hash!=window.location.hash&&(b._hashFence=!0,window.location.hash=c.hash)}),a(document).on("cycle-destroyed",function(b,c){c._onHashChange&&a(window).off("hashchange",c._onHashChange)})}(jQuery),/*! loader plugin for Cycle2;  version: 20131121 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{loader:!1}),a(document).on("cycle-bootstrap",function(b,c){function d(b,d){function f(b){var f;"wait"==c.loader?(h.push(b),0===j&&(h.sort(g),e.apply(c.API,[h,d]),c.container.removeClass("cycle-loading"))):(f=a(c.slides[c.currSlide]),e.apply(c.API,[b,d]),f.show(),c.container.removeClass("cycle-loading"))}function g(a,b){return a.data("index")-b.data("index")}var h=[];if("string"==a.type(b))b=a.trim(b);else if("array"===a.type(b))for(var i=0;i<b.length;i++)b[i]=a(b[i])[0];b=a(b);var j=b.length;j&&(b.css("visibility","hidden").appendTo("body").each(function(b){function g(){0===--i&&(--j,f(k))}var i=0,k=a(this),l=k.is("img")?k:k.find("img");return k.data("index",b),l=l.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])'),l.length?(i=l.length,void l.each(function(){this.complete?g():a(this).load(function(){g()}).on("error",function(){0===--i&&(c.API.log("slide skipped; img not loaded:",this.src),0===--j&&"wait"==c.loader&&e.apply(c.API,[h,d]))})})):(--j,void h.push(k))}),j&&c.container.addClass("cycle-loading"))}var e;c.loader&&(e=c.API.add,c.API.add=d)})}(jQuery),/*! pager plugin for Cycle2;  version: 20140415 */
function(a){"use strict";function b(b,c,d){var e,f=b.API.getComponent("pager");f.each(function(){var f=a(this);if(c.pagerTemplate){var g=b.API.tmpl(c.pagerTemplate,c,b,d[0]);e=a(g).appendTo(f)}else e=f.children().eq(b.slideCount-1);e.on(b.pagerEvent,function(a){b.pagerEventBubble||a.preventDefault(),b.API.page(f,a.currentTarget)})})}function c(a,b){var c=this.opts();if(!c.busy||c.manualTrump){var d=a.children().index(b),e=d,f=c.currSlide<e;c.currSlide!=e&&(c.nextSlide=e,c._tempFx=c.pagerFx,c.API.prepareTx(!0,f),c.API.trigger("cycle-pager-activated",[c,a,b]))}}a.extend(a.fn.cycle.defaults,{pager:"> .cycle-pager",pagerActiveClass:"cycle-pager-active",pagerEvent:"click.cycle",pagerEventBubble:void 0,pagerTemplate:"<span>&bull;</span>"}),a(document).on("cycle-bootstrap",function(a,c,d){d.buildPagerLink=b}),a(document).on("cycle-slide-added",function(a,b,d,e){b.pager&&(b.API.buildPagerLink(b,d,e),b.API.page=c)}),a(document).on("cycle-slide-removed",function(b,c,d){if(c.pager){var e=c.API.getComponent("pager");e.each(function(){var b=a(this);a(b.children()[d]).remove()})}}),a(document).on("cycle-update-view",function(b,c){var d;c.pager&&(d=c.API.getComponent("pager"),d.each(function(){a(this).children().removeClass(c.pagerActiveClass).eq(c.currSlide).addClass(c.pagerActiveClass)}))}),a(document).on("cycle-destroyed",function(a,b){var c=b.API.getComponent("pager");c&&(c.children().off(b.pagerEvent),b.pagerTemplate&&c.empty())})}(jQuery),/*! prevnext plugin for Cycle2;  version: 20140408 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{next:"> .cycle-next",nextEvent:"click.cycle",disabledClass:"disabled",prev:"> .cycle-prev",prevEvent:"click.cycle",swipe:!1}),a(document).on("cycle-initialized",function(a,b){if(b.API.getComponent("next").on(b.nextEvent,function(a){a.preventDefault(),b.API.next()}),b.API.getComponent("prev").on(b.prevEvent,function(a){a.preventDefault(),b.API.prev()}),b.swipe){var c=b.swipeVert?"swipeUp.cycle":"swipeLeft.cycle swipeleft.cycle",d=b.swipeVert?"swipeDown.cycle":"swipeRight.cycle swiperight.cycle";b.container.on(c,function(){b._tempFx=b.swipeFx,b.API.next()}),b.container.on(d,function(){b._tempFx=b.swipeFx,b.API.prev()})}}),a(document).on("cycle-update-view",function(a,b){if(!b.allowWrap){var c=b.disabledClass,d=b.API.getComponent("next"),e=b.API.getComponent("prev"),f=b._prevBoundry||0,g=void 0!==b._nextBoundry?b._nextBoundry:b.slideCount-1;b.currSlide==g?d.addClass(c).prop("disabled",!0):d.removeClass(c).prop("disabled",!1),b.currSlide===f?e.addClass(c).prop("disabled",!0):e.removeClass(c).prop("disabled",!1)}}),a(document).on("cycle-destroyed",function(a,b){b.API.getComponent("prev").off(b.nextEvent),b.API.getComponent("next").off(b.prevEvent),b.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")})}(jQuery),/*! progressive loader plugin for Cycle2;  version: 20130315 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{progressive:!1}),a(document).on("cycle-pre-initialize",function(b,c){if(c.progressive){var d,e,f=c.API,g=f.next,h=f.prev,i=f.prepareTx,j=a.type(c.progressive);if("array"==j)d=c.progressive;else if(a.isFunction(c.progressive))d=c.progressive(c);else if("string"==j){if(e=a(c.progressive),d=a.trim(e.html()),!d)return;if(/^(\[)/.test(d))try{d=a.parseJSON(d)}catch(k){return void f.log("error parsing progressive slides",k)}else d=d.split(new RegExp(e.data("cycle-split")||"\n")),d[d.length-1]||d.pop()}i&&(f.prepareTx=function(a,b){var e,f;return a||0===d.length?void i.apply(c.API,[a,b]):void(b&&c.currSlide==c.slideCount-1?(f=d[0],d=d.slice(1),c.container.one("cycle-slide-added",function(a,b){setTimeout(function(){b.API.advanceSlide(1)},50)}),c.API.add(f)):b||0!==c.currSlide?i.apply(c.API,[a,b]):(e=d.length-1,f=d[e],d=d.slice(0,e),c.container.one("cycle-slide-added",function(a,b){setTimeout(function(){b.currSlide=1,b.API.advanceSlide(-1)},50)}),c.API.add(f,!0)))}),g&&(f.next=function(){var a=this.opts();if(d.length&&a.currSlide==a.slideCount-1){var b=d[0];d=d.slice(1),a.container.one("cycle-slide-added",function(a,b){g.apply(b.API),b.container.removeClass("cycle-loading")}),a.container.addClass("cycle-loading"),a.API.add(b)}else g.apply(a.API)}),h&&(f.prev=function(){var a=this.opts();if(d.length&&0===a.currSlide){var b=d.length-1,c=d[b];d=d.slice(0,b),a.container.one("cycle-slide-added",function(a,b){b.currSlide=1,b.API.advanceSlide(-1),b.container.removeClass("cycle-loading")}),a.container.addClass("cycle-loading"),a.API.add(c,!0)}else h.apply(a.API)})}})}(jQuery),/*! tmpl plugin for Cycle2;  version: 20121227 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{tmplRegex:"{{((.)?.*?)}}"}),a.extend(a.fn.cycle.API,{tmpl:function(b,c){var d=new RegExp(c.tmplRegex||a.fn.cycle.defaults.tmplRegex,"g"),e=a.makeArray(arguments);return e.shift(),b.replace(d,function(b,c){var d,f,g,h,i=c.split(".");for(d=0;d<e.length;d++)if(g=e[d]){if(i.length>1)for(h=g,f=0;f<i.length;f++)g=h,h=h[i[f]]||c;else h=g[c];if(a.isFunction(h))return h.apply(g,e);if(void 0!==h&&null!==h&&h!=c)return h}return c})}})}(jQuery);
;
!function(t){"use strict";var s=function(s,o){this.el=t(s),this.options=t.extend({},t.fn.typed.defaults,o),this.isInput=this.el.is("input"),this.attr=this.options.attr,this.showCursor=this.isInput?!1:this.options.showCursor,this.elContent=this.attr?this.el.attr(this.attr):this.el.text(),this.contentType=this.options.contentType,this.typeSpeed=this.options.typeSpeed,this.startDelay=this.options.startDelay,this.backSpeed=this.options.backSpeed,this.backDelay=this.options.backDelay,this.strings=this.options.strings,this.strPos=0,this.arrayPos=0,this.stopNum=0,this.loop=this.options.loop,this.loopCount=this.options.loopCount,this.curLoop=0,this.stop=!1,this.cursorChar=this.options.cursorChar,this.build()};s.prototype={constructor:s,init:function(){var t=this;t.timeout=setTimeout(function(){t.typewrite(t.strings[t.arrayPos],t.strPos)},t.startDelay)},build:function(){this.showCursor===!0&&(this.cursor=t('<span class="typed-cursor">'+this.cursorChar+"</span>"),this.el.after(this.cursor)),this.init()},typewrite:function(t,s){if(this.stop!==!0){var o=Math.round(70*Math.random())+this.typeSpeed,e=this;e.timeout=setTimeout(function(){var o=0,i=t.substr(s);if("^"===i.charAt(0)){var r=1;/^\^\d+/.test(i)&&(i=/\d+/.exec(i)[0],r+=i.length,o=parseInt(i)),t=t.substring(0,s)+t.substring(s+r)}if("html"===e.contentType){var n=t.substr(s).charAt(0);if("<"===n||"&"===n){var a="",h="";for(h="<"===n?">":";";t.substr(s).charAt(0)!==h;)a+=t.substr(s).charAt(0),s++;s++,a+=h}}e.timeout=setTimeout(function(){if(s===t.length){if(e.options.onStringTyped(e.arrayPos),e.arrayPos===e.strings.length-1&&(e.options.callback(),e.curLoop++,e.loop===!1||e.curLoop===e.loopCount))return;e.timeout=setTimeout(function(){e.backspace(t,s)},e.backDelay)}else{0===s&&e.options.preStringTyped(e.arrayPos);var o=t.substr(0,s+1);e.attr?e.el.attr(e.attr,o):e.isInput?e.el.val(o):"html"===e.contentType?e.el.html(o):e.el.text(o),s++,e.typewrite(t,s)}},o)},o)}},backspace:function(t,s){if(this.stop!==!0){var o=Math.round(70*Math.random())+this.backSpeed,e=this;e.timeout=setTimeout(function(){if("html"===e.contentType&&">"===t.substr(s).charAt(0)){for(var o="";"<"!==t.substr(s).charAt(0);)o-=t.substr(s).charAt(0),s--;s--,o+="<"}var i=t.substr(0,s);e.attr?e.el.attr(e.attr,i):e.isInput?e.el.val(i):"html"===e.contentType?e.el.html(i):e.el.text(i),s>e.stopNum?(s--,e.backspace(t,s)):s<=e.stopNum&&(e.arrayPos++,e.arrayPos===e.strings.length?(e.arrayPos=0,e.init()):e.typewrite(e.strings[e.arrayPos],s))},o)}},reset:function(){var t=this;clearInterval(t.timeout);var s=this.el.attr("id");this.el.after('<span id="'+s+'"/>'),this.el.remove(),"undefined"!=typeof this.cursor&&this.cursor.remove(),t.options.resetCallback()}},t.fn.typed=function(o){return this.each(function(){var e=t(this),i=e.data("typed"),r="object"==typeof o&&o;i||e.data("typed",i=new s(this,r)),"string"==typeof o&&i[o]()})},t.fn.typed.defaults={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],typeSpeed:0,startDelay:0,backSpeed:0,backDelay:500,loop:!1,loopCount:!1,showCursor:!0,cursorChar:"|",attr:null,contentType:"html",callback:function(){},preStringTyped:function(){},onStringTyped:function(){},resetCallback:function(){}}}(window.jQuery);;
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */

!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,g,h,e=this;if(e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="previous">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="next">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button" data-role="none">'+(b+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.hidden="hidden",e.paused=!1,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,f,d),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,g=e.options.responsive||null,g&&g.length>-1){e.respondTo=e.options.respondTo||"window";for(h in g)g.hasOwnProperty(h)&&(e.breakpoints.push(g[h].breakpoint),e.breakpointSettings[g[h].breakpoint]=g[h].settings);e.breakpoints.sort(function(a,b){return e.options.mobileFirst===!0?a-b:b-a})}"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.msHidden?(e.hidden="msHidden",e.visibilityChange="msvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.init(),e.checkResponsive(!0)}var b=0;return c}(),b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),d[e.animType]=e.options.vertical===!1?"translate3d("+b+"px, 0px, 0px)":"translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.asNavFor=function(b){var c=this,d=null!==c.options.asNavFor?a(c.options.asNavFor).slick("getSlick"):null;null!==d&&d.slideHandler(b,!0)},b.prototype.applyTransition=function(a){var b=this,c={};c[b.transitionType]=b.options.fade===!1?b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:"opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(0===a.currentSlide-1&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow=a(b.options.prevArrow),b.$nextArrow=a(b.options.nextArrow),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.appendTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled"))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="'+b.options.dotsClass+'">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),b.$slidesCache=b.$slides,b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.options.accessibility===!0&&b.$list.prop("tabIndex",0),b.setSlideClasses("number"==typeof this.currentSlide?this.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.html(e),a.$slider.children().children().children().width(100/a.options.slidesPerRow+"%").css({display:"inline-block"})}},b.prototype.checkResponsive=function(b){var d,e,f,c=this,g=c.$slider.width(),h=window.innerWidth||a(window).width();if("window"===c.respondTo?f=h:"slider"===c.respondTo?f=g:"min"===c.respondTo&&(f=Math.min(h,g)),c.originalSettings.responsive&&c.originalSettings.responsive.length>-1&&null!==c.originalSettings.responsive){e=null;for(d in c.breakpoints)c.breakpoints.hasOwnProperty(d)&&(c.originalSettings.mobileFirst===!1?f<c.breakpoints[d]&&(e=c.breakpoints[d]):f>c.breakpoints[d]&&(e=c.breakpoints[d]));null!==e?null!==c.activeBreakpoint?e!==c.activeBreakpoint&&(c.activeBreakpoint=e,"unslick"===c.breakpointSettings[e]?c.unslick():(c.options=a.extend({},c.originalSettings,c.breakpointSettings[e]),b===!0&&(c.currentSlide=c.options.initialSlide),c.refresh())):(c.activeBreakpoint=e,"unslick"===c.breakpointSettings[e]?c.unslick():(c.options=a.extend({},c.originalSettings,c.breakpointSettings[e]),b===!0&&(c.currentSlide=c.options.initialSlide),c.refresh())):null!==c.activeBreakpoint&&(c.activeBreakpoint=null,c.options=c.originalSettings,b===!0&&(c.currentSlide=c.options.initialSlide),c.refresh())}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.target);switch(e.is("a")&&b.preventDefault(),h=0!==d.slideCount%d.options.slidesToScroll,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||a(b.target).parent().index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c);break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).off("click.slick",b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).off("mouseenter.slick",b.setPaused.bind(b,!0)).off("mouseleave.slick",b.setPaused.bind(b,!1)),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),b.options.autoplay===!0&&a(document).off(b.visibilityChange,b.visibility),b.$list.off("mouseenter.slick",b.setPaused.bind(b,!0)),b.$list.off("mouseleave.slick",b.setPaused.bind(b,!1)),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.html(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(){var b=this;b.autoPlayClear(),b.touchObject={},b.cleanUpEvents(),a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&"object"!=typeof b.options.prevArrow&&b.$prevArrow.remove(),b.$nextArrow&&"object"!=typeof b.options.nextArrow&&b.$nextArrow.remove(),b.$slides&&(b.$slides.removeClass("slick-slide slick-active slick-center slick-visible").attr("aria-hidden","true").removeAttr("data-slick-index").css({position:"",left:"",top:"",zIndex:"",opacity:"",width:""}),b.$slider.html(b.$slides)),b.cleanUpRows(),b.$slider.removeClass("slick-slider"),b.$slider.removeClass("slick-initialized")},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:1e3}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:1e3}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)d=Math.ceil(a.slideCount/a.options.slidesToScroll);else if(a.options.centerMode===!0)d=a.slideCount;else for(;b<a.slideCount;)++d,b=c+a.options.slidesToShow,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=-1*b.slideWidth*b.options.slidesToShow,e=-1*d*b.options.slidesToShow),0!==b.slideCount%b.options.slidesToScroll&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=-1*(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth,e=-1*(b.options.slidesToShow-(a-b.slideCount))*d):(b.slideOffset=-1*b.slideCount%b.options.slidesToScroll*b.slideWidth,e=-1*b.slideCount%b.options.slidesToScroll*d))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?-1*a*b.slideWidth+b.slideOffset:-1*a*d+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?(e=a.slideCount-a.options.slidesToShow+1,a.options.centerMode===!0&&(e=a.slideCount)):(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(){var b=this;a(b.$slider).hasClass("slick-initialized")||(a(b.$slider).addClass("slick-initialized"),b.buildRows(),b.buildOut(),b.setProps(),b.startLoad(),b.loadSlider(),b.initializeEvents(),b.updateArrows(),b.updateDots()),b.$slider.trigger("init",[b])},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",b.setPaused.bind(b,!0)).on("mouseleave.slick",b.setPaused.bind(b,!1))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),b.options.autoplay===!0&&a(document).on(b.visibilityChange,b.visibility.bind(b)),b.$list.on("mouseenter.slick",b.setPaused.bind(b,!0)),b.$list.on("mouseleave.slick",b.setPaused.bind(b,!1)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange.bind(b)),a(window).on("resize.slick.slick-"+b.instanceUid,b.resize.bind(b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:"next"}})},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy"),d=document.createElement("img");d.onload=function(){b.animate({opacity:1},200)},d.src=c,b.css({opacity:0}).attr("src",c).removeAttr("data-lazy").removeClass("slick-loading")})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow,b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.paused=!1,a.autoPlay()},b.prototype.postSlide=function(a){var b=this;b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay()},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]",b.$slider).length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad(),b.options.adaptiveHeight===!0&&b.setPosition()}).error(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(){var b=this,c=b.currentSlide;b.destroy(),a.extend(b,b.initials),b.init(),b.changeSlide({data:{message:"index",index:c}},!1)},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses(0),b.setPosition(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,d.reinit(),void 0)},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=-1*b.slideWidth*d,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:800,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:800,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:900,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(a,b,c){var d=this;d.options[a]=b,c===!0&&(d.unload(),d.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;b.$slider.find(".slick-slide").removeClass("slick-active").attr("aria-hidden","true").removeClass("slick-center"),d=b.$slider.find(".slick-slide"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.setPaused=function(a){var b=this;b.options.autoplay===!0&&b.options.pauseOnHover===!0&&(b.paused=a,b.autoPlayClear())},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.$slider.find(".slick-slide").removeClass("slick-active").attr("aria-hidden","true"),c.$slides.eq(e).addClass("slick-active").attr("aria-hidden","false"),c.options.centerMode===!0&&(c.$slider.find(".slick-slide").removeClass("slick-center"),c.$slides.eq(e).addClass("slick-center")),c.asNavFor(e),void 0):(c.slideHandler(e),void 0)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d)),void 0):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d)),void 0):(i.options.autoplay===!0&&clearInterval(i.autoPlayTimer),e=0>d?0!==i.slideCount%i.options.slidesToScroll?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?0!==i.slideCount%i.options.slidesToScroll?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?i.fadeSlide(e,function(){i.postSlide(e)}):i.postSlide(e),i.animateHeight(),void 0):(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e),void 0)))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"left":"right":"vertical"},b.prototype.swipeEnd=function(){var c,b=this;if(b.dragging=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe)switch(b.swipeDirection()){case"left":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.slideHandler(c),b.currentDirection=0,b.touchObject={},b.$slider.trigger("swipe",[b,"left"]);break;case"right":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.slideHandler(c),b.currentDirection=1,b.touchObject={},b.$slider.trigger("swipe",[b,"right"])}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;
if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.swipeLeft=b.options.vertical===!1?d+f*g:d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):(b.setCSS(b.swipeLeft),void 0)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,b.dragging=!0,void 0)},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&"object"!=typeof b.options.prevArrow&&b.$prevArrow.remove(),b.$nextArrow&&"object"!=typeof b.options.nextArrow&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(){var a=this;a.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.options.infinite!==!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.removeClass("slick-disabled"),a.$nextArrow.removeClass("slick-disabled"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled"),a.$nextArrow.removeClass("slick-disabled")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled"),a.$prevArrow.removeClass("slick-disabled")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled"),a.$prevArrow.removeClass("slick-disabled")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;document[a.hidden]?(a.paused=!0,a.autoPlayClear()):(a.paused=!1,a.autoPlay())},a.fn.slick=function(){var g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length,f=0;for(f;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});;
(function ($) {

// Constant where we should switch between mobile header and desktop header behaviours.
var EXPAND_MIN_WIDTH = 768;

/**
 * Hide and show fixed elements when scrolling.
 * @param el
 * @param options
 * @constructor
 */
function ScrollPast(el, options) {
  this.el = $(el);

  // Option processing.
  options = $.extend({}, ScrollPast.DEFAULTS, options, this.el.data());
  this.appearOffset = parseInt(options.appearOffset, 10);
  this.direction = this._findDirection(options.edge);
  this.multiplier = parseFloat(options.multiplier);
  this.scrollTimeout = parseInt(options.scrollTimeout, 10);
  this.transitionDuration = parseInt(options.transitionDuration, 10);
  this.transitionEasing = options.transitionEasing;
  this.viewportEl = this._findViewport(options.viewport);

  // Instance variables
  this.scrollSessionTimeout = null;
  this.isAnimating = false;
  this.visibility = 1;
  this.elHeight = null;
  this.maxScroll = null;
  this._resetScrollRange(0, false);

  // Prebind callback handlers.
  this._onScroll = this._onScroll.bind(this);
  this._endScrollSession = this._endScrollSession.bind(this);

  // Start the plugin
  this.init();
}

/**
 * Default Options
 * @type {Object}
 */
ScrollPast.DEFAULTS = {
  appearOffset: 0,
  edge: 'auto',
  multiplier: 1,
  scrollTimeout: 500,
  transitionDuration: 300,
  transitionEasing: 'ease',
  viewport: 'closest'
};

/**
 * Find the specified viewport to monitor scrolling in.
 * @private
 */
ScrollPast.prototype._findViewport = function(viewportSel) {
  if (viewportSel === 'window') {
    return $(window);
  } else if (viewportSel === 'closest') {
    var parents = this.el.parents();
    for (var i = 0, el; (el = parents.eq(i)).length; i++) {
      var overflow = el.css('overflow'),
        overflowY = el.css('overflow-y');

      if (overflow === 'scroll' || overflow === 'auto' ||
        overflowY === 'scroll' || overflowY === 'auto') {
        return el;
      }
    }
    return $(window);
  } else {
    return $(viewportSel);
  }
};

ScrollPast.prototype._findDirection = function(edge) {
  if (edge === 'top') {
    return -1;
  } else if (edge === 'bottom') {
    return 1;
  } else if (this.el.css('bottom') !== 'auto') {
    return 1;
  } else {
    return -1;
  }
};

ScrollPast.prototype.init = function() {
  this.viewportEl.on('scroll.aranja.scrollpast', this._onScroll);

  this._onScroll();
};

/**
 * Sets the desired visibility with or without animation.
 */
ScrollPast.prototype.setVisibility = function(visibility, animate) {
  // Check if the visibility is valid.
  var elHidden = (1 - visibility) * this.elHeight / this.multiplier;
  var scrollPosition = this.viewportEl.scrollTop();
  if (elHidden > scrollPosition) {
    visibility = 1 - scrollPosition / (this.elHeight / this.multilier);
  }

  // Update the visibility
  this.visibility = visibility;
  this._updateVisibility(animate);
};

/**
 * Calculates visibility based on a new scroll position.
 * @private
 */
ScrollPast.prototype._visibilityFromScroll = function(scrollPosition) {
  // Snap the scroll range if we cross it.
  if (scrollPosition < this.scrollRangeVisible) {
    this._resetScrollRange(scrollPosition, false);
  } else if (scrollPosition > this.scrollRangeOffset) {
    this._resetScrollRange(scrollPosition, true);
  }

  // Calculate where the scroll falls in the visibility range.
  return 1 - Math.min(1, Math.max(0, (scrollPosition - this.scrollRangeVisible) / this.elHeight));
};

/**
 * Calculates a new range of visibility and offset for scrolling inside based on a
 * specified scroll position.
 * If `isPastOffset` is false, the new range will be fully visible based on the
 * scroll position, otherwise it will be fully hidden with offset.
 * on
 * @private
 */
ScrollPast.prototype._resetScrollRange = function(scrollPosition, isPastOffset) {
  // Start by calculating a scroll position where the el is fully visible.
  this.scrollRangeVisible = scrollPosition;
  if (isPastOffset) {
    this.scrollRangeVisible -= this.elHeight / this.multiplier + this.appearOffset;
  }

  // Make sure visibility is reachable
  if (this.scrollRangeVisible < 0) {
    this.scrollRangeVisible = 0;
  }

  // Calculate the range.
  this.scrollRangeHidden = this.scrollRangeVisible + this.elHeight / this.multiplier;
  this.scrollRangeOffset = this.scrollRangeHidden + this.appearOffset;
};

/**
 * Cache some useful DOM properties for a new scroll session.
 */
ScrollPast.prototype._startScrollSession = function() {
  // Cache some useful DOM properties for each scroll session.
  this.elHeight = this.el.height();
  this.maxScroll = this._getViewportMaxScroll();
};

/**
 * When a scroll session is finished, push the el to appear or disappear.
 * @private
 */
ScrollPast.prototype._endScrollSession = function() {
  // Are we more visible than not?
  var isVisible = this.visibility > 0.5;

  // Only animate if we're not fully visible or hidden.
  var needsChange = this.visibility > 0 && this.visibility < 1;

  // Update the scroll range.
  this._resetScrollRange(this.viewportEl.scrollTop(), !isVisible);

  // Snap visibility.
  if (needsChange) {
    if (isVisible) {
      this.setVisibility(1, true);
    } else {
      this.setVisibility(0, true);
    }
  }
};

/**
 * Scroll Event Handler
 * @private
 */
ScrollPast.prototype._onScroll = function() {
  // Don't process scroll during animation.
  if (this.isAnimating) {
    return;
  }

  // Conditionally start scroll session.
  var isNewScrollSession = !this.scrollSessionTimeout;
  if (isNewScrollSession) {
    this._startScrollSession();
  }

  // Update scroll position.
  var scrollPosition = Math.max(0, Math.min(this.maxScroll, this.viewportEl.scrollTop()));

  // Calculate visibility
  var oldVisibility = this.visibility;
  this.visibility = this._visibilityFromScroll(scrollPosition);

  // Special case when visibility is fully changed in a single scroll event. Useful for iOS and page load pre-scrolled.
  var shouldAnimate = this.visibility === 0 && oldVisibility === 1 || this.visibility === 1 && oldVisibility === 0;

  // Update visuals.
  this._updateVisibility(shouldAnimate);

  // Reset scroll timeout.
  clearTimeout(this.scrollSessionTimeout);
  this.scrollSessionTimeout = setTimeout(this._endScrollSession, this.scrollTimeout);
};

/**
 * Updates visibility in the DOM, with or without animation.
 * @private
 */
ScrollPast.prototype._updateVisibility = function(animate) {
  var elMoved = this.elHeight * (1 - this.visibility);
  this.el.css('transform', 'translate3d(0, ' + (this.direction * elMoved) + 'px, 0)');

  if (animate) {
    var that = this;

    this.isAnimating = true;
    transition(this.el[0], this.transitionDuration, this.transitionEasing, function() {
      that.isAnimating = false;
    });
  }
};

/**
 * Returns the maximum scrollTop value that should be returned for the viewport.
 * @private
 */
ScrollPast.prototype._getViewportMaxScroll = function() {
  var viewportHeight = this.viewportEl.height();
  var contentHeight = this.viewportEl[0] === window ?
    document.body.scrollHeight :
    this.viewportEl[0].scrollHeight;
  return contentHeight - viewportHeight;
};

/**
 * Header component. Manages switching dark and light, and scroll-to-hide on mobile.
 * @constructor
 */
function Header(el) {
  this.el = $(el);

  // Option handling
  options = $.extend({}, Header.DEFAULTS, this.el.data());
  this.lightAt = options.lightAt;
  this.lightAtOffset = options.lightAtOffset;
  this.lightAtPosition = null;

  // Instance variables
  this.wasLight = !this.el.hasClass('Header--dark');
  this.scrollPast = null;
  this.viewport = $(window);
  this.overlayEl = $('<div class="HeaderOverlay">').insertBefore(this.el);

  // Only monitor scrolling if we're switching between light and dark.
  if (this.lightAt !== null) {
    this.viewport.on('scroll.header', this._onScroll.bind(this));
    this._onScroll();
  }

  // Monitor resize to turn on/off scroll-to-hide.
  this.viewport.on('resize.header', this._onResize.bind(this));
  this._onResize();

  this.el.on('navcollapse.header navexpand.header', this._onToggleNav.bind(this));
}

/**
 * Component options.
 */
Header.DEFAULTS = {
  lightAt: null,
  lightAtOffset: 0
};

/**
 * Handle scroll event. Check if we should switch between light and dark header.
 * @private
 */
Header.prototype._onScroll = function() {
  var scroll = this.viewport.scrollTop();
  var offset = this._lightOffset();

  var isLight = scroll > offset;
  if (isLight !== this.wasLight) {
    this.el.toggleClass('Header--dark', !isLight);
  }

  this.wasLight = isLight;
};

/**
 * Handle browser resize. Check if we should turn on or off scroll-to-hide.
 * @private
 */
Header.prototype._onResize = function() {
  var shouldScrollToCollapse = this.viewport.width() < EXPAND_MIN_WIDTH;
  var didScrollToCollapse = this.scrollPast !== null;

  // No change
  if (shouldScrollToCollapse === didScrollToCollapse) {
    return;
  }

  if (shouldScrollToCollapse) {
    this.scrollPast = new ScrollPast(this.el);
  } else if (this.scrollPast) {
    this.scrollPast.dispose();
    this.scrollPast = null;
  }

  this.setBodyHeight();
};

Header.prototype.setBodyHeight = function() {
  $('body').height($(window).height());
};

/**
 * Handle navigation changes. Tie it to the header overlay.
 * @private
 */
Header.prototype._onToggleNav = function(e) {
  var didExpand = e.type === 'navexpand';
  this.overlayEl.toggleClass('is-active', didExpand);
};

/**
 * Return the page offset where the header should turn light.
 * @private
 */
Header.prototype._lightOffset = function() {
  // Check if the position is cached.
  if (this.lightAtPosition !== null) {
    return this.lightAtPosition;
  }

  // Support both a pixel position (number and str) as well as the top of an
  // element matched by a selector.
  var number = parseInt(this.lightAt);
  if (!isNaN(number)) {
    this.lightAtPosition = number;
  } else {
    var offset = $(this.lightAt).offset();
    if (offset) {
      this.lightAtPosition = offset.top;
    }
  }

  // Offset the position, either by a fixed pixel count, or a percentage of
  // the header.
  if (this.lightAtOffset) {
    var isPercentage = /%$/.test(this.lightAtOffset);
    number = parseInt(this.lightAtOffset, 10);
    this.lightAtPosition -= isPercentage ? this.el.height() * (number / 100) : number;
  }

  // Cache the position during scrolling for 0.5s.
  var that = this;
  setTimeout(function() {
    that.lightAtPosition = null;
  }, 500);

  // Return the value
  return this.lightAtPosition;
};


/**
 * jQuery plugin
 */
$.fn.header = function(options) {
  return this.each(function() {
    var el = $(this);
    var data = el.data('pinterest.header');
    var opts = typeof options === 'object' && options;

    if (!data) { el.data('pinterest.header', (data = new Header(el, opts))); }
    if (typeof options == 'string') { data[options](); }
    data.setBodyHeight();
  });
};


/**
 * Data API
 */
$(function() {
  $('[data-header]').header();
});

}(jQuery));
;
(function ($) {

  jQuery(document).ready(function() {

    if ($('.section-search-landing').length) {

      // Let's make sure they don't get bumped when refreshing.
      $("html, body").animate({ 'scrollTop': 0 }, "slow");

      // Lazy load images
      $("img.lazy").lazyload({
        threshold : 500
      });

      // Initialize video players.
      $('.video-player').videoPlayer();

      // Hide all arrow down buttons, leave the first one intact.
      $('.down-carat:not(:first)').hide();
      $('.down-carat').on('click', function(e) {
        e.preventDefault();
        $.fn.fullpage.moveSectionDown();
      });

      if (!$('body').hasClass('desktop')) {
        // Remove non desktop elements.
        $('.video-wrapper').remove();
        $('.desktop-stories-wrapper').remove();
      }

      // Add stories selector to the last video in a chapter
      var lastVideoStory = $('.video-wrapper:last');
      $('.video-wrapper:last .story').addClass('last-video');
      // Clone stories selector
      var $_stories_selector = $('.stories .stories-selector').clone();
      lastVideoStory.find('.carat-wrap').after('<div class="other-stories"><div class="stories-selector">' + $_stories_selector.html() + '</div></div>');
      lastVideoStory.find('.other-stories .stories-selector').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.stories-slider',
        dots: false,
        prevArrow: '#prev',
        nextArrow: '#next',
        focusOnSelect: true,
        mobileFirst: true
      });
      $('.other-stories').css({'position' : 'absolute', 'bottom' : '-150px'});

      // Add chapter numbers.
      $('.video-wrapper').each(function(index, el) {
        var idx = index + 1;
        var chapter = 'chapter-' + idx;
        $(this).data('index', idx);
        $(this).data('slice', chapter);
        $(this).attr('id', chapter);
      });

      // Add story data attributes to all stories
      $('.stories-selector .story a').each(function() {
        var story = $(this).data('story');
        $('.video-wrapper .story').each(function() {
          if ($(this).hasClass(story)) {
            $(this).data('story', story);
          }
        });
      });

      // Full page setup.
      // -------------------------------------------------------------------------

      if ($('body').hasClass('desktop')) {
        $('.node-slice-page').fullpage({
          onLeave: function (index, nextIndex, direction) {
            var sliceName = $('.node-slice-page .node-slice').eq(index - 1).data('slice');
            switch (sliceName) {
              case 'chapter-3':
                // Initiate search animation right after user leaves a slide
                // the one that somes before the search.
                animateFindEverything();
                break;
            }
            $('.other-stories').css({'z-index' : 10, 'position' : 'absolute', 'bottom' : '-150px'});
          },
          afterLoad: function (anchorLink, index) {
            var sliceName = $('.node-slice-page .node-slice').eq(index - 1).data('slice');

            switch (sliceName) {
              case 'slice-first-video':
                var el = $('.slice-first-video');
                if (!el.find('.video-player-container').hasClass('video-played')) {
                  el.find('.video-player-container').trigger('playVideo');
                  el.find('.video-player-container').addClass('video-played');
                }
                break;
              case 'faux-search':
                animateFauxSearch();
                break;
              case 'slice-third':
                animateSliceThird();
                break;
              case 'stories':
                animateStories();
                break;
            }

            // Video chapter.
            if (sliceName.match(/^chapter\-/)) {
              $('#' + sliceName).find('.video-player-container').trigger('playVideo');
            }
          },
          afterRender: function() {
            $('#footer-wrapper .fp-tableCell').css({'vertical-align': 'none'});
          }
        });
        // Move to first slice
        $.fn.fullpage.moveTo(1);

      }
    }

    // Slice: slice-first-video.
    // -------------------------------------------------------------------------
    if ($('.slice-first-video').length > 0) {
      $('body').delay(5000)
        .queue(function (next) { 
        $(this).css('overflow', 'auto'); 
        next();
      });

      $('.slice-first-video .carat-wrap').hide();

      var images = $('img');
      var backgroundImage = $('.slice-first-video .video-player').data().firstframe;
      images = images.add($('<img>').attr('src', backgroundImage));

      images.imagesLoaded(function() {
        // Animate messaging text.
        $('.slice-first-video .messaging > *').hide();
        $('.slice-first-video .messaging h2 span').fadeIn();
        $('.slice-first-video .messaging h2 span').animate({opacity: 0});
        $('.slice-first-video .messaging h1').delay(3000).fadeIn(500);
        $('.slice-first-video .messaging h2').delay(3400).fadeIn(500);
        $('.slice-first-video .messaging h2 span').delay(3400).animate({ top: '-4px', opacity: 1, scale: 1 }, 500);
        $('.slice-first-video .messaging h3').delay(4000).fadeIn(500);
        $('.slice-first-video .carat-wrap').delay(5000).fadeIn(500);
      });
    }

    // Slice: faux-search.
    // -------------------------------------------------------------------------
    if ($('.faux-search').length) {
      $("ul.cats li a").addClass('noHover').addClass('unclickable');
      $('ul.cats li a.unclickable').click(function (e) {
        e.preventDefault();
      });

      // Add hidden class for small devices.
      $("ul.cats li").each(function() {
        if (!$(this).hasClass('to-be-selected')) {
          $(this).addClass('can-be-hidden');
        }
      });

      // Selects a category and pushes it to the search bar.
      function selectCategory(el) {
        $.wait(1500).then(function() {
          var toBeSelected = el.find('.to-be-selected');
          var selected =  toBeSelected.find('a').clone().addClass('changed');
          toBeSelected.addClass('selected');
          el.addClass('faded');
          $.wait(500).then(function() {
            $('.faux-bar').append(selected);
          });
        });
      }

      var waypoints = $('.faux-search').waypoint({
        handler: function (direction) {
          animateFauxSearch();
        },
        offset: '50%',
        triggerOnce: true
      });

      function animateFauxSearch() {
        lazyloadMasonImages();
        $(".faux-bar").typed({
          strings: [" ^500", $(".faux-bar").html()],
          showCursor: false,
          typeSpeed: 50,
          callback: function () {
            $(".faux-bar a").delay(250).addClass("changed");
            var firstCats = $('ul.cats').eq(0);
            var secondCats = $('ul.cats').eq(1);
            var thirdCats = $('ul.cats').eq(2);

            firstCats.switchClass('', 'active', 1500, function() {
              selectCategory($(this));
              $.wait(3000).then(function() {
                firstCats.switchClass('active', 'background', 1500, function() {
                  secondCats.switchClass('', 'active', 1500, function() {
                    selectCategory($(this));
                    $.wait(3000).then(function() {
                      firstCats.switchClass('active', 'hidden', 200);
                      secondCats.switchClass('active', 'background', 1500, function () {
                        thirdCats.switchClass('', 'active', 1500, function () {
                          $.wait(3000).then(function() {
                            secondCats.switchClass('active', 'hidden', 200);
                            thirdCats.switchClass('active', 'background', 1500);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          },
          onStringTyped: function () {
            $(".faux-bar").addClass('changed');
          }
        });
      }

      function lazyloadMasonImages() {
        $('.mason img').each(function() {
          if (!$(this).hasClass('loaded')) {
            $(this).attr('src', $(this).data().original);
            $(this).addClass('loaded');
          }
        });
      }
    }

    // Slice: slice-third.
    // -------------------------------------------------------------------------
    if ($('.slice-third').length) {
      var waypoints = $('.slice-third').waypoint({
        handler: function (direction) {
          animateSliceThird();
        },
        offset: '200px',
        triggerOnce: true
      });

      function animateSliceThird() {
        $('.mason .col').addClass('mason-active');
        // Start loading images for next section.
        $('.story').addClass('loaded');
        $('.stories-slider .story-slider').addClass('loaded');
      }
    }

    // Slice: find your everything.
    // -------------------------------------------------------------------------
    if ($('.find-your-everything').length) {
      var waypoints = $('.find-your-everything').waypoint({
        handler: function (direction) {
          animateFindEverything();
        },
        offset: '66%',
        triggerOnce: true
      });

      function animateFindEverything() {
        // Setup $.scrollTag().
        if (!$('.find-your-everything').hasClass('scrolltags-processed')) {
          $('.find-your-everything .tags').scrollTags({
            speed: 1000,
            currentItem: function(item) {
              // Set button href to current tags.
              var keywords = [];
              $(item).find('a').each(function() {
                keywords.push($(this).html().trim());
              });
              var href = 'https://www.pinterest.com/search/pins/?q=' + encodeURIComponent(keywords.join(' '));
              $('.find-your-everything-form .btn').attr('href', href);
            }
          },
          function () {
            $('.find-your-everything').addClass('scrolltags-processed');
          });
        }
      }
    }
        
    // Stories
    // -------------------------------------------------------------------------
    if ($('.stories-slider').length) {
      var waypoints = $('.stories').waypoint({
        handler: function (direction) {
          animateStories();
        },
        offset: '54px',
        triggerOnce: true
      });

      function animateStories() {
        if (!$('.stories').hasClass('stories-active')) {
          $('.stories').addClass('stories-active');
          showStory('pancakes');
        }
      }

      // Setup the stories slider.
      $('.stories-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        prevArrow: '#prev',
        nextArrow: '#next',
        asNavFor: '.stories-selector'
      });

      // Setup the stories selector.
      $('.stories-selector').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.stories-slider',
        dots: false,
        prevArrow: '#prev',
        nextArrow: '#next',
        focusOnSelect: true
      });

      // Fix issue with slide always getting slick-active class on load.
      $('.stories-selector .slick-slide').eq(0).addClass('slick-current');
      $('.stories-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.stories-selector .slick-current').removeClass('slick-current');
        $('.stories-selector .slick-slide').eq(nextSlide).addClass('slick-current');
        // Show story.
        var storyName = $('.stories-selector .slick-slide').eq(nextSlide).find('a').data().story;
        showStory(storyName);
      });
    }

    if ($('.story').length) {

      // Add story data attribute to watch all buttons.
      $('a.watch').each(function() {
        var _story_class_string = $(this).parents('.story').attr('class');
        var ret = _story_class_string.split(" ");
        $(this).attr('data-story', ret[1].trim());
      });

      // When a story is selected.
      $('a.watch').css({ opacity: 0 });
      // Last video selector button
      $('.other-stories .stories-selector .story').bind('click', function(e) {
        // Get first video fullpage index.
        var _first_chapter_index = $('.node-slice').index($('#chapter-1'));
        // Get the story clicked.
        var storyName = $(this).find('a').data('story');
        showStory(storyName);
        $('body').removeClass('overflow-hidden');
        $('.other-stories').css({'position' : 'absolute', 'bottom' : '-150px'});
        $.fn.fullpage.moveTo(_first_chapter_index);
        $.wait(100).then(function() {
          var target = $('#chapter-one');
          $('html,body').animate({
            scrollTop: target.offset().top - 54
          }, 750);
        });
      });
      // Stories selector button
      $('.stories-selector a').bind('click', function(e) {
        e.preventDefault();
        // Hide the watch link.
        $(this).css({ opacity: 0 });
        // Get the story clicked.
        var storyName = $(this).data('story');
        showStory(storyName);
        $('body').removeClass('overflow-hidden');
      });

      // Watch their story button
      $('a.watch').bind('click', function(e) {
        e.preventDefault();
        // Hide the watch link.
        $(this).css({ opacity: 0 });
        // Get first video fullpage index.
        var _first_chapter_index = $('.node-slice').index($('#chapter-1'));
        // Get the story clicked.
        var storyName = $(this).data('story');
        showStory(storyName);
        $('body').removeClass('overflow-hidden');
        $.fn.fullpage.moveTo(_first_chapter_index + 1);
        $.wait(100).then(function() {
          var target = $('#chapter-one');
          $('html,body').animate({
            scrollTop: target.offset().top - 54
          }, 750);
        });
        return false;
      });
      // Add opacity animation to the watch button.
      $('a.watch').hover(
        function() {
          $(this).css({ opacity: 1 });
        },
        function() {
          $(this).css({ opacity: 0.5 });
        }
      );
    }

    function showStory(name) {
      var story = $('.video-wrapper .story.' + name);

      $('a.watch').css({ opacity: 0 });

      if (!story.hasClass('videoplayer-processed')) {
        // Reset all stories.
        $('.video-wrapper .story').hide();

        // Reset items from video-wrapper.
        var videoWrapper = $('.story').parent('.video-wrapper');
        videoWrapper.find('.big-video-wrap').remove();
        videoWrapper.find('.carat-wrap, .messaging-wrap').hide();
        $('.videoplayer-processed').removeClass('videoplayer-processed');
        videoWrapper.parents('.story').find('a.watch').data('story', name);

        // Show the story and initialize the video player.
        story.each(function () {
          var $this = $(this);
          $this.show();

          $this.each(function () {
            $this.videoPlayer({
              ended: function (videoContainer) {
                $this.addClass('video-wrapper-active');
              }
            });
          });
        });
      }
    }

  });

  // Plugins
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------


  // Plugin for a videoPlayer.
  // -------------------------------------------------------------------------
  $.fn.videoPlayer = function(options) {
    // Defaults.
    var settings = $.extend({}, options );

    // Check if element exists and has not been initialized.
    if ($(this).length && !$(this).hasClass('videoplayer-processed')) {
      // Get the video data.
      var videoPlayer = $(this).data();
      var videoContainer = $(this);
      var firstframe = videoPlayer.firstframe;
      var lastframe = videoPlayer.lastframe;
      var video = videoPlayer.video;
      var _watch_bt_threshold;

      // Check if the video container is valid.
      if (videoContainer.length && !videoContainer.hasClass('video-loaded') && typeof video  !== "undefined") {

        // Remove any set .big-video-wrap.
        videoContainer.find('.big-video-wrap').remove();

        // Add a css class for theming.
        videoContainer.addClass('video-player-container');

        // Set the first frame as background on load.
        videoContainer.css('background-image', 'url(' + firstframe + ')');

        var images = $('img');
        images = images.add($('<img>').attr('src', firstframe));
        images.imagesLoaded(function() {
          // Create a player.
          var bigVideoPlayer = new $.BigVideo({container: videoContainer});
          bigVideoPlayer.init();

          // For non-mobile devices.
          if (!Modernizr.touch) {

            // Preload the lastframe.
            if (typeof lastframe  !== "undefined") {
              $([lastframe]).preload();
            }

            videoContainer.on('playVideo', function() {
              playVideo();
            });

            function playVideo() {
              if (videoContainer.find('.big-video-wrap').length) {
                bigVideoPlayer.show(video, {ambient: true});
                bigVideoPlayer.getPlayer().pause();
                // We need this to make sure we show it once in the linterval callback.
                _watch_bt_threshold = false;

                // Show the player and play the video.
                videoContainer.find('.big-video-wrap').show();
                window.setInterval(function() {
                  var _tag = videoContainer.find('.messaging .tag');
                  // Show video overlay text if 10% of the video played.
                  var _duration = bigVideoPlayer.getPlayer().duration();
                  var _current_time = bigVideoPlayer.getPlayer().currentTime();
                  var _threshold = (_current_time / _duration) * 100;
                  // Show overlay and text
                  if (_threshold >= 10) {
                    videoContainer.addClass('video-wrapper-active').dequeue();
                    // Animate story pill/tag button
                    if (!_tag.hasClass('processed')) {
                      _tag.addClass('processed');
                      _tag.css({top: '20px', opacity: 0});
                      _tag.wrapInner('<span></span>');
                      _tag.animate({ top: '-4px', opacity: 1}, 500);
                      _tag.find('span').fadeIn(1500);
                      _tag.css({opacity: 1 });
                    }
                  }
                  // Show watch story button
                  if (_threshold >= 15 && _watch_bt_threshold === false) {
                    $('a.watch').animate({opacity: 0.5});
                    _watch_bt_threshold = true;
                  }
                  // Show next slice (down arrow)
                  if (_threshold >= 5) {
                    videoContainer.parents('.video-wrapper').find('.down-carat').fadeIn('slow');
                  }
                }, 1000);
                bigVideoPlayer.getPlayer().play();
              }
            }

            // When the video ends show the lastframe as background.
            bigVideoPlayer.getPlayer().on('ended', function () {
              // Pause the video.
              this.pause();
              // Remove overflow:hidden from body.
              $('body').removeClass('overflow-hidden');
              // Remove the video player.
              videoContainer.find('.big-video-wrap').remove();
              // Show story selector
              $('.other-stories').css({'z-index' : 10, 'position' : 'absolute', 'bottom' : '0px'});
              // Show the last frame.
              videoContainer.css('background-image', 'url(' + lastframe + ')');
              // Call the ended callback.
              if (typeof(settings.ended) == 'function') {
                settings.ended(videoContainer);
              }
            });

            // Add a class to track if initalized.
            videoContainer.addClass('videoplayer-processed');
          }
        });

        videoContainer.addClass('video-loaded');
      }
    }
  };

  // ScrollTags
  // -------------------------------------------------------------------------
  $.fn.scrollTags = function(options, callback) {
    var _this = $(this);
    var count = 1;

    // Defaults.
    var settings = $.extend({
        speed: 1500,
        count: 3000 //_this.find('li').length + 1
      },
      options
    );

    // Wrap inside a container and set height.
    var numberOfItems = _this.find('li').length;
    var itemHeight = parseInt(_this.find('li').last().outerHeight(true));
    _this.wrap('<div class="scrolltags-container"></div>');
    $('.scrolltags-container')
      .height((numberOfItems + 2) * itemHeight)
      .css('paddingBottom', itemHeight);

    // Add css classes.
    _this.find('li a')
      .addClass('tag--greyed');

    // Start interval.
    var _interval = window.setInterval(animate, settings.speed + 1000);

    // Call the setup callback.
    if (typeof(callback) == 'function') {
      callback();
    }

    // Animate function.
    function animate() {
      if (count < settings.count) {
        var lastItem = _this.find('li').last();
        var firstItem = _this.find('li').first();

        // Toggle grayscale class.
        _this.find('li a')
          .addClass('tag--greyed');

        if (count == 1) {
          $('.find-your-everything-form h3').animate({ 'opacity': 0 }, settings.speed / 2, function() {
            lastItem.find('a').switchClass('tag--greyed', '', settings.speed, "easeOutQuint");
          });
          $('.scrolltags-container').animate({
            'paddingTop': itemHeight,
            'opacity': 1
          }, settings.speed, function() {});
        }
        else {

            // Animate.
          firstItem.animate({'marginTop': itemHeight, 'opacity': 1 }, settings.speed, function () {
            var $this = $(this);
            $this.css({'marginTop': 0});
            // Call the afterAnimation callback.
            if (typeof(settings.afterAnimation) == 'function') {
              settings.afterAnimation($this);
            }
          });

          lastItem.prev().find('a').switchClass('tag--greyed', '', settings.speed, "easeOutQuint");
          lastItem.fadeOut({
            duration: settings.speed,
            easing: "easeOutBack",
            complete: function() {
              lastItem.clone().prependTo(_this).fadeIn();
              lastItem.remove();
            }
          });
        }

        // Call the currentItem callback.
        if (typeof(settings.currentItem) == 'function') {
          // Get before last item.
          var current_item = _this.find('li:eq(-2)');
          if (count < 2) {
            current_item = _this.find('li:eq(' + (count - 2) + ')');
          }
          settings.currentItem(current_item);
        }

        count++;
      }
      else {
        window.clearInterval(_interval);
      }
    }
  };

  // Remove classes from element that has prefix.
  // -------------------------------------------------------------------------
  $.fn.removeClassPrefix = function(prefix) {
    this.each(function(i, el) {
      var classes = el.className.split(" ").filter(function(c) {
        return c.lastIndexOf(prefix, 0) !== 0;
      });
      el.className = $.trim(classes.join(" "));
    });
    return this;
  };

  // Preload images.
  // -------------------------------------------------------------------------
  $.fn.preload = function() {
    this.each(function(){
      //$('<img/>')[0].src = this;
      (new Image()).src = this;
    });
  }

  // Wait with promises.
  // -------------------------------------------------------------------------
  $.wait = function(ms) {
    var defer = $.Deferred();
    setTimeout(function() { defer.resolve(); }, ms);
    return defer;
  };

}(jQuery));
;
