import GameUnit from './GameUnit';
export default class Pacman extends GameUnit {
    constructor(unitName) {
        super(unitName);
        this.behaviours = ["player1", "move", "updateInfo"]; 
        this.createInfo(); //^ For coordinates tracking
    };

};