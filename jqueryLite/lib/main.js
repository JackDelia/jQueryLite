var DOMNodeCollection = require("./dom_node_collection");

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
