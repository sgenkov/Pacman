import { model, graphHandler } from '../index';
export default class GhostScaredStrategy {
    constructor(color) {
        this.currentTimer = model.loopCounter.find(counter => counter.owner === color);
        this.currentTimer.reset();
    };
    calculateAction = (gameElement) => { //*Likely stupid ghosts V
        // const playerCurrentNodeId = model.player.currentNode.ID;
        // if (playerCurrentNodeId && gameElement.currentNode.ID) {
        //     const longestPath = graphHandler.calculateLongestPath(gameElement.currentNode.ID, playerCurrentNodeId);
        //     if (!longestPath) {
        //         // currentTimer.state = "active";
        //         return;
        //     };
        //     const destination = longestPath[1];
        //     for (let direction in gameElement.currentNode.EDGES) {
        //         if (gameElement.currentNode.EDGES[direction] === destination) {
        //             gameElement.nextAction = 'move' + direction.charAt(0).toUpperCase() + direction.slice(1);
        //         };
        //     };

        // };
        // return gameElement.nextAction;

        const playerCurrentNodeId = model.player.currentNode.ID;
        const possibleActions = [];
        for (const edge in gameElement.currentNode.EDGES) {
            const res = {
                direction: edge,
                cost: graphHandler.calculateShortestPath(playerCurrentNodeId, gameElement.currentNode.EDGES[edge], true).cost
            };
            possibleActions.push(res);
        };
        possibleActions.sort((el1, el2) => el2.cost - el1.cost); 
        gameElement.nextAction = 'move' + possibleActions[0].direction.charAt(0).toUpperCase() + possibleActions[0].direction.slice(1);

        return gameElement.nextAction;
    };
};