(function(e){function c(j,i,g,h,f){this._listener=i;
this._isOnce=g;
this.context=h;
this._signal=j;
this._priority=f||0
}c.prototype={active:true,params:null,execute:function(f){var h,g;
if(this.active&&!!this._listener){g=this.params?this.params.concat(f):f;
h=this._listener.apply(this.context,g);
if(this._isOnce){this.detach()
}}return h
},detach:function(){return this.isBound()?this._signal.remove(this._listener,this.context):null
},isBound:function(){return(!!this._signal&&!!this._listener)
},isOnce:function(){return this._isOnce
},getListener:function(){return this._listener
},getSignal:function(){return this._signal
},_destroy:function(){delete this._signal;
delete this._listener;
delete this.context
},toString:function(){return"[SignalBinding isOnce:"+this._isOnce+", isBound:"+this.isBound()+", active:"+this.active+"]"
}};
function a(f,g){if(typeof f!=="function"){throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}",g))
}}function d(){this._bindings=[];
this._prevParams=null;
var f=this;
this.dispatch=function(){d.prototype.dispatch.apply(f,arguments)
}
}d.prototype={VERSION:"1.0.0",memorize:false,_shouldPropagate:true,active:true,_registerListener:function(j,h,i,g){var f=this._indexOfListener(j,i),k;
if(f!==-1){k=this._bindings[f];
if(k.isOnce()!==h){throw new Error("You cannot add"+(h?"":"Once")+"() then add"+(!h?"":"Once")+"() the same listener without removing the relationship first.")
}}else{k=new c(this,j,h,i,g);
this._addBinding(k)
}if(this.memorize&&this._prevParams){k.execute(this._prevParams)
}return k
},_addBinding:function(f){var g=this._bindings.length;
do{--g
}while(this._bindings[g]&&f._priority<=this._bindings[g]._priority);
this._bindings.splice(g+1,0,f)
},_indexOfListener:function(g,f){var i=this._bindings.length,h;
while(i--){h=this._bindings[i];
if(h._listener===g&&h.context===f){return i
}}return -1
},has:function(g,f){return this._indexOfListener(g,f)!==-1
},add:function(h,g,f){a(h,"add");
return this._registerListener(h,false,g,f)
},addOnce:function(h,g,f){a(h,"addOnce");
return this._registerListener(h,true,g,f)
},remove:function(h,g){a(h,"remove");
var f=this._indexOfListener(h,g);
if(f!==-1){this._bindings[f]._destroy();
this._bindings.splice(f,1)
}return h
},removeAll:function(){var f=this._bindings.length;
while(f--){this._bindings[f]._destroy()
}this._bindings.length=0
},getNumListeners:function(){return this._bindings.length
},halt:function(){this._shouldPropagate=false
},dispatch:function(g){if(!this.active){return
}var f=Array.prototype.slice.call(arguments),i=this._bindings.length,h;
if(this.memorize){this._prevParams=f
}if(!i){return
}h=this._bindings.slice();
this._shouldPropagate=true;
do{i--
}while(h[i]&&this._shouldPropagate&&h[i].execute(f)!==false)
},forget:function(){this._prevParams=null
},dispose:function(){this.removeAll();
delete this._bindings;
delete this._prevParams
},toString:function(){return"[Signal active:"+this.active+" numListeners:"+this.getNumListeners()+"]"
}};
var b=d;
b.Signal=d;
if(typeof define==="function"&&define.amd){define(function(){return b
})
}else{if(typeof module!=="undefined"&&module.exports){module.exports=b
}else{e.signals=b
}}}(this));