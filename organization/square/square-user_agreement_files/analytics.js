(function(a){a.attach=function(b,c){setTimeout(function(){var e=document.createElement("script");e.type="text/javascript";e.async=true;var d=document.getElementsByTagName("head")[0];e.src=document.location.protocol+"//"+b+"/"+c;d.appendChild(e)},1)}})(jQuery);(function(a){a.trackAwConversion=function(b){document.write=function(c){if(!a("#gaw_content").length){a("<div>").attr("id","gaw_content").appendTo("body")}a("#gaw_content").html(c)};google_conversion_id=984344943;google_conversion_language="en";google_conversion_format="3";google_conversion_color="666666";google_conversion_value=0;google_conversion_label=b;a.getScript(document.location.protocol+"//www.googleadservices.com/pagead/conversion.js")}})(jQuery);var _gaq=_gaq||[];(function(a){a.trackPageView=function(b){if(!b||!_gaq){return}_gaq.push(["_trackPageview",b]);_gaq.push(["_trackPageLoadTime"])};a.trackEvent=function(c,e,b,d){if(!c||!e||!_gaq){return}_gaq.push(["_trackEvent",c,e,b,d])}})(jQuery);var _kmq=_kmq||[];(function(a){a.kmSet=function(b){_kmq.push(["set",b])};a.kmEvent=function(e,c){var b=["record",e];var d=a.extend({},c,{domain:window.location.hostname,path:window.location.pathname});b.push(d);_kmq.push(b)}})(jQuery);$(document).ready(function(){$("a.track").click(function(){var a=this.getAttribute("href");var b=a.match(/^(?:https?\:\/\/[^\/]+)?(\/.*)$/)[1];$.trackPageView(b)});$("a.track-event").click(function(){var a=this.getAttribute("name");$.trackEvent("link","click",a,1)});$("input.track-event").click(function(){var a=this.getAttribute("value");$.trackEvent("button","click",a,1)});$("[data-km-event]").click(function(){var c=$(this);var e=c.attr("data-km-event");var d=window[c.attr("data-km-delegate")];var a=$.parseJSON(c.attr("data-km-properties"));if($.isFunction(d)){var b=d.call()}$.kmEvent(e,$.extend({},a,b))})});function kmFetchMCC(){var a=$("#activation-request-business-type").val();return{merchant_type:(a=="individual_use"?"individual":"business"),mcc:a}};