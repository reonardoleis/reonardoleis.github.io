const gameCanvas = document.getElementById('gameCanvas');
const mapCanvas  = document.getElementById('mapCanvas');

var eyeSprite = document.getElementById('eyeSprite');

const [ gameContext, mapContext ] = [ gameCanvas.getContext('2d'), mapCanvas.getContext('2d') ];

const FOV               = inRadians(60);
const NUMBER_OF_RAYS    = mapCanvas.width;

const KEYS = {
    UP:    119,
    DOWN:  115,
    CAMERA_LEFT:  113,
    CAMERA_RIGHT: 101,
    LEFT: 97,
    RIGHT: 100
}

const SPRITE_TRANSLATE = [0, 0, eyeSprite, eyeSprite];

function normalizeAngle(angle) {
    angle = angle % (2 * Math.PI);
    if (angle < 0) {
        angle = (2 * Math.PI) + angle; 
    }
    return angle;
}

function Player (x, y, walkingSpeed, rotationSpeed, currentMap) {
    this.x = x;
    this.y = y;
    this.walking = 0;
    this.walkingSpeed = walkingSpeed;
    this.rotationSpeed = rotationSpeed * (Math.PI / 180);
    this.rotationAngle = Math.PI / 2;
    this.currentMap = currentMap;
    this.walkDirectionX = 1;
    this.walkDirectionY = 1;
    this.lineSize = (this.currentMap.drawSize/2) + 5;
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
        this.rayCast();

    }

    this.fake3D = (x, d, type) => {
        //console.log(x)
            //draw wall
            let colorDecrement = (100 * d) / NUMBER_OF_RAYS;

                gameContext.fillStyle =  `rgba(${(1 - (colorDecrement/100)) * 255}, 
                                           ${(1 - (colorDecrement/100)) * 255}, 
                                           ${(1 - (colorDecrement/100)) * 255}, 1)`;


            let projectionDistance = (gameCanvas.width / 2) / Math.tan(FOV / 2);
            let wallHeight = (this.currentMap.tile_size / d) * projectionDistance;
            let startY = (gameCanvas.height / 2);


            //console.log(wallStripHeight);
            if (type == 1) {
                gameContext.fillRect(x, startY, 1, wallHeight/2);
                gameContext.fillRect(x, startY, 1, -wallHeight/2);
            } else if (type > 1) {
                gameContext.drawImage(SPRITE_TRANSLATE[type], x, startY, wallHeight / 2, wallHeight / 2);
                //console.log(x);
            }


    }

    this.drawFloor = () => {
        for (let i = 0; i < NUMBER_OF_RAYS; i++) {
            let floorGradient = gameContext.createLinearGradient(x, (gameCanvas.height / 2), x, gameCanvas.height);
            floorGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
            floorGradient.addColorStop(1, 'rgba(220, 200, 175, 1)');
            gameContext.fillStyle = floorGradient;
       
            gameContext.fillRect(i, gameCanvas.height / 2, 1, gameCanvas.height / 2);
        
        }
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

        } catch(e) {console.log(e)}
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
            return 'DOWN';
        } else if(this.currentMap.matrix[matrixY2][matrixX2] != 0) { 
            return 'UP';
        } else if(this.currentMap.matrix[matrixY3][matrixX3] != 0){
            return 'LEFT';
        } else if(this.currentMap.matrix[matrixY4][matrixX4] != 0) {
            return 'RIGHT';
        } else {
            return false;
        }
    }

    this.move = () => {
        let collisionStatus = this.isColliding();
        if(collisionStatus == false) {
            this.y += this.walking * (this.walkDirectionX) * (this.walkingSpeed * this.dy);
            this.x += this.walking * (this.walkDirectionY) * (this.walkingSpeed * this.dx);
        } else if (collisionStatus == 'UP') {
            this.y+= 0.1;
        } else if (collisionStatus == 'DOWN') {
            this.y-= 0.1;
        } else if (collisionStatus == 'LEFT') {
            this.x+= 0.1;
        } else {
            this.x-= 0.1;
        }
        
        this.dx = Math.cos(this.rotationAngle);
        this.dy = Math.sin(this.rotationAngle);
       
        this.walking = 0;
        this.center = {x: this.x + this.currentMap.drawSize / 2, y: this.y + this.currentMap.drawSize / 2}
    }
    this.keyListener = window.onkeypress = (e) => {
        switch(e.keyCode) {
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
                    mapContext.fillRect(x * this.drawSize, y * this.drawSize, this.drawSize, this.drawSize);
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