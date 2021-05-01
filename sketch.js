const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var penState = null;
var edges
var pushStr = 0
var edges;
var gameState="outSchoolLoad";
var player;
var school;
var canFire = true;
var speed = 0;
var coinCount = 0;
var w = "working";
var canStart = null;
var penFightText = null;
// var levelState = "none";

function preload() {
  boy_f = loadAnimation("images/boy2-f1.png","images/boy2-f2.png","images/boy2-f1.png","images/boy2-f3.png");
  boy_b = loadAnimation("images/boy2-b1.png","images/boy2-b2.png","images/boy2-b1.png","images/boy2-b3.png");
  boy_r = loadAnimation("images/boy2-r1.png","images/boy2-r2.png","images/boy2-r1.png","images/boy2-r3.png");
  boy_l = loadAnimation("images/boy2-l1.png","images/boy2-l2.png","images/boy2-l1.png","images/boy2-l3.png");

  boyF = loadAnimation("images/boy2-f1.png");
  boyB = loadAnimation("images/boy2-b1.png");
  boyR = loadAnimation("images/boy2-r1.png");
  boyL = loadAnimation("images/boy2-l1.png");

  boyLevel2 = loadImage("images/boy2-l1.png");

  school_img = loadImage("images/school.png");

  schoolB_img = loadImage("images/schoolBoard.gif");

  inSchool_img = loadImage("images/43bg.png");

  exit_img = loadImage("images/exit.png");

  teacher_img = loadImage("images/teacher.png");

  table_img = loadImage("images/table.png");

  pen1_img = loadImage("images/pen1.png");
  pen2_img = loadImage("images/pen2.png");

  donkey_img = loadImage("images/donkey.png");

  arrow_img = loadImage("images/arrow.png");
  arrowKeys_img = loadImage("images/arrowKeys.png");
 
  coin_img= loadImage("images/coin.png");

  level2bg = loadImage("images/Classroom.png");

  track_img =loadImage("images/track.jpg");

  redCar_img = loadImage("images/redCar.png");

  greenCar_img = loadImage("images/greenCar.png");

}

function setup(){
  createCanvas(400,400);
  // edges = createEdgeSprites();

  engine = Engine.create();
  world = engine.world;

  groundG = new Group();
  exitG = new Group();

  pos = createButton("Reset position");
  pos.position(1000,100);
  pos.mousePressed(()=>{
    if(gameState === "outSchool"){
      player.x = -75;
      player.y = 305;
    }
    if(gameState==="inSchool"){
      player.x = 100;
      player.y = 425;
    }
  })

}

function draw() {

  // console.log("GameState : "+gameState);

  Engine.update(engine);
  
  //console.log(gameState);

//=====================================================================================================================//
//                                                  OUT SCHOOL                                                         //
//=====================================================================================================================//

  if(gameState==="outSchoolLoad"){

    var nothing = 70;
    createCanvas(16*nothing , 9*nothing);

    school = createSprite(55,125,20,20);
    school.addImage(school_img);
    school.scale = 0.6;

    schoolGate = createSprite(school.x-130,school.y+100,50,80);
    schoolGate.visible = false;

    schoolBoard = createSprite(school.x-250,school.y+100,20,20);
    schoolBoard.addImage(schoolB_img);
    schoolBoard.scale = 0.25;

    ground1 = new Path(school.x-130,school.y+300,200,280);
    ground2 = new Path(school.x+330,school.y+330,750,140);
    ground1.body.visible = false;
    ground2.body.visible = false;
    groundG.add(ground1.body);
    groundG.add(ground2.body);

    createPlayer();

    gameState="outSchool";
  }

  if(gameState==="outSchool"){
    background("#5D91F7");

    if(playerFeet.isTouching(schoolGate)){
      school.destroy();
      schoolGate.destroy();
      schoolBoard.destroy();
      player.destroy();
      playerFeet.destroy();
      ground1.body.destroy();
      ground2.body.destroy();
//-------------------------------------------------TO BE CHANGED-------------------------------------------------------//
      gameState="inSchoolLoad";
    }

    if(coinCount>0){
    textAlign(CENTER);
    fill("white");
    textSize(30);
    text("Be a good student and don't BUNK",300,300);
    }

    // MOVE PLAYER
    controlPlayer();

    ground1.display();
    ground2.display();
  }

//=====================================================================================================================//
//                                                   IN SCHOOL                                                         //
//=====================================================================================================================//

  if(gameState==="inSchoolLoad"){

    ground3 = new Path(width/2-360,height/2-100,width-300,height);
    ground3.body.visible = false;

    groundG.add(ground3.body);

    // LEVELS
    level2 = createSprite(670,480,40,40);
    level2.shapeColor = "red";

    level3 = createSprite(-270,480,40,40);
    level3.shapeColor = "#fcba03";

    exit1 =  new Exit(100,485);
    // exit1.body.debug = true;
    exit1.body.setCollider("rectangle",0,5,30,10)
    exitG.add(exit1.body);

    teacher = createSprite(200,200,20,20);
    teacher.addImage(teacher_img);
    teacher.scale = 1.3;

    platform = createSprite(teacher.x,teacher.y+70,170,140);
    platform.visible=false;

    table = createSprite(teacher.x,teacher.y+60,20,20);
    table.addImage(table_img);
    table.scale=0.2;
    // table.debug = true;
    table.setCollider("rectangle",0,-100,500,200);

    createPlayer();

    player.x = 100;
    player.y = 425;

    gameState="inSchool";

  }

  if(gameState==="inSchool"){
    background(inSchool_img);

    // MOVE PLAYER
    controlPlayer();

    player.collide(table);
    player.collide(teacher);
    // player.collide(level2);
    // player.collide(level3);

    // DIRECT TO OTHER GAME STATES

    if(playerFeet.isTouching(exitG)){
      teacher.destroy();
      table.destroy();
      exitG.destroyEach();
      player.destroy();
      level2.destroy();
      level3.destroy();
      gameState="outSchoolLoad";
    }

    if(player.isTouching(platform) /*&& levelState === "none"*/){
      ground3.body.destroy();
      teacher.destroy();
      exit1.body.destroy();
      player.destroy();
      level2.destroy();
      level3.destroy();

       gameState="penFightLoad";
    }

    if(player.isTouching(level2) /* && levelState === "level1Pass"*/){
      table.destroy();
      teacher.destroy();
      player.destroy();
      groundG.destroyEach();
      exitG.destroyEach();
      level2.destroy();
      level3.destroy();

      gameState="level2Load";
    }

    if(player.isTouching(level3) /* && levelState === "level2Pass"*/){
      table.destroy();
      teacher.destroy();
      player.destroy();
      groundG.destroyEach();
      exitG.destroyEach();
      level2.destroy();
      level3.destroy();

      gameState="level3Load";
    }

  }

//=====================================================================================================================//
//                                                   PEN FIGHT                                                         //
//=====================================================================================================================//

    if(gameState==="penFightLoad"){

      penState="pen1";
      penFightText = true;

      background(200);

      table.scale = 1.3;
      table.position.y = 250;

      surface = createSprite(table.x,table.y-65,625,440);
      surface.visible = false;

      createPlayer();

      player.position.x = table.x + 450;
      player.position.y = table.y - 50;
      player.changeAnimation("leftP",boyL);
      player.scale = 0.6;

      donkey = createSprite(-230,200,20,100);
      donkey.addImage(donkey_img);
      donkey.scale = 0.3

      pen1 = createSprite(450,200,20,100);
      pen1Box = createSprite(450,200,1,1);
      pen1Box.addImage(arrow_img);
      pen1.addImage(pen2_img)
      pen1Box.scale = 0.1;
      pen1.scale = 0.05;
      pen1.shapeColor = "red";
      pen1.rotation = 180;

      pen2 = createSprite(-50,200,20,100);
      pen2Box = createSprite(-50,200,1,1);
      pen2.addImage(pen1_img);
      pen2.scale = 0.15;
      pen2.shapeColor = "red";
      pen2.rotation = 180;

      instructions = createSprite(200,200,20,20);
      instructions.addImage(arrowKeys_img);
      
      gameState="penFight";
    
    }

    if(gameState==="penFight"){

      // console.log(pen1.getSpeed());
      // console.log("PenState : "+penState);

      background(200);

      pen1Box.x = pen1.x;
      pen1Box.y = pen1.y;
      pen1Box.rotation = pen1.rotation;

      pen2Box.x = pen2.x;
      pen2Box.y = pen2.y;
      pen2Box.rotation = pen2.rotation;

      pen1.bounce(pen2);
      pen2.bounce(pen1);

      // PEN 1
      if(pen1Box.position.x>surface.x+(surface.width)/2){
        penState="lost";
        
      }

      if(pen1Box.position.x<surface.x-(surface.width)/2){
        penState="lost";
        
      }

      if(pen1Box.position.y>surface.y+(surface.height)/2){
        penState="lost";
        
      }


      if(pen1Box.position.y<surface.y-(surface.height)/2){
        penState="lost";
        
      }

      // PEN 2
      if(pen2Box.position.x>surface.x+(surface.width)/2){
        penState="won";
        
      }

      if(pen2Box.position.x<surface.x-(surface.width)/2){
        penState="won";
      }

      if(pen2Box.position.y>surface.y+(surface.height)/2){
        penState="won";
        
      }

      if(pen2Box.position.y<surface.y-(surface.height)/2){
        penState="won";
        
      }

      // CONTROLLING THE PEN

      if(keyWentDown("UP_ARROW") && penState==="pen1" ){
        penFightText = false;
        instructions.destroy();
        speed =  7;
        pen1.addSpeed(speed,pen1.rotation);

        penState="pen2";
      }
  
      if(keyWentDown("LEFT_ARROW") && penState==="pen1"){
        penFightText = false;
        instructions.destroy();
        pen1.rotation = pen1.rotation-10;
      }
      
      if(keyWentDown(39) && penState==="pen1"){
        penFightText = false;
        instructions.destroy();
        pen1.rotation = pen1.rotation+10;
      }

//---------------------------------------------------stopping the pen -------------------------------------------------//

      pen1.setSpeedAndDirection(pen1.getSpeed()*0.97);
      pen2.setSpeedAndDirection(pen2.getSpeed()*0.97);

      if(pen1.getSpeed()<=0.01 && penState==="pen2"){
        
        var randomAngle = Math.round(random(-45,45));
        var randomSpeed = Math.round(random(7,9));

        pen2.rotation = randomAngle;
        
        speed = randomSpeed;
        pen2.addSpeed(speed,randomAngle);
        
        penState="pen1";
        
      }

      if(penState==="won"){
        coinCount+=5;
        penState="0";
        // levelState = "level1Pass";
        
      }else if(penState==="lost"){
        
        penState="0";
      }

      if(penState==="0"){
        table.destroy();
        donkey.destroy();
        player.destroy();
        pen1.destroy();
        pen1Box.destroy();
        pen2.destroy();
        pen2Box.destroy();
        gameState="inSchoolLoad";
      }

     }

//=====================================================================================================================//
//                                                    LEVEL 2                                                          //
//=====================================================================================================================//
  if(gameState==="level2Load"){
    
    background(0);

    createPlayer();

    player.x = 625;
    player.y = 330;
    player.changeAnimation("leftP",boyL);

    ball = new PaperBall(625,300,15);
    teacher = new TeacherClass(-280,200,80,90);
    string = new Line(ball.body,{ x : 625 , y : 300});

    level2Ground1 = new TeacherClass(200,490,width,40);
    level2Ground2 = new TeacherClass(-315,200,40,height);
    level2Ground3 = new TeacherClass(200,-100,width,40);
    level2Ground4 = new TeacherClass(760,200,40,height);

    gameState="level2";
  }

  if(gameState==="level2"){
    background(level2bg);

    string.display();
    ball.display();
    teacher.display();
    // level2Ground1.display();
    // level2Ground2.display();
    // level2Ground3.display();
    // level2Ground4.display();

    if(keyWentDown("SPACE")){
      Matter.Body.setPosition(ball.body,{x : 625 , y : 300 });
      string.attach(ball.body);
    }

    var collision = Matter.SAT.collides(ball.body, teacher.body);
    
    if(collision.collided){
      ball.destroy();
      player.destroy();
      coinCount+=5;
      // levelState = "level2Pass";
      gameState="inSchoolLoad";
    }

  }
//=====================================================================================================================//
//                                                    LEVEL 3                                                          //
//=====================================================================================================================//
  if(gameState==="level3Load"){
    // WE
    car1 = createSprite(-300,200-70,20,20);
    car1.shapeColor = "green";
    car1.addImage(greenCar_img);
    car1.scale = 0.2;

    // COMPUTER
    car2 = createSprite(-300,200+70,20,20);
    car2.shapeColor = "red";
    car2.addImage(redCar_img);
    car2.scale = 0.2;

    finishLine = createSprite(708,200,20,400);
    finishLine.shapeColor = "#f2eb11";

    canStart = false;

    gameState="level3";
  }

  if(gameState==="level3"){
    background(track_img);

    // car1.collide(finishLine);
    // car2.collide(finishLine);

    car1.velocityX = 0;

    if(keyWentDown("SPACE")){
      car1.velocityX = 50;
      canStart = true;
    }

    car2.velocityX=0;

    if(frameCount%5===0 && canStart === true){
      car2.velocityX = 5;
    }

    if(car1.isTouching(finishLine)){
      car1.destroy();
      car2.destroy();
      finishLine.destroy();
      gameState = "inSchoolLoad";
      coinCount+=5;
    }

    if(car2.isTouching(finishLine)){
      car1.destroy();
      car2.destroy();
      finishLine.destroy();
      gameState = "inSChoolLoad";
    }



  }
  drawSprites();
  if(canStart === false){
    textSize(25);
    fill("white");
    text("Press SPACE to move forward",50,170);
  }

  if(penFightText===true){
    textSize(25);
    fill("white");
    text("Rotate Left",-20,200);
    text("Rotate Right",290,200);
    text("To Launch",140,40);
  }

//================================================================================================================//
//                                                   SCORE                                                        //
//================================================================================================================//

  if(gameState==="inSchool" || gameState==="penfight" || gameState==="level2" || gameState==="level3"){
    coin = createSprite(350,-80,20,20);
    coin.addImage(coin_img);
    coin.scale = 0.1;

    textSize(25);
    fill("white");
    text(" x : " + coinCount,380,-60);
  }

  if(coinCount===15 && gameState==="inschool"){
    teacher.destroy();
    table.destroy();
    player.destroy();
    level2.destroy();
    level3.destroy();
    exitG.destroyEach();
  }

}

function mouseDragged(){
  Matter.Body.setPosition(ball.body, { x: mouseX-400, y: mouseY-100 });
}

function mouseReleased(){   
  string.fly();
}

function controlPlayer(){

  var nothing = 10;

  player.velocityX=0;
  player.velocityY=0;

  playerFeet.x = player.x;
  playerFeet.y = player.y+20;

  if(player.velocityX === 0){
    player.changeAnimation("frontP",boyF);
  }

  if(player.velocityY === 0){
    player.changeAnimation("frontP",boyF);
  }

  // LEFT ARROW
  if(keyDown(37) && player.isTouching(groundG)){
    player.velocityX = -nothing;
    player.changeAnimation("left",boy_l);
  }

  // RIGHT ARROW
  if(keyDown(39)  && player.isTouching(groundG)){
    player.velocityX = nothing;
    player.changeAnimation("right",boy_r);
  }

  // UP ARROW
  if(keyDown(38)  && player.isTouching(groundG)){
    player.velocityY = -nothing;
    player.changeAnimation("back",boy_b);
  }

  // DOWN ARROW
  if(keyDown(40)  && player.isTouching(groundG)){
    player.velocityY = nothing;
    player.changeAnimation("front",boy_f);
  }

  if(keyDown(40)  && keyDown(39)){
    player.velocityY = 0;
    player.velocityX = 0;
    player.changeAnimation("frontP",boyF);    
  }

  if(keyDown(40)  && keyDown(37)){
    player.velocityY = 0;
    player.velocityX = 0;
    player.changeAnimation("frontP",boyF);
  }

  if(keyDown(38)  && keyDown(39)){
    player.velocityY = 0;
    player.velocityX = 0;
    player.changeAnimation("frontP",boyF);
  }

  if(keyDown(38)  && keyDown(37)){
    player.velocityY = 0;
    player.velocityX = 0;
    player.changeAnimation("frontP",boyF);
  }
}

function createPlayer(){

  player = createSprite(school.x-130,school.y+180,200,200);
  playerFeet = createSprite(player.x,player.y+20,20,20);
  playerFeet.shapeColor = "yellow";
  playerFeet.visible = false;
  // player.debug = true;
  
  player.addAnimation("frontP",boyF);
  player.addAnimation("backP",boyB);
  player.addAnimation("rightP",boyR);
  player.addAnimation("leftP",boyL);
  player.addAnimation("front",boy_f);
  player.addAnimation("back",boy_b);
  player.addAnimation("right",boy_r);
  player.addAnimation("left",boy_l);
  player.scale = 0.1;
  player.frameDelay = 4;

}