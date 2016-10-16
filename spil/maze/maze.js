var sketch = function(processingInstance){ with (processingInstance){

var px = 3;
var py = 2;
var gems = 0;
var tiles = [
    getImage("cute/Blank"),
    getImage("cute/Blank"),
    getImage("cute/WallBlockTall"),
    getImage("creatures/Hopper-Cool"),
    getImage("cute/GemBlue"),
    getImage("cute/DoorTallClosed")
];
var widthTile = width/10;
var heightTile = height/10;

var level1 = [
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 2, 2, 2, 2, 2, 2, 2, 0, 0 ],
  [ 0, 2, 4, 1, 4, 2, 1, 2, 2, 0 ],
  [ 0, 2, 1, 1, 1, 2, 1, 4, 2, 0 ],
  [ 0, 2, 1, 1, 1, 2, 1, 2, 2, 0 ],
  [ 0, 2, 1, 1, 1, 1, 1, 2, 0, 0 ],
  [ 0, 2, 2, 2, 2, 5, 2, 2, 0, 0 ],
  [ 0, 0, 0, 0, 2, 1, 2, 0, 0, 0 ],
  [ 0, 0, 0, 0, 2, 2, 2, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
];

var grid = level1;

draw = function() {
  background(18, 135, 0);
  for(var y = 0; y < 10; y++) {
    for(var x = 0; x < 10; x++) {
        image(tiles[grid[y][x]], x * widthTile, y * heightTile, widthTile, heightTile);
    }
  }
  image(tiles[3], px * widthTile, py * heightTile, widthTile, heightTile);
  text("gems: " + gems, 10, 20);
};

var move = function(nx, ny) {
  var tile = grid[ny][nx];
  if (tile === 0 || tile === 2) { return; }
  if (tile === 5 && gems < 3)  { return; }
  px = nx;
  py = ny;
  if (grid[py][px] === 4) {
    gems += 1;
    grid[py][px] = 1;
  }
  if (grid[py][px] === 5) {
    gems -= 3;
    grid[py][px] = 1;
  }
};

keyReleased = function() {
  if (keyCode === UP   ) { move(px    , py - 1); }
  if (keyCode === DOWN ) { move(px    , py + 1); }
  if (keyCode === LEFT ) { move(px - 1, py    ); }
  if (keyCode === RIGHT) { move(px + 1, py    ); }
};

}}; // End sketch
