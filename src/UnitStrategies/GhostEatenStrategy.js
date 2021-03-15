import { model, graphHandler } from '../index';
import { pathTinting } from '../config/debugConfig.json';
import { startingNodes as ghostsEatenNodes } from '../config/scene.json';
export default class GhostEatenStrategy {
    constructor() {
        console.log('NEW EATEN STRATEGY');
        this.colorMap = new Map([
            ["blue", 0x2659FF],
            ["pink", 0xF597DF],
            ["orange", 0xFEBA4B],
            ["red", 0xFF4848]
        ]);
    }
    calculateAction = (gameElement) => {
        // const a = gameElement.color + "Ghost";
        // const b = startingNodes[a];
        const destinationNode = ghostsEatenNodes[gameElement.color + "Ghost"]
        console.log(destinationNode);
        if (destinationNode && gameElement.currentNode.ID) {
                const shortestPath = graphHandler.calculateShortestPath(gameElement.currentNode.ID, destinationNode);
                pathTinting && model.nodes.forEach(node => { //^path tracing
                    if (!shortestPath) { //TODO: STRANGE BEHAVIOUR? ASK Evgeni 
                        gameElement.innerStateMachine.setState("wandering");
                        return gameElement.nextAction; //TODO: Ask Evgeni why this return doesn't terminate the function
                    };
                    if (shortestPath.includes(node.ID)) {
                        node.tint = this.colorMap.get(gameElement.color);
                    } else {
                        node.tint = 0x34612;
                    };
                });
                if (!shortestPath) return; //TODO: STRANGE BEHAVIOUR? ASK Evgeni
                const destination = shortestPath[1];
                for (let direction in gameElement.currentNode.EDGES) {
                    if (gameElement.currentNode.EDGES[direction] === destination) {
                        gameElement.nextAction = 'move' + direction.charAt(0).toUpperCase() + direction.slice(1);
                    };
            };

        };

        return gameElement.nextAction;
    };
};