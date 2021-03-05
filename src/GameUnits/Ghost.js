import GameUnit from './GameUnit';
import { GhostEnragedStrategy, GhostWanderingStrategy, GhostScaredStrategy } from '../UnitStrategies';
import StateMachine from '../StateMachine';
export default class Ghost extends GameUnit {
    constructor(color) {
        const unitName = "ghost";
        super(unitName, color);
        this.color = color;
        this.behaviours = ["move"];
        this.state = null;
        this.strategy = null;

        this.states = ["enraged", "scared", "wandering"];//, "wandering"

        this.innerStateMachine = new StateMachine({
            enraged: {
                allowedStates: ["wandering", "scared"],
                init: () => {
                    this.state = "enraged";
                    this.strategy = new GhostEnragedStrategy();
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
                    this.strategy = new GhostWanderingStrategy();
                },
                deInit: () => {
                    this.state = null;
                    this.strategy = null;
                },
            },
            scared: {
                allowedStates: ["enraged", "wandering"],
                init: () => {
                    this.state = "scared";
                    this.strategy = new GhostScaredStrategy();
                },
                deInit: () => {
                    this.state = null;
                    this.strategy = null;
                },
            }
        },
            "wandering");

        // this.addEventListener("testEvent", (event) => { console.log(event) });
        setInterval(() => this.innerStateMachine.setState(this.getNextState()), 5000);

    };

    getNextState = () => {
        this.states.unshift(this.states.pop());
        const NEXT_STATE = this.states[0];
        // console.log(NEXT_STATE); 
        return NEXT_STATE;
    };
    deInit = () => {
        // this.removeEventListener("testEvent", (event) => { console.log(event) });
    }

};