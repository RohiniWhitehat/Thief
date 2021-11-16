var database;
var superhero, superheroImg;
var ground,groundImg;
var thief,thiefImg,thief2Img;
var sword,swordImg;
var coin,coinImg;
var building,building_Img;
var gun,gun_Img;
var diamond,diamond_Img;
var score = 0;
var cGroup,sGroup;
var bullet,bulletImg,bulletG;
var gameState = PLAY;
var PLAY = 0;
var END = 1;
var form,player,game;

function preload(){
    superheroImg = loadAnimation("Images/SuperheroGirl1.png","Images/SuperheroGirl2.png");
    groundImg = loadImage("Images/Garden4.jpg");
    thiefImg = loadAnimation("Images/Thief3.png","Images/Thief4.png");
    swordImg = loadImage("Images/Sword.png");
    coinImg = loadImage("Images/Coin1.png");
    building_Img = loadImage("Images/Building.png");
    gun_Img = loadImage("Images/Gun.png");
    diamond_Img = loadImage("Images/DiamondImg.png");
    bulletImg = loadImage("Images/Bullet.png");
    thief2Img = loadAnimation("Images/Thief4.png")
}

function setup(){
    
    createCanvas(displayWidth,displayHeight);
    // database = firebase.database();
    //  game = new Game();
    //  game.getState();
    //  game.start();

    ground = createSprite(0,0,displayWidth,displayHeight);
    ground.addImage("gr",groundImg);
    ground.scale = 6;

    superhero = createSprite(250,200,10,10);
    superhero.addAnimation("superhero",superheroImg);
    superhero.scale = 0.4;

    thief = createSprite(displayWidth-190,300,20,20);
    thief.addAnimation("thief",thiefImg);
    thief.addAnimation("thief2",thief2Img);
    thief.scale = 0.3;
    thief.mirrorX(thief.mirrorX()*-1);
    
    gun = createSprite(displayWidth-240,290,20,20);
    gun.addImage("gun",gun_Img);
    gun.scale = 0.2;

    diamond = createSprite(displayWidth-150,290,200,20);
    diamond.addImage("diamond",diamond_Img);
    diamond.scale = 0.04;

    gameState = PLAY;
    edges = createEdgeSprites();

    sGroup = new Group();
    cGroup = new Group();
    bulletG = new Group();
}

function draw(){
      background("white");
      gun.y = thief.y-15;
      diamond.y = thief.y-15;
    
      if(gameState===PLAY){
        superhero.y = mouseY;
        thief.velocityY = +2;

        if(superhero.isTouching(cGroup)){
          cGroup.destroyEach();
          score = score+2;
          superhero.x = superhero.x+30;
        }
        thief.bounceOff(edges[2]);
        thief.bounceOff(edges[3]);

        superhero.bounceOff(edges[2]);
        superhero.bounceOff(edges[3]);

        spawnSwords();
        spawnCoins();
        Bullets();

        if(superhero.isTouching(sGroup)){
          gameState=END;
        }
      }
      if(gameState===END){
          console.log("In end state")
          thief.velocityY=0;
          superhero.velocityY=0;
          sGroup.setVelocityXEach(0);
          sGroup.setLifetimeEach(-1);
          cGroup.destroyEach();
          bulletG.destroyEach();
          thief.changeAnimation("thief2",thief2Img);
          text("Game Over",300,300);
      }

    drawSprites();
    if(gameState===END){
      text("Game Over",300,300);
    }
    textSize(20);
    fill("black");
    stroke("Black");
    text("Score : " +score,displayWidth-240,30);
}

function spawnSwords(){
  if(frameCount%100===0){
    sword = createSprite(displayWidth-200,displayHeight,20,20);
    sword.addImage("Sword",swordImg);
    sword.scale = 0.2;
    sword.y = Math.round(random(50,700));
    sword.velocityX = -4;
    sword.lifetime = 400;
    sGroup.add(sword);
   }
}

function spawnCoins(){
  if(frameCount%100===0){
    coin = createSprite(displayWidth-50,displayHeight,20,20);
    coin.addImage("coin",coinImg);
    coin.scale = 0.3;
    coin.y = Math.round(random(50,700));
    coin.velocityX = -4;
    coin.lifetime = 400;
    cGroup.add(coin);
  }
}

// function SpawnBuilding(){
//   if(frameCount%100===0){

//   }
// }

function Bullets(){
  if(frameCount%100===0){
    bullet = createSprite(displayWidth-50,displayHeight,20,20);
    bullet.addImage("bullet",bulletImg);
    bullet.scale = 0.3;
    bullet.y = Math.round(random(50,700));
    bullet.velocityX = -4;
    bullet.lifetime = 400;
    bulletG.add(bullet);
  }
}

// make both class project and the Pro project as muliplayer game and as realtime database
// make buildings and bullets randomly appear at the screen
// Gamestate creation explanation;
// 
