var sketch = function(processingInstance){ with (processingInstance){

var makeRectangle = function (x, y, w, h, color) {
  return ({ "xpos" : x,
            "ypos" : y,
            "width" : w,
            "height" : h,
            "color" : color,
            "alive" : true });
};

var drawRectangle = function(r) {
    fill(r.color);
    rect(r.xpos, r.ypos, r.width, r.height);
};

var collisionCheck = function(rect1, rect2) {
   return rect1.xpos < rect2.xpos + rect2.width &&
          rect1.xpos + rect1.width > rect2.xpos &&
          rect1.ypos < rect2.ypos + rect2.height &&
          rect1.height + rect1.ypos > rect2.ypos;
};

size(400, 400);
stroke(0,0,0);

var ball = makeRectangle(0, 150, 5, 5, color(255,255,255));
ball.xvel = 3;
ball.yvel = 3;

var paddle = makeRectangle(mouseX, 370, 60, 5, color(255, 255, 255));

var rows = 6;
var columns = 10;
var rowsColors = [0xffff00ff, 0xffff0000, 0xffff9900, 0xffffff00, 0xff00ff00, 0xff00ffff];
var brickHeight = 10;
var brickWidth = width/columns;
var bricks = new Array(rows*columns);

for (var i = 0; i < rows; i++) {
  var c = rowsColors[i];
  for(var j = 0; j < columns; j++) {
    var x = j * brickWidth;
    var y = 50 + (i * brickHeight);
    bricks[i*columns + j] = makeRectangle(x, y, brickWidth, brickHeight, c);
  }
}

// Handle any collisions
var handleCollisions = function () {
  if(collisionCheck(ball, paddle)){
    ball.yvel = - ball.yvel;  
  }
  
  if(ball.xpos <= 0 || ball.xpos + ball.width >= width) {
      ball.xvel = - ball.xvel;
  }

  for(var i = 0; i < rows*columns; i++) {
     if(bricks[i].alive && collisionCheck(ball, bricks[i])) {
        ball.yvel = - ball.yvel;
        bricks[i].alive = false;
     }
  }
};


draw = function() {
  background(0,0,0);

  // Update position of paddle
  paddle.xpos = mouseX-paddle.width/2;

  // Update position of ball
  ball.xpos = ball.xpos + ball.xvel;
  ball.ypos = ball.ypos + ball.yvel;

  handleCollisions();

  drawRectangle(paddle);
  drawRectangle(ball);
  for (var i = 0; i < rows*columns; i++) {
      if(bricks[i].alive) {
        drawRectangle(bricks[i]);  
      }
  }
};

}}; // End sketch
