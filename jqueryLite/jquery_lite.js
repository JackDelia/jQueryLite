/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var DOMNodeCollection = __webpack_require__(1);
	
	window.$l = function(target){
	  var els;
	
	  if (target instanceof HTMLElement) {
	    els = new DOMNodeCollection([target]);
	  } else if(target instanceof Function) {
	    if (document.readyState === "complete") {
	      target();
	    } else {
	      window.onload = target;
	    }
	  } else {
	    els = document.querySelectorAll(target);
	    els = Array.prototype.slice.call(els);
	    els = new DOMNodeCollection(els);
	  }
	  return els;
	};
	
	
	window.$l(function(){
	  console.log("this typed first");
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function DOMNodeCollection(nodes){
	  this.nodes = nodes;
	  this.events = {};
	}
	
	DOMNodeCollection.prototype.html = function (content) {
	  // debugger;
	  if (content || content === "") {
	    this.nodes.forEach(function (node) {
	      node.innerHTML = content;
	    });
	  } else {
	    return this.nodes[0].innerHTML;
	  }
	};
	
	DOMNodeCollection.prototype.empty = function () {
	  this.html("");
	};
	
	DOMNodeCollection.prototype.append = function (content) {
	  if (content instanceof DOMNodeCollection) {
	    var htmlEls = content.nodes.map(function(node) {
	      return node.outerHTML;
	    });
	
	    content = htmlEls.join("");
	  }
	
	  if (content instanceof HTMLElement) {
	    content = content.outerHTML;
	  }
	
	
	  this.nodes.forEach(function(node) {
	    node.innerHTML += content;
	  });
	};
	
	DOMNodeCollection.prototype.attr = function (attribute, value) {
	  if (value === undefined) {
	    return this.nodes[0].getAttribute(attribute);
	  } else {
	    this.nodes.forEach(function(node) {
	      node.setAttribute(attribute, value);
	    });
	  }
	};
	
	DOMNodeCollection.prototype.addClass = function (className) {
	  var oldClasses = this.attr("class");
	
	  this.attr("class", oldClasses + " " + className);
	};
	
	DOMNodeCollection.prototype.removeClass = function (className) {
	  var classes = this.attr("class").split(" ");
	
	  classes.splice(classes.indexOf(className), 1);
	
	  this.attr("class", classes.join(" "));
	};
	
	DOMNodeCollection.prototype.children = function () {
	  var children = [];
	
	  this.nodes.forEach(function(node){
	    var nodeChildren = [].slice.call(node.children);
	    children = children.concat(nodeChildren);
	  });
	
	  return new DOMNodeCollection(children);
	};
	
	DOMNodeCollection.prototype.parent = function () {
	  var parents = [];
	
	  this.nodes.forEach(function(node){
	    parents.push(node.parentElement);
	  });
	
	  return new DOMNodeCollection(parents);
	};
	
	DOMNodeCollection.prototype.find = function (selector) {
	  var hits = [];
	
	  this.nodes.forEach(function(node) {
	    var nodeHits = [].slice.call(node.querySelectorAll(selector));
	
	    hits = hits.concat(nodeHits);
	  });
	
	  return new DOMNodeCollection(hits);
	};
	
	DOMNodeCollection.prototype.remove = function () {
	  this.nodes.forEach(function (node) {
	    node.outerHTML = "";
	  });
	
	  this.nodes = [];
	};
	
	DOMNodeCollection.prototype.on = function (type, callback) {
	  this.nodes.forEach(function (node) {
	    node.addEventListener(type, callback);
	  });
	
	  this.events[type] = this.events[type] || [];
	
	  this.events[type].push(callback);
	};
	
	DOMNodeCollection.prototype.off = function (type, callback) {
	  var callbacks;
	  var types = [];
	
	  if (type === undefined) {
	    for(var k in this.events) {
	      types.push(k);
	    }
	  } else {
	    types.push(type);
	  }
	
	  var self = this;
	
	  this.nodes.forEach(function (node) {
	    types.forEach(function(currentType) {
	      var currentTypeEvents = self.events[currentType];
	
	      if (callback === undefined) {
	        callbacks = currentTypeEvents;
	      } else {
	        callbacks = [callback];
	      }
	
	      callbacks.forEach(function(currentCallback) {
	        node.removeEventListener(currentType, currentCallback);
	        currentTypeEvents.splice(currentTypeEvents.indexOf(currentCallback), 1);
	      });
	    });
	  });
	};
	
	
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map