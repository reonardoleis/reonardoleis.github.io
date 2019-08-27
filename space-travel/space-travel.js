document.write(`<style>body{overflow: hidden; padding: 0 !important; margin: 0 !important} canvas{width: 100vw; height: 100vh;}</style><img id="sprite" style="display:none"  src='ship.png'><canvas id='canvas' width=1000 height=800 style='background: black'>`);

const NUMBER_OF_STARS = 10000;

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const STAR_SPEED_DECAY = 1;
const STAR_SPEED = 20;
var ctx    = canvas.getContext('2d');
var space = generateFirstStars();

var frames = 0;
var seconds = 0;
var sleep = 16.6;

var ship = new Spaceship();
var sprite = document.getElementById("sprite");

function Spaceship(){
    this.width = 150;
    this.height = 150;
    this.x = WIDTH/2 - (this.width/2);
    this.y = HEIGHT - this.height;
    this.moveTo = {x: this.x, y: this.y};
    this.draw = () => {
        for(let i = 60; i < 70; i++){
            r = random(200, 255);
            g = random(130, 255);
            b = random(130, 0);
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(this.x + i, this.y+0.7*this.height, 1, 80 - random(0, 50));
        }

        for(let i = 80; i < 90; i++){
            r = random(200, 255);
            g = random(130, 255);
            b = random(130, 0);
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(this.x + i, this.y+0.7*this.height, 1, 80 - random(0, 50));
        }
       
        ctx.drawImage(sprite, this.x, this.y, sprite.width, sprite.height);
        
        if(this.x < this.moveTo.x){
            this.x+=random(1, 3);
        }else if(this.x > this.moveTo.x){
            this.x-=random(1, 3);
        }
        if(this.y > this.moveTo.y){
            this.y-=random(1, 3);
        }else if(this.y < this.moveTo.y){
            this.y+=random(1, 3);
        }
    }
    this.newMoveTo = () => {
            let c1 = 1;
            let c2 = 1;
            let negative = random(0, 1);
            if(negative == 1){
                c1 = -1;
            }
            negative = random(0, 1);
            if(negative == 1){
                c2 = -1;
            }
            let newX = this.x + c1 * random(50, 100);
            let newY = this.y + c2 * random(50, 100);
            while(newX > (WIDTH + this.width) || newX < 0){
                c1 = 1;
                c2 = 1;
                negative = random(0, 1);
                if(negative == 1){
                    c1 = -1;
                }
                negative = random(0, 1);
                if(negative == 1){
                    c2 = -1;
                }
                newX = this.x + c1 * random(50, 100);
                newY = this.y + c2 * random(50, 100);
            }
            while(newY < 0 || newY > HEIGHT - this.height){
                c1 = 1;
                c2 = 1;
                negative = random(0, 1);
                if(negative == 1){
                    c1 = -1;
                }
                negative = random(0, 1);
                if(negative == 1){
                    c2 = -1;
                }
                newX = this.x + c1 * random(50, 100);
                newY = this.y + c2 * random(50, 100);
            } 
        
            this.moveTo = {x: newX, y: newY};
        }
    }

function generateFirstStars(){
    let stars = [];
    for(let i = 0; i < NUMBER_OF_STARS; i++){
        stars[i] = new star();
    }
    return stars;
}

function star(){
    this.width = random(5, 10);
    this.height = this.width;
    this.x = random(0, WIDTH - this.width);
    this.y = -this.height - random(50, 5000);
    this.distance = random(1, 19);
    this.width = 1/this.distance * this.width;
    this.height = 1/this.distance * this.height;
    this.draw = () => {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.update = () => {
        this.y += STAR_SPEED - (STAR_SPEED_DECAY * this.distance);
        if(this.y + this.height > HEIGHT){
            this.width = random(5, 10);
            this.height = this.width;
            this.x = random(0, WIDTH - this.width);
            this.y = -this.height - random(50, 5000);
            this.distance = random(1, 19);
            this.width = 1/this.distance * this.width;
            this.height = 1/this.distance * this.height;
        } 
    }
    
}

function random(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function start(){
    loop();
}

function loop(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ship.draw();
    ctx.fillStyle = 'white';
    for(let i = 0; i < NUMBER_OF_STARS; i++){
        space[i].update();
        space[i].draw();
    }
    if(seconds = 0){
        console.log(frames);
        frames = 0;
    }
    setTimeout(loop, sleep);
}

setInterval(() => {ship.newMoveTo()}, 2000);

start();

