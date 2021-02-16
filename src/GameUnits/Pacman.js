import { app, model } from '../index';
import DC from '../debugConfig.json'; //^ debug
import Rectangle from '../Rectangle';
import {app2} from '../index';
import * as PIXI from 'pixi.js'
export default class Pacman {
    constructor() { //TODO: Refactor this constructor
        DC.objectsCreation && console.log("Pacman created"); //^ FLOW
        this.name = 'pacman';
        this.currentVertex = model.defaultLocations.pacman.vertex;
        this.previousVertex = null;
        this.radius = 7; //TODO: replace with rect.width || rect.height ?
        // console.log('Pacman.js - this.currentVertex ', this.currentVertex);
        this.allowedDirections = Object.keys(this.currentVertex.edges);
        // this.allowedVertices = this.currentVertex.edges;
        // console.log(this.allowedVertices);
        this.baseSpeed = 1;
        this.speed = { x: 0, y: 0 };
        this.prevSpeed = this.speed;
        this.behaviours = ["player1", "move", "updateInfo"];
        this.rect = new Rectangle(this.currentVertex.position.x, this.currentVertex.position.y, 15, 15);
        this.createInfo(); //^ For coordinates tracking
    };

    set allowedDirections(directions) {
        this._allowedDirections = [...directions];
    };
    get allowedDirections() {
        return this._allowedDirections;
    }

    createInfo = () => {
        this.info = new PIXI.Text(`X: ${this.rect.x}, Y: ${this.rect.y}`, { //^ For coordinates tracking
            fontSize: 30,
            fill: 0xffffff,
            align: "center",
            stroke: "#cccccc",
            strokeThickness: 0,
        });
        app2.stage.addChild(this.info);
    }
    updateInfo = () => {
        this.info.text = `X: ${this.rect.x}, Y: ${this.rect.y}`;
    };

    
};