/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;
var rock1, rockGroup;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadImage("assets/rocket.png");
  kangaroo_collided = loadAnimation("assets/balst2.png");
  jungleImage = loadImage("assets/spacebg.jpg");
  shrub1 = loadImage("assets/star.png");
  shrub2 = loadImage("assets/star.png");
  shrub3 = loadImage("assets/star.png");
  obstacle1 = loadImage("assets/therock.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  rock1=loadImage("assets/stone.png");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(600, 600);
  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=1.3
  jungle.x = width /2;
  text("score:"+score,510,50)
  kangaroo = createSprite(250,200,20,50);
  kangaroo.addAnimation("running", kangaroo_running);
  kangaroo.addAnimation("collided", kangaroo_collided);
  kangaroo.scale = 0.15;
  kangaroo.setCollider("circle",0,0,300)

  //invisibleGround = createSprite(400,350,1600,10);
  //invisibleGround.visible = false;
  
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  rockGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  



  kangaroo.x=camera.position.x-270;
   
  if (gameState===PLAY){

    jungle.velocityY=-3

    if(jungle.y<50)
    {
       jungle.y=600
    }
   console.log(kangaroo.y)
    if(keyDown("space")) {
      jumpSound.play();
      kangaroo.velocityY = -16;
    }
  
    kangaroo.velocityY = kangaroo.velocityY + 0.8
    if(keyDown("A")) {
     kangaroo.x=kangaroo.x-3
    }
    if(keyDown("D")) {
      kangaroo.x=kangaroo.x+100
     }
    spawnShrubs();
    spawnObstacles();
     spawnRocks();
    //kangaroo.collide(invisibleGround);
    
    if(obstaclesGroup.isTouching(kangaroo)){
      collidedSound.play();
      gameState = END;
    }

    if(rockGroup.isTouching(kangaroo)){
      collidedSound.play();
      gameState = END;
    }
    if(shrubsGroup.isTouching(kangaroo)){

      shrubsGroup.destroyEach();
    }
  }
  else if (gameState === END) {
    //set velcity of each game object to 0
    kangaroo.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);
    rockGroup.setVelocityXEach(0);
    //change the trex animation
    kangaroo.changeAnimation("collided",kangaroo_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
    rockGroup.setLifetimeEach(-1);
  }

  
  drawSprites();


}

function spawnShrubs() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {

    var shrub = createSprite(camera.position.x+500,330,40,10);

    shrub.velocityX = -(6 + 3*score/100)
    shrub.scale = 1;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the shrub           
    shrub.scale = 0.05;
     //assign lifetime to the variable
    shrub.lifetime = 400;
    
    shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
    //add each cloud to the group
    shrubsGroup.add(shrub);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {

    var obstacle = createSprite(camera.position.x+400,330,40,40);
    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.addImage(obstacle1);
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.scale = 0.3;
    //assign scale and lifetime to the obstacle           
 
    obstacle.lifetime = 400;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
  }
}

function spawnRocks () {
  if(frameCount % 200 === 0 ) {
    var rock = createSprite(random(10,400),0,40,40)
    rock.scale=0.2
    rock.debug=false
    rock.setCollider("circle",0,0,120)
    rock.addImage(rock1)
    rock.velocityY = 6 
    rock.lifetime = 400
    rockGroup.add(rock)
  
  }
}