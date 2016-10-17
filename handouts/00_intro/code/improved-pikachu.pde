var pikachu = function(x, y) {
    fill(255, 255, 0);
    // ører
    triangle (x-70, y-30, x-160, y-100, x-50, y-70);
    triangle (x+70, y-50, x+100, y-170, x+30, y-70);
    fill(0, 0, 0);
    triangle (x-120, y-69, x-160, y-100, x-113, y-87);
    triangle (x+87, y-120, x+100, y-170, x+70, y-125);
    
    fill(255, 255, 0);
    // hoved
    ellipse(x, y, 200, 200);
   
    // øjne
    fill(0, 0, 0);
    ellipse (x-40, y-10, 35, 45);
    ellipse (x+40, y-10, 35, 45);
    
    fill(255, 255, 255);
    ellipse (x-45, y-15, 10, 15);
    ellipse (x+35, y-15, 10, 15);
    
    // næse
    fill(0, 0, 0);
    triangle(x-20, y+20, x, y+35, x+20, y+20);
    line(x, y+35, x, y+50);
    line(x-15, y+50, x+15, y+50);

    fill(255, 0, 0);
    noStroke();
    ellipse(x-60,y+40,20,20);
    ellipse(x+60,y+40,20,20);
}; 
