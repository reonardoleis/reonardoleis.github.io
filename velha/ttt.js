var board = 
    [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
    ];

var playing = true;
const BLANK     = '-';
const CIRCLE    = 'o';
const CROSS     = 'x';
const PLAYER    = 0;
const AI        = 1;


var current_player = Math.round(Math.random());

if (current_player == AI) {
    place();
    document.getElementById("player").innerHTML = "AI PLAYS FIRST";
}else {
    print();
    document.getElementById("player").innerHTML = "PLAYER PLAYS FIRST";
}

function place (x = false, y = false) {
    if(playing) {
        isDraw();
        if (current_player == PLAYER) {

            if (board[x-1][y-1] == BLANK) {
                board[x-1][y-1] = CROSS;
                current_player = AI;
                print();
                place();
            } else {
                console.log("Pos invalida!");
            }

        } else {

            computerPlay();
            print();
            current_player = PLAYER;

        }
        
    }

    

}


function isDraw() {
    let sum = 0;
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board.length; j++) {
            if(board[i][j] != BLANK) {
                sum++;
            }
        }
    }
    console.log(sum)
    if(sum == (board.length ** 2)) {
        playing = false;
        document.getElementById("player").innerHTML = "DRAW!";
    }
}

function computerPlay () {

    if (AICanWin()) {
        document.getElementById("player").innerHTML = "AI WINS!";
        return;
    }
    if (playerCanWin()) {
        return;
    } else {

        if (areCornersBlank()) {
            return;
        }else {
            playAnyFreePosition();
            return;
        }

    }


}

function playerCanWin () {


    for (let i = 0; i < board.length; i++) {

        for (let j = 0; j < board.length; j++) {

            if (board[i][j] == CROSS) {

                
                let detectedCase = detectCase();
                if(detectedCase == 0) {
                    return 0;
                }else {

                    return 1;

                }
                

            }

        }

    }


}

function areCornersBlank() {
    if (board[0][0] == BLANK) {
        board[0][0] = CIRCLE;
        return 1;
    }
    if (board[0][2] == BLANK) {
        board[0][2] = CIRCLE;
        return 1;
    }
    if (board[2][0] == BLANK) {
        board[2][0] = CIRCLE;
        return 1;
    }
    if (board[2][2] == BLANK) {
        board[2][2] = CIRCLE;
        return 1;
    }
    return 0;
}


function verify() {


    


}


function playAnyFreePosition() {

    for (let i = 0; i < board.length; board++) {
        for (let j = 0; j < board.length; j++) {
            if(board[i][j] == BLANK) {
                board[i][j] = CIRCLE;
            }
        }
    }

}


function detectCase () {

    let play_i;
    let play_j;
    let count = 0;
    let hasCircle = false;

    for (let i = 0; i < board.length; i++) {
        if(board[i][i] == CROSS) 
            count++;
        else if(board[i][i] == CIRCLE)
            hasCircle = true;
        else {
            play_i = i; play_j = i;
        }
        
    }

    if(count == 2 && !hasCircle) {
        console.log("DIAGONAL! " + play_i + " e " + play_j);
        board[play_i][play_j] = CIRCLE;
        return 1;
    }

    count = 0;
    hasCircle = false;

    for (let i = 0; i < board.length; i++) {

        if(board[i][2 - i] == CROSS)
            count++;
        else if(board[i][2 - i] == CIRCLE)
            hasCircle = true;
        else {
            play_i = i; play_j = 2 - i;
        }
    }

    if(count == 2 && !hasCircle) {
        board[play_i][play_j] = CIRCLE
        return 1;
    }

    count = 0;
    hasCircle = false;

    for (let i = 0; i < board.length; i++) {
        if(board[0][i] == CROSS)
            count++
        else if(board[0][i] == CIRCLE)
            hasCircle = true;
        else {
            play_i = 0; play_j = i;
        }
    }

    if(count == 2 && !hasCircle) {
        board[play_i][play_j] = CIRCLE
        return 1;
    }

    count = 0;
    hasCircle = false;

    for (let i = 0; i < board.length; i++) {
        if(board[1][i] == CROSS)
            count++
        else if(board[1][i] == CIRCLE)
            hasCircle = true;
        else {
            play_i = 1; play_j = i;
        }
    }

    if(count == 2 && !hasCircle) {
        board[play_i][play_j] = CIRCLE
        return 1;
    }

    count = 0;
    hasCircle = false;

    for (let i = 0; i < board.length; i++) {
        if(board[2][i] == CROSS)
            count++
        else if(board[2][i] == CIRCLE)
            hasCircle = true;
        else {
            play_i = 2; play_j = i;
        }
    }

    if(count == 2 && !hasCircle) {
        board[play_i][play_j] = CIRCLE
        return 1;
    }

    count = 0;
    hasCircle = false;

    for (let i = 0; i < board.length; i++) {
        if(board[i][0] == CROSS)
            count++
        else if(board[i][0] == CIRCLE)
            hasCircle = true;
        else {
            play_i = i; play_j = 0;
        }
            
    }

    if(count == 2 && !hasCircle) {
        board[play_i][play_j] = CIRCLE
        return 1;
    }

    count = 0;
    hasCircle = false;

    for (let i = 0; i < board.length; i++) {
        if(board[i][1] == CROSS)
            count++
        else if(board[i][1] == CIRCLE)
            hasCircle = true;
        else {
            play_i = i; play_j = 1;
        }
    }

    if(count == 2 && !hasCircle) {
        board[play_i][play_j] = CIRCLE
        return 1;
    }

    count = 0;
    hasCircle = false;

    for (let i = 0; i < board.length; i++) {
        if(board[i][2] == CROSS)
            count++
        else if(board[i][2] == CIRCLE)
            hasCircle = true;
        else {
            play_i = i; play_j = 2;
        }
    }

    if(count == 2 && !hasCircle) {
        board[play_i][play_j] = CIRCLE
        return 1;
    }

    count = 0;
    hasCircle = false;
    
    return 0;

}


function AICanWin () {

    let play_i;
    let play_j;
    let count = 0;
    let hasCross = false;

    for (let i = 0; i < board.length; i++) {
        if(board[i][i] == CIRCLE) 
            count++;
        else if(board[i][i] == CROSS)
            hasCross = true;
        else {
            play_i = i; play_j = i;
        }
        
    }

    if(count == 2 && !hasCross) {
        playing = 0;
        board[play_i][play_j] = CIRCLE;
        return 1;
    }

    count = 0;
    hasCross = false;

    for (let i = 0; i < board.length; i++) {

        if(board[i][2 - i] == CIRCLE)
            count++;
        else if(board[i][2 - i] == CROSS)
            hasCross = true;
        else {
            play_i = i; play_j = 2 - i;
        }
    }

    if(count == 2 && !hasCross) {
        playing = 0;
        board[play_i][play_j] = CIRCLE
        return 1;
    }

    count = 0;
    hasCross = false;

    for (let i = 0; i < board.length; i++) {
        if(board[0][i] == CIRCLE)
            count++
        else if(board[0][i] == CROSS)
            hasCross = true;
        else {
            play_i = 0; play_j = i;
        }
    }

    if(count == 2 && !hasCross) {
        playing = 0;
        board[play_i][play_j] = CIRCLE
        return 1;
    }

    count = 0;
    hasCross = false;

    for (let i = 0; i < board.length; i++) {
        if(board[1][i] == CIRCLE)
            count++
        else if(board[1][i] == CROSS)
            hasCross = true;
        else {
            play_i = 1; play_j = i;
        }
    }

    if(count == 2 && !hasCross) {
        playing = 0;
        board[play_i][play_j] = CIRCLE
        return 1;
    }

    count = 0;
    hasCross = false;

    for (let i = 0; i < board.length; i++) {
        if(board[2][i] == CIRCLE)
            count++
        else if(board[2][i] == CROSS)
            hasCross = true;
        else {
            play_i = 2; play_j = i;
        }
    }

    if(count == 2 && !hasCross) {
        playing = 0;
        board[play_i][play_j] = CIRCLE
        return 1;
    }

    count = 0;
    hasCross = false;

    for (let i = 0; i < board.length; i++) {
        if(board[i][0] == CIRCLE)
            count++
        else if(board[i][0] == CROSS)
            hasCross = true;
        else {
            play_i = i; play_j = 0;
        }
            
    }

    if(count == 2 && !hasCross) {
        playing = 0;
        board[play_i][play_j] = CIRCLE
        return 1;
    }

    count = 0;
    hasCross = false;

    for (let i = 0; i < board.length; i++) {
        if(board[i][1] == CIRCLE)
            count++
        else if(board[i][1] == CROSS)
            hasCross = true;
        else {
            play_i = i; play_j = 1;
        }
    }

    if(count == 2 && !hasCross) {
        playing = 0;
        board[play_i][play_j] = CIRCLE
        return 1;
    }

    count = 0;
    hasCross = false;

    for (let i = 0; i < board.length; i++) {
        if(board[i][2] == CIRCLE)
            count++
        else if(board[i][2] == CROSS)
            hasCross = true;
        else {
            play_i = i; play_j = 2;
        }
    }

    if(count == 2 && !hasCross) {
        playing = 0;
        board[play_i][play_j] = CIRCLE
        return 1;
    }

    count = 0;
    hasCross = false;
    
    return 0;

}


function print () {

   

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            document.getElementById("board"+i+""+j).innerHTML = board[i][j];
        }
        
    }


}