import GameUnit from './GameUnit';
import { GhostEnragedStrategy, GhostWanderingStrategy, GhostScaredStrategy, GhostEatenStrategy } from '../UnitStrategies';
import StateMachine from '../StateMachine';
import { binaryReprezentation } from '../Utils/utils';
export default class Ghost extends GameUnit {
    constructor(color) {
        const unitName = "ghost";
        super(unitName, color);
        this.color = color;
        this.behaviours = ["move"];
        this.state = null;
        this.strategy = null;
        this.colides = null;
        this.eaten = null;

        this.states = ["enraged", "wandering"];//, "wandering"

        this.innerStateMachine = new StateMachine({
            enraged: {
                allowedStates: ["wandering", "scared"],
                init: () => {
                    this.state = "enraged";
                    this.colides = {
                        "pacman": "nullBehaviour"
                    };
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
                    this.colides = {
                        "pacman": "nullBehaviour"
                    };
                    this.strategy = new GhostWanderingStrategy();
                },
                deInit: () => {
                    this.state = null;
                    this.strategy = null;
                },
            },
            scared: {
                allowedStates: ["enraged", "wandering", "eaten"],
                init: () => {
                    this.state = "scared";
                    this.colides = {
                        "pacman": "backToBase"
                    };
                    this.strategy = new GhostScaredStrategy(this.color);
                },
                deInit: () => {
                    this.state = null;
                    this.strategy = null;
                },
            },
            eaten: {
                allowedStates: ["wandering"],
                init: () => {
                    this.state = "eaten";
                    this.colides = {
                        "pacman": "nullBehaviour"
                    };
                    this.strategy = new GhostEatenStrategy();
                },
                deInit: () => {
                    this.state = null;
                    this.strategy = null;
                },
            }
        },
            "wandering"); // default "wandering"

        // this.addEventListener("testEvent", (event) => { console.log(event) });
        // setInterval(() => this.innerStateMachine.setState(this.getNextState()), 5000);

    };

    getNextState = () => {
        const NEXT_STATE = this.states[0];
        this.states.push(this.states.shift());
        return NEXT_STATE;
    };
    deInit = () => {//* Not used
        // this.removeEventListener("testEvent", (event) => { console.log(event) });
    }

};