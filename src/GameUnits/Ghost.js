import DC from '../debugConfig.json'; //^ debug
import Rectangle from '../Rectangle';
import GameUnit from './GameUnit';
export default class Ghost extends GameUnit {
    constructor(unitName, color) {
        super(unitName, color);
        this.behaviours = ["player1", "move"];
    };

};