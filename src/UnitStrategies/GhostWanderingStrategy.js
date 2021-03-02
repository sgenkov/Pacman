export default class GhostWanderingStrategy {
    calculateAction = (gameElement) => {
        gameElement.nextAction = [
            "moveDown",
            "moveLeft",
            "moveRight",
            "moveUp",
        ][Math.floor(Math.random() * 4)]
        return gameElement.nextAction;
    };
};