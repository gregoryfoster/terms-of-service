var modifierKeyPresent,printTracking,showTracking,slice=[].slice;modifierKeyPresent=function(a){return a.metaKey||a.ctrlKey||a.altKey||a.shiftKey};showTracking=/hound=1/.test(document.cookie);
printTracking=function(a){var c,b,d,e;if(showTracking){b="\ud83d\udc63 ";d=[];for(c in a)if(e=a[c])b+="%c"+(c[0].toUpperCase()+c.substr(1))+":%c "+e+" ",d.push("color: #00f; font-weight: bold; background-color: #ddd; border-radius: 2px; padding: 0 2px;"),d.push("color: #444");return console.log.apply(console,[b].concat(slice.call(d)))}};
window.track=function(a){var c,b,d,e,f;b=a.category;c=a.action;d=a.label;e=a.property;f=a.value;window.ga("send","event",b,c,d,f,{hitCallback:a.callback});"function"===typeof window.sp&&window.sp("trackStructEvent",b,c,d,e,f);printTracking({category:b,action:c,label:d,property:e,value:f})};
window.trackExperiment=function(a){var c,b;c=a.experimentId;b=a.variationId;a=a.assignmentId;"function"===typeof window.sp&&window.sp("trackUnstructEvent",{schema:"iglu:com.trello/experiment-event/jsonschema/1-0-0",data:{experiment_id:c,variation_id:b,assignment_id:a}});printTracking({experimentId:c,variationId:b,assignmentId:a})};
$(function(){var a;a=function(a,b){var d,e,f,h,g;if(null==window.ga)return!1;e=function(b){return a.closest("["+b+"]").attr(b)};h=e("data-track-group");d=e("data-track");g=e("data-track-prefix");e=e("data-track-value");null==d&&(d=$.trim(a.is("input")?a.val():a.text()));null!=g&&(d=g+" - "+d);null!=e&&(e=parseInt(e,10));g=function(){clearTimeout(f);"function"===typeof b&&b();return b=null};window.track({category:h,action:d,value:e,callback:g});f=setTimeout(g,250);return!0};$("body").on("click","a",
function(c){var b,d;b=$(this);if(b.attr("target")||c.isDefaultPrevented()||modifierKeyPresent(c))a(b);else if(d=function(a){return function(){var a;if((a=b.attr("href"))&&"#"!==a)return window.location=a}}(this),a(b,d))return c.preventDefault()});return $("body").on("mousedown","input[type='button']",function(c){c=$(this);return a(c)})});