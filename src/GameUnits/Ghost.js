import GameUnit from './GameUnit';
import { GhostEnragedNextAction, GhostWanderingNextAction } from '../UnitStrategies';
import StateMachine from '../StateMachine';
export default class Ghost extends GameUnit {
    constructor(color) {
        const unitName = "ghost";
        super(unitName, color);
        this.color = color
        this.behaviours = ["move"];
        this.state = "hunter";
        this.strategy = new GhostEnragedNextAction();

        this.states = ["enraged", "wandering"]; //"scared", 
        this.innerStateMachine = new StateMachine({
            enraged: {
                allowedStates: ["wandering", "scared"],
                init: () => {
                    this.state = "enraged";
                    this.strategy = new GhostEnragedNextAction();
                },
                deInit: () => {
                    this.state = null;
                    this.strategy = null;
                },
            },
            wandering: {
                allowedStates: ["enraged", "scared"],
                init: () => {
                    this.state = "wandering";
                    this.strategy = new GhostWanderingNextAction();
                },
                deInit: () => {
                    this.state = null;
                    this.strategy = null;
                },
            },
        },
            "enraged");

        setInterval(() => this.innerStateMachine.setState(this.getNexState()), 10000);

    };

    getNexState = () => {
        this.states.unshift(this.states.pop());
        const NEXT_STATE = this.states[0];
        return NEXT_STATE;
    };

};