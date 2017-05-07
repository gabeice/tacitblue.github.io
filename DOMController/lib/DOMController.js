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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

function $l(selector) {
  if(selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else if (typeof selector === 'function') {
    const funcs = [];
    funcs.push(selector);
    document.addEventListener("DOMContentLoaded", () => {
      funcs.forEach((func) => {
        func();
      });
    });
  } else {
    let element = document.querySelectorAll(selector);
    let arr = Array.from(element);
    return new DOMNodeCollection(arr);
  }
}

$l.extend = function(...args) {
  let results = {};
  args.forEach((arg) => {
    Object.keys(arg).forEach((key) => {
      results[key] = arg[key];
    });
  });
  return results;
};

$l.ajax = function(options) {
  let defaults = {
    sucess: () => console.log("success"),
    error: () => console.log("failure"),
    url: document.URL,
    method: "GET",
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  let request = $l.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(request.method, request.url);

  xhr.send(request.data);
  return new Promise((resolve, reject) => {
    xhr.onload = function () {
      if (xhr.status === 200) {
        request.success(JSON.parse(xhr.response));
        resolve();
      } else {
        request.error(JSON.parse(xhr.response));
        reject()
      }
    };
  });
};

window.$l = $l;


/***/ })
/******/ ]);