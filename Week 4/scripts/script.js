//alert("Welcome to the lab");
/*
Allows you yop comment multiple lines of code
Week 4 Lab - Experimenting with canvas animation
*/


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

var fps = 1000/60;
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
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    },
}
return star;
}
var starCount = 50;
var stars = [];//Creates an Array

var friction = 0.9;
var acceleration = 0.3;

var score = 0;

var objectsDestroyed = 0;

for(var i = 0; i < starCount; i++){
stars[i] = createStar();
stars[i].x = Math.random() * canvas.width;
stars[i].y = Math.random() * canvas.height;
stars[i].radius = Math.random() * 5;
// stars[i].color = `rgb($(Math.random()*255), $(Math.random()*255), $(Math.random()*255),)`
stars[i].color = `white`

}

shipSprite.x = canvas.width/2;
shipSprite.y = canvas.height/2;

var a = false;
var d = false;
var w = false;
var s = false;
var space = false;

//Add a variable for bullets
var bullets = [];
var shootCooldown = 0;


document.addEventListener("keydown", function(e){
    console.log(e.key);
    if(e.key == "a"){
        a = true;
    }
    if(e.key == "d"){
        d = true;
    }
    if(e.code === "Space"){
        space = true;
        e.preventDefault();
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
    if(e.code === "Space"){
        space = false;
        e.preventDefault();
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

    var hitBox = shipSprite.x < startPoint.x + 25 &&
                shipSprite.x +25 > startPoint.x &&
                shipSprite.y < startPoint.y + 25 &&
                shipSprite.y +25 > startPoint.y ;
    
    if(hitBox == true){
        //the startpoint sprite hit the player
        shipSprite.x = canvas.width/2
        shipSprite.y = canvas.height/2

        shipSprite.moveX = 0;
        shipSprite.moveY = 0;
        score = 0;
    }



    if(a == true){
       // shipSprite.x -= 1
       shipSprite.moveX -= acceleration
    }

    if(d == true){
       // shipSprite.x += 1
       shipSprite.moveX += acceleration
    }

    
     
    if(w == true){
        //shipSprite.y -= 1
        shipSprite.moveY -= acceleration
    }

    if(s == true){
        //shipSprite.y += 1
        shipSprite.moveY += acceleration
    }

    if(shipSprite.x > canvas.width){
        shipSprite.x = -25
       
    }
    if(shipSprite.y > canvas.height){
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
   ctx.fillStyle="black"
   ctx.fillRect(0,0,canvas.width,canvas.height);

   //Multiply friction
   shipSprite.moveX *= friction;
   shipSprite.moveY *= friction;
   
   //Update the X and Y position values
   shipSprite.x += shipSprite.moveX;
   shipSprite.y += shipSprite.moveY;

    //bullet firingcode
    if(shootCooldown > 0){
        shootCooldown--;
    }

    if(space && shootCooldown === 0){
        bullets.push({
            x:shipSprite.x + 25 /2 -2,
            y:shipSprite.y + -10,
            width:4,
            height:10,
            speed:8,
            color:"white"
        });
        shootCooldown = 10;
    }

   for(var i = 0; i < stars.length; i++){
    //draws stars
    
    if(shipToStarCollision(shipSprite, stars[i])){
        shipSprite.x = canvas.width/2
        shipSprite.y = canvas.height/2 + 100;

        shipSprite.moveX = 0;
        shipSprite.moveY = 0;
        score = 0;
     }

        stars[i].drawCircle();
        stars[i].y++;
        if(stars[i].y > canvas.height + stars[i].radius *2){
            stars[i].x = Math.random() * canvas.width;
            stars[i].y = -(Math.random() * canvas.height);
            score += 10;
        }
    }

//draw and check for bullet collision
    for(var i = bullets.length -1; i >= 0; i--){    
        var bullet = bullets[i];

        bullet.y -= bullet.speed;

        //check for bullets that leave the screen
        if (bullet.y + bullet.height < 0){
            bullets.splice(i,1);
            continue;
        }

        var hitBox = bullet.x < startPoint.x + 25 &&
            bullet.x + bullet.width > startPoint.x &&
            bullet.y < startPoint.y + 25 &&
            bullet.y + bullet.height > startPoint.y;
        if(hitBox){
            //remove bullet
            bullets.splice(i,1);
            startPoint.x = 10000000000;
            moveDirection.x = 0;
            moveDirection.y = 0;
            objectsDestroyed += 10;
            continue;
        }

        for(var j = 0; j < stars.length; j++){
            if(shipToStarCollision(bullet, stars[j])){
                bullets.splice(i,1); 
                stars[j].x = Math.random() * canvas.width;
                stars[j].y = -(Math.random() * canvas.height);
                objectsDestroyed += 1;
                continue;
            }
        }
        for(var l = 0; l < startPoint.length; l++){
            if(shipToStarCollision(bullet, startPoint[l])){
                bullets.splice(i,1);
                objectsDestroyed += 10;
                continue;
            }
        }
        

        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }


    ctx.fillStyle = boxColor;
    ctx.fillRect(startPoint.x, startPoint.y, 25,25);
    ctx.drawImage(shipSprite.image, shipSprite.x, shipSprite.y, 25,25);

    //draw hud element
    ctx.font = "30px Arial";
    ctx.fillText(`Score:${score}`,30,30);

    ctx.font = "30px Arial";
    ctx.fillText(`Objects Destroyed:${objectsDestroyed}`,30,60);

    
}
function shipToStarCollision(obj,star){
    var closestX = Math.max(obj.x, Math.min(star.x, obj.x + 25));
    var closestY = Math.max(obj.y, Math.min(star.y, obj.y + 25));

    var dx = star.x - closestX;
    var dy = star.y - closestY;

    var dist = dx * dx + dy * dy;
    return dist <= star.radius * star.radius;
}
