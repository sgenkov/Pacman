import scene from './config/scene.json';
import * as PIXI from 'pixi.js';
import { app2 } from '.';

export default class Model extends EventTarget {
    constructor() {
        super();
        this.ASSETS_LOADED = false;
        this.gameElements = [];
        this.score = 0;
        this.nodes = [];
        this.player = null;
        this.ghosts = [];
        // this.value = 666;
        this.loopCounter = [
            {
                owner: "red",
                value: 0,
                state: "active",
                reset: this.reset
            },
            {
                owner: "blue",
                value: 0,
                state: "active",
                reset: this.reset
            },
            {
                owner: "pink",
                value: 0,
                state: "active",
                reset: this.reset
            },
            {
                owner: "orange",
                value: 0,
                state: "active",
                reset: this.reset
            },
            {
                owner: "pacman",
                value: 0,
                state: "inactive",
                reset: this.reset,
                actions: [
                    () => {
                        // console.log(`pacman action from looper: state : ${this.state}`);
                    }
                ]
            },
        ];
        this.defaultLocations = {
            pacman: { node: this.calculatePosition('pacman') },
            blueGhost: { node: this.calculatePosition('blueGhost') },
            orangeGhost: { node: this.calculatePosition('orangeGhost') },
            pinkGhost: { node: this.calculatePosition('pinkGhost') },
            redGhost: { node: this.calculatePosition('redGhost') }
        };
        this.createInfo();
    };
    reset = function () {
        // console.log('reset');
        this.value = 0;
    };
    loopUpdate = () => {
        this.loopCounter.forEach(currentCounter => {
            (currentCounter.state === "active") && (currentCounter.value++);
            currentCounter.actions && currentCounter.actions.forEach(action => action());
        });
    }

    assignPlayer = (unit) => {
        this.gameElements.push(unit);
        this.player = unit;
    };

    assignGhost = (unit) => {
        this.gameElements.push(unit);
        this.ghosts.push(unit);
    };

    emplaceDots = (dots) => {
        // this.dots = dots;
        dots.forEach(dot => this.gameElements.push(dot));
        // this.gameElements = [...this.gameElements, ...dots];
    };
    calculatePosition = (name) => {
        const found = scene.map.find(node => node.id === scene.startingNodes[name]);
        return found;
    };

    updateScoreInfo = () => {
        this.info.text = `Score: ${this.score}`;
    };

    createInfo = () => {
        this.info = new PIXI.Text(`Score: ${this.score}`, { //^ For coordinates tracking
            fontSize: 30,
            fill: 0xffffff,
            align: "left",
            stroke: "#cccccc",
            strokeThickness: 0,
        });
        app2.stage.addChild(this.info);
    };
};