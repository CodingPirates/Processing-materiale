var sketch = function(processingInstance){ with (processingInstance){

var vx, vy, px, py;
var angle = -PI/4; // 45 degrees
var force = 5;
var player = 50;
var goal = 350;
var score = 0;
var state = 0;
var ground = new Array(width);

size(600, 600);

for(var i = 0; i < width; i++) {
  ground[i] = height - Math.round(200 * noise(i / 70.0));
}

var checkHit = function() {
  // Skyd igen hvis kuglen ryger uden for banen
  if (px < 0 || px >= width) {
    return true;
  }

  // Fortsæt hvis den stadig er i luften
  if (py < ground[Math.round(px)]) {
    return false;
  }

  // Skyd igen hvis vi rammer målet + læg 1 til score
  if (px < goal + 15 && px > goal - 15) {
    goal = Math.round(random(150, width));
    score += 1;
  }
  return true;
};

draw = function() {
  background(194, 206, 255);
  stroke(0, 212, 0);
  for(var x = 0; x < width; x++) {
    line(x, height, x, ground[x]);
  }
  stroke(255, 0, 0);
  rectMode(CENTER);
  rect(player, ground[player], 30, 15);
  rect(goal,   ground[goal],   30,  5);
  fill(0, 128, 255);
  text("Score: " + score, 10, 20);
  fill(255, 255, 255);

  // State: Styring af kanon
  if (state === 0) {
    vx = force * cos(angle);
    vy = force * sin(angle);
    px = player;
    py = ground[player];
    line(px, py, px + (5 * vx), py + (5 * vy));
  }
  // State kugle i luften
  if (state === 1) {
    px += vx;
    py += vy;
    vy += 0.1;
    ellipse(px, py, 10, 10);
    if (checkHit()) {
      state = 0;
    }
  }
};

keyReleased = function() {
  if (state === 0) {
    if (keyCode === 32) { state = 1; /* affyr! */ }
    if (keyCode === LEFT ) { angle -= 0.1; }
    if (keyCode === RIGHT) { angle += 0.1; }
    if (keyCode === DOWN ) { force -= 0.5; }
    if (keyCode === UP   ) { force += 0.5; }
  }
};

}}; // End sketch
