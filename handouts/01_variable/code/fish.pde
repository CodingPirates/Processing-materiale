noStroke();

var xpos = 214;

// Krop
fill(255, 157, 0);
ellipse(xpos, 200, 120, 75);

// Finner
fill(247, 222, 0);
triangle(xpos-60, 200, xpos-90, 170, xpos-90, 230);
triangle(xpos+10, 210, xpos-20, 200, xpos-20, 225);

// Øje
fill(0,0,0);
ellipse(xpos + 30, 190, 15, 15);
fill(255, 255, 255);
ellipse(xpos + 32, 190, 5, 5);
