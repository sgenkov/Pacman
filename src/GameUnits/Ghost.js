import GameUnit from './GameUnit';
export default class Ghost extends GameUnit {
    constructor(unitName, color) {
        super(unitName, color);
        this.behaviours = ["move"];
    };

};