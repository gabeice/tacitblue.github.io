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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(1);
let timeoutId;

class View {
  constructor($el) {
    this.$el = $l($el);
    this.board = new Board();
    const keyListener = (e) => {
      this.handleKey(e);
    };

    $l("body").on("keydown", keyListener);
    timeoutId = setInterval(this.update.bind(this), 100);
  }

  equal(pos1, pos2) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
  }

  update() {
    if(this.board.snake.lost) {
      alert("You lose!");
      clearInterval(timeoutId);
      $l("body").off("keydown");
    } else {
      this.board.apples.forEach(apple => {
        $l(`#col${apple[0]}-${apple[1]}`).addClass('column red');
      });
      this.board.snake.segments.forEach(seg => {
        $l(`#col${seg[0]}-${seg[1]}`).addClass('column');
      });
      this.board.snake.move();
      if(this.equal(this.board.snake.segments[this.board.snake.segments.length-1], this.board.apples[0])) {
        this.board.apples = [[Math.floor(Math.random()*19), Math.floor(Math.random()*19)]];
        this.board.snake.grow(3, this.opposite(this.board.snake.direction));
      }
      this.board.snake.segments.forEach(seg => {
        $l(`#col${seg[0]}-${seg[1]}`).addClass('column green');
      });
    }
  }

  opposite(dir) {
    switch(dir) {
      case "N":
        return "S";
        break;
      case "S":
        return "N";
        break;
      case "E":
        return "W";
        break;
      default:
        return "E";
    }
  }

  handleKey(key) {
    switch(key.keyCode) {
      case 40:
        this.board.snake.direction = "S";
        break;
      case 38:
        this.board.snake.direction = "N";
        break;
      case 37:
        this.board.snake.direction = "W";
        break;
      case 39:
        this.board.snake.direction = "E";
    }
  }
}

module.exports = View;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(3);

class Board {
  constructor() {
    this.snake = new Snake();
    this.apples = [[Math.floor(Math.random()*19), Math.floor(Math.random()*19)]];
  }
}

module.exports = Board;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(0);

$l(() => {
  window.boardView = new View('#board');
  for(let i=0; i<20; i++) {
    const newEl = document.createElement("li");
    newEl.className = "row";
    newEl.id = "row" + i;
    boardView.$el.append(newEl);
  }
  $l('.row').each(row => {
    const newUl = document.createElement("ul");
    row.appendChild(newUl);
    for(let j=0; j<20; j++) {
      const newCol = document.createElement("li");
      newCol.className = "column";
      newCol.id = "col" + row.id.slice(3) + "-" + j;
      newUl.appendChild(newCol);
    }
  });
});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Snake {
  constructor() {
    this.direction = ["N", "E", "S", "W"][Math.floor(Math.random() * 4)];
    this.segments = [[10,10]];
    this.lost = false;
  }

  grow(num, dir) {
    for(let i=0; i<num; i++) {
      this.segments.unshift(this.oneOver(dir, this.segments[0]))
    }
  }

  oneOver(dir, spot) {
    switch(dir) {
      case "N":
        return [spot[0]-1, spot[1]];
        break;
      case "E":
        return [spot[0], spot[1]+1];
        break;
      case "S":
        return [spot[0]+1, spot[1]];
        break;
      default:
        return [spot[0], spot[1]-1];
    }
  }

  move() {
    switch(this.direction) {
      case "N":
        this.shift(0, (num) => num - 1);
        break;
      case "E":
        this.shift(1, (num) => num + 1);
        break;
      case "S":
        this.shift(0, (num) => num + 1);
        break;
      default:
        this.shift(1, (num) => num - 1);
    }
  }

  shift(pos, func) {
    this.segments.forEach((seg, idx) => {
      if(idx < this.segments.length - 1) {
        this.segments[idx][0] = this.segments[idx + 1][0];
        this.segments[idx][1] = this.segments[idx + 1][1];
      } else if(seg[pos] > 0 && seg[pos] < 19) {
        seg[pos] = func(seg[pos]);
      } else {
        this.lost = true;
      }
    });
  }
}

module.exports = Snake;


/***/ })
/******/ ]);