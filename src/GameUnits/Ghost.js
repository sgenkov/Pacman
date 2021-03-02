import GameUnit from './GameUnit';
import { GhostEnragedNextAction, GhostWanderingNextAction } from '../UnitStrategies';
export default class Ghost extends GameUnit {
    constructor(color) {
        const unitName = "ghost";
        super(unitName, color);
        this.color = color
        this.behaviours = ["move"];
        this.state = "hunter";
        this.strategy = new GhostEnragedNextAction();

        this.states = ["enraged", "wandering"]; //"scared", 
        setInterval(this.setState, 6000);
    };

    setState = () => {
        this.states.unshift(this.states.pop());
        this.state = this.states[0];
        console.log(this.state);
        this.strategy = null;
        this.strategy = this.state === "enraged"
            ? new GhostEnragedNextAction()
            : new GhostWanderingNextAction();
    };

};