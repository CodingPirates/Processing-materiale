noStroke();

var x = 100;
var y = 100;

fill(0);
ellipse(x,y-50,60,60); //head

ellipse(x,y,70,90); //body

fill(255);
ellipse(x-10,y-50,20,20); //left eye
ellipse(x+10,y-50,20,20); //right eye

ellipse(x,y+2,50,70); //body

fill(0);
ellipse(x-8,y-50,10,10); //left pupil
ellipse(x+8,y-50,10,10); //right pupil

fill(230,255,0);
ellipse(x,y-38,25,18); //beak

ellipse(x-15,y+45,25,15); //left foot
ellipse(x+15,y+45,25,15); //right foot
