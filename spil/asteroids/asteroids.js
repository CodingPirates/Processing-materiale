var sketch = function(processingInstance){ with (processingInstance){

// En asteroide har en position og en hastighed 
// hastighed kaldes Velocity på engelsk, og der er både en hastigheds variabel frem og tilbage (xvel)
//og en hastigheds variabel op og ned (yvel)
var makeRock = function() {
  return ({ "xpos" : random(width),
            "ypos" : random(height),
            "xvel" : random(-2, 2), 
            "yvel" : random(-2, 2)
          });
};

// Tegn en asteroide
var drawRock = function(rock) {
  ellipse(rock.xpos, rock.ypos, 20, 20);
};

// Et rumskib har position, hastighed og en rotation
var makeSpaceship = function() {
  return ({ "orientation"  : -PI / 2,
            "xpos" : width/2,
            "ypos" : height/2,
            "xvel" : 0, 
            "yvel" : 0
          });
};

// Tegn et rumskib - roteret i den retning "rotation" variablen siger
var drawSpaceship = function(spaceship) {
  pushMatrix();
  translate(spaceship.xpos, spaceship.ypos);
  rotate(spaceship.orientation);
  triangle(5, 0, -5, 10, -5, -10);
  popMatrix();
};

// Flyt et objekt, i forhold til dets hastighed
var move = function(obj) {
  obj.xpos += obj.xvel;
  obj.ypos += obj.yvel;
  if (obj.xpos <   0) { obj.xpos = width; }
  if (obj.xpos > width) { obj.xpos = 0; }
  if (obj.ypos <   0) { obj.ypos = height; }
  if (obj.ypos > height) { obj.ypos = 0; }
};

size(400, 400);
stroke(255);
strokeWeight(2);
noFill();
rectMode(CENTER);

// Opret rumskibet og 10 asteroider
var player = makeSpaceship();
var num_rocks = 10;
var rocks = new Array(num_rocks);
for(var i = 0; i < num_rocks; i++) {
    rocks[i] = makeRock();
}

draw = function() {
  background(0, 0, 0);

  // Check om der er trykket på en tast
  if (__keyPressed) {
    if (keyCode === LEFT ) { 
      player.orientation -= 0.125;
    }
    else if (keyCode === RIGHT) { 
      player.orientation += 0.125;
    }
    else if (keyCode === UP) {
      player.xvel += 0.125 * cos(player.orientation);
      player.yvel += 0.125 * sin(player.orientation);
    }
  }

  // Flyt rumskib og asteroider
  move(player);
  for (var i = 0; i < rocks.length; i++) {
    move(rocks[i]);
  }

  // Check for kollisioner
  for(var i = 0; i < rocks.length; i++) {
    if (dist(player.xpos, player.ypos, rocks[i].xpos, rocks[i].ypos) < 15) {
      player = makeSpaceship();
    }
  }

  // Tegn rumskib og asteroider
  drawSpaceship(player);
  for (var i = 0; i < rocks.length; i++) {
    drawRock(rocks[i]);
  }
};

}}; // End sketch
