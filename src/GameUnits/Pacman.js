import { PacmanStrategy } from '../UnitStrategies';
import GameUnit from './GameUnit';
export default class Pacman extends GameUnit {
    constructor() {
        const unitName = "pacman";
        super(unitName);
        this.behaviours = ["player1", "move"]; // "updateInfo"
        // this.createInfo(); //^ For coordinates tracking
        this.state = "alive";
        this.colides = {
            "dot":"score",
            "ghost":"die"
            // "ghost": []
        };
        this.strategy = new PacmanStrategy();
        // this.baseSpeed = 0.5;
    };
};