var CANVAS_WIDTH = 200;
const CANVAS_WIDTH_FIXED = CANVAS_WIDTH;
var CANVAS_HEIGHT = 70;

const PIXEL_SIZE = 4
const fireColorsPalette = [{"r":0,"g":0,"b":0},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];
var FIRE_SIZE_MOD = 0;
var canvas, ctx;
var decay_max = 3;
var   firePixelArray = [];

function createCanvas(width, height){
    let canvas = `<canvas width=${width * PIXEL_SIZE} height=${height * PIXEL_SIZE}></canvas>`;
    document.querySelector('#canvas-container').innerHTML =  canvas;
    canvas = document.getElementsByTagName('canvas')[0];
    ctx = canvas.getContext('2d');
}


function initFirePixelArray(){
    let firePixelArraySize = (CANVAS_WIDTH * CANVAS_HEIGHT);
    let pixelX = 0;
    let pixelY = (CANVAS_HEIGHT * PIXEL_SIZE);
    let fireIntensity = fireColorsPalette.length;
    let tempIndex = 0;
    for(let i = 0; i < firePixelArraySize; i++){
        firePixelArray[i] = 
        {
            fireIntensity: fireIntensity,
            pixelX: pixelX,
            pixelY: pixelY,
        };
        pixelX+=PIXEL_SIZE;
        if(pixelX >= (CANVAS_WIDTH * PIXEL_SIZE)){
            pixelX = 0;
            pixelY -= PIXEL_SIZE;
        }
        if(i < (CANVAS_WIDTH)){
            firePixelArray[i].fireIntensity = fireColorsPalette.length - 1;
        }
        tempIndex++;
        if(tempIndex >= CANVAS_WIDTH){
            tempIndex = 0;
            if(fireIntensity - 1 >= 0){
                fireIntensity--;
            };
        }
    }
}

function draw(){
    
    for(let i = 0; i < firePixelArray.length; i++){
        let colorIndex = firePixelArray[i].fireIntensity;
        let r = fireColorsPalette[colorIndex].r;
        let g = fireColorsPalette[colorIndex].g;
        let b = fireColorsPalette[colorIndex].b;
      
        if(colorIndex < FIRE_SIZE_MOD){
            r = 0;
            g = 0;
            b = 0;
        }

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(firePixelArray[i].pixelX, firePixelArray[i].pixelY - PIXEL_SIZE, PIXEL_SIZE,PIXEL_SIZE);
        
    }
    
}

function calculateFireProgression(){
    for(let i = firePixelArray.length - 1; i >= CANVAS_WIDTH; i--){
        let decay = Math.floor(Math.random () * (decay_max));
        let newFireIntensity = firePixelArray[i - CANVAS_WIDTH].fireIntensity;
        //if((newFireIntensity - 1) > -1){
        //    newFireIntensity-=1;
        //}
        if((newFireIntensity - decay) > -1){
            newFireIntensity-=decay;
        }
        let neighbour = i;
        if((i + decay) < firePixelArray.length){
            neighbour += decay;
        }
        
        firePixelArray[neighbour].fireIntensity = newFireIntensity;
        
    }
}

function start(){
    document.getElementById('decay_max_input').value = decay_max;
    document.getElementById('fire_max_height').value = FIRE_SIZE_MOD;
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    initFirePixelArray();
    setInterval(() => {
        calculateFireProgression();
        ctx.clearRect(0, 0, CANVAS_WIDTH_FIXED * PIXEL_SIZE, CANVAS_HEIGHT * PIXEL_SIZE);
        
        draw();
      
        decay_max = document.getElementById('decay_max_input').value;
        let tempSize = document.getElementById('fire_max_height').value;
        if(tempSize<0){
            tempSize = 0;
            document.getElementById('fire_max_height').value = tempSize;
        }
        FIRE_SIZE_MOD = tempSize;
    }, 25);
}


document.onload = start()



