const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

const DNA_SIZE = 2000;
const POP_SIZE = 2000;
const BOX_W = 10;
const BOX_H = 10;


const DV = 2;

const MUTATION_CHANCE = 5;



const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

var step = 0;
var parent1 = undefined;
var parent2 = undefined;
var current_gen = 0;
var CURRENT_MOVE = 0;
var boxes = [];
var goal = new Goal(250, 250);
var interval = '';

var obs1 = new Obstacle(25, 300, 250, 10);
var obs2 = new Obstacle(365, 300, 300, 10);
var obstacles = [obs1, obs2];

function init(){
    boxes = generateFirstPop();
    interval = setInterval(drawLoop, 1);
}

function reset(){
    clearInterval(interval);
    current_gen++;
    CURRENT_MOVE = 0;
    step = 0;
    document.getElementById("current_gen").innerHTML = "Generation: "+current_gen;
    selectParents();
    boxes = generateNextGen();
    ctx.clearRect(0, 0, W, H);
    dnas = []
    interval = setInterval(drawLoop, 1);
}

//obj
function Box(dna = false){
    this.alive = true;
    this.color = '#'+(Math.floor(Math.random() * (16000000))).toString(16);
    this.score = 0;
    this.current = 0;
    this.x = W/2;
    this.y = H;
    if(dna == false){
        this.dna = generateDNA();
    }else{
        this.dna = dna;
    }
    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, BOX_W, BOX_H);
        
        switch(this.dna[this.current]){
            case UP:
                if(this.y > (BOX_H))
                    this.y-=DV;
            break;

            case DOWN:
                if(this.y < (H - BOX_H))
                    this.y+=DV;
            break;

            case LEFT:
                if(this.x > (BOX_W))
                    this.x-=DV;
            break;

            case RIGHT:
                if(this.x < (W - BOX_W))
                    this.x+=DV;
            break;
        }
        this.current++;
        this.score = evaluateScore(this.x, this.y);
    }
}

function evaluateScore(x, y){
    let score = 1000;
    score -= Math.sqrt(((goal.x - x) ** 2) + ((goal.y - y) ** 2));
    return score.toFixed(0);
}

function Obstacle(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.draw = function(){
        ctx.fillStyle="black";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}


function collides(box, obstacle){
    let box_x1 = box.x
    let box_x2 = box.x + BOX_W
    let box_y1 = box.y;
    let box_y2 = box.y - BOX_H;
    let obs_x1 = obstacle.x;
    let obs_x2 = obstacle.x + obstacle.w;
    let obs_y1 = obstacle.y;
    let obs_y2 = obstacle.y - obstacle.h;
    if((box_x1 <= obs_x2) && (box_x2 >= obs_x1) && (box_y1 >= obs_y2) && (box_y2 <= obs_y1)){
        return true;
    }else{
        return false;
    }
}
function Goal(x, y){
    this.x = x;
    this.y = y;
    this.draw = function(){
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, 10, 10);
    }
}


//func
function generateDNA(){
    let dna = [];
    for(let i = 0; i < DNA_SIZE; i++){
        dna.push(
            Math.floor(Math.random() * (4 - 0)) + 0
        );
    }
    return dna;
}

function drawLoop(){
    ctx.clearRect(0, 0, W, H);
    document.getElementById("step").innerHTML = "Step: "+step;
    for(let i = 0; i < boxes.length; i++){
            if(boxes[i].alive)
            {
                boxes[i].draw();
                if(collidesWihtAny(obstacles, boxes[i])){
                    boxes[i].score *= boxes[i].score * 0.9;
                    boxes[i].alive = false;
                }
            }
        
    }
    goal.draw();
    for(obs of obstacles){
        obs.draw();
    }
    if(CURRENT_MOVE > DNA_SIZE)
        reset();
    CURRENT_MOVE++;
    step++;
}

function generateFirstPop(){
    let pop = [];
    for(let i = 0; i < POP_SIZE; i++){
        pop.push(new Box());
    }
    return pop;
}

function generateNextGen(){
    let new_pop = [];
    for(let i = 0; i < POP_SIZE; i++){
        let dna = [];
        for(let j = 0; j < DNA_SIZE; j++){
            let which_gene = Math.floor(Math.random() * (3 - 0)) + 0;
            if(which_gene == 1){
                dna.push(parent1.dna[j]);
            }else{
                dna.push(parent2.dna[j]);
            }
            let mutate = Math.floor(Math.random() * (100 - 0)) + 0;
            if(mutate <= MUTATION_CHANCE){
                dna[dna.length - 1] = Math.floor(Math.random() * (4 - 0)) + 0;
            }
        }
        new_pop.push(new Box(dna));
    }
    return new_pop;
}



function selectParents(){
    let index = 0;
    for(let i = 0; i < boxes.length; i++){
        if(boxes[i].score > boxes[index].score){
            index = i;
        }
    }
    parent1 = boxes[index];
    boxes.splice(index, 1);

    index = 0;
    for(let i = 0; i < boxes.length; i++){
        if(boxes[i].score > boxes[index].score){
            index = i;
        }
    }
    parent2 = boxes[index];
    boxes.splice(index, 1);
}

function collidesWihtAny(obstacles, box){
    for(let i = 0; i < obstacles.length; i++){
        if(collides(box, obstacles[i])){
            return true;
        }
    }
    return false;
}















init();