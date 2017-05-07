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
