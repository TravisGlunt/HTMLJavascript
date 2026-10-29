//alert("Welcome to the lab");
/*
Allows you yop comment multiple lines of code
Week 4 Lab - Experimenting with canvas animation
*/


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

var fps = 1000/60
var timer = setInterval(game, fps);

var startPoint = {x:canvas.width/2, y:canvas.height/2};//canvas.width2
var moveDirection = {x:1,y:1};

var boxColor = "red";
var shipSprite = {image:document.getElementById("ship"),x:1,y:1, moveX:0, moveY:0};

function createStar(){
var star = {
    x:0, 
    y:0, 
    radius:0, 
    color:"black",
    drawCircle:function(){
        ctx.beginPath()
        ctx.style = this.color
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    },
}
return star;
}
var starCount = 50
var stars = [];//Creates an Array

for(var i = 0; i < starCount; i++){
stars[i] = createStar();
stars[i].x = Math.random() * canvas.width;
stars[i].y = Math.random() * canvas.height;
stars[i].radius = Math.random() * 25;

}

shipSprite.x = canvas.width/2;
shipSprite.y = canvas.height/2;

var a = false
var d = false
var w = false
var s = false

document.addEventListener("keydown", function(e){
    console.log(e.key);
    if(e.key == "a"){
        a = true;
    }
    if(e.key == "d"){
        d = true;
    }
});

document.addEventListener("keyup", function(e){
    console.log(e.key);
    if(e.key == "a"){
        a = false;
    }
    if(e.key == "d"){
        d = false;
    }
});

document.addEventListener("keydown", function(e){
    console.log(e.key);
    if(e.key == "s"){
        s = true;
    }
    if(e.key == "w"){
        w = true;
    }
});

document.addEventListener("keyup", function(e){
    console.log(e.key);
    if(e.key == "s"){
        s = false;
    }
    if(e.key == "w"){
        w = false;
    }
});


ctx.fillStyle = boxColor;
ctx.fillRect(canvas.width/2, canvas.height/2, 25,25);
ctx.drawImage(shipSprite.image, shipSprite.x, shipSprite.y, 25,25)


//This is our Game Loop Function
function game(){
    //clear the screen
    ctx.clearRect(0,0,canvas.width,canvas.height);
    startPoint.x += moveDirection.x;
    startPoint.y += moveDirection.y;
    ctx.fillStyle = boxColor;
    ctx.fillRect(startPoint.x, startPoint.y, 25,25)
    ctx.drawImage(shipSprite.image, shipSprite.x, shipSprite.y, 25,25)


    if(a == true){
        shipSprite.x -= 1
    }

    if(d == true){
        shipSprite.x += 1
    }

    if(shipSprite.x > canvas.width){
        shipSprite.x = -25
    }
     
    if(w == true){
        shipSprite.y -= 1
    }

    if(s == true){
        shipSprite.y += 1
    }

    if(shipSprite.y > canvas.width){
        shipSprite.y = -25
    }
 
    if(startPoint.y > canvas.height - 25 || startPoint.y < 0){
        //startPoint.y = -25;
        moveDirection.y *= -1;
        boxColor = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    }

    if(startPoint.x > canvas.width - 25 || startPoint.x < 0){
        moveDirection.x *= -1;
        boxColor = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    }
    for(var i = 0; i < stars.length; i++){
        stars[i].drawCircle();
    }
}