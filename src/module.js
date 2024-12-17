const weightMatrix = [
    [3, 4, 5, 7, 5, 4, 3],
    [4, 6, 8, 10, 8, 6, 4],
    [5, 8, 11, 13, 11, 8, 5],
    [5, 8, 11, 13, 11, 8, 5],
    [4, 6, 8, 10, 8, 6, 4],
    [3, 4, 5, 7, 5, 4, 3],
];
export class Node {
    constructor(state, player, parent = undefined, children = [], value = undefined) {
        this.state = state
        this.parent = parent
        this.children = children
        this.value = value
        this.player = player
    }
}

export function minimax(node, depth, maximizingPlayer) { //p1 is maximizing player
    let value;
    if (depth === 0 || isTerminal(node.state)) {
        node.value = heuristic(node)
        return node.value
    }
    else if (maximizingPlayer) {
        value = -Infinity;
        node.children.forEach(child => {
            value = Math.max(value, minimax(child, depth-1, false))
        });
        node.value = value
        return node.value
    }
    else {
        value = Infinity
        node.children.forEach(child => {
            value = Math.min(value, minimax(child, depth-1, true))
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
            if ((col+3 < numCols) && (row+3 < numRows)) { // down right
                line = [board[col][row], board[col+1][row+1], board[col+2][row+2], board[col+3][row+3]];
                checkLine(line);
            }
            if ((col -3 >= 0) && (row+3 < numRows)) { //down left
                line = [board[col][row], board[col-1][row+1], board[col-2][row+2], board[col-3][row+3]];
                checkLine(line);
            }
        }

    }
    return score
}
export function calculateHeuristic(board) {
    const numRows = board[0].length;
    const numCols = board.length;
    let score = { p1_two: 0, p1_three: 0, p1_four: 0, p2_two: 0, p2_three: 0, p2_four: 0 };

    const checkLine = (cells) => {
        const p1Count = cells.filter(cell => cell === 1).length;
        const p2Count = cells.filter(cell => cell === 2).length;

        if (p1Count > 0 && p2Count === 0) {
            if (p1Count === 2) score.p1_two++;
            else if (p1Count === 3) score.p1_three++;
            else if (p1Count === 4) score.p1_four++;
        } else if (p2Count > 0 && p1Count === 0) {
            if (p2Count === 2) score.p2_two++;
            else if (p2Count === 3) score.p2_three++;
            else if (p2Count === 4) score.p2_four++;
        }
    };

    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numRows; row++) {
            // vertical check
            if (row + 3 < numRows) checkLine([board[col][row], board[col][row + 1], board[col][row + 2], board[col][row + 3]]);
            // horizontal check
            if (col + 3 < numCols) checkLine([board[col][row], board[col + 1][row], board[col + 2][row], board[col + 3][row]]);
            // diagonal down right
            if (col + 3 < numCols && row + 3 < numRows) checkLine([board[col][row], board[col + 1][row + 1], board[col + 2][row + 2], board[col + 3][row + 3]]);
            // diagonal left down
            if (col - 3 >= 0 && row + 3 < numRows) checkLine([board[col][row], board[col - 1][row + 1], board[col - 2][row + 2], board[col - 3][row + 3]]);
        }
    }
    return score;
}

function heuristic(node) {
    const score = calculateHeuristic(node.state);
    const blockingPenalty =
        500 * score.p2_three +
        2000 * score.p2_four;

    const ownPotential =
        50 * score.p1_two +
        200 * score.p1_three +
        1000 * score.p1_four;

    const positional =
        positionalScore(node.state, 1, weightMatrix) - positionalScore(node.state, 2, weightMatrix);
    return ownPotential - blockingPenalty + positional;
}

function positionalScore(board, player, weightMatrix) {
    let score = 0;
    for (let col = 0; col < board.length; col++) {
        for (let row = 0; row < board[col].length; row++) {
            if (board[col][row] === player) {
                score += weightMatrix[row][col];
            }
        }
    }
    return score;
}


export function minimaxPruning(node, depth, maximizingPlayer, alpha = -Infinity, beta = Infinity) {
    let value;
    if (depth === 0 || isTerminal(node.state)) {
        node.value = heuristic(node);
        return node.value
    }
    if (maximizingPlayer) {
        value = -Infinity;
        node.children.forEach(child => {
            value = Math.max(value, minimax(child, depth-1, false, alpha, beta))
            alpha = Math.max(alpha, value)
            if (beta <= alpha){
                node.value = value;
                return node.value
            }
        });
        node.value = value;
        return node.value
    }
    else{
        value = Infinity
        node.children.forEach(child => {
            value = Math.min(value, minimax(child, depth-1, true))
            alpha = Math.max(alpha, value)
            if (beta <= alpha){
                node.value = value;
                return value
            }
        });
        node.value = value;
        return value
    }
}

export function buildTree(node, k) {
    if (k === 0) {
        return node
    }
    node.children = getChildren(node, node.player === 1? 2:1);
    if (node.children.length === 0) {
        return node
    }
    node.children.forEach((child) => {
        (buildTree(child, k-1, child.player === 1? 2:1))
    });
    return node
}

function getChildren(node, nextPlayer) {
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