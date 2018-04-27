!function(e){"use strict";function t(e,t){jQuery.ajax({url:e,dataType:"text",type:"GET",complete:function(e){"function"==typeof t&&t.apply(this,[e.status])}})}if(2==window.devicePixelRatio){var a=e("img.retina");a.each(function(){var a=e(this);a.load(function(){var e=a.attr("src").substr(-4),i=a.attr("src").substr(0,a.attr("src").length-4),n=new Image;n.src=a.attr("src");var s=n.width,o=n.height;i+="@2"+e,t(i,function(e){200===e?a.css({"max-width":s+"px","max-height":o+"px"}).attr("src",i):404===e&&console.log("No retina image found")})})})}}(jQuery),function(e){"use strict";function t(t){t.off("click").on("click",function(){e(this).toggleClass("animate").find("ul ul").slideToggle(300,"easeOutQuart")})}function a(t){t.hover(function(){e(this).children("ul").stop().slideDown(300,"easeOutQuart").css("display","block")},function(){e(this).children("ul").stop().slideUp(300,"easeOutQuart",function(){e(this).css("display","none")})})}function i(){window.addEventListener("scroll",function(e){l||(l=!0,n())},!1)}function n(){var e=s();e>=c?(r.addClass("fixed"),setTimeout(function(){r.addClass("active")},400)):r.removeClass("active").removeClass("fixed"),l=!1}function s(){return window.pageYOffset||o.scrollTop}t(e(".ls #lang_sel_click")),a(e(".desk #lang_sel ul li")),t(e(".widget_icl_lang_sel_widget #lang_sel_click")),a(e(".widget_icl_lang_sel_widget #lang_sel ul li")),e(".mob-header .menu-toggle").on("click",function(){e(this).toggleClass("animate"),e(".mob-header .header-content").slideToggle(300,"easeOutQuart")}),e(".mob-int-true .mob-menu ul li a > .di").on("click",function(t){e(this).parent().toggleClass("animate"),e(this).parent().next("ul").stop().slideToggle(300,"easeOutQuart"),t.preventDefault()}),e(".sub-effect-fade .desk-menu ul li").hover(function(){e(this).children("ul").stop().fadeIn(300,"easeOutQuart").css("display","block")},function(){e(this).children("ul").stop().fadeOut(300,"easeOutQuart",function(){e(this).css("display","none")})}),e(".sub-effect-fade .cart-toggle").hover(function(){e(this).children(".cart-dropdown").stop().fadeIn(300,"easeOutQuart").css("display","block")},function(){e(this).children(".cart-dropdown").stop().fadeOut(300,"easeOutQuart",function(){e(this).css("display","none")})}),e(".sub-effect-slide .desk-menu ul li").hover(function(){e(this).children("ul").stop(!0,!0).slideDown(300,"easeOutQuart").css("display","block")},function(){e(this).children("ul").stop(!0,!0).slideUp(300,"easeOutQuart",function(){e(this).css("display","none")})}),e(".sub-effect-slide .cart-toggle").hover(function(){e(this).children(".cart-dropdown").stop(!0,!0).slideDown(300,"easeOutQuart").css("display","block")},function(){e(this).children(".cart-dropdown").stop(!0,!0).slideUp(300,"easeOutQuart",function(){e(this).css("display","none")})}),e(".sub-effect-ghost .desk-menu ul li").hover(function(){e(this).children("ul").stop(!0,!0).animate({"margin-top":"0px",opacity:"1"},300,"easeOutQuart").css("display","block")},function(){e(this).children("ul").stop(!0,!0).animate({"margin-top":"40px",opacity:"0"},300,"easeOutQuart",function(){e(this).css("display","none")})}),e(".sub-effect-ghost .cart-toggle").hover(function(){e(this).children(".cart-dropdown").stop().animate({"margin-top":"0px",opacity:"1"},300,"easeOutQuart").css("display","block")},function(){e(this).children(".cart-dropdown").stop().animate({"margin-top":"40px",opacity:"0"},300,"easeOutQuart",function(){e(this).css("display","none")})});var o=document.documentElement,r=e(".desk-fixed-true"),l=!1,c=500;i(),e(".header .search-toggle").on("click",function(){e(".header .search").toggleClass("animated")}),e(".header .search .icon-close").on("click",function(){e(".header .search").toggleClass("animated")})}(jQuery),function(e){"use strict";e("#ninzio-slider .ninzio-slider").each(function(){var t=e(this).find(".slide-back-video");t.paused&&t.hide()})}(jQuery),function(e){"use strict";var t=e("#gen-wrap"),a=e(".sidebar-toggle"),i=e(".sidebar-close"),n=e(".main-widget-area");a.on("click",function(e){e.stopImmediatePropagation(),a.toggleClass("animate"),t.toggleClass("animate"),n.toggleClass("animate")}),i.on("click",function(e){e.stopImmediatePropagation(),n.toggleClass("animate"),t.toggleClass("animate")}),t.on("click",function(e){a.removeClass("animate"),t.removeClass("animate"),n.removeClass("animate")}),setTimeout(function(){e(".lazy").addClass("in")},600),setTimeout(function(){e(".rich-header").addClass("animate")},300),e("iframe").each(function(){var t=e(this).attr("src");e(this).attr("src",t+"?wmode=transparent")});var s=e(".widget_calendar td#prev").attr("colspan","1"),o=e(".widget_calendar td#next").attr("colspan","1");e(".widget_calendar tbody td").each(function(){0!=e(this).children("a").length&&e(this).addClass("has-children")}),0!=s.children("a").length?s.children("a").html("<span class='icon-arrow-left9'></span>"):s.html("<span class='icon-arrow-left9'></span>"),0!=o.children("a").length?o.children("a").html("<span class='icon-arrow-right9'></span>"):o.html("<span class='icon-arrow-right9'></span>"),e(".widget_calendar tfoot td.pad:not(#next, #prev)").attr("colspan","5"),e(".nz-gallery").each(function(){e(this).find("a").attr("title",e.trim(e(this).find(".gallery-caption").text().replace(/[\s\n\r]+/g," ")))}),e(".widget_nav_menu ul li > a:not(:only-child)").append('<span class="toggle icon-arrow-down9"></span>'),e(".widget_nav_menu ul li a > span.toggle").on("click",function(t){0!=e(this).parent().next("ul").length&&(e(this).parent().toggleClass("animate"),e(this).parent().next("ul").stop().slideToggle(300,"easeOutQuart")),t.preventDefault()}),e(".widget_photos_from_flickr .flickr_badge_image a").append('<div class="ninzio-overlay"></div>');e(".widget_reglog #login-form"),e(".widget_reglog #registration-form"),e(".widget_reglog #password-form");e(".widget_reglog label").each(function(){var t=e(this);t.next("input").attr("data-placeholder",t.html()),t.remove()}),e('.widget_reglog input[type="submit"]').addClass("small"),e(".pricing-table-button.button-3d").hover(function(){var t=e(this);t.css("box-shadow","0 2px "+t.data("color"))},function(){var t=e(this);t.css("box-shadow","0 4px "+t.data("color"))}),e(".pricing-table-button.button-ghost").hover(function(){var t=e(this);t.css("background-color",t.data("color"))},function(){var t=e(this);t.css("background-color","transparent")}),e(".pricing-table-button.button-normal").hover(function(){var t=e(this);t.css("background-color",t.data("colorhover"))},function(){var t=e(this);t.css("background-color",t.data("color"))}),e(".nz-sl a").hover(function(){var t=e(this);t.css("background-color",t.data("colorhover"))},function(){var t=e(this);t.css("background-color",t.data("color"))}),e("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.png'],a[href$='.gif'],a[href$='.svg']").each(function(){e(this).attr("title",e(this).children("img").attr("alt"))}),e(".nz-carousel").each(function(){e("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.png'],a[href$='.gif'],a[href$='.svg']").each(function(){e(this).attr("data-lightbox-gallery","nz-gallery3")})}),e(".woocommerce .thumbnails a").attr("data-lightbox-gallery","gallery7"),e(".woocommerce .images img").each(function(){var t=e(this);t.wrap('<div class="nz-thumbnail"></div>'),t.parent().prepend('<div class="ninzio-overlay"></div>')}),e('img[class*="wp-image"]').each(function(){var t=e(this);t.parents().is("a")&&t.after('<div class="ninzio-overlay"><div class="ovhover"></div></div>')}),e(".woocommerce-pagination a.next").html('<span class="icon icon-arrow-right8">'),e(".woocommerce-pagination a.prev").html('<span class="icon icon-arrow-left8">')}(jQuery),function(e){"use strict";e.fn.placeholder=function(){e.each(this,function(){var t=e(this);t.attr("placeholder")&&(t.data("placeholder",t.attr("placeholder")),t.removeAttr("placeholder"));var a=t.data("placeholder");""==t.val()&&t.val(a),t.on("focus",function(){t.val()==a&&t.val("")}).on("focusout",function(){""==t.val()&&t.val(a)})})},e('input:not([type="submit"]),textarea').placeholder()}(jQuery),function(e){"use strict";function t(t,a,i){t.each(function(){function t(){e(n[o]).addClass("active"),o++,o==s&&clearInterval(r)}var a=e(this),n=a.children(n),s=n.length,o=0,r="";a.one("inview",function(e,a,n,s){if(a){setInterval(t,i)}})})}t(e(".nz-row"),e(".col-animate-true"),250),t(e('.nz-recent-portfolio.grid[data-animate="true"] .nz-portfolio-posts'),e(".post"),150),t(e('.nz-recent-portfolio.masonry[data-animate="true"] .nz-portfolio-posts'),e(".post"),150),t(e('.nz-recent-portfolio.carousel[data-animate="true"] .nz-portfolio-posts'),e(".post"),250),t(e('.nz-recent-posts.masonry[data-animate="true"] .posts-inner'),e(".post"),150),t(e('.nz-recent-posts.carousel[data-animate="true"] .posts-inner'),e(".post"),250),t(e(".nz-gallery:not(.none)"),e(".gallery-item"),150),t(e(".nz-content-box.fade"),e(".nz-box"),150),t(e(".nz-content-box.scale"),e(".nz-box"),250),t(e(".nz-clients.fade"),e(".client"),150),t(e(".nz-clients.scale"),e(".client"),250),t(e(".nz-carousel.fade"),e(".item"),150),t(e(".nz-carousel.scale"),e(".item"),250),t(e(".nz-pricing-table.fade"),e(".column"),150),t(e(".nz-pricing-table.scale"),e(".column"),250),t(e(".nz-persons.fade"),e(".person"),150),t(e(".nz-persons.scale"),e(".person"),250),t(e(".animation-true .blog-post"),e(".post"),150),t(e(".animation-true .nz-portfolio-posts"),e(".portfolio"),150),t(e(".animation-true .products"),e(".product"),150)}(jQuery),function(e){"use strict";function t(t,a){var i=e(window);e.each(t,function(){var t=e(this);e(window).scroll(function(){var e=a?-((i.scrollTop()-t.offset().top)/2):-(i.scrollTop()/2),n="50% "+e+"px";t.css({backgroundPosition:n})})})}t(e('.nz-section[data-parallax="true"]'),!0)}(jQuery),function(e){"use strict";e(".i-separator").each(function(){var t=e(this);void 0!==t.data("target")&&t.bind("click.smoothscroll",function(a){a.preventDefault();var i=t.data("target");e("html, body").stop().animate({scrollTop:e(i).offset().top},500,function(){window.location.hash=i})})})}(jQuery),function(e){"use strict";function t(){Modernizr.mq("only screen and (min-width: 768px)")&&i.each(function(){var t=e(this),a=e(this).outerHeight(),i=e(this).outerWidth(),r=t.find(".nz-section-back-video");r.width(i),r.height(a);var l=i/s,c=(a-a)/o,d=l>c?l:c;n=1280/720*(a+40),n>d*s&&(d=n/s),r.width(Math.ceil(d*s+20)),r.height(Math.ceil(d*o+20))})}function a(e,t,i){var n="horizontal"==i?e.data("img-width"):e.data("img-height");"horizontal"==i?e.animate({"background-position-x":n},{duration:t,easing:"linear",complete:function(){e.css("background-position-x","0"),a(e,t,i)}}):"vertical"==i&&e.animate({"background-position-y":n},{duration:t,easing:"linear",complete:function(){e.css("background-position-y","0"),a(e,t,i)}})}var i=e(".nz-section"),n=1200,s=1280,o=720;t(),e(window).resize(t),i.each(function(){var t=e(this);t.hasClass("animate-true")&&(t.hasClass("horizontal")?a(t,t.data("animation-speed"),"horizontal"):t.hasClass("vertical")&&a(t,t.data("animation-speed"),"vertical"))})}(jQuery),function(e){"use strict";var t=e("#top");document.documentElement;t.bind("click.smoothscroll",function(t){t.preventDefault();var a=this.hash;e("html, body").stop().animate({scrollTop:e(a).offset().top},800,function(){window.location.hash=a})})}(jQuery),function(e){"use strict";e(".nz-icon-progress").each(function(){var t=e(this),a=t.data("color"),i=t.data("active"),n=t.find(".icon"),s=0;t.one("inview",function(t,o,r,l){if(o)var c=setInterval(function(){e(n[s]).css({backgroundColor:a}),s++,s==i&&clearInterval(c)},125)})})}(jQuery),function(e){"use strict";var t="";e(".map").each(function(){var a=e(this),i=a.attr("data-x")?a.data("x"):53.385873,n=a.attr("data-y")?a.data("y"):-1.471471,s=a.attr("data-zoom")?parseInt(a.data("zoom")):18,o=a.attr("data-type")?a.attr("data-type"):"roadmap",r="roadmap";switch(o){case"roadmap":case"black":case"grey":case"routexl":r="roadmap";break;case"satellite":r="satellite";break;case"hybrid":r="hybrid";case"terrain":r="terrain"}"black"===o?(console.log("styleArray"),t=[{stylers:[{hue:"#ff1a00"},{invert_lightness:!0},{saturation:-100},{lightness:33},{gamma:.5}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#2D333C"}]}]):"grey"===o?t=[{featureType:"all",stylers:[{saturation:-100},{gamma:.5}]}]:"routexl"===o&&(t=[{featureType:"administrative",elementType:"all",stylers:[{visibility:"on"},{saturation:-100},{lightness:20}]},{featureType:"road",elementType:"all",stylers:[{visibility:"on"},{saturation:-100},{lightness:40}]},{featureType:"water",elementType:"all",stylers:[{visibility:"on"},{saturation:-10},{lightness:30}]},{featureType:"landscape.man_made",elementType:"all",stylers:[{visibility:"simplified"},{saturation:-60},{lightness:10}]},{featureType:"landscape.natural",elementType:"all",stylers:[{visibility:"simplified"},{saturation:-60},{lightness:60}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"},{saturation:-100},{lightness:60}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"},{saturation:-100},{lightness:60}]}]),r=r.toUpperCase();var l={center:new google.maps.LatLng(i,n),zoom:s,mapTypeId:google.maps.MapTypeId.mapTypeId,styles:t,scrollwheel:!1},c=new google.maps.Map(document.getElementById(a.attr("id")),l);if(a.attr("data-marker"))var d=new google.maps.Marker({position:new google.maps.LatLng(i,n),map:c,icon:a.attr("data-marker")});null!=d.getAnimation()?d.setAnimation(null):d.setAnimation(google.maps.Animation.BOUNCE)})}(jQuery),function(e){"use strict";var t=e(".alert");t.each(function(){var t=e(this);t.find(".close-alert").on("click",function(){t.fadeOut(200)})})}(jQuery),function(e){"use strict";e(".nz-progress").each(function(){function t(){i.each(function(){var t=e(this).addClass("visible"),a=t.data("percentage");t.width(0).animate({width:a+"%"},2500,"easeOutQuart").fromTo({from:0,to:a,speed:2500})})}var a=e(this),i=a.find(".nz-line");a.one("inview",function(e,a,i,n){a&&setTimeout(function(){t()},250)})})}(jQuery),function(e){"use strict";e(".nz-circle-progress").each(function(){function t(){i.each(function(){var t=e(this).animate({opacity:"1"},300),a=t.find(".circle"),i=(t.parent(),a.data("track")),n=a.data("bar"),s=a.data("percent"),o=20,r=180,l=t.find(".nz-value").text("0");l.fromTo({from:0,to:s,speed:1500}),a.easyPieChart({barColor:n,trackColor:"undefined"==typeof i?"#eaeaea":i,lineCap:"round",lineWidth:o,size:r,animate:"1500",scaleColor:!1})})}var a=e(this),i=a.find(".nz-circle");a.one("inview",function(e,a,i,n){a&&setTimeout(function(){t()},200)})})}(jQuery),function(e){"use strict";e(".nz-tabs").each(function(){function t(){o>=a.outerWidth()&&a.hasClass("horizontal")?a.addClass("tab-full"):a.removeClass("tab-full")}var a=e(this),i=a.find(".tab"),n=i.length,s=a.find(".tab-content"),o=(a.find(".tabset"),0),r=0;i.hasClass("active")||i.first().addClass("active"),i.each(function(){o+=e(this).outerWidth(),r+=e(this).outerHeight()}),n>=2&&i.on("click",function(){var t=e(this);t.hasClass("active")||(t.addClass("active").siblings().removeClass("active"),s.hide(),s.eq(t.index()).fadeIn())}),a.hasClass("vertical")&&a.find(".tabs-container").css("min-height",r+(i.length-1)),t(),e(window).resize(t)})}(jQuery),function(e){"use strict";e(".wpb_tabs").each(function(){function t(){s>=a.outerWidth()?a.addClass("tab-full"):a.removeClass("tab-full")}var a=e(this),i=a.find(".wpb_tabs_nav li"),n=i.length,s=(a.find(".wpb_tabs_nav"),0),o=0,r=a.find(".wpb_tab");a.find(".wpb_tab").wrapAll('<div class="tabs-container"/>'),i.hasClass("active")||i.first().addClass("active"),i.find("a").on("click",function(e){e.preventDefault()}),i.each(function(){s+=e(this).outerWidth(),o+=e(this).outerHeight()}),n>=2&&i.on("click",function(){$self=e(this),$self.hasClass("active")||($self.addClass("active").siblings().removeClass("active"),r.hide(),r.eq($self.index()).fadeIn())}),t(),e(window).resize(t)})}(jQuery),function(e){"use strict";e(".nz-accordion ").each(function(){var t=e(this),a=t.find(".toggle-title"),i=t.find(".toggle-content");"yes"==t.data("collapsible")&&t.find(".active:not(:first)").removeClass("active"),i.hide(),t.find(".toggle-title.active").next().show(),t.find(".toggle-title.active .arrow").removeClass("icon-plus4").addClass("icon-minus4"),a.on("click",function(){var a=e(this),n=a.next();"yes"==t.data("collapsible")?a.hasClass("active")||(a.addClass("active").siblings().removeClass("active"),i.slideUp(150),n.slideDown(150),a.find(".arrow").removeClass("icon-plus4").addClass("icon-minus4"),a.siblings().find(".arrow").addClass("icon-plus4").removeClass("icon-minus4")):a.hasClass("active")?(a.removeClass("active"),n.stop().slideUp(150),a.find(".arrow").addClass("icon-plus4").removeClass("icon-minus4")):(a.addClass("active"),n.stop().slideDown(150),a.find(".arrow").removeClass("icon-plus4").addClass("icon-minus4"))})})}(jQuery),function(e){"use strict";e(".nz-counter").each(function(){function t(){i.each(function(){var t=e(this);t.fromTo({from:0,to:t.data("value"),speed:2e3})})}var a=e(this),i=a.find(".count-value").text("0");a.one("inview",function(e,a,i,n){a&&setTimeout(function(){t()},250)})})}(jQuery),function(e){"use strict";function t(){n>=a.outerWidth()?a.addClass("tab-full"):a.removeClass("tab-full")}e(".woocommerce .products .product").each(function(){var t=e(this),a=t.find(".add_to_cart_button"),i=t.find(".shop-loader");a.hasClass("added")||a.on("click",function(){var t=e(this);t.addClass("no-icon"),i.fadeIn(250,function(){var a=e(this);setTimeout(function(){a.fadeOut(250,function(){t.addClass("added")})},500)})})});var a=e(".woocommerce-tabs"),i=a.find(".tabs > li"),n=0;i.each(function(){n+=e(this).outerWidth()+4}),t(),e(window).resize(t)}(jQuery),function(e){"use strict";function t(t){t.hasClass("filter-true")&&t.find(".nz-portfolio-filter .filter").on("click",function(){var a=e(this),i=a.hasClass("active"),n=a.data("group");i||e(".nz-portfolio-filter .active").removeClass("active"),a.toggleClass("active"),t.find(".nz-portfolio-posts").shuffle("shuffle",n)})}e(".nz-media-slider").each(function(){var t=e(this);t.flexslider({animation:t.data("effect"),smoothHeight:!1,touch:!0,animationSpeed:450,controlNav:t.data("bullets"),slideshow:t.data("autoplay"),directionNav:t.data("navigation"),pauseOnHover:!0,prevText:"",nextText:""})}),e(".post-gallery").flexslider({animation:"fade",smoothHeight:!1,touch:!0,animationSpeed:450,controlNav:!1,slideshow:!1,directionNav:!0,pauseOnHover:!0,prevText:"",nextText:""}),e(".nz-testimonials").each(function(){var t=e(this),a=t.find(".testimonial");t.flexslider({animation:"fade",smoothHeight:!1,touch:!0,animationSpeed:450,controlNav:!0,slideshow:!1,directionNav:!1}),t.find(".flex-control-nav li").each(function(){e(this).find("a").html('<img src="'+e(a[e(this).index()]).data("img")+'">')}),t.find(".flex-control-nav").prependTo(t)}),e(".nz-timer").each(function(){var t=e(this),a=t.data("enddate"),i=t.data("days"),n=t.data("minutes"),s=t.data("hours"),o=t.data("seconds");e(this).countdown({date:a,render:function(e){t.html("<div class='timer-item timer-days'><div class='timer-item-wrap'><span class='days'>"+this.leadingZeros(e.days,3)+"</span><span class='label'>"+i+"</span></div></div><div class='timer-item timer-hours'><div class='timer-item-wrap'><span class='hours'>"+this.leadingZeros(e.hours,2)+"</span><span class='label'>"+s+"</span></div></div><div class='timer-item timer-min'><div class='timer-item-wrap'><span class='min'>"+this.leadingZeros(e.min,2)+"</span><span class='label'>"+n+"</span></div></div><div class='timer-item timer-sec'><div class='timer-item-wrap'><span class='sec'>"+this.leadingZeros(e.sec,2)+"</span><span class='label'>"+o+"</span></div></div>")}})}),e("#ninzio-slider").NinzioSlider(),e(".main-widget-area").perfectScrollbar({suppressScrollX:!0,includePadding:!0}),Modernizr.mq("only screen and (min-width: 1024px)")&&e("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.png'],a[href$='.gif'],a[href$='.svg']").nivoLightbox({effect:"fadeScale",theme:"default",keyboardNav:!0,clickOverlayToClose:!0,errorMessage:"The requested content cannot be loaded. Please try again later."}),e(".nz-carousel").each(function(){var t=e(this),a=t.data("columns"),i=t.data("autoplay"),n=3>a?2:3;t.owlCarousel({items:a,itemsDesktop:[1280,a],itemsDesktopSmall:[1024,n],itemsTablet:[768,2],itemsTabletSmall:[640,1],itemsMobile:[480,1],singleItem:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:i,stopOnHover:!0,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:window})}),e(".nz-clients").each(function(){var t=e(this),a=t.data("columns"),i=t.data("autoplay"),n=3>a?2:3;t.owlCarousel({items:a,itemsDesktop:[1280,a],itemsDesktopSmall:[1024,n],itemsTablet:[768,2],itemsTabletSmall:[640,1],itemsMobile:[480,1],singleItem:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:i,stopOnHover:!0,navigation:!0,navigationText:["",""],rewindNav:!0,scrollPerPage:!1,pagination:!1,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:window})}),e(".nz-ss").each(function(){var t=e(this),a=t.data("autoplay"),i=t.data("nav"),n=t.data("bullets");t.owlCarousel({singleItem:!0,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:a,stopOnHover:!0,navigation:i,navigationText:["<span class='icon-arrow-left10'></span>","<span class='icon-uniE91B'></span>"],rewindNav:!0,scrollPerPage:!1,pagination:n,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:window,autoHeight:!0})}),e(".nz-tweets").each(function(){var t=e(this),a=t.data("autoplay");t.find("ul").owlCarousel({singleItem:!0,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:a,stopOnHover:!0,navigation:!0,navigationText:["",""],pagination:!1,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:window})}),e(".nz-recent-portfolio.carousel").each(function(){var t=e(this),a=t.data("columns"),i=t.data("autoplay");t.find(".nz-portfolio-posts").owlCarousel({items:a,itemsDesktop:[1280,a],itemsDesktopSmall:[1024,3],itemsTablet:[768,2],itemsTabletSmall:[640,1],itemsMobile:[480,1],singleItem:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:i,stopOnHover:!0,navigation:!0,pagination:!1,navigationText:["",""],responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:window})}),e(".nz-recent-posts.carousel").each(function(){var t=e(this),a=t.data("columns"),i=t.data("autoplay");t.find(".posts-inner").owlCarousel({items:a,itemsDesktop:[1280,a],itemsDesktopSmall:[1024,3],itemsTablet:[768,2],itemsTabletSmall:[640,1],itemsMobile:[480,1],singleItem:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:i,stopOnHover:!0,navigation:!0,navigationText:["",""],pagination:!1,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:window})}),e(".nz-gallery.carousel").each(function(){var t=e(this),a=t.data("columns"),i=t.data("autoplay"),n=3>a?2:3;t.owlCarousel({items:a,itemsDesktop:[1280,a],itemsDesktopSmall:[1024,n],itemsTablet:[768,2],itemsTabletSmall:[640,1],itemsMobile:[480,1],singleItem:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:i,stopOnHover:!0,navigation:!1,navigationText:["",""],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:window})}),e(".nz-slick-carousel").each(function(){var t=e(this),a=t.data("autoplay"),i=t.data("autoplayspeed");t.slick({centerMode:!0,speed:500,easing:"easeOutQuart",centerPadding:"250px",slidesToShow:1,autoplay:a,autoplaySpeed:i,prevArrow:"<span class='icon-arrow-left9 slick-prev'></span>",nextArrow:"<span class='icon-arrow-right9 slick-next'></span>",responsive:[{breakpoint:1920,settings:{centerPadding:"450px"}},{breakpoint:1600,settings:{centerPadding:"350px"}},{breakpoint:1366,settings:{centerPadding:"250px"}},{breakpoint:1280,settings:{centerPadding:"200px"}},{breakpoint:1024,settings:{centerPadding:"150px"}},{breakpoint:768,settings:{centerPadding:"100px"}},{breakpoint:640,settings:{centerPadding:"100px"}},{breakpoint:480,settings:{centerPadding:"80px"}},{breakpoint:320,settings:{centerPadding:"50px"}}]})});var a=e(".loop .nz-portfolio-posts > .post");imagesLoaded(e(".loop .nz-portfolio-posts"),function(){e(".loop .port-layout:not(.full) .nz-portfolio-posts").shuffle({itemSelector:".portfolio",sizer:a,gutterWidth:0,speed:300,easing:"ease-out"})});var i=e(".loop .blog-post > .post");imagesLoaded(e(".loop .blog-post"),function(){e(".loop .blog-layout:not(.full):not(.standard) .blog-post").shuffle({itemSelector:".post",sizer:i,gutterWidth:0,speed:300,easing:"ease-out"})});var n=e(".nz-recent-portfolio.grid"),s=e(".nz-recent-portfolio.masonry"),o=n.find(".post"),r=s.find(".post");imagesLoaded(s,function(){s.find(".nz-portfolio-posts").shuffle({itemSelector:".post",sizer:r,gutterWidth:20,speed:300,easing:"ease-out"})}),imagesLoaded(n,function(){n.find(".nz-portfolio-posts").shuffle({itemSelector:".post",sizer:o,gutterWidth:20,speed:300,easing:"ease-out"})});var l=e(".nz-recent-posts.masonry .post");imagesLoaded(e(".nz-recent-posts.masonry"),function(){e(".nz-recent-posts.masonry").find(".posts-inner").shuffle({itemSelector:".post",sizer:l,gutterWidth:20,speed:300,easing:"ease-out"})});e("ul.products > .product");imagesLoaded(e("ul.products"),function(){e("ul.products").shuffle({itemSelector:".product",sizer:i,gutterWidth:0,speed:300,easing:"ease-out"})}),t(s),t(n),t(e(".for-filter"))}(jQuery);

jQuery(document).ready(function($) {
	var blogs = $( '.post' );
	$.each( blogs, function(i,l) {
		var newLink = $(this).find( '.post-title a' ).attr( 'href' );
		$(this).find( '.nz-more' ).attr( 'href', newLink );
	});
});

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function t(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function r(n,o){var i=u.raw?n:t(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(t,c,s){if(arguments.length>1&&!e.isFunction(c)){if(s=e.extend({},u.defaults,s),"number"==typeof s.expires){var a=s.expires,d=s.expires=new Date;d.setMilliseconds(d.getMilliseconds()+864e5*a)}return document.cookie=[n(t),"=",i(c),s.expires?"; expires="+s.expires.toUTCString():"",s.path?"; path="+s.path:"",s.domain?"; domain="+s.domain:"",s.secure?"; secure":""].join("")}for(var f=t?void 0:{},p=document.cookie?document.cookie.split("; "):[],l=0,m=p.length;m>l;l++){var x=p[l].split("="),g=o(x.shift()),j=x.join("=");if(t===g){f=r(j,c);break}t||void 0===(j=r(j))||(f[g]=j)}return f};u.defaults={},e.removeCookie=function(n,o){return e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n)}});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
/* MacGuyver hacks for affiliate_id */

jQuery(document).ready(function($) {
			
	
	if ( getUrlParameter('ref') &&  getUrlParameter('ref') !='' && getUrlParameter('ref') !='undefined')
	{
		
		jQuery.cookie('affwp_name', getUrlParameter('ref'), { expires: 7, path: '/' });
	}

	if ( jQuery('body.page-id-1623').length>0 ) 
	{
		
	}
	else
	{
	
		if ( jQuery('#nz-column-1 div.c-foot a').length>0 ) 
		{
			if (jQuery.cookie('affwp_ref')) 
			{
				var affwp_ref=jQuery.cookie('affwp_ref');
				var affwp_name=jQuery.cookie('affwp_name');
				
				if( affwp_ref=='undefined' || affwp_ref=='' )
				{}
				else
				{
					jQuery('#nz-column-1 div.c-foot a').attr('href',jQuery('#nz-column-1 div.c-foot a').attr('href')
						+'?affwp_ref='+affwp_ref+'&affwp_name='+affwp_name);	
				}
	
			}
	
			//console.log('box 1');
	
		}
		
		if ( jQuery('#nz-column-2 div.c-foot a').length>0 ) 
		{
			if (jQuery.cookie('affwp_ref')) 
			{
				var affwp_ref=jQuery.cookie('affwp_ref');
				var affwp_name=jQuery.cookie('affwp_name');
				
				if( affwp_ref=='undefined' || affwp_ref=='' )
				{}
				else
				{
					jQuery('#nz-column-2 div.c-foot a').attr('href',jQuery('#nz-column-2 div.c-foot a').attr('href')
						+'?affwp_ref='+affwp_ref+'&affwp_name='+affwp_name);	
				}
	
			}
	
			//console.log('box 2');
	
		}
		
		if ( jQuery('#nz-column-3 div.c-foot a').length>0 ) 
		{
			if (jQuery.cookie('affwp_ref')) 
			{
				var affwp_ref=jQuery.cookie('affwp_ref');
				var affwp_name=jQuery.cookie('affwp_name');
				
				if( affwp_ref=='undefined' || affwp_ref=='' )
				{}
				else
				{
					jQuery('#nz-column-3 div.c-foot a').attr('href',jQuery('#nz-column-3 div.c-foot a').attr('href')
						+'?affwp_ref='+affwp_ref+'&affwp_name='+affwp_name);	
					
				}
	
			}
	
			//console.log('box 3');
	
		}
		
		if ( jQuery('div.nz-column-text p a.button').length>0 ) 
		{
			if (jQuery.cookie('affwp_ref')) 
			{
				var affwp_ref=jQuery.cookie('affwp_ref');
				var affwp_name=jQuery.cookie('affwp_name');
				
				if( affwp_ref=='undefined' || affwp_ref=='' )
				{}
				else
				{
					jQuery('div.nz-column-text p a.button').attr('href',jQuery('div.nz-column-text p a.button').attr('href')
						+'?affwp_ref='+affwp_ref+'&affwp_name='+affwp_name);	
					
				}
	
			}
	
			//console.log('box 0');
	
		}
		
	}
	
	
	//fix box height issue.
	jQuery('.nz-pricing-table').each(function(){  
	
		var highestBox = 0;
		jQuery('.column-inner .c-body', this).each(function(){
		
		  if(jQuery(this).height() > highestBox) 
			 highestBox = jQuery(this).height(); 
		});  
		
		jQuery('.column-inner .c-body',this).height(highestBox); 
	
	});  

});