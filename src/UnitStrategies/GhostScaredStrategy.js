import { model, graphHandler } from '../index';
export default class GhostScaredStrategy {
    constructor(color) {
        this.currentTimer = model.loopCounter.find(counter => counter.owner === color);
        this.currentTimer.reset();
    };
    calculateAction = (gameElement) => {
        const playerCurrentNodeId = model.player.currentNode.ID;
        
        if (playerCurrentNodeId && gameElement.currentNode.ID) {
            const longestPath = graphHandler.calculateLongestPath(gameElement.currentNode.ID, playerCurrentNodeId);
            if (!longestPath) {
                // currentTimer.state = "active";
                return;
            };
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