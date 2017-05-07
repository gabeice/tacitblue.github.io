const Snake = require('./snake');

class Board {
  constructor() {
    this.snake = new Snake();
    this.apples = [[Math.floor(Math.random()*19), Math.floor(Math.random()*19)]];
  }
}

module.exports = Board;
