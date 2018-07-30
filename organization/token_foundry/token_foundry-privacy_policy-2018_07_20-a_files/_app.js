module.exports=__NEXT_REGISTER_PAGE("/_app",function(){var e=webpackJsonp([46],{706:function(e,t,r){e.exports=r(707)},707:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});r.d(t,"default",function(){return _});var n=r(708);var a=r.n(n);var o=r(2);var u=r.n(o);var i=r(0);var l=r(5);var c=r(538);function f(e){f="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function e(t){return typeof t}:function e(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};return f(e)}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};var n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})));n.forEach(function(t){s(e,t,r[t])})}return e}function s(e,t,r){t in e?Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true}):e[t]=r;return e}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;"value"in n&&(n.writable=true);Object.defineProperty(e,n.key,n)}}function y(e,t,r){t&&d(e.prototype,t);r&&d(e,r);return e}function b(e,t){if(t&&("object"===f(t)||"function"===typeof t))return t;return h(e)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var g=i["c"].div.withConfig({displayName:"_app__Body",componentId:"s1f6f0as-0"})(["margin-top:",";",";"],function(e){return e.theme.navbar.size.xs},l["g"].md(Object(i["b"])(["margin-top:",";"],function(e){return e.theme.navbar.size.md})));var _=function(e){m(t,e);function t(){v(this,t);return b(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}y(t,[{key:"render",value:function e(){var t=this.props,r=t.Component,a=t.pageProps;return u.a.createElement(n["Container"],null,u.a.createElement(i["a"],{theme:p({},c["b"])},u.a.createElement(g,null,u.a.createElement(r,a))))}}]);return t}(a.a)},708:function(e,t,r){e.exports=r(709)},709:function(e,t,r){"use strict";var n=r(74);var a=r(16);Object.defineProperty(t,"__esModule",{value:true});t.createUrl=O;t.Container=t.default=void 0;var o=a(r(12));var u=a(r(390));var i=a(r(710));var l=a(r(387));var c=a(r(23));var f=a(r(20));var p=a(r(21));var s=a(r(24));var v=a(r(25));var d=n(r(2));var y=a(r(3));var b=a(r(534));var h=r(72);var m=r(434);var g=function(e){(0,v.default)(t,e);function t(){(0,f.default)(this,t);return(0,s.default)(this,(t.__proto__||(0,c.default)(t)).apply(this,arguments))}(0,p.default)(t,[{key:"getChildContext",value:function e(){var t=this.props.headManager;return{headManager:t,router:(0,m.makePublicRouterInstance)(this.props.router),_containerProps:(0,l.default)({},this.props)}}},{key:"componentDidCatch",value:function e(t,r){t.info=r;true;window.next.renderError({err:t})}},{key:"render",value:function e(){var t=this.props,r=t.router,n=t.Component,a=t.pageProps;var o=O(r);return d.default.createElement(_,null,d.default.createElement(n,(0,i.default)({},a,{url:o})))}}],[{key:"getInitialProps",value:function(){var e=(0,u.default)(o.default.mark(function e(t){var r,n,a,u;return o.default.wrap(function e(o){while(1)switch(o.prev=o.next){case 0:r=t.Component,n=t.router,a=t.ctx;o.next=3;return(0,h.loadGetInitialProps)(r,a);case 3:u=o.sent;return o.abrupt("return",{pageProps:u});case 5:case"end":return o.stop()}},e,this)}));return function t(r){return e.apply(this,arguments)}}()}]);return t}(d.Component);t.default=g;Object.defineProperty(g,"displayName",{configurable:true,enumerable:true,writable:true,value:"App"});Object.defineProperty(g,"childContextTypes",{configurable:true,enumerable:true,writable:true,value:{_containerProps:y.default.any,headManager:y.default.object,router:y.default.object}});var _=function(e){(0,v.default)(t,e);function t(){(0,f.default)(this,t);return(0,s.default)(this,(t.__proto__||(0,c.default)(t)).apply(this,arguments))}(0,p.default)(t,[{key:"componentDidMount",value:function e(){this.scrollToHash()}},{key:"componentDidUpdate",value:function e(){this.scrollToHash()}},{key:"scrollToHash",value:function e(){var t=this.props.hash;if(!t)return;var r=document.getElementById(t);if(!r)return;setTimeout(function(){return r.scrollIntoView()},0)}},{key:"shouldComponentUpdate",value:function e(t){return!(0,b.default)(this.props,t)}},{key:"render",value:function e(){var t=this.props.children;return d.default.createElement(d.default.Fragment,null,t)}}]);return t}(d.Component);t.Container=_;Object.defineProperty(_,"contextTypes",{configurable:true,enumerable:true,writable:true,value:{_containerProps:y.default.any}});var P=(0,h.execOnce)(function(){false});function O(e){var t=e.pathname,r=e.asPath,n=e.query;return{get query(){P();return n},get pathname(){P();return t},get asPath(){P();return r},back:function t(){P();e.back()},push:function t(r,n){P();return e.push(r,n)},pushTo:function t(r,n){P();var a=n?r:null;var o=n||r;return e.push(a,o)},replace:function t(r,n){P();return e.replace(r,n)},replaceTo:function t(r,n){P();var a=n?r:null;var o=n||r;return e.replace(a,o)}}}},710:function(e,t,r){var n=r(436);function a(){e.exports=a=n||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};return a.apply(this,arguments)}e.exports=a}},[706]);return{page:e.default}});