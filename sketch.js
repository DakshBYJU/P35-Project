const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var Rocket, RocketImg

var space,backgroungImg
var Rock


var RockG

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, gameOverImg, restart;

function preload(){
  backgroundImg = loadImage("space img.jpeg");
  RocketImg = loadImage("Rocket img.jpeg")
  
  RockImg = loadImage("rock.jpeg");

gameOverImg = loadImage("gameover.jpeg")
}


function setup() {
  createCanvas(1200,300);
space=createSprite(600,150,1200,300);
  
  space.addImage(backgroundImg);
  space.velocityX = -5;
  
  Rocket  = createSprite(70,150);
  Rocket.addAnimation(RocketImg);
  Rocket.scale=0.07;
  Rocket.setCollider("rectangle",0,0,40,40);
  
  
  
    
  gameOver = createSprite(650,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;  
    
  RockG = new Group();
  
  engine = Engine.create();
  world = engine.world;
  
}


function draw() 
{
  background(51);
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);

  Engine.update(engine);
  
}
if(gameState===PLAY){
    
  distance = distance + Math.round(frameRate()/50);
  space.velocityX = -(6 + 2*distance/150);
 
  Rocket.y = World.mouseY;
 
  edges= createEdgeSprites();
  Rocket .collide(edges);
 
 
 if(space.x < 0 ){
   space.x = width/2;
 }
 
 

 
 
 var rock = Math.round(random(1,3));
 
 if (World.frameCount % 150 == 0) {
   if (RockG == 1) {
     RockG();
   }
 }
 
  if(RockG.isTouching(Rocket)){
    gameState = END;
    rockImg.velocityY = 0;
    rockImg.addAnimation("Rock.jpeg");
   }
   
   
   
   
   
}else if (gameState === END) {
   gameOver.visible = true;
 
   textSize(20);
   fill(255);
   text("Press Up Arrow to Restart the game!", 500,200);
 
   space.velocityX = 0;
   Rocket.velocityY = 0;
   Rocket.addAnimation("Rocket2.jpeg");
 
   RockG.setVelocityXEach(0);
   RockG.setLifetimeEach(-1);
 
  
   


    if(keyDown("UP_ARROW")) {
      reset();
    }
    drawSprites();
}

function Rock(){
       Rock =createSprite(1100,Math.round(random(50, 250)));
       Rock.scale =0.06;
       Rock.velocityX = -(6 + 2*distance/150);
       Rock.addAnimation(RockImg);
       Rock.setLifetime=170;
       RockG.add(Rock);
}




function reset(){
 gameState = PLAY;
 gameOver.visible = false;
 Rocket.addAnimation(RocketImg);
 
 RockG.destroyEach();

 
 distance = 0;
}
