import { model, graphHandler } from './index';

export class PacmanAction {
    calculateAction = (gameElement) => {
        return gameElement.nextAction;
    };
};

export class GhostEnragedNextAction {
    calculateAction = (gameElement) => {
        const playerCurrentNodeId = model.player.currentNode.ID;
        if (playerCurrentNodeId) {
            if (gameElement.currentNode.ID) {
                const testPath = graphHandler.calculateShortestPath(gameElement.currentNode.ID, playerCurrentNodeId);
                model.nodes.forEach(node => {
                    node.tint = testPath.includes(node.ID) ? 0xFF6B26 : 0x346123
                });
                const destination = testPath[1];
                for (let direction in gameElement.currentNode.EDGES) {
                    if (gameElement.currentNode.EDGES[direction] === destination) {
                        gameElement.nextAction = 'move' + direction.charAt(0).toUpperCase() + direction.slice(1);
                    };
                };
            };

        };

        return gameElement.nextAction;
    };
};

export class GhostWanderingNextAction {
    calculateAction = (gameElement) => {
        // console.log(gameElement.currentNode.EDGES);
        // let move = testRnd(gameElement);

        // gameElement.nextAction = 'move' + move.charAt(0).toUpperCase() + move.slice(1);

        // return gameElement.nextAction;
        const a = Math.round(Math.random() * 3);
        let action;
        switch (a) {
            case 0:
                action = "moveUp";
                break;
            case 1:
                action = "moveDown";
                break;
            case 2:
                action = "moveLeft";
                break;
            case 3:
                action = "moveRight";
                break;
            default:
                action = "moveUp";
        };
        return action;
    };
};

const testRnd = (gameElement) => {
    console.log(gameElement);
    let move;
    for (let direction in gameElement.currentNode.EDGES) {
        // console.log(direction);
        if (Math.random() * 3 > 2) {
            move = direction;
        };
    };

    if (!move) {
        move = testRnd();
    } else {
        return move;
    }
};