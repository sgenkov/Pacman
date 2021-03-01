import GameUnit from './GameUnit';
export default class Ghost extends GameUnit {
    constructor(color) {
        const unitName = "ghost";
        super(unitName, color);
        this.color = color
        this.behaviours = ["move"];
    };

};