var DOMNodeCollection = require("./dom_node_collection");

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
