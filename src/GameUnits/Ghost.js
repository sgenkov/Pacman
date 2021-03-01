import GameUnit from './GameUnit';
export default class Ghost extends GameUnit {
    constructor(color) {
        const unitName = "ghost";
        super(unitName, color);
        this.color = color
        // console.log(this.currentNode);
        this.behaviours = ["move"];
    };

};