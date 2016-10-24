var sketch = function(processingInstance){ with (processingInstance){

size(400, 400);
stroke(255);
strokeWeight(2);
noFill();

var ufoWidth = 100;
var ufoHeight = 50;
var fireLaser = false;

var ufo = function(x,y) {
    stroke(0, 0, 0);
    strokeWeight(1);
    fill(0, 0, 0);
    ellipse(x, y-ufoHeight/2, ufoHeight, ufoHeight/2);
    arc(x, y, ufoWidth, ufoHeight, PI, 2*PI);

    fill(180,0,255);
    rect (x + 5, y - 30, 10, 10);
    rect (x - 15, y - 30, 10, 10);

    fill(255, 0, 0);
    ellipse(x + ufoWidth/2, y - 5, 10, 10);
    ellipse(x + ufoWidth/4, y - 5, 10, 10);
    ellipse(x, y - 5, 10, 10);
    ellipse(x - ufoWidth/4, y - 5, 10, 10);
    ellipse(x - ufoWidth/2, y - 5, 10, 10);
    fill(255, 242, 0);
    rect(x - ufoWidth/4,y, 50, 1000);
};

var ufoX = 200;
var ufoY = 50;
var fartX = 0;
var fartY = 0;

keyReleased = function () {
    if (keyCode === LEFT) {
        fartX = -5;
    }
    if (keyCode === RIGHT) {
        fartX = 5;
    }
    if (keyCode === UP) {
        fartY = -5;
    }
    if (keyCode === DOWN) {
        fartY = 5;
    }
};


var draw = function() {
  background(127, 197, 255);
  ufo(ufoX, ufoY);

  // Græs
  noStroke();
  fill(2, 204, 2);
  rect(0,360,400,40);

  // Laser-kanon
  if(fireLaser){
      strokeWeight(10);
      stroke(random(200,255), random(43,160), random(74,105));
      line(ufoX, ufoY, mouseX, mouseY);
  }

  ufoX += fartX;
  ufoY += fartY;
};

mousePressed = function(){
    fireLaser = true;
};

mouseReleased = function(){
        fireLaser = false;
};


}};
