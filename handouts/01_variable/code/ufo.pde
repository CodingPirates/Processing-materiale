var ufoWidth = 100;
var ufoHeight = 50;

var ufo = function(x,y) {
    fill(0, 0, 0);
    ellipse(x, y-ufoHeight/2, ufoHeight, ufoHeight/2);
    arc(x, y, ufoWidth, ufoHeight, 180, 360);
    
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

var draw = function() {
  background(127, 197, 255);
  ufo(mouseX, mouseY);
};
