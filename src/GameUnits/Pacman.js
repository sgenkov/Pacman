import StateMachine from '../StateMachine';
import { PacmanStrategy } from '../UnitStrategies';
import GameUnit from './GameUnit';
export default class Pacman extends GameUnit {
    constructor() {
        const unitName = "pacman";
        super(unitName);
        this.behaviours = ["player1", "move"]; // "updateInfo"
        // this.createInfo(); //^ For coordinates tracking
        // this.state = "alive";
        // this.colides = {
        //     "dot": "score",
        //     "ghost": "die"
        //     // "ghost": []
        // };
        this.strategy = new PacmanStrategy();
        // this.baseSpeed = 0.5;
        this.innerStateMachine = new StateMachine({
            normal: {
                allowedStates: ["fast", "caught"],
                init: () => {
                    this.state = "normal";
                    this.colides = {
                        "dot": "score",
                        "ghost": "die"
                    };
                    this.strategy = new PacmanStrategy();
                    this.baseSpeed = 0.2;
                },
                deInit: () => {
                    this.state = null;
                    this.strategy = null;
                    this.colides = null;
                },
            },
            fast: {
                allowedStates: ["normal", "caught"],
                init: () => {
                    this.state = "fast";
                    this.colides = {
                        "dot": "score",
                        "ghost": "die"
                    };
                    this.strategy = new PacmanStrategy();
                    this.baseSpeed = 0.5;
                },
                deInit: () => {
                    this.state = null;
                    this.strategy = null;
                    this.colides = null;
                }
            },
            caught: {
                allowedStates: ["fast", "caught", "normal"], //* Think about allowed states
                init: () => {

                },
                deInit: () => {

                }
            }
        },
            "normal");
    };
};