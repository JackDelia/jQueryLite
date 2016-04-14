var DOMNodeCollection = require("./dom_node_collection");

window.$l = function(target){
  var els;

  if (target instanceof HTMLElement) {
    els = new DOMNodeCollection([target]);
  } else if(target instanceof Function) {
    if (document.readyState === "complete") {
      target();
    } else {
      window.$l.toBeInvoked.push(target);
    }
  } else {
    els = document.querySelectorAll(target);
    els = Array.prototype.slice.call(els);
    els = new DOMNodeCollection(els);
  }

  window.onload = function() {
    window.$l.toBeInvoked.forEach(function(fn) {
      fn();
    });
  };

  return els;
};

window.$l.toBeInvoked = [];

window.$l.extend = function() {
  var target = arguments[0];
  var args = [].slice.call(arguments, 1);

  args.forEach(function(arg){
    for(var key in target){

      if (arg[key] !== undefined){
        target[key] = arg[key];
      }

    }
  });

  return target;
};

window.$l.AJAX_DEFAULTS = {
  success: function(data){
    console.log("ajax success");
    console.log(data);
  },

  error: function(){
    console.log("ajax error");
  },

  url: window.location.href,

  method: "GET",

  data: {},

  contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
};


window.$l.ajax = function(options) {
  options = options || {};

  options = window.$l.extend(window.$l.AJAX_DEFAULTS, options);

  var xhr = new XMLHttpRequest();

  xhr.open(options.method, options.url);

  xhr.onload = function() {
    if (xhr.status === 200) {
      options.success(JSON.parse(xhr.response));
    } else {
      options.error();
    }
  };
  xhr.send(options.data);


};





// tests
window.$l(function(){
  console.log("this typed first");
});

window.$l(function(){
  console.log("another test");
});
