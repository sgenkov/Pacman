import { model, graphHandler } from '../index';
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
        console.log(gameElement.color);
        const playerCurrentNodeId = model.player.currentNode.ID;
        if (playerCurrentNodeId) {
            if (gameElement.currentNode.ID) {
                const testPath = graphHandler.calculateShortestPath(gameElement.currentNode.ID, playerCurrentNodeId);
                model.nodes.forEach(node => {
                    // node.tint = testPath.includes(node.ID) ? this.colorMap.get(gameElement.color) : 0x346123;

                    if (testPath.includes(node.ID)) {
                        
                        node.tint = this.colorMap.get(gameElement.color);
                    } else {
                        node.tint = 0x34612;
                    };
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