export default class UnitStrategyManager {
    constructor() {
        this.strategyMap = new Map([
            ["pacman", new PacmanNextAction()],
            ["ghost", new GhostNextAction()]
        ]);
    };

    calculateAction = (unitName) => {
        this.strategyMap.get(unitName).calculateAction();
    };

};

class PacmanNextAction {
    calculateAction = () => {

    };
};

class GhostNextAction {
    calculateAction = () => {

    };
};