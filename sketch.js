//Create variables here
var dogV;
var dog;
var dogH;
var database;
var foodS;
var foodStock;

function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  dogH = loadImage("images/dogImg1.png")
}

function setup() {

  database = firebase.database();

  createCanvas(500, 500);
  
  dogV = createSprite(200,200,1,1);
  dogV.addImage(dog);
  dogV.scale=0.3;

  foodStock = database.ref("Food");
  foodStock.on("value" ,readStock) ;
}


function draw() {  
  background(46,139,87);

  if(keyWentDown("w")){
    writeStock(foodS);
    dogV.addImage(dogH);
  }

  drawSprites();
  //add styles here
  fill(255,255,254);
   stroke("black");
   text("Food remaining : "+foodS,170,200);
   textSize(13);
   text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

}

function readStock(data) {
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}