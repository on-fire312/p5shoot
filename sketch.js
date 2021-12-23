let spr1;
let spr2;
let angle1;
let angle2;
let bullet1;
let bullet2;
let position;
let health1
let health2
let sparcs
let walls
let boxes
let hit
let wall
let score1=6
let score2=0
function setup() {
  hit=0
angle1=-90
angle2=-90
let posX = width/2;
let posY = height/2;
  createCanvas(windowWidth,windowHeight);
  spr1 = createSprite(
    width/2-50, (height/2),
    50, 25);
  spr1.shapeColor = color(255,0,0);
  spr2 = createSprite(width/2+50, height/2, 50, 25);
  spr2.shapeColor = color(0,0,255);
  spr1.maxSpeed =15
  bullet1 = new Group();
  bullet2 = new Group();
  sparcs = new Group();
  walls = new Group()
  health1=200
  health2=200
  for (let i =0; i<15; i++) {
    let w=createSprite(
      random(width), random(height),
        random(10, 500), random(10, 500));
        w.shapeColor=color(50)
        w.mass = 100000
        walls.add(w)
    }
  if (wall==0) {
    walls.removeSprites()
  }
 
}
function draw() {
  background(0);
  
 if (score1<5) {
   if (score2<5) {
  
    if (keyIsDown(68)) {angle1=angle1+ 5;}
    if (keyIsDown(83)) {spr1.friction = 0.1;}
    else {spr1.friction = 0.025;}
    if (keyIsDown(65)) {angle1=angle1-5;}
    if (keyIsDown(87)) {spr1.addSpeed(0.3, angle1);}

    if (keyIsDown(40)) {spr2.friction = 0.1;}
    else {spr2.friction = 0.025;}
    if (keyIsDown(38)) {spr2.addSpeed(0.3, angle2);}
    if (keyIsDown(39)) {angle2=angle2+ 5;}
    if (keyIsDown(37)) {angle2=angle2-5;}
  
    spr1.rotation=angle1
    spr2.rotation=angle2
    if (keyWentDown(86)) {
      let b =createSprite (spr1.position.x,spr1.position.y,10,10);
      b.addSpeed(10+spr1.getSpeed(), spr1.rotation);
      b.life=150
      bullet1.add(b)
    }
    if (keyWentDown(16)) {
      let b =createSprite (spr2.position.x,spr2.position.y,10,10);
      b.addSpeed(10+spr2.getSpeed(), spr2.rotation);
      b.life=150
      bullet2.add(b)
    }
    if (spr1.position.y > height) {
      spr1.velocity.y *= -1;
      spr1.addSpeed(2,270);
    }
    if (spr1.position.y < 0) {
      spr1.velocity.y *= -1;
      spr1.addSpeed(2,90);
    }
    if (spr1.position.x > width) {
      spr1.velocity.x *= -1;
      spr1.addSpeed(2,180);
    }
    if (spr1.position.x < 0) {
      spr1.velocity.x *= -1;
      spr1.addSpeed(2,0);
    }
    if (spr2.position.y > height) {
      spr2.velocity.y *= -1;
      spr2.addSpeed(2,270);
    }
    if (spr2.position.y < 0) {
      spr2.velocity.y *= -1;
      spr2.addSpeed(2,90);
    }
    if (spr2.position.x > width) {
      spr2.velocity.x *= -1;
      spr2.addSpeed(2,180);
    }
    if (spr2.position.x < 0) {
      spr2.velocity.x *= -1;
      spr2.addSpeed(2,0);
    }
  
    //if (spr1.overlap(spr2)) {
    //  spr1.shapeColor = color(255);
    //  spr1.friction=0.5;
    //}
    bullet2.bounce(spr1,spr1hit);
    bullet1.bounce(spr2,spr2hit);
    bullet1.overlap(bullet2,bCollide);
    if (spr1.overlap(spr2)) {
      spr1.bounce(spr2,bump)
    }
    else {hit=0}
    walls.displace(spr1)
    walls.displace(spr2)
    walls.displace(spr2)
    bullet1.bounce(walls,bBounce)
    bullet2.bounce(walls,bBounce)
    drawSprites();
    textSize(15)
    fill(255)
    text("If map is bad, press R to reset walls",10,height-10)
    fill(255,0,0);
    textSize(20);
    text("player 1 health: "+health1,10,20);
    text("player 1 score: "+score1,10,40);
    fill(0,0,255);
    textAlign(RIGHT)
    text("player 2 health: "+health2,width-10,20);
    text("player 2 score: "+score2,width-10,40);
    if (health1 <1) {
      score2 ++
      reset()
    }
    if (health2 <1) {
      score1 ++
      reset()
    }
    if (keyIsDown(82)) {
      reset()
    }
  } 
}
else {
  if (score1==6) {
    textAlign(CENTER)
    fill(255,255,255);
    textSize(75)
    text("press L to play",width/2,300)
    textSize(50)
    text("(press K to play without walls)",width/2,400)
    textSize(50)
    fill(255,0,0);
    text("red controlled with wasd, v to shoot",width/2,500)
    fill(0,0,255);
    text("blue controlled with arrow keys, left shift to shoot",width/2,550)
    fill(255,0,255);
    text("first to 5 wins",width/2,600)

    if (keyIsDown(76)) {
      score1=0
    }
    if (keyIsDown(75)) {
      score1=0
      wall=0
      walls.removeSprites()
    }
    
    
  } 
  
} 
if (score1==5) {
  fill(255,0,0);
    textSize(20);
  text("red wins",width/2,300)
}
if (score2==5) {
  fill(0,0,255);
    textSize(20);
  text("blue wins",width/2,300)
}
}

function spr1hit() {
health1=health1-10;
x=this.position.x
y=this.position.y
expY()
this.remove()
}
function spr2hit() {
  health2=health2-10;
  x=this.position.x
  y=this.position.y
  expY()
  this.remove()
  }
function bCollide() {
  bullet2.overlap(this,bCollide);
  this.remove();

  
}
function bump(){
  if (hit==0){
  health2=health2-20;
  health1=health1-20;
  x=(spr1.position.x+spr2.position.x)/2
  y=(spr1.position.y+spr2.position.y)/2
  expY()
  hit ++
  }
}
function expY() {
  for (let i =0; i<15; i++) {
    let s= createSprite (x,y,randomGaussian(5,5),randomGaussian(5,5))
    s.life=10
    s.shapeColor = color(255,255,0);
    s.rotation=(random(0,360))
    s.friction=0.1
    s.addSpeed(50, random(0,360))
    sparcs.add(s)
  }
}

function bBounce() {
  this.friction=this.friction+0.05
  this.life=50
}

function reset() {
  walls.removeSprites()
  spr1.remove()
  spr2.remove()
  setup()
}
