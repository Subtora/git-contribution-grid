var gScale = 1.55;
var runnerSize = 10 * gScale;
var gridSize = [450 * gScale, 70 * gScale];
var cCount = 0;
var sc = [255, 255, 255]; //map stroke color
var sw = 3.5; //map stroke weight
var fr = 15; //frameRate

var bk = [235, 237, 240]; //grid background color
var rc = [235, 237, 240]; //runner background color
var rt = [
  [25, 97, 39], //dark green
  [35, 154, 59], //medium dark green

  [123, 201, 111], //medium light green
  [123, 201, 111], //medium light green
  [123, 201, 111], //medium light green

  [198, 228, 139], //light green
  [198, 228, 139], //light green
  [198, 228, 139], //light green
  [198, 228, 139] //light green
]; //lawnmower trail background color

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.visited = false;
  this.walls = [true, true, true, true];
  var rColor = floor(random(0, rt.length));

  switch (rt[rColor][0]) {
    case 25:
      cCount += 8;
      break;
    case 123:
      cCount += 5;
      break;
    case 198:
      cCount += 2;
      break;
  }

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
      //noStroke();
      fill(rt[rColor][0], rt[rColor][1], rt[rColor][2]);
      rect(x, y, w, w);
    }
  };
}
