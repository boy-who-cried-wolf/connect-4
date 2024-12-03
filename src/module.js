function minimax(node, depth, maxmizingPlayer) {
    let value;
    if (depth === 0 || isTerminal(node)) {
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

function isTerminal(){}

function heuristic(node) {
}

const max =(a, b) => a >= b? a:b;
const min =(a, b) => a <= b? a:b;
