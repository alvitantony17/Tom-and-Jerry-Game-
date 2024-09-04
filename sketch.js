var tom;
var tomImage;
var jerry;
var jerryImage;
var ground;
var groundImage;
var invisibleSky;
var invisibleGround;
var trap;
var trapImage;
var trap2;
var trap2Image;
var over;
var overImage;
var gameOver;
var gameOverImage;
var sound;
var bing;
var score;
var distance;
var cheese;
var cheeseImage;
var jelly;
var jellyImage;
var spike;
var spikeImage;
var angry;
var angryImage;
var cat;
var catImage;
var baby;
var babyImage;
var chocolate;
var chocolateImage;
var ice;
var iceImage;
var foodGroup;
var invi;

function preload(){
  tomImage=loadImage("tom.png")
  groundImage=loadImage("back.jpg")
  jerryImage=loadImage("jerry.png")
  trapImage=loadImage("trap.png")
  trap2Image=loadImage("trap2.png")
  overImage=loadImage("over.png")
  gameOverImage=loadImage("gameover.png")
  restartImage=loadImage("restart.png")
  sound=loadSound("song.mp3")
  bing=loadSound("bing.wav")
  cheeseImage=loadImage("cheese.png")
  jellyImage=loadImage("jelly.png")
  spikeImage=loadImage("spike.png")
  angryImage=loadImage("angry.png")
  catImage=loadImage("cat.png")
  babyImage=loadImage("baby.png")
  chocolateImage=loadImage("chocolate.png")
  iceImage=loadImage("ice.png")

}

function setup(){
  createCanvas(windowWidth,windowHeight)
  background("white")

  ground=createSprite(0,100,1100,600)
  ground.addImage("ground",groundImage)
  ground.scale=2
  ground.velocityX=-3

  invisibleSky=createSprite(200,120,500,330)
  invisibleGround=createSprite(300,620,400,100)
  invi=createSprite(90,120,1000,1000)
  invisibleSky.visible=false
  invisibleGround.visible=false
  invi.visible=false

  tom=createSprite(100,500,50,20)
  tom.addImage("tom",tomImage)
  tom.scale=0.5
  
  jerry=createSprite(280,550,50,20)
  jerry.addImage("jerry",jerryImage)
  jerry.scale=0.2
  jerry.debug=false
  jerry.setCollider("circle",0,0,120)
  
  trap=createSprite(800,500,50,20)
  trap.addImage("trap",trapImage)
  trap.scale=0.1
  trap.velocityX=-5

  trap2=createSprite(800,300,50,50)
  trap2.addImage("trap2",trap2Image)
  trap2.scale=0.1
  trap2.velocityX=-5


  over=createSprite(480,350,50,20)
  over.addImage("over",overImage)
  over.scale=0.5
  over.visible=false

  gameOver=createSprite(480,150,50,20)
  gameOver.addImage("gameover",gameOverImage)
  gameOver.scale=0.5
  gameOver.visible=false

  restart=createSprite(680,150,50,20)
  restart.addImage("restart",restartImage)
  restart.scale=0.1
  restart.visible=false

  spike=createSprite(1000,150,50,20)
  spike.addImage("spike",spikeImage)
  spike.scale=1
  spike.velocityX=-5

  baby=createSprite(1500,150,50,20)
  baby.addImage("baby",babyImage)
  baby.scale=0.5
  baby.velocityX=-5

  angry=createSprite(700,350,50,20)
  angry.addImage("angry",angryImage)
  angry.scale=0.8
  angry.visible=false

  cat=createSprite(1300,150,50,20)
  cat.addImage("cat",catImage)
  cat.scale=0.3
  cat.velocityX=-5
  

  sound.play();

  score = 0
  distance = 0
  
  foodGroup=createGroup();

}

function draw(){
 background(1000)

  if(ground.x<0){
    ground.x=ground.width/1
  }
 
  jerry.y= World.mouseY
  
  jerry.collide(invisibleSky)
  jerry.collide(invisibleGround)
  
  if(trap.x<0){
    trap.x=Math.round(random(1200,900))
    trap.y=Math.round(random(300,600))
  }
  
  if(trap2.x<0){
    trap2.x=Math.round(random(1000,900))
    trap2.y=Math.round(random(300,600))
  }
    
  
  
  if(foodGroup.isTouching(jerry)){
    score=score+1
  }
  
  if(spike.x<0){
    spike.x=1300
  }

  if(baby.x<0){
    baby.x=1700
  }
  
 


if(score>=5){
  trap.velocityX=trap.velocityX+-0.01
  trap2.velocityX=trap.velocityX+-0.01
}

if(cat.x<0){
  cat.x=1300
}

foodGroup.setLifetimeEach(10)


if(jerry.isTouching(trap)||jerry.isTouching(trap2)){
  jerry.visible=false
  jerry.y=1000
  jerry.x=1000
  tom.visible=false
  gameOver.visible=true
  restart.visible=false
  trap.visible=false
  trap2.visible=false
  angry.visible=true
  over.visible=true
  spike.visible=false
  ground.velocityX=0
  cat.visible=false
  baby.visible=false
  score=0
  foodGroup.setVelocityEach(1000)
  foodGroup.destroyEach()

}



if(foodGroup.isTouching(jerry)){
  foodGroup.destroyEach()
  bing.play();
}

  spawnFood();


  drawSprites();
  textSize(25);
  text("Score : "+ score,250,50);
  
  
  }
  
  
function spawnFood(){
  if(frameCount%60===0){
    var food =createSprite(400,400,160,20)
    food.velocityX=-10
    
  
    
    var rand=Math.round(random(1,4));
    switch(rand){
      case 1:food.addImage(cheeseImage)
             break;
      case 2:food.addImage(jellyImage)
             break;
      case 3:food.addImage(chocolateImage)
             break;
      case 4:food.addImage(iceImage)
      default: break;
    }
   
    food.scale=0.12
    food.x=Math.round(random(600,900))
    food.y=Math.round(random(300,600))
    foodGroup.add(food)

  
    }
    
  }

  function stopFood(){
    foodGroup.destroyEach();
    foodGroup.setLifetimeEach(-1)
    foodGroup.setVelocityEach(0)
  }

  






