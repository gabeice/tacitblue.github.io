const Board = require('./board');
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
