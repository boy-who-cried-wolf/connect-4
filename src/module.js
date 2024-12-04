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