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
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                gameElement.nextAction = "moveUp";
                break;
            case 1:
                gameElement.nextAction = "moveDown";
                break;
            case 2:
                gameElement.nextAction = "moveLeft";
                break;
            case 3:
                gameElement.nextAction = "moveRight";
                break;
            default:
                gameElement.nextAction = "moveUp";
        };
        return gameElement.nextAction;
    };
};
