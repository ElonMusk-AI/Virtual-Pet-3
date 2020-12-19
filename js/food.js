class Food{
    constructor(){
        this.image = loadImage("images/Milk.png");
        this.foodStock = 0;
    }

    getFoodStock(){
        var foodStockRef  = database.ref('food');
        foodStockRef.on("value",function(data){
        this.foodStock = data.val();
    })
    }
    updateFoodStock(stock){
        database.ref('/').update({
            food: stock
          });
    }
    deductFoodStock(){
        if (food <= 0){
            food = 0;
          }
          else{
            food = food - 1;
          }
    }
    bedRoom(){ 
        background(bedRoomImage);
    }
    washRoom(){
        background(washRoomImage);
    }
    garden(){
        background(gardenImage);
    }
    
    display(){
        var x = 50;
        var y = 200;
        imageMode(CENTER);

        for (var i = 0; i<food; i++){  
            if (i%10===0){
                x = 50;
                y = y+100;
            }
            image(this.image,x+i*20,y,120,120); 
            x=x+20;
        }   
    }
}
