import { model, graphHandler } from './index';
export default class UnitStrategyManager {
    constructor() {
        this.strategyMap = new Map([
            ["pacman", new PacmanNextAction()],
            ["ghost", new GhostNextAction()]
        ]);
    };

    calculateAction = (gameElement) => {
        return this.strategyMap.get(gameElement.name).calculateAction(gameElement);
    };

};

class PacmanNextAction {
    calculateAction = (gameElement) => {
        // console.log('Pacman move');
        // console.log('Pacman calculateAction()', gameElement.nextAction);
        return gameElement.nextAction;
    };
};

class GhostNextAction {
    calculateAction = (gameElement) => {
        const playerCurrentNode = model.player.currentNode.ID;
        if (playerCurrentNode) {
            if (gameElement.currentNode.ID) {
                const testPath = graphHandler.calculateShortestPath(gameElement.currentNode.ID, playerCurrentNode);
                model.nodes.forEach(node => {
                    node.tint = testPath.includes(node.ID) ? 0xFF6B26 : 0x346123
                });
                const destination = testPath[1];
                for (let direction in gameElement.currentNode.EDGES) {
                    if(gameElement.currentNode.EDGES[direction] === destination) {
                        gameElement.nextAction = 'move' + direction.charAt(0).toUpperCase() + direction.slice(1);
                    };
                };
            };

        };

        // console.log(gameElement.nextAction);
        return gameElement.nextAction;
        // return 'moveDown'
    };
};