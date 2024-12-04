class node {
    constructor(state, parent, children, value) {
        this.state = state
        this.parent = parent
        this.children = children
        this.value = value
    }
}

function minimax(node, depth, maxmizingPlayer) {
    let value;
    if (depth === 0 || isTerminal(node.state)) {
        return heuristic(node)
    }
    if (maxmizingPlayer) {
        value = -9999999;
        node.children.forEach(child => {
            value = max(value, minimax(child, depth-1, false))
        });
        return value
    }
    else{
        value = 9999999
        node.children.forEach(child => {
            value = min(value, minimax(child, depth-1, true))
        });
        return value
    }
}

function isTerminal(board){
    board.forEach((col) =>{
        if (col[0] === 0) {
            return false
        }
    })
    return true
}

export const firstState = Array(7).fill().map(() => Array(6).fill(0))

export function calcScore(board) {
    const numRows = board[0].length;
    const numCols = board.length;
    let score = {p1:0, p2:0}
    let line;
    const checkLine = (cells) => {
        if (cells.every(cell => cell === 1)){
            score.p1 ++
        }
        else if (cells.every(cell => cell === 2)){
            score.p2 ++
        }
      }

    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numCols; row++) {
            if (col+3 < numCols) { // down
                line = [board[col][row], board[col + 1][row], board[col + 2][row], board[col + 3][row]];
                checkLine(line);
            }
            if (row+3 < numRows) { // right
                line = [board[col][row], board[col][row + 1], board[col][row + 2], board[col][row + 3]];
                checkLine(line);
            }
            if ((col+3 < numCols)&(row+3 < numRows)) { // down right
                line = [board[col][row], board[col+1][row+1], board[col+2][row+2], board[col+3][row+3]];
                checkLine(line);
            }
            if ((col -3 >= 0)& (row+3 < numRows)) { //down left
                line = [board[col][row], board[col-1][row+1], board[col-2][row+2], board[col-3][row+3]];
                checkLine(line);
            }
        }
        
    }
    return score
}

function heuristic(node) {
}

const max =(a, b) => a >= b? a:b;
const min =(a, b) => a <= b? a:b;


function minimaxPruning(node, depth, maxmizingPlayer,alpha = -9999999, beta = 9999999) {
    let value;
    if (depth === 0 || isTerminal(node)) {
        return heuristic(node)
    }
    if (maxmizingPlayer) {
        value = -9999999;
        node.children.forEach(child => {
            value = max(value, minimax(child, depth-1, false, alpha, beta))
            alpha = max( alpha, value)
            if (beta <= alpha){
                return value
            }
        });
        return value
    }
    else{
        value = 9999999
        node.children.forEach(child => {
            value = min(value, minimax(child, depth-1, true))
            alpha = max( alpha, value)
            if (beta <= alpha){
                return value
            }
        });
        return value
    }
}