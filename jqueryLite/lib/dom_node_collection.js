function DOMNodeCollection(els){
  this.els = els;
}

DOMNodeCollection.prototype.html = function (content) {
  // debugger;
  if (content) {
    this.els.forEach(function (el) {
      el.innerHTML = content;
    });
  } else {
    return this.els[0].innerHTML;
  }
};

module.exports = DOMNodeCollection;
