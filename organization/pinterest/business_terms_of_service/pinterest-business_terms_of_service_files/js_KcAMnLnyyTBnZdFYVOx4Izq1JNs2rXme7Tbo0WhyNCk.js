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
/*!
 * imagesLoaded PACKAGED v3.1.6
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */


/*!
 * EventEmitter v4.2.6 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {
	

	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class EventEmitter Manages event registering and emitting.
	 */
	function EventEmitter() {}

	// Shortcuts to improve speed and size
	var proto = EventEmitter.prototype;
	var exports = this;
	var originalGlobalValue = exports.EventEmitter;

	/**
	 * Finds the index of the listener for the event in it's storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 */
	function alias(name) {
		return function aliasClosure() {
			return this[name].apply(this, arguments);
		};
	}

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (typeof evt === 'object') {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;

		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener);
		}

		return flatListeners;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				});
			}
		}

		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = alias('addListener');

	/**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after it's first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		});
	};

	/**
	 * Alias of addOnceListener.
	 */
	proto.once = alias('addOnceListener');

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = alias('removeListener');

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function addListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function removeListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of it's properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
						single.call(this, i, value);
					}
					else {
						// Otherwise pass back to the multiple function
						multiple.call(this, i, value);
					}
				}
			}
		}
		else {
			// So evt must be a string
			// And listeners must be an array of listeners
			// Loop over it and pass each one to the multiple method
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (type === 'object') {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		return this;
	};

	/**
	 * Alias of removeEvent.
	 *
	 * Added to mirror the node API.
	 */
	proto.removeAllListeners = alias('removeEvent');

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					listener = listeners[key][i];

					if (listener.once === true) {
						this.removeListener(evt, listener.listener);
					}

					response = listener.listener.apply(this, args || []);

					if (response === this._getOnceReturnValue()) {
						this.removeListener(evt, listener.listener);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = alias('emitEvent');

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	/**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this;
	};

	/**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue;
		}
		else {
			return true;
		}
	};

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};

	/**
	 * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	 *
	 * @return {Function} Non conflicting EventEmitter class.
	 */
	EventEmitter.noConflict = function noConflict() {
		exports.EventEmitter = originalGlobalValue;
		return EventEmitter;
	};

	// Expose the class either via AMD, CommonJS or the global object
	if (typeof define === 'function' && define.amd) {
		define('eventEmitter/EventEmitter',[],function () {
			return EventEmitter;
		});
	}
	else if (typeof module === 'object' && module.exports){
		module.exports = EventEmitter;
	}
	else {
		this.EventEmitter = EventEmitter;
	}
}.call(this));

/*!
 * eventie v1.0.4
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false */

( function( window ) {



var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'eventie/eventie',eventie );
} else {
  // browser global
  window.eventie = eventie;
}

})( this );

/*!
 * imagesLoaded v3.1.6
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( [
      'eventEmitter/EventEmitter',
      'eventie/eventie'
    ], function( EventEmitter, eventie ) {
      return factory( window, EventEmitter, eventie );
    });
  } else if ( typeof exports === 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('eventEmitter'),
      require('eventie')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EventEmitter,
      window.eventie
    );
  }

})( this,

// --------------------------  factory -------------------------- //

function factory( window, EventEmitter, eventie ) {



var $ = window.jQuery;
var console = window.console;
var hasConsole = typeof console !== 'undefined';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

  // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoaded( elem, options, onAlways ) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if ( !( this instanceof ImagesLoaded ) ) {
      return new ImagesLoaded( elem, options );
    }
    // use elem as selector string
    if ( typeof elem === 'string' ) {
      elem = document.querySelectorAll( elem );
    }

    this.elements = makeArray( elem );
    this.options = extend( {}, this.options );

    if ( typeof options === 'function' ) {
      onAlways = options;
    } else {
      extend( this.options, options );
    }

    if ( onAlways ) {
      this.on( 'always', onAlways );
    }

    this.getImages();

    if ( $ ) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    var _this = this;
    setTimeout( function() {
      _this.check();
    });
  }

  ImagesLoaded.prototype = new EventEmitter();

  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function() {
    this.images = [];

    // filter & find items if we have an item selector
    for ( var i=0, len = this.elements.length; i < len; i++ ) {
      var elem = this.elements[i];
      // filter siblings
      if ( elem.nodeName === 'IMG' ) {
        this.addImage( elem );
      }
      // find children
      // no non-element nodes, #143
      var nodeType = elem.nodeType;
      if ( !nodeType || !( nodeType === 1 || nodeType === 9 || nodeType === 11 ) ) {
        continue;
      }
      var childElems = elem.querySelectorAll('img');
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        var img = childElems[j];
        this.addImage( img );
      }
    }
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function( img ) {
    var loadingImage = new LoadingImage( img );
    this.images.push( loadingImage );
  };

  ImagesLoaded.prototype.check = function() {
    var _this = this;
    var checkedCount = 0;
    var length = this.images.length;
    this.hasAnyBroken = false;
    // complete if no images
    if ( !length ) {
      this.complete();
      return;
    }

    function onConfirm( image, message ) {
      if ( _this.options.debug && hasConsole ) {
        console.log( 'confirm', image, message );
      }

      _this.progress( image );
      checkedCount++;
      if ( checkedCount === length ) {
        _this.complete();
      }
      return true; // bind once
    }

    for ( var i=0; i < length; i++ ) {
      var loadingImage = this.images[i];
      loadingImage.on( 'confirm', onConfirm );
      loadingImage.check();
    }
  };

  ImagesLoaded.prototype.progress = function( image ) {
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // HACK - Chrome triggers event before object properties have changed. #83
    var _this = this;
    setTimeout( function() {
      _this.emit( 'progress', _this, image );
      if ( _this.jqDeferred && _this.jqDeferred.notify ) {
        _this.jqDeferred.notify( _this, image );
      }
    });
  };

  ImagesLoaded.prototype.complete = function() {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    var _this = this;
    // HACK - another setTimeout so that confirm happens after progress
    setTimeout( function() {
      _this.emit( eventName, _this );
      _this.emit( 'always', _this );
      if ( _this.jqDeferred ) {
        var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
        _this.jqDeferred[ jqMethod ]( _this );
      }
    });
  };

  // -------------------------- jquery -------------------------- //

  if ( $ ) {
    $.fn.imagesLoaded = function( options, callback ) {
      var instance = new ImagesLoaded( this, options, callback );
      return instance.jqDeferred.promise( $(this) );
    };
  }


  // --------------------------  -------------------------- //

  function LoadingImage( img ) {
    this.img = img;
  }

  LoadingImage.prototype = new EventEmitter();

  LoadingImage.prototype.check = function() {
    // first check cached any previous images that have same src
    var resource = cache[ this.img.src ] || new Resource( this.img.src );
    if ( resource.isConfirmed ) {
      this.confirm( resource.isLoaded, 'cached was confirmed' );
      return;
    }

    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    if ( this.img.complete && this.img.naturalWidth !== undefined ) {
      // report based on naturalWidth
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    var _this = this;
    resource.on( 'confirm', function( resrc, message ) {
      _this.confirm( resrc.isLoaded, message );
      return true;
    });

    resource.check();
  };

  LoadingImage.prototype.confirm = function( isLoaded, message ) {
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  // -------------------------- Resource -------------------------- //

  // Resource checks each src, only once
  // separate class from LoadingImage to prevent memory leaks. See #115

  var cache = {};

  function Resource( src ) {
    this.src = src;
    // add to cache
    cache[ src ] = this;
  }

  Resource.prototype = new EventEmitter();

  Resource.prototype.check = function() {
    // only trigger checking once
    if ( this.isChecked ) {
      return;
    }
    // simulate loading on detached element
    var proxyImage = new Image();
    eventie.bind( proxyImage, 'load', this );
    eventie.bind( proxyImage, 'error', this );
    proxyImage.src = this.src;
    // set flag
    this.isChecked = true;
  };

  // ----- events ----- //

  // trigger specified handler for event type
  Resource.prototype.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  Resource.prototype.onload = function( event ) {
    this.confirm( true, 'onload' );
    this.unbindProxyEvents( event );
  };

  Resource.prototype.onerror = function( event ) {
    this.confirm( false, 'onerror' );
    this.unbindProxyEvents( event );
  };

  // ----- confirm ----- //

  Resource.prototype.confirm = function( isLoaded, message ) {
    this.isConfirmed = true;
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  Resource.prototype.unbindProxyEvents = function( event ) {
    eventie.unbind( event.target, 'load', this );
    eventie.unbind( event.target, 'error', this );
  };

  // -----  ----- //

  return ImagesLoaded;

});
;
/*!
 * imagesLoaded v3.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( [
      'eventEmitter/EventEmitter',
      'eventie/eventie'
    ], function( EventEmitter, eventie ) {
      return factory( window, EventEmitter, eventie );
    });
  } else if ( typeof exports === 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('eventEmitter'),
      require('eventie')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EventEmitter,
      window.eventie
    );
  }

})( this,

// --------------------------  factory -------------------------- //

function factory( window, EventEmitter, eventie ) {

'use strict';

var $ = window.jQuery;
var console = window.console;
var hasConsole = typeof console !== 'undefined';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

  // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoaded( elem, options, onAlways ) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if ( !( this instanceof ImagesLoaded ) ) {
      return new ImagesLoaded( elem, options );
    }
    // use elem as selector string
    if ( typeof elem === 'string' ) {
      elem = document.querySelectorAll( elem );
    }

    this.elements = makeArray( elem );
    this.options = extend( {}, this.options );

    if ( typeof options === 'function' ) {
      onAlways = options;
    } else {
      extend( this.options, options );
    }

    if ( onAlways ) {
      this.on( 'always', onAlways );
    }

    this.getImages();

    if ( $ ) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    var _this = this;
    setTimeout( function() {
      _this.check();
    });
  }

  ImagesLoaded.prototype = new EventEmitter();

  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function() {
    this.images = [];

    // filter & find items if we have an item selector
    for ( var i=0, len = this.elements.length; i < len; i++ ) {
      var elem = this.elements[i];
      // filter siblings
      if ( elem.nodeName === 'IMG' ) {
        this.addImage( elem );
      }
      // find children
      var childElems = elem.querySelectorAll('img');
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        var img = childElems[j];
        this.addImage( img );
      }
    }
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function( img ) {
    var loadingImage = new LoadingImage( img );
    this.images.push( loadingImage );
  };

  ImagesLoaded.prototype.check = function() {
    var _this = this;
    var checkedCount = 0;
    var length = this.images.length;
    this.hasAnyBroken = false;
    // complete if no images
    if ( !length ) {
      this.complete();
      return;
    }

    function onConfirm( image, message ) {
      if ( _this.options.debug && hasConsole ) {
        console.log( 'confirm', image, message );
      }

      _this.progress( image );
      checkedCount++;
      if ( checkedCount === length ) {
        _this.complete();
      }
      return true; // bind once
    }

    for ( var i=0; i < length; i++ ) {
      var loadingImage = this.images[i];
      loadingImage.on( 'confirm', onConfirm );
      loadingImage.check();
    }
  };

  ImagesLoaded.prototype.progress = function( image ) {
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // HACK - Chrome triggers event before object properties have changed. #83
    var _this = this;
    setTimeout( function() {
      _this.emit( 'progress', _this, image );
      if ( _this.jqDeferred && _this.jqDeferred.notify ) {
        _this.jqDeferred.notify( _this, image );
      }
    });
  };

  ImagesLoaded.prototype.complete = function() {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    var _this = this;
    // HACK - another setTimeout so that confirm happens after progress
    setTimeout( function() {
      _this.emit( eventName, _this );
      _this.emit( 'always', _this );
      if ( _this.jqDeferred ) {
        var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
        _this.jqDeferred[ jqMethod ]( _this );
      }
    });
  };

  // -------------------------- jquery -------------------------- //

  if ( $ ) {
    $.fn.imagesLoaded = function( options, callback ) {
      var instance = new ImagesLoaded( this, options, callback );
      return instance.jqDeferred.promise( $(this) );
    };
  }


  // --------------------------  -------------------------- //

  function LoadingImage( img ) {
    this.img = img;
  }

  LoadingImage.prototype = new EventEmitter();

  LoadingImage.prototype.check = function() {
    // first check cached any previous images that have same src
    var resource = cache[ this.img.src ] || new Resource( this.img.src );
    if ( resource.isConfirmed ) {
      this.confirm( resource.isLoaded, 'cached was confirmed' );
      return;
    }

    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    if ( this.img.complete && this.img.naturalWidth !== undefined ) {
      // report based on naturalWidth
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    var _this = this;
    resource.on( 'confirm', function( resrc, message ) {
      _this.confirm( resrc.isLoaded, message );
      return true;
    });

    resource.check();
  };

  LoadingImage.prototype.confirm = function( isLoaded, message ) {
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  // -------------------------- Resource -------------------------- //

  // Resource checks each src, only once
  // separate class from LoadingImage to prevent memory leaks. See #115

  var cache = {};

  function Resource( src ) {
    this.src = src;
    // add to cache
    cache[ src ] = this;
  }

  Resource.prototype = new EventEmitter();

  Resource.prototype.check = function() {
    // only trigger checking once
    if ( this.isChecked ) {
      return;
    }
    // simulate loading on detached element
    var proxyImage = new Image();
    eventie.bind( proxyImage, 'load', this );
    eventie.bind( proxyImage, 'error', this );
    proxyImage.src = this.src;
    // set flag
    this.isChecked = true;
  };

  // ----- events ----- //

  // trigger specified handler for event type
  Resource.prototype.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  Resource.prototype.onload = function( event ) {
    this.confirm( true, 'onload' );
    this.unbindProxyEvents( event );
  };

  Resource.prototype.onerror = function( event ) {
    this.confirm( false, 'onerror' );
    this.unbindProxyEvents( event );
  };

  // ----- confirm ----- //

  Resource.prototype.confirm = function( isLoaded, message ) {
    this.isConfirmed = true;
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  Resource.prototype.unbindProxyEvents = function( event ) {
    eventie.unbind( event.target, 'load', this );
    eventie.unbind( event.target, 'error', this );
  };

  // -----  ----- //

  return ImagesLoaded;

});
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
(function ($) {

  var isMobile = function () {
    return $(window).width() < 770;
  }

  var bgHeaderVerticalAlign = function () {
    $('.header-with-bg').css('padding-top', '0px');

    if (!isMobile()) {
      var $wrapperHeight = $('.header-with-bg').height();
      var $innerHeight = $('.business-header-content.has-background').outerHeight();
      if ($innerHeight < $wrapperHeight) {
        $('.header-with-bg').css('padding-top', ($wrapperHeight - $innerHeight) / 2);
      }
    }
    if (isMobile()) {
      /*var $wrapperHeightHasBg = $('#block-pinterest-article-header-article-header-block').height();
       $('.business-header-content.has-background').css('height', wrapperHeightHasBg 'px');*/
    }
  }

  var mobileMenu = function () {

    /* Mobile menu height calculate */

    if (isMobile() && ($('.side-menu-visible').length)) {
      var menuHeight = $('#nav').height();
      var windowHeight = $(window).height();
      if (windowHeight > menuHeight) {
        $('#page').css('height', windowHeight);
      }
      else {
        $('#page').css('height', menuHeight);
      }
    }
    else {
      $('#page').css('height', 'auto');
    }
  }

  var frontEqualHeight = function () {
    var $that = $('.view-homepage.view-display-id-banner .banner-blocks-wrapper ul li');
    var maxHeight = 0;
    var height = 0;

    $that.each(function () {
      height = $(this).height();
      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    $that.each(function () {
      height = $(this).height();
      if (height < maxHeight) {
        $(this).find('a').css('height', maxHeight);
      }
    });
  }

  /**
   * Apply placeholder.js for elements having placeholder attribute.
   */
  Drupal.behaviors.pinterestBusiness = {
    attach: function (context) {

      var $no_dropdown_arrow = $(".activate-webform .no-dropdown-arrow");

      if($no_dropdown_arrow.length > 0){
        $no_dropdown_arrow.find("span.dropdows-bg").removeClass('dropdows-bg');
      }

      var $webform = $(".activate-webform");

      if ($webform.length > 0) {

        var $select = $webform.find(".webform-component-select.webform-component--test select"),
          $button = $webform.find(".form-actions");

        if ($select.length > 0) {
          if ($select.find("option:selected").val().length == 0) {
            $button.hide();
          }
        }

        $select.change(function () {
          if ($select.find("option:selected").val().length == 0) {
            $button.hide();
          }else{
            $button.show();
          }

        });

      }
    }
  };

  Drupal.behaviors.responsiveHeaderImage = {
    attach: function (context) {
      // Article header background image
      $('.business-header-bg').imagefill({
        throttle: 1000 / 150
      });
      // Frontpage header mobile image
      // $('.bg-video .file-image .content').imagefill({throttle: 1000 / 150});
      // Frontpage footer background image
      // $('.pinterest-landing-join-bg .field-name-field-pin-icon').imagefill({throttle: 1000 / 150});
    }
  }

  Drupal.behaviors.yearsDropdownNoTouch = {
    attach: function (context) {
      $('.years-dropdown-wrapper .years-dropdown-active').live('click', function () {
        $(this).siblings('.year-dropdown-container').toggleClass('active');
      });

      $('body').click(function (e) {
        if (!$(e.target).hasClass('years-dropdown-active')) {
          $('.year-dropdown-container').removeClass('active');
        }
      });
    }
  };

  /**
   * Apply placeholder.js for elements having placeholder attribute.
   */
  Drupal.behaviors.newsYears = {
    attach: function (context) {
      var $news = $('.front .pane-news-listing .pane-title, .page-news #page-title, .node-type-news .page-title-wrapper h1', context);
      if ($news.length) {
        $news.find('.years-dropdown-wrapper').remove();
        var $out = '<div class="years-dropdown-wrapper white" role="listbox"><div class="years-dropdown-inner"> ';
        var $currentYear = new Date().getFullYear();
        var startingYear = 2013;
        $out += '<span class="years-dropdown-active">' + Drupal.t('Archive') + '</span>';
        $out += '<div class="year-dropdown-container">';
        for (var i = $currentYear; i >= startingYear; i--) {
          $out += '<a href="/' + Drupal.settings.pathPrefix + 'blog/' + i + '" class="years-dropdown-item" role="listitem">' + i + '</a>';
        }
        $out += '</div></div></div>';
        $news.append($out);
        $('.front .pane-news-listing .pane-title .years-dropdown-wrapper').removeClass('white');
      }
    }
  };

  Drupal.behaviors.frontBanner = {
    attach: function (context) {
      $('.banner-scroll-to-link').click(function (e) {
        $('html,body').animate({
          scrollTop: $('.pane-sucess-stories-featured').offset().top
        }, 'slow');
        return false;
      });
      $('.scroll-to-read').click(function (e) {
        $('html,body').animate({
          scrollTop: $('.pinterest-panel-region.panel-content').offset().top
        }, 'slow');
        return false;
      });
    }
  };

  Drupal.behaviors.mobileMenu = {
    attach: function (context) {
      $('.mobile-menu-switcher').click(function () {
        if ($('body').hasClass('side-menu-visible')) {
          $('body').removeClass('side-menu-visible');
          setTimeout(function () {
            $('body').removeClass('dummyclass');
          }, 700);
        } else {
          $('body').addClass('side-menu-visible');
          setTimeout(function () {
            $('body').addClass('dummyclass');
          }, 700);
        }
      });
      $('#nav-wrapper .depth-1.is-expanded > a').click(function () {
        if ($('.side-menu-visible').length) {
          var parent = $(this).parent();

          parent.toggleClass('opened');
          $('ul', parent).toggleClass('visible');
          return false;
        }
      });

      $(window).resize(function () {
        if ($('.side-menu-visible').length) {
          if ($('html').outerWidth() > 760) {
            $('body').removeClass('side-menu-visible');
            $('#nav-wrapper ul:nth-child(2)').removeClass('visible');
          }
        }
      });

      /* Mobile menu height calculate */

      mobileMenu();
      $('.mobile-menu-switcher').click(function () {
        mobileMenu();
      })
      $(window).resize(function () {
        mobileMenu();
      });
    }
  };

  Drupal.behaviors.archiveClone = {
    attach: function (context) {
      if ($('.front').length && $('.years-dropdown-wrapper').length) {
        $('.years-dropdown-wrapper').clone().addClass('archive-bottom-copy').appendTo('#page #main-wrapper');
      }
    }
  };

  Drupal.behaviors.equalHeightColumns = {
    attach: function (context) {
      /* thanks to Micah Godbolt */
      var equalHeight = function ($main_container) {

        var currentTallest = 0,
          currentRowStart = 0,
          rowDivs = new Array(),
          $el,
          topPosition = 0;
        $main_container.each(function () {

          $el = $(this);
          $($el).height('auto')
          topPostion = $el.position().top;

          if (currentRowStart != topPostion) {
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
              rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
          } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
          }
          for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
          }
        });
      }

      var container_1 = '.pinterest-sectionpage .pane-section-pages-images .views-row',
        container_2 = '.front .pane-sucess-stories-featured .view-sucess-stories .views-row',
        container_3 = '.pinterest-sectionpage .pane-section-pages-story-images .views-row';
      var $main_container = $(container_1 + ',' + container_2 + ',' + container_3, context);
      $(window).load(function () {
        if (!isMobile()) {
          equalHeight($main_container);
        }
      });

      $(window).resize(function () {
        if (!isMobile()) {
          equalHeight($main_container);
        }
      });
    }
  };

  Drupal.behaviors.fullHeightBanner = {
    attach: function (context) {

      function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
          e.preventDefault();
        e.returnValue = false;
      }

      function wheel(e) {
        preventDefault(e);
      }

      function disable_scroll() {
        if (window.addEventListener) {
          window.addEventListener('DOMMouseScroll', wheel, true);
        }
        window.onmousewheel = document.onmousewheel = wheel;
      }

      function enable_scroll() {
        if (window.removeEventListener) {
          window.removeEventListener('DOMMouseScroll', wheel, true);
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;
      }

      var setBlockHeight = function (block) {
        if (!isMobile() && ($('html').hasClass('no-touch'))) {
          var header_height = $('#header-wrapper .header-wrapper-container').height();
          var image_block_height = $(window).height() - header_height;
          var content_block_height = $('.success-header .success-header-content').outerHeight();

          if (parseInt($(window).height() - header_height) > content_block_height) {
//            block.height(image_block_height);
            block.css('min-height', image_block_height);
          }
        }
      }

      var goOnScroll = function (target, offset) {
        if (!$('body').hasClass('scrolled')) {
          if ($(window).scrollTop() > 1) {
            disable_scroll();
            $('body').addClass('scrolled');
            $.scrollTo(target, 800, {
              axis: 'y',
              offset: offset,
              onAfter: function () {
                enable_scroll();
              }
            });
          }
        }
      }

      $(window).load(function () {
        var success_story_banner_block = $('.node-type-success-story .success-header');
        var homepage_banner_block = $('.pane-homepage-banner .views-row');
        if (success_story_banner_block.length)
          setBlockHeight(success_story_banner_block);
        setBlockHeight(homepage_banner_block);
      });

      /*if (!isMobile()) {
       if ($('.node-type-success-story').length) {
       $(window).scroll(function () {
       goOnScroll($('.node-type-success-story .panel-content'), -49);
       });
       }
       if ($('.front').length) {
       $(window).scroll(function () {
       goOnScroll($('.pane-sucess-stories-featured'), -49);
       });
       }
       }*/
    }
  };


  /**
   * Adjust Video width in Article-image-Block
   */
  Drupal.behaviors.adjustVideoWidth = {
    attach: function (context, settings) {
      var $container = $('.article-image-block', context);
      if ($container.length) {
        setTimeout(function () {
          $container.find('iframe, .media-vimeo-outer-wrapper, .media-youtube-outer-wrapper').css('width', '100%');
        }, 1000);
      }
    }
  };

  /**
   * Hide anonymouse user name links in views.
   */
  Drupal.behaviors.hideAnonymouseAuthorNames = {
    attach: function (context, settings) {
      var $pin_icon = $('.view--news', context).find('.pin-icon');
      $pin_icon.each(function () {
        var $this = $(this);
        if ($this.text().indexOf('Anonymous') >= 0) {
          $this.hide();
          $this.closest('aside').find('.first-last-name').hide();
        }
      });
    }
  }

  /**
   * Extends text area if there is no image
   */
  Drupal.behaviors.textExtend = {
    attach: function (context, settings) {
      $('.front .pane-sucess-stories-featured .view-sucess-stories .views-row').filter(function () {
        return $('.views-field-field-header-image .field-content', this).html().trim() === '';
      }).addClass('no-image');
    }
  }

  /**
   * Remove border at bottom if block doesn't exist.
   */
  Drupal.behaviors.borderRemove = {
    attach: function (context, settings) {
      $('.node-type-success-story .panel-stories').filter(function () {
        return $('.pane-sucess-stories-extra', this).length == 0;
      }).css('display', 'none');
    }
  };

  Drupal.behaviors.responsiveVideos = {
    attach: function (context, settings) {
      setTimeout(function () {
        $('iframe[src*="youtube.com"], iframe[src*="vimeo.com"], .media-vimeo-outer-wrapper, .media-youtube-outer-wrapper', context).wrap('<div class="video-container"/>');
      }, 1000);
    }
  };

  Drupal.behaviors.hasBackgroundCheck = {
    attach: function (context, settings) {
      if ($('.business-header-content.has-background', context).length) {
        $('.block-pinterest-article-header', context).addClass('header-with-bg');
      }

      bgHeaderVerticalAlign();
      $(window).resize(function () {
        bgHeaderVerticalAlign();
      })
    }
  };

  Drupal.behaviors.imageBlockCheck = {
    attach: function (context, settings) {
      var $container = $('.article-image-block', context);
      if ($container) {
        $container.each(function (index) {
          var pinimg = $('.article-image-block-img-wrapper img');
          if (pinimg.parent().is('p')) {
            pinimg.unwrap();
          }
          var $emptycont = $('.article-image-block-img-wrapper').children();
          $emptycont.html().replace(/&nbsp;/, '');
          if (!$(this).find('.article-image-block-img-wrapper').children().length && !$(this).find('.video-container').children().length) {
            $(this).addClass('no-image');
          }
        });
      }
    }
  };

  Drupal.behaviors.hideMenuLink = {
    attach: function (context, settings) {
      var $menu = $('.whats-new', context),
        prefix = Drupal.settings.pathPrefix;
      if (prefix != 'en/' && $menu.length) {
        $menu.closest('li').hide();
      }
    }
  };

  Drupal.behaviors.frontPageBlocksPathPrefix = {
    attach: function (context, settings) {
      var prefix = Drupal.settings.pathPrefix,
        $blocks = $('.slider_block-link', context);
      $.each($blocks, function () {
        var link = $(this).attr('href');
        if (link.charAt(0) === '/') {
          $(this).attr('href', prefix + link.substring(1));
        }
        else {
          $(this).attr('href', prefix + link);
        }
      });
    }
  }

  Drupal.behaviors.frontEqualHeight = {
    attach: function (context, settings) {
      frontEqualHeight();
      $(window).resize(function () {
        frontEqualHeight();
      })
    }
  };

  Drupal.behaviors.slideInBanner = {
    attach: function (context, settings) {
      // Show the banner when scroll past the header.
      $(window).scroll(function (e) {
        if ($(document).scrollTop() > $('.header-wrapper-container').height()) {
          $('.UnauthBanner').removeClass('fade')
        }
      });

      // Close button.
      $('.UnauthBanner .btn-close').bind('click', function (e) {
        e.preventDefault();
        $(this).parent('.UnauthBanner').remove();
      });
    }
  }

  Drupal.behaviors.webformSelect = {
    attach: function (context, settings) {
      $('.tell-us-more').change(function () {
        var selectedOption = $(this).find('option:selected').text();
        $('input[type=text].tell-us-more-hidden').val(selectedOption);
      });
    }
  };

  Drupal.behaviors.successStoriesNoPin = {
    attach: function (context, settings) {

      $('.node-type-success-story .success-header-bg .field-name-field-image img').attr('nopin', 'nopin');
    }
  };

  Drupal.behaviors.matchingPage = {
    attach: function (context, settings) {
      var that = this;
      if ($(".section-matching").length) {
        $('.section-matching .form-actions').remove();

        var $all_checkboxes = $('.webform-component-checkboxes input.form-checkbox'),
          $partner_type_checkbox = $('.webform-component-checkboxes.partner-type-wrapper input.form-checkbox'),
          $platform_type = $('.webform-component-checkboxes.platform-type-wrapper input.form-checkbox');

        //Partner type checkboxes select/deselect.
        $partner_type_checkbox.on('change', function (e) {
          $all_checkboxes.not(this).prop('checked', false);
          $(".webform-component-checkboxes label").not(this).removeClass('active-form-item');

          that.operate_checkbox($(this));
        });

        //Platform type checkboxes select/deselect.
        $platform_type.on('change', function () {
          var $all_platform_checkboxes = $('.webform-component-checkboxes.platform-type-wrapper input.form-checkbox');
          $all_platform_checkboxes.not(this).prop('checked', false);

          $(".webform-component-checkboxes.platform-type-wrapper label").not(this).removeClass('active-form-item');
          that.operate_checkbox($(this));
        });

      }
    },
    operate_checkbox: function ($element) {

      checked = $element.prop('checked');
      if (checked == true) {
        $parent = $element.parent();
        $parent.find('label').addClass('active-form-item');

        if ($parent.hasClass('form-item-submitted-parttype-Advertising')) {

          var $platform_type_wrapper = $(".platform-type-wrapper"),
            $selector = $platform_type_wrapper;
          $platform_type_wrapper.show();
        } else {
          $selector = $('.content-section');
        }

        $("html, body").animate({scrollTop: $selector.offset().top - 50}, 1000);
        //$("section#header-wrapper").append('<div class="go-up">Scroll Up</div>');
        return;
      }
      $element.parent().find('label').removeClass('active-form-item');

    }
  };

})(jQuery);
;
