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
