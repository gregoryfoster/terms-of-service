if(!window.Jelly){Jelly=new Object()}if(!Function.prototype.bind){Function.prototype.bind=function(b){var a=this;return function(){return a.apply(b,arguments)}}}$.extend(Jelly,{init:function(){this.observers=[];this.attach=this.Observers.attach;this.notifyObservers=this.Observers.notify;this.Pages.init()},Observers:{attach:function(){if(this==Jelly){return Jelly.Observers.attach.apply(this.observers,arguments)}for(var d=0;d<arguments.length;d++){var b=arguments[d];if(b.component){var a=Jelly.Observers.evaluateComponent(b.component);if(a.init){var c=a.init.apply(a,b.arguments);if(c===false||c===null){}else{Jelly.Observers.pushIfObserver.call(this,c||a)}}else{Jelly.Observers.pushIfObserver.call(this,a)}}else{Jelly.Observers.pushIfObserver.call(this,Jelly.Observers.evaluateComponent(b))}}},evaluateComponent:function(component){return(typeof component=="string")?eval(component):component},pushIfObserver:function(a){if(a){this.push(a)}},notify:function(callbacks){if(this==Jelly){return Jelly.Observers.notify.apply(this.observers,arguments)}if(!$.isArray(callbacks)){callbacks=[callbacks]}var observers=this.slice(0);for(var i=0;i<callbacks.length;i++){var callback=callbacks[i];if(callback.on){var additionalObserver=eval(callback.on);if(observers.indexOf(additionalObserver)==-1){observers.push(additionalObserver)}}if(callback.method){for(var j=0;j<observers.length;j++){var observer=observers[j];if(observer[callback.method]){if(observer.detach&&observer.detach()){Jelly.Observers.garbageCollectObserver.call(this,observer)}else{observer[callback.method].apply(observer,callback.arguments)}}}}if(callback.attach){Jelly.Observers.attach.apply(this,callback.attach)}}},garbageCollectObserver:function(a){var b=this.indexOf(a);if(b>-1){Jelly.Observers.remove.call(this,b,b+1)}},remove:function(c,b){var a=this.slice((b||c)+1||this.length);this.length=c<0?this.length+c:c;return this.push.apply(this,a)}},Pages:{init:function(){this.all={};Jelly.all=this.all},add:function(a){var c=new Jelly.Page.Constructor(a);for(var b=1;b<arguments.length;b++){$.extend(c,arguments[b])}return c}},Page:{init:function(c,a){var b=Jelly.Pages.all[c]||new Jelly.Page.Constructor(c);window.page=b;if(b.all){b.all()}if(b[a]){b[a].call(b)}b.loaded=true;return b},Constructor:function(a){this.loaded=false;this.documentHref=Jelly.Location.documentHref;this.name=a;Jelly.Pages.all[a]=this}},Location:{on_redirect:function(a){top.location.href=a}}});Jelly.add=Jelly.Pages.add;Jelly.init();