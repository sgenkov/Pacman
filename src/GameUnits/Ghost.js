import DC from '../debugConfig.json'; //^ debug
import Rectangle from '../Rectangle';
import GameUnit from './GameUnit';
export default class Ghost extends GameUnit {
    constructor(unitName, color) {
        super(unitName, color);
        DC.objectsCreation && console.log("Ghost created"); //^ FLOW
        this.behaviours = ["player1", "move"];
        this.rect = new Rectangle(this.currentNode.position.x, this.currentNode.position.y, 12, 12);
    };

};