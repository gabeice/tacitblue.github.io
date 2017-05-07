# DOMController

DOMController is a JavaScript library for selecting and manipulating HTML DOM elements. It provides users with the ability to:
  * Select individual DOM elements or classes of elements via a number of selectors (ID, class, etc.)
  * Traverse and manipulate DOM elements
  * Create, insert and remove DOM elements
  * Queue functions until DOM is fully loaded
  * Send AJAX requests

## Using DOMController

The DOMController library can be downloaded into any project and the webpack output `DOMController.js` included in the project source code by adding the following script.

```html
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="./css/reset.css">
  <script type="text/javascript" src="./DOMController/lib/DOMController.js"></script>
  ...
</head>
```

Alternatively, users can use the documents in the `src` folder by running `webpack` in the command line to recreate the webpack file.

## API

[`$l`](#l)

[DOM Traversal](#dom-traversal)
  * [`children`](#children)  
  * [`parent`](#parent)  
  * [`find`](#find)

[DOM Manipulation](#dom-manipulation)  
  * [`html`](#html)  
  * [`empty`](#empty)  
  * [`append`](#append)  
  * [`remove`](#remove)  
  * [`attr`](#attr)  
  * [`addClass`](#addclass)  
  * [`removeClass`](#removeclass)  
  * [`remove`](#remove)  

[Event Listeners](#event-listeners)  
  * [`on`](#on)  
  * [`off`](#off)  

[`$l.ajax`](#lajax)

### $l

The DOMController library utilizes the global variable of `$l` as a wrapper for all methods in the library.  

`$l` has four possible uses. Most commonly, it is used to select elements with CSS selectors.  `$l("div")` returns a `DOMNodeCollection` object which is an object custom to the DOMController library that is an array of `HTMLElement`s.  

`$l` can also be used to create `DOMNodeCollection` objects from unwrapped `HTMLElement`s giving these elements access to DOMController methods.  

The third use of `$l` takes in a string of HTML code, builds `HTMLElement`(s) from the code, and then wraps the `HTMLElement`(s) in a `DOMNodeCollection` object.

The final use of `$l` is as a tool to queue functions to run once the DOM is fully loaded.

### DOM Traversal

`DOMNodeCollection` methods to navigate DOM elements:

#### `children`

Returns a `DOMNodeCollection` object containing all of the children elements of every `HTMLElement` in the original `DOMNodeCollection`.  Note that this only includes the direct children.

#### `parent`

Returns a `DOMNodeCollection` object containing the parent elements of every `HTMLElement` in the original `DOMNodeCollection`.  

### `find`

Takes a `selector` parameter and returns a `DOMNodeCollection` object containing every element which matches the `selector`.

### DOM Manipulation

`DOMNodeCollection` methods to view and/or change DOM elements

#### `html`

Returns the `innerHTML` for the first element in the `DOMNodeCollection` if no argument is given.  If a string argument is given, changes the `innerHTML` of each `DOMNodeCollection` element to the string argument.

#### `empty`

Empties the innerHTML of each `DOMNodeCollection` element

#### `append`

Takes a single `HTMLElement`, `DOMNodeCollection`, or `string` argument and appends it to each `DOMNodeCollection` element.

#### `remove`

Remove each `DOMNodeCollection` element from the DOM.

#### `attr`

Takes either one (`attr(attribute)`) or two (`attr(attribute, value)`) arguments.  If given one argument, the method gets the value of the attribute given for the the first element in the `DOMNodeCollection`.  The method sets the attribute, given as the first argument, as the value, given as the second argument, for each `DOMNodeCollection` element.

#### `addClass`

Adds a class, given as an argument, to each `DOMNodeCollection` element.

#### `removeClass`

Removes a class, given as an argument, from each `DOMNodeCollection` element.

### Event Listeners

#### `on`

Adds event listener to each `DOMNodeCollection` element.  List of events are available [here](https://developer.mozilla.org/en-US/docs/Web/Events).

#### `off`

Removes event listener from each `DOMNodeCollection` element.

### $l.ajax

Sends HTTP Request and returns a `Promise` object.  Accepts a `Hash` object as an argument with any of the following attributes:
  * method (default: "GET"): HTTP Request method or type
  * url (default: window.location.href): URL for HTTP Request
  * success: success callback
  * error: error callback
  * contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8'): content type of HTTP Request

```javascript
$l.ajax({
  url: "/movies.json",
  method: "POST",
  data: {
    movie: {
      name: "The Social Network",
      director: "David Fincher"
    }
  },
  success(data) {
    console.log("Successfully posted");
  }
});
```

### Demo

A JavaScript version of the game Snake which uses DOMController to manipulate onscreen HTML elements can be accessed [here](url("./Demo/index.html")).
