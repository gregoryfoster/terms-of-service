(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MessageFormat=f()}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){module.exports={number:{decimal:{style:"decimal"},integer:{style:"decimal",maximumFractionDigits:0},currency:{style:"currency",currency:"USD"},percent:{style:"percent"},"default":{style:"decimal"}},date:{"short":{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},"long":{month:"long",day:"numeric",year:"numeric"},full:{month:"long",day:"numeric",year:"numeric",weekday:"long"},"default":{month:"short",day:"numeric",year:"numeric"}},time:{"short":{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},"long":{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},"default":{hour:"numeric",minute:"numeric",second:"numeric"}}}},{}],2:[function(require,module,exports){"use strict";var formats=require("format-message-formats");var lookupClosestLocale=require("lookup-closest-locale");var plurals=require("./plurals");module.exports=function interpret(locale,ast){return interpretSubs(locale,ast)};module.exports.closestSupportedLocale=function(locale){return lookupClosestLocale(locale,plurals)};function interpretSubs(locale,elements,parent){elements=elements.map(function(element){return interpretElement(locale,element,parent)});if(elements.length===1){return elements[0]}return function format(args){var message="";for(var e=0,ee=elements.length;e<ee;++e){message+=typeof elements[e]==="string"?elements[e]:elements[e](args)}return message}}function interpretElement(locale,element,parent){if(typeof element==="string"){return element}var id=element[0];var type=element[1];var style=element[2];var offset=0;var options;if(id==="#"){id=parent[0];type="number";offset=parent[2];style=null}switch(type){case"number":case"ordinal":case"spellout":case"duration":return interpretNumber(locale,id,offset,style);case"date":case"time":return interpretDateTime(locale,id,type,style);case"plural":case"selectordinal":offset=element[2];options=element[3];return interpretPlural(locale,id,type,offset,options);case"select":return interpretSelect(locale,id,style);default:return interpretSimple(id)}}function helper(type,style,locale){var options=formats[type][style]||formats[type].default;var cache=options.cache||(options.cache={});var format=cache[locale]||(cache[locale]=type==="number"?Intl.NumberFormat(locale,options).format:Intl.DateTimeFormat(locale,options).format);return format}function interpretNumber(locale,id,offset,style){offset=offset||0;var frmt=helper("number",style,locale);return function format(args){return frmt(+getArg(id,args)-offset)}}function interpretDateTime(locale,id,type,style){var frmt=helper(type,style,locale);return function format(args){return frmt(getArg(id,args))}}function interpretPlural(locale,id,type,offset,children){var parent=[id,type,offset];var options={};Object.keys(children).forEach(function(key){options[key]=interpretSubs(locale,children[key],parent)});var closest=lookupClosestLocale(locale,plurals);var plural=type==="selectordinal"?plurals[closest].ordinal:plurals[closest].cardinal;if(!plural)return options.other;return function format(args){var clause=options["="+ +getArg(id,args)]||options[plural(getArg(id,args)-offset)]||options.other;if(typeof clause==="string")return clause;return clause(args)}}function interpretSelect(locale,id,children){var options={};Object.keys(children).forEach(function(key){options[key]=interpretSubs(locale,children[key],null)});return function format(args){var clause=options[getArg(id,args)]||options.other;if(typeof clause==="string")return clause;return clause(args)}}function interpretSimple(id){return function format(args){return""+getArg(id,args)}}function getArg(id,args){if(args[id]!==undefined)return args[id];var parts=id.split(".");if(parts.length>1){var i=0;var l=parts.length;var a=args;for(i;i<l;i++){a=a[parts[i]];if(a===undefined)return}return a}}},{"./plurals":3,"format-message-formats":1,"lookup-closest-locale":4}],3:[function(require,module,exports){"use strict";var f=[function(s){var n=+s;return n===1?"one":"other"},function(s){var n=+s;return 0<=n&&n<=1?"one":"other"},function(s){var i=Math.floor(Math.abs(+s));var n=+s;return i===0||n===1?"one":"other"},function(s){var n=+s;return n===0?"zero":n===1?"one":n===2?"two":3<=n%100&&n%100<=10?"few":11<=n%100&&n%100<=99?"many":"other"},function(s){var i=Math.floor(Math.abs(+s));var v=(s+".").split(".")[1].length;return i===1&&v===0?"one":"other"},function(s){var n=+s;return n%10===1&&n%100!==11?"one":2<=n%10&&n%10<=4&&(n%100<12||14<n%100)?"few":n%10===0||5<=n%10&&n%10<=9||11<=n%100&&n%100<=14?"many":"other"},function(s){var n=+s;return n%10===1&&(n%100!==11&&n%100!==71&&n%100!==91)?"one":n%10===2&&(n%100!==12&&n%100!==72&&n%100!==92)?"two":(3<=n%10&&n%10<=4||n%10===9)&&((n%100<10||19<n%100)&&(n%100<70||79<n%100)&&(n%100<90||99<n%100))?"few":n!==0&&n%1e6===0?"many":"other"},function(s){var i=Math.floor(Math.abs(+s));var v=(s+".").split(".")[1].length;var f=+(s+".").split(".")[1];return v===0&&i%10===1&&i%100!==11||f%10===1&&f%100!==11?"one":v===0&&(2<=i%10&&i%10<=4)&&(i%100<12||14<i%100)||2<=f%10&&f%10<=4&&(f%100<12||14<f%100)?"few":"other"},function(s){var i=Math.floor(Math.abs(+s));var v=(s+".").split(".")[1].length;return i===1&&v===0?"one":2<=i&&i<=4&&v===0?"few":v!==0?"many":"other"},function(s){var n=+s;return n===0?"zero":n===1?"one":n===2?"two":n===3?"few":n===6?"many":"other"},function(s){var i=Math.floor(Math.abs(+s));var t=+(""+s).replace(/^[^.]*.?|0+$/g,"");var n=+s;return n===1||t!==0&&(i===0||i===1)?"one":"other"},function(s){var i=Math.floor(Math.abs(+s));var v=(s+".").split(".")[1].length;var f=+(s+".").split(".")[1];return v===0&&i%100===1||f%100===1?"one":v===0&&i%100===2||f%100===2?"two":v===0&&(3<=i%100&&i%100<=4)||3<=f%100&&f%100<=4?"few":"other"},function(s){var i=Math.floor(Math.abs(+s));return i===0||i===1?"one":"other"},function(s){var i=Math.floor(Math.abs(+s));var v=(s+".").split(".")[1].length;var f=+(s+".").split(".")[1];return v===0&&(i===1||i===2||i===3)||v===0&&(i%10!==4&&i%10!==6&&i%10!==9)||v!==0&&(f%10!==4&&f%10!==6&&f%10!==9)?"one":"other"},function(s){var n=+s;return n===1?"one":n===2?"two":3<=n&&n<=6?"few":7<=n&&n<=10?"many":"other"},function(s){var n=+s;return n===1||n===11?"one":n===2||n===12?"two":3<=n&&n<=10||13<=n&&n<=19?"few":"other"},function(s){var i=Math.floor(Math.abs(+s));var v=(s+".").split(".")[1].length;return v===0&&i%10===1?"one":v===0&&i%10===2?"two":v===0&&(i%100===0||i%100===20||i%100===40||i%100===60||i%100===80)?"few":v!==0?"many":"other"},function(s){var i=Math.floor(Math.abs(+s));var v=(s+".").split(".")[1].length;var n=+s;return i===1&&v===0?"one":i===2&&v===0?"two":v===0&&(n<0||10<n)&&n%10===0?"many":"other"},function(s){var i=Math.floor(Math.abs(+s));var t=+(""+s).replace(/^[^.]*.?|0+$/g,"");return t===0&&i%10===1&&i%100!==11||t!==0?"one":"other"},function(s){var n=+s;return n===1?"one":n===2?"two":"other"},function(s){var n=+s;return n===0?"zero":n===1?"one":"other"},function(s){var i=Math.floor(Math.abs(+s));var n=+s;return n===0?"zero":(i===0||i===1)&&n!==0?"one":"other"},function(s){var f=+(s+".").split(".")[1];var n=+s;return n%10===1&&(n%100<11||19<n%100)?"one":2<=n%10&&n%10<=9&&(n%100<11||19<n%100)?"few":f!==0?"many":"other"},function(s){var v=(s+".").split(".")[1].length;var f=+(s+".").split(".")[1];var n=+s;return n%10===0||11<=n%100&&n%100<=19||v===2&&(11<=f%100&&f%100<=19)?"zero":n%10===1&&n%100!==11||v===2&&f%10===1&&f%100!==11||v!==2&&f%10===1?"one":"other"},function(s){var i=Math.floor(Math.abs(+s));var v=(s+".").split(".")[1].length;var f=+(s+".").split(".")[1];return v===0&&i%10===1||f%10===1?"one":"other"},function(s){var i=Math.floor(Math.abs(+s));var v=(s+".").split(".")[1].length;var n=+s;return i===1&&v===0?"one":v!==0||n===0||n!==1&&(1<=n%100&&n%100<=19)?"few":"other"},function(s){var n=+s;return n===1?"one":n===0||2<=n%100&&n%100<=10?"few":11<=n%100&&n%100<=19?"many":"other"},function(s){var i=Math.floor(Math.abs(+s));var v=(s+".").split(".")[1].length;return i===1&&v===0?"one":v===0&&(2<=i%10&&i%10<=4)&&(i%100<12||14<i%100)?"few":v===0&&i!==1&&(0<=i%10&&i%10<=1)||v===0&&(5<=i%10&&i%10<=9)||v===0&&(12<=i%100&&i%100<=14)?"many":"other"},function(s){var n=+s;return 0<=n&&n<=2&&n!==2?"one":"other"},function(s){var v=(s+".").split(".")[1].length;var n=+s;return n===1&&v===0?"one":"other"},function(s){var i=Math.floor(Math.abs(+s));var v=(s+".").split(".")[1].length;return v===0&&i%10===1&&i%100!==11?"one":v===0&&(2<=i%10&&i%10<=4)&&(i%100<12||14<i%100)?"few":v===0&&i%10===0||v===0&&(5<=i%10&&i%10<=9)||v===0&&(11<=i%100&&i%100<=14)?"many":"other"},function(s){var i=Math.floor(Math.abs(+s));var n=+s;return i===0||n===1?"one":2<=n&&n<=10?"few":"other"},function(s){var i=Math.floor(Math.abs(+s));var f=+(s+".").split(".")[1];var n=+s;return n===0||n===1||i===0&&f===1?"one":"other"},function(s){var i=Math.floor(Math.abs(+s));var v=(s+".").split(".")[1].length;return v===0&&i%100===1?"one":v===0&&i%100===2?"two":v===0&&(3<=i%100&&i%100<=4)||v!==0?"few":"other"},function(s){var n=+s;return 0<=n&&n<=1||11<=n&&n<=99?"one":"other"},function(s){var n=+s;return n===1||n===5||n===7||n===8||n===9||n===10?"one":n===2||n===3?"two":n===4?"few":n===6?"many":"other"},function(s){var i=Math.floor(Math.abs(+s));return i%10===1||i%10===2||i%10===5||i%10===7||i%10===8||(i%100===20||i%100===50||i%100===70||i%100===80)?"one":i%10===3||i%10===4||(i%1e3===100||i%1e3===200||i%1e3===300||i%1e3===400||i%1e3===500||i%1e3===600||i%1e3===700||i%1e3===800||i%1e3===900)?"few":i===0||i%10===6||(i%100===40||i%100===60||i%100===90)?"many":"other"},function(s){var n=+s;return(n%10===2||n%10===3)&&(n%100!==12&&n%100!==13)?"few":"other"},function(s){var n=+s;return n===1||n===3?"one":n===2?"two":n===4?"few":"other"},function(s){var n=+s;return n===0||n===7||n===8||n===9?"zero":n===1?"one":n===2?"two":n===3||n===4?"few":n===5||n===6?"many":"other"},function(s){var n=+s;return n%10===1&&n%100!==11?"one":n%10===2&&n%100!==12?"two":n%10===3&&n%100!==13?"few":"other"},function(s){var n=+s;return n===1?"one":n===2||n===3?"two":n===4?"few":n===6?"many":"other"},function(s){var n=+s;return n===1||n===5?"one":"other"},function(s){var n=+s;return n===11||n===8||n===80||n===800?"many":"other"},function(s){var i=Math.floor(Math.abs(+s));return i===1?"one":i===0||(2<=i%100&&i%100<=20||i%100===40||i%100===60||i%100===80)?"many":"other"},function(s){var n=+s;return n%10===6||n%10===9||n%10===0&&n!==0?"many":"other"},function(s){var i=Math.floor(Math.abs(+s));return i%10===1&&i%100!==11?"one":i%10===2&&i%100!==12?"two":(i%10===7||i%10===8)&&(i%100!==17&&i%100!==18)?"many":"other"},function(s){var n=+s;return n===1?"one":n===2||n===3?"two":n===4?"few":"other"},function(s){var n=+s;return 1<=n&&n<=4?"one":"other"},function(s){var n=+s;return n===1?"one":n%10===4&&n%100!==14?"many":"other"},function(s){var n=+s;return(n%10===1||n%10===2)&&(n%100!==11&&n%100!==12)?"one":"other"},function(s){var n=+s;return n%10===3&&n%100!==13?"few":"other"}];module.exports={af:{cardinal:f[0]},ak:{cardinal:f[1]},am:{cardinal:f[2]},ar:{cardinal:f[3]},as:{cardinal:f[2],ordinal:f[35]},asa:{cardinal:f[0]},ast:{cardinal:f[4]},az:{cardinal:f[0],ordinal:f[36]},be:{cardinal:f[5],ordinal:f[37]},bem:{cardinal:f[0]},bez:{cardinal:f[0]},bg:{cardinal:f[0]},bh:{cardinal:f[1]},bn:{cardinal:f[2],ordinal:f[35]},br:{cardinal:f[6]},brx:{cardinal:f[0]},bs:{cardinal:f[7]},ca:{cardinal:f[4],ordinal:f[38]},ce:{cardinal:f[0]},cgg:{cardinal:f[0]},chr:{cardinal:f[0]},ckb:{cardinal:f[0]},cs:{cardinal:f[8]},cy:{cardinal:f[9],ordinal:f[39]},da:{cardinal:f[10]},de:{cardinal:f[4]},dsb:{cardinal:f[11]},dv:{cardinal:f[0]},ee:{cardinal:f[0]},el:{cardinal:f[0]},en:{cardinal:f[4],ordinal:f[40]},eo:{cardinal:f[0]},es:{cardinal:f[0]},et:{cardinal:f[4]},eu:{cardinal:f[0]},fa:{cardinal:f[2]},ff:{cardinal:f[12]},fi:{cardinal:f[4]},fil:{cardinal:f[13],ordinal:f[0]},fo:{cardinal:f[0]},fr:{cardinal:f[12],ordinal:f[0]},fur:{cardinal:f[0]},fy:{cardinal:f[4]},ga:{cardinal:f[14],ordinal:f[0]},gd:{cardinal:f[15]},gl:{cardinal:f[4]},gsw:{cardinal:f[0]},gu:{cardinal:f[2],ordinal:f[41]},guw:{cardinal:f[1]},gv:{cardinal:f[16]},ha:{cardinal:f[0]},haw:{cardinal:f[0]},he:{cardinal:f[17]},hi:{cardinal:f[2],ordinal:f[41]},hr:{cardinal:f[7]},hsb:{cardinal:f[11]},hu:{cardinal:f[0],ordinal:f[42]},hy:{cardinal:f[12],ordinal:f[0]},is:{cardinal:f[18]},it:{cardinal:f[4],ordinal:f[43]},iu:{cardinal:f[19]},iw:{cardinal:f[17]},jgo:{cardinal:f[0]},ji:{cardinal:f[4]},jmc:{cardinal:f[0]},ka:{cardinal:f[0],ordinal:f[44]},kab:{cardinal:f[12]},kaj:{cardinal:f[0]},kcg:{cardinal:f[0]},kk:{cardinal:f[0],ordinal:f[45]},kkj:{cardinal:f[0]},kl:{cardinal:f[0]},kn:{cardinal:f[2]},ks:{cardinal:f[0]},ksb:{cardinal:f[0]},ksh:{cardinal:f[20]},ku:{cardinal:f[0]},kw:{cardinal:f[19]},ky:{cardinal:f[0]},lag:{cardinal:f[21]},lb:{cardinal:f[0]},lg:{cardinal:f[0]},ln:{cardinal:f[1]},lt:{cardinal:f[22]},lv:{cardinal:f[23]},mas:{cardinal:f[0]},mg:{cardinal:f[1]},mgo:{cardinal:f[0]},mk:{cardinal:f[24],ordinal:f[46]},ml:{cardinal:f[0]},mn:{cardinal:f[0]},mo:{cardinal:f[25],ordinal:f[0]},mr:{cardinal:f[2],ordinal:f[47]},mt:{cardinal:f[26]},nah:{cardinal:f[0]},naq:{cardinal:f[19]},nb:{cardinal:f[0]},nd:{cardinal:f[0]},ne:{cardinal:f[0],ordinal:f[48]},nl:{cardinal:f[4]},nn:{cardinal:f[0]},nnh:{cardinal:f[0]},no:{cardinal:f[0]},nr:{cardinal:f[0]},nso:{cardinal:f[1]},ny:{cardinal:f[0]},nyn:{cardinal:f[0]},om:{cardinal:f[0]},or:{cardinal:f[0]},os:{cardinal:f[0]},pa:{cardinal:f[1]},pap:{cardinal:f[0]},pl:{cardinal:f[27]},prg:{cardinal:f[23]},ps:{cardinal:f[0]},pt:{cardinal:f[28]},"pt-PT":{cardinal:f[29]},rm:{cardinal:f[0]},ro:{cardinal:f[25],ordinal:f[0]},rof:{cardinal:f[0]},ru:{cardinal:f[30]},rwk:{cardinal:f[0]},saq:{cardinal:f[0]},sdh:{cardinal:f[0]},se:{cardinal:f[19]},seh:{cardinal:f[0]},sh:{cardinal:f[7]},shi:{cardinal:f[31]},si:{cardinal:f[32]},sk:{cardinal:f[8]},sl:{cardinal:f[33]},sma:{cardinal:f[19]},smi:{cardinal:f[19]},smj:{cardinal:f[19]},smn:{cardinal:f[19]},sms:{cardinal:f[19]},sn:{cardinal:f[0]},so:{cardinal:f[0]},sq:{cardinal:f[0],ordinal:f[49]},sr:{cardinal:f[7]},ss:{cardinal:f[0]},ssy:{cardinal:f[0]},st:{cardinal:f[0]},sv:{cardinal:f[4],ordinal:f[50]},sw:{cardinal:f[4]},syr:{cardinal:f[0]},ta:{cardinal:f[0]},te:{cardinal:f[0]},teo:{cardinal:f[0]},ti:{cardinal:f[1]},tig:{cardinal:f[0]},tk:{cardinal:f[0]},tl:{cardinal:f[13],ordinal:f[0]},tn:{cardinal:f[0]},tr:{cardinal:f[0]},ts:{cardinal:f[0]},tzm:{cardinal:f[34]},ug:{cardinal:f[0]},uk:{cardinal:f[30],ordinal:f[51]},ur:{cardinal:f[4]},uz:{cardinal:f[0]},ve:{cardinal:f[0]},vo:{cardinal:f[0]},vun:{cardinal:f[0]},wa:{cardinal:f[1]},wae:{cardinal:f[0]},xh:{cardinal:f[0]},xog:{cardinal:f[0]},yi:{cardinal:f[4]},zu:{cardinal:f[2]},lo:{ordinal:f[0]},ms:{ordinal:f[0]},vi:{ordinal:f[0]}}},{}],4:[function(require,module,exports){module.exports=function lookupClosestLocale(locale,available){if(available[locale])return locale;var locales=[].concat(locale||[]);for(var l=0,ll=locales.length;l<ll;++l){var current=locales[l].split("-");while(current.length){if(current.join("-")in available){return current.join("-")}current.pop()}}return"en"}},{}],5:[function(require,module,exports){"use strict";module.exports=function parse(pattern){if(typeof pattern!=="string")throw new SyntaxError("Pattern must be a string");return parseMessage({pattern:pattern,index:0},"message")};function isDigit(char){return char==="0"||char==="1"||char==="2"||char==="3"||char==="4"||char==="5"||char==="6"||char==="7"||char==="8"||char==="9"}function isWhitespace(char){var code=char&&char.charCodeAt(0);return code>=9&&code<=13||code===32||code===133||code===160||code===6158||code>=8192&&code<=8205||code===8232||code===8233||code===8239||code===8287||code===8288||code===12288||code===65279}function skipWhitespace(current){var pattern=current.pattern;var length=pattern.length;while(current.index<length&&isWhitespace(pattern[current.index])){++current.index}}function parseText(current,parentType){var pattern=current.pattern;var length=pattern.length;var isHashSpecial=parentType==="plural"||parentType==="selectordinal";var isArgStyle=parentType==="style";var text="";var char;while(current.index<length){char=pattern[current.index];if(char==="{"||char==="}"||isHashSpecial&&char==="#"||isArgStyle&&isWhitespace(char)){break}else if(char==="'"){char=pattern[++current.index];if(char==="'"){text+=char;++current.index}else if(char==="{"||char==="}"||isHashSpecial&&char==="#"||isArgStyle&&isWhitespace(char)){text+=char;while(++current.index<length){char=pattern[current.index];if(pattern.slice(current.index,current.index+2)==="''"){text+=char;++current.index}else if(char==="'"){++current.index;break}else{text+=char}}}else{text+="'"}}else{text+=char;++current.index}}return text}function parseArgument(current){var pattern=current.pattern;if(pattern[current.index]==="#"){++current.index;return["#"]}++current.index;var id=parseArgId(current);var char=pattern[current.index];if(char==="}"){++current.index;return[id]}if(char!==","){throwExpected(current,",")}++current.index;var type=parseArgType(current);char=pattern[current.index];if(char==="}"){if(type==="plural"||type==="selectordinal"||type==="select"){throwExpected(current,type+" message options")}++current.index;return[id,type]}if(char!==","){throwExpected(current,",")}++current.index;var format;var offset;if(type==="plural"||type==="selectordinal"){offset=parsePluralOffset(current);format=parseSubMessages(current,type)}else if(type==="select"){format=parseSubMessages(current,type)}else{format=parseSimpleFormat(current)}char=pattern[current.index];if(char!=="}"){throwExpected(current,"}")}++current.index;return type==="plural"||type==="selectordinal"?[id,type,offset,format]:[id,type,format]}function parseArgId(current){skipWhitespace(current);var pattern=current.pattern;var length=pattern.length;var id="";while(current.index<length){var char=pattern[current.index];if(char==="{"||char==="#"){throwExpected(current,"argument id")}if(char==="}"||char===","||isWhitespace(char)){break}id+=char;++current.index}if(!id){throwExpected(current,"argument id")}skipWhitespace(current);return id}function parseArgType(current){skipWhitespace(current);var pattern=current.pattern;var argType;var types=["number","date","time","ordinal","duration","spellout","plural","selectordinal","select"];for(var t=0,tt=types.length;t<tt;++t){var type=types[t];if(pattern.slice(current.index,current.index+type.length)===type){argType=type;current.index+=type.length;break}}if(!argType){throwExpected(current,types.join(", "))}skipWhitespace(current);return argType}function parseSimpleFormat(current){skipWhitespace(current);var style=parseText(current,"style");if(!style){throwExpected(current,"argument style name")}skipWhitespace(current);return style}function parsePluralOffset(current){skipWhitespace(current);var offset=0;var pattern=current.pattern;var length=pattern.length;if(pattern.slice(current.index,current.index+7)==="offset:"){current.index+=7;skipWhitespace(current);var start=current.index;while(current.index<length&&isDigit(pattern[current.index])){++current.index}if(start===current.index){throwExpected(current,"offset number")}offset=+pattern.slice(start,current.index);skipWhitespace(current)}return offset}function parseSubMessages(current,parentType){skipWhitespace(current);var pattern=current.pattern;var length=pattern.length;var options={};var hasSubs=false;while(current.index<length&&pattern[current.index]!=="}"){var selector=parseSelector(current);skipWhitespace(current);options[selector]=parseSubMessage(current,parentType);hasSubs=true;skipWhitespace(current)}if(!hasSubs){throwExpected(current,parentType+" message options")}if(!("other"in options)){throwExpected(current,null,null,'"other" option must be specified in '+parentType)}return options}function parseSelector(current){var pattern=current.pattern;var length=pattern.length;var selector="";while(current.index<length){var char=pattern[current.index];if(char==="}"||char===","){throwExpected(current,"{")}if(char==="{"||isWhitespace(char)){break}selector+=char;++current.index}if(!selector){throwExpected(current,"selector")}skipWhitespace(current);return selector}function parseSubMessage(current,parentType){var char=current.pattern[current.index];if(char!=="{"){throwExpected(current,"{")}++current.index;var message=parseMessage(current,parentType);char=current.pattern[current.index];if(char!=="}"){throwExpected(current,"}")}++current.index;return message}function parseMessage(current,parentType){var pattern=current.pattern;var length=pattern.length;var text;var elements=[];if(text=parseText(current,parentType)){elements.push(text)}while(current.index<length){if(pattern[current.index]==="}"){if(parentType==="message"){throwExpected(current)}break}elements.push(parseArgument(current,parentType));if(text=parseText(current,parentType)){elements.push(text)}}return elements}function throwExpected(current,expected,found,message){var pattern=current.pattern;var lines=pattern.slice(0,current.index).split(/\r?\n/);var offset=current.index;var line=lines.length;var column=lines.slice(-1)[0].length;if(!found){if(current.index>=pattern.length){found="end of input"}else{found=pattern[current.index];while(++current.index<pattern.length){var char=pattern[current.index];if(!isDigit(char)&&char.toUpperCase()===char.toLowerCase())break;found+=char}}}if(!message){message=errorMessage(expected,found)}message+=" in "+pattern.replace(/\r?\n/g,"\n");throw new SyntaxError(message,expected,found,offset,line,column)}function errorMessage(expected,found){if(!expected){return"Unexpected "+found+" found"}return"Expected "+expected+" but "+found+" found"}function SyntaxError(message,expected,found,offset,line,column){Error.call(this,message);this.name="SyntaxError";this.message=message;this.expected=expected;this.found=found;this.offset=offset;this.line=line;this.column=column}SyntaxError.prototype=Object.create(Error.prototype);module.exports.SyntaxError=SyntaxError},{}],6:[function(require,module,exports){"use strict";var parse=require("format-message-parse");var interpret=require("format-message-interpret");var closestSupportedLocale=interpret.closestSupportedLocale;function MessageFormat(locales,pattern){if(!(this instanceof MessageFormat)){return new MessageFormat(locales,pattern)}var root=interpret(locales,parse(pattern));this._internal={locale:closestSupportedLocale(locales),format:typeof root==="string"?function format(){return root}:root}}module.exports=MessageFormat;Object.defineProperties(MessageFormat.prototype,{resolvedOptions:{configurable:true,writable:true,value:function resolvedOptions(){return{locale:this._internal.locale}}},format:{configurable:true,get:function(){return this._internal.format}},_internal:{configurable:true,writable:true,value:{locale:"en",format:function format(){return""}}}});Object.defineProperties(MessageFormat,{supportedLocalesOf:{configurable:true,writable:true,value:function supportedLocalesOf(requestedLocales){return[].concat(requestedLocales||[]).filter(function(locale,i,array){var closest=closestSupportedLocale(locale);return closest===locale.slice(0,closest.length)&&array.indexOf(locale)===i})}}})},{"format-message-interpret":2,"format-message-parse":5}]},{},[6])(6)});