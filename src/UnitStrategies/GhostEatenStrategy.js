import { model, graphHandler } from '../index';
import { pathTinting } from '../config/debugConfig.json';
import { ghostsEatenNodes } from '../config/scene.json';
import { directionsMapping } from '../Utils/utils';
export default class GhostEatenStrategy {
    constructor() {
        this.colorMap = new Map([
            ["blue", 0x2659FF],
            ["pink", 0xF597DF],
            ["orange", 0xFEBA4B],
            ["red", 0xFF4848]
        ]);
    }
    calculateAction = (gameElement) => {
        const currentTimer = model.loopCounter.find(counter => counter.owner === gameElement.color);
        // console.log(currentTimer);
        currentTimer.state = "inactive";
        const destinationNode = ghostsEatenNodes[gameElement.color + "Ghost"]
        if (destinationNode && gameElement.currentNode.ID) {
            const shortestPath = graphHandler.calculateShortestPath(gameElement.currentNode.ID, destinationNode)?.map(el => +el);
            model.nodes.forEach(node => { 
                if (!shortestPath) { 
                    gameElement.innerStateMachine.setState("wandering");
                    currentTimer.state = "active";
                    return gameElement.nextAction; 
                };
                if (pathTinting) { //^path tracing
                    if (shortestPath.includes(node.ID)) {
                        node.tint = this.colorMap.get(gameElement.color);
                    } else {
                        node.tint = 0x34612;
                    };
                };

            });
            if (!shortestPath) return;
            const destination = shortestPath[1];
            for (let direction in gameElement.currentNode.EDGES) {
                if (gameElement.currentNode.EDGES[direction] === destination) {
                    // gameElement.nextAction = 'move' + direction.charAt(0).toUpperCase() + direction.slice(1);
                    gameElement.nextAction = directionsMapping.get(direction);
                };
            };

        };
        // console.log(gameElement.nextAction);

        return gameElement.nextAction;
    };
};