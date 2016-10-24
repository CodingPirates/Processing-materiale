var sketchProc = function(processingInstance) {
     with (processingInstance) {
	 
		//******SETUP****** - canvas størrelse og framerate/hastighed på draw funktionen
	 
        size(1000, 600); 
        frameRate(30);
		
		//funktionskald der bestemmer hvor billedet bliver tegnet fra (centrum af billedet her, men der kan også bruges CORNER (hjørne))
		imageMode(CENTER);
		
		//billeder loades fra lokale filer til variable ved at skrive stien til dem to gange som nedenunder
		
		/* @pjs preload="bullet.png"; */
		var bulletImage = loadImage("bullet.png");
        
		/* @pjs preload="mainCharacter.png"; */
		var mainCharacterImage = loadImage("mainCharacter.png");
       
	    /* @pjs preload="enemy.png"; */
		var enemyImage = loadImage("enemy.png");
       
        
//******SPIL VARIABLE******
		
//liste med affyrrede skud og levende fjender 
var bullets = [];
var enemies = [];

//tid der går til en ny fjende bliver skabt (i milliskunder)
var enemySpawnTime = 1000;

//tid mellem skud i maskingeværs mode (i millisekunder)
var bulletSpawnTime = 75;

//millis() giver os antallet af millisekunder siden programmet startede
//De to variable er tids-stempler vi bruger til at bestemme om vi må spawne nye fjender og bullets
var lastBulletTimestamp = millis();
var lastEnemyTimestamp = millis();

//musen-trykket-ned variabel, vi bliver nødt til at holde styr på denne selv, på en hjemmeside, i forhold til KhanAcademy 
var mouseIsPressed = false;

//Den fart et skud har, større tal gør den hurtigere
var bulletSpeed = 10;


//Et javascript-objekt der indeholder om a,w,s,d er trykket ned / holdes inde. a,w,d,s kan enten være Sandt eller falskt (true/false)
var keys = {
a : false,
w : false,
d: false,
s : false
};

//Vores hovedpersons hastighed
var speed = 5;

//Objektet med vores hovedperson
//Den har en position (x,y) og det man kalder en "retning" (dirX, dirY)
//dirX og dirY fortæller hvor mange x og y pixels vi hver draw-runde skal bevæge os
//f.eks. dirX = 5, betyder vi går 5 pixels til højre ved hver draw runde 
var mainCharacter = {
  
  x : width / 2,
  y : height / 2,
  dirX : 0,
  dirY : 0,
 
  };
  
  // størrelsen i pixels på vores figurer i spillet
  var mainCharacterPixelSize = 32;
  var bulletPixelSize = 10;
  var enemySize = 15;
  
  //******** SPIL KODE ********


//Vi starter med at have en Bullet funktion, der skaber og returner en bullet når vi kalder funktionen.
//Vi skaber et tomt bullet-object først i funktionen, med de to krøllede paranteser {} i en variabel 
//Derefter fylder vi der med de variable vi gerne vil have, med de korrekte værdier
var Bullet = function(){
    
 //det nyskabte tomme bullet object	
 var bullet = {};
 
 //først fylder vi bullet objektet med dens start position (x,y), der er der hvor vores mainCharacter starter
 bullet.x = mainCharacter.x;    
 bullet.y = mainCharacter.y; 
 
 //nedenstående kode bruger vektor regning til at bestemme retningen og hastigheden
 //vi får skudet til at skyde fra karakteren og mod musens position
 
 bullet.dirX =  mouseX - mainCharacter.x; 
 bullet.dirY =  mouseY -  mainCharacter.y;       
 
 var length = Math.sqrt( bullet.dirX * bullet.dirX +bullet.dirY * bullet.dirY);
 
 bullet.dirX /= length;
 bullet.dirY /= length;
 
 //gennem vektorregningen udregnes også her dirX og dirY. De bestemmer som sagt hvor mange pixels man bevæger sig højre/venstre og op/ned.
 bullet.dirX *= bulletSpeed;
 bullet.dirY *= bulletSpeed;
 
 //Til sidst returnere vi vores bullet objekt
 //Dette bullet objekt, vil vi længere nede i koden putte direkte i vores bullet-liste (bullets), så vi også kan tegne det.
 return bullet;   
};


//Vi laver også en Enemy funktion, der ligesom vores Bullet funktion, returnere et objekt.
//Her er objektet en fjende som vi skaber, der skal løbe fra sin start position, mod hovedpersonen.
//Vi bruger en random funktion til at bestemme x og y positionen, så den altid ved starte et sted på en kant (top, bund, højre eller venstre)
//(Vi giver også fjenden noget random liv, der afgør hvor mange skud den kan holde til).
var Enemy = function(){
    
 //det tomme fjende objekt	
 var enemy = {};
 
 //et random tal mellem 0 og 4, vi bruger dette til at få vores fjende til at starte ved en tilfældig kant.
 var startPoint = random(0,4);
 
 //hvis tallet var mindre end 1, så starter vi i toppen et sted
 if(startPoint < 1){
     enemy.x = random(0,width); 
     enemy.y = 0; 
 }else if(startPoint < 2){ //mindre end 2, bunden
     enemy.x = random(0,width); 
     enemy.y = height; 
 }else if(startPoint < 3){ //mindre end 3, venstre
     enemy.x = 0; 
     enemy.y = random(0,height); 
 }else{ //ellers til højre
  enemy.x = width; 
  enemy.y = random(0,height); 
 }
 
 //fjenden får random liv, mellem 3 og 23.
 enemy.health = random(3,23);
 
 //og dens retning sættes til at være mod hovedpersonen, også ved lidt vektorregning
 enemy.dirX =    mainCharacter.x - enemy.x; 
 enemy.dirY =   mainCharacter.y - enemy.y ;       
 
 var length = Math.sqrt( enemy.dirX * enemy.dirX +enemy.dirY * enemy.dirY);
 
 enemy.dirX /= length;
 enemy.dirY /= length;
 
 //vi gør nogle fjender lidt hurtigere, og andre lidt langsommere ved at gange deres retningsvektorer med noget random
 //dette gør også at de kan ramme lidt forbi vores hovedperson
 enemy.dirX *= random(0.5,1.5);
 enemy.dirY *= random(0.5,1.5);
 
 //til sidt returnere vi vores fjende objekt
 return enemy;   
};


//keyPressed og keyReleased, gør at vi kan opfange hvornår en tast trykkes ned og slippes.
//Vi sætter de rigtige knapper til true eller false. 

//her sættes de rigtige trykkede knapper til true (true == holdt nede)
var keyPressed = function() 
{
  if(key.toString()==='a'){
    keys.a =true;
  }
  if(key.toString()==='s')
    {       
    keys.s =true;
  }
  if(key.toString()==='w')
    {       
    keys.w =true;
  }
  if(key.toString()==='d')
    {       
    keys.d =true;
  }

};

//her sættes de slippede knapper til false
var keyReleased = function()
{
  if(key.toString()==='a'){
    keys.a=false;
  }
  
  if(key.toString()==='s'){
    keys.s=false;
  }
if(key.toString()==='w')
    {       
    keys.w =false;
  }
  if(key.toString()==='d')
    {       
    keys.d =false;
  }

};


//vi styrer vores mouseIsPressed fra disse to funktioner.
//Hvis vi ikke ønsker machinegunmode, og kun et enkelt skud, så kan vi fjerne kommentaren til nederste linje i funktionen. Dette skyder kun ét skud af ved musetryk.
mousePressed = function() {
  mouseIsPressed = true;
  
  //dette skubber en ny bullet (et nyt bullet objekt) på listen "bullets". Listen "bullets" bliver derved længere med 1.
  //bullets.push(Bullet());
}
 mouseReleased = function() {
  mouseIsPressed = false;
}


/*
På baggrund af specielle ønsker gøres det muligt at roterer bullet-billedet.

Vi udregner nedenunder vinklen mellem en bullets position og retning.
Derefter laver vi et "tegnelag" ovenpå vores normale canvas. (en Matrix, laves med "pushMatrix()").

Dette tegnelag kan flyttes og roteres, for derefter at smelte tilbage sammen med vores orginale lag (ved at bruge "popMatrix()").

Ved at flytte og roterer et tegnelag som vi tegner vores bullet-billede på, vises billedet rigtigt når vi smelter vores tegnelag tilbage i det normale billede (via popMatrix()).

*/
var drawBullet = function(bullet){

	//vinkel mellem position og retning
	
	
	pushMatrix();

	translate(bullet.x,bullet.y);

	//vi roterer ved at bruge matematik der regner vinklen af kuglen ud
	//vinklen kan bestemmes ud fra hvor kuglen er lige nu, og hvor den var sidste gang
	//dX og dY er forskellen mellem sidste position og nuværende position.
	
	var dX = (bullet.x - bullet.dirX)-bullet.x;
    var dY = (bullet.y - bullet.dirY)-bullet.y;
    var angle =  radians(atan2(dY, dX) * 180 / PI);
    rotate(angle);
	
	image(bulletImage,0,0, bulletPixelSize,bulletPixelSize);
		
	popMatrix();

}

/*
**TEGNE /DRAW FUNKTIONEN**

Her køres vores game-loop. Denne funktion kører 30 gange i sekundet. 
Alle de ting der hele tiden skal undersøges og ændre omkring vores mainCharacter, fjender og bullets, sker her eller kaldes gennem funktioner her.

*/

draw = function() {

    background(244, 244, 244);

	//først sætte vi hovedpersonens hastighed, efter hvilke knapper der er holdt inde
    mainCharacter.dirX = 0;
    mainCharacter.dirY = 0;
	
	
	//hver knap giver enten positiv eller negativ retning på x og y koordinaterne
    if(keys.a === true){
        mainCharacter.dirX += -speed;
    }
    if(keys.d === true){
        mainCharacter.dirX += speed;
    }
     if(keys.s === true){
        mainCharacter.dirY += speed;
    }
    if(keys.w === true){
        mainCharacter.dirY += -speed;
    }

    //efter vi har udregnet farten/retningen sætter vi vores hovedpersons koordinat til dens position + dens fart/retning (dirX og dirY).
    mainCharacter.x = mainCharacter.x + mainCharacter.dirX;
    mainCharacter.y = mainCharacter.y + mainCharacter.dirY;
    
     fill(255, 255, 255);
	 
	 //nu tegner vi vores hovedperson der hvor den nu befinder sig
	 image(mainCharacterImage ,mainCharacter.x,mainCharacter.y, mainCharacterPixelSize,mainCharacterPixelSize);
	 //Hvis man ikke kan loade billeder, kan ellipse bruges. (fjern // fra linjen nedenunder og sæt // ved "image" ovenover
	 //ellipse(mainCharacter.x,mainCharacter.y, 20, 20);

	//hver gang der er gået lidt tid, laver vi en ny fjende (1 sekund som default)
    if(millis() - lastEnemyTimestamp >= enemySpawnTime){
      lastEnemyTimestamp = millis() ;
	  //dette skubber et nyt fjende objekt på vores fjende liste
      enemies.push(Enemy());
    }
	
	//machine gun mode - lav kommentarer (//) ud fra de næste fire linjer, hvis dette skal slås fra, og kig i mousePressed
	if(mouseIsPressed && millis() - lastBulletTimestamp >= bulletSpawnTime){
     lastBulletTimestamp = millis() ;
     bullets.push(Bullet());
    }
    
    
	 //for hver bullet, tegner vi skuddet. "i" står for "Index"
     for(var i = bullets.length-1; i >=0; i--){
        
		//vi hiver hver skud ud fra listen af skud (bullets)
        var bullet = bullets[i];
        
		//og sætter dens nye position ligesom med hovedpersonen
        bullet.x = bullet.x + bullet.dirX;
        bullet.y = bullet.y + bullet.dirY;
        
		//hvis skuddet ryger ud fra banen, så sletter vi det.
        if(bullet.x < -5 || bullet.x > width+5 || bullet.y < -5 || bullet.y > height+5){
         //splice bruger to parametrer. Den første ("i") er der hvor vi gerne vil start med at slette noget, den anden "1", er hvor mange elementer frem, som vi vil slette.
		 bullets.splice(i,1);   
        }
        
		//og her tegner vi skuddet
		drawBullet(bullet);
        
    }
     fill(0, 0, 0);
	 
	 //for hver fjende, så tegner vi fjenden og renger ud om den er blevet ramt af en kugle
    for(var i = enemies.length-1; i >=0; i--){
        
	   //vi hiver hver fjende ud fra listen af fjender
       var enemy = enemies[i];
        
		//og sætter dens nye position ligesom med hovedpersonen
        enemy.x = enemy.x + enemy.dirX;
        enemy.y = enemy.y + enemy.dirY;
        
		//hvis fjenden ryger ud fra banen, så sletter vi det.
        if(enemy.x < 0 || enemy.x > width || enemy.y < 0 || enemy.y > height){
         enemies.splice(i,1);   
        }
       
	    // Vi tjekker på hver kugle, for at se om den rammer fjenden vi kigger på
		//(Dette er en dobbelt for-løkke), en for-løkke inde i en løkke
        for(var x = bullets.length-1; x >=0; x--){
    
        var bullet = bullets[x];    
    
		//dette er en formel, der udregner længden mellem to punkter (her fjenden og kuglen) 
        var distance = Math.sqrt( (bullet.x-enemy.x)*(bullet.x-enemy.x) + (bullet.y-enemy.y)*(bullet.y-enemy.y) );
		
		//hvis distancen er for lav, så har skuddet ramt
		//så vi sætter fjenden til lavere liv og fjerner skuddet
		if(distance < (enemySize+ enemy.health) / 2 + 2.5){
         enemy.health -= 1;
         bullets.splice(x,1);   
        }
		
        }
        
		//hvis fjenden har nul eller mindre i liv, så fjernes den
        if(enemy.health < 1)
         {
             enemies.splice(i,1);   
             continue;
         }
        
		//tegn fjenden
        image(enemyImage,enemy.x,enemy.y, enemySize + enemy.health ,enemySize + enemy.health );
		
        
    }
    
};
		
    }};

    // Get the canvas that Processing-js will use
    var canvas = document.getElementById("mycanvas"); 
    // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
    var processingInstance = new Processing(canvas, sketchProc); 