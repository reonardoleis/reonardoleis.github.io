const GRAVITY_ACCEL = 10;
const DECREMENT = 1;


var canvas;
var ctx;

var rects = generateRects(12);

function generateRects(n){
    let arr = []
    for(let i = 0; i < n; i++){
        let y = Math.floor(Math.random() * (500 + 0) ) + 0;
        let color = '#'+Math.floor(Math.random()*16777215).toString(16);
        let x = Math.floor(Math.random() * (500 - 0) ) + 0;
        let mass = Math.floor(Math.random() * (150 - 10)) + 10;
        let increment = Math.floor(Math.random() * (10 - 1)) + 1;
        arr.push(new Rect(x, y, 0, 0, mass, 'left', color, increment));
        arr.push(new Rect(x, y, 0, 0, mass, 'right', color, increment));
    }
    return arr;
}

function init(canvas){
    canvas = canvas;
    ctx = canvas.getContext('2d');
    
    loop();
}

function Rect(x, y, w, h, mass, direction, color, increment){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dx = 0;
    this.dy = 0;
    this.force = 0;
    this.times = 0;
    this.mass = mass;
    this.lastX = 0;
    this.lastY = 0;
    this.direction = direction;
    this.color = color;
    this.increment = increment
    this.draw = function(){
        this.lastX = this.x;
        this.lastY = this.y;
        if(this.direction == "left")
            this.x-=this.increment;
        else
            this.x+=this.increment;
        
        console.log(this.force);
        if(((this.y + this.dy) <= 500 - this.h) && this.dy >= 0){
            this.y+=this.dy;
            this.dy = gravity(this.dy);
            this.force = this.mass * this.dy;
        }else if(this.dy > 0){
            this.y = 500 - this.h;
            this.dy = bounce(this.force, this.mass);
        }else if(this.dy < 0){
            this.y += this.dy;
            this.dy = gravity(this.dy);
            this.dy += 1;
            
        }else if(this.dy==0){
            this.y = 500 - this.h;
            this.dy = 0;
        }

        if(this.y == 500){
            this.times++;
        }
        ctx.beginPath();
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        
    
        ctx.fillRect(this.x, this.y, this.w, this.h);
        

        
    }
}

function loop(){
    for(rect of rects){
    if(rect.times < 10)
        rect.draw();
    }
    requestAnimationFrame(loop);
}

function gravity(dy){
    dy+=1;
    return dy;
}

function bounce(force, mass){
    return -(force/mass);
}

function removeForce(force){
    return 0.9 * force;
}