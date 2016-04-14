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

DOMNodeCollection.prototype.attr = function (attribute, value) {
  if (value === undefined) {
    return this.els[0].getAttribute(attribute);
  } else {
    this.els.forEach(function(el) {
      el.setAttribute(attribute, value);
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


module.exports = DOMNodeCollection;
