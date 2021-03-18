import { model, graphHandler } from '../index';
import { pathTinting } from '../config/debugConfig.json';
import { directionsMapping } from '../Utils/utils';
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
        if (playerCurrentNodeId && gameElement.currentNode.ID) {
                const shortestPath = graphHandler.calculateShortestPath(gameElement.currentNode.ID, playerCurrentNodeId)?.map(el => +el);
                pathTinting && model.nodes.forEach(node => { //^path tracing
                    if (!shortestPath) { 
                        gameElement.innerStateMachine.setState("wandering");
                        return gameElement.nextAction; 
                    };
                    if (shortestPath.includes(node.ID)) {
                        node.tint = this.colorMap.get(gameElement.color);
                    } else {
                        node.tint = 0x34612;
                    };
                });
                if (!shortestPath) return; 
                const destination = shortestPath[1];
                for (let direction in gameElement.currentNode.EDGES) {
                    if (gameElement.currentNode.EDGES[direction] === destination) {
                        // gameElement.nextAction = 'move' + direction.charAt(0).toUpperCase() + direction.slice(1); //TODO: Use mapping here
                        // console.log(direction);
                        gameElement.nextAction = directionsMapping.get(direction);
                    };
            };

        };

        return gameElement.nextAction;
    };
};