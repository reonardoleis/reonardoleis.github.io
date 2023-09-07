const gameCanvas = document.getElementById('gameCanvas');
const mapCanvas  = document.getElementById('mapCanvas');

var eyeSprite = document.getElementById('eyeSprite');
var maxEnemies = 15;
var wallColor = {r: 255, g: 255, b: 255};
var floorColor = {r: 225, g: 225, b: 10};
var roofColor = {r: 255, g: 0, b: 255};

const [ gameContext, mapContext ] = [ gameCanvas.getContext('2d'), mapCanvas.getContext('2d') ];

document.getElementById('gameCanvas').style.background =  `rgba(${roofColor.r}, ${roofColor.g}, ${roofColor.b}, 1)`;

var FOV               = inRadians(60);
const NUMBER_OF_RAYS    = mapCanvas.width;

var TRIP_MODE = {enabled: 1, stage: 0, direction: 0};

for (input of document.getElementsByTagName('input')) {
   input.onchange = (e) => {
        FOV = inRadians(parseFloat(document.getElementById('FOV').value));
        TRIP_MODE.enabled = document.getElementById('TRIP_MODE').value == '1' ? true : false;
        wallColor.r = document.getElementById('R').value;
        wallColor.g = document.getElementById('G').value;
        wallColor.b = document.getElementById('B').value;
        floorColor.r = document.getElementById('R2').value;
        floorColor.g = document.getElementById('G2').value;
        floorColor.b = document.getElementById('B2').value;
        roofColor.r = document.getElementById('R3').value;
        roofColor.g = document.getElementById('G3').value;
        roofColor.b = document.getElementById('B3').value;
        gameCanvas.style.background = `rgba(${roofColor.r}, ${roofColor.g}, ${roofColor.b}, 1)`;
   }
}




const KEYS = {
    UP:    87,
    DOWN:  83,
    CAMERA_LEFT:  37,
    CAMERA_RIGHT: 39,
    CAMERA_UP: 38,
    CAMERA_DOWN: 40,
    ATTACK: 32
}

var SPRITE_TRANSLATE = [0, 0];


function generateEnemies(numberOf, w, h, map) {
    for (let i = 0; i < numberOf; i++) {
        SPRITE_TRANSLATE[i + 2] = eyeSprite;
    }
    for (let i = 0; i < numberOf; i++) {
        console.log('generating...');
        let randX = Math.floor(Math.random() * ((w-1) - 0) + 0);
        let randY = Math.floor(Math.random() * ((h-1) - 0) + 0);
        while (map.matrix[randX][randY] != 0) {
            console.log('retry...');
            randX = Math.floor(Math.random() * ((w-1) - 0) + 0);
            randY = Math.floor(Math.random() * ((h-1) - 0) + 0); 
        }
        map.matrix[randX][randY] = 3 + i;
        
    }
}


function tripModeAnimator() {
    if (TRIP_MODE.direction == 0) {
        if (TRIP_MODE.stage == 0) {
            wallColor.r--;
            if(wallColor.r == 0) {
                TRIP_MODE.stage = 1
            }
        } else if (TRIP_MODE.stage == 1) {
            wallColor.g--;
            if(wallColor.g == 0) {
                TRIP_MODE.stage =2
            }
        } else {
            wallColor.b--;
            if(wallColor.b == 0) {
                TRIP_MODE.stage = 0
                TRIP_MODE.direction = 1;
            }
        }
    } else {
        if (TRIP_MODE.stage == 0) {
            wallColor.r++;
            if(wallColor.r == 255) {
                TRIP_MODE.stage = 1
            }
        } else if (TRIP_MODE.stage == 1) {
            wallColor.g++;
            if(wallColor.g == 255) {
                TRIP_MODE.stage =2
            }
        } else {
            wallColor.b++;
            if(wallColor.b == 255) {
                TRIP_MODE.stage = 0
                TRIP_MODE.direction = 0;
            }
        }
    }
}

function normalizeAngle(angle) {
    angle = angle % (2 * Math.PI);
    if (angle < 0) {
        angle = (2 * Math.PI) + angle; 
    }
    return angle;
}

function maze(x,y) {
    var n=x*y-1;
    if (n<0) {alert("illegal maze dimensions");return;}
    var horiz=[]; for (var j= 0; j<x+1; j++) horiz[j]= [];
    var verti=[]; for (var j= 0; j<y+1; j++) verti[j]= [];
    var here= [Math.floor(Math.random()*x), Math.floor(Math.random()*y)];
    var path= [here];
    var unvisited= [];
    for (var j= 0; j<x+2; j++) {
        unvisited[j]= [];
        for (var k= 0; k<y+1; k++)
            unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
    }
    while (0<n) {
        var potential= [[here[0]+1, here[1]], [here[0],here[1]+1],
            [here[0]-1, here[1]], [here[0],here[1]-1]];
        var neighbors= [];
        for (var j= 0; j < 4; j++)
            if (unvisited[potential[j][0]+1][potential[j][1]+1])
                neighbors.push(potential[j]);
        if (neighbors.length) {
            n= n-1;
            next= neighbors[Math.floor(Math.random()*neighbors.length)];
            unvisited[next[0]+1][next[1]+1]= false;
            if (next[0] == here[0])
                horiz[next[0]][(next[1]+here[1]-1)/2]= true;
            else 
                verti[(next[0]+here[0]-1)/2][next[1]]= true;
            path.push(here= next);
        } else 
            here= path.pop();
    }
    return ({x: x, y: y, horiz: horiz, verti: verti});
}

function returnMazeArray(m, w, h) {
    var text= [];
    for (var j= 0; j<m.x*2+1; j++) {
        var line= [];
        if (0 == j%2)
            for (var k=0; k<m.y*4+1; k++)
                if (0 == k%4) 
                    line[k]= '+';
                else
                    if (j>0 && m.verti[j/2-1][Math.floor(k/4)])
                        line[k]= ' ';
                    else
                        line[k]= '-';
        else
            for (var k=0; k<m.y*4+1; k++)
                if (0 == k%4)
                    if (k>0 && m.horiz[(j-1)/2][k/4-1])
                        line[k]= ' ';
                    else
                        line[k]= '|';
                else
                    line[k]= ' ';
        if (0 == j) line[1]= line[2]= line[3]= ' ';
        if (m.x*2-1 == j) line[4*m.y]= ' ';
        text.push(line.join('')+'\r\n');
    }
    let output_matrix = [];
    let lines = text.join('').split("\n");
    for (let i = 0; i < lines.length; i++) {
        output_matrix[i] = [];
        for (let j = 0; j < lines[0].split('').length; j++) {
            output_matrix[i][j] = (lines[i].split('')[j] == '-' || lines[i].split('')[j] == '+') ? 1 : 0;
            if (i == 0 || i == w - 1 || j == 0 || j == h - 1) {
                output_matrix[i][j] = 1;
            }
            else if (i == 1 || j == 1 || i == w - 2 || j == h - 2) {
                output_matrix[i][j] = 0;
            }
        }
    }
    return output_matrix;
}


var enemyMovementOffset = [[1,-1], [-1, 1], [0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1]];
var pimba = 100;
function moveEnemies(map) {
    let new_pos = [];
    for (let i = 0; i < map.matrix.length; i++) {
        for (let j = 0; j < map.matrix[0].length; j++) {
            if (map.matrix[i][j] > 2) {
                let alreadyMoved = false;
                for (let a = 0; a < new_pos.length; a++) {
                    if (new_pos[a][0] == i && new_pos[a][1] == j) {
                        //console.log("ja movi..")
                        alreadyMoved = true;
                    }
                }
                if (!alreadyMoved) {
                    let oldType = map.matrix[i][j];
                    let randomX = Math.round(Math.random()) == 1 ? -1 : 1;
                    let randomY = Math.round(Math.random()) == 1 ? -1 : 1;
                    randomX = randomX * Math.round(Math.random());
                    randomY = randomY * Math.round(Math.random());
                    while(map.matrix[i + randomX][j + randomY] != 0) {
                        randomX = Math.round(Math.random()) == 1 ? -1 : 1;
                        randomY = Math.round(Math.random()) == 1 ? -1 : 1;
                        randomX = randomX * Math.round(Math.random());
                        randomY = randomY * Math.round(Math.random());
                    }
                    map.matrix[i + randomX][j + randomY] = oldType;
                    map.matrix[i][j] = 0;
                    new_pos.push([i + randomX, j + randomY]);
                }
            }
        }
    }
    //console.log("PIMBA? " + pimba);
    pimba+=100;
}

function Player (x, y, walkingSpeed, rotationSpeed, currentMap) {
    this.x = x;
    this.y = y;
    this.walking = 0;
    this.hp = 100;
    this.walkingSpeed = walkingSpeed;
    this.rotationSpeed = rotationSpeed * (Math.PI / 180);
    this.rotationAngle = Math.PI / 2;
    this.attacking = false;
    this.currentMap = currentMap;
    this.walkDirectionX = 1;
    this.verticalOffset = 0;
    this.walkDirectionY = 1;
    this.canHit = false;
    this.lineSize = (this.currentMap.drawSize/2) - 3;
    this.dx = Math.cos(this.rotationAngle);
    this.dy = Math.sin(this.rotationAngle);
    this.center = {x: this.x + (this.currentMap.drawSize / 2), y: this.y + this.currentMap.drawSize / 2}
    this.draw = () => {
        //player rect drawing:
        mapContext.fillStyle = 'red';
        mapContext.fillRect(this.x, this.y, this.currentMap.drawSize, this.currentMap.drawSize);
        //player direction line casting
        mapContext.strokeStyle = 'blue'
        mapContext.moveTo(this.center.x, this.center.y);
        mapContext.lineTo(this.center.x + (this.dx * this.lineSize), this.center.y + (this.dy * this.lineSize));
        mapContext.stroke();
        this.drawFloor();
        //this.drawRoof();
        this.rayCast();

    }

    this.fake3D = (x, d, type) => {
        //console.log(x)
            //draw wall
            let colorDecrement = (100 * d) / NUMBER_OF_RAYS;

                gameContext.fillStyle =  `rgba(${(1 - (colorDecrement/100)) * wallColor.r}, 
                                           ${(1 - (colorDecrement/100)) * wallColor.g}, 
                                           ${(1 - (colorDecrement/100)) * wallColor.b}, 1)`;


            let projectionDistance = (gameCanvas.width / 2) / Math.tan(FOV / 2);
            let wallHeight = (this.currentMap.tile_size / d) * projectionDistance;
            let startY = (gameCanvas.height / 2);


            //console.log(wallStripHeight);
            if (type == 1) {
                gameContext.fillRect(x, startY + this.verticalOffset, 1, wallHeight/2);
                gameContext.fillRect(x, startY + this.verticalOffset, 1, -wallHeight/2);
            } else if (type > 1) {
                gameContext.drawImage(SPRITE_TRANSLATE[type], x, startY, wallHeight / 2, wallHeight / 2);
                //console.log(x);
            }


    }

    this.drawFloor = () => {

        gameContext.fillStyle = `rgba(${floorColor.r}, ${floorColor.g}, ${floorColor.b}, 1)`;

            gameContext.fillRect(0, (gameCanvas.height / 2) + this.verticalOffset, gameCanvas.width, (gameCanvas.height / 2) - this.verticalOffset);


    }
    this.rayCast = () => {
        mapContext.strokeStyle = 'pink'
        let raysDistance = (FOV / NUMBER_OF_RAYS);
        let currentAngle = normalizeAngle(this.rotationAngle - ((FOV/2)));
        let v = 0;
        let spritesToRender = [];
        for (let i = 0; i < NUMBER_OF_RAYS; i++) {

            mapContext.moveTo(this.center.x, this.center.y);
            let testX, testY;
            for (let j = 0; j < mapCanvas.width; j++) {
                let xRatio = (this.center.x + (Math.cos(currentAngle)) * (this.lineSize + j)) / this.currentMap.drawSize;
                let yRatio = (this.center.y + (Math.sin(currentAngle)) * (this.lineSize + j)) / this.currentMap.drawSize;
                let matrixX = Math.floor(xRatio);
                let matrixY = Math.floor(yRatio);
                if (this.currentMap.matrix[matrixY][matrixX] != 0) {
                    let targetPointX = xRatio * this.currentMap.drawSize;
                    let targetPointY = yRatio * this.currentMap.drawSize;


                   // mapContext.lineTo(targetPointX, targetPointY);
                    //mapContext.stroke();
                    let distortedDistance = distancePythagorean({x: this.center.x, y: this.center.y}, {x: targetPointX, y: targetPointY});

                    let correctDistance = (distortedDistance * Math.cos(normalizeAngle(currentAngle) - normalizeAngle(this.rotationAngle)));
                    let type = this.currentMap.matrix[matrixY][matrixX];

                    //console.log(distortedDistance);
                    if (type == 1) {
                        this.fake3D(i, correctDistance, type);
                        break;
                    } else {
                        if (typeof spritesToRender[type] == 'undefined') {
                            spritesToRender[type] = [];
                        }
                        spritesToRender[type].push({x: i, d: correctDistance, type: type});
                    }
                }

                v = i;
            }
            //alert(v);
            currentAngle += raysDistance;
            currentAngle = normalizeAngle(currentAngle);

        }
        try {
            let spritesToRenderOrdered = [];
            spritesToRender.forEach (sprites => {
                let spriteAverageX = 0;
                let spriteAverageDistance = 0;
                sprites.forEach (encounter => {
                    spriteAverageX += encounter.x;
                    spriteAverageDistance += encounter.d;
                })
                spriteAverageX /= sprites.length;
                spriteAverageDistance /= sprites.length;

                spritesToRenderOrdered.push({x: spriteAverageX, d: spriteAverageDistance, type: sprites[0].type})
            });
            spritesToRenderOrdered.sort(dynamicSort('d'));
            spritesToRenderOrdered = spritesToRenderOrdered.reverse();
            spritesToRenderOrdered.forEach (sprite => {
                this.fake3D(sprite.x, sprite.d, sprite.type);
            })

        } catch(e) {//console.log(e)
        }
    }

    this.isColliding = () => {
        let xRatio1 = (this.center.x) / this.currentMap.drawSize;
        let yRatio1 = (this.center.y + this.lineSize) / this.currentMap.drawSize;
        let matrixX1 = Math.floor(xRatio1);
        let matrixY1 = Math.floor(yRatio1);
        let xRatio2 = (this.center.x) / this.currentMap.drawSize;
        let yRatio2 = (this.center.y - this.lineSize) / this.currentMap.drawSize;
        let matrixX2 = Math.floor(xRatio2);
        let matrixY2 = Math.floor(yRatio2);
        let xRatio3 = (this.center.x - this.lineSize) / this.currentMap.drawSize;
        let yRatio3 = (this.center.y) / this.currentMap.drawSize;
        let matrixX3 = Math.floor(xRatio3);
        let matrixY3 = Math.floor(yRatio3);
        let xRatio4 = (this.center.x + this.lineSize) / this.currentMap.drawSize;
        let yRatio4 = (this.center.y) / this.currentMap.drawSize;
        let matrixX4 = Math.floor(xRatio4);
        let matrixY4 = Math.floor(yRatio4);
        if (this.currentMap.matrix[matrixY1][matrixX1] != 0) {
            return {direction: 'DOWN', type: this.currentMap.matrix[matrixY1][matrixX1], x: matrixY1, y: matrixX1};
        } else if(this.currentMap.matrix[matrixY2][matrixX2] != 0) { 
            return {direction: 'UP', type: this.currentMap.matrix[matrixY2][matrixX2], x: matrixY2, y: matrixX2};
        } else if(this.currentMap.matrix[matrixY3][matrixX3] != 0){
            return {direction: 'LEFT', type: this.currentMap.matrix[matrixY3][matrixX3], x: matrixY3, y: matrixX3};
        } else if(this.currentMap.matrix[matrixY4][matrixX4] != 0) {
            return {direction: 'RIGHT', type: this.currentMap.matrix[matrixY4][matrixX4], x: matrixY4, y: matrixX4};
        } else {
            return {direction: false};
        }

        
    }

    this.move = () => {
        let collisionStatus = this.isColliding();
        if(collisionStatus.direction == false) {
            this.y += this.walking * (this.walkDirectionX) * (this.walkingSpeed * this.dy);
            this.x += this.walking * (this.walkDirectionY) * (this.walkingSpeed * this.dx);
        } else if (collisionStatus.direction == 'UP') {
            this.y+= 0.1;
        } else if (collisionStatus.direction == 'DOWN') {
            this.y-= 0.1;
        } else if (collisionStatus.direction == 'LEFT') {
            this.x+= 0.1;
        } else {
            this.x-= 0.1;
        }

        if (collisionStatus.direction != false) {
            if (collisionStatus.type > 1) {
                
                    //console.log("TOMEILHE DO INIMIGO PAPAI UIA AIAI..");
                    this.canHit = true;
                    if (this.attacking) {
                        console.log("estaria a bater...");
                        this.currentMap.matrix[collisionStatus.x][collisionStatus.y] = 0;
                        FOV = inRadians(inDegrees(FOV) + 10);
                        maxEnemies--;
                        //generateEnemies(1, this.currentMap.matrix.length, this.currentMap.matrix[0].width, this.currentMap);
                    }
                    this.hp -= 1;
                
            } else {
                this.canHit = false;
            }
        }
        
        this.dx = Math.cos(this.rotationAngle);
        this.dy = Math.sin(this.rotationAngle);
       
        //this.walking = 0;
        this.center = {x: this.x + this.currentMap.drawSize / 2, y: this.y + this.currentMap.drawSize / 2}
    }
    this.keyListener = window.onkeydown = (e) => {
  
        switch(e.keyCode) {
            case KEYS.ATTACK: 
                this.attacking = true;
            break;
            case KEYS.UP:
                this.walkDirectionX = 1;
                this.walkDirectionY = 1;
                this.walking = 1;
            break;

            case KEYS.DOWN:
                this.walkDirectionX = -1;
                this.walkDirectionY = -1;
                this.walking = 1;
            break;

            case KEYS.CAMERA_UP:
                this.verticalOffset+= this.walkingSpeed;
            break;

            case KEYS.CAMERA_DOWN:
                this.verticalOffset-= this.walkingSpeed;
            break;

            case KEYS.CAMERA_LEFT:
                this.rotationAngle = normalizeAngle(this.rotationAngle - this.rotationSpeed);
            break;

            case KEYS.CAMERA_RIGHT:
                this.rotationAngle = normalizeAngle(this.rotationAngle + this.rotationSpeed);
            break;
        }
    }
    this.keyListener = window.onkeyup = (e) => {
        
        switch(e.keyCode) {
            case KEYS.ATTACK: 
                this.attacking = false;
            break;
            case KEYS.UP:
                this.walkDirectionX = 1;
                this.walkDirectionY = 1;
                this.walking = 0;
            break;

            case KEYS.DOWN:
                this.walkDirectionX = -1;
                this.walkDirectionY = -1;
                this.walking = 0;
            break;

            case KEYS.CAMERA_UP:
                this.verticalOffset+= this.walkingSpeed;
            break;

            case KEYS.CAMERA_DOWN:
                this.verticalOffset-= this.walkingSpeed;
            break;

            case KEYS.CAMERA_LEFT:
                this.rotationAngle = normalizeAngle(this.rotationAngle - this.rotationSpeed);
            break;

            case KEYS.CAMERA_RIGHT:
                this.rotationAngle = normalizeAngle(this.rotationAngle + this.rotationSpeed);
            break;
        }
    }
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function whichQuadrant(degrees) {
    if (degrees >= 0 && degrees < 90) {
        return 1;
    } else if (degrees >= 90 && degrees < 180) {
        return 2;
    } else if (degrees >= 180 && degrees < 270) {
        return 3;
    } else {
        return 4;
    }
}

function Map (tile_size, row_count, column_count, matrix) {
    this.tile_size = tile_size;
    this.row_count = row_count;
    this.column_count = column_count;
    this.matrix = matrix;
    this.ratioX  = (mapCanvas.width / this.column_count);
    this.ratioY  = (mapCanvas.height / this.row_count);
    this.drawSize = Math.min(this.ratioX, this.ratioY, this.tile_size);
    this.draw = () => {
        mapContext.rotate(0);
        mapContext.fillStyle = 'orange';
        for (let x = 0; x < this.column_count; x++) {
            for (let y = 0; y < this.row_count; y++) {
                if (this.matrix[y][x] > 0) {
                    mapContext.fillStyle = 'orange';
                    mapContext.fillRect(x * this.drawSize, y * this.drawSize, this.drawSize, this.drawSize);
                    if (this.matrix[y][x] >= 2) {
                        mapContext.fillStyle = 'green';
                        mapContext.fillRect(x * this.drawSize, y * this.drawSize, this.drawSize, this.drawSize);
                    }
                }
            }
        }
    }
}


//{number, number} {number, number} -> number
function distancePythagorean (objectA, objectB) {
    return Math.sqrt (
        (( objectB.x - objectA.x ) ** 2)
        +
        (( objectB.y - objectA.y ) ** 2)
    );
}

// number -> number
function inRadians (degrees) {
    return degrees * (Math.PI / 180);
}

// number -> number
function inDegrees (radians) {
    return radians * (180 / Math.PI);
}