var canvas;
var ctx;
const offset = 95;
var score = 0;
var board = 
[[0, 0, 0, 0],
 [0, 0, 0, 0],
 [0, 0, 0, 0],
 [0, 0, 0, 0]];


placed = 0;
while(placed!=2){
	randX = Math.floor(Math.random() * 4);
	randY = Math.floor(Math.random() * 4);
	if(board[randX][randY]==0){
		board[randX][randY] = new piece(2);
		board[randX][randY].position.x = randY;
		board[randX][randY].position.y = randX;
		placed++;
	}
}






function init(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctx.font = "30px Arial";
	drawBoard();
	drawSquares();
}

function drawBoard(){
	ctx.fillStyle = '#6d5a48';
	ctx.fillRect(0, offset, canvas.width, 5);
	ctx.fillRect(0, offset+100, canvas.width, 5);
	ctx.fillRect(0, offset+200, canvas.width, 5);
	ctx.fillRect(offset, 0, 5, canvas.height);
	ctx.fillRect(offset+100, 0, 5, canvas.height);
	ctx.fillRect(offset+200, 0, 5, canvas.height);
}

function drawSquares(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBoard();
	for(var x = 0; x < board.length; x++){
		for(var y = 0; y < board[0].length; y++){
			if(board[x][y].value == 2){ ctx.fillStyle = '#d6d5d4' }
			else if(board[x][y].value == 4){ ctx.fillStyle = '#f7f0cf' }
			else if(board[x][y].value == 8){ ctx.fillStyle = '#ddab7e' }
			else if(board[x][y].value == 16){ ctx.fillStyle = '#ce7e35' }
			else if(board[x][y].value == 32){ ctx.fillStyle = '#e8d937' }
			else if(board[x][y].value == 64){ ctx.fillStyle = '#ffb3af' }
			else if(board[x][y].value == 128){ ctx.fillStyle = '#d85f58' }
			else if(board[x][y].value == 256){ ctx.fillStyle = '#cfd6a2' }
			else if(board[x][y].value == 512){ ctx.fillStyle = '#a0a86b' }
			else if(board[x][y].value == 1024){ ctx.fillStyle = '#d8ffb7' }
			else if(board[x][y].value == 2048){ ctx.fillStyle = '#ff4800' }
			else if(board[x][y].value == 4096){ ctx.fillStyle = '#840000' }
			else if(board[x][y].value == 8192){ ctx.fillStyle = '#bf62a1' }
			else if(board[x][y].value == 16384){ ctx.fillStyle = '#2511fc' }
			else { ctx.fillStyle = 'gold'}
			

			if(board[x][y]!=0){
				ctx.fillRect(board[x][y].position.x * 100, board[x][y].position.y * 100, 95, 95);
				ctx.fillStyle = 'black';
				if(board[x][y].value<16){
					ctx.fillText(board[x][y].value, board[x][y].position.x * 100 + 40, board[x][y].position.y * 100 + 60);
				}else if(board[x][y].value>=16 && board[x][y].value<128){
					ctx.fillText(board[x][y].value, board[x][y].position.x * 100 + 30, board[x][y].position.y * 100 + 60);
				}
				else if(board[x][y].value>=128 && board[x][y].value<1024){
					ctx.fillText(board[x][y].value, board[x][y].position.x * 100 + 20, board[x][y].position.y * 100 + 60);
				}else{

				}
			}
		}
	}
}

function piece(value){
	this.value = value;
	this.position = {
		x: 0,
		y: 0
	}
}

function moveSquares(direction){
	counter = 0;
	canSum = true;
	found = false;
	if(direction=='up'){
		for(var x = 0; x < board.length; x++){
			for(var y = 0; y < board[0].length; y++){
				if(board[x][y]!=0){
					for(var i = 0; i < 3; i++){
						if(x-i-1>=0 && board[x-i-1][y]==0){
							board[x-i][y].position.y--;
							counter++;
							board[board[x-i][y].position.y][y] = board[x-i][y];
							board[x-i][y] = 0;
						}
						else if(x-i-1>=0 && board[x-i-1][y].value==board[x-i][y].value && canSum == true){
							board[x-i-1][y].value *= 2;
							score+=board[x-i-1][y].value;
							counter++;
							board[x-i][y] = 0;
							canSum = false;

						}
					}
					canSum = true;
				}
			}
		}
		
		

		
			drawSquares();
	}
	if(direction=='down'){
		for(var x = board.length-1; x >= 0; x--){
			for(var y = 0; y < board[0].length; y++){
				if(board[x][y]!=0){
					for(var i = 0; i < 3; i++){
						if(x+i+1<=3 && board[x+i+1][y]==0){
							board[x+i][y].position.y++;
							counter++;
							board[board[x+i][y].position.y][y] = board[x+i][y];
							board[x+i][y] = 0;
						}
						else if(x+i+1<=3 && board[x+i+1][y].value==board[x+i][y].value && canSum == true){
							board[x+i+1][y].value *= 2;
							score+=board[x+i+1][y].value;
							counter++;
							board[x+i][y] = 0;
							canSum = false;
						}
					}
					canSum = true;
				}
			}
		}
		drawSquares();
	}
	if(direction=='left'){
		for(var x = 0; x < board.length; x++){
			for(var y = 0; y < board[0].length; y++){
				if(board[x][y]!=0){
					for(var i = 0; i < 3; i++){
						if(y-i-1>=0 && board[x][y-i-1]==0){
							board[x][y-i].position.x--;
							counter++;
							board[x][board[x][y-i].position.x] = board[x][y-i];
							board[x][y-i] = 0;
						}
						else if(y-i-1>=0 && board[x][y-i-1].value==board[x][y-i].value && canSum == true){
							board[x][y-i-1].value *= 2;
							score+=board[x][y-i-1].value;
							counter++;
							board[x][y-i] = 0;
							canSum = false;
						}
					}
					canSum = true;
				}
			}
		}
		drawSquares();
	}
	if(direction=='right'){
		for(var x = 0; x < board.length; x++){
			for(var y = board[0].length-1; y >= 0; y--){
				if(board[x][y]!=0){
					for(var i = 0; i < 3; i++){
						if(y+i+1<=3 && board[x][y+i+1]==0){
							board[x][y+i].position.x++;
							counter++;
							board[x][board[x][y+i].position.x] = board[x][y+i];
							board[x][y+i] = 0;
						}
						else if(y+i+1<=3 && board[x][y+i+1].value==board[x][y+i].value && canSum == true){
							board[x][y+i+1].value *= 2;
							score+=board[x][y+i+1].value;
							counter++;
							board[x][y+i] = 0;
							canSum = false;
						}
					}
					canSum = true;
				}
			}
		}
		drawSquares();
	}

	if(counter>0){
		random_value = Math.floor(Math.random() * 2);
		if(random_value==0){
			new_value = 2;
		}else{
			new_value = 4;
		}
		
		
		if(direction=='up'){
			for(var i = board.length-1; i >= 0; i--){
				while(true){
				random = Math.floor(Math.random() * 4);
				if(board[i][random]==0){
					board[i][random] = new piece(new_value);
					board[i][random].position.x = random;
					board[i][random].position.y = i;
					drawSquares();
					found = true;
					break;
				}
			}
			if(found){
				break;
			}
		}
		}
		if(direction=='down'){
			for(var i = 0; i < board.length; i++){
				while(true){
				random = Math.floor(Math.random() * 4);
				if(board[i][random]==0){
					board[i][random] = new piece(new_value);
					board[i][random].position.x = random;
					board[i][random].position.y = i;
					drawSquares();
					found = true;
					break;
				}
			}
			if(found){
				break;
			}
		}
		}
		if(direction=='left'){
			for(var i = board[0].length-1; i >= 0; i--){
				while(true){
				random = Math.floor(Math.random() * 4);
				if(board[random][i]==0){
					board[random][i] = new piece(new_value);
					board[random][i].position.x = i;
					board[random][i].position.y = random;
					drawSquares();
					found = true;
					break;
				}
			}
			if(found){
				break;
			}
		}
		}
		if(direction=='right'){
			for(var i = 0; i < board[0].length; i++){
				while(true){
				random = Math.floor(Math.random() * 4);
				if(board[random][i]==0){
					board[random][i] = new piece(new_value);
					board[random][i].position.x = i;
					board[random][i].position.y = random;
					drawSquares();
					found = true;
					break;
				}
			}
			if(found){
				break;
			}
		}
		}
	




	}
	document.getElementById('score').innerHTML = 'Score: '+score;
	
}

document.onkeydown = function(e){
	//cima
	if(e.keyCode==38){
		moveSquares('up');
	}
	//baixo
	if(e.keyCode==40){
		moveSquares('down');
	}
	//direita
	if(e.keyCode==37){
		moveSquares('left');
	}
	//esquerda
	if(e.keyCode==39){
		moveSquares('right');
	}
}