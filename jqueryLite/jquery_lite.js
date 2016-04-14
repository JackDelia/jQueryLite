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
	  } else {
	    els = document.querySelectorAll(target);
	    els = Array.prototype.slice.call(els);
	    els = new DOMNodeCollection(els);
	  }
	  return els;
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	function DOMNodeCollection(els){
	  this.els = els;
	}
	
	DOMNodeCollection.prototype.html = function (content) {
	  // debugger;
	  if (content || content === "") {
	    this.els.forEach(function (el) {
	      el.innerHTML = content;
	    });
	  } else {
	    return this.els[0].innerHTML;
	  }
	};
	
	DOMNodeCollection.prototype.empty = function () {
	  this.html("");
	};
	
	DOMNodeCollection.prototype.append = function (content) {
	  if (content instanceof DOMNodeCollection) {
	    var htmlEls = content.els.map(function(el) {
	      return el.outerHTML;
	    });
	
	    content = htmlEls.join("");
	  }
	
	  if (content instanceof HTMLElement) {
	    content = content.outerHTML;
	  }
	
	
	  this.els.forEach(function(el) {
	    el.innerHTML += content;
	  });
	};
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map