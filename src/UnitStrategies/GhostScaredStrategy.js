import { model, graphHandler } from '../index';
export default class GhostScaredStrategy {
    calculateAction = (gameElement) => {
        const playerCurrentNodeId = model.player.currentNode.ID;
        if (playerCurrentNodeId && gameElement.currentNode.ID) {
            const longestPath = graphHandler.calculateLongestPath(gameElement.currentNode.ID, playerCurrentNodeId);
            if (!longestPath) return;
            const destination = longestPath[1];
            for (let direction in gameElement.currentNode.EDGES) {
                if (gameElement.currentNode.EDGES[direction] === destination) {
                    gameElement.nextAction = 'move' + direction.charAt(0).toUpperCase() + direction.slice(1);
                };
            };

        };

        return gameElement.nextAction;
    };
};