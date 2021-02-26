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
        // console.log('Pacman calculateAction()', gameElement.nextAction);
        return gameElement.nextAction;
    };
};

class GhostNextAction {
    calculateAction = (gameElement) => {
        // console.log('Ghost calculateAction()', gameElement.nextAction);
        return gameElement.nextAction;
    };
};