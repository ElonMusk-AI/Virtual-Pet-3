var database;
var food;
var foodStock;
var buttonAddFood, buttonFeedFood;
var foodObj;
var feedTime, lastFed;
var gameState;
var game;
var bedRoomImage, washRoomImage, gardenImage;
var currentTime;

var dog, dogImage, dogHappyImage;
function preload()
{
  dogImage = loadImage("images/Dog.png");
  dogHappyImage = loadImage("images/happy dog.png");

  bedRoomImage = loadImage("images/Bed Room.png");
  washRoomImage = loadImage("images/Wash Room.png");
  gardenImage = loadImage("images/Garden.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1200,800);

  gameState = database.ref('gameState');
  gameState.on("value", function (data){
    game = data.val();} )

  foodObj = new Food();

  foodStock = database.ref('food');
  foodStock.on("value", function (data){
    food = data.val();})

  dog = createSprite(1000,400);
  dog.addImage(dogHappyImage);
  dog.scale = 0.25;

  buttonFeedFood = createButton("FEED FOOD");
  buttonFeedFood.position(900,250);
  buttonFeedFood.mousePressed(()=>{feedDog();});

  buttonAddFood = createButton("ADD FOOD");
  buttonAddFood.position(800,250);
  buttonAddFood.mousePressed(()=>{addFood();});


}

function draw() {  
  background("#2D8956");
  currentTime = hour();
  if (currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if (currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedRoom();
  }
  else if (currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washRoom();
  }else{
    update("hungry");
    foodObj.display();
  }

  if (game !== 'hungry'){
    buttonFeedFood.hide();
    buttonAddFood.hide();
    dog.visible = false;
  }else if(game ==='hungry'){
    buttonFeedFood.show();
    buttonAddFood.show();
    dog.visible=true;
    dog.addImage(dogImage);
  }

  //reading feeding time
  feedTime = database.ref("feedTime");
  feedTime.on("value", function (data){
    lastFed=data.val()
  })

    foodStockText();
    lastFeed();
    header();
   // foodObj.display();

  

  drawSprites();
}

function addFood(){
  food++;
    database.ref('/').update({
      food: food
  });
}

function feedDog(){
  foodObj.deductFoodStock();
  foodObj.updateFoodStock(food);
  dog.addImage(dogHappyImage);
  database.ref('/').update({
    feedTime:hour()
  })
}

function foodStockText(){
  textSize(28);
  fill("red");
  stroke("white")
  strokeWeight(3);
  text("Food Stock : "+food,700,150);
}

function lastFeed(){
  textSize(28);
  fill("red");
  stroke("white")
  strokeWeight(3);
  if (lastFed>=12){
    text("Last Feed Time: "+ lastFed%12 + " PM",350,150);
  }else if(lastFed==0){
    text("Last Feed Time: 12 AM",350,150);
  }else{
    text("Last Feed Time: "+ lastFed + " AM",350,150);
  }
  
}

function header(){
  textSize(30)
  fill("White");
  stroke("black")
  strokeWeight(8);
  text("Virtual Pet-2",500,50);
}

function update(state){
  database.ref('/').update({
      gameState: state
    });
}

