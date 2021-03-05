import { model, graphHandler } from '../index';
export default class GhostScaredStrategy {
    calculateAction = (gameElement) => {
        const playerCurrentNodeId = model.player.currentNode.ID;
        gameElement.nextAction = [
            "moveDown",
            "moveLeft",
            "moveRight",
            "moveUp",
        ][Math.floor(Math.random() * 4)]
        
        
        return gameElement.nextAction;
    };
};