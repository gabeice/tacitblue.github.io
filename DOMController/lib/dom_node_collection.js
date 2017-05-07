class DOMNodeCollection {
  constructor(htmlElements) {
    this.elements = htmlElements;
  }

  each(func) {
    this.elements.forEach(el => {
      func(el);
    })
  }

  html(htmlstring) {
    if (typeof htmlstring === 'undefined') {
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach((el) => {
        el.innerHTML = htmlstring;
      });
    }
  }

  empty() {
    this.html("");
  }

  append(child) {
    const childArray = typeof child === DOMNodeCollection ? child.elements : [child];
    this.elements.forEach((el) => {
      childArray.forEach((chl) => {
        let copy = chl.cloneNode(chl);
        el.appendChild(copy);
      });
    });
  }

  attr(attribute, value) {
    if (typeof value === 'undefined') {
      this.elements[0].getAttribute(attribute);
    } else {
      this.elements.forEach((el) => el.setAttribute(attribute, value));
    }
  }

  addClass(classname) {
    this.elements.forEach((el) => {
      el.className = classname;
    });
  }

  removeClass() {
    this.elements.forEach((el) => {
      el.className = '';
    });
  }

  children() {
    let collection = new DOMNodeCollection([]);
    this.elements.forEach((el) => {
      collection.elements = collection.elements.concat(Array.from(el.children));
    });
    return collection;
  }

  parent() {
    let collection = new DOMNodeCollection([]);
    this.elements.forEach((el) => {
      if (!collection.elements.includes(el.parentNode)) {
        collection.elements.push(el.parentNode);
      }
    });
    return collection;
  }

  find(selector) {
    let collection = new DOMNodeCollection([]);
    this.elements.forEach((el) => {
      collection.elements =
        collection.elements.concat(Array.from(el.querySelectorAll(selector)));
    });
    return collection;
  }

  remove() {
    this.elements.forEach((el) => {
      el.remove();
    });
    this.elements = [];
  }

  on(eventName, callback) {
    this.elements.forEach((el) => {
      el.addEventListener(eventName, callback);
    });
    this.callback = callback;
  }

  off(eventName) {
    this.elements.forEach((el) => {
      el.removeEventListener(eventName, this.callback);
    });
  }
}

module.exports = DOMNodeCollection;
