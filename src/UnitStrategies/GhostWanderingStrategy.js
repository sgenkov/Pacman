import { model } from '../index';
import { pathTinting } from '../debugConfig.json';
export default class GhostWanderingStrategy {
    calculateAction = (gameElement) => {
        gameElement.nextAction = [
            "moveDown",
            "moveLeft",
            "moveRight",
            "moveUp",
        ][Math.floor(Math.random() * 4)]
        pathTinting && model.nodes.forEach(node => node.tint = 0x34612);
        return gameElement.nextAction;
    };
};