var lawnmowerSize = 25;
//var lawnSize = [windowWidth, windowHeight];

var bk = [59, 89, 72]; //lawn background color
var rc = [205, 44, 36]; //lawnmower background color
var rt = [182, 191, 149]; //lawnmower trail background color
var ro = [0, 0, 0]; //lawnmower trail outline color
var sc = [255, 255, 255]; //map stroke color
var sw = 0; //map stroke weight
var fr = 100; //frameRate

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.visited = false;
  this.walls = [true, true, true, true];

  this.checkNeighbors = function() {
    var neighbors = [];
    var top = grid[index(i, j - 1)];
    var right = grid[index(i + 1, j)];
    var bottom = grid[index(i, j + 1)];
    var left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }
    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };
  this.highlight = function() {
    var x = this.i * w;
    var y = this.j * w;
    fill(rc[0], rc[1], rc[2]);
    strokeWeight(lawnmowerSize / 10);
    stroke(ro[0], ro[1], ro[2]);
    rect(x, y, w, w);
  };
  this.show = function() {
    var x = this.i * w;
    var y = this.j * w;
    strokeWeight(sw);
    stroke(sc[0], sc[1], sc[2]);
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }

    if (this.visited) {
      noStroke();
      fill(rt[0], rt[1], rt[2]);
      rect(x, y, w, w);
    }
  };
}
