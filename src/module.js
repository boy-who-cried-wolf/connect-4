export class Node {
    constructor(state, player, parent = undefined, children = [], value = undefined) {
        this.state = state
        this.parent = parent
        this.children = children
        this.value = value
        this.player = player
    }
}

export function minimax(node, depth, maxmizingPlayer) { //p1 is maxmizing player
    let value;
    if (depth == 0 || isTerminal(node.state)) {
        node.value = heuristic(node)
        return node.value
    }
    else if (maxmizingPlayer) {
        value = -9999999;
        node.children.forEach(child => {
            value = max(value, minimax(child, depth-1, false))
        });
        node.value = value
        return node.value
    }
    else{
        value = 9999999
        node.children.forEach(child => {
            value = min(value, minimax(child, depth-1, true))
        });
        node.value = value
        return node.value
    }
}

function isTerminal(board) {
    for (const col of board) {
        if (col[0] === 0) {
            return false;
        }
    }
    return true;
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
    let score =calcScore(node.state);
    return (score.p1 - score.p2)
}

const max =(a, b) => a >= b? a:b;
const min =(a, b) => a <= b? a:b;


export function minimaxPruning(node, depth, maxmizingPlayer,alpha = -9999999, beta = 9999999) {
    let value;
    if (depth === 0 || isTerminal(node)) {
        node.value = heuristic(node);
        return node.value
    }
    if (maxmizingPlayer) {
        value = -9999999;
        node.children.forEach(child => {
            value = max(value, minimax(child, depth-1, false, alpha, beta))
            alpha = max( alpha, value)
            if (beta <= alpha){
                node.value = value;
                return node.value
            }
        });
        node.value = value;
        return node.value
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

export function buildTree(node, k) {
    if (k == 0) {
        return node
    }
    node.children = getchildren(node, node.player === 1? 2:1);
    if (node.children.length === 0) {
        return node
    }
    node.children.forEach((child) => {
        (buildTree(child, k-1, child.player === 1? 2:1))
    });
    return node
}

function getchildren(node, nextPlayer) {
    let children = [];
    for (let col = 6; col >= 0; col--) {
        for (let row = 5; row >= 0; row--) {
            if (node.state[col][row] === 0) {
                let newBoard = node.state.map(column => [...column]);
                newBoard[col][row] = node.player;
                children.push(new Node(newBoard, nextPlayer));
                break;
            }
        }
    }
    return children
}

export function nextMove(node){
    for(const child of node.children){
        if (child.value === node.value) {
            return child
        }
    }
}