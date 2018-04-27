var Hashtable=(function(u){var h="function",m="string",n="undefined";
if(typeof encodeURIComponent==n||Array.prototype.splice===u||Object.prototype.hasOwnProperty===u){return null
}function a(v){return(typeof v==m)?v:""+v
}function g(w){var v;
if(typeof w==m){return w
}else{if(typeof w.hashCode==h){v=w.hashCode();
return(typeof v==m)?v:g(v)
}else{return a(w)
}}}function f(x,w){for(var v in w){if(w.hasOwnProperty(v)){x[v]=w[v]
}}}function s(v,w){return v.equals(w)
}function c(v,w){return(typeof w.equals==h)?w.equals(v):(v===w)
}function e(v){return function(w){if(w===null){throw new Error("null is not a valid "+v)
}else{if(w===u){throw new Error(v+" must not be undefined")
}}}
}var i=e("key"),d=e("value");
function l(y,w,x,v){this[0]=y;
this.entries=[];
this.addEntry(w,x);
if(v!==null){this.getEqualityFunction=function(){return v
}
}}var b=0,o=1,j=2;
function r(v){return function(x){var w=this.entries.length,z,y=this.getEqualityFunction(x);
while(w--){z=this.entries[w];
if(y(x,z[0])){switch(v){case b:return true;
case o:return z;
case j:return[w,z[1]]
}}}return false
}
}function t(v){return function(z){var A=z.length;
for(var y=0,x=this.entries,w=x.length;
y<w;
++y){z[A+y]=x[y][v]
}}
}l.prototype={getEqualityFunction:function(v){return(typeof v.equals==h)?s:c
},getEntryForKey:r(o),getEntryAndIndexForKey:r(j),removeEntryForKey:function(w){var v=this.getEntryAndIndexForKey(w);
if(v){this.entries.splice(v[0],1);
return v[1]
}return null
},addEntry:function(v,w){this.entries.push([v,w])
},keys:t(0),values:t(1),getEntries:function(y){var z=y.length;
for(var x=0,w=this.entries,v=w.length;
x<v;
++x){y[z+x]=w[x].slice(0)
}},containsKey:r(b),containsValue:function(x){var v=this.entries,w=v.length;
while(w--){if(x===v[w][1]){return true
}}return false
}};
function q(w,x){var v=w.length,y;
while(v--){y=w[v];
if(x===y[0]){return v
}}return null
}function k(v,w){var x=v[w];
return(x&&(x instanceof l))?x:null
}function p(){var A=[];
var z={};
var y={replaceDuplicateKey:true,hashCode:g,equals:null};
var x=arguments[0],w=arguments[1];
if(w!==u){y.hashCode=x;
y.equals=w
}else{if(x!==u){f(y,x)
}}var v=y.hashCode,B=y.equals;
this.properties=y;
this.put=function(F,G){i(F);
d(G);
var H=v(F),I,E,D=null;
I=k(z,H);
if(I){E=I.getEntryForKey(F);
if(E){if(y.replaceDuplicateKey){E[0]=F
}D=E[1];
E[1]=G
}else{I.addEntry(F,G)
}}else{I=new l(H,F,G,B);
A.push(I);
z[H]=I
}return D
};
this.get=function(E){i(E);
var F=v(E);
var G=k(z,F);
if(G){var D=G.getEntryForKey(E);
if(D){return D[1]
}}return null
};
this.containsKey=function(E){i(E);
var D=v(E);
var F=k(z,D);
return F?F.containsKey(E):false
};
this.containsValue=function(E){d(E);
var D=A.length;
while(D--){if(A[D].containsValue(E)){return true
}}return false
};
this.clear=function(){A.length=0;
z={}
};
this.isEmpty=function(){return !A.length
};
var C=function(D){return function(){var E=[],F=A.length;
while(F--){A[F][D](E)
}return E
}
};
this.keys=C("keys");
this.values=C("values");
this.entries=C("getEntries");
this.remove=function(F){i(F);
var G=v(F),D,E=null;
var H=k(z,G);
if(H){E=H.removeEntryForKey(F);
if(E!==null){if(H.entries.length==0){D=q(A,G);
A.splice(D,1);
delete z[G]
}}}return E
};
this.size=function(){var E=0,D=A.length;
while(D--){E+=A[D].entries.length
}return E
}
}p.prototype={each:function(y){var v=this.entries(),w=v.length,x;
while(w--){x=v[w];
y(x[0],x[1])
}},equals:function(v){var y,w,z,x=this.size();
if(x==v.size()){y=this.keys();
while(x--){w=y[x];
z=v.get(w);
if(z===null||z!==this.get(w)){return false
}}return true
}return false
},putAll:function(D,y){var x=D.entries();
var A,B,z,v,w=x.length;
var C=(typeof y==h);
while(w--){A=x[w];
B=A[0];
z=A[1];
if(C&&(v=this.get(B))){z=y(B,v,z)
}this.put(B,z)
}},clone:function(){var v=new p(this.properties);
v.putAll(this);
return v
}};
p.prototype.toQueryString=function(){var v=this.entries(),w=v.length,x;
var y=[];
while(w--){x=v[w];
y[w]=encodeURIComponent(a(x[0]))+"="+encodeURIComponent(a(x[1]))
}return y.join("&")
};
return p
})();