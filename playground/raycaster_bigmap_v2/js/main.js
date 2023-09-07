var k = returnMazeArray(maze(25, 25), 25, 25)
var Map1 = new Map(20, 25, 25, k);



var Player1 = new Player(Map1.drawSize * 2, Map1.drawSize * 2, 3, 2, Map1);

var FPS = 120;

var PlayerSpeedMult = 3;

generateEnemies(maxEnemies, 25, 25, Map1);


setInterval(() => {
    moveEnemies(Map1);
}, 5000);
function gameLoop() {
    if (maxEnemies == 0) {
        maxEnemies = 5;
        generateEnemies(maxEnemies, 25, 25, Map1);
    }
    if (Player1.hp > 0) {
        mapContext.beginPath();
    mapContext.moveTo(0, 0);
    gameContext.beginPath();
    gameContext.moveTo(0, 0);
    gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    mapContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
    
    Map1.draw();
    if (TRIP_MODE.enabled) {
        tripModeAnimator();
        document.getElementById('R').value = wallColor.r;
        document.getElementById('G').value = wallColor.g;
        document.getElementById('B').value = wallColor.b;
    }
    Player1.draw();
    Player1.move();
    gameContext.fillStyle = 'ORANGE';
    gameContext.font = '20px Georgia';
    gameContext.fillText("HP: " + Player1.hp, 20, 25);
    Player1.walkingSpeed = (60 / FPS) * PlayerSpeedMult;
    //drawCrossHair (informative only)
    if (document.getElementById('CROSSHAIR').value == '1') {
        gameContext.fillStyle = '#00FF00';
        gameContext.fillRect((gameCanvas.width / 2) - 2.5, (gameCanvas.height / 2) - 2.5, 5, 5);
    }
    FPS = parseInt(document.getElementById('FPS').value);
    setTimeout(() => {gameLoop()}, (1/FPS)*1000);
    } else {
        alert("Tu morreu meu balsa..");
    }
}

gameLoop();
