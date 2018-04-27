/*jslint browser: true, bitwise: true, regexp: true */

var VGC = {};

(function(){
	'use strict';
	
	var appContainers = {},
		appDependencyRefs = {};
	
	function App(name, data) {
		function indexOf(arr, obj, start) {
			var result = -1, i = (start || 0), t = arr.length;
	         for (i; i < t; i++) {
	             if (arr[i] === obj) { 
	            	 result = i;
	            	 break;
	             }
	         }
	         return result;
	    }
		function resolveAppDependencies(){
			var dependencies = appDependencyRefs[name],
				i = 0, dependencyRef, prop, thisModuleIndex = -1,
				instance;
			
			for(i; i < dependencies.length; i++){
				dependencyRef = dependencies[i];
				instance = VGC.app(dependencyRef).newInstance();
				instance.run();
			}
			
			for(prop in appDependencyRefs){				
				if(appDependencyRefs.hasOwnProperty(prop)) {					
					thisModuleIndex = indexOf(appDependencyRefs[prop], name);
					
					if(thisModuleIndex > -1 && typeof appDependencyRefs[prop][thisModuleIndex] === 'string'){
						appDependencyRefs[prop][thisModuleIndex] = data;
					}
				}
			}
		}		
		this.run = function(element){
			element = element || false;
			
			resolveAppDependencies();
			data.setRootElement(element);
			data.instantiateModules();
		};
		this.inject = function(fn){
			var fnBody = fn.toString(),	
				args = /\(([^)]+)/.exec(fnBody),
				modules = [],
				i = 0,
				moduleName,
				instance;
			
			if (args[1]) {
			    args = args[1].split(/\s*,\s*/);
			}
			
			for(i; i < args.length; i++){
				moduleName = args[i];
				moduleName = moduleName.substring(1, moduleName.length - 1);
				modules.push( data.getModule(moduleName) );
			}
			function Module(){}
				Module.prototype = fn.prototype;
			
			instance = new Module();
			instance = fn.apply(instance, modules);
		};
		this.mock = function(mockName, instance){
			data.mockModule(mockName, instance);
		};
	}
	
	function AppData(appName){
		var rootElement = false,
			moduleDefinitions = {},
			modules	= {},
			mockDefinitions = {};
		
		function resolveDependencies(depReferences){
			var i = 0, resolved = [], moduleName, module;
			for(i; i < depReferences.length; i++){	
				moduleName = depReferences[i];
				module = this.getModule(moduleName);
				
				if(typeof module === 'undefined'){
					module = this.addModule(moduleName, this.getModuleDefinition(moduleName));
				}
				resolved.push(module);
			}
			return resolved;
		}
		
		function searchDependencies(moduleName, type){
			var i = 0, 
				appDependencies = appDependencyRefs[appName],
			 	moduleFound,
			 	module,
			 	appDependency;
			 	
			for(i; i < appDependencies.length; i++){
				appDependency = appDependencies[i];
				if(type === 'module definition'){
					module = appDependency.getModuleDefinition(moduleName);
				}else{
					module = appDependency.getModule(moduleName);
				}
				if(module !== false){
					moduleFound = module;
					break;
				}
			}
			return moduleFound;
		}
		
		this.clone = function () {
			var newData = new AppData(appName),
				definition;
			for(definition in moduleDefinitions) {
				if( moduleDefinitions.hasOwnProperty(definition)) {
					newData.storeModule(definition, moduleDefinitions[definition]);
				}
			}
			return newData;
		};
				
		this.setRootElement = function(element){
			rootElement = element;
		};
		
		this.storeModule = function(name, definition){
			moduleDefinitions[name] = definition;
		};
		
		this.instantiateModules = function(){
			var definition;
			for(definition in mockDefinitions) {
				if( mockDefinitions.hasOwnProperty(definition)) {
					this.addModule(definition, mockDefinitions[definition], true);
				}
			}
			for(definition in moduleDefinitions) {
				if( moduleDefinitions.hasOwnProperty(definition)) {
					this.addModule(definition, moduleDefinitions[definition], false);
				}
			}
		};
		
		this.addModule = function(name, definition, mock){
			function Module(){}
			var ModuleConstructor,
				moduleArguments,
				moduleInstance;
			
			if(typeof definition === 'function'){
				definition = [definition];
			}
			if(definition){
				ModuleConstructor = definition[definition.length -1];
				moduleArguments = resolveDependencies.call(this, definition.slice(0, definition.length - 1));
				
				Module.prototype = ModuleConstructor.prototype;
				moduleInstance = new Module();
				moduleInstance = ModuleConstructor.apply(moduleInstance, moduleArguments);
				
				if(!modules[name] || mock===true){
					modules[name] = moduleInstance;
				}
			}else{
				throw new Error('Module ' + name + ' is not defined');
			}
			return moduleInstance;
		};
		
		this.mockModule = function(name, instance){
			mockDefinitions[name] = [function () {
				return instance;
			}];
		};
		
		this.getModule = function(moduleName){
			var module = modules[moduleName] || searchDependencies(moduleName, 'module');
			return module;
		};
				
		this.getModuleDefinition = function(moduleName){
			var definition = moduleDefinitions[moduleName] || searchDependencies(moduleName, 'module definition');
			return definition;
		};

	}	
	
	
	
	function AppContainer(name){
		var data = new AppData(name);		
		
		this.module = function(moduleName, definition){
			data.storeModule(moduleName, definition);
		};
		
		this.newInstance = function() {
			var appData = data.clone();
			return new App(name, appData);
		};
	}

	
	function createNewAppContainer(appReference){
		var	instance = new AppContainer(appReference);
		appContainers[appReference] = instance;
		return instance;
	}
	function manageAppDependencies(appReference, appDependencies){
		var i = 0, j = 0,
			hasDependency = false,
			dependencies = appDependencyRefs[appReference] || [],
			newDep, storedDep;
		for(i; i < appDependencies.length; i++){
			newDep = appDependencies[i];
			hasDependency = false;
			for(j=0; j < dependencies.length; j++){
				storedDep = dependencies[j];
				if(newDep === storedDep){
					hasDependency = true;
				}
			}
			if(hasDependency === false){
				dependencies.push(newDep);
			}
		}
		appDependencyRefs[appReference] = dependencies;
	}
	this.app = function(appReference, appDependencies){
		var appContainer =  appContainers[appReference] || createNewAppContainer(appReference);
			manageAppDependencies(appReference, appDependencies || []);
		return appContainer;
	};

	
}).apply(VGC);
/*jslint browser:true*/
/*globals VGC:true*/
(function(VGC){
	'use strict';

	var base = VGC.app('$coreLib');
	
		base.module('$document', [function(){
			return document;
		}]);
		
		base.module('$window', [function(){
			return window;
		}]);
		
		base.module('$XMLHttpRequest', [function(){
			return window['XMLHttpRequest'];
		}]);
		
		base.module('$XDomainRequest', [function(){
			return window['XDomainRequest'];
		}]);
		
		base.module('$ActiveXObject', [function(){
			return window['ActiveXObject'];
		}]);
}(VGC));
/*jslint browser:true*/
/*globals VGC:true*/
(function(VGC){
	'use strict';

	var base = VGC.app('$coreLib');
	
		base.module('$events', ['$arrayIndexOf', '$window', function($arrayIndexOf, $window){
			
			function VGCEvent(type){
				this.type = type || '';
				this.data = {};
				this.target;
			}
			
			function manageDOMEvents(subscriptionType, object, eventType, fn, useCapturePhase){
				var i = 0,
					events = eventType.split(' '),
					prefix = object.addEventListener ? '' : 'on',
					useCapture = useCapturePhase || false;
				
				for(i; i<events.length; i+=1){
					object[subscriptionType](prefix + events[i], fn, useCapture);
				}
			}
			
			function Events(){
				this.activeEvents = {};
			}
			
			Events.prototype.getOrCreateArray = function(){
				var location = this.activeEvents, key;
				
				while(arguments.length > 0){
					key = Array.prototype.shift.call(arguments);
					if(!location[key]){
						location[key] = [];
					}
					location = location[key];
				}
				return location;
			};
			
			Events.prototype.addEvent = function (object, eventType, fn, useCapturePhase) {
				var	subscriptionType = object.addEventListener ? 'addEventListener' : 'attachEvent';
				manageDOMEvents(subscriptionType, object, eventType, fn, useCapturePhase);
			};
			
			Events.prototype.removeEvent = function(object, eventType, fn) {
				var	subscriptionType = object.removeEventListener ? 'removeEventListener' : 'detachEvent';
					manageDOMEvents(subscriptionType, object, eventType, fn);
			};
			
			Events.prototype.dispatch = function(event, dispatcher){
				var subscriptions, i = 0, eventType;
				
				if(typeof event === 'string'){
					event = this.createEvent(event);
				}
				event.target = dispatcher;
				eventType = event.type;
				subscriptions = dispatcher ? this.getOrCreateArray(dispatcher, eventType) : this.getOrCreateArray(eventType);
				
				for(i; i<subscriptions.length; i+=1){
					subscriptions[i](event);
				}
			};
			
			Events.prototype.subscribe = function(dispatcher, eventType, callback){
				var subscriptions,
					isNewSubscription = false;
				if(!dispatcher){
					subscriptions = this.getOrCreateArray(eventType);
				}else{
					subscriptions = this.getOrCreateArray(dispatcher, eventType);
				}
				
				if($arrayIndexOf(subscriptions, callback) === -1){
					subscriptions.push(callback);
					isNewSubscription = true;
				}
				return isNewSubscription;
			};
			
			Events.prototype.unsubscribe = function(dispatcher, eventType, callback){
				var subscriptions, callbackIndex;
				
				if(!dispatcher){
					subscriptions = this.getOrCreateArray(eventType);
				}else{
					subscriptions = this.getOrCreateArray(dispatcher, eventType);
				}
				callbackIndex = $arrayIndexOf(subscriptions, callback);
				if(callbackIndex !== -1){
					subscriptions.splice(callbackIndex, 1);
				}
			};
			
			Events.prototype.createEvent = function(type){
				var event = new VGCEvent(type);
				return event;
			};
			
			Events.prototype.getTarget = function(evt){
				var e = evt || $window.event,
					target = e.target || e.srcElement;
					if(typeof target === 'undefined' && typeof e.touches !== 'undefined'){
						target = e.touches[0];
					}
				return target;
			};
			
			Events.prototype.preventDefault = function (event) {
				if(event.preventDefault){
					event.preventDefault();
				} else {
					event.returnValue = false;
				}
			};
			
			Events.prototype.stopPropagation = function (event) {
				if(event.stopPropagation){
					event.stopPropagation();
					if(event.stopImmediatePropagation){
						event.stopImmediatePropagation();
					}
				} else {
					event.cancelBubble = true;
				}
			};
			
			return Events;
	}]);

}(VGC));
/*jslint browser:true*/
/*globals VGC:true*/
(function(VGC){
	'use strict';
	
	var app = VGC.app('$coreLib');
		 
		app.module('$keyCodes', function(){
			
			var keyCodes = {
				TAB 		: 9,
	            ENTER 		: 13,
	            ESC 		: 27,
	            SPACE 		: 32,
	            LEFT_ARROW 	: 37,
	            UP_ARROW 	: 38,
	            RIGHT_ARROW : 39,
	            DOWN_ARROW 	: 40
			};
			return keyCodes;
			
		});
		
}(VGC));
/*jslint browser:true*/
/*globals VGC:true, escape:true, unescape:true*/
(function(VGC){
	'use strict';
	
	var app = VGC.app('$coreLib');
		
		app.module('$cookie', ['$document', function($document){
			var cookie = {};
			
				cookie.get = function(name){
					var nameEQ = name + '=',
						cookies = $document.cookie.split(';'),
						i = 0,
						result,
						c;
					
					for(i; i < cookies.length; i++) {
						c = cookies[i];
						while (c.charAt(0) === ' ') {
							c = c.substring(1, c.length);
						}
						if (c.indexOf(nameEQ) === 0){
							result = unescape(c.substring(nameEQ.length,c.length));
						}
					}
					return result;
				};
				
				cookie.set = function(name, value, days, includeDomain){
					var date, expires = '';
					if (days) {
						date = new Date();
						date.setTime(date.getTime()+(days * 24 * 60 * 60 * 1000));
						expires = '; expires=' + date.toGMTString();
					}
					$document.cookie = name + '=' + escape(value) + expires + '; path=/' + (includeDomain ? ';domain=.vanguard.com' : '');
				};
				
				cookie.has = function(name){
					return $document.cookie.indexOf(name + '=') === 0 || $document.cookie.indexOf(' ' + name + '=') >= 0;
				};
				
				cookie.erase = function(name) {
					this.set(name, '', -1);
				};
			
			return cookie;
		}]);
		
}(VGC));
/*jslint browser:true*/
/*globals VGC:true*/
(function(VGC){
	'use strict';
	
	var base = VGC.app('$coreLib');
	
		base.module('$bind', [function(){
			function bindFunc (funcToBind, bindTo) {
				var args,
			        FNOP = function () {},
			        fBound;
				if( arguments.length > 2 ){
					args = Array.prototype.slice.call(arguments, 2);
				}else{
					args = [];
				}
				
			    if (typeof funcToBind !== 'function') {
			      throw new TypeError('$coreLib $bind - what is trying to be bound is not callable');
			    }
			    
		        fBound = function () {
		          return funcToBind.apply(funcToBind instanceof FNOP && bindTo
		                                 ? funcToBind
		                                 : bindTo,
		                               args.concat(Array.prototype.slice.call(arguments)));
		        };			
			    FNOP.prototype = funcToBind.prototype;
			    fBound.prototype = new FNOP();
			
			    return fBound;
			}
			return bindFunc;
		}]);
}(VGC));
//jslint browser:true,globals VGC:true
 
(function(VGC){
	'use strict';
	
	var base = VGC.app('$coreLib');	

		base.module('$AjaxRequestConfig', function(){
			function Config(){
				this.url		= undefined;
				this.method		= 'GET';
				this.postData	= '';
				this.callback	= function(){};
				this.forceXHR	= false;
			}
			return Config;
		});	
		
}(VGC));
//jslint browser:true,globals VGC:true,XMLHttpRequest:true
 
(function(VGC){
	'use strict';
	
	var base = VGC.app('$coreLib');
	
	base.module('$ajaxRequest', ['$document', '$window', '$XMLHttpRequest', '$XDomainRequest', '$ActiveXObject', function($document, $window, $XMLHttpRequest, $XDomainRequest, $ActiveXObject){
		
		var addQueryParam = function(url, key, value) {
			if (url.indexOf('?') > 0) {
				url = url + '&' + key + '=' + value;
			} else {
				url = url + '?' + key + '=' + value;
			}
			return url;
		};
		
		return function (_config) {
			var	config = _config || {},
				request = new $XMLHttpRequest(),
				PID = [	'MSXML2.XMLHTTP.6.0',
						'MSXML2.XMLHTTP.5.0',
						'MSXML2.XMLHTTP.4.0',
						'MSXML2.XMLHTTP.3.0',
						'MSXML2.XMLHTTP.2.0',
						'Microsoft.XMLHTTP' ],
				i = 0, 
				t = PID.length;
	
			if($XDomainRequest && config.forceXHR !== true){
				request = new $XDomainRequest();
			}else if(config.forceXHR !== true && $ActiveXObject){					
				for ( i = 0; i < t; i+=1 ) {
					request = new $ActiveXObject( PID[ i ] );
					if ( request ) {
						break;
					}
				}
			}

			if(typeof config.url !== 'undefined'){
				config.url = addQueryParam(config.url, 'noCache', new Date().getTime());
			}

			if(!(request instanceof $XMLHttpRequest)){
				config.method = 'POST';
				config.postData = String($document.cookie);
				if (config.loggedOn) {
					config.url = addQueryParam(config.url, 'loggedOn', 'true');
				}
			}
			return request;
		};
	}]);

}(VGC));
//jslint browser:true,globals VGC:true
 
(function(VGC){
	'use strict';
	
	var base = VGC.app('$coreLib');
	
	base.module('$ajax', ['$window', '$document', '$arrayIndexOf', '$bind', '$select', '$ajaxRequest', '$createElement', '$XMLHttpRequest', function($window, $document, $arrayIndexOf, $bind, $select, $ajaxRequest, $createElement, $XMLHttpRequest){
		var REQUEST_COMPLETE = 4,
			STATUS_OK = 200,
			JSONP_ID = 'vgcJSONPLoader',
			JSONP_CALLBACK = 'vgcJSONPCallback',
			requests = [];
		
		function removeRequest(request){
			var index = $arrayIndexOf(requests, request);
			if(index > -1){
				requests.splice(index, 1);
			}
		}
		
		function Loader(){
			this.data = undefined;
			this.callback = undefined;
			this.config = undefined;
		}
		
		Loader.prototype.load = function($ajaxRequestConfig){
			this.config = $ajaxRequestConfig;
			this.request = $ajaxRequest(this.config);
			if(this.config.url.indexOf('.jsonp') > -1){
                this.loadJSONP();
			} else {
				requests.push(this.request);
				this.request.open(this.config.method, this.config.url, true);
				this.request.onreadystatechange = $bind(this.onLoaded, this);
				if (this.request instanceof $XMLHttpRequest) {
					this.request.setRequestHeader('Accept', 'application/json');
					this.request.withCredentials = true;
				} else {
					this.request.timeout	= 5000;
					this.request.onload		= $bind(this.onLoaded, this, true);
					this.request.onprogress	= function(){};
					this.request.ontimeout	= $bind(this.onTimeout, this);
					this.request.onerror	= $bind(this.onError, this);
				}
				if( this.request ) {
					this.request.send(this.config.postData);
				}
			}
		};

		Loader.prototype.loadJSONP = function(){
			var script = $select('#' + JSONP_ID);
			
			$window[JSONP_CALLBACK] = this.config.callback;
            this.config.url = this.config.url.replace('callback=?', 'callback=' + JSONP_CALLBACK);
            if(script.length > 0){
				$document.body.removeChild(script[0]);
            }
            script = $createElement('script', {id:JSONP_ID});
            script.src = this.config.url;
            $document.body.appendChild(script);
		};
		
		Loader.prototype.onLoaded = function(isMicrosoftRequest){
            var readyState,
                status,
                responseText;
          try {
				responseText = this.request.responseText;
                readyState = this.request.readyState;
                status = this.request.status || STATUS_OK;
                if((readyState === REQUEST_COMPLETE && status === STATUS_OK) || (isMicrosoftRequest === true && typeof responseText !== 'undefined' && responseText !== '')){
                    this.data = responseText;
                    this.config.callback(true, this.data, this);
                    removeRequest(this.request);
                }else if(status !== STATUS_OK){
                    this.config.callback(false, {status:status}, this);                   
                }
            } catch (e) {}
		};
		
		Loader.prototype.onError = function(){
			this.config.callback(false, {status:0}, this);
		};
		
		Loader.prototype.onTimeout = function(){
			return;
		};
		
		Loader.prototype.cancel = function(){
			this.request.abort();
		};
		
		return function($ajaxRequestConfig){
			var loader = new Loader();
				loader.load($ajaxRequestConfig);
			return loader;
		};
		
	}]);
		
}(VGC));
/*jslint browser:true*/
/*globals VGC:true*/
(function (VGC) {
    'use strict';

    var base = VGC.app('$coreLib');

    base.module('$select', ['$document', '$stringUtils', function ($document, $stringUtils) { 
        return function(selectorString) {
        	var nodes = [],
        		result;
        		
        		selectorString = $stringUtils.trim(selectorString);
        		selectorString = selectorString.substring(1);
        		result = $document.getElementById(selectorString);
        		if(result){
        			nodes.push(result);
        		}
            return nodes;
        };
    }]);

}(VGC));
/*globals VGC:true */
(function (VGC) {
	'use strict';
    var app = VGC.app('$coreLib');
			
	app.module('$measurements', ['$window',function($window){
		return { 
			getElementBounds : function(ele){
				var rect = ele.getBoundingClientRect(),
				result = {};
				result.width = rect.width || rect.right - rect.left;
				result.height = rect.bottom - rect.top;
				result.x = result.left = rect.left;
				result.y = result.top = rect.top;
				result.right = rect.right;
				result.bottom = rect.bottom;
				
				return result;
			}
		};
	}]);
}(VGC));
/*jslint browser:true*/
/*globals VGC:true*/
(function(VGC){
	'use strict';
	
	var base = VGC.app('$coreLib');
	
		base.module('$arrayIndexOf', [function(){
			return function (arr, obj, start) {
				if(arr.indexOf){
					return arr.indexOf(obj, start);
				}
				var result = -1, i = (start || 0), t = arr.length;
			         for (i; i < t; i++) {
			             if (arr[i] === obj) {
			            	 result = i;
			            	 break;
			             }
			         }
			         return result;
			    };
		}]);		
}(VGC));
/*jslint browser:true*/
/*globals VGC:true*/
(function(VGC){
	'use strict';
	
	var base = VGC.app('$coreLib');
	
		base.module('$stringUtils', [function(){
		    return {
		        trim: function(string) {
		            var result;
		            if (!string) {
		                result = string;
		            } else {
		                result = /^\s*(\S(.*\S)?)\s*$/.exec(string);
		                result = result ? result[1] : '';
		            }
		            return result;
		        }
		    };

		}]);		
}(VGC));
/*globals VGC:true */
(function (VGC) {
	'use strict';

	var base = VGC.app('$coreLib');

	base.module('$createElement', ['$document', function ($document) {
		var create = function (elementName, attrs, parent) {
			var el = $document.createElement(elementName),
				prop = '';
			if (typeof attrs !== 'undefined') {
				for (prop in attrs) {
					if (attrs.hasOwnProperty(prop)) {
					    if (prop === 'class') {
					        el.className = attrs[prop];
					    } else {
	                        el.setAttribute(prop, attrs[prop]);
					    }
					}
				}
			}
			if (typeof parent !== 'undefined' && parent.appendChild) {
				parent.appendChild(el);
			}
			return el;
		};

		return create;
	}]);

}(VGC));
/*globals VGC:true */
(function (VGC) {
	'use strict';

	var base = VGC.app('$coreLib');

	base.module('$class', ['$stringUtils', function ($stringUtils) {
		var $class = {};
		
		$class.add = function (element, className) {
			try{
				if (element.className === '') {
					element.className = className;
				} else if(!this.has(element, className)){
					element.className = element.className + ' ' + className;
				}
			}catch(e){
				throw new Error('No element to add class ' + className);
			}
		};
		
		$class.remove = function (element, value) {
			try{
				var className = ' ' + element.className + ' ';
				while (className.indexOf(' ' + value + ' ') >= 0) {
					className = className.replace(' ' + value + ' ', ' ');
				}
				element.className = $stringUtils.trim(className);
			}catch(e){
				throw new Error('No element supplied to remove class ' + value);
			}
		};
		
		$class.has = function (element, value) {
			var classes = [],
				i = 0,
				hasClass = false;
			try{
				if (typeof element.className !== 'undefined') {
					classes = element.className.split(' ');
					for (i; i < classes.length; i = i + 1) {
						hasClass = hasClass || classes[i] === value;
					}
				}
			}catch(e){
				throw new Error('No element supplied to check for class ' + value);
			}
			
			return hasClass;
			
		};
		
		return $class;
	}]);

}(VGC));
/*jslint browser:true*/
/*globals VGC:true*/
(function(VGC){
	'use strict';
	
	var app = VGC.app('$coreLib');
		 
		app.module('$contains', function(){
			function contains(container, element) {	
				if(element){
					if (element === container) {
						return true;
					} else if (element.parentNode) {
						return contains(container, element.parentNode);
					}
				}
				return false;
			};
			
			return contains;
			
		});
		
}(VGC));
/*jslint browser:true,  bitwise: true*/
/*globals VGC:true*/
(function (VGC) {
    'use strict';

    var base = VGC.app('$coreLib');
	base.module('$hash', [function () {
		return {
			calculate : function (string) {
				var hash = 0, i, chr, len;
				if (string.length === 0) {
					return hash;
				}
				for (i = 0, len = string.length; i < len; i = i + 1) {
					chr  = string.charCodeAt(i);
					hash = ((hash << 5) - hash) + chr;
					hash |= 0;
				}
				return hash;
			}
		};
	}]);
}(VGC));
/*jslint browser:true*/
/*globals VGC:true*/ 
(function (VGC) {
	'use strict';
	var app = VGC.app('globalHeaderFooter');	

	app.module('detection', ['$window', function ($window) {		
		var detection = {
				isMobileDevice: function () {
					var userAgent = $window.navigator.userAgent.toLowerCase(),
						mobileDeviceUserAgents = ['ipad', 'ipod', 'iphone', 'android', 'kindle', 'silk'],
						i;
					
					for (i = 0; i < mobileDeviceUserAgents.length; i++) {
						if(userAgent.indexOf(mobileDeviceUserAgents[i]) > -1) {
							return true;
						}
					}
					return false;
				}
		};
		return detection;
	}]);

}(VGC));
/*jslint browser:true*/
/*globals VGC:true*/ 
(function (VGC) {
	'use strict';
	var app = VGC.app('globalHeaderFooter');	

	app.module('EventManager', ['$events', function ($events) {		
		return new $events();
	}]);

}(VGC));
/*jslint browser:true*/
/*globals VGC:true*/
(function (VGC) {
	'use strict';
	var app = VGC.app('globalHeaderFooter');	

	app.module('KeystrokeManager', ['$document', '$bind', '$arrayIndexOf', 'EventManager', '$keyCodes', function ($document, $bind, $arrayIndexOf, EventManager, $keyCodes) {
		
		function KeystrokeManager(list, makeFirstItemTabStop){
			this.list = list || [];
			this.listener;
			this.FORWARD = [];
			this.BACKWARD = [];
			this.ALL = [];
			this.boundNavigation;
			this.setForward([$keyCodes.RIGHT_ARROW, $keyCodes.DOWN_ARROW]);
			this.setBackward([$keyCodes.LEFT_ARROW, $keyCodes.UP_ARROW]);
			
			if(this.list.length > 0){
				this.registerItems(this.list, makeFirstItemTabStop);
			}
		}
		
		function wrapKeysInArray(keys){
			if(!(keys instanceof Array)){
				keys = [keys];
			}
			return keys;
		}
		
		KeystrokeManager.prototype.clearItems = function(){
			while(this.list.length > 0){
				this.list.pop();
			}
		};
		
		KeystrokeManager.prototype.registerItems = function(list, makeFirstItemTabStop){
			var i = 0, item;
			
			for(i; i<list.length; i++){
				item = list[i];
				if(item.setAttribute){
					item.setAttribute('tabIndex', '-1');
				}
			}
			if(list.length > 0 && makeFirstItemTabStop) {
				list[0].setAttribute('tabIndex', '0');
			}
			this.list = list;
		};
		
		KeystrokeManager.prototype.setListeningElement = function(element){
			this.element = element;
			this.boundNavigation = $bind(this.navigateList, this);
			EventManager.addEvent(this.element, 'keydown', this.boundNavigation);
		};
		
		KeystrokeManager.prototype.setAll = function(){
			var i=0;
			this.ALL = [];
			for(i; i<this.FORWARD.length; i++){
				this.ALL.push(this.FORWARD[i]);
			}
			for(i=0; i<this.BACKWARD.length; i++){
				this.ALL.push(this.BACKWARD[i]);
			}
		};
		
		KeystrokeManager.prototype.setKeys = function(keys, directionArray){
			var i = 0, key;
			keys = wrapKeysInArray(keys);
			for(i; i<keys.length; i++){
				key = keys[i];
				
				if($arrayIndexOf(directionArray, key) === -1){
					directionArray.push(key);
				}
			}
		};
		
		KeystrokeManager.prototype.setForward = function(keys){
			this.FORWARD = wrapKeysInArray(keys);
			this.setAll();
		};
		
		KeystrokeManager.prototype.setBackward = function(keys){
			this.BACKWARD = wrapKeysInArray(keys);
			this.setAll();
		};
		
		KeystrokeManager.prototype.addForward = function(keys){
			this.setKeys(keys, this.FORWARD);
			this.setAll();
		};
		
		KeystrokeManager.prototype.addBackward = function(keys){
			this.setKeys(keys, this.BACKWARD);
			this.setAll();
		};
		
		KeystrokeManager.prototype.navigateList = function(e){			
			var	event = e || window.event,
				activeElement = $document.activeElement || EventManager.getTarget(event),
				currentIndex = $arrayIndexOf(this.list, activeElement),
				kc = event.keyCode,
				shiftDepressed = event.shiftKey === true,
				dir = 1,
				nextIndex;
			
			if($arrayIndexOf(this.ALL, kc) > -1 && shiftDepressed === false){
				EventManager.preventDefault(e);
				if(isNaN(currentIndex)){
					currentIndex = -1;
				}
				dir = $arrayIndexOf(this.BACKWARD, kc) > -1 ? -1 : dir;
				
				nextIndex = currentIndex + dir;
				nextIndex = nextIndex > this.list.length - 1 ? 0 : nextIndex;
				nextIndex = nextIndex < 0 ? this.list.length - 1 : nextIndex;
			
				if(this.list[nextIndex]){
					this.list[nextIndex].focus();
				}
			}
		};
		
		KeystrokeManager.prototype.destroy = function(){			
			EventManager.removeEvent(this.element, 'keydown', this.boundNavigation);
			this.list = this.listener = this.boundNavigation = this.FORWARD = this.BACKWARD = this.ALL = undefined;
		};
		
		return KeystrokeManager;
	}]);

}(VGC));
/*jslint browser:true*/
/*globals VGC:true*/
(function (VGC) {
	'use strict';
	var app = VGC.app('globalHeaderFooter');	

	app.module('KeyboardModeDetector', ['$arrayIndexOf', '$bind', '$class', '$document', 'EventManager', '$keyCodes', '$window', function ($arrayIndexOf, $bind, $class, $document, EventManager, $keyCodes, $window) {
		
		function KeyboardModeDetector(){
			this.element;
			this.boundKeyboardActivity;
			this.boundMouseActivity;
			this.KEYBOARD_ACTIVE_CLASS_NAME = 'vgc-keyboardModeActive';
			this.KEYBOARD_INACTIVE_CLASS_NAME = 'vgc-keyboardModeInactive';
		}
		KeyboardModeDetector.prototype.init = function(element){
			this.element = element;
			this.boundKeyboardActivity = $bind(this.onKeyboardActivity, this);
			this.boundMouseActivity = $bind(this.onMouseActivity, this);
			$class.add(this.element, this.KEYBOARD_INACTIVE_CLASS_NAME);
			EventManager.addEvent(this.element, 'keydown', this.boundKeyboardActivity);
			EventManager.addEvent(this.element, 'mousedown', this.boundMouseActivity);
		};
		KeyboardModeDetector.prototype.onKeyboardActivity = function(evt){
			var event = evt || $window.event,
				keyCode = event.keyCode;
			if($arrayIndexOf([$keyCodes.TAB, $keyCodes.LEFT_ARROW, $keyCodes.RIGHT_ARROW, $keyCodes.DOWN_ARROW, $keyCodes.UP_ARROW], keyCode) > -1){
				$class.add(this.element, this.KEYBOARD_ACTIVE_CLASS_NAME);
				$class.remove(this.element, this.KEYBOARD_INACTIVE_CLASS_NAME);
			}else{
				$class.add(this.element, this.KEYBOARD_INACTIVE_CLASS_NAME);
				$class.remove(this.element, this.KEYBOARD_ACTIVE_CLASS_NAME);
			}
		};
		KeyboardModeDetector.prototype.onMouseActivity = function(event){
			$class.add(this.element, this.KEYBOARD_INACTIVE_CLASS_NAME);
			$class.remove(this.element, this.KEYBOARD_ACTIVE_CLASS_NAME);
		};
		
		KeyboardModeDetector.prototype.destroy = function(){			
			EventManager.removeEvent(this.element, 'keydown', this.boundKeyboardActivity);
			EventManager.removeEvent(this.element, 'mousedown', this.boundKeyboardActivity);
			$class.remove(this.element, this.KEYBOARD_ACTIVE_CLASS_NAME);
			$class.remove(this.element, this.KEYBOARD_INACTIVE_CLASS_NAME);
		};
		
		return KeyboardModeDetector;
	}]);

}(VGC));
/*globals VGC:true */
(function (VGC) {
	'use strict';
	var app = VGC.app('globalHeaderFooter');

	app.module('AutoSuggestData', ['$ajax', '$AjaxRequestConfig', '$bind', 'EventManager', function ($ajax, $AjaxRequestConfig, $bind, EventManager) {

		function AutoSuggestData(){
			this.data;
			this.DATA_AVAILABLE = 'onAutoSuggestDataAvailable';
			this.loadEvent = EventManager.createEvent(this.DATA_AVAILABLE);
			this.loader;
			this.boundRequestLoaded;
		}

		AutoSuggestData.prototype.populate = function(data){
			this.data = data;
		};

		AutoSuggestData.prototype.query = function(term){		
			var compositeURL = this.data.href + this.data.parameters + '&callback=?' + '&' + this.data.queryTerm + '=' + encodeURIComponent(term),
				config;
			
			if(!this.loader){
				this.boundRequestLoaded = $bind(this.onRequestLoaded, this);
				config = new $AjaxRequestConfig();
				config.callback =  this.boundRequestLoaded;
				config.url = compositeURL;
				this.loader = $ajax(config);
			}else{
				config = this.loader.config;
				config.url = compositeURL;
				this.loader.cancel();				
				this.loader.load(config);
			}
		};
		
		AutoSuggestData.prototype.onRequestLoaded = function(data){
			this.loadEvent.data = data.results;
			EventManager.dispatch(this.loadEvent, this);
		};
		
		AutoSuggestData.prototype.destroy = function(){
			if(this.loader){
				this.loader.cancel();
				delete this.loader;
			}
			this.data = this.boundRequestLoaded = this.loadEvent = undefined;
		};
		
		return AutoSuggestData;
	}]);

}(VGC));
/*globals VGC:true */
(function (VGC) {
	'use strict';
	var app = VGC.app('globalHeaderFooter');

	app.module('AutoSuggestResult', ['$createElement', 'EventManager', '$window', function ($createElement, EventManager, $window) {

		function AutoSuggestResult(){
			this.a;
			this.icon;
			this.rendered = false;			
		}	
		
		AutoSuggestResult.prototype.populate = function(data){
			this.data = data;
		};
		
		AutoSuggestResult.prototype.render = function(){
			var span = $createElement('span');
			var spanDiv = $createElement('div', {'class':'vgc-searchResultSpanDiv'});
			this.a = $createElement('a', {href:this.data.url, 'class':'vgc-searchResult vgc-' + this.data.type + '-type', role:'link'});
			if(this.data.type === 'fund'){
				this.icon = $createElement('div', {'class':'vgc-searchResultIcon_fund'});
				this.a.appendChild(this.icon);
			}			
			span.innerHTML = this.data.term;
			spanDiv.appendChild(span);
			this.a.appendChild(spanDiv);
			this.rendered = true;
		};

		AutoSuggestResult.prototype.getAnchor = function(){
			return this.a;
		};
		
		AutoSuggestResult.prototype.destroy = function(){
			this.rendered = false;
			if(this.a && this.a.parentNode){
				this.a.parentNode.removeChild(this.a);			
			}
			delete this.a;
		};
		
		return AutoSuggestResult;
	}]);

}(VGC));
/*globals VGC:true */
(function (VGC) {
	'use strict';
	var app = VGC.app('globalHeaderFooter');

	app.module('AutoSuggest', ['$bind', '$class', '$contains', '$createElement', '$document', 'EventManager', '$keyCodes', '$window', 'AutoSuggestResult', 'AutoSuggestData', 'KeystrokeManager', function ($bind, $class, $contains, $createElement, $document, EventManager, $keyCodes, $window, AutoSuggestResult, AutoSuggestData, KeystrokeManager) {

		function AutoSuggest(){
			this.div;
			this.input;
			this.autoSuggestData;
			this.rendered = false;
			this.resultsData = [];
			this.results = [];
			this.minimumCharacterSearch;
			this.isVisible = false;
			this.keystrokeManager = new KeystrokeManager();
			this.horizontalNavHeight;
		}	
		
		AutoSuggest.prototype.populate = function(data){
			this.data = data;
			this.minimumCharacterSearch = this.data.minimumCharacterSearch;			
		};
		
		AutoSuggest.prototype.render = function(){
			if(this.rendered === false){
				this.div = $createElement('div', {'class':'vgc-autoSuggest vgc-hidden'});
				this.autoSuggestData = new AutoSuggestData();
				this.autoSuggestData.populate(this.data);
				EventManager.subscribe(this.autoSuggestData, this.autoSuggestData.DATA_AVAILABLE, $bind(this.onResultsAvailable, this));
				EventManager.addEvent($window, 'resize', $bind(this.hide, this));
				EventManager.addEvent($document, 'click', $bind(this.hide, this));
				this.rendered = true;
			}
		};
		
		AutoSuggest.prototype.setInputField = function(element,searchBar){
			this.input = element;
			EventManager.addEvent(this.input, 'keyup', $bind(this.onInputUpdate, this));
			this.keystrokeManager.setListeningElement(searchBar);
			EventManager.addEvent(searchBar, 'keyup', $bind(this.onSearchKeyUp, this));
		};
		
		AutoSuggest.prototype.onSearchKeyUp = function(e){
			var keyCode = e.keyCode;
			if($keyCodes.TAB === keyCode ||  $keyCodes.ESC === keyCode){
				this.hide();
				EventManager.preventDefault(e);
			}
		};
		
		AutoSuggest.prototype.onInputUpdate = function(e){
			var term = this.input.value;
			if(term.length >= this.minimumCharacterSearch && e.keyCode !== $keyCodes.ESC){
				this.autoSuggestData.query(term);
			}else{
				this.hide();
			}
		};
		 
		AutoSuggest.prototype.onResultsAvailable = function(event){
			var searchResultNumberSpan;
			this.resultsData = event.data;
			if(this.resultsData.length > 0){
				this.show();
				if($window.innerWidth < 1002){
					searchResultNumberSpan = $document.getElementById('horizontalNavSearchResultSpan');
				}else{ 
					searchResultNumberSpan = $document.getElementById('brandHeaderSearchResultSpan');
				} 
				if(typeof searchResultNumberSpan !== 'undefined' && searchResultNumberSpan !== null){
					searchResultNumberSpan.innerHTML = 'Expanded ' + this.resultsData.length + ' search results available';
				};
			}else{
				this.hide();
			}
		};
		
		AutoSuggest.prototype.getDiv = function() {
			return this.div;
		};

		AutoSuggest.prototype.show = function() {
		    this.showTopResults();
		    var me = this;
		    if ($document.getElementById('horizontalNav') != null) {
		    	this.horizontalNavHeight = $document.getElementById('horizontalNav').offsetHeight;
		    }

		    $window.setTimeout(function() {
		    	if (me.div.offsetHeight > $window.innerHeight) {
			    	me.div.style.height = ($window.innerHeight - me.horizontalNavHeight) + "px";
		    	}
		    }, me);
		    this.setVisible();
		};
		
		AutoSuggest.prototype.setVisible = function() {
			if(this.isVisible !== true) {
				$class.remove(this.div, 'vgc-hidden');
				this.isVisible = true;
			}
		};
		
		AutoSuggest.prototype.hide = function(e) {
			var i,searchResultNumberSpan;
			if (this.isVisible) {
				$class.add(this.div, 'vgc-hidden');
				this.clearResults();
				this.clearResultsData();
				this.isVisible = false;
				if ($window.innerWidth < 1002) {
					searchResultNumberSpan = $document.getElementById('horizontalNavSearchResultSpan');
				} else {
					searchResultNumberSpan = $document.getElementById('brandHeaderSearchResultSpan');
				}
				if (typeof searchResultNumberSpan !== 'undefined' && searchResultNumberSpan !== null) {
				    searchResultNumberSpan.innerHTML = 'collapsed';
				}
			}
		};
		
		AutoSuggest.prototype.maxNumResults = function(){
			var max =  Math.min(this.resultsData.length, this.data.maximumSearchResults);
			return max;
		};
		
		AutoSuggest.prototype.clearResults = function(){
			var result;
			while (this.results.length > 0) {
			    result = this.results.shift();
			    result.destroy();
			}
		};
		
		AutoSuggest.prototype.resetDivHeight = function() {
		    	this.div.style.height = "auto";
		};
		
		AutoSuggest.prototype.clearResultsData = function(){
			while(this.resultsData.length > 0){
				this.resultsData.shift();
			}
		};
		
		AutoSuggest.prototype.replaceUrlKeys = function(resultData, url){
			var	str = url.match(/\$\{(.*?)\}/)[0],
				key =  str.replace(/[\$\{\}']+/g,'');
				resultData.url = url.replace(/\$\{.*?\}/g, resultData[key]);
			return resultData;
		};
		
		AutoSuggest.prototype.addSearchAllLink = function(){
			var data, result;
			if(this.data.searchAll){
				data = this.replaceUrlKeys({'term':this.data.searchAll.text, url:this.data.searchAll.href, query:this.input.value}, this.data.searchAll.href); 
				result = this.renderResult(data);
				$class.add(result.getAnchor(), 'vgc-searchAll');
			}
			return result;
		};
		
		AutoSuggest.prototype.renderResult = function(data){
			var result = new AutoSuggestResult();
			result.populate(data);
			result.render();
			this.div.appendChild( result.getAnchor() );
			this.results.push(result);
			return result;
		};
		
		AutoSuggest.prototype.showTopResults = function(){
			var i = 0,
				resultData,
				result,
				url,
				t = this.maxNumResults(),
				enhancedData,
				resultAnchors = [this.input];
			
			this.clearResults();
			this.resetDivHeight();
			for(i; i<t; i++){
				resultData = this.resultsData[i];
				url = resultData.type === 'fund' ? this.data.fundLandingPage.href : this.data.termLandingPage.href;
				enhancedData = this.replaceUrlKeys(this.resultsData[i], url);				
				result = this.renderResult(enhancedData);
				EventManager.addEvent(result.getAnchor(), 'keydown', $bind(this.onSearchResultKeyDown, this));
				resultAnchors.push( result.getAnchor() );
			}
			if(this.data.searchAll){
				result = this.addSearchAllLink();
				resultAnchors.push(result.getAnchor());
			}
			
			this.keystrokeManager.clearItems();
			this.keystrokeManager.registerItems(resultAnchors, true);
		};
		
		AutoSuggest.prototype.onSearchResultKeyDown = function(evt){
			var isMobile = $window.innerWidth < 1002 ?true:false,
					closeButton,
					searchInput; 
				if(isMobile){
					closeButton = $document.getElementById("horizontalNavCloseBtn"),
					searchInput = $document.getElementById("horizontalNavSearchInput");
				}else{
					closeButton = $document.getElementById("brandHeaderCloseBtn"),
					searchInput = $document.getElementById("brandHeaderSearchInput");
				}
				
			if(evt.keyCode === $keyCodes.TAB && typeof closeButton !== 'undefined'){
				EventManager.preventDefault(evt);
				closeButton.focus();
			}else if(evt.keyCode === $keyCodes.ESC && typeof searchInput !== 'undefined'){
				EventManager.preventDefault(evt);
				this.hide();
				$window.setTimeout(function(){
					searchInput.focus();
				},400);
			}
		};
		
		return AutoSuggest;
	}]);

}(VGC));
/*globals VGC:true */
(function (VGC) {
	'use strict';
	var app = VGC.app('globalHeaderFooter');
	
	app.module('Search', ['$select','$bind', '$class', '$contains', '$createElement', '$document', 'EventManager', '$keyCodes', '$measurements', '$window', 'AutoSuggest', function ($select,$bind, $class, $contains, $createElement, $document, EventManager, $keyCodes, $measurements, $window, AutoSuggest) {
		
		function Search() {
			this.bar = undefined;
			this.offscreenLabel = undefined;
			this.searchInputLabel = undefined;
			this.input = undefined;
			this.clearBtn = undefined;
			this.autoSuggest = undefined;
			this.inputContainer= undefined;
			this.placeholderStr = '';
			this.parentElement = '';
			this.expanded = false;
			this.rendered = false;
			this.nativePlaceholderText = false;
			this.emulatedPlaceholderTextEventsAttached = false;
			this.deactivateEventTypes = 'mousedown touchend';
			this.boundDocumentClick = undefined;
			this.boundDocumentTouch = undefined;
			this.boundWindowResize = undefined;
			this.optimizedResizeID = undefined;
			this.data = undefined; 
			this.desktopWidth= 999;
			this.searchActivated = "SearchActivated";
			this.searchDeactivated = "SearchDeactivated";
		}
		Search.prototype.updateInputState  = function(expand){
			if(expand){
				$class.remove(this.input,"vgc-searchCollapsed");
				$class.add(this.input,"vgc-searchExpanded");
			}else{
				$class.add(this.input,"vgc-searchCollapsed");
		    	$class.remove(this.input,"vgc-searchExpanded");
			}
		}; 
		Search.prototype.getSubmitButton = function () { 
			return this.submitButton; 
		};
		Search.prototype.populate = function (searchData) { 
			this.data = searchData;
		};
		Search.prototype.render = function () {
			if (this.data && this.rendered === false) {
				this.bar = $createElement('div', {'class': 'vgc-searchBar vgc-hasLeftPipe'});
				this.form = $createElement('form', {action: this.data.submit.href, method: 'GET', name: 'siteSearch', autocomplete: 'off'});
				this.offscreenLabel =  $createElement('label', {'class': 'vgc-accessibleOffscreenText', 'for': 'vgc-navBarSearchInput'});
				if(typeof this.data.placeholderText !== 'undefined' && this.data.placeholderText !== null ){					
						this.offscreenLabel.innerHTML = this.data.placeholderText.longText;	
						this.searchInputLabel = this.data.placeholderText.longText;
				}else{
					this.offscreenLabel.innerHTML = 'Search';
				}
				this.inputContainer=$createElement('div', {'class': 'vgc-searchInputContainer'});
				this.input = $createElement('input', {'class': 'vgc-searchInput', id: 'vgc-navBarSearchInput', 'type': 'text', 'aria-label':this.searchInputLabel, name: this.data.queryTerm, value:'', autocomplete: 'off', role: 'search'});
                this.submitWrapper = $createElement('span', {'class': 'vgc-submitWrapper'});               
                this.submitButton = $createElement('input', {id: this.parentElement+'SearchInput', 'class': 'vgc-searchSubmit', type: 'submit', 'aria-label':'Submit search', role: 'button', value: ''});
			    this.clearBtn = $createElement('div', {id:this.parentElement+'CloseBtn','class': 'vgc-closeBtn vgc-small vgc-hidden', type: 'reset', role: 'button', 'tabindex':'0', 'aria-label':'clear'});
			    this.SearchResultSpan = $createElement('span', {id: this.parentElement +'SearchResultSpan','class': 'vgc-accessibleOffscreenText SearchResultSpan', 'aria-live': 'polite'});
				
				EventManager.addEvent(this.clearBtn, 'mousedown', $bind(this.onClearInput, this));
				EventManager.addEvent(this.clearBtn, 'keydown', $bind(this.onClearInput, this));
				EventManager.addEvent(this.clearBtn, 'keypress', $bind(this.onClearInput, this));
				EventManager.addEvent(this.input, 'keyup', $bind(this.evaluateClearBtn, this));
	            EventManager.addEvent(this.submitButton, 'keydown', $bind(this.activateSearch, this));
				EventManager.addEvent(this.input, 'focus', $bind(this.evaluateExpandedOnInput, this));
	            EventManager.addEvent(this.submitButton, 'click', $bind(this.activateSearch, this));
	              
				$window.setTimeout($bind(this.selectPlaceholderText, this), 333);
				this.inputContainer.appendChild(this.input);
				this.form.appendChild(this.offscreenLabel);
				this.form.appendChild(this.inputContainer);
				this.form.appendChild(this.clearBtn);
				this.form.appendChild(this.SearchResultSpan);
				this.form.appendChild(this.submitWrapper);
				this.submitWrapper.appendChild(this.submitButton);
				this.bar.appendChild(this.form);
				if (this.data.autoSuggest) {
					this.autoSuggest = new AutoSuggest();
					this.autoSuggest.populate(this.data.autoSuggest);
					this.autoSuggest.render();
					this.autoSuggest.setInputField(this.input,this.bar);
					this.bar.appendChild(this.autoSuggest.getDiv());
				}
				this.boundDocumentClick = $bind(this.evaluateDocumentClick, this);
				this.boundDocumentTouch = $bind(this.evaluateDocumentTouch, this);
				this.boundWindowResize  = $bind(this.monitorSearchState, this);
				EventManager.subscribe(null, this.searchDeactivated, $bind(this.handleSearchWhenVerticalNavOpen, this));
				EventManager.addEvent($window, 'resize', $bind(this.onOptimizedResize, this));
				this.rendered = true;
			}
			return this.bar;
		},
		Search.prototype.activate = function(event, expand, me){
			event.preventDefault();
		    this.offscreenLabel.innerHTML = this.input.getAttribute('placeholder'); 
			this.updateInputState(expand);
			this.onSearchSubmitEvaluation();
			$window.setTimeout(function(){
				EventManager.addEvent($window, 'resize', me.boundWindowResize);
			}, 800);
			me.expanded = true;
			EventManager.addEvent($document, this.deactivateEventTypes, this.boundDocumentClick);
		},
		Search.prototype.activateSearch = function (event) {
			var me = this,
				expand = true,
				searchTerm = this.getTrimmedInput(),
				headerElement = $select('#vgc-globalHeader')[0],
				activateSearch = false;
			if(searchTerm === '' || searchTerm === this.placeholderStr){
				activateSearch = true;
			}
			if(typeof headerElement !== 'undefined'){
    			$class.add(headerElement, 'vgc-searchBarOpen');
    		}
			if (event.keyCode === $keyCodes.TAB) {
				this.deactivate(true); 
			}else{
				if(activateSearch){
					this.activate(event, expand, me);
				}
			}
		};	
		Search.prototype.selectPlaceholderText = function(){
			var widthToTriggerShortPlaceholderText = 221,
				str, 
				bounds;
			if(this.data && this.data.placeholderText){
				str = this.data.placeholderText.longText;
				bounds = $measurements.getElementBounds(this.input);
				if(bounds.width <= widthToTriggerShortPlaceholderText){
					str = this.data.placeholderText.shortText;
				}
				this.placeholderStr = str;
				if (this.nativePlaceholderText === true || typeof this.input.placeholder !== 'undefined') {
					this.input.setAttribute('placeholder', this.placeholderStr);
					this.nativePlaceholderText = true;
				}else if (this.emulatedPlaceholderTextEventsAttached !== true){
					EventManager.addEvent(this.input, 'keypress', $bind(this.clearPlaceholderText, this, str));
					EventManager.addEvent(this.input, 'blur', $bind(this.restorePlaceholderText, this, str));
					EventManager.addEvent(this.input, 'click', $bind(this.setCaretIndex, this, 0, str));
					this.restorePlaceholderText(str);
					this.emulatedPlaceholderTextEventsAttached = true;
				}
			}			
			return this.placeholderStr;
		};	
		Search.prototype.onOptimizedResize = function(){
			if(typeof this.optimizedResizeID !== 'undefined'){
				clearTimeout(this.optimizedResizeID);				
			}
			this.optimizedResizeID = $window.setTimeout($bind(this.selectPlaceholderText, this), 100);
		};
		Search.prototype.monitorSearchState = function(){
			var windowWidth = $window.innerWidth;
			if(windowWidth > this.desktopWidth){
				this.deactivate(true);
			}
		};
		Search.prototype.evaluateDocumentClick = function (event) {
			var isWithinSearchArea = $contains(this.bar.parentElement, EventManager.getTarget(event));
			if (!isWithinSearchArea) {
				this.deactivate(true);
			}else{
				return true;
			}
		};
		Search.prototype.evaluateExpandedOnInput = function (event) {
			if (!this.expanded) {
				EventManager.addEvent($document, this.deactivateEventTypes, this.boundDocumentClick);
			}
		};
		Search.prototype.setCaretIndex = function(index, placeholderText) {
			var range;			
			if(this.input.value === placeholderText){
		        if(this.input.createTextRange) {		        	
		            range = this.input.createTextRange();
		            range.move('character', index);
		            range.select();
		            
		        }else if(this.input.selectionStart) {
	            	this.input.focus();
	            	this.input.setSelectionRange(index, index);
	            }		        
			}
		};
		Search.prototype.evaluateDocumentTouch = function (event) {
			var isWithinSearchArea = $contains(this.bar, event.touches[0].target);
			if (!isWithinSearchArea && this.expanded === true) {
				this.deactivate();
			}
		};
		Search.prototype.handleSearchWhenVerticalNavOpen = function () {
			this.deactivate(false);
		}
		Search.prototype.deactivate = function (showHeader) {
			if(this.expanded){
				var headerElement = $select('#vgc-globalHeader')[0],
					expandInputContainer = false;
	    		if(typeof headerElement !== 'undefined'){
	    			$class.remove(headerElement, 'vgc-searchBarOpen');
	    		}
				if (this.autoSuggest) {
					this.autoSuggest.hide(); 
				}  
				this.updateInputState(expandInputContainer);
				this.selectPlaceholderText();
				this.input.value = ''; 
				this.input.blur();
				this.expanded = false;
				$class.add(this.clearBtn, 'vgc-hidden');
				EventManager.removeEvent($window, 'resize', this.boundWindowResize);		
    			EventManager.removeEvent($document, this.deactivateEventTypes, this.boundDocumentClick);
    			if(showHeader){
    				var customEvent = EventManager.createEvent(this.searchDeactivated);
    				customEvent.data.source = 'search';
        			EventManager.dispatch(customEvent);
    			}
    			
			} 
		};
		Search.prototype.getBar = function (parentElement) {
			this.parentElement = parentElement;
			this.render();
			return this.bar;
		};
		Search.prototype.onClearInput = function (evt) {
			if(evt.type === 'mousedown' || evt.keyCode === $keyCodes.ENTER || evt.keyCode === $keyCodes.SPACE){
				this.restorePlaceholderText(this.placeholderStr, true);
				if (this.autoSuggest) {
					this.autoSuggest.hide();
				}
				this.input.blur();
				this.input.focus();
				if(evt && evt.preventDefault){
					evt.preventDefault();
				}
			}
		};
		Search.prototype.evaluateClearBtn = function (evt) {
			var placeholderText = '',
				event = evt || $window.event;
			if (this.data.placeholderText) {
				placeholderText = this.data.placeholderText.longText;
			}
			if (event.keyCode === $keyCodes.ESC) {
				this.input.value = '';
			}
			if (this.input.value !== '' && this.input.value !== placeholderText) {
				$class.remove(this.clearBtn, 'vgc-hidden');
			} else {
				$class.add(this.clearBtn, 'vgc-hidden');
			}
		};

		Search.prototype.getTrimmedInput = function(){
			if(this.input.value!== undefined && typeof this.input.value === "string"){
				return this.input.value.replace(/^\s+|\s+$/g, '');
			}else{
				return this.input;
			}
		};
		Search.prototype.onSearchSubmitEvaluation = function(){
			var searchTerm = this.getTrimmedInput();
			if(searchTerm === '' || searchTerm === this.placeholderStr){
				this.input.focus();
				this.SearchResultSpan.innerHTML = this.offscreenLabel.innerHTML +' edit blank';
			}else{
				$class.add(this.clearBtn, 'vgc-hidden');
			}	 
		};
		Search.prototype.destroy = function () {
			EventManager.removeEvent($document, this.deactivateEventTypes, this.boundDocumentClick);
			this.data = undefined;
			this.bar = this.input = this.expandBtn = this.autoSuggest = undefined;
		};
		Search.prototype.clearPlaceholderText = function (placeholderText) {
			if (placeholderText === this.input.value) {
				this.input.value = '';
			}
		};
		Search.prototype.restorePlaceholderText = function (placeholderText, override) {
			if (this.input && (this.input.value === '' || override === true)) {
				if (!this.nativePlaceholderText) {
					this.input.value = placeholderText;
				} else {
					this.input.value = '';
				}
		 	}
			$class.add(this.clearBtn, 'vgc-hidden');
		};
		return Search;
	}]);

}(VGC));
/*globals VGC:true, setTimeout, clearTimeout*/
(function (VGC, setTimeout, clearTimeout) {
	'use strict';
	var app = VGC.app('globalHeaderFooter');

	app.module('verticalNav', ['$measurements','$window', '$document', 'EventManager', '$createElement', '$class', '$keyCodes', '$contains', '$select', 'linkTracking', 'webUsageProxy','horizontalNav', function ($measurements,$window, $document, EventManager, $createElement, $class, $keyCodes, $contains, $select, linkTracking, webUsageProxy,horizontalNav) {
		var docFrag = {},
			navData,
			utilData = {},
			verticalNavContainer = {},
			verticalNavMenus = {},
			scrim = {},
			subMenuList = {},
			mainMenu = {}, 
			desktopWidth = 999,
			mainMenuLinks = [],
			mainMenuNav,
			mainMenuList = $createElement('ul'),
			activeMenuLinkIndex = -1,
			transitionSpeed = 500,
			delay = 400,
			headerElement = $select('#vgc-globalHeader')[0],
			transformativeMenuBar1,
			transformativeMenuBar2,
			transformativeMenuBar3,
			horizontalNavMenuButton,
			selectSitePreference,
			positiveAckMsg,
			negativeAckMsg,
			utilityBar,
			currentOpenMenu = {},
			currentOpenMenuLink = {},
			closeMainMenuTimeout,
			closeSubMenuTimeout,
			webUsageNamespace = 'verticalNav',
			getSubMenuId = function (element) {
				if (element.getAttribute('data-subMenuId')) {
					currentOpenMenuLink = element;
					return element.getAttribute('data-subMenuId');
				} else {
					return getSubMenuId(element.parentElement);
				}
			},
			resetTabIndices = function () {
				var menuElements = verticalNavContainer.getElementsByTagName('li'),
					i,
					menuLength = menuElements.length;
				for (i = 1; i < menuLength; i = i + 1) {
					menuElements[i].setAttribute('tabindex', -1);
				}
			},
			setListFocus = function (element) {
				element.setAttribute('tabindex', 0);
				element.focus();
			},
			monitorVerticalNavState = function(){
				var windowWidth = $window.innerWidth;
				if(windowWidth>desktopWidth){
					handleCloseMenu();
				}
			},
			addNoDisplayDelayed = function () {
				$class.add(currentOpenMenu, 'vgc-noDisplay');
			},
			closeSubMenu = function () {
				$class.add(currentOpenMenu, 'vgc-offScreen');
				closeSubMenuTimeout = setTimeout(addNoDisplayDelayed, transitionSpeed + delay);
			},
			closeSubMenuAndOpenMain = function (event,index) {
				if (event.keyCode === $keyCodes.ENTER || event.keyCode === $keyCodes.ESC || event.keyCode === $keyCodes.LEFT_ARROW || (event.keyCode === $keyCodes.DOWN_ARROW && index > 0) || (event.keyCode === $keyCodes.TAB && event.shiftKey ===  true && index <= 0) || (event.keyCode === $keyCodes.TAB && index > 0) || event.type === 'click') {					
					EventManager.preventDefault(event);
					$class.remove(mainMenu, 'vgc-noDisplay');
					clearTimeout(closeMainMenuTimeout);
					$window.setTimeout(function () {
						$class.add(currentOpenMenu, 'vgc-offScreen');
						$class.remove(mainMenu, 'vgc-offScreen');
					}, delay / 2);
					closeSubMenuTimeout = setTimeout(addNoDisplayDelayed, transitionSpeed + delay);
					webUsageProxy.trackAction(webUsageNamespace + '.' + currentOpenMenu.getAttribute('id').replace(/[ &]/g, '') + '.closeSubMenu');
					mainMenu.focus();					
					activeMenuLinkIndex = mainMenuLinks.indexOf(currentOpenMenuLink);					
					currentOpenMenuLink.setAttribute('aria-expanded','false');
					currentOpenMenuLink.firstChild.focus();
				}
			},
			getOutsideElements = function () {
				transformativeMenuBar1 = $document.getElementById('transformativeMenuBar1');
				transformativeMenuBar2 = $document.getElementById('transformativeMenuBar2');
				transformativeMenuBar3 = $document.getElementById('transformativeMenuBar3');
				horizontalNavMenuButton = $document.getElementById('horizontalNavMenuButton');
				selectSitePreference = $document.getElementById('selectPreference');
				positiveAckMsg = $document.getElementById('positiveAck');
				negativeAckMsg = $document.getElementById('negativeAck');
				utilityBar = $document.getElementById('globalNavUtilityBar');
			},
			handleOutsideElementsOnOpen = function () {
				if(typeof transformativeMenuBar1 !== 'undefined' && typeof transformativeMenuBar2 !== 'undefined' && typeof transformativeMenuBar3 !== 'undefined' && typeof horizontalNavMenuButton !== 'undefined') {
		    		$class.add(transformativeMenuBar1, 'vgc-verticalNavOpen');
				    $class.add(transformativeMenuBar2, 'vgc-verticalNavOpen');
					$class.add(transformativeMenuBar3, 'vgc-verticalNavOpen');
					$class.add(horizontalNavMenuButton, 'vgc-verticalNavOpen');
					$class.add(utilityBar, 'vgc-verticalNavOpen');
		    	}
		    	if(typeof selectSitePreference !== 'undefined' && $class.has(selectSitePreference, 'vgc-sitePreferencesOpen')) {
		    		$class.add(selectSitePreference, 'vgc-verticalNavOpen');
		    	} else if(typeof positiveAckMsg !== 'undefined' && $class.has(positiveAckMsg, 'vgc-sitePreferencesOpen')) {
		    		$class.add(positiveAckMsg, 'vgc-verticalNavOpen');
		    	} else if(typeof negativeAckMsg !== 'undefined' && $class.has(negativeAckMsg, 'vgc-sitePreferencesOpen')) {
		    		$class.add(negativeAckMsg, 'vgc-verticalNavOpen');
		    	}
			},	
			handleVerticalNavClassesOnOpen = function () {	
				$class.add(verticalNavContainer, 'vgc-verticalNavOpen');
				$class.remove(mainMenu, 'vgc-offScreen');
		    	$class.remove(mainMenu, 'vgc-noDisplay');
		    	$window.setTimeout(function () { 
					$class.add(scrim, 'vgc-openScrim'); 
		    	}, delay);
			},
			openMenu = function (event) {
				if(typeof headerElement !== 'undefined' && !$class.has(headerElement,'vgc-verticalNavOpen')){
		    		$class.add(headerElement, 'vgc-verticalNavOpen');
		    		getOutsideElements();
					handleOutsideElementsOnOpen();
				    handleVerticalNavClassesOnOpen();
				    $window.setTimeout(function () { 
				    	mainMenu.focus();
			    	}, 200);			   
					setAriaAttributes(true);
					EventManager.addEvent($window, 'resize', monitorVerticalNavState);
				}
				EventManager.dispatch('onVerticalNavOpen'); 
			},
			handleOutsideElementsOnClose = function () {
				if(typeof transformativeMenuBar1 !== 'undefined' && typeof transformativeMenuBar2 !== 'undefined' && typeof transformativeMenuBar3 !== 'undefined' && typeof horizontalNavMenuButton !== 'undefined') {
		    		$class.remove(transformativeMenuBar1, 'vgc-verticalNavOpen');
				    $class.remove(transformativeMenuBar2, 'vgc-verticalNavOpen');
					$class.remove(transformativeMenuBar3, 'vgc-verticalNavOpen');
					$class.remove(horizontalNavMenuButton, 'vgc-verticalNavOpen');
					$class.remove(utilityBar, 'vgc-verticalNavOpen');
		    	}	
		    	if(typeof selectSitePreference !== 'undefined' && $class.has(selectSitePreference, 'vgc-sitePreferencesOpen')) {
		    		$class.remove(selectSitePreference, 'vgc-verticalNavOpen');
		    	} else if(typeof positiveAckMsg !== 'undefined' && $class.has(positiveAckMsg, 'vgc-sitePreferencesOpen')) {
		    		$class.remove(positiveAckMsg, 'vgc-verticalNavOpen');
		    	} else if(typeof negativeAckMsg !== 'undefined' && $class.has(negativeAckMsg, 'vgc-sitePreferencesOpen')) {
		    		$class.remove(negativeAckMsg, 'vgc-verticalNavOpen');
		    	}  
			},
			disableMenu = function(){
				$class.remove(headerElement, 'vgc-verticalNavOpen');
				$class.remove(verticalNavContainer, 'vgc-verticalNavOpen');
				$class.remove(scrim, 'vgc-openScrim');
				getOutsideElements();
				handleOutsideElementsOnClose();
			}, 
			closeMenu = function (event,index) {
			
				EventManager.removeEvent($window, 'resize', monitorVerticalNavState);
				if (event.keyCode === $keyCodes.ESC && typeof currentOpenMenu.className !== 'undefined' && !$class.has(currentOpenMenu, 'vgc-offScreen')) {
					closeSubMenuAndOpenMain(event); 
				} else if (event.type === 'closeVerticalNav' || event.type === 'click' || event.keyCode === $keyCodes.ESC || (event.keyCode === $keyCodes.TAB && event.shiftKey === true && index <= 1) || (event.keyCode === $keyCodes.TAB && index > 1) || (event.keyCode === $keyCodes.DOWN_ARROW && index > 1)) {
					EventManager.preventDefault(event);
					disableMenu();
					$window.setTimeout(function () {
						if ($class.has(mainMenu, 'vgc-offScreen') && $class.has(mainMenu, 'vgc-noDisplay')) {
							$class.add(mainMenu, 'vgc-offScreen');
							$class.add(mainMenu, 'vgc-noDisplay');
						}
						closeSubMenu();
						if(typeof headerElement !== 'undefined'){
							var customEvent = EventManager.createEvent('onVerticalNavClose');
							customEvent.data.source = 'verticalNav';
							EventManager.dispatch(customEvent);
							$window.setTimeout(function () { $class.remove(headerElement, 'vgc-verticalNavOpen'); }, delay);
						}
						else{
							horizontalNavMenuButton.focus();
						}
					}, delay);
					activeMenuLinkIndex = -1;
					resetTabIndices();	
					setAriaAttributes(false);
				}	
			}, 
			setAriaAttributes = function(open) {
				var title = "Close menu",
					label = "Close menu";				
					
				if(open === false){
					label = "Menu";
					title = "Open menu";
				}
				horizontalNavMenuButton.setAttribute('title',title);
				horizontalNavMenuButton.setAttribute('aria-label',label);
				horizontalNavMenuButton.setAttribute('aria-expanded',open);	
				horizontalNavMenuButton.focus();				
			},
			closeMainMenu = function () {
				if (!$class.has(mainMenu, 'vgc-offScreen')) {
					$class.add(mainMenu, 'vgc-offScreen');
					closeMainMenuTimeout = setTimeout(function () {
						$class.add(mainMenu, 'vgc-noDisplay');
					}, transitionSpeed + delay);
				}
			},
			stopPropagation = function (event) {
				EventManager.stopPropagation(event);
			},
			hideMenu = function(){
				disableMenu();
				closeSubMenu();
			},
			openSubMenu = function (event) {
				var targetEle = EventManager.getTarget(event),
					subMenuId = getSubMenuId(targetEle),
					subMenuToOpen;
				if (event.keyCode === $keyCodes.SPACE || event.keyCode === $keyCodes.RIGHT_ARROW || event.keyCode === $keyCodes.ENTER || event.type === 'click') {
					stopPropagation(event);
					subMenuToOpen = subMenuList[subMenuId].menu;
					if (subMenuToOpen === currentOpenMenu) {
						clearTimeout(closeSubMenuTimeout);
					}
					currentOpenMenu = subMenuToOpen;
					subMenuList[subMenuId].currentActiveIndex = -1;					
					
					if(typeof targetEle !== 'undefined'){
						targetEle.parentNode.parentNode.setAttribute('aria-expanded','true');
						targetEle.parentNode.parentNode.focus();
					}
					$class.remove(currentOpenMenu, 'vgc-noDisplay');
					$window.setTimeout(function () {						
						$class.remove(currentOpenMenu, 'vgc-offScreen');	
						closeMainMenu();
						$window.setTimeout(function () {	
							currentOpenMenu.focus();
							subMenuToOpen.firstChild.firstChild.focus();
						}, delay);
					}, delay / 2);
					webUsageProxy.trackAction(webUsageNamespace + '.' + currentOpenMenu.getAttribute('id').replace(/[ &]/g, '') + '.openSubMenu');
				}
			},
			nextIndex = function (index, max, direction) {				
				if (direction === $keyCodes.DOWN_ARROW) {
					if (index === max - 1) {
						index = 0;
					} else {
						index = index + 1;
					}
				} else if (direction === $keyCodes.UP_ARROW) {
					if (index > 0) {
						index = index - 1;
					} else {
						index = max - 1;
					}
				}
				return index;
			},
			keyboardNavigation = function (event) {
				if (event.keyCode === $keyCodes.DOWN_ARROW) {
					var element;
					EventManager.preventDefault(event);
					if(activeMenuLinkIndex === (mainMenuLinks.length-1)){
						closeMenu(event,activeMenuLinkIndex);
					}else{
						activeMenuLinkIndex = nextIndex(activeMenuLinkIndex, mainMenuLinks.length, $keyCodes.DOWN_ARROW);
						if(activeMenuLinkIndex === 0){
							activeMenuLinkIndex = 1;
						}
						if(typeof mainMenuLinks[activeMenuLinkIndex] !== 'undefined'){
							if(typeof mainMenuLinks[activeMenuLinkIndex].children[0] !== 'undefined'){
								element = mainMenuLinks[activeMenuLinkIndex].children[0];
							}else{
								element = mainMenuLinks[activeMenuLinkIndex];
							}						
							setListFocus(element);
						}
					}
				}
				if (event.keyCode === $keyCodes.UP_ARROW) {
					EventManager.preventDefault(event);
					activeMenuLinkIndex = nextIndex(activeMenuLinkIndex, mainMenuLinks.length, $keyCodes.UP_ARROW);
					if(typeof mainMenuLinks[activeMenuLinkIndex] !== 'undefined'){
						if(typeof mainMenuLinks[activeMenuLinkIndex].children[0] !== 'undefined'){
							element = mainMenuLinks[activeMenuLinkIndex].children[0];
						}else{
							element = mainMenuLinks[activeMenuLinkIndex];
						}						
						setListFocus(element);
					}
				}
				if (event.keyCode === $keyCodes.TAB && event.shiftKey === false) {
					var element;
					EventManager.preventDefault(event);
					if(activeMenuLinkIndex === mainMenuLinks.length-1){
						closeMenu(event, activeMenuLinkIndex);
					}else {
						activeMenuLinkIndex = nextIndex(activeMenuLinkIndex, mainMenuLinks.length, $keyCodes.DOWN_ARROW);
						
						if(activeMenuLinkIndex === 0){
							activeMenuLinkIndex = 1;
						}
						if(typeof mainMenuLinks[activeMenuLinkIndex] !== 'undefined'){
							if(typeof mainMenuLinks[activeMenuLinkIndex].children[0] !== 'undefined'){
								element = mainMenuLinks[activeMenuLinkIndex].children[0];
							}else{
								element = mainMenuLinks[activeMenuLinkIndex];
							}						
							setListFocus(element);
						}
					}
				}	
				
				if (event.keyCode === $keyCodes.TAB && event.shiftKey === true) {
					if(activeMenuLinkIndex <= 1){
						closeMenu(event, activeMenuLinkIndex);
					}else{
						activeMenuLinkIndex = nextIndex(activeMenuLinkIndex, mainMenuLinks.length, $keyCodes.UP_ARROW);
					}
				}
				
			},
			siloKeyboardNavigation = function (event) {
				var index = subMenuList[currentOpenMenu.getAttribute('id')].currentActiveIndex,				
				element,
					linkList = subMenuList[currentOpenMenu.getAttribute('id')].links;				
				
				if (event.keyCode === $keyCodes.TAB && event.shiftKey === false) {
					EventManager.preventDefault(event);
					if(index === (linkList.length-1)){
						closeSubMenuAndOpenMain(event,index);
					}else{
						if(index === -1){
							index = 0;
						}
						index = nextIndex(index, linkList.length, $keyCodes.DOWN_ARROW);
							if(typeof linkList[index] !== 'undefined'){
								element = linkList[index];								
								if(typeof linkList[index].children[0] !== 'undefined'){
									element = linkList[index].children[0];
								}
							}
							setListFocus(element);
						}
					subMenuList[currentOpenMenu.getAttribute('id')].currentActiveIndex = index;
				}
				
				if (event.keyCode === $keyCodes.TAB && event.shiftKey === true ) {
					EventManager.preventDefault(event);					
					if(index <= 0){
						closeSubMenuAndOpenMain(event,index);
					}else{
					index = nextIndex(index, linkList.length, $keyCodes.UP_ARROW);
						if(typeof linkList[index] !== 'undefined'){
							element = linkList[index];	
							if(typeof linkList[index].children[0] !== 'undefined'){
								element = linkList[index].children[0];
							}
							setListFocus(element);
						}
					}
					subMenuList[currentOpenMenu.getAttribute('id')].currentActiveIndex = index;
				}
				
				if (event.keyCode === $keyCodes.DOWN_ARROW) {
					EventManager.preventDefault(event);
					if(index === (linkList.length-1)){
						closeSubMenuAndOpenMain(event,index);
					}else{
					if(index === -1){
						index = 0;
					}
					index = nextIndex(index, linkList.length, $keyCodes.DOWN_ARROW);
					if(typeof linkList[index] !== 'undefined'){
						if(typeof linkList[index].children[0] !== 'undefined'){
							element = linkList[index].children[0];
						}else{
							element = linkList[index];							
						}
						setListFocus(element);
					}
					}
					subMenuList[currentOpenMenu.getAttribute('id')].currentActiveIndex = index;
				}
				if (event.keyCode === $keyCodes.UP_ARROW) {
					EventManager.preventDefault(event);
					index = nextIndex(index, linkList.length, $keyCodes.UP_ARROW);
					if(typeof linkList[index] !== 'undefined'){
						if(typeof linkList[index].children[0] !== 'undefined'){
							element = linkList[index].children[0];
						}else{
							element = linkList[index];							
						}
						setListFocus(element);
					}
					subMenuList[currentOpenMenu.getAttribute('id')].currentActiveIndex = index;
				}
				if (event.keyCode === $keyCodes.LEFT_ARROW) {
					closeSubMenuAndOpenMain(event);
				}	
			},
			attachKeyboardNavigation = function () {
				EventManager.addEvent(mainMenu, 'keydown', keyboardNavigation);
			},
			attachSiloKeyboardNavigation = function (siloName) {
				subMenuList[siloName].currentActiveIndex = -1;
				EventManager.addEvent(subMenuList[siloName].menu, 'keydown', siloKeyboardNavigation);
			},
			attachCloseMenu = function () {
				EventManager.addEvent(verticalNavContainer, 'click', stopPropagation);
				EventManager.addEvent($document, 'keydown', closeMenu);
				EventManager.addEvent(scrim, 'click', closeMenu);
				EventManager.subscribe(null, 'closeVerticalNav', closeMenu);
			},
			attachOpenMenu = function () {
				EventManager.subscribe(null, 'openVerticalNav', openMenu);
			},
			attachOpenSubMenu = function (el) { 
				EventManager.addEvent(el, 'click', openSubMenu);
				EventManager.addEvent(el, 'keydown', openSubMenu);
			},
			attachCloseSubMenu = function (el) {
				EventManager.addEvent(el, 'click', closeSubMenuAndOpenMain);
				EventManager.addEvent(el, 'keydown', closeSubMenuAndOpenMain);
			},
			openSetSitePref = function (event) {
				if (event.keyCode === $keyCodes.ENTER || event.type === 'click') {
					closeMenu(event);
					$window.setTimeout(function () {
						EventManager.dispatch('openSetSitePreference');
					}, delay);	
				}
			},
			attachOpenSetSitePref = function (element) {
				EventManager.addEvent(element, 'click', openSetSitePref);
				EventManager.addEvent(element, 'keydown', openSetSitePref);
			},
			buildHighLevelNav = function (navData) {
				var i = 0,
					li = $createElement('li', {'role': 'menuitem'}),
					a,
					span = $createElement('span'),
					highLevelNav = $createElement('div', {'class': 'vgc-mainMenuNav'});
				if(typeof navData.icon !== 'undefined'){
					a = $createElement('a', {'href': navData.icon.href}),
					span.innerHTML = navData.icon.label;
					a.appendChild(span);
					li.appendChild(a);
					mainMenuLinks[0] = li;
					mainMenuList.appendChild(li);
				}
				for (i = 0; i < navData.silos.length; i = i + 1) {
					li = $createElement('li', {'role': 'menuitem'});
					a = $createElement('a', {'tabindex': 0});
					span = $createElement('span');
					if (!navData.silos[i].suppressLinkList && typeof navData.silos[i].linkLists !== 'undefined' && navData.silos[i].linkLists.length > 0) {
						$class.add(li, 'vgc-expandable');
						li.setAttribute('data-subMenuId', navData.silos[i].name);
						li.setAttribute('aria-haspopup', 'true');
						li.setAttribute('aria-expanded','false');
						li.setAttribute('role','button');
						attachOpenSubMenu(li);
					} else if (typeof navData.silos[i].href !== 'undefined') {
						a.setAttribute('href', navData.silos[i].href);
					}
					span.innerHTML = navData.silos[i].name;
					a.appendChild(span);
					li.appendChild(a);
					mainMenuLinks[i + 1] = li;
					mainMenuList.appendChild(li);
				}
				highLevelNav.appendChild(mainMenuList);
				return highLevelNav;
			},
			buildMainMenuNav = function (utilData) {
				mainMenuNav = $createElement('div', {'class': 'vgc-mainMenuNav','tabindex':0});
				var i = 0,
					j = 0,
					li = {},
					a = {},
					span = {},
					linkIndex = mainMenuLinks.length;
				for (i = 0; i < utilData.groups[1].groups.length; i = i + 1) {
					for (j = 0; j < utilData.groups[1].groups[i].links.length; j = j + 1) {
						li = $createElement('li', {'role': 'menuitem', 'tabindex': -1});
						a = $createElement('a', {'href': utilData.groups[1].groups[i].links[j].href, 'tabindex': 0});
						span = $createElement('span');
						span.innerHTML = utilData.groups[1].groups[i].links[j].label;
						a.appendChild(span);
						li.appendChild(a);
						mainMenuLinks[linkIndex] = li;
						linkIndex = linkIndex + 1;
						mainMenuList.appendChild(li);
					}
				}
				li = $createElement('li', {'class': 'vgc-expandable', 'data-subMenuId': utilData.groups[0].mobileLabel, 'tabindex': -1, 'role': 'button','aria-expanded':'false', 'aria-haspopup': true});
				a = $createElement('a', {'tabindex': 0});
				span = $createElement('span');
				span.innerHTML = utilData.groups[0].mobileLabel;
				attachOpenSubMenu(li);
				a.appendChild(span);
				li.appendChild(a);
				mainMenuList.appendChild(li);
				mainMenuLinks[linkIndex] = li;
				mainMenuNav.appendChild(mainMenuList);
				return mainMenuNav;
			},
			buildMainMenu = function (navData, utilData) {
				mainMenu = $createElement('div', {'class': 'vgc-mainMenu vgc-offScreen vgc-noDisplay', 'tabindex': 0});
				mainMenu.appendChild(buildHighLevelNav(navData));
				mainMenu.appendChild(buildMainMenuNav(utilData));
				attachKeyboardNavigation();
				return mainMenu;
			},
			generateBackButton = function (name, altText) {
				var div = $createElement('div', {'class': 'vgc-back','tabindex':0}),
				label = name.split(' ').join('_'),
				mainSpanLabel = label+'_label',
				hiddenSpanLabel = label+'_back',
					a = $createElement('a', {'tabindex': 0, 'alt': altText,'aria-labelledby':hiddenSpanLabel+' '+mainSpanLabel}),
					span = $createElement('span',{'id':mainSpanLabel});
				span.innerHTML = name;
				a.appendChild(span);
				
				span = $createElement('span',{'id':hiddenSpanLabel,'class':'vgc-hide'});
				span.innerHTML = altText + " menu expanded ";
				a.appendChild(span);
				
				div.appendChild(a);
				attachCloseSubMenu(div);
				subMenuList[name].links = [div];
				return div;
			},
			generateSubSilo = function (siloName, data) {
				var ul = $createElement('ul', {'class': 'vgc-subSilo'}),
					li = {},
					span = {},
					a = {},
					i = 0,
					hasContentPages = false,
					hasSubOverviewPage = false,
					siloLinks = [],
					linkIndex = 0;
				if (typeof subMenuList[siloName].links !== 'undefined') {
					siloLinks = subMenuList[siloName].links;
					linkIndex = subMenuList[siloName].links.length;
				}
				if (typeof data.subOverview !== 'undefined') {
					hasSubOverviewPage = true;
					li = $createElement('li', {'class': 'vgc-heading', 'role': 'menuitem', 'tabindex': -1});
					span = $createElement('span');
					span.innerHTML = data.subOverview.label;
					if (data.subOverview.disabled) {
						$class.add(li, 'vgc-disabled');
						li.appendChild(span);
						li.setAttribute('aria-disabled', 'true');
					} else if (typeof data.subOverview.href !== 'undefined') {
						a = $createElement('a', {'href': data.subOverview.href, 'tabindex': 0});
						a.appendChild(span);
						li.appendChild(a);
					} else {
						li.appendChild(span);
					}

					if (typeof data.subOverview.type !== 'undefined' && data.subOverview.type === 'primary') {
						$class.add(ul, 'vgc-primary');
					} else if (typeof data.subOverview.type !== 'undefined' && data.subOverview.type === 'internal') {
						$class.add(li, 'vgc-internalOnly');
					}
					ul.appendChild(li);
					siloLinks[linkIndex] = li;
					linkIndex = linkIndex + 1;
				} else {
					hasSubOverviewPage = false;
				}
				if (typeof data.contentPages !== 'undefined') {
					hasContentPages = true;
					for (i = 0; i < data.contentPages.length; i = i + 1) {
						li = $createElement('li', {'role': 'menuitem', 'tabindex': -1});
						if (!hasSubOverviewPage) {
							$class.add(li, 'vgc-heading');
						}
						span = $createElement('span');
						span.innerHTML = data.contentPages[i].label;
						if (data.contentPages[i].disabled) {
							$class.add(li, 'vgc-disabled');
							li.setAttribute('aria-disabled', 'true');
							li.appendChild(span);
						} else {
							a = $createElement('a', {'href': data.contentPages[i].href, 'tabindex': 0});
							a.appendChild(span);
							li.appendChild(a);
						}
						ul.appendChild(li);
						siloLinks[linkIndex] = li;
						linkIndex = linkIndex + 1;
					}
				}
				if (!hasContentPages) {
					$class.add(ul, 'vgc-subOverviewOnly');
				}
				subMenuList[siloName].links = siloLinks;
				return ul;
			},
			generateSiloLinks = function (data) {
				var div = $createElement('div', {'class': 'vgc-siloLinks'}),
					ul = $createElement('ul'),
					li = {},
					i = 0,
					j = 0;
				for (i = 0; i < data.linkLists.length; i = i + 1) {
					for (j = 0; j < data.linkLists[i].length; j = j + 1) {
						li = $createElement('li');
						li.appendChild(generateSubSilo(data.name, data.linkLists[i][j]));
						ul.appendChild(li);
					}
				}
				div.appendChild(ul);
				return div;
			},
			generateActionBar = function (actionBarData, siloName) {
				var div = $createElement('div', {'class': 'vgc-actionBar'}),
					ul = $createElement('ul'),
					li = {},
					span = {},
					a = {},
					i = 0,
					linksIndex = subMenuList[siloName].links.length;
				if (typeof actionBarData.links !== 'undefined') {
					for (i = 0; i < actionBarData.links.length; i = i + 1) {
						li = $createElement('li', {'role': 'menuitem', 'tabindex': -1});
						a = $createElement('a', {'href': actionBarData.links[i].href, 'tabindex': 0});
						span = $createElement('span');
						span.innerHTML = actionBarData.links[i].label;
						a.appendChild(span);
						li.appendChild(a);
						ul.appendChild(li);
						subMenuList[siloName].links[linksIndex] = li;
						linksIndex = linksIndex + 1;
					}
					div.appendChild(ul);
				}
				if (typeof actionBarData.buttons !== 'undefined') {
					for (i = 0; i < actionBarData.buttons.length; i = i + 1) {
						a = $createElement('a', {'href': actionBarData.buttons[i].href, 'class': 'vgc-' + actionBarData.buttons[i].type + ' vgc-actionButton', 'tabindex': 0});
						a.innerHTML = actionBarData.buttons[i].label;
						div.appendChild(a);
						subMenuList[siloName].links[linksIndex] = a;
						linksIndex = linksIndex + 1;
					}
				}
				return div;
			},
			buildSubMenus = function (nav) {
				var subMenuDocFrag = $document.createDocumentFragment(),
					i = 0,
					subMenu = {},
					silos = nav.silos;
				for (i = 0; i < silos.length; i = i + 1) {
					if (typeof silos[i].linkLists !== 'undefined' && !navData.silos[i].suppressLinkList) {
						subMenuList[silos[i].name] = {};
						subMenu = $createElement('div', {'class': 'vgc-subMenu vgc-offScreen vgc-noDisplay', 'id': silos[i].name, 'tabindex': -1});
						subMenu.appendChild(generateBackButton(silos[i].name, nav.back.altText));
						subMenu.appendChild(generateSiloLinks(silos[i]));
						if (typeof silos[i].actionBar !== 'undefined') {
							$class.add(subMenu, 'vgc-containsActionBar');
							subMenu.appendChild(generateActionBar(silos[i].actionBar, silos[i].name));
						}
						subMenuDocFrag.appendChild(subMenu);
						subMenuList[silos[i].name].menu = subMenu;
						attachSiloKeyboardNavigation(silos[i].name);
						linkTracking(subMenu, silos[i].name.replace(/[ &]/g, ''));
					}
				}
				return subMenuDocFrag;
			},
			buildVanguardSiteSubMenu = function (utilData) {
				var subMenu = $createElement('div', {'class': 'vgc-subMenu vgc-offScreen vgc-noDisplay', 'id': utilData.mobileLabel, 'tabindex': -1}),
					ul = {},
					siloLinks = $createElement('ul', {'class': 'vgc-siloLinks'}),
					siloLinksLi = {},
					li = {},
					span = {},
					a = {},
					i = 0,
					j = 0,
					siloLinksList = [],
					linkIndex = 0;
				subMenuList[utilData.mobileLabel] = {};
				subMenu.appendChild(generateBackButton(utilData.mobileLabel));
				if (typeof subMenuList[utilData.mobileLabel].links !== 'undefined') {
					siloLinksList = subMenuList[utilData.mobileLabel].links;
					linkIndex = subMenuList[utilData.mobileLabel].links.length;
				}
				for (i = 0; i < utilData.groups.length; i = i + 1) {
					siloLinksLi = $createElement('li');
					ul = $createElement('ul', {'class': 'vgc-subSilo vgc-subOverviewOnly'});
					for (j = 0; j < utilData.groups[i].links.length; j = j + 1) {
						li = $createElement('li', {'tabindex': -1});
						a = $createElement('a', {'tabindex': 0});
						if (utilData.groups[i].links[j].type === 'setSitePreference') {
							attachOpenSetSitePref(a);
							a.setAttribute('href', 'javascript:void(0);');
						} else {
							a.setAttribute('href', utilData.groups[i].links[j].href);
						}
						span = $createElement('span');
						span.innerHTML = utilData.groups[i].links[j].label;
						a.appendChild(span);
						li.appendChild(a);
						ul.appendChild(li);
						siloLinksList[linkIndex] = li;
						linkIndex = linkIndex + 1;
					}
					siloLinksLi.appendChild(ul);
					siloLinks.appendChild(siloLinksLi);
				}
				subMenuList[utilData.mobileLabel].menu = subMenu;
				subMenuList[utilData.mobileLabel].links = siloLinksList;
				attachSiloKeyboardNavigation(utilData.mobileLabel);
				subMenu.appendChild(siloLinks);
				linkTracking(subMenu, utilData.mobileLabel.replace(/[ &]/g, ''));
				return subMenu;
			},
			setHeightToDoc = function (div) {
				if ($document.compatMode === 'BackCompat' && typeof $window.screen !== 'undefined') {
					div.style.height = $window.screen.availHeight + 'px';
				}
			},
			render = function (docFragment) {
				docFrag = docFragment;
				if(typeof navData !== 'undefined'){
					scrim = $createElement('div', {'class': 'vgc-verticalNavScrim'});
					setHeightToDoc(scrim);
					docFrag.appendChild(scrim);
					verticalNavContainer = $createElement('div', {'class': 'vgc-verticalNav', 'role': 'menu'});
					verticalNavMenus = $createElement('div', {'class': 'vgc-verticalNavMenus'});
					if (typeof navData.silos !== 'undefined' && typeof utilData.groups !== 'undefined') {
						verticalNavMenus.appendChild(buildMainMenu(navData, utilData));
						verticalNavMenus.appendChild(buildSubMenus(navData));
						verticalNavMenus.appendChild(buildVanguardSiteSubMenu(utilData.groups[0]));
						attachCloseMenu();
					}
					EventManager.subscribe(null, 'verticalNavDisableMenu', hideMenu);
					EventManager.subscribe(null, 'verticalNavClose', handleCloseMenu);
					verticalNavContainer.appendChild(verticalNavMenus);
					docFrag.appendChild(verticalNavContainer);
					attachOpenMenu();
					linkTracking(verticalNavContainer, 'vgc-verticalNav');
				}
				return docFrag;
			},
			handleCloseMenu = function(){
				var event = EventManager.createEvent('closeVerticalNav');
				closeMenu(event);
			},
			populate = function (navigationData, utilityBarData) {
				navData = navigationData;
				utilData = utilityBarData;
			};
		return {
			render: render,
			populate: populate
		};
	}]);
}(VGC, setTimeout, clearTimeout));
/*jslint browser:true*/
/*globals VGC:true*/
(function (VGC) {
	'use strict';
	var app = VGC.app('globalHeaderFooter');

	app.module('utilityBar', ['$document', '$bind', '$arrayIndexOf', 'EventManager', '$keyCodes', '$measurements', '$createElement', '$class', '$contains', '$select', '$window', 'KeystrokeManager', 'linkTracking', function ($document, $bind, $arrayIndexOf, EventManager, $keyCodes, $measurements, $createElement, $class, $contains, $select, $window, KeystrokeManager, linkTracking) {
		var utilityBarData,
			dropdownMenu,			
			listItems = [],
			linkItems = [],
			linksOnTwoLines = false,
			dropdownContainer,
			dropdownUpArrow,
			utilityBarDiv,
			DROPDOWN_DELAY = 0,
			dropdownTimeoutID,
			siteIndicatorMenu,
			siteIndicatorMenuDiv,
			isDropdownOpen = false,
			transitionSpeed = 100,
			webUsageNamespace = 'utilityBar',
			closeDropdown = function (event) {
				if (event === true || event.keyCode === $keyCodes.TAB || event.keyCode === $keyCodes.ESC || ('mouseover'.indexOf(event.type) > -1) && !$contains(utilityBarDiv, EventManager.getTarget(event))) {					
					dropdownMenu.style.display = 'none';					
					EventManager.removeEvent($document, 'mouseover click touchstart', closeDropdown);
					$class.remove(siteIndicatorMenuDiv, 'open');
					var element = $select('#vgc-siteIndicatorLink')[0];
					if(typeof element !=='undefined'){	
						if(typeof event.keyCode !== 'undefined') {
							element.focus();
						}
						$window.setTimeout(function () {
							element.setAttribute('aria-expanded','false');							
						},transitionSpeed);						
					}
					isDropdownOpen = false;
					$class.remove(siteIndicatorMenuDiv, 'open');
					EventManager.removeEvent(siteIndicatorMenu, 'keydown', closeDropdown);
				}
			},
			onDropdownMouseOut = function(){
				if(dropdownTimeoutID){
					clearTimeout(dropdownTimeoutID);
				}else{
					closeDropdown();
				}
				EventManager.removeEvent(dropdownContainer, 'mouseout', onDropdownMouseOut);
			},
			alignDropdownUpArrow = function(){
				var element = $select('#vgc-siteIndicatorLink')[0],
					halfElementWidth, halfDropdownWidth, xLocation = 0;
				if(element && dropdownMenu){
					halfElementWidth = $measurements.getElementBounds(element).width / 2;
					halfDropdownWidth = $measurements.getElementBounds(dropdownMenu).width / 2;
					xLocation = (halfElementWidth > halfDropdownWidth) ? halfDropdownWidth : halfElementWidth;
					xLocation -= 28;
				}
				dropdownUpArrow.style.marginLeft = (xLocation) + 'px';
			},
			showDropdown = function(){
				dropdownMenu.style.display = 'block';
				isDropdownOpen = true;
				$class.add(siteIndicatorMenuDiv, 'open');
				alignDropdownUpArrow();
				EventManager.addEvent($document, 'mouseover', closeDropdown);
				clearTimeout(dropdownTimeoutID);
			},
			openDropdown = function (event) {					
				if (((event.keyCode === $keyCodes.ENTER || event.keyCode === $keyCodes.SPACE || 'mouseover'.indexOf(event.type) > -1 )) && !isDropdownOpen) {
					var element;
					EventManager.preventDefault(event);
					EventManager.addEvent(dropdownContainer, 'mouseout', onDropdownMouseOut);
					dropdownTimeoutID = setTimeout(showDropdown, DROPDOWN_DELAY);						
					element = $select('#vgc-siteIndicatorLink')[0];
					if(typeof element !=='undefined'){												
						element.setAttribute('aria-expanded','true');
						if(typeof event.keyCode !== 'undefined'){
							element.focus();	
						}
					}
					EventManager.addEvent(siteIndicatorMenu, 'keydown', closeDropdown);		
					EventManager.addEvent(siteIndicatorMenu, 'click', closeDropdown);	
					EventManager.addEvent($document, 'click', closeDropdown);
				}else if(event.keyCode === $keyCodes.ENTER || 'click'.indexOf(event.type)> -1 && isDropdownOpen){	
					EventManager.preventDefault(event);
					closeDropdown(true);
				}
			},			
			addDropdownEventBinding = function (mainElement) {
				EventManager.addEvent(mainElement, 'keydown', openDropdown);				
				EventManager.addEvent(mainElement, 'mouseover', openDropdown);
			},
			openSetSitePref = function (event) {
				if (event.keyCode === $keyCodes.ENTER || event.type === 'click') {
					EventManager.dispatch('openSetSitePreference');
					closeDropdown(true);
				}
			},
			attachOpenSetSitePref = function (element) {
				EventManager.addEvent(element, 'click', openSetSitePref);
				EventManager.addEvent(element, 'keydown', openSetSitePref);
			},
			createDropdownMenu = function (data) {
				var li = null,
					a = null,
					preferredSiteSpan,
					menuItemSpan,
					ul = $document.createElement('ul'),
					i = 0,
					j = 0,
					index = 0,
					link = {},
					upArrow;
				if(typeof data !== 'undefined'){
					dropdownMenu = $document.createElement('div');					
					dropdownMenu.className = 'vgc-dropDownMenu';
					dropdownMenu.setAttribute('role', 'menu');					
					upArrow = $createElement('div', {'class':'upArrow'}, dropdownMenu);
					ul = $document.createElement('ul');
					for (i = 0; i < data.length; i = i + 1)
					{
						if(i > 0)
							{
								li = $createElement('li', {'role':'presentation','class':'separator'});
								ul.appendChild(li);
							}
						for (j = 0; j < data[i].links.length; j++) {
							link = data[i].links[j];
							li = $createElement('li', {role:'menuitem'});
							a = $createElement('a', {'class':'vgc-siteListDropdownMenuItem'});
							preferredSiteSpan = $createElement('span', {}, a);
							menuItemSpan = $createElement('span', {'class':'vgc-menuItemLabel'}, a);
							if (link.type === 'setSitePreference') {
								attachOpenSetSitePref(a); 
								a.setAttribute('href', 'javascript:void(0);');
								$class.add(a, 'vgc-setSitePreference');
							} else {
								a.setAttribute('href', link.href);
							}
							index = index + 1;
							if (utilityBarData.preferredSite === link.sitePreferenceID) {
								$class.add(preferredSiteSpan, 'vgc-preferredSite');
								preferredSiteSpan.setAttribute('title', utilityBarData.preferredSiteAltText);							
								preferredSiteSpan.setAttribute('alt', utilityBarData.preferredSiteAltText);
								menuItemSpan.innerHTML = link.label;
							} else {
								menuItemSpan.innerHTML = link.label;
							}
							listItems.push(a);
							li.appendChild(a);
							ul.appendChild(li);
						}
						dropdownMenu.appendChild(ul);
					}
				}
				dropdownUpArrow = upArrow;
				return dropdownMenu;
			},
			createSiteListDropdown = function (data) {
				var siteListDocFrag = $document.createDocumentFragment(),
					siteListDiv = $createElement('div', {'aria-haspopup':'true','class':'vgc-siteList vgc-dropdownContainer', id:'siteListDropdownContainer'}),
					siteIndicator = $createElement('p', {'class':'vgc-siteIndicator'}),
					_siteIndicatorMenu =  $createElement('a', {'class':'vgc-siteIndicatorMenu','id':'vgc-siteIndicatorLink','aria-haspopup':'true','role':'button','aria-expanded':'false', 'tabindex':'0'}),
					siteIndicatorContentSpan = $createElement('span', {}, _siteIndicatorMenu),
					siteLabel = '',
					keystrokeManager,
					dropdownDiv;
				siteIndicatorMenu = _siteIndicatorMenu;
				if (typeof data.label !== 'undefined') {
					siteLabel = data.label.toUpperCase();
				}
				siteIndicator.innerHTML = siteLabel;				
				siteListDiv.appendChild(siteIndicator);
				siteIndicatorContentSpan.innerHTML =  siteLabel;

				siteListDiv.appendChild(siteIndicatorMenu);
				dropdownDiv = createDropdownMenu(data.groups);
				if(typeof dropdownDiv !== 'undefined'){
					siteListDiv.appendChild(dropdownDiv);
					addDropdownEventBinding(siteIndicatorMenu);
					dropdownContainer = siteListDiv;
					keystrokeManager = new KeystrokeManager(listItems, true);
					keystrokeManager.setListeningElement(siteListDiv);					
					EventManager.addEvent(siteListDiv, 'keydown', closeDropdown);
				}else{
					$class.add(utilityBarDiv, 'vgc-noNavEnabled');
				}
				$createElement('span', {'class':'downArrow'}, _siteIndicatorMenu);
				siteListDocFrag.appendChild(siteListDiv);
				siteIndicatorMenuDiv = siteIndicatorMenu;
				return siteListDocFrag;
			},
			createUtilityLinks = function (data) {
				var utilLinksDocFrag = $document.createDocumentFragment(),
					ul = $createElement('ul', {'class':'vgc-utilityLinks'}),
					li = null,
					a = null,
					link = {},
					i = 0,
					j = 0,
					className = '',
					t = data.groups[i].links.length;

					for (j = 0; j < t; j++) {
						link = data.groups[i].links[j];						
						className = link.logOnOff ? 'vgc-logOnOff vgc-utilityLink' : 'vgc-utilityLink';
						li = $createElement('li', {'class': className});
						
						a = $createElement('a', {href:link.href});
						if(link.newWindow === true){
							a.setAttribute('target', '_blank');
						}
						a.innerHTML = '<span>' + link.label + '</span>';
						li.appendChild(a);
						ul.appendChild(li);
						
						linkItems.push(a);
					}
					
					linksOnTwoLines = j > 4;
										
					utilLinksDocFrag.appendChild(ul);
					
				return utilLinksDocFrag;
			},
			render = function (docFrag) {
			    docFrag = docFrag || $document.createDocumentFragment();
			    if(typeof utilityBarData !== 'undefined'){
					var mainDiv = $createElement('div', {id:'globalNavUtilityBar','class':'vgc-utilityBar'}),
						containerDiv = $createElement('div', {'class':'vgc-utilityBarContainer vgc-constrainedCentered'}),
						regionDiv = $createElement('div', {'class':'vgc-utilityBarRegion'}, containerDiv),
						i = 0,
						hasManyLinks;
					
					utilityBarDiv = mainDiv;
					
					if (typeof utilityBarData.groups !== 'undefined') {
						for (i = 0; i < utilityBarData.groups.length; i = i + 1) {
							if (utilityBarData.groups[i].type === 'sitesList') {
								regionDiv.appendChild(createSiteListDropdown(utilityBarData.groups[i]));
							} else if (utilityBarData.groups[i].type === 'utilityLinks') {
								regionDiv.appendChild(createUtilityLinks(utilityBarData.groups[i]));
							}
						}
						mainDiv.appendChild(containerDiv);
					}
					
					hasManyLinks = linksOnTwoLines ? 'vgc-hasManyLinks' : '';
					$class.add(mainDiv, hasManyLinks);
					
					docFrag.appendChild(mainDiv);
					linkTracking(mainDiv, webUsageNamespace);
			    }
				return docFrag;
			},
			populate = function (utilBarData) {
				utilityBarData = utilBarData;
			};
		return {
			render: render,
			populate: populate
		};
	}]);

}(VGC));
/*jslint browser:true*/
/*globals VGC:true, unescape:true*/
(function(VGC){ 
	'use strict';
	var app = VGC.app('globalHeaderFooter');
	
	app.module('social', ['$document','$createElement','$class','linkTracking', function($document, $createElement, $class, linkTracking){
		var socialData,
		
			buildLi = function(linkData){
				var span,
					a,
					li;
				if(typeof linkData !== 'undefined' && linkData.type && linkData.label && linkData.href){
					span = $createElement('span');
					span.innerHTML = linkData.label;
					li = $createElement('li');
					a = $createElement('a',{'href':linkData.href,'class':('vgc-socialIcon vgc-'+ linkData.type)});
					if (linkData.newWindow) {
						a.setAttribute('target', '_blank');
					}
					a.appendChild(span);
					li.appendChild(a);
				}
				return li;
			},
			
			buildUl = function(startPoint, endPoint){
				var i = 0,
					ul = $createElement('ul',{'role':'navigation','aria-labelledby':'connectWithUs'}),
					element;
				for (i = startPoint; i <= endPoint; i++){
					if(socialData.links && socialData.links[i]){
						element = buildLi(socialData.links[i]);
						if(element){
							ul.appendChild(element);
						}
					}
				}
				return ul;
			},
			
			buildSocialLinks = function(){
				var socialLinks = $createElement('div',{'class':'vgc-socialLinks'}),
					socialLinksContainer = $createElement('div',{'class':'vgc-socialLinksContainer vgc-constrainedCentered'}, socialLinks),
					socialLinksRegion = $createElement('div',{'class':'vgc-socialLinksRegion'}, socialLinksContainer),
					p,
					sup,
					nLinks = socialData.links.length,
					nHalfLinks = Math.ceil(nLinks / 2) - 1,					
					ulLeft,
					ulRight;
				
				if(nLinks > 0){
					ulLeft = buildUl(0, nHalfLinks);
				}
				if(nHalfLinks + 1 <= nLinks - 1){
					ulRight = buildUl(nHalfLinks+1, nLinks - 1);
					$class.add(ulRight, 'vgc-last');
				}
				if(socialData.registeredSymbol && socialData.intro){
					p = $createElement('p',{'id':'connectWithUs'});
					sup = $createElement('sup');
					sup.innerHTML = socialData.registeredSymbol;
					p.innerHTML = socialData.intro;
					p.appendChild(sup);
					socialLinksRegion.appendChild(p);
				}
				if(ulLeft){					
					socialLinksRegion.appendChild(ulLeft);
				}
				if(ulRight){					
					socialLinksRegion.appendChild(ulRight);
					
				}
				return socialLinks;
			};
			
			
			return {
				populate:function(_socialData){
					socialData = _socialData;
				},
				render:function(docFragment){ 
					var element,
						docFrag = docFragment || $document.createDocumentFragment();
					if (typeof socialData !== 'undefined' && socialData !== null && socialData.links) {
						element = buildSocialLinks();						
						if(element){
							docFrag.appendChild(element);
						}
					}
					return docFrag;
				}
		    };
		}]);
}(VGC));
/*jslint browser:true*/
/*globals VGC:true, unescape:true*/
(function(VGC){
	'use strict';
	var app = VGC.app('globalHeaderFooter');
	
	app.module('vanguardPromises', ['$document','$createElement', 'linkTracking', function($document, $createElement, linkTracking){
		var promisesData,
			socialData,
			promisesContainer,
			promisesFooter,
		
			buildLi = function(linkData){
				var span,
					a,
					li;
				if(typeof linkData !== 'undefined' && linkData.type && linkData.label && linkData.href){
					span = $createElement('span');
					span.innerHTML = linkData.label;
					li = $createElement('li');
					a = $createElement('a',{'href':linkData.href,'class':('vgc-socialIcon vgc-'+ linkData.type)});
					if (linkData.newWindow) {
						a.setAttribute('target', '_blank');
					}
					a.appendChild(span);
					li.appendChild(a);
				}
				return li;
			},
			
			buildUl = function(startPoint, endPoint){
				var i = 0,
					ul = $createElement('ul'),
					element;
				for (i = startPoint; i <= endPoint; i++){
					if(socialData.links && socialData.links[i]){
						element = buildLi(socialData.links[i]);
						if(element){
							ul.appendChild(element);
						}
					}
				}
				return ul;
			},
			
			buildSocialMedia = function(){
				var socialMedia = $createElement('div',{'class':'vgc-socialMedia'}),
					p,
					sup,
					nLinks = socialData.links.length,
					nHalfLinks = Math.ceil(nLinks / 2) - 1,
					ulLeft,
					ulRight;
				
				if(nLinks > 0){
					ulLeft = buildUl(0, nHalfLinks);
				}
				if(nHalfLinks + 1 <= nLinks - 1){
					ulRight = buildUl(nHalfLinks+1, nLinks - 1);
				}
				if(socialData.registeredSymbol && socialData.intro){
					p = $createElement('p');
					sup = $createElement('sup');
					sup.innerHTML = socialData.registeredSymbol;
					p.innerHTML = socialData.intro;
					p.appendChild(sup);
					socialMedia.appendChild(p);
				}
				if(ulLeft){
					socialMedia.appendChild(ulLeft);
				}
				if(ulRight){
					socialMedia.appendChild(ulRight);
				}
				return socialMedia;
			},
			buildVanguardPromises = function(){
				var vanguardPromises,
					promise,
					p,
					promises,
					span;
				p = $createElement('p');
				p.innerHTML = promisesData.intro;
				promise = $createElement('p',{'class':'vgc-promise'});
				promise.innerHTML = promisesData.promise;
				promises = $createElement('a',{'class':'vgc-promises', 'href':promisesData.link.href, 'target':'_blank'});
				span = $createElement('span');
				span.innerHTML = promisesData.link.label;
				promises.appendChild(span);
				span = $createElement('span', {'class':'vgc-linkIcon'});
				promises.appendChild(span);
				vanguardPromises = $createElement('div',{'class':'vgc-vanguardPromises'});
				vanguardPromises.appendChild(p);
				vanguardPromises.appendChild(promise);
				vanguardPromises.appendChild(promises);
				return vanguardPromises;
			},
			buildPromisesRegion = function(){
				var promisesRegion,
					element;
				
				promisesRegion = $createElement('div',{'class':'vgc-promisesRegion'});
				if(promisesData.promise) {
					element = buildVanguardPromises();
					if(element){
						promisesRegion.appendChild(element);
					}
				}
				if(socialData.links) {
					element = buildSocialMedia();
					if(element){
						promisesRegion.appendChild(element);
					}
				}
				return promisesRegion;
			},
			
			buildPromisesContainer = function(){
				var element;
				promisesContainer = $createElement('div',{'class':'vgc-promisesContainer vgc-isCenterAligned'});
				element = buildPromisesRegion();
				if(element){
					promisesContainer.appendChild(element);
				}
				return promisesContainer;
			},
			
			buildPromisesFooter = function(){
				var element;
				promisesFooter = $createElement('div', {'class':'vgc-promisesFooter'});
				element = buildPromisesContainer();
				if(element){
					promisesFooter.appendChild(element);
				}
				linkTracking(promisesFooter, 'promises');
				return promisesFooter;
			};
			
			return {
				populate:function(promises,social){
					promisesData = promises;
					socialData = social;
				},
				render:function(docFragment){ 
					var element,
						docFrag = docFragment || $document.createDocumentFragment();
					
					if (typeof promisesData !== 'undefined' && promisesData !== null && typeof socialData !== 'undefined' && socialData !== null) {
						element = buildPromisesFooter();						
						if(element){
							docFrag.appendChild(element);
						}
					}
					return docFrag;
				}
		    };
		}]);
}(VGC));
/*jslint browser:true*/
/*globals VGC:true, unescape:true*/ 
(function(VGC){
    'use strict';
    var app = VGC.app('globalHeaderFooter');       
        
        app.module('superFooter', ['$document', '$createElement', 'KeystrokeManager', 'linkTracking', function($document, $createElement, KeystrokeManager, linkTracking){
			var superFooterData,
				superFooter,
				linkItems = [],
				superFooterContainer;
			
			function buildLi(linkData){
				var a = {},
					li = {};
				if(typeof linkData !== 'undefined'){
					li = $createElement('li');
					a = $createElement('a',{'href':linkData.href});
					a.innerHTML = linkData.label;
					li.appendChild(a);
					linkItems.push(a);
					return li;
				}
			}
			function buildUl(linkListsData){
				var linkLists = linkListsData,
					i = 0,
					j = 0,
					k = 0,
					li = {},
					ul = {};
				ul = $createElement('ul');
				if(linkLists !== 'undefined' && linkLists){
					for (i = 0; i < linkLists.length;i++){
						for(j = 0; j < linkLists[i].length; j++ ){
							if(typeof linkLists[i][j].subOverview !== 'undefined'&& !linkLists[i][j].subOverview.overview && !linkLists[i][j].subOverview.demote){
								li = buildLi(linkLists[i][j].subOverview);
								if(li){
									ul.appendChild(li);
								}
							}
							if(linkLists[i][j].contentPages){
								for(k = 0; k < linkLists[i][j].contentPages.length ; k++){
									if(linkLists[i][j].contentPages[k].promote){
										li = buildLi(linkLists[i][j].contentPages[k]);
									}
									if (typeof li !=='undefined' && li !== null){
										ul.appendChild(li);
									}
								}
							}
						}
					}
				}
				return ul;
			}
			function buildColumn(siloData){
				var linkLists = siloData.linkLists,
					column,
					ul = buildUl(linkLists);
				column = $createElement('div',{'class':'vgc-column'});
				if(ul){
					column.appendChild(ul);
				}
				return column;
			}
			function buildHeading(silo){
				var headingName = silo.name,
					headingHref = silo.href,
					span = {},
					a = {};
				a = $createElement('a',{'href':headingHref,'id':silo.id});
				span = $createElement('span',{'class':'vgc-heading'});
				a.innerHTML = headingName;
				span.appendChild(a);
				linkItems.push(a);
				return span;
			}
			function breakLongColumn(longColumn){
				var shortColumns,
					ul = [],
					i = 0,
					j = 0,
					breakIndex = 8,
					element;
				if(longColumn){
					shortColumns = [];
					for(i = 0; i < 2 ; i++){
						ul[i] = $createElement('ul');
						shortColumns[i] = $createElement('div',{'class':'vgc-column'});
						for(j = 0; j < breakIndex ; j++){
							if (longColumn.firstChild && longColumn.firstChild.children[0]){
								element = longColumn.firstChild.children[0];
								ul[i].appendChild(element);
							}
						}
						element = ul[i];
						if(element){
							shortColumns[i].appendChild(element);
						}
					}
				}
				return shortColumns;
			}
			function buildNavigation(siloData, isLastNavigationGroup){
				var silo = siloData,
					navigation,
					heading,
					column,
					columns = [];
				heading = buildHeading(silo);
				column = buildColumn(silo);
				navigation = $createElement('div',{'class':'vgc-navigation' + (isLastNavigationGroup ? ' last' : ''),'role':'navigation','aria-labelledby':silo.id});
				if(heading){
					navigation.appendChild(heading);
				}
				if(column && column.firstChild && column.firstChild.children.length > 8 ){
					columns = breakLongColumn(column);
					navigation = $createElement('div',{'class':'vgc-navigation vgc-two-column-navigation','role':'navigation','aria-labelledby':silo.id});
					if(heading){
						navigation.appendChild(heading);
					}
					if(columns){
						if(columns[0]){
							navigation.appendChild(columns[0]);
						}
						if(columns[1]){
							navigation.appendChild(columns[1]);
						}
					}
				}else{
					if(column){
						navigation.appendChild(column);
					}
				}
				return navigation;
			}
			function buildColumnGroup(startPoint,endPoint,silosData){
				var silos = silosData,
					columnGroup,
					navigation,
					i = 0;
				if (startPoint === 0 && endPoint === 0){
					columnGroup = $createElement('div',{'class':'vgc-column-group-2'});
				}else{
					columnGroup = $createElement('div',{'class':'vgc-column-group-'+(endPoint - startPoint + 1)});
				}
				for (i = startPoint; i <= endPoint; i ++){
					navigation = buildNavigation(silos[i], i === endPoint);
					if(navigation){
						columnGroup.appendChild(navigation);
					}
				}
				return columnGroup;
			}
			function buildColumns(silos){
				var columns,
					columnGroup,
					breakPoint = 0;
				
				if(silos && silos.length > 0){
					if (silos[0] && silos[0].linkLists && silos[0].linkLists.length > 1){
						columns = $createElement('div',{'class':'vgc-columns-'+(silos.length +1 )});
						breakPoint = 0;
					}else{
						columns = $createElement('div',{'class':'vgc-columns-'+(silos.length)});
						breakPoint = 2;
					}
					
					columnGroup = buildColumnGroup(0,breakPoint,silos);
					if(columnGroup){
						columns.appendChild(columnGroup);
					}
					columnGroup = buildColumnGroup(breakPoint + 1,(silos.length-1),silos);
					if(columnGroup){
						columns.appendChild(columnGroup);
					}
				}
				return columns;
			}
			function buildSuperFooterRegion(silos){
				var superFooterRegion,
					columns;
				if(silos){
					columns = buildColumns(silos);
					superFooterRegion = $createElement('div',{'class':'vgc-superFooterRegion'});
					if(columns){
						superFooterRegion.appendChild(columns);
					}
				}
				return superFooterRegion;
			}
			function buildSuperFooterContainer(silos){
				var superFooterRegion;
				superFooterContainer = $createElement('div',{'class':'vgc-superFooterContainer vgc-constrainedCentered'});

				superFooterRegion = buildSuperFooterRegion(silos);
				if(superFooterRegion){
					superFooterContainer.appendChild(superFooterRegion);					
				}
				
				return superFooterContainer;
			}
			function demoteSilos(silos){
				var filteredSilos=[],
					i=0,
					demotePropertyExists=false;
				for(i;i<silos.length;i++){
					demotePropertyExists = typeof silos[i].demote !== undefined;
					if(!demotePropertyExists || (demotePropertyExists && silos[i].demote !==true)){
						filteredSilos.push(silos[i]);  
					} 
				} 
				return filteredSilos;
			}
			function buildSuperFooter(){
				if(superFooterData){
					superFooter = $createElement('div',{'class':'vgc-superFooter','role':'navigation','aria-label':'sitemap'});
				}
				return superFooter;
			}
            return {
				populate:function(data){
					superFooterData = data;				
				},
				render:function(docFrag){
					var element,
						filteredSilos;
					
					if(superFooterData){
						element = buildSuperFooter();						
						docFrag = docFrag || $document.createDocumentFragment();
						if(element){
							docFrag.appendChild(element);
							linkTracking(element, 'superfooter');
						}
						
						if (typeof superFooterData.silos !== 'undefined') {
							filteredSilos=demoteSilos(superFooterData.silos);
							superFooterContainer = buildSuperFooterContainer(filteredSilos);
							if(superFooter && superFooterContainer){
								superFooter.appendChild(superFooterContainer);								
							}						
						}
					}
					return docFrag;
				}
		    };
		}]);
}(VGC));
/*globals VGC:true */
(function (VGC) {
    'use strict';
    var app = VGC.app('globalHeaderFooter');

    app.module('legalFooter', ['$document', '$arrayIndexOf', '$createElement', 'KeystrokeManager', 'feedbackLink', 'linkTracking', '$class', 'EventManager','$keyCodes', function ($document, $arrayIndexOf, $createElement, KeystrokeManager, feedbackLink, linkTracking, $class, EventManager,$keyCodes) {

        var legalFooterData,
        	buildData,
        	type,
        	hasType,
        	customText,
        	buildVersionElement,
        	buildVersionVisibleClass = 'vgc-buildVersionVisible',
    		setAlternativeText = function (data, node) {
	        	var i;	        		
        		if(hasType && typeof data !== 'undefined' && data.length > 0) {
					for(i = 0; i < data.length; i++) {
						if(data[i].type === type) {
							node =  data[i].content;
						}
					}
				} 
	        	return node;
        	},
        	toggleBuildVersion = function (event) {        		
        		if (event === true || event.type ==="click" || (event.type==="keydown" && event.keyCode===$keyCodes.ENTER ))
        			{
	        		EventManager.stopPropagation(event);
	        		if ($class.has(buildVersionElement, buildVersionVisibleClass)) {
	        			$class.remove(buildVersionElement, buildVersionVisibleClass);
	        			
	        		} else {
	        			$class.add(buildVersionElement, buildVersionVisibleClass);
	        		
	        			}
        		}else if ($class.has(buildVersionElement, buildVersionVisibleClass)) {
        			$class.remove(buildVersionElement, buildVersionVisibleClass);
        			
        		}
        	},
        	getDisclosureElement = function(){
        		var disclosureElement;
        		if(legalFooterData && legalFooterData.disclosure){
        			disclosureElement = $createElement('p', {'class':'vgc-legalFooterDisclosure'});
        			disclosureElement.innerHTML = legalFooterData.disclosure;
        		}
        		return disclosureElement;
        	},
    		getBoilerPlateElement = function() {
    			var boilerplateElement, termsAndConditionsElement, copyrightSpan, copyrightString, boilerplateString, boilerplateSpan,spanWebInfo,
    				date = new Date();
    			if (legalFooterData && legalFooterData.copyright){
    				boilerplateElement = $createElement('p', {'class': 'vgc-boilerplate'});
    				boilerplateSpan = $createElement('span');
    				copyrightSpan = $createElement('span', {'class': 'vgc-copyrightDates','tabindex':'0','role':'link','aria-describedby':'websiteInfo'});
    				spanWebInfo = $createElement('span',{'id':'websiteInfo','aria-hidden':'false','class':'vgc-hideText'});
    				spanWebInfo.appendChild($document.createTextNode("Website version information"));
    				
    				EventManager.addEvent(copyrightSpan, 'click', toggleBuildVersion);
    				EventManager.addEvent(copyrightSpan, 'keydown', toggleBuildVersion);
    				copyrightString = legalFooterData.copyright + date.getFullYear();
    				if (null === customText || typeof customText === 'undefined' || customText === '') {
	    				termsAndConditionsElement = $createElement('span', {'class': 'vgc-termsOfUse'});
	    				termsAndConditionsElement.innerHTML =  legalFooterData.termsAndConditions;
	    				if(typeof legalFooterData.alternativeTermsAndConditions !== 'undefined' ) {
	    					termsAndConditionsElement.innerHTML = setAlternativeText(legalFooterData.alternativeTermsAndConditions, termsAndConditionsElement.innerHTML);
	    				} 
	    				boilerplateString = legalFooterData.boilerplate;
	    				if(typeof legalFooterData.alternativeBoilerplates !== 'undefined') {
	    					boilerplateString = setAlternativeText(legalFooterData.alternativeBoilerplates, boilerplateString);
	    				}
	    				boilerplateString = '&nbsp;' + boilerplateString + '&nbsp;';
    				} else {
    					$class.add(boilerplateSpan, 'vgc-customTextField');
    					boilerplateString = ' ' + customText + ' ';
    				}
    				copyrightSpan.innerHTML = copyrightString;
    				boilerplateElement.appendChild(copyrightSpan);
    				boilerplateElement.appendChild(spanWebInfo);
    				
    				if (boilerplateString) {
    					boilerplateSpan.innerHTML = boilerplateString;
    					boilerplateElement.appendChild(boilerplateSpan);
    				}
    				if (termsAndConditionsElement) {
    					boilerplateElement.appendChild(termsAndConditionsElement);
    				}
    			}
				return boilerplateElement;
    		},
    		getLinkAttribs = function(attrData) {
    			var linkAttribs = {};
				linkAttribs.href = attrData.href;
				if (attrData.newWindow) {
					linkAttribs.target = '_blank';
				}
				if(attrData.noFollow) {
					linkAttribs.rel = 'nofollow';
				}
				return linkAttribs;
    		},
    		getLinkList = function() {
    				var linkList, count, i, linkLi, linkSpan, link, listCount, linkList2, halfListCount, 
    			    openNewWindowSpan, openNewWindowSpanId, openNewWindowSpanText="Open a new browser window",
    				linkAttribs = {}, label, pageTypeArrayForLink,
    				linkIsDemoted, pageTypeForDemote, icon, linkListFragment;
    			
    			if (legalFooterData && legalFooterData.links) { 
    				linkListFragment = $document.createDocumentFragment();
    				linkList = $createElement('ul', {'class': 'vgc-linkList'}, linkListFragment); 
    				count = legalFooterData.links.length;
    				
	    			for (i = 0; i < count; i++) {
	    				pageTypeArrayForLink = typeof legalFooterData.links[i].type !== 'undefined' ? legalFooterData.links[i].type : null;
	    				pageTypeForDemote = typeof legalFooterData.links[i].demote !== 'undefined' ? legalFooterData.links[i].demote : null;
	    				linkIsDemoted = pageTypeForDemote !== null && hasType ? pageTypeForDemote.toLowerCase().indexOf(type.toLowerCase()) > -1 : false;	    				
	    				if ((hasType === true && pageTypeArrayForLink !== null && $arrayIndexOf(pageTypeArrayForLink, type) !== -1) || (linkIsDemoted === false && pageTypeArrayForLink === null)) {		    				
	    					linkAttribs = getLinkAttribs(legalFooterData.links[i]);
		    				linkLi = $createElement('li', {'class': 'vgc-siteWideLinks'});
		    				link = $createElement('a', linkAttribs);
		    				linkSpan = $createElement('span');
		    				label = legalFooterData.links[i].label;
		    				if (label) {
		    					linkSpan.appendChild($document.createTextNode(label));
		    				}
		    				if (legalFooterData.links[i].icon) {
		    					icon = $createElement('span', {'class': legalFooterData.links[i].icon.type}, link);
		    					link.appendChild(icon);
		    				}		    				
		    				if(link.getAttribute('target')==='_blank'){
		    					openNewWindowSpanId = 'opennewbrowser_'+label.split(' ').join('_');
		    					openNewWindowSpan = $createElement('span', {'id':openNewWindowSpanId ,'class':'vgc-hideText'}); 
		    					openNewWindowSpan.appendChild($document.createTextNode(openNewWindowSpanText));
		    					link.appendChild(openNewWindowSpan);
		    					link.setAttribute('aria-describedby',openNewWindowSpanId);
		    				}
		    				if(i === count - 1) {
		    					$class.add(link, 'vgc-lastLink');
		    				}
		    				link.appendChild(linkSpan);
		    				linkLi.appendChild(link);
	    					linkList.appendChild(linkLi);
	    					linkList.appendChild($document.createTextNode(' '));
	    				}
	    			}
	    			listCount = linkList.childNodes.length;
	    			halfListCount = Math.ceil(listCount / 2);
	    			linkList2 = $createElement('ul', {'class':'vgc-linkList'}, linkListFragment);
	    			$class.add(linkList2, 'vgc-lastLinkList');
	    			while(linkList.childNodes.length > halfListCount){
	    				linkList2.appendChild(linkList.childNodes[halfListCount]);
	    			}
    			}
    			return linkListFragment;
    		},
    		getFeedbackLink = function() {
    			var feedbackLi, link, openLayerSpan, openLayerSpanText="Open a layer";
    			if (legalFooterData && legalFooterData.feedbackLink){
    			    feedbackLi = $createElement('span', {'class': 'vgc-feedbackLink'});
    			    link = feedbackLink.getFeedbackLink(legalFooterData.feedbackLink);
    			    if(link){
    			    	openLayerSpan = $createElement('span',{'id':'openLayer','class':'vgc-hideText'});
    			    	openLayerSpan.appendChild($document.createTextNode(openLayerSpanText));
    			    	link.appendChild(openLayerSpan);
    			    	link.setAttribute('aria-describedby','openLayer');
    			    	feedbackLi.appendChild(link);
    			    }
    			}
				return feedbackLi;
    		},
    		getBuildVersion = function() {
    			var span;
    			if (buildData){
    				buildVersionElement = $createElement('small', {'class': 'vgc-buildVersion','tabindex':0});
    				span = $createElement('span');    				
        			span.appendChild($document.createTextNode(buildData));        			
        			buildVersionElement.appendChild(span);
    			}
        		return buildVersionElement;
    		},
            render = function (docFrag) {    			
    			var legalFooterDiv,
	        		legalFooterContainerDiv,
	        		legalFooterRegionDiv,
	        		mainContent,
	        		boilerPlate,
	         		linkList, 	
	         		disclosure,
	         		feedbackLinkElement,
	        		buildVersion;
                if (!docFrag) {
                    docFrag = $document.createDocumentFragment();
                }
    			if(typeof legalFooterData !== 'undefined'){    							
	            	legalFooterDiv = $createElement('div', {'class': 'vgc-legalFooter', role: 'contentinfo','aria-live':'assertive'});
	            	legalFooterContainerDiv = $createElement('div', {'class': 'vgc-legalFooterContainer vgc-constrainedCentered'});
            		legalFooterRegionDiv = $createElement('div', {'class': 'vgc-legalFooterRegion'});
            		mainContent = $createElement('div', {'class': 'vgc-mainContent'});
            		
            		disclosure = getDisclosureElement();
            		if(typeof disclosure !== 'undefined'){
            			mainContent.appendChild(disclosure);
            		}
            		boilerPlate = getBoilerPlateElement();
            		legalFooterRegionDiv.appendChild(mainContent);
            		legalFooterContainerDiv.appendChild(legalFooterRegionDiv);
            		legalFooterDiv.appendChild(legalFooterContainerDiv);            		
            		
            		if (null === customText || typeof customText === 'undefined' || customText === '') {
            			linkList = getLinkList();
            			feedbackLinkElement = getFeedbackLink();
            		}
            		buildVersion = getBuildVersion();
            		
	            	if (linkList && feedbackLinkElement) {
	            	    linkList.appendChild(feedbackLinkElement);
	            	}
	                if (boilerPlate) {
	            		mainContent.appendChild(boilerPlate);
	                }
	                if (linkList) {
	                    mainContent.appendChild(linkList);
	                }
	                if (buildVersion) {
	                	legalFooterContainerDiv.appendChild(buildVersion);
	                }
	                docFrag.appendChild(legalFooterDiv);
	                linkTracking(legalFooterDiv, 'vgc-legalFooter');
    			}
                return docFrag;
            },
            populate = function (legalFooterDataJSON, buildDataString, typeString, customTextString) {
            	legalFooterData = legalFooterDataJSON;
            	buildData = buildDataString;
            	type = typeString;
            	hasType = type !== '' && typeof type !== 'undefined' && type !== null;
            	customText = customTextString;
            };
        return {
            render: render,
            populate: populate
        };
    }]);
}(VGC));
/*globals VGC:true */ 
(function (VGC) {
    'use strict';
    var app = VGC.app('globalHeaderFooter');

    app.module('feedbackLink', ['$window', '$document', '$createElement', 'EventManager', '$cookie', function ($window, $document, $createElement, EventManager, $cookie) {

    	var pageLoadTime = new Date().getTime(),
    		feedbackLinkData = {},
    	
	    	openFeedbackForm = function (e) {
	    		var referer = encodeURIComponent($window.location.href),
					prev = encodeURIComponent($document.referrer),
					tleaf_cookie = $cookie.get('TLTSID') + '|',	
					url = feedbackLinkData.feedback.href || feedbackLinkData.href,
					clickTime = new Date().getTime();       	
	    		EventManager.preventDefault(e);
	    		url += '?time1=' + pageLoadTime + '&time2=' + clickTime + '&prev=' + prev + '&referer=' + referer + '&custom_var=' + tleaf_cookie;
	    		$window.open(url, 'comments', 'menubar=no, toolbar=no, scrollbars=no, titlebar=no, resizable=yes, copyhistory=yes, width=540, height=250');
	    	},
	    	
    		getLinkAttribs = function(attrData) {
    			var linkAttribs = {};
				linkAttribs.href = attrData.href;
				if (attrData.newWindow === 'true') {
					linkAttribs.target = '_blank';		
				}
				if(attrData.noFollow === 'true') {
					linkAttribs.rel = 'nofollow';	
				}
				return linkAttribs;
    		},	    	
	    	
			getLink = function(data) {    			
				var linkIcon, linkText, link, linkAttribs = {}, label;
				feedbackLinkData = data;
				
				if (feedbackLinkData) {					
					linkAttribs = getLinkAttribs(feedbackLinkData);
					link = $createElement('a', linkAttribs);
					EventManager.addEvent(link, 'click', openFeedbackForm);
					linkText = $createElement('span');
					linkIcon = $createElement('span', {'class':'vgc-linkGIF'}, link);
					label = feedbackLinkData.label;
					if(label){
						linkText.appendChild($document.createTextNode(label));
					}
					link.appendChild(linkIcon);	
					link.appendChild(linkText);		
				}
				return link;
			};
			
            return {
                getFeedbackLink: getLink
            };
            
    }]);
}(VGC));

/*jslint browser:true*/
/*globals VGC:true, unescape:true*/
(function(VGC){
    'use strict';
    var app = VGC.app('globalHeaderFooter');
        
        app.module('globalHeader', ['$bind', '$select', 'dataSource', 'KeyboardModeDetector', 'siteNavTour', 'utilityBar','verticalNav' ,'navBar', 'sitePreferences', 'linkReporting', 'internalOnly', 'brandHeader', 'horizontalNav','horizontalNavMenuHandler', function($bind, $select, dataSource, KeyboardModeDetector, siteNavTour, utilityBar, verticalNav, navBar, sitePreferences, linkReporting, internalOnly, brandHeader, horizontalNav,horizontalNavMenuHandler){
            var element = $select('#vgc-globalHeader')[0],
                docFrag,
                keyboardModeDetector;
            
            function onDataAvailable(success){
            	var moduleContent;
                if (success){                	
                    element.innerHTML = '';
                    
                    moduleContent = dataSource.getComponentData('internalOnly');
                    internalOnly.populate(moduleContent,  element.getAttribute('data-vgc-alt-banner'));
                    
                    moduleContent = dataSource.getComponentData('siteNavTour');
                    siteNavTour.populate( moduleContent );
                    
                    moduleContent = dataSource.getComponentData('utilityBar');
                    utilityBar.populate( moduleContent );
                    
                    moduleContent = dataSource.getComponentData('brandHeader');
                    brandHeader.populate( moduleContent, dataSource.getComponentData('search'));
                    
                    moduleContent = dataSource.getComponentData('verticalNav');
                    verticalNav.populate(moduleContent, dataSource.getComponentData('utilityBar'));
                    
                    moduleContent = dataSource.getComponentData('horizontalNav');
                    horizontalNav.populate( moduleContent, dataSource.getActiveSilo(element), dataSource.getComponentData('search') );
                    
                    moduleContent = dataSource.getComponentData('nav');
                	navBar.populate( dataSource.getComponentData('nav'), dataSource.getActiveSilo(element));

                    moduleContent = dataSource.getComponentData('sitePreferences');
                    sitePreferences.populate(moduleContent, element.getAttribute('data-current-site'));
                    
                	docFrag = internalOnly.render();
            		sitePreferences.render(docFrag);
            		siteNavTour.render(docFrag);
            		utilityBar.render(docFrag);
            		brandHeader.render(docFrag);
            		horizontalNav.render(docFrag);
            		navBar.render(docFrag);
            		verticalNav.render(docFrag);
            		
            		element.appendChild(docFrag);

                	siteNavTour.run(element.getAttribute('data-showWelcomeMessage'));
                    sitePreferences.run(element.getAttribute('data-showWelcomeMessage'));
                    keyboardModeDetector = new KeyboardModeDetector();
                    horizontalNavMenuHandler.init();
                    keyboardModeDetector.init(element);
                    element.setAttribute ('role','banner'); 
                }
            }

            function init(){
            	if(element){
            		dataSource.load(element, $bind(onDataAvailable, this));
            		linkReporting(element);
            	}
            }
           
            init();
            
            return function () { };
            
        }]);
        
}(VGC));
/*jslint browser:true*/
/*globals VGC:true, unescape:true*/
(function(VGC){
    'use strict';
    var app = VGC.app('globalHeaderFooter'); 
        
        app.module('globalFooter', ['$bind', '$select', '$document', 'dataSource', 'KeyboardModeDetector', 'social', 'superFooter', 'legalFooter', 'linkReporting', function($bind, $select, $document, dataSource, KeyboardModeDetector, social, superFooter, legalFooter, linkReporting){
            var element = $select('#vgc-globalFooter')[0],
            	keyboardModeDetector;
             
            function onDataAvailable(success){
            	var docFrag, 
            		legalFooterOnly;
            	
                if (success){                   
                    docFrag = $document.createDocumentFragment();
                    legalFooterOnly =  element.getAttribute('data-vgc-legal-footer-only') === 'true';                    
                    element.innerHTML = '';
                    
                    if(!legalFooterOnly){
	                    social.populate(dataSource.getComponentData('social'));
	                	docFrag = social.render(docFrag);
	                	
	                    superFooter.populate(dataSource.getComponentData('superFooter'));
	                    docFrag = superFooter.render(docFrag);
                    }
                    
                    legalFooter.populate(dataSource.getComponentData('legalFooter'), element.getAttribute('data-vgc-build'), element.getAttribute('data-vgc-footer-type'), element.getAttribute('data-vgc-custom-text'));
                    docFrag = legalFooter.render(docFrag);
                    
                    if(docFrag){
                    	element.appendChild(docFrag);
                    }
                    keyboardModeDetector = new KeyboardModeDetector();
                    keyboardModeDetector.init(element);
                }
            }

            function init(){
            	if(element){
            		dataSource.load(element, $bind(onDataAvailable, this));
            		linkReporting(element);
            	}
            }

            init();            
            return function () { };
            
        }]);
        
}(VGC));
/*globals VGC:true */
(function (VGC) {
    'use strict';
    var app = VGC.app('globalHeaderFooter');

    app.module('navBar', ['$window', '$document', '$bind', '$createElement', '$class', '$arrayIndexOf', '$keyCodes', '$measurements', 'EventManager', 'Search', 'linkTracking', 'webUsageProxy', function ($window, $document, $bind, $createElement, $class, $arrayIndexOf, $keyCodes, $measurements, EventManager, Search, linkTracking, webUsageProxy) {
        var data,
            silos = [],
            selectedSilo,
            activeSilo = null,
            linkIndex = 0,
            openSiloId = null,
            openSiloDelay = 200,
            logo,
            navigation,
            search,
            mainDiv,
            rendered = false,
            rightSideElements,
            webUsageNamespace = "navBar",
            hasOverviewOrKeyDataLink = function (siloData) {
                var obj = siloData.linkLists[0][0];
                return obj && obj.subOverview ? obj.subOverview.overview : undefined;
            },
            getSelfOrAncestor = function (element, tagName, className) {
                tagName = tagName.toLowerCase();
                if(typeof element !== 'undefined'){
	                do {
	                    if (element && element.tagName && element.tagName.toLowerCase() === tagName && (!className || $class.has(element, className))) {
	                        return element;
	                    } else {
	                    	element = element.parentNode;
	                    }
	                } while (element);
                }
            },
            getChild = function (element, tagName) {
                var children = element.childNodes,
                    childCount = children.length,
                    i = 0;
                tagName = tagName.toLowerCase();
                for (i; i < childCount; i++) {
                    if (children[i].tagName.toLowerCase() === tagName) {
                        return children[i];
                    }
                }
            },
            openActiveSilo = function (evtTarget) {
                var i = 0,
                    target = getSelfOrAncestor(evtTarget, 'li', 'vgc-silo');
                if (target && !$class.has(target, 'vgc-activeSilo')) {
                	closeActiveSilo();
                    declareActiveSilo(target);
                }
                updateSiloPanelPosition();
            },
            declareActiveSilo = function(silo){            	
            	var siloPanel;
            	$class.add(silo, 'vgc-activeSilo');
                siloPanel = getChild(silo, 'div');
                if(siloPanel){
                	siloPanel.setAttribute('aria-hidden', false);
                }
                activeSilo = silo;
                updateSiloPanelPosition();
            },
            updateSiloPanelPosition = function(){
            	var siloPanel = getChild(activeSilo, 'div'),
					scrollYOffset = $window.pageYOffset || $document.documentElement.scrollTop || $document.body.scrollTop,
					quirksOffset = 0,
					navBarHeight = 60,
            		siloTabBounds,
            		windowWidth, dropdownX, dropdownY;
            	if($document.compatMode === 'BackCompat'){
            		quirksOffset = -2;
            	} 
            	
				if (siloPanel) {
					siloTabBounds = $measurements.getElementBounds(activeSilo);					
					dropdownY = (scrollYOffset + siloTabBounds.y + navBarHeight + quirksOffset) + 'px;';					
					windowWidth = $document.body.clientWidth;
					dropdownX = (windowWidth - $measurements.getElementBounds(siloPanel).width) / 2 + 'px';
					
					siloPanel.setAttribute('style', 'top:' + dropdownY);
					siloPanel.style.cssText = "top:"+dropdownY+";left:"+dropdownX+";";
				}
            },
            closeActiveSilo = function () {
            	var siloPanel;
                if (activeSilo) {
                    $class.remove(activeSilo, 'vgc-activeSilo');
                    siloPanel = getChild(activeSilo, 'div');
                    if (siloPanel) {
                    	siloPanel.setAttribute('aria-hidden', true);
                    }
                    EventManager.dispatch('activeSiloClosed');
                }
                activeSilo = undefined;
            },
            closeSilo = function (e) {
            	var target = EventManager.getTarget(e);
                if (!getSelfOrAncestor(target, 'li', 'vgc-silo')) {
                    closeActiveSilo();
                }
            },
            siloMouseover = function (event) {
            	var target = EventManager.getTarget(event);
            	openSiloId = $window.setTimeout(function () { 
                    openActiveSilo(target);
                    openSiloId = undefined;
                	}, openSiloDelay);
            },
            siloMouseout = function () {
                if (openSiloId) {
                	$window.clearTimeout(openSiloId);
                }
            },
            siloClick = function (evt) {
            	var evtTarget = EventManager.getTarget(evt);
                openActiveSilo(evtTarget);
            },
            documentMouseover = function (evt) {
            	var target = EventManager.getTarget(evt);
                if (!getSelfOrAncestor(target, 'div', 'vgc-navigation')) {
                    closeActiveSilo();
                }
            },
            pushSubSiloAnchor = function (siloName, subSiloA) {
                if ($class.has(subSiloA, 'vgc-disabled')) {
                    return;
                }
                if (!silos[siloName]) {
                    silos[siloName] = [];
                }
                silos[siloName].push(subSiloA);
            },
            getSiloIndex = function (silo) {
                var i;
                for (i = 0; i < silos.length; i++) {
                    if (silo === silos[i]) {
                        return i;
                    }
                }
            },
            getSiloById = function(id){
            	var i,
            	 	siloId,
            	 	silo;
                 for (i = 0; i < silos.length; i++) {
                	 silo = silos[i];
                	 siloId = silo.getAttribute('id');
                     if (id === siloId) {
                         return silo;
                     }
                 }
            },
            siloIsNotOpen = function (silo) {
                return !$class.has(silo, 'vgc-activeSilo');
            },
            getSiloName = function (siloData) {
                return siloData.name.replace(/[ &]/g, '');
            },
            getTargetName = function (silo) {
                return silo.getAttribute('data-name');
            },
            openSiloByID = function(evt){
            	var id = evt.data.id,
            		silo = getSiloById(id);
            	openActiveSilo(silo);
            },
            navigateSiloTabs = function (e, keyCode) {            	
                var target = EventManager.getTarget(e),
                	silo = getSelfOrAncestor(target, 'li', 'vgc-silo'),
                    siloIndex = getSiloIndex(silo),
                    silosCount = silos.length,
                    siloName = getTargetName(silo);
                keyCode = keyCode || e.keyCode;
                if (keyCode === $keyCodes.ESC) {
                    closeActiveSilo();
                } else if (keyCode === $keyCodes.LEFT_ARROW || keyCode === $keyCodes.RIGHT_ARROW) {
                    if (keyCode === $keyCodes.LEFT_ARROW) {
                        siloIndex = (siloIndex + silosCount - 1) % silosCount;
                    } else if (keyCode === $keyCodes.RIGHT_ARROW) {
                        siloIndex = (siloIndex + 1) % silosCount;
                    }
                    getChild(silos[siloIndex], 'a').focus();
                } else if (silos[siloName] && (keyCode === $keyCodes.DOWN_ARROW || keyCode === $keyCodes.UP_ARROW || keyCode === $keyCodes.SPACE || keyCode === $keyCodes.ENTER)) {
                	EventManager.preventDefault(e);
                	if (siloIsNotOpen(silo)) {
                        openActiveSilo(target);
                    }
                    if (keyCode === $keyCodes.DOWN_ARROW || keyCode === $keyCodes.SPACE || keyCode === $keyCodes.ENTER) {
                        linkIndex = 0;
                    } else if (keyCode === $keyCodes.UP_ARROW) {
                        linkIndex = silos[siloName].length - 1;
                    }
                    silos[siloName][linkIndex].focus();
                } else if (keyCode === $keyCodes.TAB) {
                    closeActiveSilo();
                }
            },
            navigateSilo = function (e, keyCode) {
            	var target = EventManager.getTarget(e),
                	silo = getSelfOrAncestor(target, 'li', 'vgc-silo'),
                    links,
                    linkCount;
                keyCode = keyCode || e.keyCode;
                if (keyCode === $keyCodes.ESC || keyCode === $keyCodes.LEFT_ARROW || keyCode === $keyCodes.RIGHT_ARROW || keyCode === $keyCodes.TAB) {
                    if (keyCode === $keyCodes.ESC) {
                        getChild(silo, 'a').focus();
                    }
                    navigateSiloTabs(e, keyCode);
                } else if (keyCode === $keyCodes.DOWN_ARROW || keyCode === $keyCodes.UP_ARROW) {
                	EventManager.preventDefault(e);
                	links = silos[getTargetName(silo)];
                    linkCount = links.length;
                    if (keyCode === $keyCodes.DOWN_ARROW) {
                        linkIndex = (linkIndex + 1) % linkCount;
                    } else if (keyCode === $keyCodes.UP_ARROW) {
                        linkIndex = (linkCount + linkIndex - 1) % linkCount;
                    }
                    links[linkIndex].focus();
                }
            },
            renderIcon = function () {
                var logoLink,
                	logo;
                if (data.icon) {
                	logo = $createElement('div', {'class': 'vgc-logo'});
                    logoLink = $createElement('a', {href: data.icon.href,'aria-label':'Vanguard home', 'alt': data.icon.altText, 'title':'Vanguard home'});
                    logo.appendChild(logoLink);
                }
                return logo;
            },
            renderActionBar = function (siloName, actionBarData) {
                var actionBar = $createElement('div', {'class': 'vgc-actionBar'}),
                    actionBarUl = $createElement('ul'),
                    actionBarLi,
                    actionBarA,
                    actionBarSpan,
                    actionBarText,
                    i,
                    buttonData,
                    linkData;
                if (actionBarData.buttons) {
                    for (i = 0; i < actionBarData.buttons.length; i++) {
                        buttonData = actionBarData.buttons[i];
                        actionBarLi = $createElement('li');
                        actionBarA = $createElement('a', {href: buttonData.href, 'class':'vgc-actionButton', tabIndex: '-1'});
                        pushSubSiloAnchor(siloName, actionBarA);
                        EventManager.addEvent(actionBarA, 'keydown', navigateSilo);
                        actionBarText = $document.createTextNode(buttonData.label);
                        actionBarA.appendChild(actionBarText);
                        if (buttonData.type) {
                            $class.add(actionBarA, 'vgc-' + buttonData.type);
                        }
                        actionBarLi.appendChild(actionBarA);
                        actionBarUl.appendChild(actionBarLi);
                    }
                }
                if (actionBarData.links) {
                    for (i = 0; i < actionBarData.links.length; i++) {
                        linkData = actionBarData.links[i];
                        actionBarLi = $createElement('li');
                        actionBarA = $createElement('a', {href: linkData.href, tabIndex: '-1'});
                        actionBarSpan = $createElement('span');
                        pushSubSiloAnchor(siloName, actionBarA);
                        EventManager.addEvent(actionBarA, 'keydown', navigateSilo);
                        actionBarSpan.appendChild($document.createTextNode(linkData.label));
                        $class.add(actionBarA, 'vgc-plainLink');
                        actionBarA.appendChild(actionBarSpan);
                        actionBarLi.appendChild(actionBarA);
                        actionBarUl.appendChild(actionBarLi);
                    }
                }
                actionBar.appendChild(actionBarUl);
                return actionBar;
            },
            renderSiloTab = function (siloData, isFirstSilo) {
                var siloA, siloSpan,
                    isLink = siloData.href && (siloData.suppressLinkList || !siloData.linkLists);
                
                siloA = $createElement('a', {'class':'vgc-horizNavBarTab', href: isLink ? siloData.href : 'javascript:void(0)', tabIndex: isFirstSilo ? 0 : -1});
                siloSpan = $createElement('span');
                siloSpan.appendChild($document.createTextNode(siloData.name));
                siloA.appendChild(siloSpan);
                EventManager.addEvent(siloA, 'focus', openActiveSilo);
                EventManager.addEvent(siloA, 'keydown', navigateSiloTabs);
                return siloA;
            },
            renderSubSilo = function (siloData, subSiloData, totalSubSilos) {
                var subSiloCountDescriptor = 'vgc-silo-count-' + totalSubSilos,
                	subSilo = $createElement('li', {'class': 'vgc-subSilo ' + subSiloCountDescriptor}),
                    subSiloUl = $createElement('ul'),
                    subSiloLi = $createElement('li', {role: 'menuitem', 'aria-controls': 'st1'}),
                    subSiloA, 
                    subSiloSpan,
                    i = 0, set = 0, subSiloSet;
                for(set = 0; set < subSiloData.length; set++){
                	subSiloSet = subSiloData[set];
                	
                	if (subSiloSet.subOverview) {
                        subSiloA = $createElement('a', {'class': 'vgc-header' + (subSiloSet.subOverview.type ? ' vgc-' + subSiloSet.subOverview.type : ''), tabIndex: '-1'});
                        if (subSiloSet.subOverview.href != null) {
                            subSiloA.setAttribute('href', subSiloSet.subOverview.href);
                        } else {
                            $class.add(subSiloA, 'vgc-noLink');
                        }
                        if (typeof subSiloSet.config !== 'undefined' && subSiloSet.config.type !== 'undefined') {
                        	$class.add(subSiloA, 'vgc-' + subSiloSet.config.type);
                        }
                        pushSubSiloAnchor(getSiloName(siloData), subSiloA);
                        EventManager.addEvent(subSiloA, 'keydown', navigateSilo);
                        subSiloSpan = $createElement('span');
                        subSiloSpan.appendChild($document.createTextNode(subSiloSet.subOverview.label));
                        subSiloA.appendChild(subSiloSpan);
                        subSiloLi.appendChild(subSiloA);
                        
                        if(subSiloSet.subOverview.tours){
                        	$class.add(subSiloLi, subSiloSet.subOverview.tours);
                        }
                        subSiloUl.appendChild(subSiloLi);
                    }
                	
	                if (subSiloSet.contentPages) {
	                    for (i = 0; i < subSiloSet.contentPages.length; i++) {
	                        subSiloLi = $createElement('li', {role: 'menuitem', 'aria-controls': 'st1'});
                            subSiloA = $createElement('a', {tabIndex: '-1'});
                            subSiloSpan = $createElement('span');
	                        if (subSiloSet.contentPages[i].disabled) {
	                            $class.add(subSiloA, 'vgc-disabled');
	                        } else {
	                            subSiloA.setAttribute('href', subSiloSet.contentPages[i].href);
	                        }
	                        if (subSiloSet.contentPages[i].type) {
	                            $class.add(subSiloA, 'vgc-' + subSiloSet.contentPages[i].type);
	                        }
	                        if(subSiloSet.contentPages[i].tours){
	                        	$class.add(subSiloLi, subSiloSet.contentPages[i].tours);
	                        }
	                        pushSubSiloAnchor(getSiloName(siloData), subSiloA);
	                        EventManager.addEvent(subSiloA, 'keydown', navigateSilo);
	                        subSiloSpan.appendChild($document.createTextNode(subSiloSet.contentPages[i].label));
                            subSiloA.appendChild(subSiloSpan);
	                        subSiloLi.appendChild(subSiloA);
	                        if ( set > 0 && i === 0 ){
	                            $class.add(subSiloLi, 'vgc-breakBefore');
	                        }
	                        subSiloUl.appendChild(subSiloLi);
	                    }
	                }
                }
                subSilo.appendChild(subSiloUl);
                return subSilo;
            },
            renderTopRow = function (siloData) {
                var topRow = $createElement('div', {'class': 'vgc-topRow'}),
	                siloUl = $createElement('ul'),
	                topRowData = siloData.linkLists.shift()[0],
	                subSilo = renderSubSilo(siloData, [topRowData]);
                siloUl.appendChild(subSilo);
                topRow.appendChild(siloUl);
                return topRow;
            },
            renderSiloPanel = function (siloData) {
                var siloPanel, siloUl, subSiloSection, linkList, j, element, totalSubSilos;
                siloPanel = $createElement('div', {'class': 'vgc-siloPanel', role: 'menu', 'aria-hidden': true});
                if (hasOverviewOrKeyDataLink(siloData)) {
                	element = renderTopRow(siloData);
                	if(element){
                		siloPanel.appendChild(element);
                	}
                }
                totalSubSilos = siloData.linkLists.length;
                subSiloSection = $createElement('div', {'class': 'vgc-subSiloSection'});
                siloUl = $createElement('ul');
                for (j = 0; j < totalSubSilos; j++) {
                    linkList = siloData.linkLists[j];   
                    element = renderSubSilo(siloData, linkList, totalSubSilos);
                    if(element){
                    	siloUl.appendChild(element);
                    }
                }
                subSiloSection.appendChild(siloUl);
                siloPanel.appendChild(subSiloSection);
                if (siloData.actionBar) { 
                	element = renderActionBar(getSiloName(siloData), siloData.actionBar);
                    if(element){
                    	siloPanel.appendChild(element);
                    }
                }
                linkTracking(siloPanel, getSiloName(siloData));
                return siloPanel;
            },
            renderSilo = function (index, siloData) {
                var siloLi,
                    isFirstSilo = (index === 0),
                    element;
                siloLi = $createElement('li', {id: siloData.id, 'class': 'vgc-silo vgc-hasLeftPipe', 'data-name': getSiloName(siloData), role: 'menuitem', 'aria-haspopup': true});
                if (selectedSilo === siloData.id) {
                    $class.add(siloLi, 'vgc-selected');
                }
                if (isFirstSilo) {
                	$class.add(siloLi, 'vgc-firstSilo');
                }
                EventManager.addEvent(siloLi, 'mouseover', siloMouseover);
                EventManager.addEvent(siloLi, 'mouseout', siloMouseout);
                EventManager.addEvent(siloLi, 'click', siloClick);
                silos.push(siloLi);
                element = renderSiloTab(siloData, isFirstSilo);
                if(element){
                	siloLi.appendChild(element);
                }
                if (siloData.linkLists && !siloData.suppressLinkList) {
                	element = renderSiloPanel(siloData);
                    siloLi.appendChild(element);
                } else {
                    $class.add(siloLi, 'vgc-linkOnly');
                }
                if (index === activeSilo) {
                    $class.add(siloLi, 'vgc-activeSilo');
                }
                return siloLi;
            },
            renderHamburgerMenu = function () {
                var bun = $createElement('div', {'class': 'vgc-hamburgerBun'}),
                    hamburgerMenu = $createElement('button', {'class': 'vgc-hamburgerMenu'}),
                    label = data.sideNav ? data.sideNav.label : '';    
                hamburgerMenu.appendChild($document.createTextNode(label));
                EventManager.addEvent(hamburgerMenu, 'click', function () {
                	EventManager.dispatch('openVerticalNav');
                	webUsageProxy.trackAction(webUsageNamespace + '.' + 'openVerticalNav');
                });
                bun.appendChild(hamburgerMenu);
                return bun;
            },
            renderNavigation = function () {
                var highLevelNav, i, element;
                if (data.silos) {
                    navigation = $createElement('div', {'class': 'vgc-navigation', role: 'application', 'aria-label': 'main navigation'});
                    highLevelNav = $createElement('ul', {'class': 'vgc-highLevelNav', role: 'menubar', 'aria-controls': 'st1'});
                    i = 0;
                    for (i; i < data.silos.length; i++) {
                    	element = renderSilo(i, data.silos[i]);
                        if(element){
                        	highLevelNav.appendChild(element);
                        }
                    }
                    navigation.appendChild(highLevelNav);
                    EventManager.addEvent($document, 'click touchstart', closeSilo);
                    EventManager.addEvent($document, 'mouseover', documentMouseover);
                }
                return navigation;
            },
            onSearchDeActivated = function(){
            	$class.remove(navigation, 'vgc-hidden');
            	$class.remove(mainDiv, 'vgc-searchEngaged');
            	$class.remove(rightSideElements, 'vgc-searchExpanded');
            	EventManager.unsubscribe(search, search.ON_DEACTIVATION, onSearchDeActivated);
            },
            onSearchActivated = function(){
            	$class.add(navigation, 'vgc-hidden');
            	$class.add(mainDiv, 'vgc-searchEngaged');
            	$class.add(rightSideElements, 'vgc-searchExpanded');
            	EventManager.subscribe(search, search.ON_DEACTIVATION, onSearchDeActivated);
            },
            renderSearchBar = function () {
                if (data.search) {
                   search = new Search();
                   search.populate(data.search);
                   EventManager.subscribe(search, search.ON_ACTIVATION, onSearchActivated);                 
                }else if(navigation){
                	$class.add(navigation, 'vgc-autoSpace');
                }
            },
            hasFlexBox = function () {
            	if ('webkitFlex' in $document.body.style 
            			 || 'msFlex' in $document.body.style
            			 || 'flex' in $document.body.style) {
            		return true;
            	} 
            },
            render = function (docFrag) {            	
            	if(typeof data !== 'undefined'){
	                var icon = renderIcon(),
	                    nav = renderNavigation(),
	                    hamburgerMenu = renderHamburgerMenu(),
	                    containerDiv = $createElement('div', {'class': 'vgc-navBarContainer'}),
	                    element;
	                
	                renderSearchBar();                    
	                mainDiv = $createElement('div', {'class': 'vgc-navBar'});
	                rightSideElements = $createElement('div', {'class': 'vgc-rightSideElements vgc-hasLeftPipe'});
	                if (icon) {
	                	containerDiv.appendChild(icon);
	                }
	                if (nav) {
	                	containerDiv.appendChild(nav);
	                    if (!hasFlexBox()) {
	                    	$class.add(containerDiv, 'vgc-noFlexBox');
	                    } else {
	                    	$class.add(containerDiv, 'vgc-hasFlexBox');
	                    }
	                }
	                if (hamburgerMenu) {
	                    rightSideElements.appendChild(hamburgerMenu);
	                }
	                if (search) {
	                	element = search.getBar();
	                	if(element){
	                		rightSideElements.appendChild(element);
	                	}
	                }
	                
	                EventManager.subscribe(null, 'DISPLAY_SUBSILO_CONTENTS', $bind(openSiloByID, this));
	                containerDiv.appendChild(rightSideElements);
	                mainDiv.appendChild(containerDiv);
	                if (!docFrag) {
	                    docFrag = $document.createDocumentFragment();
	                }
	                docFrag.appendChild(mainDiv);
	                linkTracking(mainDiv, webUsageNamespace);
            	}
                return docFrag;
            },
            populate = function (navBarData, selectedSiloId) {
                data = typeof navBarData !== 'undefined' ? JSON.parse(JSON.stringify(navBarData)) : undefined;
                selectedSilo = selectedSiloId;
            };

        return {
            render: render,
            populate: populate,
            rendered:rendered
        };
    }]);

}(VGC));
/*globals VGC:true */
(function (VGC) {
    'use strict';
    var app = VGC.app('globalHeaderFooter');

    app.module('brandHeader', ['$document','$createElement','Search','EventManager', function ($document,$createElement,Search,EventManager) {

        var data,
        search,
        searchData,
        	buildBrandHeaderIcon = function(){
        		var brandIcon,
        			brandClass,
        			brandUrl,
        			returnVal;
        		
        		if(typeof data.icon !== 'undefined' && typeof data.icon.brand !== 'undefined'){
        			brandClass = 'vgc-' + data.icon.brand;
        			brandUrl = data.icon.href;
        			brandIcon = $createElement('a', {'class':brandClass,'href':brandUrl, 'title':data.icon.title, 'aria-label':data.icon.label});
        			returnVal = brandIcon;
        		}
        		return returnVal;
        	},
        	
        	renderSearchBar = function () {
                   search = new Search();
                   search.populate(searchData);
                      
            },
            
        	render = function (_docFrag) {    			
        		var docFrag = _docFrag || $document.createDocumentFragment(),
    				brandHeader,
    				brandHeaderContainer,
    				brandHeaderRegion,
    				brandHeaderIcon;
        		if(typeof data !== 'undefined'){
        			brandHeader = $createElement('div',{'class':'vgc-brandHeader'});
        			brandHeaderContainer = $createElement('div',{'class':'vgc-brandHeaderContainer vgc-constrainedCentered'}, brandHeader);
        			brandHeaderRegion = $createElement('div',{'class':'vgc-brandHeaderRegion'}, brandHeaderContainer);
        			brandHeaderIcon = buildBrandHeaderIcon();
        			if(typeof brandHeaderIcon !== 'undefined'){
        				brandHeaderRegion.appendChild(brandHeaderIcon);
        			}
        			renderSearchBar();
        			 if (typeof searchData !== 'undefined' && typeof searchData.submit !== 'undefined') {
 	                	var element = search.getBar('brandHeader');
 	                	if(element){
 	                		brandHeaderRegion.appendChild(element);
 	                	}
 	                }
        			
        			docFrag.appendChild(brandHeader);
        		}
                return docFrag;
            },
            populate = function (brandHeaderData,_searchData) {
            	data = brandHeaderData;
            	searchData=_searchData;
            };
  
        return {
            render: render,
            populate: populate
        };
    }]);

}(VGC));
/*jslint browser:true*/
/*globals VGC:true*/
(function (VGC) {
	'use strict';
	var app = VGC.app('globalHeaderFooter');	

	app.module('horizontalNavMenuHandler', ['$window','$class','$document','horizontalNav','verticalNav','Search','EventManager','toggleHeader', function ($window,$class,$document,horizontalNav,verticalNav,search,EventManager,toggleHeader) {
		var searchOpen=false,
			body,
			verticalNavOpen = false,
			animationTime =.4,
			transitionSupported=false,
			horizontalNavElement,
			vendorPrefixes = ['transition','-webkit-transition','-moz-transition','-ms-transition','-o-transition'],
			position;
		function transitionSuported(){  
			var i=0;
			for(i;i<vendorPrefixes.length;i++){
				if(vendorPrefixes[i] in $document.body.style){
					transitionSupported = true;
				}
			}
		};
		function onFinish(){
				var position = -1 * horizontalNavElement.offsetTop;
    			body.style.top = position + "px";
				$class.add(body,'vgc-fixedBody'); 
    	}; 
    	function disableHeader(enable,duration){
    		if(typeof horizontalNav !== 'undefined'){
    			if(enable){
    				toggleHeader.animatedScrollTo(enable,horizontalNavElement,duration,transitionSupported,function(){
    					$window.setTimeout(onFinish);
    				});
    			}else{
    				position = -1 * horizontalNavElement.offsetTop;
    				$class.remove(body,'vgc-fixedBody');
    				$window.scrollTo(0,(-1 * position));
					toggleHeader.animatedScrollTo(enable,horizontalNavElement,duration,transitionSupported,function(){
					});
    			}
	    	}		
    	};
		function close(event){
			if(event.data.source === 'verticalNav'){
				verticalNavOpen = false;
				disableHeader(false,animationTime);
			}else if (event.data.source === 'search'){
				searchOpen = false;
				disableHeader(false,animationTime);
			}
		};
		function onVerticalNavOpen(){
			if(!verticalNavOpen){
				if(searchOpen){
					EventManager.dispatch('SearchDeactivated');
					searchOpen = false;
				}else{
					disableHeader(true,animationTime);
				}
				verticalNavOpen =true;
			}else{ 
				EventManager.dispatch('verticalNavClose');
				verticalNavOpen =false;
			}
		
		};
		function onSearchOpening(){
			if(verticalNavOpen){
				EventManager.dispatch('verticalNavDisableMenu');
				verticalNavOpen =false;
			}else{
				disableHeader(true,animationTime);
			}
			searchOpen = true;
		};
		function init(){
			horizontalNavElement = horizontalNav.getHorizontalNavElement();
			body = $document.getElementsByTagName('body')[0];
			transitionSuported();
			EventManager.subscribe(null, 'onVerticalNavOpen', onVerticalNavOpen);
			EventManager.subscribe(null, 'SearchActivated', onSearchOpening);
			EventManager.subscribe(null, 'onVerticalNavClose', close);
			EventManager.subscribe(null, 'SearchDeactivated', close);
		}
		
		return {
			init:init
		};
	}]);

}(VGC));
/*globals VGC:true */
(function (VGC) {
    'use strict';
    var app = VGC.app('globalHeaderFooter');

    app.module('horizontalNav', ['$bind', '$class', '$contains', '$createElement', '$document', '$window', '$select', 'EventManager', 'HorizontalNavSection', 'Search','$keyCodes','toggleHeader', function ($bind, $class, $contains, $createElement, $document, $window, $select, EventManager, HorizontalNavSection, Search, $keyCodes,toggleHeader) {

        var data,
        	navSections,
        	horizontalNavElement,
        	collapsedNavigation,
        	selectedSiloId,
        	search,
        	horizontalNav,
        	searchData,
        	position,
        	setFocusAndExpandedState = function(evt, section){        		
        		EventManager.stopPropagation(evt);
				EventManager.preventDefault(evt);
				section.anchor.setAttribute('aria-expanded','false');  
				section.anchor.focus();
				$window.clearTimeout(section.pendingActivationID);
				if(section.subNav){
					$window.setTimeout(function(){section.close();},100);
				}				
        	}, 
        	setNavigationState = function(evt){
        		var i = 0,
        			t = navSections.length,
        			section,
        			activeNavSection = evt.data,        			
        			target = EventManager.getTarget(evt),
        			hasTarget = typeof target !== 'undefined',
        			targetIsNotContainedWithinNav = hasTarget && $contains(horizontalNavElement, target) === false;
        		
        		for(i; i < t; i++){
        			section = navSections[i];
        			if(section.active===true ){
        				if(typeof activeNavSection !== 'undefined' && (evt.src === 'vgc-actionBarItem' || evt.src === 'vgc-navigationSubSection') && evt.type === 'onNavSectionActivation'){        					
        					setFocusAndExpandedState(evt, section);
        				}else if(!hasTarget){
        					section.close();
        				}else if(targetIsNotContainedWithinNav){
        					section.close();
        				}
        			}
        		}
        		if(typeof activeNavSection !== 'undefined' && typeof activeNavSection.open !== 'undefined'){
        			activeNavSection.open();
        			activeNavSection.anchor.setAttribute('aria-expanded','true');
        			EventManager.addEvent($document, 'click', setNavigationState);        			
        		}else if(targetIsNotContainedWithinNav){
        			EventManager.removeEvent($document, 'click', setNavigationState);
        		}
        	},
        	buildCollapsedNavigation = function(collapsedMenu){
        		var region, element, a, label, span, bar1, bar2, bar3;
        		region = $createElement('ul', {'class':'vgc-horizontalNavRegion vgc-collapsedNavigation'});
        		element = $createElement('li', {'class':'vgc-menuItemContainer'}, region);
				a = $createElement('a', {id:'horizontalNavMenuButton','class':'vgc-menuItem','tabindex':'0','role':'button','aria-label':'Menu','title':'Open menu','aria-expanded':'false'}, element);
				span = $createElement('span', {'class':'vgc-menuItemLabel'}, a);
				bar1 = $createElement('span', {id:'transformativeMenuBar1','class':'vgc-transformativeMenuBars vgc-menuBar1'}, a);
				bar2 = $createElement('span', {id:'transformativeMenuBar2','class':'vgc-transformativeMenuBars vgc-menuBar2'}, a);
				bar3 = $createElement('span', {id:'transformativeMenuBar3','class':'vgc-transformativeMenuBars vgc-menuBar3'}, a);
				label = $document.createTextNode(collapsedMenu.label);
				span.appendChild(label);
				EventManager.addEvent(a, 'click keydown', function(evt){
					if(evt.type === 'click' || evt.keyCode === $keyCodes.ENTER || evt.keyCode === $keyCodes.SPACE){
						EventManager.dispatch('openVerticalNav');
					}
				});
				return region;
        	},
        	buildTopLevelNav = function(silos){
        		var region, t, i, silo, navButton,selectedSpan;
        		navSections = [];
        		if(typeof data.silos !== 'undefined'){
        			region = $createElement('ul', {'id':'vgc-horizontalNavContent','class':'vgc-horizontalNavRegion vgc-horizontalNavSections'});
        			selectedSpan = $createElement('span', {id:'selectedSiloOffscreenLabel','class':'vgc-accessibleOffscreenText'},region);
    				selectedSpan.appendChild($document.createTextNode("selected"));
        			t = silos.length;
        			for(i=0; i<t; i++){
        				silo = data.silos[i];
        				navButton = new HorizontalNavSection(silo, selectedSiloId);
        				navSections.push(navButton);
        				region.appendChild(navButton.element);
        			}
        		}
        		EventManager.subscribe(null, 'onNavSectionActivation', setNavigationState);
        		return region;
        	},
        	getHorizontalNavElement = function(){
        		return horizontalNav;
        	},
        	renderSearchBar = function () {
                search = new Search();
                search.populate(searchData);
        	},
        	render = function (_docFrag) {			 
        		var docFrag = _docFrag || $document.createDocumentFragment(),
    				 horizontalNavContainer, horizontalNavScrim, horizontalSubNav, topLevelNav, searchElement, searchSubmitButton, headerElement;
        		
        		if(typeof data !== 'undefined'){
        			horizontalNavScrim = $createElement('div', {id:'horizontalNavScrim','class': 'vgc-horizontalNavScrim'});
        			horizontalNav = $createElement('div',{'class':'vgc-horizontalNav', 'id':'horizontalNav', 'role':'navigation','aria-label':'main navigation'});   
        			horizontalNavContainer = $createElement('div',{'class':'vgc-horizontalNavContainer vgc-constrainedCentered'}, horizontalNav);
        	 		if(typeof data.collapsed !== 'undefined' && typeof searchData !== 'undefined' ){
        				collapsedNavigation = buildCollapsedNavigation(data.collapsed);
        				renderSearchBar();
            			searchElement = search.getBar('horizontalNav');
            			searchSubmitButton = search.getSubmitButton();
            			EventManager.addEvent(searchSubmitButton, 'click keydown', function(evt){
            				EventManager.dispatch("SearchActivated");
            			});
        				if(typeof collapsedNavigation !== 'undefined' && typeof searchElement !== 'undefined'){
        					collapsedNavigation.appendChild(searchElement);
        					horizontalNavContainer.appendChild(collapsedNavigation);
        				}
        			}
        			if(typeof data.silos !== 'undefined'){
        				topLevelNav = buildTopLevelNav(data.silos);
        				if(typeof topLevelNav !== 'undefined'){
        					horizontalNavContainer.appendChild(topLevelNav);        					
        				}
        			}
        			horizontalNavElement = horizontalNav;
        			docFrag.appendChild(horizontalNav);
        			docFrag.appendChild(horizontalNavScrim);
        		}
                return docFrag;
            },
            populate = function (horizontalNavData, _selectedSiloId, _searchData) {
            	data = horizontalNavData;
            	selectedSiloId = _selectedSiloId;
            	searchData= _searchData;
            };
        return {
            render: render,
            populate: populate,
            getHorizontalNavElement:getHorizontalNavElement
        };
    }]);
}(VGC));
/*globals VGC:true */
(function (VGC) {
    'use strict';
    var app = VGC.app('globalHeaderFooter');

    app.module('HorizontalNavSection', ['$bind', '$class', '$createElement', '$document', '$measurements', '$window', 'EventManager', 'HorizontalSubNav','$keyCodes', function ($bind, $class, $createElement, $document, $measurements, $window, EventManager, HorizontalSubNav,$keyCodes) {

	var linkIndex = 0,
	shouldShowScrim;
    	
    	function HorizontalNavSection(_silo, _selectedSiloId){
    		this.silo = _silo;
    		this.isSelectedSilo = this.silo.id === _selectedSiloId;
    		this.element = this.render(this.silo);
    		this.subNav = this.renderSubNav(this.silo);
    		this.anchor = this.element.getElementsByTagName('a')[0];
    		this.active = false;
    		
    		if(typeof this.subNav !== 'undefined' && typeof this.subNav.element !== 'undefined'){
    			this.anchor.setAttribute('role','button');
    			this.anchor.setAttribute('tabindex','0');
    			this.anchor.setAttribute('aria-expanded','false');
    			this.anchor.setAttribute('aria-haspopup','true');    		
    			
    			this.element.appendChild(this.subNav.element);
    			$class.add(this.element, 'vgc-hasSubNav');
    			var links = this.element.getElementsByTagName('a');
    			for(var i = 0; i < links.length; i++){
    				EventManager.addEvent(links[i], 'keydown', $bind(this.movefocus, this));
    			}
    		}else if(typeof this.element !== 'undefined'){
    			this.element.getElementsByTagName('a')[0].setAttribute('href', this.silo.href);
    		}
    		this.pendingActivationID;
    		EventManager.addEvent(this.element, 'click', $bind(this.onKeyDown, this));
    		EventManager.addEvent(this.element, 'keydown', $bind(this.onKeyDown, this));    		
    		EventManager.addEvent(this.element, 'mouseover', $bind(this.onRollOver, this));
    		EventManager.addEvent(this.element, 'mouseout', $bind(this.onRollOut, this));
    	};
    	
    	function toggleScrim() {
    	    var horizontalNavScrim = $document.getElementById('horizontalNavScrim'),
    	    	scrimClasses = 'vgc-subNavOpen vgc-horNavScrimOpen';
    	    
    	    if (shouldShowScrim) {
    		$class.add(horizontalNavScrim, scrimClasses);
    	    } else {
    		$class.remove(horizontalNavScrim, scrimClasses);
    	    }
    	};
    	
    	HorizontalNavSection.prototype.alignSubNav = function(){
    		var dimensions = $measurements.getElementBounds(this.element),
    			totalWidth = $measurements.getElementBounds($document.getElementById('vgc-horizontalNavContent'));
    		if(dimensions.x + dimensions.width / 2 > dimensions.x + totalWidth.width / 2 && $class.has(this.subNav.element, 'columns-1') !== true){
    			$class.add(this.subNav.element, 'vgc-right-aligned');
    		}
    	};
    	
    	HorizontalNavSection.prototype.render = function(silo){
    		var a, label, span, element;
    		if(typeof silo !== 'undefined'){
				element = $createElement('li', {'class':'vgc-menuItemContainer'});
				a = $createElement('a', {'class':'vgc-menuItem'}, element);
				label = $document.createTextNode(silo.name);
				if(typeof silo.linkLists !== 'undefined'){
					span = $createElement('span', {'class':'vgc-menuItemLabel'}, a);
					span.appendChild(label);
				}else{
					a.appendChild(label);
				}
				
				if(this.isSelectedSilo){
					$class.add(a, 'vgc-currentLocation');
				}
    		}
    		return element;
    	};
    	
    	HorizontalNavSection.prototype.renderSubNav = function(silo){
    		var subNav;
    		if(typeof silo.linkLists !== 'undefined' && silo.suppressLinkList !== true){
    			subNav = new HorizontalSubNav(silo);
    			$window.setTimeout($bind(this.alignSubNav, this), 1000);
    		}
    		return subNav;
    	};
    	
    	HorizontalNavSection.prototype.open = function(){
    		this.active = true;
		$class.add(this.anchor, 'active');
			
		if(this.subNav){
		    $class.add(this.element, 'vgc-subNavOpen');
		    $class.add(this.subNav.element, 'vgc-activeSubNav');
		    toggleScrim();
		    this.anchor.setAttribute('aria-describedby','selectedSiloOffscreenLabel');
		}
    	};
    	
    	HorizontalNavSection.prototype.close = function(){
    		this.active = false;
		$class.remove(this.anchor, 'active');				
		$class.remove(this.element, 'vgc-activeSection');
		linkIndex = 0;
		if(this.subNav){
		    toggleScrim();
		    $class.remove(this.element, 'vgc-subNavOpen');
		    $class.remove(this.subNav.element, 'vgc-activeSubNav');
		    this.anchor.setAttribute('aria-describedby','');
		}
    	};   	
    
    	HorizontalNavSection.prototype.notifyOfSectionActivation = function(evt){
    		var event = EventManager.createEvent('onNavSectionActivation');
    			event.data = this;
    		if(evt) {
    			EventManager.stopPropagation(evt);
    		}
    		EventManager.dispatch(event);
    	};
    	  	    	
    	HorizontalNavSection.prototype.onKeyDown = function(evt){
    	    var eventTarget = EventManager.getTarget(evt);
    	   
    	    if(typeof eventTarget !== 'undefined' && eventTarget.getAttribute('href') === null){    			
    	    	if(evt.type === 'click' || evt.keyCode === $keyCodes.ENTER || evt.keyCode === $keyCodes.SPACE || evt.keyCode === $keyCodes.ESC ){
    	    		if(evt.type !== 'click'){
    	    			EventManager.stopPropagation(evt);
    	    			EventManager.preventDefault(evt);
    	    		}					
    	    		if( $class.has(eventTarget,'active') || evt.keyCode === $keyCodes.ESC ){
    	    			this.close();
    	    			$window.clearTimeout(this.pendingActivationID);
    	    			eventTarget.setAttribute('aria-expanded','false');
    	    			eventTarget.focus();
    	    		}else{
    	    			this.pendingActivationID = $window.setTimeout($bind(this.notifyOfSectionActivation, this), 200);	    					
    	    			eventTarget.setAttribute('aria-expanded','true');
    	    			eventTarget.focus();
    	    		}
    	    	}  
    	    	if((evt.shiftKey === true && evt.keyCode === $keyCodes.TAB) && $class.has(eventTarget, 'active')){	    			
    	    		$window.clearTimeout(this.pendingActivationID);
    	    		eventTarget.setAttribute('aria-expanded','false');
    	    		this.close();
    	    	}
    	    }	
    	};
    	
    	HorizontalNavSection.prototype.onRollOver = function(evt){
    	    if (typeof this.subNav !== 'undefined') {
    		shouldShowScrim = true;
    	    }
    	    $window.clearTimeout(this.pendingCloseId);
    	    this.pendingActivationID = $window.setTimeout($bind(this.notifyOfSectionActivation, this, evt), 200);
    	};
    	
    	HorizontalNavSection.prototype.onRollOut = function(evt){
    	    shouldShowScrim = false;
    	    $window.clearTimeout(this.pendingActivationID);
    	    this.pendingCloseId = $window.setTimeout($bind(this.close, this, evt), 200);
    	};
    	
    	HorizontalNavSection.prototype.movefocus = function(event){ 
    		var allLinks,linkCount,menuTab = this.element.getElementsByTagName('a')[0];
    		if ($class.has(menuTab, 'active') && (event.keyCode === $keyCodes.DOWN_ARROW || event.keyCode === $keyCodes.UP_ARROW)) {
            	EventManager.preventDefault(event);
            	allLinks = this.element.getElementsByTagName('a');
                linkCount = allLinks.length;
                if (event.keyCode === $keyCodes.DOWN_ARROW) {
                	linkIndex = (linkIndex + 1) % linkCount;
                	if(linkIndex === 0){
                    	this.close();
                    }
                } else if (event.keyCode === $keyCodes.UP_ARROW) {
                	linkIndex = (linkCount + linkIndex - 1) % linkCount;
                }
                allLinks[linkIndex].focus();
            }else if(event.keyCode === $keyCodes.ESC){
            	linkIndex = 0;
            }
    	};

    	return HorizontalNavSection;
    }]);

}(VGC));
/*globals VGC:true */
(function (VGC) {
    'use strict';
    var app = VGC.app('globalHeaderFooter');

    app.module('HorizontalSubNav', ['$bind', '$class', '$document', '$createElement', '$measurements', '$window', 'CallToActionBar', 'EventManager','$keyCodes','$arrayIndexOf', function ($bind, $class, $document, $createElement, $measurements, $window, CallToActionBar, EventManager, $keyCodes, $arrayIndexOf) {
    	var children = [];
    	function HorizontalSubNav(_silo){    		
    		this.silo = _silo;
    		this.element = this.render(this.silo);
    		this.callToActionBar = this.renderCallToActionBar(this.silo);
    		if(typeof this.callToActionBar !== 'undefined' && typeof this.callToActionBar.element !== 'undefined'){
    			this.element.appendChild(this.callToActionBar.element);
    		}
    		
    		if($class.has(this.element, 'columns-1')){
    			$window.setTimeout($bind(this.updateParentPositioning, this), 200);    			
    		}
    		
    		if(typeof this.callToActionBar !== 'undefined' && typeof this.callToActionBar.element !== 'undefined'){
	    		children = this.callToActionBar.element.children;
		    	if(typeof children !== 'undefined' && children !== null){
		    		this.callToActionBar.lastActionElement.push(children[children.length-1].lastChild.lastChild);
		    	}  
    		}
    	}
    	
    	HorizontalSubNav.prototype.updateParentPositioning = function(){
    		var index=-1;
    		if(this.element.parentNode){
    			$class.add(this.element.parentNode, 'vgc-floatingSubnav');
    			
    			if(typeof this.callToActionBar !== 'undefined' && typeof this.callToActionBar.element !== 'undefined'){
	    			children = this.callToActionBar.element.children;    			
	    			if(typeof children !== 'undefined' && children !== null){
		    			index = $arrayIndexOf(this.callToActionBar.lastActionElement,children[children.length-1].lastChild.lastChild);
		    			if(index >= 0){
		    				this.callToActionBar.lastActionElement.splice(index,1);
		    			}
		    		}     			
	    			this.callToActionBar.reverseButtonAndLinkOrder();
	    			children = this.callToActionBar.element.children;
	    			if(typeof children !== 'undefined' && children !== null){
	    				this.callToActionBar.lastActionElement.push(children[children.length-1].lastChild.lastChild);
	    			}
    			}
    		}
    	};
   
    	HorizontalSubNav.prototype.addToSiloGroup =function(siloGroup,siloSubGroup){
    		var i = 0,
    			appendBreakPoint=false,
    			content= siloSubGroup.content;
    		if(siloGroup.length>=1){
    			appendBreakPoint = true;
    		}
    		for(i;i<content.length;i++){
    			if(i==0 && appendBreakPoint){
    				content[i].breakBefore=true;
    			}
    			siloGroup.push(content[i]);
    		}
    	},
    	HorizontalSubNav.prototype.buildSiloGroup =function(linkedListGroup){
			var linkedListsGroupCount= linkedListGroup.length,
				siloGroupContent={group:[],hasContentPages:false},
    		    siloGroup =[],
    		    siloSubGroup,
    		    linkList=[],
    		    x=0;
			for(x=0;x<linkedListsGroupCount;x++){
				linkList = linkedListGroup[x];
				siloSubGroup = this.buildSiloSubGroup(linkList);
				if(siloSubGroup.hasContentPages === true){
					siloGroupContent.hasContentPages=siloSubGroup.hasContentPages;
				}
				this.addToSiloGroup(siloGroup,siloSubGroup);
			}
			siloGroupContent.group=siloGroup;
			return siloGroupContent;
    	},
    	HorizontalSubNav.prototype.buildSiloSubGroup =function(linkList){
    		var siloGroup ={content:[],hasContentPages:false};
    		var mergedContent = [];
    		if(linkList.subOverview){
    			linkList.subOverview.isHeader = true; 
    			mergedContent.push(linkList.subOverview);
    		}
    		if(linkList.contentPages){
    			siloGroup.hasContentPages = true;
    			for(var i=0;i<linkList.contentPages.length;i++){
    				mergedContent.push(linkList.contentPages[i]);
    			} 
    		}
    		siloGroup.content = mergedContent;
			return siloGroup;
    	},
    	HorizontalSubNav.prototype.setContainerClass = function(addToTopSection,t){
    		var className = 'vgc-horizontalSubNav columns-' + (t);
    		if(addToTopSection){
    			className = 'vgc-horizontalSubNav columns-' + (t-1);
    		}
    		return className;
    	},
        HorizontalSubNav.prototype.render = function(silo){
        	var i = 0,
        		t = silo.linkLists.length, 
        		hasContentPages = false,
        		addToTopSection =false,
        		linkList, siloGroupContent,container, className, subNavRow, listElement,children,linkedListGroup;
        	if(t > 0){
        		linkList = silo.linkLists[0][0];
        		if(linkList.subOverview && linkList.subOverview.overview){
        			addToTopSection = true;
        		}
        		className = this.setContainerClass(addToTopSection,t);
        		container = $createElement('div', {'class':className});
        		subNavRow = $createElement('div', {'class':'vgc-topSection'}, container);
        		if(addToTopSection){
        			siloGroupContent = this.buildSiloGroup(silo.linkLists[0]);
        			listElement = this.createAndAddList(siloGroupContent.group);
        			subNavRow.appendChild(listElement);
        			i=1;
        		}
        		subNavRow = $createElement('div', {'class':'vgc-navigationSection'}, container);
        		for(i; i<t; i++){
        			linkedListGroup= silo.linkLists[i];
        			siloGroupContent = this.buildSiloGroup(linkedListGroup);
        			if(siloGroupContent.hasContentPages){
            			hasContentPages=siloGroupContent.hasContentPages;
        			}
        			listElement = this.createAndAddList(siloGroupContent.group);
        			if(typeof listElement !== 'undefined'){
            			subNavRow.appendChild(listElement);
            		}
	        	}
        		
        		if(hasContentPages === false){
        			this.convertOverviewsToList(container, subNavRow, t - 1);        			
        		}
        		children = subNavRow.childNodes;
        		$class.add(children[children.length - 1], 'vgc-last');
        	}
        	
        	return container;
        };
        HorizontalSubNav.prototype.convertOverviewsToList = function(container, subNavRow, columnCount){
        	var listItems = subNavRow.getElementsByTagName('li'),
				emptyUL = this.createAndAddList([]);
			while(listItems.length > 0){
				emptyUL.appendChild(listItems[0]);
			}
			subNavRow.innerHTML = '';
			$class.remove(container, 'columns-' + (columnCount));
			$class.add(container, 'columns-1');
			subNavRow.appendChild(emptyUL);
        };
        HorizontalSubNav.prototype.createAndAddList = function(list){
        	var i = 0,
        		t = list.length,
        		element = $createElement('ul', {'class':'vgc-navigationSubSection','role':'navigation'}), 
        		listItem, listItemData, link, className, linkSpan, linkAttributes;
        	if(list.length===1 && typeof list[0] === 'undefined'){
            		t=0;
        	}
        	for(i; i<t; i++){
        		linkAttributes = {'class':''};
        		
        		listItemData = list[i];
        		if(listItemData.isHeader === true){
        			element.setAttribute('aria-label',listItemData.label);
        			className = 'vgc-header';
        		}else if (listItemData.breakBefore ===true){
        			className = 'vgc-breakBefore';
        		}else{
        			className = ''; 
        		}
        		
        		listItem = $createElement('li', {'class':className}, element);
        		        		
        		
        		if(typeof listItemData.type !== 'undefined'){
        			linkAttributes['class'] = 'vgc-' + listItemData.type;
        		}
        		if(listItemData.disabled !== true){
        			linkAttributes['href'] = listItemData.href;        			
        		}else{
        			linkAttributes['class'] += ' vgc-disabled';
        		}
        		link = $createElement('a', linkAttributes, listItem);
        		
        		linkSpan = $createElement('span', {}, link);
        		linkSpan.appendChild($document.createTextNode(listItemData.label));
        		EventManager.addEvent(listItem,'keydown',this.navigationLinkEventHandler);
            	EventManager.addEvent(listItem,'click',this.navigationLinkEventHandler);
        	}
        	return element;
        };
        
        HorizontalSubNav.prototype.renderCallToActionBar = function(silo){
        	var ctaBar;
        	if(this.element && typeof silo.actionBar !== 'undefined'){
    			ctaBar = new CallToActionBar(silo.actionBar);
    		}
        	return ctaBar;
    	};

    	HorizontalSubNav.prototype.navigationLinkEventHandler = function(event){
        	var evt;        	
        	
        	if(event.keyCode === $keyCodes.ESC){        		
        		var evt = EventManager.createEvent('onNavSectionActivation');
        		evt.src = 'vgc-navigationSubSection';
    			evt.data = this;
    		if(event) {
    				EventManager.stopPropagation(event);
    				EventManager.preventDefault(event);
    			}
    				EventManager.dispatch(evt);
        	}
        };
        
    	return HorizontalSubNav;
    }]);

}(VGC));
/*globals VGC:true */
(function (VGC) {
    'use strict';
    var app = VGC.app('globalHeaderFooter');

    app.module('CallToActionBar', ['$document', '$class', '$createElement', '$keyCodes', 'EventManager', '$arrayIndexOf', '$bind', function ($document, $class, $createElement, $keyCodes, EventManager, $arrayIndexOf, $bind) {	
    	function CallToActionBar(_data){
    		this.data = _data;
    		this.element = this.render(this.data);
    		this.lastActionElement = [];
    	}
    	
    	CallToActionBar.prototype.reverseButtonAndLinkOrder = function(){
    		var i = 0, ul, child;
    		if(this.element){
    			ul = this.element.getElementsByTagName('ul')[0];
    			if(typeof ul !== 'undefined' && ul.childNodes.length > 2){
    				for(i; i<2; i++){    					
    					child = ul.removeChild(ul.firstChild);
	    				ul.appendChild(child);
    				}
    			}
    		}
    	};
    	
    	CallToActionBar.prototype.render = function(data){
    		var element, ul, buttons, links, isButton = true;
    		if(typeof data !== 'undefined'){
    			element = $createElement('div', {'class':'vgc-actionBar'});
    			ul = $createElement('ul', {'class':'vgc-actionBarLinks'});
    			buttons = this.createButtonsOrLinks(ul, data.buttons, isButton, 'vgc-actionBarButton', 'vgc-actionButton');
    			links = this.createButtonsOrLinks(ul, data.links, !isButton, 'vgc-actionBarLink');
    			element.appendChild(ul);
    		}
    		return element;
    	};
    	
        CallToActionBar.prototype.createButtonsOrLinks = function(container, data, isButton, linkClass, anchorClass){
        	var i = 0,
        		item,
        		ul,
        		li, a, span;
        	if(typeof data !== 'undefined'){
        		ul = container;
        		for(i; i<data.length; i++){
        			item = data[i];
        			li = $createElement('li', {'class':'vgc-actionBarItem ' + linkClass}, ul);
        			a = $createElement('a', {'href':item.href}, li);
        			if (typeof item.type !== 'undefined'){
        			    $class.add(a, 'vgc-' + item.type);
        			}
        			if (typeof anchorClass !== 'undefined'){
        			    $class.add(a, anchorClass);
        			}
        			if (!isButton) {
        			    span = $createElement('span', null, a);
        			    span.appendChild($document.createTextNode(item.label));        			
        			} else {
        			    a.appendChild($document.createTextNode(item.label));
        			}
        			EventManager.addEvent(li, 'keydown', $bind(this.actionBarLinksEvent, this));
	        		EventManager.addEvent(li, 'click', $bind(this.actionBarLinksEvent, this));
        		}
        	}
        	return ul;
        };
        
        CallToActionBar.prototype.actionBarLinksEvent = function(event){
        	var evt, eventTarget;
	        eventTarget = EventManager.getTarget(event);	        	
        	if(((event.keyCode === $keyCodes.TAB && event.shiftKey === false)  && typeof eventTarget !== 'undefined' && $arrayIndexOf(this.lastActionElement,eventTarget)>=0) || event.keyCode === $keyCodes.ESC){        		
        		evt = EventManager.createEvent('onNavSectionActivation');
        		evt.src = 'vgc-actionBarItem';
    			evt.data = this;
    		if(event) {
    				EventManager.stopPropagation(event);
    				EventManager.preventDefault(event);
    			}
    				EventManager.dispatch(evt);
        	}
        };
        
    	return CallToActionBar;
    }]);

}(VGC));
/*jslint browser:true*/
/*globals VGC:true*/
(function (VGC) {
	'use strict';
	var app = VGC.app('globalHeaderFooter');	

	app.module('toggleHeader', ['$document','$window', function ($document,$window) {
		var previousLocation,
			onFinishRender;
		function getAnimationFrame(callback){
			return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame||
			window.mozRequestAnimationFrame ||
			function(callback){
				window.setTimeout(callback,16);
			}
		};
		function getCurrentLocation(){
			return  $window.pageYOffset || $document.documentElement.scrollTop || $document.body.scrollTop;
		};
		function getLocationToScrollTo(element){
			return element.offsetTop;
		};
		function calculateNewPositon(start,percentageDone,distance,forward){
			var moveTo,
				newPosition;
			moveTo = percentageDone * distance;
			if(forward){
				newPosition=start + moveTo;
			}else{
				newPosition=start - moveTo;
			}
			return newPosition;
		};
		function animate(startTime,startPosition,duration,scrollToLocation,distance,forward){
			var currentTime = new Date().getTime(),
				timeElapsed = currentTime - startTime,
				percentageDone = Math.min((timeElapsed/duration),1),
				newYpos= calculateNewPositon(startPosition,percentageDone,distance,forward);
				if(percentageDone >=1){
					$window.scrollTo(0,scrollToLocation);
					onFinishRender.apply();
				}else{
					var animationFrame= getAnimationFrame();
					animationFrame(function(){
						animate(startTime,startPosition,duration,scrollToLocation,distance,forward)
					});
					$window.scrollTo(0,newYpos);
				}
		};
		function scrollTo(forward,element,duration,shouldAnimate,functionCallBack){
			var durationInMilliseconds = duration*1000,
				startTime = new Date().getTime(),
				startPosition = getCurrentLocation(),
				scrollToLocation =getLocationToScrollTo(element),
				distance;
			onFinishRender= functionCallBack;
			if(!shouldAnimate){
				durationInMilliseconds = 0;
			}
			if(forward){
				distance = scrollToLocation - startPosition;
				previousLocation=startPosition;
				animate(startTime,startPosition,durationInMilliseconds,scrollToLocation,distance,forward);
			}else{
				distance = startPosition - previousLocation;
				animate(startTime,startPosition,durationInMilliseconds,previousLocation,distance,forward);
			}
	};
		return {
			animatedScrollTo: scrollTo
		};
		
	}]);

}(VGC));
/*globals VGC:true */
(function (VGC) {
	'use strict';
	var app = VGC.app('globalHeaderFooter');
	app.module('siteNavTourCookieManager', ['$cookie', function ($cookie) {
		var get = function (configCookie) {
				return $cookie.get(configCookie);
			},
			set = function (configCookie, isNotExpirable) {
				if (isNotExpirable) {
					$cookie.set(configCookie, configCookie, 365, true);
				} else {
					$cookie.set(configCookie, configCookie, 0, true);
				}
			};
		return {
			set: set,
			get: get
		};
	}]);
}(VGC));
/*globals VGC:true */
(function (VGC) {
	'use strict';
    var app = VGC.app('globalHeaderFooter');
	app.module('siteNavTour', ['$document', '$window', '$bind', '$createElement', '$class', 'EventManager', '$keyCodes', '$select', 'siteNavTourCookieManager', 'webUsageProxy', 'linkTracking', 'detection',
	                           function ($document, $window, $bind, $createElement, $class, EventManager, $keyCodes, $select, siteNavTourCookieManager, webUsageProxy, linkTracking, detection) {
		var data = {},
			siteNavTourContainer,
			tourView,
			closeView,
			description,
			selectedButton,
			openScreen = null,
			transitionDelay = 500,
			cookieName,
			currentTourData,
			vgcGlobalHeader,
			urlRewrite,
			rewrite_prefix = '\\[',
			rewrite_suffix = '\\]',
			rewrite_pattern,
			webUsageNamespace = 'siteNavTour',
			displaySubSiloEvent = 'DISPLAY_SUBSILO_CONTENTS',
			sitePrefClosedEvent = 'SITE_PREFERENCES_CLOSED',
			sitePrefOpenEvent = 'openSetSitePreference',
			activeSiloClosedEvent = 'activeSiloClosed',
			onDocumentInteraction = function(evt){
				var event = evt || $window.event;
				if(openScreen){
					EventManager.stopPropagation(event);
				}
			},
			isSiteNavTourOpen = function() {
				return (openScreen !== null);
			},
			hasNoTourCookie = function(){
				return (typeof siteNavTourCookieManager.get(cookieName) === 'undefined');
			},	
			closeScreen = function (screen) {
				openScreen = null;
				$class.remove(screen, 'vgc-tourOpen');
			},
			showScreen = function (screen) {
				if (openScreen !== null) {
					closeScreen(openScreen);
					$window.setTimeout(function () {
						showScreen(screen);
					}, transitionDelay);
				} else {
					openScreen = screen;
					$class.add(screen, 'vgc-tourOpen');					
				}
			},
			openSiteNavTour = function() {
				if (hasNoTourCookie() && typeof tourView !== 'undefined') {
					$window.setTimeout(function () {
						showScreen(tourView);
						webUsageProxy.trackAction(webUsageNamespace + '.tourOpened');
					}, transitionDelay);
				}
			},
			setSelectedButtonClass = function(button) {
				if(typeof selectedButton !== 'undefined') {
					$class.remove(selectedButton, 'selected');
				}
				selectedButton = button;
				if(typeof selectedButton !== 'undefined') {
					$class.add(selectedButton, 'selected');
				}
			},
			clearSelectedButton = function () {
				setSelectedButtonClass(undefined);
				description.innerHTML = '';
			},
			closeSiteNavTour = function() {
				if(openScreen) {
					closeScreen(openScreen);
					clearSelectedButton();
				}
			},
			initEvents = function(){
				EventManager.addEvent(vgcGlobalHeader, 'mouseover', onDocumentInteraction);
				EventManager.addEvent(siteNavTourContainer, 'click', onDocumentInteraction);
				EventManager.subscribe(null, sitePrefClosedEvent, openSiteNavTour);
				EventManager.subscribe(null, sitePrefOpenEvent, closeSiteNavTour);
			},
			removeSiloPanelCloseListener = function() {
				EventManager.unsubscribe(null, activeSiloClosedEvent, siloPanelCloseListener);
			},
			siloPanelCloseListener = function (event) {
				clearSelectedButton();
				if(currentTourData) {
					$class.remove(vgcGlobalHeader, currentTourData.id);
				}
				removeSiloPanelCloseListener();
			},
			attachSiloPanelCloseListener = function() {
				EventManager.subscribe(null, activeSiloClosedEvent, siloPanelCloseListener);
			},			
			rewriteURLs = function(text) {
				if (typeof urlRewrite !== 'undefined') {
					for(var i = 0; i < urlRewrite.length; i++) {
						rewrite_pattern = rewrite_prefix + urlRewrite[i].site + rewrite_suffix;
						text = text.replace(new RegExp(rewrite_pattern, 'g'), urlRewrite[i].href);
					}
				}
				return text;
			},
			checkAndAppendChild = function(parentElement, childElement) {
				if (typeof childElement !== 'undefined') {
					parentElement.appendChild(childElement);
				}
			},
			sendTrackLink = function (event) {
				webUsageProxy.trackLink(event, EventManager.getTarget(event), webUsageNamespace);
			},
			toggleDescription = function(buttonData) {
				var anchors, i;
				description.innerHTML = rewriteURLs(buttonData.description);
				anchors = description.getElementsByTagName('a');
				for (i = 0; i < anchors.length; i++) {
					EventManager.addEvent(anchors[i], 'click', sendTrackLink);
				}
			},
			openSubnavPanel = function(subPanelID){
				var customEvent = EventManager.createEvent(displaySubSiloEvent);
				customEvent.data.id = subPanelID || currentTourData.silo;
				$class.add(vgcGlobalHeader, currentTourData.id);
				EventManager.dispatch(customEvent);
			},			
			tourButtonHandler = function (buttonData, button, evt) {
				var event = evt || $window.event;
				if ((event.type === 'click' || event.keyCode === $keyCodes.ENTER)) {
					removeSiloPanelCloseListener();
					toggleDescription(buttonData);
					setSelectedButtonClass(button);
					if(currentTourData){
						$class.remove(vgcGlobalHeader, currentTourData.id);
					}
					currentTourData = buttonData;
					openSubnavPanel();
					webUsageProxy.trackAction(webUsageNamespace + '.selected.' + currentTourData.id);
					$window.setTimeout(attachSiloPanelCloseListener, 100);
				}
			},
			closeTourHandler = function (evt) {
				var event = evt || $window.event;
				if ((event.type === 'click' || event.keyCode === $keyCodes.ENTER)) {
					if(typeof closeView !== 'undefined') {
						showScreen(closeView);
					}
					else {
						closeScreen(openScreen);
					}
					EventManager.stopPropagation(event);
				} 
			},
			cancelButtonHandler = function (event) {
				if ((event.type === 'click' || event.keyCode === $keyCodes.ENTER) && typeof tourView !== undefined) {
					showScreen(tourView);
					$window.setTimeout(openSubnavPanel, transitionDelay*3);
				}
			},
			confirmButtonHandler = function (hideTourOption,event) {
				if ((event.type === 'click' || event.keyCode === $keyCodes.ENTER) && openScreen) {
					closeScreen(openScreen);

					EventManager.removeEvent($document, 'mouseover', onDocumentInteraction);
					if(currentTourData) {
						$class.remove(vgcGlobalHeader, currentTourData.id);
					}
					
					siteNavTourCookieManager.set(cookieName,hideTourOption.checked);
					webUsageProxy.trackAction(webUsageNamespace + '.checked.' + hideTourOption.checked);
				}
			},
			buildCloseButton = function () {
				var container = $createElement('div', {'class': 'vgc-siteNavTourCloseButton'}),
					a = $createElement('a', {'class': 'vgc-closeBtn vgc-large', 'href': 'javascript:void(0)', 'title': data.closeButtonTitle});
				EventManager.addEvent(a, 'click keyup', $bind(closeTourHandler, this));
				container.appendChild(a);
				return container;
			},
			buildCancelButton = function (button) {
				var cancelButton = $createElement('input', {'id': button.id, 'class': 'vgc-actionButton vgc-secondary', 'type': 'submit', 'value': button.label});
				EventManager.addEvent(cancelButton, 'click keyup', $bind(cancelButtonHandler, this));
				return cancelButton;
			},			
			buildConfirmButton = function (button,hideTourOption) {
				var confirmButton = $createElement('input', {'id': button.id, 'class': 'vgc-actionButton vgc-primary', 'type': 'submit', 'value': button.label});
				EventManager.addEvent(confirmButton, 'click keyup', $bind(confirmButtonHandler, this,hideTourOption));
				return confirmButton;
			},
			buildTourScreen = function (tourViewData) {
				var header  = $createElement('div', {'class': 'vgc-tourHeader'}),
					introPara = $createElement('p'),
					buttonContainer = $createElement('div'),
					button,
					i = 0;
				tourView  = $createElement('div', {'class': 'vgc-siteNavContent vgc-isCenterAligned'});
				description = $createElement('div', {'class': 'vgc-siteNavDescription'});
				header.innerHTML = tourViewData.header;
				introPara.innerHTML = tourViewData.content;
				for (i = 0; i < tourViewData.buttons.length; i+=1) {
					button = $createElement('a', {'id': tourViewData.buttons[i].id, 'href': 'javascript:void(0)', 'class': 'vgc-highlight'});
					button.innerHTML = tourViewData.buttons[i].label;
					EventManager.addEvent(button, 'click keyup', $bind(tourButtonHandler, this, tourViewData.buttons[i], button));
					buttonContainer.appendChild(button);
				}
				checkAndAppendChild(tourView,buildCloseButton());
				tourView.appendChild(header);
				tourView.appendChild(introPara);
				tourView.appendChild(buttonContainer);
				tourView.appendChild(description);
				return tourView;
			},
			buildCloseScreen = function (closeViewData) {
				var header  = $createElement('div', {'class': 'vgc-tourHeader'}),
					controlsDiv = $createElement('div', {'class': 'vgc-siteNavConfirmControls'}),
					hideTourLabel = $createElement('label'),
					hideTourSpan = $createElement('span'),
					hideTourOption = $createElement('input', {'type': 'checkbox', 'id': closeViewData.checkbox.id});
				closeView  = $createElement('div', {'class': 'vgc-siteNavContent vgc-isCenterAligned'});
				header.innerHTML = closeViewData.header;
				hideTourSpan.innerHTML =  closeViewData.checkbox.label;
				hideTourLabel.appendChild(hideTourOption);
				hideTourLabel.appendChild(hideTourSpan);
				
				controlsDiv.appendChild(hideTourLabel);
				checkAndAppendChild(controlsDiv,buildCancelButton(closeViewData.buttons[0]));
				checkAndAppendChild(controlsDiv,buildConfirmButton(closeViewData.buttons[1],hideTourOption));
				
				closeView.appendChild(header);
				closeView.appendChild(controlsDiv);
				return closeView;
			},
			run = function (showSitePref) {
				if (showSitePref !== 'true') {
					openSiteNavTour();
				}		
			},
			render = function (docFrag) {
				docFrag = docFrag || $document.createDocumentFragment();
				if(data && !detection.isMobileDevice()){
					vgcGlobalHeader = $select('#vgc-globalHeader')[0];
					siteNavTourContainer = $createElement('div', {'class': 'vgc-siteNavTour'});
					if (typeof data.tourView !== 'undefined') {
						checkAndAppendChild(siteNavTourContainer,buildTourScreen(data.tourView));
					}
					if (typeof data.closeView !== 'undefined') {
						checkAndAppendChild(siteNavTourContainer,buildCloseScreen(data.closeView));
					}
					if (typeof data.cookieName !== 'undefined') {
						cookieName = data.cookieName;
					}
					if (typeof data.urlRewrite !== 'undefined') {
						urlRewrite = data.urlRewrite;
					}
					initEvents();
					
					docFrag.appendChild(siteNavTourContainer);
					linkTracking(siteNavTourContainer, webUsageNamespace);
				}
				return docFrag;
			},
			populate = function (siteNavTourData) {
				data = siteNavTourData;
			};
		return {
			render: render,
			populate: populate,
			run: run,
			isSiteNavTourOpen: isSiteNavTourOpen
		};
	}]);
}(VGC));
/*globals VGC:true */
(function (VGC) {
	'use strict';
	var app = VGC.app('globalHeaderFooter');
	app.module('sitePreferenceCookieManager', ['$cookie', function ($cookie) {
		var configCookie = '_vgi_config',
			cookiePrefix = 'sp:',
			get = function () {
				return $cookie.get(configCookie);
			},
			set = function (selectedValue) {
				var currentCookieValue = get(),
					newVal = '',
					position = -1;
				if (typeof currentCookieValue === 'undefined') {
					newVal = cookiePrefix + selectedValue + ';';
				} else {
					position = currentCookieValue.indexOf(cookiePrefix);
					if (position > -1) {
						position = position + cookiePrefix.length;
						newVal = currentCookieValue.substring(0, position) + selectedValue + currentCookieValue.substring(position + 1, currentCookieValue.length);
					} else {
						newVal = currentCookieValue + cookiePrefix + selectedValue + ';';
					}
				}
				$cookie.set(configCookie, newVal, 2, true);
			};
		return {
			set: set,
			get: get
		};
	}]);
}(VGC));
/*globals VGC:true */
(function (VGC) {
	'use strict';
    var app = VGC.app('globalHeaderFooter');
	app.module('sitePreferences', ['$document', '$window', '$createElement', '$class', 'EventManager', '$keyCodes', '$select', 'sitePreferenceCookieManager', 'webUsageProxy', '$stringUtils', 'siteNavTour', function ($document, $window, $createElement, $class, EventManager, $keyCodes, $select, sitePreferenceCookieManager, webUsageProxy, $stringUtils, siteNavTour) {
		var data = {},
			sitePreference,
			sitePreferenceContainer,
			sitePreferenceRegion,
			selectedPreferenceYesNoInput,
			selectedPreferenceInput,
			noCookie,
			setCookie,
			positiveAcknowledgement,
			negativeAcknowledgement,
			currentSite = '',
			openScreen = null,
			siteList,
			transitionDelay = 10,
			transitionSpeed = 500,
			webUsageNamespace = 'sitePreference',
			closeScreen = function (screen) {
				openScreen = null;
				$class.remove(screen, 'vgc-sitePreferencesOpen');
			},
			showScreen = function (screen) {
				if (openScreen !== null) {
					closeScreen(openScreen);
					$window.setTimeout(function () {
						showScreen(screen);						
					}, transitionSpeed + transitionDelay);
				} else {
					openScreen = screen;
					$class.add(screen, 'vgc-sitePreferencesOpen');	
					
					if(screen.id==="welcome" && typeof selectedPreferenceYesNoInput!=='undefined'){
						selectedPreferenceYesNoInput.setAttribute('tabindex',0);
						$window.setTimeout(function () {								
							selectedPreferenceYesNoInput.focus();
						},transitionSpeed + transitionDelay);
					}
					if(screen.id==="selectPreference" && typeof selectedPreferenceInput!=='undefined'){
						selectedPreferenceInput.setAttribute('tabindex',0);
						$window.setTimeout(function () {								
							selectedPreferenceInput.focus();
						},transitionSpeed+transitionSpeed);
					}		
				}	
			},
			openSetCookie = function () {
				if(siteNavTour.isSiteNavTourOpen()) {
					$window.setTimeout(function () {
						showScreen(setCookie);						
					}, transitionSpeed + transitionDelay);
				}
				else {
					showScreen(setCookie);					
				}
				webUsageProxy.trackAction(webUsageNamespace + '.opened');	
			},
			formSubmitHandler = function (event) {
				var eventTarget = EventManager.getTarget(event),
					formid = eventTarget.getAttribute('data-formID'),
					radioButtons = eventTarget.elements,
					i = 0,
					selectedValue = '';
				EventManager.preventDefault(event);
				for (i = 0; i < radioButtons.length; i = i + 1) {
					if (radioButtons[i].checked) {
						selectedValue = radioButtons[i].value;
						sitePreferenceCookieManager.set(selectedValue);
					}
				}
				if (selectedValue === 'N') {
					closeScreen(openScreen);
					$window.setTimeout(function () {
						showScreen(negativeAcknowledgement);
					}, transitionSpeed);
				} else {
					if (selectedValue === 'Y') {
						selectedValue = currentSite;
					}
					positiveAcknowledgement.children[0].children[0].innerHTML = siteList[selectedValue];
					closeScreen(openScreen);
					$window.setTimeout(function () {
						showScreen(positiveAcknowledgement);
					}, transitionSpeed);
				}
				webUsageProxy.trackAction(webUsageNamespace + '.selected.' + siteList[selectedValue]);
			},
			attachFormSubmitListener = function (form) {
				EventManager.addEvent(form, 'submit', formSubmitHandler);
			},
			broadcastCloseSitePreference = function() {
				var customEvent = EventManager.createEvent('SITE_PREFERENCES_CLOSED');
				EventManager.dispatch(customEvent);
			},
			setFocusToPersonalInvestors = function(){
				var element = $select('#vgc-siteIndicatorLink')[0];
				if(typeof element !=='undefined'){
					element.setAttribute('tabindex', 0);
					element.focus();
				}
			},
			closeScreenHandler = function (event) {
				if ((event.type === 'click' || event.keyCode === $keyCodes.ENTER) && openScreen) {
					closeScreen(openScreen);
					broadcastCloseSitePreference();
					
				var element = EventManager.getTarget(event),
				      elementId = element.id;
					if(elementId==="closeSitePreference"){
						setFocusToPersonalInvestors();
					}
				}
			},			
			attachCloseScreen = function (button) {
				EventManager.addEvent(button, 'click', closeScreenHandler);
				EventManager.addEvent(button, 'keydown', closeScreenHandler);
			},
			buildCloseButton = function () {
				var container = $createElement('div', {'class': 'vgc-closeSitePreferences'}),
					a = $createElement('a', {'class': 'vgc-closeBtn vgc-large','id':'closeSitePreference','aria-label':data.closeButtonTitle, 'title': data.closeButtonTitle, 'href': 'javascript:void(0);'});
				attachCloseScreen(a);
				container.appendChild(a);
				return container;
			},
			buildSaveButton = function (label) {
				var button = $createElement('input', {'class': 'vgc-actionButton vgc-primary', 'type': 'submit', 'value': label});
				return button;
			},
			updateSelectedInput = function(event){				
				var eventTarget = EventManager.getTarget(event);
				if(eventTarget.checked ==='true' && (eventTarget.id==='Yes' || eventTarget.id==='No')){
					selectedPreferenceYesNoInput = eventTarget;
				}else{
					selectedPreferenceInput = eventTarget;
				}
			},
			attachInputChangeListener = function(input){
				EventManager.addEvent(input, 'change', updateSelectedInput);				
			},
			buildNoCookieScreen = function (noCookieData) {
				var legend = $createElement('legend'),
					span = $createElement('span'),
					i = 0,
					form = $createElement('form', {'role': 'form', 'data-formID': 'noCookieOption'}),
					fieldset = $createElement('fieldset'),
					input = {},
					label = {};
				noCookie = $createElement('div', {'class': 'vgc-noCookie vgc-sitePreferenceScreen', 'id': 'welcome'});
				span.innerHTML = noCookieData.content.replace('${currentSite}', '<strong>' + siteList[currentSite].toLowerCase() + '</strong>');
				legend.appendChild(span);
				fieldset.appendChild(legend);
				selectedPreferenceYesNoInput = '';
				for (i = 0; i < noCookieData.options.length; i = i + 1) {
					input = $createElement('input', {'type': 'radio', 'value': noCookieData.options[i].value, 'name': 'noCookieOption', 'id': noCookieData.options[i].label, 'class': 'vgc-radio'});
					label = $createElement('label', {'for': noCookieData.options[i].label});
					label.innerHTML = noCookieData.options[i].label;
					fieldset.appendChild(input);
					if (noCookieData.options[i].value === 'Y') {
						input.checked = true;
						input.value = currentSite;
						selectedPreferenceYesNoInput = input;
						
					}
					attachInputChangeListener(input);
					fieldset.appendChild(label);
				}
				
				fieldset.appendChild(buildSaveButton(noCookieData.buttonLabel));
				form.appendChild(fieldset);
				attachFormSubmitListener(form);
				noCookie.appendChild(form);
				noCookie.appendChild(buildCloseButton());
				return noCookie;
			},
			buildSetCookieScreen = function (setCookieData) {
				var p = $createElement('p', {'id': 'setSitePreferenceLabel'}),
					i = 0,
					labelId = '',
					descId ='',		
					ariaLabelValue ='',
					form = $createElement('form', {'role': 'form', 'data-formID': 'setCookieOption'}),
					ul = $createElement('ul', {'aria-labelledby': 'setSitePreferenceLabel'}),
					li = {},
					input = {},
					label = {};
				setCookie = $createElement('div', {'class': 'vgc-selectSitePreference vgc-sitePreferenceScreen', 'id': 'selectPreference'});
				p.innerHTML = setCookieData.content;
				form.appendChild(p);
				selectedPreferenceInput = '';
				for (i = 0; i < setCookieData.options.length; i = i + 1) {
					li = $createElement('li');
					
					if(typeof setCookieData.options[i].label !== 'undefined'){
						labelId = setCookieData.options[i].label.split(' ').join('_');
						descId = '';
						if(typeof setCookieData.options[i].description !== 'undefined'){
							descId = labelId+'_desc';
						}
						ariaLabelValue = labelId+' '+descId;
					}
					input = $createElement('input', {'type': 'radio', 'value': setCookieData.options[i].value,'aria-labelledby':ariaLabelValue, 'name': 'setCookieOption', 'id': setCookieData.options[i].label, 'class': 'vgc-radio'});
					label = $createElement('label', {'for': setCookieData.options[i].label,'id':labelId});
					label.innerHTML = setCookieData.options[i].label;
					li.appendChild(input);					
					
					if (setCookieData.options[i].value === data.preferredSite) {
						input.setAttribute('checked', 'true');
						selectedPreferenceInput = input;
					}else if(i===setCookieData.options.length-1 && (typeof selectedPreferenceInput === 'undefined' || selectedPreferenceInput === '')){						
						input.setAttribute('checked', 'true');
						selectedPreferenceInput = input;
					}
					attachInputChangeListener(input);
					li.appendChild(label);
					if (typeof setCookieData.options[i].description !== 'undefined') {
						p = $createElement('p',{'id':descId});
						p.innerHTML = setCookieData.options[i].description;
						li.appendChild(p);
					}
					ul.appendChild(li);
				}				
				form.appendChild(ul);
				form.appendChild(buildSaveButton(setCookieData.buttonLabel));
				attachFormSubmitListener(form);
				setCookie.appendChild(form);
				setCookie.appendChild(buildCloseButton());
				return setCookie;
			},
			buildPositiveAcknowledgementScreen = function (positiveAcknowledgementData) {
				var p = $createElement('p');
				positiveAcknowledgement = $createElement('div', {'class': 'vgc-positiveAcknowledgement vgc-sitePreferenceScreen', 'id': 'positiveAck'});
				p.innerHTML = positiveAcknowledgementData.content.replace('${selectedSite}', '<strong class="vgc-preferredSite">${selectedSite}</strong>');
				positiveAcknowledgement.appendChild(p);
				positiveAcknowledgement.appendChild(buildCloseButton());
				return positiveAcknowledgement;
			},
			buildNegativeAcknowledgementScreen = function (negativeAcknowledgementData) {
				var p = $createElement('p');
				negativeAcknowledgement = $createElement('div', {'class': 'vgc-negativeAcknowledgement vgc-sitePreferenceScreen', 'id': 'negativeAck'});
				p.innerHTML = negativeAcknowledgementData.content;
				negativeAcknowledgement.appendChild(p);
				negativeAcknowledgement.appendChild(buildCloseButton());
				return negativeAcknowledgement;
			},
			isSitePreferenceCookieSet = function () {
				return (typeof data.preferredSite !== 'undefined' && $stringUtils.trim(data.preferredSite) !== '');
			},
			run = function (showNoCookie) {
				if (data && showNoCookie === 'true' && !isSitePreferenceCookieSet()) {
					$window.setTimeout(function () {
						showScreen(noCookie);
					}, transitionDelay);
				}
			},
			render = function (docFrag) {
				docFrag = docFrag || $document.createDocumentFragment();
				if (data) {
					sitePreference = $createElement('div', {'class': 'vgc-sitePreferences','aria-live':'assertive'});
					if (typeof data.noCookieView !== 'undefined') {
						sitePreferenceContainer = $createElement('div', {'class': 'vgc-sitePreferencesContainer vgc-constrainedCentered'}, sitePreference);
						sitePreferenceRegion = $createElement('div', {'class': 'vgc-sitePreferencesRegion'}, sitePreferenceContainer);
						sitePreferenceRegion.appendChild(buildNoCookieScreen(data.noCookieView));
						sitePreferenceRegion.appendChild(buildSetCookieScreen(data.setCookieView));
						sitePreferenceRegion.appendChild(buildPositiveAcknowledgementScreen(data.positiveAcknowledgement));
						sitePreferenceRegion.appendChild(buildNegativeAcknowledgementScreen(data.negativeAcknowledgement));
						EventManager.subscribe(null, 'openSetSitePreference', openSetCookie);
					}
					docFrag.appendChild(sitePreference);
				}
				return docFrag;
			},
			populate = function (sitePreferencesData, site) {
				data = sitePreferencesData;
				if (data) {
					siteList = data.siteList;
				}
				currentSite = site;
			};
		return {
			render: render,
			populate: populate,
			run: run
		};
	}]);
}(VGC));
/*globals VGC:true */
(function (VGC) {
    'use strict';
    var app = VGC.app('globalHeaderFooter');

    app.module('internalOnly', ['$createElement', '$document', function ($createElement, $document) {

        var data,
        	renderMessage,
        	render = function (_docFrag) {    			
    			var docFrag = _docFrag || $document.createDocumentFragment(),
    				div, p;
    			if (data && null !== renderMessage && renderMessage === 'true') {
	    			div = $createElement('div', {'class': 'vgc-internalOnlyMessage'});
	    			p = $createElement('p');
	    			p.innerHTML = data.message;
	    			div.appendChild(p);
	    			docFrag.appendChild(div);
    			}
                return docFrag;
            },
            populate = function (internalOnlyData, renderIOMessage) {
            	data = internalOnlyData;
            	renderMessage = renderIOMessage;
            };

        return {
            render: render,
            populate: populate
        };
    }]);

}(VGC));
/*jslint browser:true*/
/*globals VGC:true, JSON:true, XMLHttpRequest:true*/
(function(VGC){
	'use strict';
	
	var base = VGC.app('globalHeaderFooter');
	
		base.module('dataSource', ['$ajax', '$AjaxRequestConfig', '$bind', '$document', '$arrayIndexOf', '$select', '$window', function($ajax, $AjaxRequestConfig, $bind, $document, $arrayIndexOf, $select, $window){
			var me = this,
				responseData,
				dataSource = {},
				dataIsLoaded = false,
				JSON_POLYFILL_LOCATION = 'https://static.vgcontent.info/web/common/json3/3.2.5/json3.js',
				callbacks = {},
				rootElement;
				
			
			function JSONIsAvailable(){
				var jsonAvailable = false;
				if($window['JSON']){
					jsonAvailable = true;
				}
				return jsonAvailable;
			}
			
			function onRequestComplete(success, data, loader){
				responseData = success ? JSON.parse(data) : data;
				dataIsLoaded = true;
				notifyOfLoad(success, data, loader);
			}
			
			function notifyOfLoad(success, data, loader){
				var url = loader.config.url,
					i,
					callbackList,
					callback;
				if (url.indexOf('?') > -1) {
					url = url.substring(0, url.indexOf('?'));
				}
				callbackList = callbacks[url];
				for(i = 0; i<callbackList.length; i++){
					callback = callbackList[i];
					callback(success, responseData);
				}
				callbacks[loader.config.url] = [];
			}
			
			function makeRequest(url, callback){
				var newRequest = false,
					config,
					urlID = url;
				if (urlID.indexOf('?') > -1) {
					urlID = urlID.substring(0, urlID.indexOf('?'));
				}
				if(!callbacks[urlID]){
					callbacks[urlID] = [];
					newRequest = true;
				}
				
				if($arrayIndexOf(callbacks[urlID], callback) === -1){
					callbacks[urlID].push(callback);
				}else{
					newRequest = false;
				}
				if(newRequest){
					config = new $AjaxRequestConfig();
					config.url = url;
					config.callback =  $bind(onRequestComplete, me);
					config.forceXHR = rootElement.getAttribute('data-vgc-data-forceXHR') === 'true';
					config.loggedOn = rootElement.getAttribute('data-logged-on') === 'true';
					$ajax(config);
				}
			}
			
			function onJSONPolyfillLoaded(url, callback){
				if(JSONIsAvailable()){
					makeRequest(url, callback);
				}
			}
			
			function createJSONScriptElement(){
				var script = $document.createElement('script');				
				$document.getElementsByTagName('head')[0].appendChild(script);				
				script.id = 'JSONPolyfill';
				script.src = JSON_POLYFILL_LOCATION;
				return script;
			}
			
			function loadData(url, callback){
				var script;
				if (JSONIsAvailable()){
					if(dataIsLoaded){
						callback(true, responseData);
					}else{
						makeRequest(url, callback);
					}
					
				}else{
					script = createJSONScriptElement();
					script.onload = script.onreadystatechange = $bind(onJSONPolyfillLoaded, this, url, callback);		
				}
			}
			function readFromLocal(json_str, callback){
				if (JSONIsAvailable()){
					responseData = dataIsLoaded ? responseData : JSON.parse(json_str);
					dataIsLoaded = true;
					callback(true, responseData);
					
				}else{
					var script = createJSONScriptElement();
					script.onload = script.onreadystatechange = $bind(onRequestComplete, this, callback, true, json_str);
				}
			}
			
			function findSilo(key, obj){
				var result = '', prop;
				if(obj && key !== ''){
					for(prop in obj){
						if(prop.indexOf(key) > -1 && obj.hasOwnProperty(prop)){
							result = obj[prop];
							break;
						}
					}
				}
				return result;
			}
			
			dataSource.load = function(element, callback){
            	var resourceValue,
            		refrencedValue;
            	rootElement = element;
            	if(element.getAttribute('data-vgc-data-ref')){
	        		resourceValue = unescape(element.getAttribute('data-vgc-data-ref'));
	        		refrencedValue = $select(resourceValue)[0];
	        		if(typeof refrencedValue !== 'undefined'){
		        		this.load($select(resourceValue)[0], callback);
	        		}
	        		
	        	}else if(element.getAttribute('data-vgc-data-json')){
	        		resourceValue = unescape(element.getAttribute('data-vgc-data-json'));
	        		readFromLocal(resourceValue,  callback);
	        		
	        	}else if(element.getAttribute('data-vgc-data-endpoint')){
	        		resourceValue = element.getAttribute('data-vgc-data-endpoint');
	        		loadData(resourceValue, callback);
	        	}
			};
			
			dataSource.getComponentData = function(componentName){
				var data = responseData[componentName];
				if(data && data.sharedResource){
					data = responseData[data.sharedResource];
				}
				return data || undefined;
			};
			
			dataSource.getActiveSilo = function(element){
				var primaryKey = element.getAttribute('data-vgc-primary-silo') || '',
					secondaryKey = element.getAttribute('data-vgc-secondary-silo') || '',
					mappings = this.getComponentData('taxonomyMapping'),
					activeSilo = '';
				if(mappings){
					activeSilo = findSilo(secondaryKey, mappings.secondary);
					if(activeSilo === ''){
						activeSilo = findSilo(primaryKey, mappings.primary);
					}
					if(activeSilo === ''){
						activeSilo = primaryKey;
					}
				}
				return activeSilo;
			};
			
			
			return dataSource;
		}]);
		
}(VGC));
/*jslint browser:true*/
/*globals VGC:true */
(function (VGC) {
    'use strict';

    var app = VGC.app('globalHeaderFooter');

	app.module('linkTracking', ['EventManager', '$document', function (EventManager, $document) {
		return function (element, nameSpace) {
			var getAnchorSrc = function (e) {
					var target = EventManager.getTarget(e);
					if (target.tagName.toLowerCase() === 'a') {
						return target;
					} else if (target.parentNode && target.parentNode.tagName.toLowerCase() === 'a') {
						return target.parentNode;
					} else if (target.parentElement && target.parentElement.tagName.toLowerCase() === 'a') {
						return target.parentElement;
					}
				},
				containsCurrentNamespace = function (dataObj) {
					var i = 0;
					for (i = 0; i < dataObj.namespace.length; i = i + 1) {
						if (dataObj.namespace[i] === nameSpace) {
						    return true;
						}
					}
				},
				sendEvent = function (e, dataObj) {
					var ltData = e.data || dataObj;
					if (typeof ltData === 'undefined') {
						ltData = {
							namespace: [],
							originalSrc: getAnchorSrc(e)
						};
					}
					if (!containsCurrentNamespace(ltData)) {
						ltData.namespace.push(nameSpace);
						e.data = ltData;
					}
				};
			EventManager.addEvent(element, 'click touchstart', sendEvent);
		};
	}]);

	app.module('linkReporting', ['EventManager', 'webUsageProxy', '$window', '$hash', '$class', function (EventManager, webUsageProxy, $window, $hash, $class) {
		return function (element) {
			var getNameSpace = function (nsList) {
					var namespace = '', i = 0;
					for (i = nsList.length - 1; i >= 0; i = i - 1) {
					    namespace = namespace + nsList[i] + '.';
					}
					return namespace.substr(0, namespace.length - 1);
				},
				getTrackingID = function (elem, e, dataObj) {
					var href = elem.href,
						text = null,
						className = elem.className;
					if (elem.textContent) {
						text = elem.textContent;
					} else {
						text = elem.innerText;
					}
					text = text.replace(/[\t\n]/g, '').replace(/\s/g, '-').replace(/[^a-zA-Z0-9\-]/g, '').substring(0, 16);
					href = href.substring(href.indexOf('/', 8));
					return getNameSpace(dataObj.namespace) + '.' + text  + '.' + $hash.calculate(href + text + className);
				},
				trackLink = function (e, dataObj) {
					var anchor = dataObj.originalSrc,
						linkName = getTrackingID(anchor, e, dataObj);
					webUsageProxy.trackLinkUsage(linkName, $class.has(anchor, 'externalSiteIconLink'));
				},
				handleClickEvent = function (e) {
					var dataObj = e.data;
					if (typeof dataObj !== 'undefined' && typeof dataObj.originalSrc !== 'undefined') {
						trackLink(e, dataObj);
					}
				};
			EventManager.addEvent(element, 'click touchstart', handleClickEvent);
			EventManager.subscribe(null, 'ghwebtrends', handleClickEvent);
		};
	}]);
}(VGC));


/*jslint browser:true*/
/*globals dcsMultiTrack, VGC*/

(function (VGC) {
    'use strict';

    var app = VGC.app('globalHeaderFooter');
	app.module('webUsageFactory', ['$window', '$document', '$cookie', function ($window, $document, $cookie) {
		var noop = function () {
			return;
		};
		return function () {
			if (typeof $window.WebTrends !== 'function') {
				return {
					dcsGetId: noop,
					dcsCollect: noop
				};
			}
			// Override document.write mechanism with DOM manipulation mechanism so function can be called after DOM ready
			$window.WebTrends.prototype.dcsGetId = function () {
                var script;
                if (this.enabled && !$cookie.has(this.fpc) && !$cookie.has('WTLOPTOUT')) {
                    script = $document[0].createElement('script');
                    script.src = "http" + ($window.location.protocol.indexOf('https:') === 0 ? 's' : '') + "://" + this.domain + "/" + this.dcsid + "/wtid.js";
                    $document[0].documentElement.firstChild.appendChild(script);
                }
            };
            // Disable automatic link tracking for links that contain hashes.
            $window.WebTrends.prototype.dcsAnchor = noop;
			return new $window.WebTrends();
		};
	}]);

}(VGC));


/*jslint browser:true*/
/*globals VGC:true, dcsMultiTrack*/

(function (VGC) {
    'use strict';

    var app = VGC.app('globalHeaderFooter');

	app.module('webUsageProxy', ['$window', '$document', 'windowData', 'webUsageFactory', '$createElement', 'EventManager', function ($window, $document, windowData, webUsageFactory, $createElement, EventManager) {
		var webUsageProxy = { };
		webUsageProxy.getPageID = function () {
			if (typeof $document.getElementsByName('DCSext.pageid')[0] !== 'undefined') {
				return $document.getElementsByName('DCSext.pageid')[0].content + $window.location.hash.replace('#', '');
			}
			return '';
		};

		webUsageProxy.trackLinkUsage = function (linkName, isExternal) {
			webUsageProxy.clearValues();
			if (isExternal) {
				if (typeof dcsMultiTrack !== 'undefined') {
					dcsMultiTrack('DCS.Link', linkName, 'DCS.LinkLocation', webUsageProxy.getPageID());
				}
			} else {
				windowData.setWindowName(linkName + ':' + webUsageProxy.getPageID());
			}
		};

		webUsageProxy.trackActionUsage = function (linkName, uri) {
			webUsageProxy.clearValues();
			if (typeof dcsMultiTrack !== 'undefined') {
				dcsMultiTrack('DCS.Link', linkName, 'DCS.LinkLocation', webUsageProxy.getPageID(), 'DCS.dcsuri', uri);
			}
		};

		webUsageProxy.trackAction = function (namespace) {
			var linkName = namespace,
				pathname = $window.location.pathname,
				uri = pathname + (pathname.lastIndexOf('/') === pathname.length - 1 ? '' : '/') + $window.location.hash.replace('#', '') + '.' + linkName;
			webUsageProxy.trackActionUsage(linkName, uri);
		};

		webUsageProxy.trackLink = function (event, element, namespace) {
			var src = null,
				target = EventManager.getTarget(event),
				wtEvent;
			if (target.tagName.toLowerCase() === 'a') {
				src = target;
			} else if (target.parentElement && target.parentElement.tagName.toLowerCase() === 'a') {
				src = target.parentElement;
			} else if (target.parentNode && target.parentNode.tagName.toLowerCase() === 'a') {
				src = target.parentNode;
			}
			
			wtEvent = EventManager.createEvent('ghwebtrends');
			wtEvent.data = {
					namespace: [],
					originalSrc: src
				};
			if (typeof namespace !== 'undefined') {
				wtEvent.data.namespace[0] = namespace;
			}
			EventManager.dispatch(wtEvent);
		};

		webUsageProxy.clearValue = function (nameSpace, attribute) {
			if ($window._tag && $window._tag[nameSpace] && $window._tag[nameSpace][attribute]) {
				$window._tag[nameSpace][attribute] = "";
			}
		};

		webUsageProxy.clearValues = function () {
			webUsageProxy.clearValue('DCSext', 'Link');
			webUsageProxy.clearValue('DCSext', 'LinkLocation');
			webUsageProxy.clearValue('DCSext', 'dcsuri');
			webUsageProxy.clearValue('WT', 'ti');
			webUsageProxy.clearValue('DCSext', 'sharebtn');
			webUsageProxy.clearValue('DCSext', 'sharemedia');
		};

		webUsageProxy.addMetaTag = function (name, value) {
			name = name.indexOf('WT.') === 0 ? name : 'DCSext.' + name;
			var metaTag = $document.getElementsByName(name)[0];
			if (typeof metaTag === 'undefined') {
				metaTag = $createElement('meta', {'name': name, 'content': value});
				$document.getElementsByTagName('head')[0].appendChild(metaTag);
			} else {
				metaTag.content = value;
			}
		};

		webUsageProxy.addMetaTagsLinkLocation = function () {
			var windowName = windowData.getWindowName(),
				link = null,
				linkLocation = null;
			if (typeof windowName === "string" && windowName.indexOf(":") > -1) {
				link = windowName.split(":")[0].replace("__sWU", "");
				linkLocation = windowName.split(":")[1].replace("__eWU", "");
				webUsageProxy.addMetaTag('Link', link);
				webUsageProxy.addMetaTag('LinkLocation', linkLocation);
			}
		};

		webUsageProxy.clearLogonMetaTag = function () {
			var logonMetaTag = $document.getElementsByName('WT.z_lv1')[0];
			if (typeof logonMetaTag !== 'undefined' && logonMetaTag.content === "1") {
				logonMetaTag.content = '';
			}
			webUsageProxy.clearValue('WT', 'z_lv1');
		};
		return webUsageProxy;
	}]);

}(VGC));


/*jslint browser:true*/
/*globals VGC*/

(function (VGC) {
    'use strict';

    var app = VGC.app('globalHeaderFooter');
	app.module('windowData', ['$window', function ($window) {
		var wuPrefix = '__s',
			wuSuffix = '__e',
			wuName = 'WU',
			windowData = {
				setWindowName: function (value) {
					if ($window.name.indexOf(wuPrefix) >= 0) {
						this.removeWindowData(wuName);
					}
					$window.name = $window.name + wuPrefix + wuName + value + wuSuffix + wuName;
				},

				removeWindowData: function (name) {
					var regex = new RegExp(wuPrefix + name + "(.*)" + wuSuffix + name);
					$window.name = $window.name.replace(regex, "");
				},

				getWindowName: function () {
					return $window.name;
				}
			};
		return windowData;
	}]);

}(VGC));


