const evaluateMove = (move, penambah = 0) => {
    let sum = 0;

    if ('remove' in move) {
        if (move["removePiece"][1].toLowerCase() == "p") sum += 20 + penambah;
        else sum += 60 + penambah;
    }

    if ('promote' in move) sum += 40;

    const centerSquares = ["d4", "d5", "e4", "e5"];
    if (centerSquares.includes(move.to)) sum += 10;

    if ('nextEat' in move) {
        sum += evaluateMove(move.nextEat);
    }

    return sum;
};

const dynamicDepth = (numMoves) => {
    if (numMoves > 15) return 3;
    if (numMoves > 5) return 5;
    return 7;
};

const minmaxCache = new Map();

const minmax = (position, depth, alpha, beta, isMaximizingPlayer, sum, turn, color) => {
    jumlahNode++;

    const positionKey = JSON.stringify({ position, depth, isMaximizingPlayer });
    if (minmaxCache.has(positionKey)) {
        return minmaxCache.get(positionKey);
    }

    let moves = getAllMoves(turn, position).reduce((arr, m) => {
        spreadNextEat(m).forEach(m2 => arr.push(m2));
        return arr;
    }, []);

    const adjustedDepth = dynamicDepth(moves.length);

    moves.sort(() => Math.random() - Math.random());

    if (adjustedDepth === 0 || moves.length === 0) {
        const result = [null, sum];
        minmaxCache.set(positionKey, result);
        return result;
    }

    let maxValue = Number.NEGATIVE_INFINITY;
    let minValue = Number.POSITIVE_INFINITY;
    let bestMove;

    for (let i = 0; i < moves.length; i++) {
        let move = moves[i];
        let newSum;
        let newPos = position;
        let newMove = { ...move };
        let newTurn;

        while ("nextEat" in newMove) {
            newPos = movePiece(newMove, newPos);
            newMove = newMove.nextEat;
        }

        newPos = movePiece(newMove, newPos);

        if (turn === color) {
            newSum = sum + evaluateMove(move, depth);
        } else {
            newSum = sum - evaluateMove(move, depth);
        }

        newTurn = turn === "white" ? "black" : "white";

        const [childBestMove, childValue] = minmax(newPos, adjustedDepth - 1, alpha, beta, !isMaximizingPlayer, newSum, newTurn, color);

        if (isMaximizingPlayer) {
            if (childValue > maxValue) {
                maxValue = childValue;
                bestMove = move;
            }
            alpha = Math.max(alpha, maxValue);
        } else {
            if (childValue < minValue) {
                minValue = childValue;
                bestMove = move;
            }
            beta = Math.min(beta, minValue);
        }

        if (alpha >= beta) break;
    }

    const result = isMaximizingPlayer ? [bestMove, maxValue] : [bestMove, minValue];
    minmaxCache.set(positionKey, result);
    return result;
};