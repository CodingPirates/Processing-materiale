var sketch = function(processingInstance){ with (processingInstance){

size(400, 400);
background(255, 255, 255);
fill(0, 0, 0);
noStroke();

// kører 30 gange i sekundet
var draw = function() {
    ellipse(mouseX, mouseY, 10, 10);
};

mousePressed = function () {
    background(255, 255, 255);
};

keyReleased = function() {
  if (keyCode === UP   ) { fill(255, 0, 0);   }
  if (keyCode === DOWN ) { fill(0, 255, 0); }
  if (keyCode === LEFT ) { fill(0, 0, 255); }
  if (keyCode === RIGHT) { fill(255, 255, 0); }
};

}}; // End sketch
