const DOMNodeCollection = require('./dom_node_collection');

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
