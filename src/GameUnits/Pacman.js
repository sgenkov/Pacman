import DC from '../debugConfig.json'; //^ debug
import Rectangle from '../Rectangle';
import GameUnit from './GameUnit';
export default class Pacman extends GameUnit {
    constructor(unitName) {
        super(unitName);
        DC.objectsCreation && console.log("Pacman created"); //^ FLOW
        this.behaviours = ["player1", "move", "updateInfo"]; 
        this.rect = new Rectangle(this.currentNode.position.x, this.currentNode.position.y, 12, 12);
        this.createInfo(); //^ For coordinates tracking
    };

};