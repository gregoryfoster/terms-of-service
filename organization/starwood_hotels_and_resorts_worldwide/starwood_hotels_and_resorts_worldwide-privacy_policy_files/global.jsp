






/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=A[C].split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules;if(!I[A]){I[A]={versions:[],builds:[]};}var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(var C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0};var B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);if(/ Mobile\//.test(B)){C.mobile="Apple";}else{A=B.match(/NokiaN[^\/]*/);if(A){C.mobile=A[0];}}A=B.match(/AdobeAIR\/([^\s]*)/);if(A){C.air=A[0];}}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);A=B.match(/Opera Mini[^;]*/);if(A){C.mobile=A[0];}}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var A=YAHOO.lang,C=["toString","valueOf"],B={isArray:function(D){if(D){return A.isNumber(D.length)&&A.isFunction(D.splice);}return false;},isBoolean:function(D){return typeof D==="boolean";},isFunction:function(D){return typeof D==="function";},isNull:function(D){return D===null;},isNumber:function(D){return typeof D==="number"&&isFinite(D);},isObject:function(D){return(D&&(typeof D==="object"||A.isFunction(D)))||false;},isString:function(D){return typeof D==="string";},isUndefined:function(D){return typeof D==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(F,E){for(var D=0;D<C.length;D=D+1){var H=C[D],G=E[H];if(A.isFunction(G)&&G!=Object.prototype[H]){F[H]=G;}}}:function(){},extend:function(H,I,G){if(!I||!H){throw new Error("extend failed, please check that "+"all dependencies are included.");}var E=function(){};E.prototype=I.prototype;H.prototype=new E();H.prototype.constructor=H;H.superclass=I.prototype;if(I.prototype.constructor==Object.prototype.constructor){I.prototype.constructor=I;}if(G){for(var D in G){if(A.hasOwnProperty(G,D)){H.prototype[D]=G[D];}}A._IEEnumFix(H.prototype,G);}},augmentObject:function(H,G){if(!G||!H){throw new Error("Absorb failed, verify dependencies.");}var D=arguments,F,I,E=D[2];if(E&&E!==true){for(F=2;F<D.length;F=F+1){H[D[F]]=G[D[F]];}}else{for(I in G){if(E||!(I in H)){H[I]=G[I];}}A._IEEnumFix(H,G);}},augmentProto:function(G,F){if(!F||!G){throw new Error("Augment failed, verify dependencies.");}var D=[G.prototype,F.prototype];for(var E=2;E<arguments.length;E=E+1){D.push(arguments[E]);}A.augmentObject.apply(this,D);},dump:function(D,I){var F,H,K=[],L="{...}",E="f(){...}",J=", ",G=" => ";if(!A.isObject(D)){return D+"";}else{if(D instanceof Date||("nodeType" in D&&"tagName" in D)){return D;}else{if(A.isFunction(D)){return E;}}}I=(A.isNumber(I))?I:3;if(A.isArray(D)){K.push("[");for(F=0,H=D.length;F<H;F=F+1){if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}if(K.length>1){K.pop();}K.push("]");}else{K.push("{");for(F in D){if(A.hasOwnProperty(D,F)){K.push(F+G);if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}}if(K.length>1){K.pop();}K.push("}");}return K.join("");},substitute:function(S,E,L){var I,H,G,O,P,R,N=[],F,J="dump",M=" ",D="{",Q="}";for(;;){I=S.lastIndexOf(D);if(I<0){break;}H=S.indexOf(Q,I);if(I+1>=H){break;}F=S.substring(I+1,H);O=F;R=null;G=O.indexOf(M);if(G>-1){R=O.substring(G+1);O=O.substring(0,G);}P=E[O];if(L){P=L(O,P,R);}if(A.isObject(P)){if(A.isArray(P)){P=A.dump(P,parseInt(R,10));}else{R=R||"";var K=R.indexOf(J);if(K>-1){R=R.substring(4);}if(P.toString===Object.prototype.toString||K>-1){P=A.dump(P,parseInt(R,10));}else{P=P.toString();}}}else{if(!A.isString(P)&&!A.isNumber(P)){P="~-"+N.length+"-~";N[N.length]=F;}}S=S.substring(0,I)+P+S.substring(H+1);}for(I=N.length-1;I>=0;I=I-1){S=S.replace(new RegExp("~-"+I+"-~"),"{"+N[I]+"}","g");}return S;},trim:function(D){try{return D.replace(/^\s+|\s+$/g,"");}catch(E){return D;}},merge:function(){var G={},E=arguments;for(var F=0,D=E.length;F<D;F=F+1){A.augmentObject(G,E[F],true);}return G;},later:function(K,E,L,G,H){K=K||0;E=E||{};var F=L,J=G,I,D;if(A.isString(L)){F=E[L];}if(!F){throw new TypeError("method undefined");}if(!A.isArray(J)){J=[G];}I=function(){F.apply(E,J);};D=(H)?setInterval(I,K):setTimeout(I,K);return{interval:H,cancel:function(){if(this.interval){clearInterval(D);}else{clearTimeout(D);}}};},isValue:function(D){return(A.isObject(D)||A.isString(D)||A.isNumber(D)||A.isBoolean(D));}};A.hasOwnProperty=(Object.prototype.hasOwnProperty)?function(D,E){return D&&D.hasOwnProperty(E);}:function(D,E){return !A.isUndefined(D[E])&&D.constructor.prototype[E]!==D[E];};B.augmentObject(A,B,true);YAHOO.util.Lang=A;A.augment=A.augmentProto;YAHOO.augment=A.augmentProto;YAHOO.extend=A.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.5.2",build:"1076"});(function(){var B=YAHOO.util,K,I,J={},F={},M=window.document;YAHOO.env._id_counter=YAHOO.env._id_counter||0;var C=YAHOO.env.ua.opera,L=YAHOO.env.ua.webkit,A=YAHOO.env.ua.gecko,G=YAHOO.env.ua.ie;var E={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i};var N=function(P){if(!E.HYPHEN.test(P)){return P;}if(J[P]){return J[P];}var Q=P;while(E.HYPHEN.exec(Q)){Q=Q.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}J[P]=Q;return Q;};var O=function(Q){var P=F[Q];if(!P){P=new RegExp("(?:^|\\s+)"+Q+"(?:\\s+|$)");F[Q]=P;}return P;};if(M.defaultView&&M.defaultView.getComputedStyle){K=function(P,S){var R=null;if(S=="float"){S="cssFloat";}var Q=P.ownerDocument.defaultView.getComputedStyle(P,"");if(Q){R=Q[N(S)];}return P.style[S]||R;};}else{if(M.documentElement.currentStyle&&G){K=function(P,R){switch(N(R)){case"opacity":var T=100;try{T=P.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(S){try{T=P.filters("alpha").opacity;}catch(S){}}return T/100;case"float":R="styleFloat";default:var Q=P.currentStyle?P.currentStyle[R]:null;return(P.style[R]||Q);}};}else{K=function(P,Q){return P.style[Q];};}}if(G){I=function(P,Q,R){switch(Q){case"opacity":if(YAHOO.lang.isString(P.style.filter)){P.style.filter="alpha(opacity="+R*100+")";if(!P.currentStyle||!P.currentStyle.hasLayout){P.style.zoom=1;}}break;case"float":Q="styleFloat";default:P.style[Q]=R;}};}else{I=function(P,Q,R){if(Q=="float"){Q="cssFloat";}P.style[Q]=R;};}var D=function(P,Q){return P&&P.nodeType==1&&(!Q||Q(P));};YAHOO.util.Dom={get:function(R){if(R&&(R.nodeType||R.item)){return R;}if(YAHOO.lang.isString(R)||!R){return M.getElementById(R);}if(R.length!==undefined){var S=[];for(var Q=0,P=R.length;Q<P;++Q){S[S.length]=B.Dom.get(R[Q]);}return S;}return R;},getStyle:function(P,R){R=N(R);var Q=function(S){return K(S,R);};return B.Dom.batch(P,Q,B.Dom,true);},setStyle:function(P,R,S){R=N(R);var Q=function(T){I(T,R,S);};B.Dom.batch(P,Q,B.Dom,true);},getXY:function(P){var Q=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=R.ownerDocument.body){return false;}return H(R);};return B.Dom.batch(P,Q,B.Dom,true);},getX:function(P){var Q=function(R){return B.Dom.getXY(R)[0];};return B.Dom.batch(P,Q,B.Dom,true);},getY:function(P){var Q=function(R){return B.Dom.getXY(R)[1];};return B.Dom.batch(P,Q,B.Dom,true);},setXY:function(P,S,R){var Q=function(V){var U=this.getStyle(V,"position");if(U=="static"){this.setStyle(V,"position","relative");U="relative";}var X=this.getXY(V);if(X===false){return false;}var W=[parseInt(this.getStyle(V,"left"),10),parseInt(this.getStyle(V,"top"),10)];if(isNaN(W[0])){W[0]=(U=="relative")?0:V.offsetLeft;}if(isNaN(W[1])){W[1]=(U=="relative")?0:V.offsetTop;}if(S[0]!==null){V.style.left=S[0]-X[0]+W[0]+"px";}if(S[1]!==null){V.style.top=S[1]-X[1]+W[1]+"px";}if(!R){var T=this.getXY(V);if((S[0]!==null&&T[0]!=S[0])||(S[1]!==null&&T[1]!=S[1])){this.setXY(V,S,true);}}};B.Dom.batch(P,Q,B.Dom,true);},setX:function(Q,P){B.Dom.setXY(Q,[P,null]);},setY:function(P,Q){B.Dom.setXY(P,[null,Q]);},getRegion:function(P){var Q=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=R.ownerDocument.body){return false;}var S=B.Region.getRegion(R);return S;};return B.Dom.batch(P,Q,B.Dom,true);},getClientWidth:function(){return B.Dom.getViewportWidth();},getClientHeight:function(){return B.Dom.getViewportHeight();},getElementsByClassName:function(T,X,U,V){X=X||"*";U=(U)?B.Dom.get(U):null||M;if(!U){return[];}var Q=[],P=U.getElementsByTagName(X),W=O(T);for(var R=0,S=P.length;R<S;++R){if(W.test(P[R].className)){Q[Q.length]=P[R];if(V){V.call(P[R],P[R]);}}}return Q;},hasClass:function(R,Q){var P=O(Q);var S=function(T){return P.test(T.className);};return B.Dom.batch(R,S,B.Dom,true);},addClass:function(Q,P){var R=function(S){if(this.hasClass(S,P)){return false;}S.className=YAHOO.lang.trim([S.className,P].join(" "));return true;};return B.Dom.batch(Q,R,B.Dom,true);},removeClass:function(R,Q){var P=O(Q);var S=function(T){if(!Q||!this.hasClass(T,Q)){return false;}var U=T.className;T.className=U.replace(P," ");if(this.hasClass(T,Q)){this.removeClass(T,Q);}T.className=YAHOO.lang.trim(T.className);return true;};return B.Dom.batch(R,S,B.Dom,true);},replaceClass:function(S,Q,P){if(!P||Q===P){return false;}var R=O(Q);var T=function(U){if(!this.hasClass(U,Q)){this.addClass(U,P);return true;}U.className=U.className.replace(R," "+P+" ");if(this.hasClass(U,Q)){this.replaceClass(U,Q,P);}U.className=YAHOO.lang.trim(U.className);return true;};return B.Dom.batch(S,T,B.Dom,true);},generateId:function(P,R){R=R||"yui-gen";var Q=function(S){if(S&&S.id){return S.id;}var T=R+YAHOO.env._id_counter++;if(S){S.id=T;}return T;};return B.Dom.batch(P,Q,B.Dom,true)||Q.apply(B.Dom,arguments);},isAncestor:function(P,Q){P=B.Dom.get(P);Q=B.Dom.get(Q);if(!P||!Q){return false;}if(P.contains&&Q.nodeType&&!L){return P.contains(Q);}else{if(P.compareDocumentPosition&&Q.nodeType){return !!(P.compareDocumentPosition(Q)&16);}else{if(Q.nodeType){return !!this.getAncestorBy(Q,function(R){return R==P;});}}}return false;},inDocument:function(P){return this.isAncestor(M.documentElement,P);},getElementsBy:function(W,Q,R,T){Q=Q||"*";R=(R)?B.Dom.get(R):null||M;if(!R){return[];}var S=[],V=R.getElementsByTagName(Q);for(var U=0,P=V.length;U<P;++U){if(W(V[U])){S[S.length]=V[U];if(T){T(V[U]);}}}return S;},batch:function(T,W,V,R){T=(T&&(T.tagName||T.item))?T:B.Dom.get(T);if(!T||!W){return false;}var S=(R)?V:window;if(T.tagName||T.length===undefined){return W.call(S,T,V);}var U=[];for(var Q=0,P=T.length;Q<P;++Q){U[U.length]=W.call(S,T[Q],V);}return U;},getDocumentHeight:function(){var Q=(M.compatMode!="CSS1Compat")?M.body.scrollHeight:M.documentElement.scrollHeight;var P=Math.max(Q,B.Dom.getViewportHeight());return P;},getDocumentWidth:function(){var Q=(M.compatMode!="CSS1Compat")?M.body.scrollWidth:M.documentElement.scrollWidth;var P=Math.max(Q,B.Dom.getViewportWidth());return P;},getViewportHeight:function(){var P=self.innerHeight;
var Q=M.compatMode;if((Q||G)&&!C){P=(Q=="CSS1Compat")?M.documentElement.clientHeight:M.body.clientHeight;}return P;},getViewportWidth:function(){var P=self.innerWidth;var Q=M.compatMode;if(Q||G){P=(Q=="CSS1Compat")?M.documentElement.clientWidth:M.body.clientWidth;}return P;},getAncestorBy:function(P,Q){while(P=P.parentNode){if(D(P,Q)){return P;}}return null;},getAncestorByClassName:function(Q,P){Q=B.Dom.get(Q);if(!Q){return null;}var R=function(S){return B.Dom.hasClass(S,P);};return B.Dom.getAncestorBy(Q,R);},getAncestorByTagName:function(Q,P){Q=B.Dom.get(Q);if(!Q){return null;}var R=function(S){return S.tagName&&S.tagName.toUpperCase()==P.toUpperCase();};return B.Dom.getAncestorBy(Q,R);},getPreviousSiblingBy:function(P,Q){while(P){P=P.previousSibling;if(D(P,Q)){return P;}}return null;},getPreviousSibling:function(P){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getPreviousSiblingBy(P);},getNextSiblingBy:function(P,Q){while(P){P=P.nextSibling;if(D(P,Q)){return P;}}return null;},getNextSibling:function(P){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getNextSiblingBy(P);},getFirstChildBy:function(P,R){var Q=(D(P.firstChild,R))?P.firstChild:null;return Q||B.Dom.getNextSiblingBy(P.firstChild,R);},getFirstChild:function(P,Q){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getFirstChildBy(P);},getLastChildBy:function(P,R){if(!P){return null;}var Q=(D(P.lastChild,R))?P.lastChild:null;return Q||B.Dom.getPreviousSiblingBy(P.lastChild,R);},getLastChild:function(P){P=B.Dom.get(P);return B.Dom.getLastChildBy(P);},getChildrenBy:function(Q,S){var R=B.Dom.getFirstChildBy(Q,S);var P=R?[R]:[];B.Dom.getNextSiblingBy(R,function(T){if(!S||S(T)){P[P.length]=T;}return false;});return P;},getChildren:function(P){P=B.Dom.get(P);if(!P){}return B.Dom.getChildrenBy(P);},getDocumentScrollLeft:function(P){P=P||M;return Math.max(P.documentElement.scrollLeft,P.body.scrollLeft);},getDocumentScrollTop:function(P){P=P||M;return Math.max(P.documentElement.scrollTop,P.body.scrollTop);},insertBefore:function(Q,P){Q=B.Dom.get(Q);P=B.Dom.get(P);if(!Q||!P||!P.parentNode){return null;}return P.parentNode.insertBefore(Q,P);},insertAfter:function(Q,P){Q=B.Dom.get(Q);P=B.Dom.get(P);if(!Q||!P||!P.parentNode){return null;}if(P.nextSibling){return P.parentNode.insertBefore(Q,P.nextSibling);}else{return P.parentNode.appendChild(Q);}},getClientRegion:function(){var R=B.Dom.getDocumentScrollTop(),Q=B.Dom.getDocumentScrollLeft(),S=B.Dom.getViewportWidth()+Q,P=B.Dom.getViewportHeight()+R;return new B.Region(R,S,P,Q);}};var H=function(){if(M.documentElement.getBoundingClientRect){return function(Q){var R=Q.getBoundingClientRect();var P=Q.ownerDocument;return[R.left+B.Dom.getDocumentScrollLeft(P),R.top+B.Dom.getDocumentScrollTop(P)];};}else{return function(R){var S=[R.offsetLeft,R.offsetTop];var Q=R.offsetParent;var P=(L&&B.Dom.getStyle(R,"position")=="absolute"&&R.offsetParent==R.ownerDocument.body);if(Q!=R){while(Q){S[0]+=Q.offsetLeft;S[1]+=Q.offsetTop;if(!P&&L&&B.Dom.getStyle(Q,"position")=="absolute"){P=true;}Q=Q.offsetParent;}}if(P){S[0]-=R.ownerDocument.body.offsetLeft;S[1]-=R.ownerDocument.body.offsetTop;}Q=R.parentNode;while(Q.tagName&&!E.ROOT_TAG.test(Q.tagName)){if(Q.scrollTop||Q.scrollLeft){if(!E.OP_SCROLL.test(B.Dom.getStyle(Q,"display"))){if(!C||B.Dom.getStyle(Q,"overflow")!=="visible"){S[0]-=Q.scrollLeft;S[1]-=Q.scrollTop;}}}Q=Q.parentNode;}return S;};}}();})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this[0]=B;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top);var D=Math.min(this.right,E.right);var A=Math.min(this.bottom,E.bottom);var B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top);var D=Math.max(this.right,E.right);var A=Math.max(this.bottom,E.bottom);var B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D);var C=F[1];var E=F[0]+D.offsetWidth;var A=F[1]+D.offsetHeight;var B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}this.x=this.right=this.left=this[0]=A;this.y=this.top=this.bottom=this[1]=B;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.5.2",build:"1076"});YAHOO.util.CustomEvent=function(D,B,C,A){this.type=D;this.scope=B||window;this.silent=C;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var E="_YUICEOnSubscribe";if(D!==E){this.subscribeEvent=new YAHOO.util.CustomEvent(E,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(B,C,A){if(!B){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(B,C,A);}this.subscribers.push(new YAHOO.util.Subscriber(B,C,A));},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll();}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true;}}return E;},fire:function(){this.lastError=null;var K=[],E=this.subscribers.length;if(!E&&this.silent){return true;}var I=[].slice.call(arguments,0),G=true,D,J=false;if(!this.silent){}var C=this.subscribers.slice(),A=YAHOO.util.Event.throwErrors;for(D=0;D<E;++D){var M=C[D];if(!M){J=true;}else{if(!this.silent){}var L=M.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var B=null;if(I.length>0){B=I[0];}try{G=M.fn.call(L,B,M.obj);}catch(F){this.lastError=F;if(A){throw F;}}}else{try{G=M.fn.call(L,this.type,I,M.obj);}catch(H){this.lastError=H;if(A){throw H;}}}if(false===G){if(!this.silent){}break;}}}return(G!==false);},unsubscribeAll:function(){for(var A=this.subscribers.length-1;A>-1;A--){this._delete(A);}this.subscribers=[];return A;},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj;}this.subscribers.splice(A,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};YAHOO.util.Subscriber=function(B,C,A){this.fn=B;this.obj=YAHOO.lang.isUndefined(C)?null:C;this.override=A;};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}return A;};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B);}else{return(this.fn==A);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var H=false;var I=[];var J=[];var G=[];var E=[];var C=0;var F=[];var B=[];var A=0;var D={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9};return{POLL_RETRYS:2000,POLL_INTERVAL:20,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,_dri:null,DOMReady:false,throwErrors:false,startInterval:function(){if(!this._interval){var K=this;var L=function(){K._tryPreloadAttach();};this._interval=setInterval(L,this.POLL_INTERVAL);}},onAvailable:function(P,M,Q,O,N){var K=(YAHOO.lang.isString(P))?[P]:P;for(var L=0;L<K.length;L=L+1){F.push({id:K[L],fn:M,obj:Q,override:O,checkReady:N});}C=this.POLL_RETRYS;this.startInterval();},onContentReady:function(M,K,N,L){this.onAvailable(M,K,N,L,true);},onDOMReady:function(K,M,L){if(this.DOMReady){setTimeout(function(){var N=window;if(L){if(L===true){N=M;}else{N=L;}}K.call(N,"DOMReady",[],M);},0);}else{this.DOMReadyEvent.subscribe(K,M,L);}},addListener:function(M,K,V,Q,L){if(!V||!V.call){return false;}if(this._isValidCollection(M)){var W=true;for(var R=0,T=M.length;R<T;++R){W=this.on(M[R],K,V,Q,L)&&W;}return W;}else{if(YAHOO.lang.isString(M)){var P=this.getEl(M);if(P){M=P;}else{this.onAvailable(M,function(){YAHOO.util.Event.on(M,K,V,Q,L);});return true;}}}if(!M){return false;}if("unload"==K&&Q!==this){J[J.length]=[M,K,V,Q,L];return true;}var Y=M;if(L){if(L===true){Y=Q;}else{Y=L;}}var N=function(Z){return V.call(Y,YAHOO.util.Event.getEvent(Z,M),Q);};var X=[M,K,V,N,Y,Q,L];var S=I.length;I[S]=X;if(this.useLegacyEvent(M,K)){var O=this.getLegacyIndex(M,K);if(O==-1||M!=G[O][0]){O=G.length;B[M.id+K]=O;G[O]=[M,K,M["on"+K]];E[O]=[];M["on"+K]=function(Z){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(Z),O);};}E[O].push(X);}else{try{this._simpleAdd(M,K,N,false);}catch(U){this.lastError=U;this.removeListener(M,K,V);return false;}}return true;},fireLegacyEvent:function(O,M){var Q=true,K,S,R,T,P;S=E[M].slice();for(var L=0,N=S.length;L<N;++L){R=S[L];if(R&&R[this.WFN]){T=R[this.ADJ_SCOPE];P=R[this.WFN].call(T,O);Q=(Q&&P);}}K=G[M];if(K&&K[2]){K[2](O);}return Q;},getLegacyIndex:function(L,M){var K=this.generateId(L)+M;if(typeof B[K]=="undefined"){return -1;}else{return B[K];}},useLegacyEvent:function(L,M){if(this.webkit&&("click"==M||"dblclick"==M)){var K=parseInt(this.webkit,10);if(!isNaN(K)&&K<418){return true;}}return false;},removeListener:function(L,K,T){var O,R,V;if(typeof L=="string"){L=this.getEl(L);}else{if(this._isValidCollection(L)){var U=true;for(O=L.length-1;O>-1;O--){U=(this.removeListener(L[O],K,T)&&U);}return U;}}if(!T||!T.call){return this.purgeElement(L,false,K);}if("unload"==K){for(O=J.length-1;O>-1;O--){V=J[O];if(V&&V[0]==L&&V[1]==K&&V[2]==T){J.splice(O,1);return true;}}return false;}var P=null;var Q=arguments[3];if("undefined"===typeof Q){Q=this._getCacheIndex(L,K,T);}if(Q>=0){P=I[Q];}if(!L||!P){return false;}if(this.useLegacyEvent(L,K)){var N=this.getLegacyIndex(L,K);var M=E[N];if(M){for(O=0,R=M.length;O<R;++O){V=M[O];if(V&&V[this.EL]==L&&V[this.TYPE]==K&&V[this.FN]==T){M.splice(O,1);break;}}}}else{try{this._simpleRemove(L,K,P[this.WFN],false);}catch(S){this.lastError=S;return false;}}delete I[Q][this.WFN];delete I[Q][this.FN];I.splice(Q,1);return true;},getTarget:function(M,L){var K=M.target||M.srcElement;return this.resolveTextNode(K);},resolveTextNode:function(L){try{if(L&&3==L.nodeType){return L.parentNode;}}catch(K){}return L;},getPageX:function(L){var K=L.pageX;if(!K&&0!==K){K=L.clientX||0;if(this.isIE){K+=this._getScrollLeft();}}return K;},getPageY:function(K){var L=K.pageY;if(!L&&0!==L){L=K.clientY||0;if(this.isIE){L+=this._getScrollTop();}}return L;
},getXY:function(K){return[this.getPageX(K),this.getPageY(K)];},getRelatedTarget:function(L){var K=L.relatedTarget;if(!K){if(L.type=="mouseout"){K=L.toElement;}else{if(L.type=="mouseover"){K=L.fromElement;}}}return this.resolveTextNode(K);},getTime:function(M){if(!M.time){var L=new Date().getTime();try{M.time=L;}catch(K){this.lastError=K;return L;}}return M.time;},stopEvent:function(K){this.stopPropagation(K);this.preventDefault(K);},stopPropagation:function(K){if(K.stopPropagation){K.stopPropagation();}else{K.cancelBubble=true;}},preventDefault:function(K){if(K.preventDefault){K.preventDefault();}else{K.returnValue=false;}},getEvent:function(M,K){var L=M||window.event;if(!L){var N=this.getEvent.caller;while(N){L=N.arguments[0];if(L&&Event==L.constructor){break;}N=N.caller;}}return L;},getCharCode:function(L){var K=L.keyCode||L.charCode||0;if(YAHOO.env.ua.webkit&&(K in D)){K=D[K];}return K;},_getCacheIndex:function(O,P,N){for(var M=0,L=I.length;M<L;M=M+1){var K=I[M];if(K&&K[this.FN]==N&&K[this.EL]==O&&K[this.TYPE]==P){return M;}}return -1;},generateId:function(K){var L=K.id;if(!L){L="yuievtautoid-"+A;++A;K.id=L;}return L;},_isValidCollection:function(L){try{return(L&&typeof L!=="string"&&L.length&&!L.tagName&&!L.alert&&typeof L[0]!=="undefined");}catch(K){return false;}},elCache:{},getEl:function(K){return(typeof K==="string")?document.getElementById(K):K;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(L){if(!H){H=true;var K=YAHOO.util.Event;K._ready();K._tryPreloadAttach();}},_ready:function(L){var K=YAHOO.util.Event;if(!K.DOMReady){K.DOMReady=true;K.DOMReadyEvent.fire();K._simpleRemove(document,"DOMContentLoaded",K._ready);}},_tryPreloadAttach:function(){if(F.length===0){C=0;clearInterval(this._interval);this._interval=null;return ;}if(this.locked){return ;}if(this.isIE){if(!this.DOMReady){this.startInterval();return ;}}this.locked=true;var Q=!H;if(!Q){Q=(C>0&&F.length>0);}var P=[];var R=function(T,U){var S=T;if(U.override){if(U.override===true){S=U.obj;}else{S=U.override;}}U.fn.call(S,U.obj);};var L,K,O,N,M=[];for(L=0,K=F.length;L<K;L=L+1){O=F[L];if(O){N=this.getEl(O.id);if(N){if(O.checkReady){if(H||N.nextSibling||!Q){M.push(O);F[L]=null;}}else{R(N,O);F[L]=null;}}else{P.push(O);}}}for(L=0,K=M.length;L<K;L=L+1){O=M[L];R(this.getEl(O.id),O);}C--;if(Q){for(L=F.length-1;L>-1;L--){O=F[L];if(!O||!O.id){F.splice(L,1);}}this.startInterval();}else{clearInterval(this._interval);this._interval=null;}this.locked=false;},purgeElement:function(O,P,R){var M=(YAHOO.lang.isString(O))?this.getEl(O):O;var Q=this.getListeners(M,R),N,K;if(Q){for(N=Q.length-1;N>-1;N--){var L=Q[N];this.removeListener(M,L.type,L.fn);}}if(P&&M&&M.childNodes){for(N=0,K=M.childNodes.length;N<K;++N){this.purgeElement(M.childNodes[N],P,R);}}},getListeners:function(M,K){var P=[],L;if(!K){L=[I,J];}else{if(K==="unload"){L=[J];}else{L=[I];}}var R=(YAHOO.lang.isString(M))?this.getEl(M):M;for(var O=0;O<L.length;O=O+1){var T=L[O];if(T){for(var Q=0,S=T.length;Q<S;++Q){var N=T[Q];if(N&&N[this.EL]===R&&(!K||K===N[this.TYPE])){P.push({type:N[this.TYPE],fn:N[this.FN],obj:N[this.OBJ],adjust:N[this.OVERRIDE],scope:N[this.ADJ_SCOPE],index:Q});}}}}return(P.length)?P:null;},_unload:function(Q){var K=YAHOO.util.Event,N,M,L,P,O,R=J.slice();for(N=0,P=J.length;N<P;++N){L=R[N];if(L){var S=window;if(L[K.ADJ_SCOPE]){if(L[K.ADJ_SCOPE]===true){S=L[K.UNLOAD_OBJ];}else{S=L[K.ADJ_SCOPE];}}L[K.FN].call(S,K.getEvent(Q,L[K.EL]),L[K.UNLOAD_OBJ]);R[N]=null;L=null;S=null;}}J=null;if(I){for(M=I.length-1;M>-1;M--){L=I[M];if(L){K.removeListener(L[K.EL],L[K.TYPE],L[K.FN],M);}}L=null;}G=null;K._simpleRemove(window,"unload",K._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var K=document.documentElement,L=document.body;if(K&&(K.scrollTop||K.scrollLeft)){return[K.scrollTop,K.scrollLeft];}else{if(L){return[L.scrollTop,L.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(M,N,L,K){M.addEventListener(N,L,(K));};}else{if(window.attachEvent){return function(M,N,L,K){M.attachEvent("on"+N,L);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(M,N,L,K){M.removeEventListener(N,L,(K));};}else{if(window.detachEvent){return function(L,M,K){L.detachEvent("on"+M,K);};}else{return function(){};}}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;
/* DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller */
if(EU.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var n=document.createElement("p");EU._dri=setInterval(function(){try{n.doScroll("left");clearInterval(EU._dri);EU._dri=null;EU._ready();n=null;}catch(ex){}},EU.POLL_INTERVAL);}else{if(EU.webkit&&EU.webkit<525){EU._dri=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._dri);EU._dri=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}}EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[A];if(D){D.subscribe(C,F,E);}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[];}B[A].push({fn:C,obj:F,override:E});}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G);}}else{var B=true;for(var D in A){if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G);}}return B;}return false;},unsubscribeAll:function(A){return this.unsubscribe(A);},createEvent:function(G,D){this.__yui_events=this.__yui_events||{};var A=D||{};var I=this.__yui_events;
if(I[G]){}else{var H=A.scope||this;var E=(A.silent);var B=new YAHOO.util.CustomEvent(G,H,E,YAHOO.util.CustomEvent.FLAT);I[G]=B;if(A.onSubscribeCallback){B.subscribeEvent.subscribe(A.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var F=this.__yui_subscribers[G];if(F){for(var C=0;C<F.length;++C){B.subscribe(F[C].fn,F[C].obj,F[C].override);}}}return I[G];},fireEvent:function(E,D,A,C){this.__yui_events=this.__yui_events||{};var G=this.__yui_events[E];if(!G){return null;}var B=[];for(var F=1;F<arguments.length;++F){B.push(arguments[F]);}return G.fire.apply(G,B);},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true;}}return false;}};YAHOO.util.KeyListener=function(A,F,B,C){if(!A){}else{if(!F){}else{if(!B){}}}if(!C){C=YAHOO.util.KeyListener.KEYDOWN;}var D=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof A=="string"){A=document.getElementById(A);}if(typeof B=="function"){D.subscribe(B);}else{D.subscribe(B.fn,B.scope,B.correctScope);}function E(J,I){if(!F.shift){F.shift=false;}if(!F.alt){F.alt=false;}if(!F.ctrl){F.ctrl=false;}if(J.shiftKey==F.shift&&J.altKey==F.alt&&J.ctrlKey==F.ctrl){var G;if(F.keys instanceof Array){for(var H=0;H<F.keys.length;H++){G=F.keys[H];if(G==J.charCode){D.fire(J.charCode,J);break;}else{if(G==J.keyCode){D.fire(J.keyCode,J);break;}}}}else{G=F.keys;if(G==J.charCode){D.fire(J.charCode,J);}else{if(G==J.keyCode){D.fire(J.keyCode,J);}}}}}this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(A,C,E);this.enabledEvent.fire(F);}this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(A,C,E);this.disabledEvent.fire(F);}this.enabled=false;};this.toString=function(){return"KeyListener ["+F.keys+"] "+A.tagName+(A.id?"["+A.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.util.KeyListener.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};YAHOO.register("event",YAHOO.util.Event,{version:"2.5.2",build:"1076"});YAHOO.register("yahoo-dom-event", YAHOO, {version: "2.5.2", build: "1076"});

/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
(function(){var B=YAHOO.util;var A=function(D,C,E,F){if(!D){}this.init(D,C,E,F);};A.NAME="Anim";A.prototype={toString:function(){var C=this.getEl()||{};var D=C.id||C.tagName;return(this.constructor.NAME+": "+D);},patterns:{noNegatives:/width|height|opacity|padding/i,offsetAttribute:/^((width|height)|(top|left))$/,defaultUnit:/width|height|top$|bottom$|left$|right$/i,offsetUnit:/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i},doMethod:function(C,E,D){return this.method(this.currentFrame,E,D-E,this.totalFrames);},setAttribute:function(C,E,D){if(this.patterns.noNegatives.test(C)){E=(E>0)?E:0;}B.Dom.setStyle(this.getEl(),C,E+D);},getAttribute:function(C){var E=this.getEl();var G=B.Dom.getStyle(E,C);if(G!=="auto"&&!this.patterns.offsetUnit.test(G)){return parseFloat(G);}var D=this.patterns.offsetAttribute.exec(C)||[];var H=!!(D[3]);var F=!!(D[2]);if(F||(B.Dom.getStyle(E,"position")=="absolute"&&H)){G=E["offset"+D[0].charAt(0).toUpperCase()+D[0].substr(1)];}else{G=0;}return G;},getDefaultUnit:function(C){if(this.patterns.defaultUnit.test(C)){return"px";}return"";},setRuntimeAttribute:function(D){var I;var E;var F=this.attributes;this.runtimeAttributes[D]={};var H=function(J){return(typeof J!=="undefined");};if(!H(F[D]["to"])&&!H(F[D]["by"])){return false;}I=(H(F[D]["from"]))?F[D]["from"]:this.getAttribute(D);if(H(F[D]["to"])){E=F[D]["to"];}else{if(H(F[D]["by"])){if(I.constructor==Array){E=[];for(var G=0,C=I.length;G<C;++G){E[G]=I[G]+F[D]["by"][G]*1;}}else{E=I+F[D]["by"]*1;}}}this.runtimeAttributes[D].start=I;this.runtimeAttributes[D].end=E;this.runtimeAttributes[D].unit=(H(F[D].unit))?F[D]["unit"]:this.getDefaultUnit(D);return true;},init:function(E,J,I,C){var D=false;var F=null;var H=0;E=B.Dom.get(E);this.attributes=J||{};this.duration=!YAHOO.lang.isUndefined(I)?I:1;this.method=C||B.Easing.easeNone;this.useSeconds=true;this.currentFrame=0;this.totalFrames=B.AnimMgr.fps;this.setEl=function(M){E=B.Dom.get(M);};this.getEl=function(){return E;};this.isAnimated=function(){return D;};this.getStartTime=function(){return F;};this.runtimeAttributes={};this.animate=function(){if(this.isAnimated()){return false;}this.currentFrame=0;this.totalFrames=(this.useSeconds)?Math.ceil(B.AnimMgr.fps*this.duration):this.duration;if(this.duration===0&&this.useSeconds){this.totalFrames=1;}B.AnimMgr.registerElement(this);return true;};this.stop=function(M){if(!this.isAnimated()){return false;}if(M){this.currentFrame=this.totalFrames;this._onTween.fire();}B.AnimMgr.stop(this);};var L=function(){this.onStart.fire();this.runtimeAttributes={};for(var M in this.attributes){this.setRuntimeAttribute(M);}D=true;H=0;F=new Date();};var K=function(){var O={duration:new Date()-this.getStartTime(),currentFrame:this.currentFrame};O.toString=function(){return("duration: "+O.duration+", currentFrame: "+O.currentFrame);};this.onTween.fire(O);var N=this.runtimeAttributes;for(var M in N){this.setAttribute(M,this.doMethod(M,N[M].start,N[M].end),N[M].unit);}H+=1;};var G=function(){var M=(new Date()-F)/1000;var N={duration:M,frames:H,fps:H/M};N.toString=function(){return("duration: "+N.duration+", frames: "+N.frames+", fps: "+N.fps);};D=false;H=0;this.onComplete.fire(N);};this._onStart=new B.CustomEvent("_start",this,true);this.onStart=new B.CustomEvent("start",this);this.onTween=new B.CustomEvent("tween",this);this._onTween=new B.CustomEvent("_tween",this,true);this.onComplete=new B.CustomEvent("complete",this);this._onComplete=new B.CustomEvent("_complete",this,true);this._onStart.subscribe(L);this._onTween.subscribe(K);this._onComplete.subscribe(G);}};B.Anim=A;})();YAHOO.util.AnimMgr=new function(){var C=null;var B=[];var A=0;this.fps=1000;this.delay=1;this.registerElement=function(F){B[B.length]=F;A+=1;F._onStart.fire();this.start();};this.unRegister=function(G,F){F=F||E(G);if(!G.isAnimated()||F==-1){return false;}G._onComplete.fire();B.splice(F,1);A-=1;if(A<=0){this.stop();}return true;};this.start=function(){if(C===null){C=setInterval(this.run,this.delay);}};this.stop=function(H){if(!H){clearInterval(C);for(var G=0,F=B.length;G<F;++G){this.unRegister(B[0],0);}B=[];C=null;A=0;}else{this.unRegister(H);}};this.run=function(){for(var H=0,F=B.length;H<F;++H){var G=B[H];if(!G||!G.isAnimated()){continue;}if(G.currentFrame<G.totalFrames||G.totalFrames===null){G.currentFrame+=1;if(G.useSeconds){D(G);}G._onTween.fire();}else{YAHOO.util.AnimMgr.stop(G,H);}}};var E=function(H){for(var G=0,F=B.length;G<F;++G){if(B[G]==H){return G;}}return -1;};var D=function(G){var J=G.totalFrames;var I=G.currentFrame;var H=(G.currentFrame*G.duration*1000/G.totalFrames);var F=(new Date()-G.getStartTime());var K=0;if(F<G.duration*1000){K=Math.round((F/H-1)*G.currentFrame);}else{K=J-(I+1);}if(K>0&&isFinite(K)){if(G.currentFrame+K>=J){K=J-(I+1);}G.currentFrame+=K;}};};YAHOO.util.Bezier=new function(){this.getPosition=function(E,D){var F=E.length;var C=[];for(var B=0;B<F;++B){C[B]=[E[B][0],E[B][1]];}for(var A=1;A<F;++A){for(B=0;B<F-A;++B){C[B][0]=(1-D)*C[B][0]+D*C[parseInt(B+1,10)][0];C[B][1]=(1-D)*C[B][1]+D*C[parseInt(B+1,10)][1];}}return[C[0][0],C[0][1]];};};(function(){var A=function(F,E,G,H){A.superclass.constructor.call(this,F,E,G,H);};A.NAME="ColorAnim";var C=YAHOO.util;YAHOO.extend(A,C.Anim);var D=A.superclass;var B=A.prototype;B.patterns.color=/color$/i;B.patterns.rgb=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;B.patterns.hex=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;B.patterns.hex3=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;B.patterns.transparent=/^transparent|rgba\(0, 0, 0, 0\)$/;B.parseColor=function(E){if(E.length==3){return E;}var F=this.patterns.hex.exec(E);if(F&&F.length==4){return[parseInt(F[1],16),parseInt(F[2],16),parseInt(F[3],16)];}F=this.patterns.rgb.exec(E);if(F&&F.length==4){return[parseInt(F[1],10),parseInt(F[2],10),parseInt(F[3],10)];}F=this.patterns.hex3.exec(E);if(F&&F.length==4){return[parseInt(F[1]+F[1],16),parseInt(F[2]+F[2],16),parseInt(F[3]+F[3],16)];}return null;};B.getAttribute=function(E){var G=this.getEl();if(this.patterns.color.test(E)){var H=YAHOO.util.Dom.getStyle(G,E);
if(this.patterns.transparent.test(H)){var F=G.parentNode;H=C.Dom.getStyle(F,E);while(F&&this.patterns.transparent.test(H)){F=F.parentNode;H=C.Dom.getStyle(F,E);if(F.tagName.toUpperCase()=="HTML"){H="#fff";}}}}else{H=D.getAttribute.call(this,E);}return H;};B.doMethod=function(F,J,G){var I;if(this.patterns.color.test(F)){I=[];for(var H=0,E=J.length;H<E;++H){I[H]=D.doMethod.call(this,F,J[H],G[H]);}I="rgb("+Math.floor(I[0])+","+Math.floor(I[1])+","+Math.floor(I[2])+")";}else{I=D.doMethod.call(this,F,J,G);}return I;};B.setRuntimeAttribute=function(F){D.setRuntimeAttribute.call(this,F);if(this.patterns.color.test(F)){var H=this.attributes;var J=this.parseColor(this.runtimeAttributes[F].start);var G=this.parseColor(this.runtimeAttributes[F].end);if(typeof H[F]["to"]==="undefined"&&typeof H[F]["by"]!=="undefined"){G=this.parseColor(H[F].by);for(var I=0,E=J.length;I<E;++I){G[I]=J[I]+G[I];}}this.runtimeAttributes[F].start=J;this.runtimeAttributes[F].end=G;}};C.ColorAnim=A;})();
/*
TERMS OF USE - EASING EQUATIONS
Open source under the BSD License.
Copyright 2001 Robert Penner All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the author nor the names of contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
YAHOO.util.Easing={easeNone:function(B,A,D,C){return D*B/C+A;},easeIn:function(B,A,D,C){return D*(B/=C)*B+A;},easeOut:function(B,A,D,C){return -D*(B/=C)*(B-2)+A;},easeBoth:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B+A;}return -D/2*((--B)*(B-2)-1)+A;},easeInStrong:function(B,A,D,C){return D*(B/=C)*B*B*B+A;},easeOutStrong:function(B,A,D,C){return -D*((B=B/C-1)*B*B*B-1)+A;},easeBothStrong:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B*B*B+A;}return -D/2*((B-=2)*B*B*B-2)+A;},elasticIn:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}return -(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;},elasticOut:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}return B*Math.pow(2,-10*C)*Math.sin((C*F-D)*(2*Math.PI)/E)+G+A;},elasticBoth:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F/2)==2){return A+G;}if(!E){E=F*(0.3*1.5);}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}if(C<1){return -0.5*(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;}return B*Math.pow(2,-10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E)*0.5+G+A;},backIn:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}return E*(B/=D)*B*((C+1)*B-C)+A;},backOut:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}return E*((B=B/D-1)*B*((C+1)*B+C)+1)+A;},backBoth:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}if((B/=D/2)<1){return E/2*(B*B*(((C*=(1.525))+1)*B-C))+A;}return E/2*((B-=2)*B*(((C*=(1.525))+1)*B+C)+2)+A;},bounceIn:function(B,A,D,C){return D-YAHOO.util.Easing.bounceOut(C-B,0,D,C)+A;},bounceOut:function(B,A,D,C){if((B/=C)<(1/2.75)){return D*(7.5625*B*B)+A;}else{if(B<(2/2.75)){return D*(7.5625*(B-=(1.5/2.75))*B+0.75)+A;}else{if(B<(2.5/2.75)){return D*(7.5625*(B-=(2.25/2.75))*B+0.9375)+A;}}}return D*(7.5625*(B-=(2.625/2.75))*B+0.984375)+A;},bounceBoth:function(B,A,D,C){if(B<C/2){return YAHOO.util.Easing.bounceIn(B*2,0,D,C)*0.5+A;}return YAHOO.util.Easing.bounceOut(B*2-C,0,D,C)*0.5+D*0.5+A;}};(function(){var A=function(H,G,I,J){if(H){A.superclass.constructor.call(this,H,G,I,J);}};A.NAME="Motion";var E=YAHOO.util;YAHOO.extend(A,E.ColorAnim);var F=A.superclass;var C=A.prototype;C.patterns.points=/^points$/i;C.setAttribute=function(G,I,H){if(this.patterns.points.test(G)){H=H||"px";F.setAttribute.call(this,"left",I[0],H);F.setAttribute.call(this,"top",I[1],H);}else{F.setAttribute.call(this,G,I,H);}};C.getAttribute=function(G){if(this.patterns.points.test(G)){var H=[F.getAttribute.call(this,"left"),F.getAttribute.call(this,"top")];}else{H=F.getAttribute.call(this,G);}return H;};C.doMethod=function(G,K,H){var J=null;if(this.patterns.points.test(G)){var I=this.method(this.currentFrame,0,100,this.totalFrames)/100;J=E.Bezier.getPosition(this.runtimeAttributes[G],I);}else{J=F.doMethod.call(this,G,K,H);}return J;};C.setRuntimeAttribute=function(P){if(this.patterns.points.test(P)){var H=this.getEl();var J=this.attributes;var G;var L=J["points"]["control"]||[];var I;var M,O;if(L.length>0&&!(L[0] instanceof Array)){L=[L];}else{var K=[];for(M=0,O=L.length;M<O;++M){K[M]=L[M];}L=K;}if(E.Dom.getStyle(H,"position")=="static"){E.Dom.setStyle(H,"position","relative");}if(D(J["points"]["from"])){E.Dom.setXY(H,J["points"]["from"]);}else{E.Dom.setXY(H,E.Dom.getXY(H));}G=this.getAttribute("points");if(D(J["points"]["to"])){I=B.call(this,J["points"]["to"],G);
var N=E.Dom.getXY(this.getEl());for(M=0,O=L.length;M<O;++M){L[M]=B.call(this,L[M],G);}}else{if(D(J["points"]["by"])){I=[G[0]+J["points"]["by"][0],G[1]+J["points"]["by"][1]];for(M=0,O=L.length;M<O;++M){L[M]=[G[0]+L[M][0],G[1]+L[M][1]];}}}this.runtimeAttributes[P]=[G];if(L.length>0){this.runtimeAttributes[P]=this.runtimeAttributes[P].concat(L);}this.runtimeAttributes[P][this.runtimeAttributes[P].length]=I;}else{F.setRuntimeAttribute.call(this,P);}};var B=function(G,I){var H=E.Dom.getXY(this.getEl());G=[G[0]-H[0]+I[0],G[1]-H[1]+I[1]];return G;};var D=function(G){return(typeof G!=="undefined");};E.Motion=A;})();(function(){var D=function(F,E,G,H){if(F){D.superclass.constructor.call(this,F,E,G,H);}};D.NAME="Scroll";var B=YAHOO.util;YAHOO.extend(D,B.ColorAnim);var C=D.superclass;var A=D.prototype;A.doMethod=function(E,H,F){var G=null;if(E=="scroll"){G=[this.method(this.currentFrame,H[0],F[0]-H[0],this.totalFrames),this.method(this.currentFrame,H[1],F[1]-H[1],this.totalFrames)];}else{G=C.doMethod.call(this,E,H,F);}return G;};A.getAttribute=function(E){var G=null;var F=this.getEl();if(E=="scroll"){G=[F.scrollLeft,F.scrollTop];}else{G=C.getAttribute.call(this,E);}return G;};A.setAttribute=function(E,H,G){var F=this.getEl();if(E=="scroll"){F.scrollLeft=H[0];F.scrollTop=H[1];}else{C.setAttribute.call(this,E,H,G);}};B.Scroll=D;})();YAHOO.register("animation",YAHOO.util.Anim,{version:"2.5.2",build:"1076"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
YAHOO.util.Connect={_msxml_progid:["Microsoft.XMLHTTP","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"],_http_headers:{},_has_http_headers:false,_use_default_post_header:true,_default_post_header:"application/x-www-form-urlencoded; charset=UTF-8",_default_form_header:"application/x-www-form-urlencoded",_use_default_xhr_header:true,_default_xhr_header:"XMLHttpRequest",_has_default_headers:true,_default_headers:{},_isFormSubmit:false,_isFileUpload:false,_formNode:null,_sFormData:null,_poll:{},_timeOut:{},_polling_interval:50,_transaction_id:0,_submitElementValue:null,_hasSubmitListener:(function(){if(YAHOO.util.Event){YAHOO.util.Event.addListener(document,"click",function(B){var A=YAHOO.util.Event.getTarget(B);if(A.nodeName.toLowerCase()=="input"&&(A.type&&A.type.toLowerCase()=="submit")){YAHOO.util.Connect._submitElementValue=encodeURIComponent(A.name)+"="+encodeURIComponent(A.value);}});return true;}return false;})(),startEvent:new YAHOO.util.CustomEvent("start"),completeEvent:new YAHOO.util.CustomEvent("complete"),successEvent:new YAHOO.util.CustomEvent("success"),failureEvent:new YAHOO.util.CustomEvent("failure"),uploadEvent:new YAHOO.util.CustomEvent("upload"),abortEvent:new YAHOO.util.CustomEvent("abort"),_customEvents:{onStart:["startEvent","start"],onComplete:["completeEvent","complete"],onSuccess:["successEvent","success"],onFailure:["failureEvent","failure"],onUpload:["uploadEvent","upload"],onAbort:["abortEvent","abort"]},setProgId:function(A){this._msxml_progid.unshift(A);YAHOO.log("ActiveX Program Id  "+A+" added to _msxml_progid.","info","Connection");},setDefaultPostHeader:function(A){if(typeof A=="string"){this._default_post_header=A;YAHOO.log("Default POST header set to  "+A,"info","Connection");}else{if(typeof A=="boolean"){this._use_default_post_header=A;}}},setDefaultXhrHeader:function(A){if(typeof A=="string"){this._default_xhr_header=A;YAHOO.log("Default XHR header set to  "+A,"info","Connection");}else{this._use_default_xhr_header=A;}},setPollingInterval:function(A){if(typeof A=="number"&&isFinite(A)){this._polling_interval=A;YAHOO.log("Default polling interval set to "+A+"ms","info","Connection");}},createXhrObject:function(E){var D,A;try{A=new XMLHttpRequest();D={conn:A,tId:E};YAHOO.log("XHR object created for transaction "+E,"info","Connection");}catch(C){for(var B=0;B<this._msxml_progid.length;++B){try{A=new ActiveXObject(this._msxml_progid[B]);D={conn:A,tId:E};YAHOO.log("ActiveX XHR object created for transaction "+E,"info","Connection");break;}catch(C){}}}finally{return D;}},getConnectionObject:function(A){var C;var D=this._transaction_id;try{if(!A){C=this.createXhrObject(D);}else{C={};C.tId=D;C.isUpload=true;}if(C){this._transaction_id++;}}catch(B){}finally{return C;}},asyncRequest:function(F,C,E,A){var D=(this._isFileUpload)?this.getConnectionObject(true):this.getConnectionObject();var B=(E&&E.argument)?E.argument:null;if(!D){YAHOO.log("Unable to create connection object.","error","Connection");return null;}else{if(E&&E.customevents){this.initCustomEvents(D,E);}if(this._isFormSubmit){if(this._isFileUpload){this.uploadFile(D,E,C,A);return D;}if(F.toUpperCase()=="GET"){if(this._sFormData.length!==0){C+=((C.indexOf("?")==-1)?"?":"&")+this._sFormData;}}else{if(F.toUpperCase()=="POST"){A=A?this._sFormData+"&"+A:this._sFormData;}}}if(F.toUpperCase()=="GET"&&(E&&E.cache===false)){C+=((C.indexOf("?")==-1)?"?":"&")+"rnd="+new Date().valueOf().toString();}D.conn.open(F,C,true);if(this._use_default_xhr_header){if(!this._default_headers["X-Requested-With"]){this.initHeader("X-Requested-With",this._default_xhr_header,true);YAHOO.log("Initialize transaction header X-Request-Header to XMLHttpRequest.","info","Connection");}}if((F.toUpperCase()=="POST"&&this._use_default_post_header)&&this._isFormSubmit===false){this.initHeader("Content-Type",this._default_post_header);YAHOO.log("Initialize header Content-Type to application/x-www-form-urlencoded; UTF-8 for POST transaction.","info","Connection");}if(this._has_default_headers||this._has_http_headers){this.setHeader(D);}this.handleReadyState(D,E);D.conn.send(A||"");YAHOO.log("Transaction "+D.tId+" sent.","info","Connection");if(this._isFormSubmit===true){this.resetFormState();}this.startEvent.fire(D,B);if(D.startEvent){D.startEvent.fire(D,B);}return D;}},initCustomEvents:function(A,C){for(var B in C.customevents){if(this._customEvents[B][0]){A[this._customEvents[B][0]]=new YAHOO.util.CustomEvent(this._customEvents[B][1],(C.scope)?C.scope:null);YAHOO.log("Transaction-specific Custom Event "+A[this._customEvents[B][1]]+" created.","info","Connection");A[this._customEvents[B][0]].subscribe(C.customevents[B]);YAHOO.log("Transaction-specific Custom Event "+A[this._customEvents[B][1]]+" subscribed.","info","Connection");}}},handleReadyState:function(C,D){var B=this;var A=(D&&D.argument)?D.argument:null;if(D&&D.timeout){this._timeOut[C.tId]=window.setTimeout(function(){B.abort(C,D,true);},D.timeout);}this._poll[C.tId]=window.setInterval(function(){if(C.conn&&C.conn.readyState===4){window.clearInterval(B._poll[C.tId]);delete B._poll[C.tId];if(D&&D.timeout){window.clearTimeout(B._timeOut[C.tId]);delete B._timeOut[C.tId];}B.completeEvent.fire(C,A);if(C.completeEvent){C.completeEvent.fire(C,A);}B.handleTransactionResponse(C,D);}},this._polling_interval);},handleTransactionResponse:function(F,G,A){var D,C;var B=(G&&G.argument)?G.argument:null;try{if(F.conn.status!==undefined&&F.conn.status!==0){D=F.conn.status;}else{D=13030;}}catch(E){D=13030;}if(D>=200&&D<300||D===1223){C=this.createResponseObject(F,B);if(G&&G.success){if(!G.scope){G.success(C);YAHOO.log("Success callback. HTTP code is "+D,"info","Connection");}else{G.success.apply(G.scope,[C]);YAHOO.log("Success callback with scope. HTTP code is "+D,"info","Connection");}}this.successEvent.fire(C);if(F.successEvent){F.successEvent.fire(C);}}else{switch(D){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:C=this.createExceptionObject(F.tId,B,(A?A:false));if(G&&G.failure){if(!G.scope){G.failure(C);
YAHOO.log("Failure callback. Exception detected. Status code is "+D,"warn","Connection");}else{G.failure.apply(G.scope,[C]);YAHOO.log("Failure callback with scope. Exception detected. Status code is "+D,"warn","Connection");}}break;default:C=this.createResponseObject(F,B);if(G&&G.failure){if(!G.scope){G.failure(C);YAHOO.log("Failure callback. HTTP status code is "+D,"warn","Connection");}else{G.failure.apply(G.scope,[C]);YAHOO.log("Failure callback with scope. HTTP status code is "+D,"warn","Connection");}}}this.failureEvent.fire(C);if(F.failureEvent){F.failureEvent.fire(C);}}this.releaseObject(F);C=null;},createResponseObject:function(A,G){var D={};var I={};try{var C=A.conn.getAllResponseHeaders();var F=C.split("\n");for(var E=0;E<F.length;E++){var B=F[E].indexOf(":");if(B!=-1){I[F[E].substring(0,B)]=F[E].substring(B+2);}}}catch(H){}D.tId=A.tId;D.status=(A.conn.status==1223)?204:A.conn.status;D.statusText=(A.conn.status==1223)?"No Content":A.conn.statusText;D.getResponseHeader=I;D.getAllResponseHeaders=C;D.responseText=A.conn.responseText;D.responseXML=A.conn.responseXML;if(G){D.argument=G;}return D;},createExceptionObject:function(H,D,A){var F=0;var G="communication failure";var C=-1;var B="transaction aborted";var E={};E.tId=H;if(A){E.status=C;E.statusText=B;}else{E.status=F;E.statusText=G;}if(D){E.argument=D;}return E;},initHeader:function(A,D,C){var B=(C)?this._default_headers:this._http_headers;B[A]=D;if(C){this._has_default_headers=true;}else{this._has_http_headers=true;}},setHeader:function(A){if(this._has_default_headers){for(var B in this._default_headers){if(YAHOO.lang.hasOwnProperty(this._default_headers,B)){A.conn.setRequestHeader(B,this._default_headers[B]);YAHOO.log("Default HTTP header "+B+" set with value of "+this._default_headers[B],"info","Connection");}}}if(this._has_http_headers){for(var B in this._http_headers){if(YAHOO.lang.hasOwnProperty(this._http_headers,B)){A.conn.setRequestHeader(B,this._http_headers[B]);YAHOO.log("HTTP header "+B+" set with value of "+this._http_headers[B],"info","Connection");}}delete this._http_headers;this._http_headers={};this._has_http_headers=false;}},resetDefaultHeaders:function(){delete this._default_headers;this._default_headers={};this._has_default_headers=false;},setForm:function(K,E,B){this.resetFormState();var J;if(typeof K=="string"){J=(document.getElementById(K)||document.forms[K]);}else{if(typeof K=="object"){J=K;}else{YAHOO.log("Unable to create form object "+K,"warn","Connection");return ;}}if(E){var F=this.createFrame((window.location.href.toLowerCase().indexOf("https")===0||B)?true:false);this._isFormSubmit=true;this._isFileUpload=true;this._formNode=J;return ;}var A,I,G,L;var H=false;for(var D=0;D<J.elements.length;D++){A=J.elements[D];L=A.disabled;I=A.name;G=A.value;if(!L&&I){switch(A.type){case"select-one":case"select-multiple":for(var C=0;C<A.options.length;C++){if(A.options[C].selected){if(window.ActiveXObject){this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(A.options[C].attributes["value"].specified?A.options[C].value:A.options[C].text)+"&";}else{this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(A.options[C].hasAttribute("value")?A.options[C].value:A.options[C].text)+"&";}}}break;case"radio":case"checkbox":if(A.checked){this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(G)+"&";}break;case"file":case undefined:case"reset":case"button":break;case"submit":if(H===false){if(this._hasSubmitListener&&this._submitElementValue){this._sFormData+=this._submitElementValue+"&";}else{this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(G)+"&";}H=true;}break;default:this._sFormData+=encodeURIComponent(I)+"="+encodeURIComponent(G)+"&";}}}this._isFormSubmit=true;this._sFormData=this._sFormData.substr(0,this._sFormData.length-1);YAHOO.log("Form initialized for transaction. HTML form POST message is: "+this._sFormData,"info","Connection");this.initHeader("Content-Type",this._default_form_header);YAHOO.log("Initialize header Content-Type to application/x-www-form-urlencoded for setForm() transaction.","info","Connection");return this._sFormData;},resetFormState:function(){this._isFormSubmit=false;this._isFileUpload=false;this._formNode=null;this._sFormData="";},createFrame:function(A){var B="yuiIO"+this._transaction_id;var C;if(window.ActiveXObject){C=document.createElement('<iframe id="'+B+'" name="'+B+'" />');if(typeof A=="boolean"){C.src="javascript:false";}}else{C=document.createElement("iframe");C.id=B;C.name=B;}C.style.position="absolute";C.style.top="-1000px";C.style.left="-1000px";document.body.appendChild(C);YAHOO.log("File upload iframe created. Id is:"+B,"info","Connection");},appendPostData:function(A){var D=[];var B=A.split("&");for(var C=0;C<B.length;C++){var E=B[C].indexOf("=");if(E!=-1){D[C]=document.createElement("input");D[C].type="hidden";D[C].name=B[C].substring(0,E);D[C].value=B[C].substring(E+1);this._formNode.appendChild(D[C]);}}return D;},uploadFile:function(D,M,E,C){var N=this;var H="yuiIO"+D.tId;var I="multipart/form-data";var K=document.getElementById(H);var J=(M&&M.argument)?M.argument:null;var B={action:this._formNode.getAttribute("action"),method:this._formNode.getAttribute("method"),target:this._formNode.getAttribute("target")};this._formNode.setAttribute("action",E);this._formNode.setAttribute("method","POST");this._formNode.setAttribute("target",H);if(YAHOO.env.ua.ie){this._formNode.setAttribute("encoding",I);}else{this._formNode.setAttribute("enctype",I);}if(C){var L=this.appendPostData(C);}this._formNode.submit();this.startEvent.fire(D,J);if(D.startEvent){D.startEvent.fire(D,J);}if(M&&M.timeout){this._timeOut[D.tId]=window.setTimeout(function(){N.abort(D,M,true);},M.timeout);}if(L&&L.length>0){for(var G=0;G<L.length;G++){this._formNode.removeChild(L[G]);}}for(var A in B){if(YAHOO.lang.hasOwnProperty(B,A)){if(B[A]){this._formNode.setAttribute(A,B[A]);}else{this._formNode.removeAttribute(A);}}}this.resetFormState();var F=function(){if(M&&M.timeout){window.clearTimeout(N._timeOut[D.tId]);
delete N._timeOut[D.tId];}N.completeEvent.fire(D,J);if(D.completeEvent){D.completeEvent.fire(D,J);}var P={};P.tId=D.tId;P.argument=M.argument;try{P.responseText=K.contentWindow.document.body?K.contentWindow.document.body.innerHTML:K.contentWindow.document.documentElement.textContent;P.responseXML=K.contentWindow.document.XMLDocument?K.contentWindow.document.XMLDocument:K.contentWindow.document;}catch(O){}if(M&&M.upload){if(!M.scope){M.upload(P);YAHOO.log("Upload callback.","info","Connection");}else{M.upload.apply(M.scope,[P]);YAHOO.log("Upload callback with scope.","info","Connection");}}N.uploadEvent.fire(P);if(D.uploadEvent){D.uploadEvent.fire(P);}YAHOO.util.Event.removeListener(K,"load",F);setTimeout(function(){document.body.removeChild(K);N.releaseObject(D);YAHOO.log("File upload iframe destroyed. Id is:"+H,"info","Connection");},100);};YAHOO.util.Event.addListener(K,"load",F);},abort:function(E,G,A){var D;var B=(G&&G.argument)?G.argument:null;if(E&&E.conn){if(this.isCallInProgress(E)){E.conn.abort();window.clearInterval(this._poll[E.tId]);delete this._poll[E.tId];if(A){window.clearTimeout(this._timeOut[E.tId]);delete this._timeOut[E.tId];}D=true;}}else{if(E&&E.isUpload===true){var C="yuiIO"+E.tId;var F=document.getElementById(C);if(F){YAHOO.util.Event.removeListener(F,"load");document.body.removeChild(F);YAHOO.log("File upload iframe destroyed. Id is:"+C,"info","Connection");if(A){window.clearTimeout(this._timeOut[E.tId]);delete this._timeOut[E.tId];}D=true;}}else{D=false;}}if(D===true){this.abortEvent.fire(E,B);if(E.abortEvent){E.abortEvent.fire(E,B);}this.handleTransactionResponse(E,G,true);YAHOO.log("Transaction "+E.tId+" aborted.","info","Connection");}return D;},isCallInProgress:function(B){if(B&&B.conn){return B.conn.readyState!==4&&B.conn.readyState!==0;}else{if(B&&B.isUpload===true){var A="yuiIO"+B.tId;return document.getElementById(A)?true:false;}else{return false;}}},releaseObject:function(A){if(A&&A.conn){A.conn=null;YAHOO.log("Connection object for transaction "+A.tId+" destroyed.","info","Connection");A=null;}}};YAHOO.register("connection",YAHOO.util.Connect,{version:"2.5.2",build:"1076"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
YAHOO.widget.AutoComplete=function(G,B,J,C){if(G&&B&&J){if(J instanceof YAHOO.widget.DataSource){this.dataSource=J;}else{return ;}if(YAHOO.util.Dom.inDocument(G)){if(YAHOO.lang.isString(G)){this._sName="instance"+YAHOO.widget.AutoComplete._nIndex+" "+G;this._elTextbox=document.getElementById(G);}else{this._sName=(G.id)?"instance"+YAHOO.widget.AutoComplete._nIndex+" "+G.id:"instance"+YAHOO.widget.AutoComplete._nIndex;this._elTextbox=G;}YAHOO.util.Dom.addClass(this._elTextbox,"yui-ac-input");}else{return ;}if(YAHOO.util.Dom.inDocument(B)){if(YAHOO.lang.isString(B)){this._elContainer=document.getElementById(B);}else{this._elContainer=B;}if(this._elContainer.style.display=="none"){}var D=this._elContainer.parentNode;var A=D.tagName.toLowerCase();if(A=="div"){YAHOO.util.Dom.addClass(D,"yui-ac");}else{}}else{return ;}if(C&&(C.constructor==Object)){for(var I in C){if(I){this[I]=C[I];}}}this._initContainer();this._initProps();this._initList();this._initContainerHelpers();var H=this;var F=this._elTextbox;var E=this._elContent;YAHOO.util.Event.addListener(F,"keyup",H._onTextboxKeyUp,H);YAHOO.util.Event.addListener(F,"keydown",H._onTextboxKeyDown,H);YAHOO.util.Event.addListener(F,"focus",H._onTextboxFocus,H);YAHOO.util.Event.addListener(F,"blur",H._onTextboxBlur,H);YAHOO.util.Event.addListener(E,"mouseover",H._onContainerMouseover,H);YAHOO.util.Event.addListener(E,"mouseout",H._onContainerMouseout,H);YAHOO.util.Event.addListener(E,"scroll",H._onContainerScroll,H);YAHOO.util.Event.addListener(E,"resize",H._onContainerResize,H);YAHOO.util.Event.addListener(F,"keypress",H._onTextboxKeyPress,H);YAHOO.util.Event.addListener(window,"unload",H._onWindowUnload,H);this.textboxFocusEvent=new YAHOO.util.CustomEvent("textboxFocus",this);this.textboxKeyEvent=new YAHOO.util.CustomEvent("textboxKey",this);this.dataRequestEvent=new YAHOO.util.CustomEvent("dataRequest",this);this.dataReturnEvent=new YAHOO.util.CustomEvent("dataReturn",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.containerExpandEvent=new YAHOO.util.CustomEvent("containerExpand",this);this.typeAheadEvent=new YAHOO.util.CustomEvent("typeAhead",this);this.itemMouseOverEvent=new YAHOO.util.CustomEvent("itemMouseOver",this);this.itemMouseOutEvent=new YAHOO.util.CustomEvent("itemMouseOut",this);this.itemArrowToEvent=new YAHOO.util.CustomEvent("itemArrowTo",this);this.itemArrowFromEvent=new YAHOO.util.CustomEvent("itemArrowFrom",this);this.itemSelectEvent=new YAHOO.util.CustomEvent("itemSelect",this);this.unmatchedItemSelectEvent=new YAHOO.util.CustomEvent("unmatchedItemSelect",this);this.selectionEnforceEvent=new YAHOO.util.CustomEvent("selectionEnforce",this);this.containerCollapseEvent=new YAHOO.util.CustomEvent("containerCollapse",this);this.textboxBlurEvent=new YAHOO.util.CustomEvent("textboxBlur",this);F.setAttribute("autocomplete","off");YAHOO.widget.AutoComplete._nIndex++;}else{}};YAHOO.widget.AutoComplete.prototype.dataSource=null;YAHOO.widget.AutoComplete.prototype.minQueryLength=1;YAHOO.widget.AutoComplete.prototype.maxResultsDisplayed=10;YAHOO.widget.AutoComplete.prototype.queryDelay=0.2;YAHOO.widget.AutoComplete.prototype.highlightClassName="yui-ac-highlight";YAHOO.widget.AutoComplete.prototype.prehighlightClassName=null;YAHOO.widget.AutoComplete.prototype.delimChar=null;YAHOO.widget.AutoComplete.prototype.autoHighlight=true;YAHOO.widget.AutoComplete.prototype.typeAhead=false;YAHOO.widget.AutoComplete.prototype.animHoriz=false;YAHOO.widget.AutoComplete.prototype.animVert=true;YAHOO.widget.AutoComplete.prototype.animSpeed=0.3;YAHOO.widget.AutoComplete.prototype.forceSelection=false;YAHOO.widget.AutoComplete.prototype.allowBrowserAutocomplete=true;YAHOO.widget.AutoComplete.prototype.alwaysShowContainer=false;YAHOO.widget.AutoComplete.prototype.useIFrame=false;YAHOO.widget.AutoComplete.prototype.useShadow=false;YAHOO.widget.AutoComplete.prototype.toString=function(){return"AutoComplete "+this._sName;};YAHOO.widget.AutoComplete.prototype.isContainerOpen=function(){return this._bContainerOpen;};YAHOO.widget.AutoComplete.prototype.getListItems=function(){return this._aListItems;};YAHOO.widget.AutoComplete.prototype.getListItemData=function(A){if(A._oResultData){return A._oResultData;}else{return false;}};YAHOO.widget.AutoComplete.prototype.setHeader=function(B){if(this._elHeader){var A=this._elHeader;if(B){A.innerHTML=B;A.style.display="block";}else{A.innerHTML="";A.style.display="none";}}};YAHOO.widget.AutoComplete.prototype.setFooter=function(B){if(this._elFooter){var A=this._elFooter;if(B){A.innerHTML=B;A.style.display="block";}else{A.innerHTML="";A.style.display="none";}}};YAHOO.widget.AutoComplete.prototype.setBody=function(A){if(this._elBody){var B=this._elBody;if(A){B.innerHTML=A;B.style.display="block";B.style.display="block";}else{B.innerHTML="";B.style.display="none";}this._maxResultsDisplayed=0;}};YAHOO.widget.AutoComplete.prototype.formatResult=function(B,C){var A=B[0];if(A){return A;}else{return"";}};YAHOO.widget.AutoComplete.prototype.doBeforeExpandContainer=function(D,A,C,B){return true;};YAHOO.widget.AutoComplete.prototype.sendQuery=function(A){this._sendQuery(A);};YAHOO.widget.AutoComplete.prototype.doBeforeSendQuery=function(A){return A;};YAHOO.widget.AutoComplete.prototype.destroy=function(){var B=this.toString();var A=this._elTextbox;var D=this._elContainer;this.textboxFocusEvent.unsubscribeAll();this.textboxKeyEvent.unsubscribeAll();this.dataRequestEvent.unsubscribeAll();this.dataReturnEvent.unsubscribeAll();this.dataErrorEvent.unsubscribeAll();this.containerExpandEvent.unsubscribeAll();this.typeAheadEvent.unsubscribeAll();this.itemMouseOverEvent.unsubscribeAll();this.itemMouseOutEvent.unsubscribeAll();this.itemArrowToEvent.unsubscribeAll();this.itemArrowFromEvent.unsubscribeAll();this.itemSelectEvent.unsubscribeAll();this.unmatchedItemSelectEvent.unsubscribeAll();this.selectionEnforceEvent.unsubscribeAll();this.containerCollapseEvent.unsubscribeAll();this.textboxBlurEvent.unsubscribeAll();YAHOO.util.Event.purgeElement(A,true);
YAHOO.util.Event.purgeElement(D,true);D.innerHTML="";for(var C in this){if(YAHOO.lang.hasOwnProperty(this,C)){this[C]=null;}}};YAHOO.widget.AutoComplete.prototype.textboxFocusEvent=null;YAHOO.widget.AutoComplete.prototype.textboxKeyEvent=null;YAHOO.widget.AutoComplete.prototype.dataRequestEvent=null;YAHOO.widget.AutoComplete.prototype.dataReturnEvent=null;YAHOO.widget.AutoComplete.prototype.dataErrorEvent=null;YAHOO.widget.AutoComplete.prototype.containerExpandEvent=null;YAHOO.widget.AutoComplete.prototype.typeAheadEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOverEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOutEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowToEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowFromEvent=null;YAHOO.widget.AutoComplete.prototype.itemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.unmatchedItemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.selectionEnforceEvent=null;YAHOO.widget.AutoComplete.prototype.containerCollapseEvent=null;YAHOO.widget.AutoComplete.prototype.textboxBlurEvent=null;YAHOO.widget.AutoComplete._nIndex=0;YAHOO.widget.AutoComplete.prototype._sName=null;YAHOO.widget.AutoComplete.prototype._elTextbox=null;YAHOO.widget.AutoComplete.prototype._elContainer=null;YAHOO.widget.AutoComplete.prototype._elContent=null;YAHOO.widget.AutoComplete.prototype._elHeader=null;YAHOO.widget.AutoComplete.prototype._elBody=null;YAHOO.widget.AutoComplete.prototype._elFooter=null;YAHOO.widget.AutoComplete.prototype._elShadow=null;YAHOO.widget.AutoComplete.prototype._elIFrame=null;YAHOO.widget.AutoComplete.prototype._bFocused=true;YAHOO.widget.AutoComplete.prototype._oAnim=null;YAHOO.widget.AutoComplete.prototype._bContainerOpen=false;YAHOO.widget.AutoComplete.prototype._bOverContainer=false;YAHOO.widget.AutoComplete.prototype._aListItems=null;YAHOO.widget.AutoComplete.prototype._nDisplayedItems=0;YAHOO.widget.AutoComplete.prototype._maxResultsDisplayed=0;YAHOO.widget.AutoComplete.prototype._sCurQuery=null;YAHOO.widget.AutoComplete.prototype._sSavedQuery=null;YAHOO.widget.AutoComplete.prototype._oCurItem=null;YAHOO.widget.AutoComplete.prototype._bItemSelected=false;YAHOO.widget.AutoComplete.prototype._nKeyCode=null;YAHOO.widget.AutoComplete.prototype._nDelayID=-1;YAHOO.widget.AutoComplete.prototype._iFrameSrc="javascript:false;";YAHOO.widget.AutoComplete.prototype._queryInterval=null;YAHOO.widget.AutoComplete.prototype._sLastTextboxValue=null;YAHOO.widget.AutoComplete.prototype._initProps=function(){var B=this.minQueryLength;if(!YAHOO.lang.isNumber(B)){this.minQueryLength=1;}var D=this.maxResultsDisplayed;if(!YAHOO.lang.isNumber(D)||(D<1)){this.maxResultsDisplayed=10;}var E=this.queryDelay;if(!YAHOO.lang.isNumber(E)||(E<0)){this.queryDelay=0.2;}var A=this.delimChar;if(YAHOO.lang.isString(A)&&(A.length>0)){this.delimChar=[A];}else{if(!YAHOO.lang.isArray(A)){this.delimChar=null;}}var C=this.animSpeed;if((this.animHoriz||this.animVert)&&YAHOO.util.Anim){if(!YAHOO.lang.isNumber(C)||(C<0)){this.animSpeed=0.3;}if(!this._oAnim){this._oAnim=new YAHOO.util.Anim(this._elContent,{},this.animSpeed);}else{this._oAnim.duration=this.animSpeed;}}if(this.forceSelection&&A){}};YAHOO.widget.AutoComplete.prototype._initContainerHelpers=function(){if(this.useShadow&&!this._elShadow){var A=document.createElement("div");A.className="yui-ac-shadow";this._elShadow=this._elContainer.appendChild(A);}if(this.useIFrame&&!this._elIFrame){var B=document.createElement("iframe");B.src=this._iFrameSrc;B.frameBorder=0;B.scrolling="no";B.style.position="absolute";B.style.width="100%";B.style.height="100%";B.tabIndex=-1;this._elIFrame=this._elContainer.appendChild(B);}};YAHOO.widget.AutoComplete.prototype._initContainer=function(){YAHOO.util.Dom.addClass(this._elContainer,"yui-ac-container");if(!this._elContent){var C=document.createElement("div");C.className="yui-ac-content";C.style.display="none";this._elContent=this._elContainer.appendChild(C);var B=document.createElement("div");B.className="yui-ac-hd";B.style.display="none";this._elHeader=this._elContent.appendChild(B);var D=document.createElement("div");D.className="yui-ac-bd";this._elBody=this._elContent.appendChild(D);var A=document.createElement("div");A.className="yui-ac-ft";A.style.display="none";this._elFooter=this._elContent.appendChild(A);}else{}};YAHOO.widget.AutoComplete.prototype._initList=function(){this._aListItems=[];while(this._elBody.hasChildNodes()){var B=this.getListItems();if(B){for(var A=B.length-1;A>=0;A--){B[A]=null;}}this._elBody.innerHTML="";}var E=document.createElement("ul");E=this._elBody.appendChild(E);for(var C=0;C<this.maxResultsDisplayed;C++){var D=document.createElement("li");D=E.appendChild(D);this._aListItems[C]=D;this._initListItem(D,C);}this._maxResultsDisplayed=this.maxResultsDisplayed;};YAHOO.widget.AutoComplete.prototype._initListItem=function(C,B){var A=this;C.style.display="none";C._nItemIndex=B;C.mouseover=C.mouseout=C.onclick=null;YAHOO.util.Event.addListener(C,"mouseover",A._onItemMouseover,A);YAHOO.util.Event.addListener(C,"mouseout",A._onItemMouseout,A);YAHOO.util.Event.addListener(C,"click",A._onItemMouseclick,A);};YAHOO.widget.AutoComplete.prototype._onIMEDetected=function(A){A._enableIntervalDetection();};YAHOO.widget.AutoComplete.prototype._enableIntervalDetection=function(){var A=this._elTextbox.value;var B=this._sLastTextboxValue;if(A!=B){this._sLastTextboxValue=A;this._sendQuery(A);}};YAHOO.widget.AutoComplete.prototype._cancelIntervalDetection=function(A){if(A._queryInterval){clearInterval(A._queryInterval);}};YAHOO.widget.AutoComplete.prototype._isIgnoreKey=function(A){if((A==9)||(A==13)||(A==16)||(A==17)||(A>=18&&A<=20)||(A==27)||(A>=33&&A<=35)||(A>=36&&A<=40)||(A>=44&&A<=45)){return true;}return false;};YAHOO.widget.AutoComplete.prototype._sendQuery=function(G){if(this.minQueryLength==-1){this._toggleContainer(false);return ;}var C=(this.delimChar)?this.delimChar:null;if(C){var E=-1;for(var B=C.length-1;B>=0;B--){var F=G.lastIndexOf(C[B]);if(F>E){E=F;
}}if(C[B]==" "){for(var A=C.length-1;A>=0;A--){if(G[E-1]==C[A]){E--;break;}}}if(E>-1){var D=E+1;while(G.charAt(D)==" "){D+=1;}this._sSavedQuery=G.substring(0,D);G=G.substr(D);}else{if(G.indexOf(this._sSavedQuery)<0){this._sSavedQuery=null;}}}if((G&&(G.length<this.minQueryLength))||(!G&&this.minQueryLength>0)){if(this._nDelayID!=-1){clearTimeout(this._nDelayID);}this._toggleContainer(false);return ;}G=encodeURIComponent(G);this._nDelayID=-1;G=this.doBeforeSendQuery(G);this.dataRequestEvent.fire(this,G);this.dataSource.getResults(this._populateList,G,this);};YAHOO.widget.AutoComplete.prototype._populateList=function(K,L,I){if(L===null){I.dataErrorEvent.fire(I,K);}if(!I._bFocused||!L){return ;}var A=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1);var O=I._elContent.style;O.width=(!A)?null:"";O.height=(!A)?null:"";var H=decodeURIComponent(K);I._sCurQuery=H;I._bItemSelected=false;if(I._maxResultsDisplayed!=I.maxResultsDisplayed){I._initList();}var C=Math.min(L.length,I.maxResultsDisplayed);I._nDisplayedItems=C;if(C>0){I._initContainerHelpers();var D=I._aListItems;for(var G=C-1;G>=0;G--){var N=D[G];var B=L[G];N.innerHTML=I.formatResult(B,H);N.style.display="list-item";N._sResultKey=B[0];N._oResultData=B;}for(var F=D.length-1;F>=C;F--){var M=D[F];M.innerHTML=null;M.style.display="none";M._sResultKey=null;M._oResultData=null;}var J=I.doBeforeExpandContainer(I._elTextbox,I._elContainer,K,L);I._toggleContainer(J);if(I.autoHighlight){var E=D[0];I._toggleHighlight(E,"to");I.itemArrowToEvent.fire(I,E);I._typeAhead(E,K);}else{I._oCurItem=null;}}else{I._toggleContainer(false);}I.dataReturnEvent.fire(I,K,L);};YAHOO.widget.AutoComplete.prototype._clearSelection=function(){var C=this._elTextbox.value;var B=(this.delimChar)?this.delimChar[0]:null;var A=(B)?C.lastIndexOf(B,C.length-2):-1;if(A>-1){this._elTextbox.value=C.substring(0,A);}else{this._elTextbox.value="";}this._sSavedQuery=this._elTextbox.value;this.selectionEnforceEvent.fire(this);};YAHOO.widget.AutoComplete.prototype._textMatchesOption=function(){var D=null;for(var A=this._nDisplayedItems-1;A>=0;A--){var C=this._aListItems[A];var B=C._sResultKey.toLowerCase();if(B==this._sCurQuery.toLowerCase()){D=C;break;}}return(D);};YAHOO.widget.AutoComplete.prototype._typeAhead=function(D,G){if(!this.typeAhead||(this._nKeyCode==8)){return ;}var F=this._elTextbox;var E=this._elTextbox.value;if(!F.setSelectionRange&&!F.createTextRange){return ;}var B=E.length;this._updateValue(D);var C=F.value.length;this._selectText(F,B,C);var A=F.value.substr(B,C);this.typeAheadEvent.fire(this,G,A);};YAHOO.widget.AutoComplete.prototype._selectText=function(D,A,B){if(D.setSelectionRange){D.setSelectionRange(A,B);}else{if(D.createTextRange){var C=D.createTextRange();C.moveStart("character",A);C.moveEnd("character",B-D.value.length);C.select();}else{D.select();}}};YAHOO.widget.AutoComplete.prototype._toggleContainerHelpers=function(B){var D=false;var C=this._elContent.offsetWidth+"px";var A=this._elContent.offsetHeight+"px";if(this.useIFrame&&this._elIFrame){D=true;if(B){this._elIFrame.style.width=C;this._elIFrame.style.height=A;}else{this._elIFrame.style.width=0;this._elIFrame.style.height=0;}}if(this.useShadow&&this._elShadow){D=true;if(B){this._elShadow.style.width=C;this._elShadow.style.height=A;}else{this._elShadow.style.width=0;this._elShadow.style.height=0;}}};YAHOO.widget.AutoComplete.prototype._toggleContainer=function(K){var E=this._elContainer;if(this.alwaysShowContainer&&this._bContainerOpen){return ;}if(!K){this._elContent.scrollTop=0;var C=this._aListItems;if(C&&(C.length>0)){for(var H=C.length-1;H>=0;H--){C[H].style.display="none";}}if(this._oCurItem){this._toggleHighlight(this._oCurItem,"from");}this._oCurItem=null;this._nDisplayedItems=0;this._sCurQuery=null;}if(!K&&!this._bContainerOpen){this._elContent.style.display="none";return ;}var B=this._oAnim;if(B&&B.getEl()&&(this.animHoriz||this.animVert)){if(!K){this._toggleContainerHelpers(K);}if(B.isAnimated()){B.stop();}var I=this._elContent.cloneNode(true);E.appendChild(I);I.style.top="-9000px";I.style.display="block";var G=I.offsetWidth;var D=I.offsetHeight;var A=(this.animHoriz)?0:G;var F=(this.animVert)?0:D;B.attributes=(K)?{width:{to:G},height:{to:D}}:{width:{to:A},height:{to:F}};if(K&&!this._bContainerOpen){this._elContent.style.width=A+"px";this._elContent.style.height=F+"px";}else{this._elContent.style.width=G+"px";this._elContent.style.height=D+"px";}E.removeChild(I);I=null;var J=this;var L=function(){B.onComplete.unsubscribeAll();if(K){J.containerExpandEvent.fire(J);}else{J._elContent.style.display="none";J.containerCollapseEvent.fire(J);}J._toggleContainerHelpers(K);};this._elContent.style.display="block";B.onComplete.subscribe(L);B.animate();this._bContainerOpen=K;}else{if(K){this._elContent.style.display="block";this.containerExpandEvent.fire(this);}else{this._elContent.style.display="none";this.containerCollapseEvent.fire(this);}this._toggleContainerHelpers(K);this._bContainerOpen=K;}};YAHOO.widget.AutoComplete.prototype._toggleHighlight=function(A,C){var B=this.highlightClassName;if(this._oCurItem){YAHOO.util.Dom.removeClass(this._oCurItem,B);}if((C=="to")&&B){YAHOO.util.Dom.addClass(A,B);this._oCurItem=A;}};YAHOO.widget.AutoComplete.prototype._togglePrehighlight=function(A,C){if(A==this._oCurItem){return ;}var B=this.prehighlightClassName;if((C=="mouseover")&&B){YAHOO.util.Dom.addClass(A,B);}else{YAHOO.util.Dom.removeClass(A,B);}};YAHOO.widget.AutoComplete.prototype._updateValue=function(E){var F=this._elTextbox;var D=(this.delimChar)?(this.delimChar[0]||this.delimChar):null;var B=this._sSavedQuery;var C=E._sResultKey;F.focus();F.value="";if(D){if(B){F.value=B;}F.value+=C+D;if(D!=" "){F.value+=" ";}}else{F.value=C;}if(F.type=="textarea"){F.scrollTop=F.scrollHeight;}var A=F.value.length;this._selectText(F,A,A);this._oCurItem=E;};YAHOO.widget.AutoComplete.prototype._selectItem=function(A){this._bItemSelected=true;this._updateValue(A);this._cancelIntervalDetection(this);this.itemSelectEvent.fire(this,A,A._oResultData);
this._toggleContainer(false);};YAHOO.widget.AutoComplete.prototype._jumpSelection=function(){if(this._oCurItem){this._selectItem(this._oCurItem);}else{this._toggleContainer(false);}};YAHOO.widget.AutoComplete.prototype._moveSelection=function(G){if(this._bContainerOpen){var E=this._oCurItem;var F=-1;if(E){F=E._nItemIndex;}var D=(G==40)?(F+1):(F-1);if(D<-2||D>=this._nDisplayedItems){return ;}if(E){this._toggleHighlight(E,"from");this.itemArrowFromEvent.fire(this,E);}if(D==-1){if(this.delimChar&&this._sSavedQuery){if(!this._textMatchesOption()){this._elTextbox.value=this._sSavedQuery;}else{this._elTextbox.value=this._sSavedQuery+this._sCurQuery;}}else{this._elTextbox.value=this._sCurQuery;}this._oCurItem=null;return ;}if(D==-2){this._toggleContainer(false);return ;}var C=this._aListItems[D];var A=this._elContent;var B=((YAHOO.util.Dom.getStyle(A,"overflow")=="auto")||(YAHOO.util.Dom.getStyle(A,"overflowY")=="auto"));if(B&&(D>-1)&&(D<this._nDisplayedItems)){if(G==40){if((C.offsetTop+C.offsetHeight)>(A.scrollTop+A.offsetHeight)){A.scrollTop=(C.offsetTop+C.offsetHeight)-A.offsetHeight;}else{if((C.offsetTop+C.offsetHeight)<A.scrollTop){A.scrollTop=C.offsetTop;}}}else{if(C.offsetTop<A.scrollTop){this._elContent.scrollTop=C.offsetTop;}else{if(C.offsetTop>(A.scrollTop+A.offsetHeight)){this._elContent.scrollTop=(C.offsetTop+C.offsetHeight)-A.offsetHeight;}}}}this._toggleHighlight(C,"to");this.itemArrowToEvent.fire(this,C);if(this.typeAhead){this._updateValue(C);}}};YAHOO.widget.AutoComplete.prototype._onItemMouseover=function(A,B){if(B.prehighlightClassName){B._togglePrehighlight(this,"mouseover");}else{B._toggleHighlight(this,"to");}B.itemMouseOverEvent.fire(B,this);};YAHOO.widget.AutoComplete.prototype._onItemMouseout=function(A,B){if(B.prehighlightClassName){B._togglePrehighlight(this,"mouseout");}else{B._toggleHighlight(this,"from");}B.itemMouseOutEvent.fire(B,this);};YAHOO.widget.AutoComplete.prototype._onItemMouseclick=function(A,B){B._toggleHighlight(this,"to");B._selectItem(this);};YAHOO.widget.AutoComplete.prototype._onContainerMouseover=function(A,B){B._bOverContainer=true;};YAHOO.widget.AutoComplete.prototype._onContainerMouseout=function(A,B){B._bOverContainer=false;if(B._oCurItem){B._toggleHighlight(B._oCurItem,"to");}};YAHOO.widget.AutoComplete.prototype._onContainerScroll=function(A,B){B._elTextbox.focus();};YAHOO.widget.AutoComplete.prototype._onContainerResize=function(A,B){B._toggleContainerHelpers(B._bContainerOpen);};YAHOO.widget.AutoComplete.prototype._onTextboxKeyDown=function(A,B){var C=A.keyCode;switch(C){case 9:if((navigator.userAgent.toLowerCase().indexOf("mac")==-1)){if(B._oCurItem){if(B.delimChar&&(B._nKeyCode!=C)){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._oCurItem);}else{B._toggleContainer(false);}}break;case 13:if((navigator.userAgent.toLowerCase().indexOf("mac")==-1)){if(B._oCurItem){if(B._nKeyCode!=C){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._oCurItem);}else{B._toggleContainer(false);}}break;case 27:B._toggleContainer(false);return ;case 39:B._jumpSelection();break;case 38:YAHOO.util.Event.stopEvent(A);B._moveSelection(C);break;case 40:YAHOO.util.Event.stopEvent(A);B._moveSelection(C);break;default:break;}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyPress=function(A,B){var C=A.keyCode;if((navigator.userAgent.toLowerCase().indexOf("mac")!=-1)){switch(C){case 9:if(B._oCurItem){if(B.delimChar&&(B._nKeyCode!=C)){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._oCurItem);}else{B._toggleContainer(false);}break;case 13:if(B._oCurItem){if(B._nKeyCode!=C){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._oCurItem);}else{B._toggleContainer(false);}break;default:break;}}else{if(C==229){B._queryInterval=setInterval(function(){B._onIMEDetected(B);},500);}}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyUp=function(B,D){D._initProps();var E=B.keyCode;D._nKeyCode=E;var C=this.value;if(D._isIgnoreKey(E)||(C.toLowerCase()==D._sCurQuery)){return ;}else{D._bItemSelected=false;YAHOO.util.Dom.removeClass(D._oCurItem,D.highlightClassName);D._oCurItem=null;D.textboxKeyEvent.fire(D,E);}if(D.queryDelay>0){var A=setTimeout(function(){D._sendQuery(C);},(D.queryDelay*1000));if(D._nDelayID!=-1){clearTimeout(D._nDelayID);}D._nDelayID=A;}else{D._sendQuery(C);}};YAHOO.widget.AutoComplete.prototype._onTextboxFocus=function(A,B){B._elTextbox.setAttribute("autocomplete","off");B._bFocused=true;if(!B._bItemSelected){B.textboxFocusEvent.fire(B);}};YAHOO.widget.AutoComplete.prototype._onTextboxBlur=function(A,B){if(!B._bOverContainer||(B._nKeyCode==9)){if(!B._bItemSelected){var C=B._textMatchesOption();if(!B._bContainerOpen||(B._bContainerOpen&&(C===null))){if(B.forceSelection){B._clearSelection();}else{B.unmatchedItemSelectEvent.fire(B);}}else{if(B.forceSelection){B._selectItem(C);}}}if(B._bContainerOpen){B._toggleContainer(false);}B._cancelIntervalDetection(B);B._bFocused=false;B.textboxBlurEvent.fire(B);}};YAHOO.widget.AutoComplete.prototype._onWindowUnload=function(A,B){if(B&&B._elTextbox&&B.allowBrowserAutocomplete){B._elTextbox.setAttribute("autocomplete","on");}};YAHOO.widget.DataSource=function(){};YAHOO.widget.DataSource.ERROR_DATANULL="Response data was null";YAHOO.widget.DataSource.ERROR_DATAPARSE="Response data could not be parsed";YAHOO.widget.DataSource.prototype.maxCacheEntries=15;YAHOO.widget.DataSource.prototype.queryMatchContains=false;YAHOO.widget.DataSource.prototype.queryMatchSubset=false;YAHOO.widget.DataSource.prototype.queryMatchCase=false;YAHOO.widget.DataSource.prototype.toString=function(){return"DataSource "+this._sName;};YAHOO.widget.DataSource.prototype.getResults=function(A,D,B){var C=this._doQueryCache(A,D,B);if(C.length===0){this.queryEvent.fire(this,B,D);this.doQuery(A,D,B);}};YAHOO.widget.DataSource.prototype.doQuery=function(A,C,B){};YAHOO.widget.DataSource.prototype.flushCache=function(){if(this._aCache){this._aCache=[];}if(this._aCacheHelper){this._aCacheHelper=[];
}this.cacheFlushEvent.fire(this);};YAHOO.widget.DataSource.prototype.queryEvent=null;YAHOO.widget.DataSource.prototype.cacheQueryEvent=null;YAHOO.widget.DataSource.prototype.getResultsEvent=null;YAHOO.widget.DataSource.prototype.getCachedResultsEvent=null;YAHOO.widget.DataSource.prototype.dataErrorEvent=null;YAHOO.widget.DataSource.prototype.cacheFlushEvent=null;YAHOO.widget.DataSource._nIndex=0;YAHOO.widget.DataSource.prototype._sName=null;YAHOO.widget.DataSource.prototype._aCache=null;YAHOO.widget.DataSource.prototype._init=function(){var A=this.maxCacheEntries;if(!YAHOO.lang.isNumber(A)||(A<0)){A=0;}if(A>0&&!this._aCache){this._aCache=[];}this._sName="instance"+YAHOO.widget.DataSource._nIndex;YAHOO.widget.DataSource._nIndex++;this.queryEvent=new YAHOO.util.CustomEvent("query",this);this.cacheQueryEvent=new YAHOO.util.CustomEvent("cacheQuery",this);this.getResultsEvent=new YAHOO.util.CustomEvent("getResults",this);this.getCachedResultsEvent=new YAHOO.util.CustomEvent("getCachedResults",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.cacheFlushEvent=new YAHOO.util.CustomEvent("cacheFlush",this);};YAHOO.widget.DataSource.prototype._addCacheElem=function(B){var A=this._aCache;if(!A||!B||!B.query||!B.results){return ;}if(A.length>=this.maxCacheEntries){A.shift();}A.push(B);};YAHOO.widget.DataSource.prototype._doQueryCache=function(A,I,N){var H=[];var G=false;var J=this._aCache;var F=(J)?J.length:0;var K=this.queryMatchContains;var D;if((this.maxCacheEntries>0)&&J&&(F>0)){this.cacheQueryEvent.fire(this,N,I);if(!this.queryMatchCase){D=I;I=I.toLowerCase();}for(var P=F-1;P>=0;P--){var E=J[P];var B=E.results;var C=(!this.queryMatchCase)?encodeURIComponent(E.query).toLowerCase():encodeURIComponent(E.query);if(C==I){G=true;H=B;if(P!=F-1){J.splice(P,1);this._addCacheElem(E);}break;}else{if(this.queryMatchSubset){for(var O=I.length-1;O>=0;O--){var R=I.substr(0,O);if(C==R){G=true;for(var M=B.length-1;M>=0;M--){var Q=B[M];var L=(this.queryMatchCase)?encodeURIComponent(Q[0]).indexOf(I):encodeURIComponent(Q[0]).toLowerCase().indexOf(I);if((!K&&(L===0))||(K&&(L>-1))){H.unshift(Q);}}E={};E.query=I;E.results=H;this._addCacheElem(E);break;}}if(G){break;}}}}if(G){this.getCachedResultsEvent.fire(this,N,D,H);A(D,H,N);}}return H;};YAHOO.widget.DS_XHR=function(C,A,D){if(D&&(D.constructor==Object)){for(var B in D){this[B]=D[B];}}if(!YAHOO.lang.isArray(A)||!YAHOO.lang.isString(C)){return ;}this.schema=A;this.scriptURI=C;this._init();};YAHOO.widget.DS_XHR.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_XHR.TYPE_JSON=0;YAHOO.widget.DS_XHR.TYPE_XML=1;YAHOO.widget.DS_XHR.TYPE_FLAT=2;YAHOO.widget.DS_XHR.ERROR_DATAXHR="XHR response failed";YAHOO.widget.DS_XHR.prototype.connMgr=YAHOO.util.Connect;YAHOO.widget.DS_XHR.prototype.connTimeout=0;YAHOO.widget.DS_XHR.prototype.scriptURI=null;YAHOO.widget.DS_XHR.prototype.scriptQueryParam="query";YAHOO.widget.DS_XHR.prototype.scriptQueryAppend="";YAHOO.widget.DS_XHR.prototype.responseType=YAHOO.widget.DS_XHR.TYPE_JSON;YAHOO.widget.DS_XHR.prototype.responseStripAfter="\n<!-";YAHOO.widget.DS_XHR.prototype.doQuery=function(E,G,B){var J=(this.responseType==YAHOO.widget.DS_XHR.TYPE_XML);var D=this.scriptURI+"?"+this.scriptQueryParam+"="+G;if(this.scriptQueryAppend.length>0){D+="&"+this.scriptQueryAppend;}var C=null;var F=this;var I=function(K){if(!F._oConn||(K.tId!=F._oConn.tId)){F.dataErrorEvent.fire(F,B,G,YAHOO.widget.DataSource.ERROR_DATANULL);return ;}for(var N in K){}if(!J){K=K.responseText;}else{K=K.responseXML;}if(K===null){F.dataErrorEvent.fire(F,B,G,YAHOO.widget.DataSource.ERROR_DATANULL);return ;}var M=F.parseResponse(G,K,B);var L={};L.query=decodeURIComponent(G);L.results=M;if(M===null){F.dataErrorEvent.fire(F,B,G,YAHOO.widget.DataSource.ERROR_DATAPARSE);M=[];}else{F.getResultsEvent.fire(F,B,G,M);F._addCacheElem(L);}E(G,M,B);};var A=function(K){F.dataErrorEvent.fire(F,B,G,YAHOO.widget.DS_XHR.ERROR_DATAXHR);return ;};var H={success:I,failure:A};if(YAHOO.lang.isNumber(this.connTimeout)&&(this.connTimeout>0)){H.timeout=this.connTimeout;}if(this._oConn){this.connMgr.abort(this._oConn);}F._oConn=this.connMgr.asyncRequest("GET",D,H,null);};YAHOO.widget.DS_XHR.prototype.parseResponse=function(sQuery,oResponse,oParent){var aSchema=this.schema;var aResults=[];var bError=false;var nEnd=((this.responseStripAfter!=="")&&(oResponse.indexOf))?oResponse.indexOf(this.responseStripAfter):-1;if(nEnd!=-1){oResponse=oResponse.substring(0,nEnd);}switch(this.responseType){case YAHOO.widget.DS_XHR.TYPE_JSON:var jsonList,jsonObjParsed;if(YAHOO.lang.JSON){jsonObjParsed=YAHOO.lang.JSON.parse(oResponse);if(!jsonObjParsed){bError=true;break;}else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}catch(e){bError=true;break;}}}else{if(oResponse.parseJSON){jsonObjParsed=oResponse.parseJSON();if(!jsonObjParsed){bError=true;}else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}catch(e){bError=true;break;}}}else{if(window.JSON){jsonObjParsed=JSON.parse(oResponse);if(!jsonObjParsed){bError=true;break;}else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}catch(e){bError=true;break;}}}else{try{while(oResponse.substring(0,1)==" "){oResponse=oResponse.substring(1,oResponse.length);}if(oResponse.indexOf("{")<0){bError=true;break;}if(oResponse.indexOf("{}")===0){break;}var jsonObjRaw=eval("("+oResponse+")");if(!jsonObjRaw){bError=true;break;}jsonList=eval("(jsonObjRaw."+aSchema[0]+")");}catch(e){bError=true;break;}}}}if(!jsonList){bError=true;break;}if(!YAHOO.lang.isArray(jsonList)){jsonList=[jsonList];}for(var i=jsonList.length-1;i>=0;i--){var aResultItem=[];var jsonResult=jsonList[i];for(var j=aSchema.length-1;j>=1;j--){var dataFieldValue=jsonResult[aSchema[j]];if(!dataFieldValue){dataFieldValue="";}aResultItem.unshift(dataFieldValue);}if(aResultItem.length==1){aResultItem.push(jsonResult);}aResults.unshift(aResultItem);}break;case YAHOO.widget.DS_XHR.TYPE_XML:var xmlList=oResponse.getElementsByTagName(aSchema[0]);if(!xmlList){bError=true;break;}for(var k=xmlList.length-1;k>=0;k--){var result=xmlList.item(k);
var aFieldSet=[];for(var m=aSchema.length-1;m>=1;m--){var sValue=null;var xmlAttr=result.attributes.getNamedItem(aSchema[m]);if(xmlAttr){sValue=xmlAttr.value;}else{var xmlNode=result.getElementsByTagName(aSchema[m]);if(xmlNode&&xmlNode.item(0)&&xmlNode.item(0).firstChild){sValue=xmlNode.item(0).firstChild.nodeValue;}else{sValue="";}}aFieldSet.unshift(sValue);}aResults.unshift(aFieldSet);}break;case YAHOO.widget.DS_XHR.TYPE_FLAT:if(oResponse.length>0){var newLength=oResponse.length-aSchema[0].length;if(oResponse.substr(newLength)==aSchema[0]){oResponse=oResponse.substr(0,newLength);}if(oResponse.length>0){var aRecords=oResponse.split(aSchema[0]);for(var n=aRecords.length-1;n>=0;n--){if(aRecords[n].length>0){aResults[n]=aRecords[n].split(aSchema[1]);}}}}break;default:break;}sQuery=null;oResponse=null;oParent=null;if(bError){return null;}else{return aResults;}};YAHOO.widget.DS_XHR.prototype._oConn=null;YAHOO.widget.DS_ScriptNode=function(D,A,C){if(C&&(C.constructor==Object)){for(var B in C){this[B]=C[B];}}if(!YAHOO.lang.isArray(A)||!YAHOO.lang.isString(D)){return ;}this.schema=A;this.scriptURI=D;this._init();};YAHOO.widget.DS_ScriptNode.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_ScriptNode.prototype.getUtility=YAHOO.util.Get;YAHOO.widget.DS_ScriptNode.prototype.scriptURI=null;YAHOO.widget.DS_ScriptNode.prototype.scriptQueryParam="query";YAHOO.widget.DS_ScriptNode.prototype.asyncMode="allowAll";YAHOO.widget.DS_ScriptNode.prototype.scriptCallbackParam="callback";YAHOO.widget.DS_ScriptNode.callbacks=[];YAHOO.widget.DS_ScriptNode._nId=0;YAHOO.widget.DS_ScriptNode._nPending=0;YAHOO.widget.DS_ScriptNode.prototype.doQuery=function(A,F,C){var B=this;if(YAHOO.widget.DS_ScriptNode._nPending===0){YAHOO.widget.DS_ScriptNode.callbacks=[];YAHOO.widget.DS_ScriptNode._nId=0;}var E=YAHOO.widget.DS_ScriptNode._nId;YAHOO.widget.DS_ScriptNode._nId++;YAHOO.widget.DS_ScriptNode.callbacks[E]=function(G){if((B.asyncMode!=="ignoreStaleResponses")||(E===YAHOO.widget.DS_ScriptNode.callbacks.length-1)){B.handleResponse(G,A,F,C);}else{}delete YAHOO.widget.DS_ScriptNode.callbacks[E];};YAHOO.widget.DS_ScriptNode._nPending++;var D=this.scriptURI+"&"+this.scriptQueryParam+"="+F+"&"+this.scriptCallbackParam+"=YAHOO.widget.DS_ScriptNode.callbacks["+E+"]";this.getUtility.script(D,{autopurge:true,onsuccess:YAHOO.widget.DS_ScriptNode._bumpPendingDown,onfail:YAHOO.widget.DS_ScriptNode._bumpPendingDown});};YAHOO.widget.DS_ScriptNode.prototype.handleResponse=function(oResponse,oCallbackFn,sQuery,oParent){var aSchema=this.schema;var aResults=[];var bError=false;var jsonList,jsonObjParsed;try{jsonList=eval("(oResponse."+aSchema[0]+")");}catch(e){bError=true;}if(!jsonList){bError=true;jsonList=[];}else{if(!YAHOO.lang.isArray(jsonList)){jsonList=[jsonList];}}for(var i=jsonList.length-1;i>=0;i--){var aResultItem=[];var jsonResult=jsonList[i];for(var j=aSchema.length-1;j>=1;j--){var dataFieldValue=jsonResult[aSchema[j]];if(!dataFieldValue){dataFieldValue="";}aResultItem.unshift(dataFieldValue);}if(aResultItem.length==1){aResultItem.push(jsonResult);}aResults.unshift(aResultItem);}if(bError){aResults=null;}if(aResults===null){this.dataErrorEvent.fire(this,oParent,sQuery,YAHOO.widget.DataSource.ERROR_DATAPARSE);aResults=[];}else{var resultObj={};resultObj.query=decodeURIComponent(sQuery);resultObj.results=aResults;this._addCacheElem(resultObj);this.getResultsEvent.fire(this,oParent,sQuery,aResults);}oCallbackFn(sQuery,aResults,oParent);};YAHOO.widget.DS_ScriptNode._bumpPendingDown=function(){YAHOO.widget.DS_ScriptNode._nPending--;};YAHOO.widget.DS_JSFunction=function(A,C){if(C&&(C.constructor==Object)){for(var B in C){this[B]=C[B];}}if(!YAHOO.lang.isFunction(A)){return ;}else{this.dataFunction=A;this._init();}};YAHOO.widget.DS_JSFunction.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_JSFunction.prototype.dataFunction=null;YAHOO.widget.DS_JSFunction.prototype.doQuery=function(C,F,D){var B=this.dataFunction;var E=[];E=B(F);if(E===null){this.dataErrorEvent.fire(this,D,F,YAHOO.widget.DataSource.ERROR_DATANULL);return ;}var A={};A.query=decodeURIComponent(F);A.results=E;this._addCacheElem(A);this.getResultsEvent.fire(this,D,F,E);C(F,E,D);return ;};YAHOO.widget.DS_JSArray=function(A,C){if(C&&(C.constructor==Object)){for(var B in C){this[B]=C[B];}}if(!YAHOO.lang.isArray(A)){return ;}else{this.data=A;this._init();}};YAHOO.widget.DS_JSArray.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_JSArray.prototype.data=null;YAHOO.widget.DS_JSArray.prototype.doQuery=function(E,I,A){var F;var C=this.data;var J=[];var D=false;var B=this.queryMatchContains;if(I){if(!this.queryMatchCase){I=I.toLowerCase();}for(F=C.length-1;F>=0;F--){var H=[];if(YAHOO.lang.isString(C[F])){H[0]=C[F];}else{if(YAHOO.lang.isArray(C[F])){H=C[F];}}if(YAHOO.lang.isString(H[0])){var G=(this.queryMatchCase)?encodeURIComponent(H[0]).indexOf(I):encodeURIComponent(H[0]).toLowerCase().indexOf(I);if((!B&&(G===0))||(B&&(G>-1))){J.unshift(H);}}}}else{for(F=C.length-1;F>=0;F--){if(YAHOO.lang.isString(C[F])){J.unshift([C[F]]);}else{if(YAHOO.lang.isArray(C[F])){J.unshift(C[F]);}}}}this.getResultsEvent.fire(this,A,I,J);E(I,J,A);};YAHOO.register("autocomplete",YAHOO.widget.AutoComplete,{version:"2.5.2",build:"1076"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
YAHOO.namespace("lang");YAHOO.lang.JSON={_ESCAPES:/\\["\\\/bfnrtu]/g,_VALUES:/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,_BRACKETS:/(?:^|:|,)(?:\s*\[)+/g,_INVALID:/^[\],:{}\s]*$/,_SPECIAL_CHARS:/["\\\x00-\x1f\x7f-\x9f]/g,_PARSE_DATE:/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/,_CHARS:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},_applyFilter:function(C,B){var A=function(E,D){var F,G;if(D&&typeof D==="object"){for(F in D){if(YAHOO.lang.hasOwnProperty(D,F)){G=A(F,D[F]);if(G===undefined){delete D[F];}else{D[F]=G;}}}}return B(E,D);};if(YAHOO.lang.isFunction(B)){A("",C);}return C;},isValid:function(A){if(!YAHOO.lang.isString(A)){return false;}return this._INVALID.test(A.replace(this._ESCAPES,"@").replace(this._VALUES,"]").replace(this._BRACKETS,""));},dateToString:function(B){function A(C){return C<10?"0"+C:C;}return'"'+B.getUTCFullYear()+"-"+A(B.getUTCMonth()+1)+"-"+A(B.getUTCDate())+"T"+A(B.getUTCHours())+":"+A(B.getUTCMinutes())+":"+A(B.getUTCSeconds())+'Z"';},stringToDate:function(B){if(this._PARSE_DATE.test(B)){var A=new Date();A.setUTCFullYear(RegExp.$1,(RegExp.$2|0)-1,RegExp.$3);A.setUTCHours(RegExp.$4,RegExp.$5,RegExp.$6);return A;}},parse:function(s,filter){if(this.isValid(s)){return this._applyFilter(eval("("+s+")"),filter);}throw new SyntaxError("parseJSON");},stringify:function(C,K,F){var E=YAHOO.lang,H=E.JSON,D=H._CHARS,A=this._SPECIAL_CHARS,B=[];var I=function(N){if(!D[N]){var J=N.charCodeAt();D[N]="\\u00"+Math.floor(J/16).toString(16)+(J%16).toString(16);}return D[N];};var M=function(J){return'"'+J.replace(A,I)+'"';};var L=H.dateToString;var G=function(J,T,R){var W=typeof J,P,Q,O,N,U,V,S;if(W==="string"){return M(J);}if(W==="boolean"||J instanceof Boolean){return String(J);}if(W==="number"||J instanceof Number){return isFinite(J)?String(J):"null";}if(J instanceof Date){return L(J);}if(E.isArray(J)){for(P=B.length-1;P>=0;--P){if(B[P]===J){return"null";}}B[B.length]=J;S=[];if(R>0){for(P=J.length-1;P>=0;--P){S[P]=G(J[P],T,R-1)||"null";}}B.pop();return"["+S.join(",")+"]";}if(W==="object"){if(!J){return"null";}for(P=B.length-1;P>=0;--P){if(B[P]===J){return"null";}}B[B.length]=J;S=[];if(R>0){if(T){for(P=0,O=0,Q=T.length;P<Q;++P){if(typeof T[P]==="string"){U=G(J[T[P]],T,R-1);if(U){S[O++]=M(T[P])+":"+U;}}}}else{O=0;for(N in J){if(typeof N==="string"&&E.hasOwnProperty(J,N)){U=G(J[N],T,R-1);if(U){S[O++]=M(N)+":"+U;}}}}}B.pop();return"{"+S.join(",")+"}";}return undefined;};F=F>=0?F:1/0;return G(C,K,F);}};YAHOO.register("json",YAHOO.lang.JSON,{version:"2.5.2",build:"1076"});
/**
 * this files creates the base namespace for all core starwood
 * code -"sw". In addtion, shortcuts are created into the YAHOO.util for ease of coding.
 * @author Danlan
 */

if(YAHOO.util){
    /**
     * create shortcuts into YAHOO lib, allows for easer coding/readability.
     * some of the shortcuts: yuiDom, yuiEvent, yuiAnim, yuiEasing...
     * Same as var yuiDom = YAHOO.util.Dom;
     */
    for(var prop in YAHOO.util){
        window["yui"+ prop] = YAHOO.util[prop];
    }
    if(YAHOO.lang.JSON){
        yuiJSON = YAHOO.lang.JSON;
    }
    // workaround for yui bug introduced in 2.4.0 causing onDOMReady to fire prematurely in iframe for IE
    // bug tracker request id: 2008289
    if(yuiEvent){
        try {
            if (typeof document.createElement("p").doScroll != "undefined") document.createElement("p").doScroll("left");
            // only get here if (IS IE and IS IFRAME)  - it may be possible that another condition gets here, but that's ok
            yuiEvent.onDOMReady = function( p_fn , p_obj , p_scope ){
                yuiEvent.addListener( window , "load" , p_fn , p_obj , p_scope);
            }
        } catch (err) {
            // all other conditions throw an error, which is good.
        }
    }
    // end workaround
}
/**
 * create the base "sw" namespace for all core starwood code.
 */
var SW = YAHOO.namespace("SW");

YAHOO.namespace("SW.tools"); // general utility objects and methods
YAHOO.namespace("SW.customEvent"); // custom event models
YAHOO.namespace("SW.widget"); // larger components
YAHOO.namespace("SW.domWidget"); // built in dom scrubbing to gain hooks widgets
YAHOO.namespace("SW.widget.virtualEarth"); // virtualEarth components
YAHOO.namespace("SW.flash"); // adaptors for Flash. When Flash needs to call JS, it uses this namespace. Local flash code should prefix component name with brand (ie SW.flash.SPGTour)
YAHOO.namespace("SW.local"); // namespace for any non-common code. All brand/page specific code resides here
YAHOO.namespace("SW.maps");//namespace for map related JS

/**
 * extensions to core JavaScript objects: Function, Array...
 */

/**
 * Class method for copying psuedo-arrays to *real* arrays, such
 * as function arguments and dom node collections (ie, document.getElementsByTagName("div"))
 * @param {Object} original array
 * @return {Array} new *real* array
 */
Array.Copy = function(original){
  var i,result = [];
  for(i=0;i<original.length;i++){
    result.push(original[i]);
  }
  return result;
}
/**
 * alters the context in which a method will run, can be handy when used in conjunction with events
 * @param {Object} context for method to run (sets up the "this" reference)
 * @param... all additional parameters are passed to the bound method as parameters
 * @return {Function} invoking this function in any context will run the method in the correct context
 */
/*
  example:
  var myObject = {
    name:"fred"
  };
  function doTest(param1,param2){
    alert(this.name +'\n'+ param1 +'\n'+ param2);
  }
  var boundMethod = doTest.bind(myObject,"12","jane");
  boundMethod();
*/
Function.prototype.bind = function() {
  var method = this;
  var args = Array.Copy(arguments);
  var obj = args.shift();
  return function() {
    return method.apply(obj, args);
  };
}

// JavaScript 1.6 methods
if(!Array.forEach){
  // perform action on each item of array - used in place of: for(i=0;i<myArray.length;i++) {...}
  /*
    example:
    var myArray = ['apple','banana','pear'];
    myArray.forEach(function(fruit){
      document.write(fruit);
    });
  */
	Array.prototype.forEach = function(fn, thisObj) {
    var scope = thisObj || window;
    for ( var i=0, j=this.length; i < j; ++i){
      fn.call(scope, this[i], i, this);
    }
  }
}
if(!Array.every){
  // check if every item in array matches some criteria
  /*
    example:
    var myArray = [
      {name:'apple',type:'fruit'},
      {name:'steak',type:'meat'},
      {name:'pear',type:'fruit'}
    ];
    // returns false
    var allItemsAreFruits = myArray.every(function(food){
      return (food.type == "fruit");
    });
  */
  Array.prototype.every =  function(fn, thisObj) {
    var scope = thisObj || window;
    for ( var i=0, j=this.length; i < j; ++i){
      if(!fn.call(scope, this[i], i, this)){
        return false;
      }
    }
    return true;
  }
}
if(!Array.some){
  // check if every item in array matches some criteria
  /*
    example:
    var myArray = [
      {name:'apple',type:'fruit'},
      {name:'steak',type:'meat'},
      {name:'pear',type:'fruit'}
    ];
    // returns true
    var someItemsAreFruits = myArray.some(function(food){
      return (food.type == "fruit");
    });
  */
  Array.prototype.some = function(fn, thisObj) {
      var scope = thisObj || window;
    for ( var i=0, j=this.length; i < j; ++i){
          if(fn.call(scope, this[i], i, this)){
              return true;
          }
      }
      return false;
  }
}
if(!Array.map){
  // create a new array based on contents of original array
  /*
    example:
    var myArray = [
      {name:'apple',type:'fruit'},
      {name:'steak',type:'meat'},
      {name:'pear',type:'fruit'}
    ];
    var arrayOfHtml = myArray.map(function(food){
      return "<div>"+ food.name +" ("+ food.type +")</div>";
    });
  */
  Array.prototype.map = function(fn, thisObj) {
      var scope = thisObj || window;
      var a = [];
      for ( var i=0, j=this.length; i < j; ++i){
          a.push(fn.call(scope, this[i], i, this));
      }
      return a;
  }
}
if(!Array.filter){
  // create a new array of filtered results
  /*
    example:
    var myArray = [
      {name:'apple',type:'fruit'},
      {name:'steak',type:'meat'},
      {name:'pear',type:'fruit'}
    ];
    // returns true
    var fruits = myArray.map(function(food){
      return (food.type == "fruit");
    });
  */
  Array.prototype.filter =  function(fn, thisObj) {
      var scope = thisObj || window;
      var a = [];
      for ( var i=0, j=this.length; i < j; ++i){
          if(!fn.call(scope, this[i], i, this)){
              continue;
          }
          a.push(this[i]);
      }
      return a;
  }
}
if(!Array.indexOf){
  // returns index of specified element (-1 if not found)
  Array.prototype.indexOf = function(el, start) {
      start = start || 0;
      for ( var i=start, j=this.length; i < j; ++i){
          if(this[i] === el){
              return i;
          }
      }
      return -1;
  }
}
if(!Array.lastIndexOf){
  // returns the last index of specified element (-1 if not found)
  Array.prototype.lastIndexOf = function(el, start) {
      start = start || this.length;
      if(start >= this.length){
          start = this.length;
      }
      if(start < 0){
           start = this.length + start;
      }
      for ( var i=start; i >= 0; --i){
          if(this[i] === el){
              return i;
          }
      }
      return -1;
  }
}
// more useful array methods
// override commented out as it was conflicting with Bing Maps API
// found no usage of this method in whole codebase except swfAddress library which is 3rd party anyway
/* if(!Array.splice){
  Array.prototype.splice = function (iIndex , iLength ) {
    var i,aResult  = new Array();
    var aRemoved  = new Array();
    for (i=0; i < iIndex; i++){
      aResult.push(this[i]);
    }
    for (i=iIndex; i < iIndex+iLength; i++) {
     aRemoved.push(this[i]);
    }
    if (arguments.length > 2) {
      for (i=2; i < arguments.length; i++) {
        aResult.push(arguments[i]);
      }
    }
    for (i=iIndex+iLength; i < this.length; i++) {
      aResult.push(this[i]);
    }
    for (i=0; i < aResult.length; i++) {
      this[i] = aResult[i];
    }
    this.length = aResult.length;
    return aRemoved;
  }
} */
if(!Array.remove){
  Array.prototype.remove = function (vItem )  {
    this.removeAt(this.indexOf(vItem));
    return vItem;
  }
}
if(!Array.removeAt){
  Array.prototype.removeAt = function (iIndex )  {
    var vItem = this[iIndex];
    if (vItem) {
      this.splice(iIndex, 1);
    }
    return vItem;
  }
}



// object/JSON sorting
(function() {
    // local object which creates comparator functions for sorting arrays of objects
    var Comparator = {
        cache:{},
        getComparator:function(array,criteria){
            // if array is empty, we can exit now
            if(array.length == 0){
                return function(a,b){return 0;};
            }
            // criteria are function arguments, need  to turn into 'real' array
            criteria = Array.Copy(criteria);
            var criteriaId = criteria.join();
            if(!Comparator.cache[criteriaId]){
                // generate function
                // "new Function" is generally not a good idea, but actually provides the best for performance in this case
                var functionBody = [];
                var thisCriteria,i;
                functionBody.push("  var val = 0;");
                for (i = 0; i < criteria.length; i++) {
                    thisCriteria = criteria[i];
                    switch(typeof array[0][thisCriteria]){
                        case "string":
                            functionBody.push("  val = (b."+ thisCriteria +" < a."+ thisCriteria +") - (a."+ thisCriteria +" < b."+ thisCriteria +");");
                            break;
                        case "number":
                            functionBody.push("  val = a."+ thisCriteria +" -  b."+ thisCriteria +";");
                            break;
                        case "boolean":
                            functionBody.push("  val = (a."+ thisCriteria +"*-1) -  (b."+ thisCriteria +"*-1);");
                            break;
                    }
                    functionBody.push("  if (val != 0) {");
                    // look ahead for -1;
                    if(criteria[i+1] === -1){
                        functionBody.push("    return val * -1;");
                    }else{
                        functionBody.push("    return val;");
                    }
                    functionBody.push("  }");
                }
                functionBody.push("  return val;");
                Comparator.cache[criteriaId] = new Function("a","b",functionBody.join("\n"));
            }
            return Comparator.cache[criteriaId];
        }
    };

    /**
        Object sorting (JSON sorting) method. To have a field use reverse order (DESC), make -1 the following parameter (see examples)
        Here is a sample objectSort call for DISTANCE sorting in SPG:
            searchResults.objectSort("isParticipating","favorite","distance","hasCash","cityName","propertyName");
        Simple example - for and array of people, sort by last name, then by first name
            people.sort("lsatName","firstName");
        Simple example - Sort people by age oldest to youngest, then by last name (a-z)
            people.sort("age",-1,"lastName");

    **/
    Array.prototype.objectSort = function() {
        // perform sort and return instance array
        this.sort(Comparator.getComparator(this,arguments))
        return this;
    };
})();

// object/JSON filtering
(function() {
    var FilterManager = {
        cache:{},
        getFilter:function(array,criteria){
            if(array.length === 0 || criteria.length === 0){
                return function(){return true;};
            }
            var criteriaId = criteria.join();
            if(!FilterManager.cache[criteriaId]){
                var functionBody = [];
                var conditions = [];
                var quoteChar = "";
                var thisField,thisValue,thisOperator,i,innerCondition,prefix,suffix;
                for (i = 0; i < criteria.length; i+=3) {
                    prefix = "";
                    suffix = "";
                    thisField = criteria[i];
                    thisValue = criteria[i+1];
                    // if value is not an array, turn it into one
                    if(!(typeof thisValue == "object" && thisValue.length > 0)){
                        thisValue = [thisValue];
                    }
                    thisOperator = criteria[i+2];
                    // should quoteChar be used? for now, always use quotes
                    //                    quoteChar = (typeof array[0][thisField] == "string") ? "\"":"";
                    quoteChar = "\"";
                    switch(thisOperator){
                        case "equals":
                            prefix = "item."+ thisField +" == "+ quoteChar;
                            suffix = quoteChar ;
                            break;
                        case "notEquals":
                            prefix = "item."+ thisField +" != "+ quoteChar;
                            suffix = quoteChar ;
                            break;
                        case "greaterThan":
                            prefix = "item."+ thisField +" > "+ quoteChar;
                            suffix = quoteChar ;
                            break;
                        case "lessThan":
                            prefix = "item."+ thisField +" < "+ quoteChar;
                            suffix = quoteChar ;
                            break;
                        case "greaterThanEquals":
                            prefix = "item."+ thisField +" >= "+ quoteChar;
                            suffix = quoteChar ;
                            break;
                        case "lessThanEquals":
                            prefix = "item."+ thisField +" <= "+ quoteChar;
                            suffix = quoteChar ;
                            break;
                        case "contains":
                            prefix = "item."+ thisField +".indexOf("+ quoteChar;
                            suffix = quoteChar +") > -1";
                            break;
                        default:
                            // if invalid operator passed, do not use this criteria
                            continue;
                    }
                    innerCondition = [];
                    thisValue.forEach(function(val){
                        innerCondition.push(prefix + val + suffix);
                    });
                    conditions.push("("+ innerCondition.join(" ||  ") +")");
                }
                functionBody.push("if( "+ conditions.join(" && ") +"){");
                functionBody.push("  return true;");
                functionBody.push("}");
                functionBody.push("return false;");
                FilterManager.cache[criteriaId] = new Function("item",functionBody.join("\n"));

            }
            return FilterManager.cache[criteriaId];
        }
    };

    Array.prototype.setFilter = function(field,value,operator) {
        // first time calling setFilter, setup objects and methods
        var criteria = [];
        var thisArray = this;
        thisArray.setFilter = function(field,value,operator){
            if(arguments.length === 0){
                criteria.length = 0;
                return thisArray;
            }
            operator = operator || "equals";
            criteria.push(field,value,operator);
            return thisArray;
        };
        thisArray.objectFilter = function(){
            var result = thisArray.filter(FilterManager.getFilter(thisArray,criteria));
            criteria.length = 0;
            return result;
        };

        // set this filter criteria and return array (note - this code only runs first time setFilter is called)
        thisArray.setFilter(field,value,operator);
        return thisArray;
    };
    // dummy placeholder method... here just in case objectFilter is called before setFilter
    Array.prototype.objectFilter = function(){
        // behave like normal, return copy of this array
        return Array.Copy(this);
    }
})();
/**
 * The utilities.js file provides additional functions, many built on top of yahoo
 * @module starwood utilities
 * @requires yahoo-dom-event
 */


// can be used in place of window.onload or yuiEvent.addListener(window,"load",...).
// In theory, this fires when the closing body tag is drawn (before window.onload).

/**
 * @deprecated
 * @param String url
 * @param String param
 * @param String val
 * @return String
 */
SW.tools.setUrlParameter = function(url,param,val){
    return SW.tools.Url.setParameter(url,param,val);
}
SW.tools.Url = {
    /**
     * used to add or change value of parameter in url
     * var url = SW.tools.setUrlParamter(document.location.href,"propID",mySelect.value);
     * @param url
     * @param param
     * @param val
     * @return String
     */
    setParameter:function(url,param,val){
        var curPairs;
        var paramPair;
        var hashString = "";
        if(url.indexOf("#") > -1){
            hashString = url.substr(url.indexOf("#")+1);
            url = url.substring(0,url.indexOf("#"));
        }
        var allPairs = [];
        var urlParts = url.split('?');

        if(urlParts.length>1){
            curPairs = urlParts[1].split('&');
            curPairs.forEach(function(paramPair){
                var paramParts = paramPair.split('=');
                if(paramParts[0] != param){
                    allPairs.push(paramParts[0] + '=' + (typeof paramParts[1] != "undefined" ? paramParts[1]:'') );
                }
            });
        }
        if(val !== null && typeof val !== 'undefined'){ 
            allPairs.push(param + '=' + val);
        }
        return urlParts[0] + '?' + allPairs.join('&') + (hashString ? "#"+hashString:"");

    },
    getParameter:function(url,param){
        var i,urlParts,curPairs,paramParts;
        if(url.indexOf("#") > -1){
            url = url.substring(0,url.indexOf("#"));
        }
        urlParts = url.split('?');
        if(urlParts.length>1){
            curPairs = urlParts[1].split('&');
            for(i = 0; i < curPairs.length; i++){
                paramPair = curPairs[i];
                paramParts = paramPair.split('=');
                if(paramParts[0] === param){
                    return paramParts[1];
                }
            }
        }
        return null;
    },
    getHash:function(url){
        if(url.indexOf("#") > -1){
           return url.substring(url.indexOf("#")+1);
        }
        return "";
    }
};
/**
 * add to img tags which are using [semi]transparent png's to fix IE6 issue
 * This is only way to avoid *ALL* IE6 issues! (including browser freezing/locking up)
 * sample:
 *      <img src="/path/to/myImage.png" width="233" height="82" onload="SW.tools.iePNGLoader(this);" />
 * @param img
 */
SW.tools.iePNGLoader = function(img){
    if (navigator.userAgent.indexOf("MSIE") > -1 && parseInt(navigator.appVersion) <= 6) {
      var pSrc = img.src;
      img.onload = null;
      img.src = "/common/images/shim.gif";
      img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, src='" + pSrc + "')";
    }
}                                                                   

// Begin Code from YUI: Colorpicker
var HCHARS="0123456789ABCDEF";
/**
 * Converts decimal rgb values into a hex string
 * 255,255,255 -> FFFFFF
 * @method rgb2hex
 * @param r {int|[int, int, int]} the red value, or an
 *        array containing all three parameters
 * @param g {int} the green value
 * @param b {int} the blue value
 * @return {string} the hex string
 */
SW.tools.rgb2hex =  function(r, g, b) {
	var f=this.dec2hex;
	return f(r) + f(g) + f(b);
};

/**
 * Converts an int 0...255 to hex pair 00...FF
 * @method dec2hex
 * @param n {int} the number to convert
 * @return {string} the hex equivalent
 */
SW.tools.dec2hex = function(n) {
	n = parseInt(n, 10);
	n = (n > 255 || n < 0) ? 0 : n;

	return HCHARS.charAt((n - n % 16) / 16) + HCHARS.charAt(n % 16);
};
// End code from YUI: Colorpicker



// used in conjunction with secure json calls
// new yuiConnect( secureJsonUrl("/path/to/myData.jsp?someID=45") );
SW.tools.secureJsonUrl = function(url){
  return SW.tools.Url.setParameter(url,"_jsk",SW.Cookie.get("JSESSIONID"));
}

/*
### set cookie ###
  --> set basic session cookie
    SW.tools.Cookie.set("sid","somevalue");

  --> set permanent cookie
    SW.tools.Cookie.set("sid","somevalue","NEVER");

  --> set cookie to expire sometime in the future
    var exDate = new Date();
    expires.setMonth(expires.getMonth()+1);
    SW.tools.Cookie.set("sid","somevalue",expires);

### get cookie ###
  --> get value of cookie
    SW.tools.Cookie.get("sid");
    
### remove cookie ###
  --> remove cookie
    SW.tools.Cookie.remove("sid");
*/
SW.tools.Cookie = {
  values:[],
  loaded:false,
  set:function(name, value, expires, path, domain, secure){
    var cookieValue = new Array();
    cookieValue.push(name + "=" + escape(value));
    if(typeof expires != "undefined"){
      if(typeof expires == "string"){
        if(expires.toUpperCase() == "NEVER"){
          expires = new Date();
          expires.setFullYear(expires.getFullYear()+10);
        }else if(expires.toUpperCase() == "REMOVE"){
          expires = new Date();
          expires.setFullYear(expires.getFullYear()-1);
        }
      }
      cookieValue.push("expires=" + expires.toGMTString());
    }
    if(typeof path == "undefined"){
      path = "/";
    }
    cookieValue.push("path="+ path);
    if(typeof domain != "undefined"){
      cookieValue.push("domain=" + domain);
    }
    if(secure){
      cookieValue.push("secure");
    }
    document.cookie = cookieValue.join("; ");
    SW.tools.Cookie.loaded = false;
  },
  get:function(name){
    if (!SW.tools.Cookie.loaded) {
      SW.tools.Cookie._readCookie();
    };
    for (var i=0; i<SW.tools.Cookie.values.length; i++) {
      if (SW.tools.Cookie.values[i].name == name) {
        return SW.tools.Cookie.values[i].value;
      };
    }
    return "";
  },
  remove:function(name){
    SW.tools.Cookie.set(name,"","REMOVE");
  },
  // internal method
  _readCookie:function(){
    var cookieString = document.cookie;
    var paramPairs = cookieString.split("; ");
    var i,splitPair;
    SW.tools.Cookie.values = [];
    for (i=0; i<paramPairs.length; i++) {
      splitPair = paramPairs[i].split("=");
      if (splitPair.length == 2) {
        SW.tools.Cookie.values.push({
          name:unescape(splitPair[0]),
          value:unescape(splitPair[1])
        });
      }
    };
    SW.tools.Cookie.loaded = true;
  }
};

SW.tools.getSkinName = function(){
     return document.location.pathname.split("/")[1];
 };

SW.tools.Xml = {
    /**
     *
     * @param node - reference to parent node
     * @param tagname - tagname for which you want to get it's "innerText"
     * @return String
     */
    getSubNodeText:function(node, tagname){
        var returnValue;
        subNode = node.getElementsByTagName(tagname);
        if (subNode[0] != null) {
            returnValue = subNode[0].textContent || subNode[0].text;
            if(typeof returnValue == 'undefined' && subNode[0].firstChild){
                returnValue = subNode[0].firstChild.nodeValue;
            }
        }
        if(!returnValue){
            returnValue = "";
        }
        return returnValue;
    }
};

// helper methods to scrub html for data (taken from results.js - consider making common version)

SW.tools.Html = (function(){
    var yuiDom = YAHOO.util.Dom,
        yuiLang = YAHOO.lang;
    
    function dataToType(data, type, defaultVal) {
        var val = defaultVal;
        switch (type) {
            case "string":
                val = (data === "") ? defaultVal:data;
                break;
            case "array":
                if(data === ""){
                   val = defaultVal;
                }else{
                    val = data.split(",");
                }
                break;
            case "boolean":
                val = (data === "true") ? true:defaultVal;
                break;
            case "float":
                val = parseFloat(data);
                if (isNaN(val)) {
                    val = defaultVal;
                }
                break;
            case "int":
                val = parseInt(data, 10);
                if (isNaN(val)) {
                    val = defaultVal;
                }
                break;
            default:
                break;
        }
        return val;
    }
    var self = {
        getDataFromInput:function(root, className, type, defaultVal) {
            var input = yuiDom.getElementsByClassName(className, "input", root);
            var val = defaultVal;
            if (input && input[0]) {
                val = dataToType(input[0].value, type, defaultVal);
            }
            return val;
        },
        getDataFromTag:function(root, tagName, className, type, defaultVal) {
            var result = yuiDom.getElementsByClassName(className, tagName, root);
            var val = defaultVal;
            if (result && result[0]) {
                val = dataToType(yuiLang.trim(result[0].innerHTML), type, defaultVal);
            }
            return val;
        },
        getClearDiv:function(){
            var div = document.createElement("div");
            yuiDom.addClass(div,"clearDiv");
            return div;
        },
        appendClearDiv:function(parentNode){
            parentNode.appendChild(self.getClearDiv());
        }
    };
    return self;
})();
/**
 * SW.domWidget provides a common interface for Dom manipulation that
 * runs onDOMReady or when a manual refresh call is made to
 * SW.domWidget.update(rootElement).
 * NOTE: Performance is critical when developing new domWidget!
 * @namespace SW.domWidget
 */


/**
 * base widget - copy and paste the following code to start new widget.
 * must include id. This is used for namespacing.
 * should include load and update methods.
 * initialize is a standard naming convention, not required.
 * the following methods are automatically attached:
 *   setConfig - attaches config objects to html elements
 *   getConfig - retreived config object from html element
 *   setEnabled - turns a widget on/off
 *   getEnabled - used internally to determine if widget is enabled
 * all domWidget are disabled by default. To enable a widget, you must call
 *   SW.domWidget.WIDGET_ID.setEnabled(true);
 */
/*
SW.domWidget.add({
  id:"WidgetId",
  initialize:function(){
     // standard function name - manually called - SW.domWidget.WidgetId.initialize(params...);
  },
  load:function(){
    // do load stuff, find elements and setup
  },
  update:function(root){
    // do update stuff, find elements and setup. root element is passed in.
  }
});

*/

SW.domWidget = {
  widgetArray:[],
  initialize:function(){
    yuiEvent.onDOMReady(SW.domWidget.load);
  },
  /**
   * add a new wiget to the domWidget manager
   * @param {Object} widget
   */
  add:function(widget){
    SW.domWidget.widgetArray.push(widget);
    SW.domWidget[widget.id] = widget;
    widget.enabled = false;
    widget.setConfig = function(els,config){
      var self = this;
      if(! (typeof els == "object") || !(els.constructor == Array)){
        els = [els];
      }
      els.forEach(function(el){
        el = yuiDom.get(el);
        if(!el.widgetConfig){ el.widgetConfig = {}; }
        el.widgetConfig[self.id] = config;
      });
    }
    widget.getConfig = function(el){
      if(el && el.widgetConfig && el.widgetConfig[this.id]){
        return el.widgetConfig[this.id];
      }
      return null;
    }
    widget.setEnabled = function(enabled){
      this.enabled = enabled;
    }
    widget.getEnabled = function(){
      return this.enabled;
    }
  },
  /**
   * runs onDOMReady, checks for enabled domWidget and runs each load method
   */
  load:function(){
    SW.domWidget.widgetArray.forEach(function(widget){
      if(widget.getEnabled() && widget.load){
        widget.load();
      }
    });
  },
  /**
   * Manually call this method when creating html on the fly (dom methods or innerHTML).
   * checks for enabled domWidget and runs each update method, passing in the root element.
   * @param {Object} root
   */
  update:function(root){
    SW.domWidget.widgetArray.forEach(function(widget){
      if(widget.getEnabled() && widget.update){
        widget.update(root);
      }
    });
  }
};
/**
 * get things started...
 */
SW.domWidget.initialize();

/**
 * provides "label inside of text input" functionality. Label and class names are removed on click.
 * Include a custom attribute of label on text inputs, eg: label="(enter city)". When this label is showing,
 * a class of "hasDefaultText" will be applied to the input.
 * @namespace SW.domWidget.inputLabels
 */
// begin inputLabels //
SW.domWidget.add({
  id:"inputLabels",
  initialize:function(){

  },
  load:function(){
    this.setup();
  },
  update:function(root){
    this.setup(root);
  },
  /**
   * find all elements and initialize
   * @param {Object} root
   */
  setup:function(root){
    var self = this;
    yuiDom.getElementsBy(function(input){
      if(!!input.getAttribute("label")){
         self.setupInput(input);
      }
    },"input",root);
    yuiDom.getElementsBy(function(input){
      if(!!input.getAttribute("label")){
         self.setupInput(input);
      }
    },"textarea",root);
  },
  /**
   * initialize single input. Adds listeners for focus and blur on the input.
   * Also, adds listeners for form.onsubmit and submitButton.click. More cleanly handles clearing
   * the label out of the value when the form submits.
   * @param {Object} input
   */
  setupInput:function(input){
    var self = this;
    if(!this.getConfig(input)){
      var config = {
        label:input.getAttribute("label")
      };
      this.setConfig(input,config);
      yuiEvent.addListener(input,"focus",this.removeLabelBridge);
      yuiEvent.addListener(input,"blur",this.setLabelBridge);
      if(input.form){
        yuiEvent.addListener(input.form,"submit",self.removeLabelBridge.bind(input));
        // also try to attach to submit buttons - this fire before forom.onsubmit and can help play better with validation functions
        function addSubmitHandler (submitButton){
          if(submitButton.type == "submit"){
            yuiEvent.addListener(submitButton,"click",self.removeLabelBridge.bind(input));
          }
        }
        yuiDom.getElementsBy(addSubmitHandler,"input",input.form);
        yuiDom.getElementsBy(addSubmitHandler,"button",input.form);
      }
    }
    this.setLabel(input);
  },
  /**
   * two main methods for checking, adding & removing label
   */
  removeLabel:function(input){
    var config = this.getConfig(input);
    if(input.value == config.label){
      yuiDom.removeClass(input,"hasDefaultText");
      input.value = "";
    }
  },
  setLabel:function(input){
    var config = this.getConfig(input);
    if(input.value == "" || input.value == config.label){
      yuiDom.addClass(input,"hasDefaultText");
      input.value = config.label;
    }
  },
  /**
   * event handlers/bridging methods. Maintain "this" in *real* methods.
   */
  removeLabelBridge:function(e){
    SW.domWidget.inputLabels.removeLabel(this);
  },
  setLabelBridge:function(e){
    SW.domWidget.inputLabels.setLabel(this);
  }
});

/**
 * provides tool tip/contextual help. Must have a container element with
 * a class of "toolTipTrigger" and an inner element with a class of
 * "toolTip" (Must only be one "toolTip" inside of a trigger!).
 * @namespace SW.domWidget.toolTips
 */
SW.domWidget.add({
  id:"toolTips",
  classSettings:{},
  idSettings:{},
  /**
   * base setttings, if none are provided
   */
  settings:{
    /**
     * appendTipToBody - moves the toolTip element to the body element. Makes absolute positioning easier.
     * set to false to leave the tool tip owned by the toolTipTrigger.
     */
    triggerClassName:"toolTipTrigger",
    tipClassName:"toolTip",
    triggerTagName:"span",
    tipTagName:"div",

    appendTipToBody:true,
    showDelay:0.35,
    hideDelay:0.5,
    showDuration:.175,
    hideDuration:.25,
    showTransition:YAHOO.util.Easing.easeIn,
    hideTransition:YAHOO.util.Easing.easeIn,
    stopEventOnClick:true,
    showAttributes:{
      opacity:{from:0,to:1}
    },
    hideAttributes:{
      opacity:{from:1,to:0}
    },
    setPosition:function(config,e){
      var coords  = yuiEvent.getXY(e);
      var viewPortWidth = yuiDom.getViewportWidth();
      var toolTipWidth = yuiDom.getStyle(config.tip,"width");
      toolTipWidth = toolTipWidth.substring(0,toolTipWidth.length-2);
      if ((coords[0] + toolTipWidth) >= viewPortWidth) coords[0] -= toolTipWidth;
      yuiDom.setStyle(config.tip,"left", coords[0] +"px");
      yuiDom.setStyle(config.tip,"top", coords[1] +"px");
    },
    showOnStart:function(config){
      yuiDom.setStyle(config.tip,"opacity",0);
    },
    showOnComplete:function(config){
      // do nothing
    },
    hideOnStart:function(config){
      // do nothing
    },
    hideOnComplete:function(config){
      // do nothing
    }
  },
  /**
   * global settings, affects all tool tips on a page.
   * @See SW.domWidget.toolTips.settings
   * @param {Object} globalSettings
   */
  initialize:function(globalSettings){
    this.addSettings(globalSettings,"global",null);
  },
  /**
   * class name based settings. The class must be applied to the trigger,
   * for example <span class="toolTipTrigger customToolTip"></span>.
   * These settinsg will only apply to the "customToolTip".
   * @See SW.domWidget.toolTips.settings
   * @param {Object} className
   * @param {Object} classSettings
   */
  addClassSettings:function(className,classSettings){
    classSettings.triggerClassName = className;
    this.addSettings(classSettings,"class",className);
  },
  /**
   * id based settings can be useful for specific placement of toolTip for a
   * single element (ie, when the toolTip might display over a select box)
   * @See SW.domWidget.toolTips.settings
   * @param {Object} id
   * @param {Object} idSettings
   */
  addIdSettings:function(id,idSettings){
    this.addSettings(idSettings,"id",id);
  },
  /**
   * internal function for adding settings.
   * @param {Object} settings
   * @param {Object} type
   * @param {Object} id
   */
  addSettings:function(settings,type,id){
    var curSettings,setting;
    switch(type){
      case "global":
        curSettings = this.settings;
        break;
      case "class":
        curSettings = this.classSettings[id] = {};
        break;
      case "id":
        curSettings = this.idSettings[id] = {};
        break;
    }
    if(curSettings && settings){
      for(setting in settings){
        curSettings[setting] = settings[setting];
      }
    }
  },
  /**
   * internal method to lookup a specific setting
   * @param {Object} config
   * @param {Object} setting
   */
  getSetting:function(config,setting){
    if(config.idSettings && typeof config.idSettings[setting] != "undefined"){
      return config.idSettings[setting];
    }
    if(config.classSettings && typeof config.classSettings[setting] != "undefined"){
      return config.classSettings[setting];
    }
    return this.settings[setting];
  },
  load:function(){
    this.getElements();
  },
  update:function(root){
    this.getElements(root);
  },
  /**
   * find the tool tips
   * @param {Object} root
   */
  getElements:function(root){
    var self = this;
    var el,config,className,id;
    root = root || document;

    for(id in this.idSettings){
      el = yuiDom.get(id);
      if(el){
        config = {
          idSettings:this.idSettings[id]
        };
        for(className in this.classSettings){
          if(yuiDom.hasClass(el,className)){
            config.classSettings = this.classSettings[className];
            break;
          }
        }
        self.setup(el);
      }
    }

    for(className in this.classSettings){
      config = {
        classSettings:this.classSettings[className]
      };
      yuiDom.getElementsByClassName(className,self.getSetting(config,"triggerTagName"),root).forEach(function(element){
        self.setup(element);
      });
    }

    config = {};

    yuiDom.getElementsByClassName(self.getSetting(config,"triggerClassName"),self.getSetting(config,"triggerTagName"),root).forEach(function(element){
      self.setup(element);
    });
  },
  /**
   * initialize single tool tip
   * @param {Object} trigger
   */
  setup:function(trigger){
    var classSettings = null,idSettings = null;
    var tip,tipImage,closeButton;
    var animIn,animOut;
    var self = this;
    var primaryElements = [];
    if(!this.getConfig(trigger)){
//      tip = yuiDom.getElementsByClassName("toolTip",null,trigger)[0];
      closeButton = yuiDom.getElementsByClassName("toolTipClose",null,trigger)[0];

      if(trigger.id && this.idSettings[trigger.id]){
        idSettings = this.idSettings[trigger.id];
      }
      for(var prop in this.classSettings){
        if(yuiDom.hasClass(trigger,prop)){
          classSettings = this.classSettings[prop];
          break;
        }
      }
      /**
       * config object is attached to all import elements using this.setConfig();
       * this contains all pertinent information about this instance.
       */
      var config = {
        trigger:trigger,
        tip:null,
        tipImage:tipImage,
        isShowing:false,
        isOver:false,
        showTimeout:null,
        hideTimeout:null,
        classSettings:classSettings,
        idSettings:idSettings,
        x:0,
        y:0
      };
      tip = yuiDom.getElementsByClassName(self.getSetting(config,"tipClassName"),self.getSetting(config,"tipTagName"),trigger)[0];
      config.tip = tip;
      if(this.getSetting(config,"appendTipToBody")){
        document.body.appendChild(tip);
      }

      animIn = new yuiAnim(tip,this.getSetting(config,"showAttributes"),this.getSetting(config,"showDuration"),this.getSetting(config,"showTransition"));
      animIn.onStart.subscribe(function(){
        self.getSetting(config,"showOnStart")(config);
        yuiDom.addClass(config.tip,"toolTipShowing");
      });
      animIn.onComplete.subscribe(function(){
        self.getSetting(config,"showOnComplete")(config);
      });
      animOut = new yuiAnim(tip,this.getSetting(config,"hideAttributes"),this.getSetting(config,"hideDuration"),this.getSetting(config,"hideTransition"));
      animOut.onStart.subscribe(function(){
        self.getSetting(config,"hideOnStart")(config);
      });
      animOut.onComplete.subscribe(function(){
        self.getSetting(config,"hideOnComplete")(config);
        yuiDom.removeClass(config.tip,"toolTipShowing");
      });

      config.animIn = animIn;
      config.animOut = animOut;

      primaryElements.push(trigger);
      primaryElements.push(tip);
      if(closeButton){
        primaryElements.push(closeButton);
      }
      this.setConfig(primaryElements,config);
      // in future allow config to set mouseover or click for showing
      yuiEvent.addListener(trigger,"mouseover",this.bridge.setShow);
      yuiEvent.addListener(trigger,"mouseout",this.bridge.setHide);
      yuiEvent.addListener(tip,"mouseover",this.bridge.clearHide);
      yuiEvent.addListener(tip,"mouseout",this.bridge.setHide);
      // should the following line be config based? this prevents onlcicks from triggering on parent nodes
      if(this.getSetting(config,"stopEventOnClick")){
        yuiEvent.addListener(tip,"click",this.bridge.stopEvent);
      }
      if(closeButton){
        yuiEvent.addListener(closeButton,"click",this.bridge.hideNow);
      }
    }
  },
  /**
   * main internal methods to show and hide tool tips (using timeouts)
   */
  show:function(config){
    if(yuiDom.hasClass(config.tip,"toolTipShowing")){
      return;
    }
    if(config.isOver && !config.isShowing){
      config.isShowing = true;
      config.animIn.animate();
    }
  },
  hide:function(config){
    config.isShowing = false;
    config.animOut.animate();
  },
  setShow:function(config){
    var self = this;
    config.isOver = true;
    this.clearHide(config);
    if(!config.isShowing){
      config.showTimeout = setTimeout(function(){
        self.show(config);
      },this.getSetting(config,"showDelay")*1000);
    }
  },
  setHide:function(config){
    var self = this;
    config.isOver = false;
    if(!config.hideTimeout && config.isShowing){
      clearTimeout(config.showTimeout);
      config.showTimeout = null;
      config.hideTimeout = setTimeout(function(){
        self.hide(config);
      },this.getSetting(config,"hideDelay")*1000);
    }
  },
  clearHide:function(config){
    if(config.hideTimeout){
      clearTimeout(config.hideTimeout);
      config.hideTimeout = null;
    }
  },
  hideNow:function(config){
    this.hide(config);
  },
  /**
   * bridging methods to seperate event handlers from main methods
   */
  bridge:{
    setShow:function(e){
      var self = SW.domWidget.toolTips;
      var config = self.getConfig(this);

      if(!config.isShowing){
        self.getSetting(config,"setPosition")(config,e);
      }

      self.setShow(config);
    },
    setHide:function(e){
      var self = SW.domWidget.toolTips;
      var config = self.getConfig(this);
      self.setHide(config);
    },
    clearHide:function(e){
      var self = SW.domWidget.toolTips;
      var config = self.getConfig(this);
      self.clearHide(config);
    },
    hideNow:function(e){
      var self = SW.domWidget.toolTips;
      var config = self.getConfig(this);
      self.hideNow(config);
      yuiEvent.stopEvent(e);
    },
    stopEvent:function(e){
      yuiEvent.stopEvent(e);
    }
  }
});


/**
 * handles onchange of select box where the option values are urls.
 * add a class of "urlSelect" to the select box.
 * @namespace SW.domWidget.urlSelect
 */
SW.domWidget.add({
  id:"urlSelect",
  initialize:function(){
  },
  load:function(){
    this.setup();
  },
  update:function(root){
    this.setup(root);
  },
  setup:function(root){
    var self = this;
    yuiDom.getElementsByClassName("urlSelect","select",root).forEach(function(selectBox){
      self.setupSelect(selectBox);
    });
  },
  setupSelect:function(selectBox){
    var config;
    if(!this.getConfig(selectBox)){
      config = {
        input:selectBox
      }
      this.setConfig(selectBox,config);
      yuiEvent.addListener(selectBox,"change",this.selectUrlBridge);
    }
  },
  selectUrl:function(config){
    if(config.input.value){
      document.location.href = config.input.value;
    }
  },
  /**
   * bridging method
   * @param {Object} e
   */
  selectUrlBridge:function(e){
    SW.domWidget.urlSelect.selectUrl(SW.domWidget.urlSelect.getConfig(this));
  }
});

SW.domWidget.add({
  id:"dhtmlSelect",
  container:null,
  trigger:null,
  load:function(){
    this.setup();
  },
  update:function(root){
    this.setup(root);
  },
  setup:function(root){
    var self = this;
    yuiDom.getElementsByClassName("dhtmlSelect","div",root).forEach(function(container){
      if(!self.getConfig(container)){
        var config = {
          container:container,
          trigger:yuiDom.getElementsByClassName("dhtmlSelectTrigger",null,container)[0]
        };
        self.setConfig([config.trigger,config.container],config);
        yuiEvent.addListener(config.trigger,"click",self.showBridge);
        SW.domWidget.bodyClickHandler.add(self.hideBridge,[config.container],config.trigger);
      }
    });
  },
  show:function(config){
    yuiDom.addClass(config.container,"show");
  },
  hide:function(config){
    yuiDom.removeClass(config.container,"show");
  },
  showBridge:function(e){
    var self = SW.domWidget.dhtmlSelect;
    var config = self.getConfig(this);
    self.show(config);
  },
  hideBridge:function(e){
    var self = SW.domWidget.dhtmlSelect;
    var config = self.getConfig(this);
    self.hide(config);
  }
});

/**
 * single handler for detecting body.onclick. Conditionally fires supplied method
 * if the cick did not originate within one of the supplied test elements.
 * Example usage: dhtml drop-down, when a click outside the drop-down is detected, the close method
 * would be called.
 * @namespace SW.domWidget.bodyClickHandler
 */
SW.domWidget.add({
  id:"bodyClickHandler",
  initialized:false,
  handlers:[],
  load:function(){
    yuiEvent.addListener(document.body,"click",this.clickBridge);
  },
  /**
   * add a new handler
   * @param {Object} method - the method to be called, the event object will be passed as the only parameter to this method.
   * @param {Array} testElements - an array of container elements. If click originates inside one of these, the method will not be invoked.
   * @param {Object} context - Optional, supplies context for the method (the "this" object, defaults to window)
   */
  add:function(method,testElements,context){
    context = context || window;
    this.handlers.push({
      method:method,
      context:context,
      testElements:testElements
    });
  },
  click:function(e){
    var clickedElement = yuiEvent.getTarget(e);
    this.handlers.forEach(function(args){
      var isContained = false;
      for(var i=0;i<args.testElements.length;i++){
        if(args.testElements[i]==clickedElement || yuiDom.isAncestor(args.testElements[i],clickedElement)){
          isContained = true;
          break;
        }
      }
      if(!isContained){
        args.method.apply(args.context,[e]);
      }
    });
  },
  /**
   * bridging method
   * @param {Object} e
   */
  clickBridge:function(e){
    var self = SW.domWidget.bodyClickHandler;
    self.click(e);
  }
});
function WebForm() {
	var self = this;
	this.errors = new Array();
	this.addError = function(_x, _y, _z, _a, _b) {
		for (i=0; i < arguments.length; i++) {
			if(arguments[i] != null) {
				self.errors[self.errors.length] = new error(arguments[i]);

			}
		}

	}
	this.hasErrors = function() { return (self.errors.length != 0);	}
	this.resetErrors = function() {
		for (i = 0;  i < self.errors.length; i++) {
			self.errors[i].handle("reset");
		}
		self.errors = new Array();
	}
	this.showErrors = function() {
		for (i = 0;  i < self.errors.length; i++) {
			self.errors[i].handle();
		}
        if ((typeof s != 'undefined') && (typeof s.prop11 != 'undefined')) {
            var s_prop11 = s.prop11;
            s.prop11 += 'Error';
            setOmniVars(s.charSet, s.server, s.channel, s.prop2, s.prop3, s.prop1, "", s.prop11);
            var s_code=s.t();
            s.prop11 = s_prop11;
        }
    }
	function error(_x) {
		var self = this;
		var errorCode;
		self.errorCode = _x;
		this.handle = function(reset) {
			set = (reset==null) ? reset=false : reset=true;
			handleDisplay(self.errorCode, set);
		}
		return this;
	}
	this.collapseErrors = function(errorCode) {
		var count = 0;
		for (i = 0;  i < self.errors.length; i++) {
			if (self.errors[i].errorCode.charAt(0) == "~") { count++; }
		}
		if (count > 1) {
			for (i = 0;  i < self.errors.length; i++) {
				if (self.errors[i].errorCode.charAt(0) == "~") { self.errors[i].errorCode = null; }
			}
			self.errors[self.errors.length] = new error(errorCode);
		}
	}
}

function handleDisplay(_obj, reset) {
	if (_obj != null) {
		if (_obj.charAt(0) == "~") { _obj = _obj.substring(1);	}
		if (_obj.charAt(0) == "!") {
			reset = !reset;
			_obj = _obj.substring(1);
		}
		var obj = document.getElementById(_obj);
        if (obj) {
            if (obj.tagName == "LABEL") {
    			obj.className = reset ? "" : "error";
    		}  else {
    			obj.style.display =  reset ? "none" : "";
    		}
        }
    }
}

function display(obj, state) {
	if (document.getElementById(obj)) {
		document.getElementById(obj).style.display = state;
	}
}

function validDate(_field) {
	var field;
	var d;
  var getDate = true;
	field = _field;

	_s  = field.value;

    _d = getDateFromField(field, dateFormatString);
  this.valid = true;
  // safari will not return true for isNaN check even when the date is initialized with day = dd, month = mm, and year = yyyy
	if (isNaN(_d.getDate() ) || (field.value.toLowerCase() == dateFormatString.toLowerCase()) ) {  // Basically, this allows the functions to gracefully return to the format string instead of putting a date in the field.
			this.valid = false;
	}

	this.d = _d;
	var xxxdgetY = function() {
		var y = (self.d.getYear() + 10000) % 100;
		y += (y < 38) ? 2000 : 1900;
		return y
	}
	this.setField = function() {
		writeDateToField(field, this.d, dateFormatString);
	}
	this.setD = function(_d) {self.d = _d}
	this.nextDay = function() {return this.d.setDate(self.d.getDate()+1);}
	this.diffDate = function(dd) {
		return  Math.round( (makeDate(dd).getTime() - makeDate(self.d).getTime()) / (1000*60*60*24) );
	}
	function makeDate(md) {
		return new Date( fixYear(md.getYear()), md.getMonth(), md.getDate() );
	}
	function lZero(nr) {if (nr < 10) nr = "0" + nr;return nr;}

	var self = this;
	return this;
}

function fixYear(_y) {
		var y = (_y + 10000) % 100;
		y += (y < 38) ? 2000 : 1900;
		return y
}

function isValidEmail(field) {
	if (field != null && field != ''){
		field = stripCharsInBag (field, ' ')
//        var regexp = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; (oldone)
        var regexp = /^\w+((-\w+)|(\`\w+)|(\.\w+)|('\w+)|(\+\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        return (field.search(regexp) != -1);
	}
}

function doesUserNameContainHyphen(field) {
	var regExp = /-/;
	return (field.search(regExp) != -1)
}

function isValidZip(field, country){
	if (field != '' && field != null && country != '' && country != null){
		if (country == 'US'){
			var regExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
			return (field.search(regExp) != -1)
		} else if (country == 'CA'){
			v = stripCharsInBag(field, "- ");
			var regexp = /^[A-Va-v]|[X,Y,x,y]\d[A-Za-z]\d[A-Za-z]\d$/;
			return (v.length == 6 && !hasChars(v,'D', 'F', 'I', 'O', 'Q', 'U') && v.search(regexp) != -1)
		}
	}
}

function isUSCanZip(zip,country){
	if (zip != '' && zip != null)
		return (country == 'US' || country == 'CA');
}

function isValidPhone(phone,country){
	if (phone != null && phone != '' && country != null && country !=''){
		return (country == 'US' && isUSPhoneNumber (phone)) || (country != 'US' && isInternationalPhoneNumber (phone));
	}
	return true;
}

function isValidName(field){
	var regExp = /[0-9]/;
	if (field != null && field != '')
		return (field.search(regExp) != -1);
}

function isUSPhoneNumber(s){
	var phoneNumberDelimiters = "+.,()-xX# ";
	var digitsInUSPhoneNumber = 15; // allow 10 digits + 1- prefix (i.e +1 digit) + extension # (i.e +4 digits)
	var minDigitsInUSPhoneNumber = 10;
    s1 = stripCharsInBag(s, phoneNumberDelimiters);
    return (isInteger(s1) && (s1.length <= digitsInUSPhoneNumber && s1.length >= minDigitsInUSPhoneNumber));
}

function isInternationalPhoneNumber(s){
	var phoneNumberDelimiters = "+.,()-xX# ";
	s1 = stripCharsInBag(s, phoneNumberDelimiters);
    return (isInteger(s1));
}

function isValidSPGNum(field) {
	if (field != null && field != ''){
		// one optional letter + any number of digits + zero or more whitespace chars at the beginning and at the end
		var re = /^\s*[A-Za-z0-9]\d+\s*$/;
		if (field != null && field != ''){
			return (field.search(re) != -1);
		}
	}
}

function parseDate(_s) {
	try {
		d = Date.parse(_s);
		return d;
	} catch(err) {
		var dateArray = _s.split("/");
		var tempMonth = parseInt(dateArray[0],10);
		var tempDay = parseInt(dateArray[1],10);
		var tempYear = parseInt(dateArray[2],10);
		d = new Date(tempYear,(tempMonth-1),tempDay);
		return d;
	}
}

//--------------------------------------------------------
//Get the Date from a form field - Based on Internationalization Variables
//--------------------------------------------------------
function getDateFromField(formField, dateFormat) {
	// formField is a reference to a text field
	// dateFormat is a string describing the local date format
	//	Current options for dateFormat:
	//		mm/dd/yyyy - English
	//		dd/mm/yyyy - Non-English, Non-Japanese
	//		yyyy/mm/dd - Japanese, Chinese
    //		dd.mm.yyyy - German

    var date = new Date(); // Default the date to today ready to be overwritten.
	var currDate = new Date(); // Today's date and time for comparison's sake.

	dateFormat = dateFormat.toLowerCase();
	var fieldString;
    var hasSlashOrDash = false;
    if (typeof formField == "object") { fieldString= formField.value; } // Get the current value of the field
		else { fieldString = formField; } // We were passed a direct value
  if (fieldString.search("/") > 0) { // check if we have / to delimit
		var dateValues = fieldString.split("/");
        hasSlashOrDash = true;
    } else if (fieldString.search("-") > 0) { // They used - instead of /
		var dateValues = fieldString.split("-");
        hasSlashOrDash = true;
    } else if (fieldString.indexOf(".") >= 0) { // They used . instead of /
		var dateValues = fieldString.split(".");
	}else if (fieldString != "") {  // Assume there are no delimiters, assume one number
		var dateValues = new Array(fieldString);
	} else if (fieldString == "") {  // If there's not data there, assume it was deleted, and throw back a validDate object compatible invalid date.
		date.setTime(Date.parse(dateFormatString));
    return date;
	}

	if (fieldString.toLowerCase() == dateFormatString) {
		date.setTime(Date.parse(fieldString));
    return date;
	}

	var year;
	var month;
	var day;

	switch(dateFormat) {
		case 'mm/dd/yyyy':
			if (dateValues[0]) month = dateValues[0];
			if (dateValues[1]) day = dateValues[1];
			if (dateValues[2]) year = dateValues[2];
			break;
		case 'dd/mm/aaaa':
        case 'jj/mm/aaaa':
        case 'gg/mm/aaaa':
        case 'tt.mm.jjjj':
			if (dateValues[0]) day = dateValues[0];
			if (dateValues[1]) month = dateValues[1];
			if (dateValues[2]) year = dateValues[2];
			break;
		case 'yyyy/mm/dd':
			if (dateValues[0]) year = dateValues[0];
			if (dateValues[1]) month = dateValues[1];
			if (dateValues[2]) day = dateValues[2];
			break;
		case 'yyyy/dd/mm':
			if (dateValues[0]) year = dateValues[0];
			if (dateValues[1]) day = dateValues[1];
			if (dateValues[2]) month = dateValues[2];
			break;
        case 'dd.mm.yyyy':
        case 'dd/mm/yyyy':
            if (dateValues[0]) day = dateValues[0];
			if (dateValues[1]) month = dateValues[1];
			if (dateValues[2]) year = dateValues[2];
			break;
        case "yy\u5E74mm\u6708dd\u65E5":            
            if(!hasSlashOrDash) {
                //dateValues = fieldString.split(" ");
                year = fieldString.substr(0,2);
                month = fieldString.substr(3,2);
                day = fieldString.substr(6,2);
            } else {
                if (dateValues[0]) year = dateValues[0];
			    if (dateValues[1]) month = dateValues[1];
			    if (dateValues[2]) day = dateValues[2];
            }
            break;
		default:  // Default to mm/dd/yyyy
			if (dateValues[0]) month = dateValues[0];
			if (dateValues[1]) day = dateValues[1];
			if (dateValues[2]) year = dateValues[2];
			break;
	}
	if (year) {
		if (year.length == 2) { year = "20" + year; } // Try to make the year 4 digits
		if (year.length == 4) { // If it's not 4 digits, just fall back to using the current year
			date.setFullYear(year);
		}
	}
	date.setDate(1);
  if (month) date.setMonth(month - 1); // setMonth uses a zero-based number
  if (day) date.setDate(day);
  if (date.getTime() < currDate.getTime()) date.setYear(currDate.getFullYear() + 1); // For dates in the past, set to next year.
  // safari will not return true for isNaN check even when the date is initialized with day = dd, month = mm, and year = yyyy
  if(isNaN(month)&&isNaN(day)&&isNaN(year)) {
    if(!isNaN(date.getDate())) {
      date = {
        getDate: function() {
          return NaN;
        }
      }
    }
  }
  writeDateToField(formField, date, dateFormat);
	return date;
}

//--------------------------------------------------------
//Write the date to a form field - Based on Internationalization Variables
//--------------------------------------------------------

function writeDateToField(formField, date, dateFormat) {
// prevent "undefined" string from showing
  var dateString = "";
	if (isNaN(date.getDate())) {
		formField.value = dateString;
		return;
	}

	dateFormat = dateFormat.toLowerCase();
	var month = date.getMonth() + 1;
	month = paddZero(month);
	var day = date.getDate();
	day = paddZero(day);
	var year = date.getFullYear();
	var sep = "/";
	var dot = ".";
	switch(dateFormat) {
		case 'mm/dd/yyyy':
			dateString = month + sep + day + sep + year;
			break;
		case 'dd/mm/aaaa':
        case 'jj/mm/aaaa':
        case 'gg/mm/aaaa':
            dateString = day + sep + month + sep + year;
			break;
        case 'tt.mm.jjjj':
            dateString = day + dot + month + dot + year;
            break;
        case 'yyyy/mm/dd':
			dateString = year + sep + month + sep + day;
			break;
		case 'yyyy/dd/mm':
			dateString = year + sep + day + sep + month;
			break;
        case "yy\u5E74mm\u6708dd\u65E5":
            dateString = String(year).substr(2,2) + "\u5E74" + month  + "\u6708" + day  + "\u65E5";
            break;
        default:  // Default to mm/dd/yyyy
			dateString = month + sep + day + sep + year;
			break;
	}

	formField.value = dateString;
}

//-----------------------------------------------
// padd a zero if string is one char
function paddZero(s)
{
	if(s >= 0 && s <= 9){
	  s = '0' + s;
	}
	return s;
}
//------------------------------------------------------
/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */


if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},
/*
  modified version that allows using document.write if no value is passed in. This has
  been created to avoid "operation aborted" errors in IE.
*/
  write:function(_20) {     
    if (this.getAttribute("useExpressInstall")) {
      var _21 = new deconcept.PlayerVersion([6,0,65]);
      if (this.installedVer.versionIsValid(_21) && !this.installedVer.versionIsValid(this.getAttribute("version"))) {
        this.setAttribute("doExpressInstall", true);
        this.addVariable("MMredirectURL", escape(this.getAttribute("xiRedirectUrl")));
        document.title = document.title.slice(0, 47) + " - Flash Player Installation";
        this.addVariable("MMdoctitle", document.title);
      }
    }
    if (this.skipDetect || this.getAttribute("doExpressInstall") || this.installedVer.versionIsValid(this.getAttribute("version"))) {
      if(typeof _20 == "undefined"){
        document.write(this.getSWFHTML());
      }else{
        var n = (typeof _20 == "string") ? document.getElementById(_20) : _20;
        n.innerHTML = this.getSWFHTML();
      }
      return true;
    } else {
      if (this.getAttribute("redirectUrl") != "") {
        document.location.replace(this.getAttribute("redirectUrl"));
      }
    }
    return false;
  }};

deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;
// System globals
var flash2Installed = false;    // boolean. true if flash 2 is installed
var flash3Installed = false;    // boolean. true if flash 3 is installed
var flash4Installed = false;    // boolean. true if flash 4 is installed
var flash5Installed = false;    // boolean. true if flash 5 is installed
var flash6Installed = false;    // boolean. true if flash 6 is installed
var flash7Installed = false;    // boolean. true if flash 7 is installed
var flash8Installed = false;    // boolean. true if flash 8 is installed
var flash9Installed = false;    // boolean. true if flash 9 is installed
var flash10Installed = false;    // boolean. true if flash 10 is installed
var flash11Installed = false;    // boolean. true if flash 11 is installed
var flash12Installed = false;    // boolean. true if flash 12 is installed

// Vars for Backwards compatibiliy
var flagVar = "";
var flashTrue = "";
var maxVersion = 12;             // highest version we can actually detect
var actualVersion = 0;          // version the user really has
var jsVersion = 1.1;

// Check the browser...we're looking for ie/win
var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;    // true if we're on ie
var isWin = (navigator.appVersion.indexOf("Windows") != -1) ? true : false; // true if we're on windows

// Write vbscript detection on ie win. IE on Windows doesn't support regular
// JavaScript plugins array detection.
if (isIE && isWin) {
  document.write('<scr' + 'ipt type="text/vbscript"\> \n');
  document.write('on error resume next \n');
  document.write('flash2Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.2"))) \n');
  document.write('flash3Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.3"))) \n');
  document.write('flash4Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4"))) \n');
  document.write('flash5Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5"))) \n');
  document.write('flash6Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.6"))) \n');
  document.write('flash7Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.7"))) \n');
  document.write('flash8Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.8"))) \n');
  document.write('flash9Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.9"))) \n');
  document.write('flash10Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.10"))) \n');
  document.write('flash11Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.11"))) \n');
  document.write('flash12Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.12"))) \n');
  document.write('</scr' + 'ipt\> \n'); // break up end tag so it doesn't end our script
}

// Next comes the standard javascript detection that uses the
// navigator.plugins array. We pack the detector into a function so it loads
// before we run it.

function flashSniff() {
  // If navigator.plugins exists...
  if (navigator.plugins) {
    // ...then check for flash 2 or flash 3+.
    if (navigator.plugins["Shockwave Flash 2.0"]
        || navigator.plugins["Shockwave Flash"]) {

      // Some version of Flash was found. Time to figure out which.

      // Set convenient references to flash 2 and the plugin description.
      var isVersion2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
      var flashDescription = navigator.plugins["Shockwave Flash" + isVersion2].description;

      // DEBUGGING: uncomment next line to see the actual description.
      // alert("Flash plugin description: " + flashDescription);

      // A flash plugin-description looks like this: Shockwave Flash 4.0 r5
      // We can get the major version by grabbing the character before the period
      // note that we don't bother with minor version detection.
      // Do that in your movie with $version or getVersion().
      var flashVersion = parseInt(/[0-9]{1,}./.exec(flashDescription));

      // We found the version, now set appropriate version flags. Make sure
      // to use >= on the highest version so we don't prevent future version
      // users from entering the site.
      flash2Installed = flashVersion == 2;
      flash3Installed = flashVersion == 3;
      flash4Installed = flashVersion == 4;
      flash5Installed = flashVersion == 5;
      flash6Installed = flashVersion == 6;
      flash7Installed = flashVersion == 7;
      flash8Installed = flashVersion == 8;
      flash9Installed = flashVersion == 9;
      flash10Installed = flashVersion == 10;
      flash11Installed = flashVersion == 11;
      flash12Installed = flashVersion >= 12;
    }
  }

  // Loop through all versions we're checking, and
  // set actualVersion to highest detected version.
  for (var i = 2; i <= maxVersion; i++) {
    if (eval("flash" + i + "Installed") == true) actualVersion = i;
  }
  // Vars for backwards support
  if (i > 0) { flagVar = true; flashTrue = true; }
  // We're finished getting the version on all browsers that support detection.
  return actualVersion;
}
function setNonFlashUser(url) {
    document.cookie = 'isNonFlashUser=true; path=/';
    location.replace(url + "?type=nonflash");
}
function addLoadEvent(func) {
	var ssArray = "";
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}


function addResizeEvent(func) {
	var oldresize = window.onresize;
	if (typeof window.onresize != 'function') {
		window.onresize= func;
	} else {
		window.onresize = function() {
			oldresize();
			func();
		}
	}
}

//Function that takes element ID and pixel offset and changes height of elment.

function e(id) {
      return document.getElementById(id);
}

function autoResizeElement(id,bottomOffset) {
      var topOffset = 0;
      for (var elem = document.getElementById(id);
       elem != null;
       elem = elem.offsetParent) {
            topOffset += elem.offsetTop;
      }
      var windowHeight = getViewportHeight();
      var height = windowHeight - topOffset - bottomOffset;
      if (height >= 0) {
            document.getElementById(id).style.height = height + "px";
      }
}

function getViewportHeight() {
      if (window.self && self.innerHeight) {
            return self.innerHeight;
      }
      if (document.documentElement && document.documentElement.clientHeight) {
            return document.documentElement.clientHeight;
      }
      return 0;
}

function getViewportWidth() {
      if (window.self && self.innerWidth) {
            return self.innerWidth;
      }
      if ( (document.documentElement && document.documentElement.clientWidth) || (document.body && document.body.clientWidth) ) {
          if(document.documentElement.clientWidth > 0)   {
            return document.documentElement.clientWidth;
          }
          else if (document.body.clientWidth > 0) {
            return document.body.clientWidth
          }
      }
      return 0;
}


function getDocumentHeight()    {
    if (document.body && document.body.offsetHeight) {
        return document.body.offsetHeight;
      }
    if (document.body.document && document.body.document.height) {
        return document.body.document.height;
    }
    return 0;
}

function getDocumentWidth()    {
    if (document.body && document.body.offsetWidth) {
            return document.body.offsetWidth;
      }
    if (document.body.document && document.body.document.width) {
        return document.body.document.width;
    }
    return 0;
}

// Function that takes a String URL and sets the parent's location to the URL
function goToPage(obj) {
	if (obj.value != null && obj.value != "void" && obj.value != "") {
		parent.location =obj.value;
	}
}

// Generic pop up window function the window features are passed from the parent page
function openBrWindow(theURL,winName,features) {
	var winObj = window.open(theURL,winName,features);
	if (!winObj.opener) winObj.opener = self;
	winObj.focus();
}

// Function that takes in a name, reads that name from a cookie, and returns the value of that name.
function readCookie(name) {
	var cookies = document.cookie;
	var start = cookies.indexOf(name + "=");
	if (start == -1) return null;
	start = cookies.indexOf("=", start) + 1;
	var end = cookies.indexOf(";", start);
	if (end == -1) end = cookies.length;
	var value = unescape(cookies.substring(start, end));
	return value;
}

// Function that takes a name/value pair and sets them to a cookie
/*
   name - name of the cookie
   value - value of the cookie
   [expires] - expiration date of the cookie in days (defaults to end of current session)
   [path] - path for which the cookie is valid (defaults to path of calling document)
   [secure] - Boolean value indicating if the cookie transmission requires a secure transmission
   [domain] - domain for which the cookie is valid (defaults to domain of calling document)
   * an argument defaults when it is assigned null as a placeholder
   * a null placeholder is not required for trailing omitted arguments
*/
function setCookie(name, value, expires, path, secure, domain) {
	var today = new Date();
	today.setTime(today.getTime());
	
	if (expires) { expires = expires * 1000 * 60 * 60 * 24; }
	var expires_date = new Date( today.getTime() + (expires) );

	var curCookie = name + "=" + escape(value) +
	(( expires ) ? "; expires=" + expires_date.toGMTString() : "") + 
	((path) ? "; path=" + path : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : "");
	document.cookie = curCookie;
}

// Function that deletes a cookie
/*
   name - name of the cookie
   [path] - path of the cookie (must be same as path used to create cookie)
   [domain] - domain of the cookie (must be same as domain used to create cookie)
   * path and domain default if assigned null or omitted if no explicit argument proceeds
*/
function deleteCookie(name, path, domain) {
	if (readCookie(name)) {
		document.cookie = name + "=" +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

// Function to switch current display of id between "block" and "none"
function switchDisplay(elementID, swapType) {
	var element = document.getElementById(elementID);
	if (swapType == 'show'){
		element.style.display = 'block';
	} else {
		element.style.display = 'none';
	}
}

// Function to toggle an elements display
// elementID is the name of the element you want to toggle.
// currentDisplay is a boolean that's passed in and represents the elements current display type.
function toggleDisplay(elementID, currentDisplay) {
	var element = document.getElementById(elementID);
	if (currentDisplay){
		element.style.display = "none";
		currentDisplay = false;
	} else {
		element.style.display = "block";
		currentDisplay = true;
	}
	return currentDisplay;
}

var currentClass;
function classSwitcher(el,stateClass) {
	var element = (typeof el == "object") ? el : document.getElementById(el);
	if(currentClass==undefined || currentClass==stateClass) currentClass = element.className;

	if(element.className == currentClass || element.className == "") {
		element.className = stateClass;
	} else {
		element.className = currentClass;
	}
}
// Function to determine if a field is null
function isNull(fieldValue) {
	if (fieldValue == null) {fieldValue=''};
		return (fieldValue.length == 0);	
}

// Function to determine if two fields match each other
function isMatch(field1,field2) {
	if ((field1 != null && field1 != '') && ( field2 != null && field2 != ''))
		return (field1 == field2);
}

// Function to parse the querystring into useable variables
var parsequery_args = new Object();
function parsequery(qs) {
	if (qs.length > 2) {
		var query = qs.substring(1); // get query string (without initial "?")
		var pairs = query.split("&")  //break at ampersand into pairs
		var re = /\+/g; //the unescape() function does not remove +
		for (var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');  //look for "name=value"
			if (pos == -1) continue;      //if not found skip
			var argname = pairs[i].substring(0,pos);  //extract the name
			var value = pairs[i].substring(pos + 1);  //extract the value
			parsequery_args[argname] = unescape(value.replace(re," "));  //store as a property
		}
	}
}

// Function that takes a string (s) and 1 character (bag) to strip from the string.
// the function returns the string without the 1 character (bag) in it.
function stripCharsInBag (s, bag){
	var i;
	var returnString = "";
	for (i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		if (bag.indexOf(c) == -1) returnString += c;
	}
	return returnString;
}

// Function that gives you the screen x and screen y, even after the user has scrolled
var scrOfX = 0, scrOfY = 0;
function getScrollXY() {
	if( typeof( window.pageYOffset ) == 'number' ) {
	//Netscape compliant
		scrOfY = window.pageYOffset;
		scrOfX = window.pageXOffset;
	} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
	//DOM compliant
		scrOfY = document.body.scrollTop;
		scrOfX = document.body.scrollLeft;
	} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
	//IE6 standards compliant mode
		scrOfY = document.documentElement.scrollTop;
		scrOfX = document.documentElement.scrollLeft;
	}
	return [ scrOfX, scrOfY ];
}

// Fixes the IE background-image hover bug
try {
    document.execCommand( "BackgroundImageCache", false, true );
} catch( e ) { };


/**
 * Selects all checkboxes under the given parent node.  Set deep to true
 * to recursively set.
 *
 * @param {Node} parentNode     node under which checkboxes can be found
 * @param {boolean} checked     true to set checkboxes, false to clear (Default: true)
 * @param {boolean} deep        true to recursively set children deeper than one level (Default: true)
 */
function setCheckboxes(parentNode, checked, deep) {
    if(parentNode == null)  return;

    // defaults
    checked = (checked == null) ? true : checked;
    deep = (deep == null) ? true : deep;

    // loop through and select boxes
    for(var i=0; i < parentNode.childNodes.length; i++) {
        var node = parentNode.childNodes[i];

        if(deep) {
            // recursively set deeper child nodes
            if(node.hasChildNodes()) {
                setCheckboxes(node, checked, deep);
            }
        }

        // set checkbox
        if(node.nodeType == 1 && node.getAttribute("type") == "checkbox") {
            node.checked = checked;
        }
    }
}

/**
 * Asynchronously fills a select dropdown with properties given a list of
 * property IDs via an XHR call.
 *
 * @param {String} propSelect       select element containing property list
 * @param {String} propIds          comma delimited list of property ids to populate with
 * @param {String} selectedPropId   optional id of pre-selected property when the list is built
 * @param {function} onFailure      optional reference to a failure callback function
 * @param {function} onSuccess      optional reference to a success callback function
 */
function fillPropertySelect(propSelect, propIds, selectedPropId, onFailure, onSuccess) {
    // clear current select options
    while(propSelect.hasChildNodes()) {
        propSelect.removeChild(propSelect.childNodes[0]);
    }

    // remove spaces between properties in property list
    propIds = propIds.replace(/,\s+/g, ',');
    var url = "/whotels/property/propertyInfoAjax.html?propertyIDs=" + propIds;
    var callback = {
        success: _fillPropertySelectSuccess,
        failure: onFailure,
        argument: {'propSelect':propSelect, 'selectedPropId':selectedPropId, 'onSuccess':onSuccess}
    }

    // make the call
    var request = YAHOO.util.Connect.asyncRequest('GET', url, callback);
}

// success handler for fillPropertySelect XHR call
function _fillPropertySelectSuccess(o) {
    var i,j;

    // get prop select element
    var propSelect = o.argument['propSelect'];
    if(propSelect == null) return;

    // get selected property id
    var selectedPropId = o.argument['selectedPropId'];

    // process response
    var yuiJson = YAHOO.lang.JSON;
    var result = yuiJson.parse(o.responseText);
    var propMap = result.data;

    var propIds = propMap['propIds'];
    var propNames = propMap['propNames'];

    // sort alphabetically by property names
    var sortedPropNames = new Array();
    for(i=0; i<propNames.length; i++) {
        sortedPropNames.push(propNames[i]);
    }
    sortedPropNames.sort();

    // sort ids according to sorted property names
    var sortedPropIds = new Array();
    for(i=0; i<propIds.length; i++) {
        for(j=0; j<propNames.length;j++) {
            if(propNames[j] == sortedPropNames[i]) {
                sortedPropIds.push(propIds[j]);
                break;
            }
        }
    }
    // create options for each property
    var option;

    // create a list of prop id => prop name mappings sorted by name
    for(i=0; i<sortedPropIds.length; i++) {
        option = document.createElement('option');
        option.setAttribute("value", sortedPropIds[i]);

        if(selectedPropId == sortedPropIds[i]) {
            option.setAttribute("selected", "selected");
        }
        
        option.appendChild(document.createTextNode(sortedPropNames[i]));
        propSelect.appendChild(option);
    }

    // call callback method
    if(o.argument['onSuccess']) {
        o.argument['onSuccess']();
    }
}

// function to determine the offsetLeft of an element that is passed in
function getElementOffsetLeft (element) {
    var leftOffset = element.offsetLeft;
    while ((element = element.offsetParent) != null){
        leftOffset  += element.offsetLeft;
    }
    var viewPort = document.documentElement.clientWidth;
    return leftOffset;
}
// function to determine the offsetTop of an element that is passed in
function getElementOffsetTop (element) {
    var topOffset = element.offsetTop;
    while ((element = element.offsetParent) != null){
        topOffset +=element.offsetTop;
    }
    var docHeight = document.documentElement.scrollTop;
    var viewPort = document.documentElement.clientHeight;
    return topOffset;
}

//function to keep check box checked even if clicked
function keepChecked(formElement)  {
    
    if(!formElement.checked)    {
        formElement.checked = true;    
    }
}

//Top destination layer close
function topDestinationsClose()	{
    document.getElementById("topDestinationsList").style.visibility = "hidden";
    document.getElementById("topDestinationsIframeShim").style.display = "none";
}

//Top destination layer open
function topDestinationsOpen()	{                    
    var obj1 = document.getElementById("topDestinationsList");
    var obj2 = document.getElementById("topDestinationsIframeShim");
    obj1.style.visibility = "visible";
    obj2.style.visibility = "visible";
    obj1.style.display = "block";
    obj2.style.display = "block";
}


SW.domWidget.bodyClickHandler.setEnabled(true);
