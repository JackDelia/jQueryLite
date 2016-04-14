function DOMNodeCollection(nodes){
  this.nodes = nodes;
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


module.exports = DOMNodeCollection;
