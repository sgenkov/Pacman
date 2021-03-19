import { model, graphHandler } from '../index';
import { directionsMapping } from '../Utils/utils';
export default class GhostScaredStrategy {
    constructor(color) {
        this.currentTimer = model.loopCounter.find(counter => counter.owner === color);
        this.currentTimer.reset();
    };
    calculateAction = (gameElement) => {
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
        gameElement.nextAction = directionsMapping.get(possibleActions[0].direction);

        return gameElement.nextAction;
    };
};