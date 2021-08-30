//Hello

var player,ground,titleImg;
var imageTitle;
var playButton;
var playerImg;
var breadImg,carrotImg,appleImg,milkImg,meatImg,donutImg;
var playImg;

var bread,vegs,milk,meat,donut;

var music,deathSound;

var win=0;

var rand;

var restart,restartImg;

var START=0;
var PLAY=1;
var INFORMATION=2;
var END=3;

var infoBack,backImg;
var whereBack=0;

var gameState=START;

var menu;
var breadEaten=0;
var vegsEaten=0;
var milkDrank=0;
var meatEaten=0;
var donutEaten=0;

var breadG,vegsG,milkG,meatG,donutG,poisonG;

var bg,gImg;

var infoButton,infoImg;

var foodPyramid,pyrImg;

var winSound,eatSound;
var touchScreen;

var mouseP;

var playSize,infoSize;

var poisonImg1,poisonImg2;

var LEVEL1=1,LEVEL2=2,LEVEL3=3,LEVEL4=5,LEVEL5=5;

function preload(){
    titleImg=loadImage("hungerlogo.png");
    playerImg=loadImage("player.png");
    breadImg=loadImage("bread.png");
    carrotImg=loadImage("carrot.png");
    appleImg=loadImage("apple1.png");
    milkImg=loadImage("milk.png");
    meatImg=loadImage("meat.png");
    donutImg=loadImage("donut.png");
    playImg=loadImage("start.png");
    bg=loadImage("bgHunger.png");
    gImg=loadImage("ground.png");
    restartImg=loadImage("restart.png");
    infoImg=loadImage("infobuttonthing.png");
    pyrImg=loadImage("foodpyramid.jpg");
    deathSound=loadSound("death.wav");
    music=loadSound("music.wav");
    backImg=loadImage("back.png");
    winSound=loadSound("win.mp3");
    eatSound=loadSound("eat.wav");
    poisonImg1=loadImage("poison1.png");
    poisonImg2=loadImage("poison2.png");
}

function setup(){
    engine=Matter.Engine.create();
    world=engine.world;

    createCanvas(displayWidth,displayHeight-150)
    player=createSprite(200,displayHeight-300,40,50);
    player.addImage(playerImg);
    player.scale=0.24;
    //player.debug=true;
    touchScreen=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
    touchScreen.visible=false;

    ground=createSprite(displayWidth,displayHeight-120,displayWidth*5,240);
    ground.velocityX=-10;
    ground.addImage(gImg);
    ground.scale=1.2;
    //ground.shapeColor="rgb(131,203,83)";
    //ground.debug=true;
    ground.setCollider("rectangle",0,0,displayWidth*5,230);

    playButton=createSprite((displayWidth/2)-5,(displayHeight/2)+16);
    //playButton.debug=true;
    playButton.scale=0.12;
    playButton.addImage(playImg);

    restart=createSprite(displayWidth/2-5,displayHeight/2+40);
    restart.addImage(restartImg);
    restart.scale=0.3;
    restart.visible=false;

    infoButton=createSprite((displayWidth/2)-5,displayHeight/2-70);
    infoButton.addImage(infoImg);
    infoButton.scale=0.12;

    menu=new Menu();

    breadG=new Group();
    poisonG=new Group();
    vegsG=new Group();
    milkG=new Group();
    meatG=new Group();
    donutG=new Group();

    foodPyramid=createSprite((displayWidth/2)-370,displayHeight/2-100);
    foodPyramid.addImage(pyrImg);
    foodPyramid.scale=0.3;
    foodPyramid.visible=false;

    infoBack=createSprite(85,70);
    infoBack.addImage(backImg);
    infoBack.scale=0.45;
    infoBack.visible=false;

    mouseP=createSprite(mouseX,mouseY,0.1,0.1);

    playSize=0.12;
    infoSize=0.12;
}

function draw(){

    Matter.Engine.update(engine);

    background(bg);

    mouseP.x=mouseX;
    mouseP.y=mouseY;

    if(gameState===START){
        menu.display();

        fill("black");
        textSize(20);
        text("© Copyright 2021 R*****A",displayWidth/2-120,displayHeight/2+220);
        text("Thanks to Google and some websites for images/sounds",displayWidth/2-250,displayHeight/2+255);

        player.visible=false;
        ground.visible=false;

        playButton.visible=true;
        infoButton.visible=true;

        imageTitle.visible=true;

        infoButton.y=displayHeight/2+100;

        if(mouseP.isTouching(playButton)){
            playSize=playSize+((0.15-playSize)/4.5);
            playButton.scale=playSize;
        }else{
            playSize=playSize+((0.12-playSize)/4.5);
            playButton.scale=playSize;       
        }

        if(mouseP.isTouching(infoButton)){
            infoSize=infoSize+((0.15-infoSize)/4.5);
            infoButton.scale=infoSize;
        }else{
            infoSize=infoSize+((0.12-infoSize)/4.5);
            infoButton.scale=infoSize;
        }

        if(mousePressedOver(playButton)||(touches.length>0&&mouseP.isTouching(playButton))){
            music.play();
            gameState=LEVEL1;
            player.y=displayHeight-300;
        }

        if(mousePressedOver(infoButton)||(touches.length>0&&mouseP.isTouching(infoButton))){
            whereBack=0;
            gameState=INFORMATION;
        }
        
    }
    
    if(gameState===LEVEL1){

        if((keyDown("SPACE")||touches.length>0||mousePressedOver(touchScreen))&&player.y>displayHeight-300){
            player.velocityY=-30;
            touches = [];
        }

        //gravity code


        textSize(20);
        strokeWeight(1);

        if(breadEaten<4){            
            stroke("black");
            fill("black");
            text("Bread Eaten: "+breadEaten,80,100);

        }else{
            stroke("red");
            fill("red");
            text("Bread Eaten: "+breadEaten,80,100);
  
        }

        //if(vegsEaten<3){            
        //    stroke("black");
        //    fill("black");
        //    text("Carrots/Apples Eaten: "+vegsEaten,80,140);
//
        //}else{
        //    stroke("red");
        //    fill("red");
        //    text("Carrots/Apples Eaten: "+vegsEaten,80,140);
  //
        //}

        imageTitle.visible=false;
        playButton.visible=false;
        infoButton.visible=false;

        player.visible=true;
        ground.visible=true;

        player.velocityY=player.velocityY+2;

        player.collide(ground);

        if(ground.x<0){
            ground.x=displayWidth/2;
        }

        spawnBread();
        spawnPoison();
        //spawnVegs();

        if(breadG.isTouching(player)){
            breadEaten++;
            breadG[0].destroy();
            eatSound.play();
        }

        //if(vegsG.isTouching(player)){
        //    vegsEaten++;
        //    vegsG[0].destroy();
        //    eatSound.play();
        //}

        if(breadEaten>4||vegsEaten>3||milkDrank>3||meatEaten>2||donutEaten>1){
            win=0;
            deathSound.play();
            music.stop();
            gameState=END;
        }

        if(breadEaten===4&&vegsEaten===3&&milkDrank===3&&meatEaten===2&&donutEaten===1){
            win=1;
            music.stop();
            winSound.play();
            gameState=END;
        }

        if(breadEaten===4&&vegsEaten===3){
            spawnMilk();
            spawnMeat();
            spawnDonut();

            if(milkG.isTouching(player)){
                milkDrank++;
                milkG[0].destroy();
                eatSound.play();
            }

            if(meatG.isTouching(player)){
                meatEaten++;
                meatG[0].destroy();
                eatSound.play();
            }

            if(donutG.isTouching(player)){
                donutEaten++;
                donutG[0].destroy();
                eatSound.play();
            }
            
            if(milkDrank<3){            
                stroke("black");
                fill("black");
                text("Milk Drank: "+milkDrank,80,180);
    
            }else{
                stroke("red");
                fill("red");
                text("Milk Drank: "+milkDrank,80,180);
      
            }

            if(meatEaten<2){
                stroke("black");
                fill("black");
                text("Meat Eaten: "+meatEaten,80,220);
    
            }else{
                stroke("red");
                fill("red");
                text("Meat Eaten: "+meatEaten,80,220);
      
            }

            if(donutEaten<1){            
                stroke("black");
                fill("black");
                text("Donut Eaten: "+donutEaten,80,260);
    
            }else{
                stroke("red");
                fill("red");
                text("Donut Eaten: "+donutEaten,80,260);
      
            }
        }

    }

    if(gameState===END&&win===0){

        breadEaten=0;
        vegsEaten=0;
        milkDrank=0;
        meatEaten=0;
        donutEaten=0;

        breadG.destroyEach();
        vegsG.destroyEach();
        milkG.destroyEach();
        meatG.destroyEach();
        donutG.destroyEach();

        player.visible=false;

        restart.visible=true;

        infoButton.visible=true;
        infoButton.y=displayHeight/2+140;

        if(ground.x<0){
            ground.x=displayWidth/2;
        }

        textSize(80);
        fill("red");
        strokeWeight(1);
        stroke("red");
        text("GAME OVER",(displayWidth/2)-250,displayHeight/2-100);
        textSize(30);
        fill("black");
        text("You need to eat a balanced diet to stay healthy!",(displayWidth/2)-300,displayHeight/2-50);

        if(mousePressedOver(restart)||(touches.length>0&&mouseP.isTouching(restart))){
            gameState=LEVEL1;
            restart.visible=false;
            player.y=displayHeight-200;
            music.play();
            deathSound.stop();
        }

        if(mousePressedOver(infoButton)||(touches.length>0&&mouseP.isTouching(infoButton))){
            whereBack=1;
            gameState=INFORMATION;
        }
    }

    if(gameState===END&&win===1){
        breadG.destroyEach();
        vegsG.destroyEach();
        milkG.destroyEach();
        meatG.destroyEach();
        donutG.destroyEach();

        player.visible=false;

        restart.visible=true;

        infoButton.visible=true;
        infoButton.y=displayHeight/2+140;

        if(ground.x<0){
            ground.x=displayWidth/2;
        }

        textSize(80);
        fill("green");
        strokeWeight(1);
        stroke("green");
        text("YOU WIN!",(displayWidth/2)-210,displayHeight/2-100);
        textSize(30);
        fill("black");
        strokeWeight(1);
        stroke("black");
        text("Congratulations, your balanced diet made you healthy!",(displayWidth/2)-330,displayHeight/2-50);

        if(mousePressedOver(restart)||(touches.length>0&&mouseP.isTouching(restart))){
            gameState=PLAY;
            winSound.stop();
            music.play();
            breadEaten=0;
            vegsEaten=0;
            milkDrank=0;
            meatEaten=0;
            donutEaten=0;
            restart.visible=false;
            player.y=displayHeight-200;
        }

        if(mousePressedOver(infoButton)||(touches.length>0&&mouseP.isTouching(infoButton))){
            whereBack=2;
            gameState=INFORMATION;
        }

    }

    if(gameState===INFORMATION){
        playButton.visible=false;
        imageTitle.visible=false;

        ground.visible=false;
        restart.visible=false;
        infoButton.visible=false;
        foodPyramid.visible=true;

        if(ground.x<0){
            ground.x=displayWidth/2;
        }

        textSize(30);
        fill("black");

        stroke("black");
        strokeWeight(0.5);
    
        text("Eat a food until the food's text turns to the color of red. Once it turns red, avoid that food.",displayWidth/2-700,displayHeight/2+210);
        text("Remember: A balanced diet makes a healthy body!                  Press Space or Tap/Click to jump in the game.",displayWidth/2-700,displayHeight/2+260);
        
        image(donutImg,displayWidth/2-100,displayHeight/2-330,150,150);
        text("Eat only 1 donut to maintain the perfect diet",displayWidth/2+20,displayHeight/2-245);

        image(meatImg,displayWidth/2-57,displayHeight/2-215,70,70);
        text("Eat 2 meats to maintain the perfect diet",displayWidth/2+20,displayHeight/2-175);

        image(milkImg,displayWidth/2-100,displayHeight/2-190,150,150);
        text("Drink 3 milks to maintain the perfect diet",displayWidth/2+20,displayHeight/2-105);

        image(carrotImg,displayWidth/2-90,displayHeight/2-135,150,150);
        image(appleImg,displayWidth/2-95,displayHeight/2-100,150,150);
        text("Eat 3 apples/carrots to maintain the perfect diet",displayWidth/2+20,displayHeight/2-30);

        image(breadImg,displayWidth/2-100,displayHeight/2-30,150,150);
        text("Eat 4 bread to maintain the perfect diet",displayWidth/2+20,displayHeight/2+50);

        textSize(90);
        stroke("black");
        strokeWeight(4);
        text("Information",displayWidth/2-230,100);

        infoBack.visible=true;

        if((mousePressedOver(infoBack)||(touches.length>0&&mouseP.isTouching(infoBack)))&&whereBack===0){
            gameState=START;
            foodPyramid.visible=false;
            infoBack.visible=false;
        }else if((mousePressedOver(infoBack)||(touches.length>0&&mouseP.isTouching(infoBack)))&&whereBack===1){
            win=0;
            gameState=END;
            foodPyramid.visible=false;
            infoBack.visible=false;
            ground.visible=true;
            restart.visible=true;
        }else if((mousePressedOver(infoBack)||(touches.length>0&&mouseP.isTouching(infoBack)))&&whereBack===2){
            win=1;
            gameState=END;
            foodPyramid.visible=false;
            infoBack.visible=false;
            ground.visible=true;
            restart.visible=true;
        }
    }

    drawSprites();



    ground.depth=player.depth;
    ground.depth=ground.depth-10;

}

function spawnBread(){
    if(frameCount%60===0){
        bread=createSprite(displayWidth,Math.round(random(displayHeight-465,displayHeight-300)));
        bread.velocityX=-15;
        bread.scale=2;
        //bread.shapeColor="yellow";
        bread.addImage(breadImg);
        breadG.add(bread);
        bread.lifetime=120;
        //bread.debug=true;
        bread.setCollider("rectangle",4,-2,25,20);
    }
}

function spawnVegs(){
    if(frameCount%300===0){
        vegs=createSprite(displayWidth,Math.round(random(displayHeight-500,displayHeight-300)));
        vegs.velocityX=-10;
        vegs.scale=2.2;
        if(Math.round(random(1,2))===1){
            vegs.addImage(carrotImg);            
        }else{
            vegs.addImage(appleImg);
        }
        //vegs.shapeColor="lightgreen";
        vegsG.add(vegs);
        vegs.lifetime=200;
        //vegs.debug=true;
        vegs.setCollider("circle",-3,3,10);
    }
}

function spawnMilk(){
    if(frameCount%150===0){
        milk=createSprite(displayWidth,Math.round(random(displayHeight-500,displayHeight-300)));
        milk.addImage(milkImg);
        milk.velocityX=-9;
        milk.scale=1.7;
        milkG.add(milk);
        milk.lifetime=200;
        //milk.debug=true;
        milk.setCollider("circle",2,0,17);
    }
}

function spawnMeat(){
    if(frameCount%200===0){
        meat=createSprite(displayWidth,Math.round(random(displayHeight-500,displayHeight-300)));
        meat.addImage(meatImg);
        meat.velocityX=-9;
        meat.scale=0.9;
        meatG.add(meat);
        meat.lifetime=200;
        //meat.debug=true;
        meat.setCollider("rectangle",0,-1,60,35);
    }
}

function spawnDonut(){
    if(frameCount%80===0){
        donut=createSprite(displayWidth,Math.round(random(displayHeight-500,displayHeight-300)));
        donut.addImage(donutImg);
        donut.velocityX=-9;
        donut.scale=1.7;
        donutG.add(donut);
        donut.lifetime=200;
        //donut.debug=true;
        donut.setCollider("rectangle",2,2,14,10);
    }
}

function spawnPoison(){
    if(frameCount%100===0){
        poison=createSprite(displayWidth,Math.round(random(displayHeight-500,displayHeight-300)));
        rand = Math.round(random(1,2));
        if(rand===1){
            poison.addImage(poisonImg1);
            poison.setCollider("rectangle",-2,-3,7,16);
        }else{
            poison.addImage(poisonImg2);
            poison.setCollider("rectangle",-1,-1,14,15);
        }
        poison.velocityX=-6;
        poison.scale=2.5;
        poisonG.add(poison);
        poison.lifetime=290;
        //poison.debug=true;
    }
}