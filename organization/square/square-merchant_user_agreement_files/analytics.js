(function(a){a.trackAwConversion=function(b){document.write=function(c){if(!a("#gaw_content").length){a("<div>").attr("id","gaw_content").appendTo("body")}a("#gaw_content").html(c)};google_conversion_id=984344943;google_conversion_language="en";google_conversion_format="3";google_conversion_color="666666";google_conversion_value=0;google_conversion_label=b;a.getScript(document.location.protocol+"//www.googleadservices.com/pagead/conversion.js")}})(jQuery);var _gaq=_gaq||[];var _saq=_saq||[];(function(a){a.trackPageView=function(b){if(!b){return}_gaq.push(["_trackPageview",b]);_gaq.push(["_trackPageLoadTime"]);_saq.push(["PageView",document.location.protocol+"//"+document.location.host+b])};a.trackEvent=function(c,e,b,d){if(!c||!e||!_gaq){return}_gaq.push(["_trackEvent",c,e,b,d]);_saq.push([c+"-"+e,b])}})(jQuery);$(document).ready(function(){$("a.track").click(function(){var a=this.getAttribute("href");var b=a.match(/^(?:https?\:\/\/[^\/]+)?(\/.*)$/)[1];$.trackPageView(b)});$("a.track-event, button.track-event").click(function(){var a=this.getAttribute("name");$.trackEvent("link","click",a,1)});$("input.track-event").click(function(){var a=this.getAttribute("value");$.trackEvent("button","click",a,1)});$(".video-link").click(function(){var a=$(this).attr("data-video");$.trackEvent("videos","play",a,1)})});