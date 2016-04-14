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







// tests
window.$l(function(){
  console.log("this typed first");
});

window.$l(function(){
  console.log("another test");
});
