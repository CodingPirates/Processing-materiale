var sketch = function(processingInstance){ with (processingInstance){

size(400, 400);

// AGAR
var agarSize = 20;
var agarX = 200;
var agarY = 200;
var breakForce = 35;
var score = 100;
var highScore = score;

// BOLD
var ballSize = 40;
var ballX = 100;
var ballY = 100;
var speedX = 10;
var speedY = 13;

// MAD
var foodX = random(50,350);
var foodY = random(50,350);
var foodSize = 10;

// kører 30 gange i sekundet
var draw = function() {
    background(150, 150, 150);
    
    //Bevæg Agar mod musen
    
    agarX = mouseX;
    agarY = mouseY;
    agarSize = score / 5;
    
    if(score > highScore){
    highScore = score;
    }
     
    // tegn agar
    ellipse(agarX,agarY,agarSize,agarSize);
     
    // tegn mad
    ellipse(foodX,foodY,foodSize,foodSize);
     
    // tegn bold
    ellipse(ballX, ballY, ballSize, ballSize);
    
    // tegn liv
    text("SCORE: " + score, 20, 20);
    
    text("HIGHSCORE: " + highScore, width-200, 20);
    
    
    // find distancen til maden
    // http://www.webmatematik.dk/lektioner/matematik-b/geometri/afstandsformlen
    var xDiff = agarX - foodX;
    var yDiff = agarY - foodY;
    var distance = Math.sqrt( xDiff*xDiff + yDiff*yDiff );
     
    // Hvis distancen fra midten af Agar, til midten af maden er mindre end størrelsen af Agar+Mad, så æder vi maden og gør agar større
    if(distance < (agarSize / 2) + (foodSize / 2)) {
        foodX = random(50,350);
        foodY = random(50,350);
        score = score +20;
    }
     
    if (ballX > width || ballX < 0) {
        speedX = - speedX;
    }
    if (ballY > height || ballY < 0) {
        speedY = - speedY;
    }
    if( dist(ballX, ballY, agarX, agarY) < (agarSize / 2) + (ballSize / 2)) {
        score = score - 20;
    }
    ballX = ballX + speedX;
    ballY = ballY + speedY;
};

}}; // End sketch
