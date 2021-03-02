import { model, graphHandler } from '../index';
import { pathTinting } from '../debugConfig.json';
export default class GhostEnragedStrategy {
    constructor() {
        this.colorMap = new Map([
            ["blue", 0x2659FF],
            ["pink", 0xF597DF],
            ["orange", 0xFEBA4B],
            ["red", 0xFF4848]
        ]);
    }
    calculateAction = (gameElement) => {
        const playerCurrentNodeId = model.player.currentNode.ID;
        if (playerCurrentNodeId) {
            if (gameElement.currentNode.ID) {
                const testPath = graphHandler.calculateShortestPath(gameElement.currentNode.ID, playerCurrentNodeId);
                pathTinting && model.nodes.forEach(node => { //^path tracing
                    if (!testPath) { //TODO: STRANGE BEHAVIOUR? ASK EVGENI
                        gameElement.innerStateMachine.setState("wandering");
                        return gameElement.nextAction;
                    };
                    if (testPath.includes(node.ID)) {
                        node.tint = this.colorMap.get(gameElement.color);
                    } else {
                        node.tint = 0x34612;
                    };
                });
                if (!testPath) return; //TODO: STRANGE BEHAVIOUR? ASK EVGENI
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