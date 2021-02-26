import GameUnit from './GameUnit';
export default class Ghost extends GameUnit {
    constructor(color) {
        const unitName = "ghost";
        super(unitName, color);
        this.behaviours = ["move"];
    };

};