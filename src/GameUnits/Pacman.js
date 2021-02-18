import { model } from '../index';
import DC from '../debugConfig.json'; //^ debug
import Rectangle from '../Rectangle';
import { app2 } from '../index';
import * as PIXI from 'pixi.js'
export default class Pacman {
    constructor() { //TODO: Refactor this constructor
        DC.objectsCreation && console.log("Pacman created"); //^ FLOW
        this.name = 'pacman';
        this.currentNode = model.defaultLocations.pacman.node;
        this.previousNode = null;
        // this.radius = 0; //TODO: replace with rect.width || rect.height ?
        this.lastMovementDirection = null;
        this.baseSpeed = 0;
        this.speed = { x: 0, y: 0 };
        this.prevSpeed = this.speed;
        this.behaviours = ["player1", "move", "updateInfo"]; //* Remove "updateInfo" from behaviours
        this.rect = new Rectangle(this.currentNode.position.x, this.currentNode.position.y, 12, 12);
        this.createInfo(); //^ For coordinates tracking
    };

    createInfo = () => {
        this.info = new PIXI.Text(`X: ${this.rect.x}, Y: ${this.rect.y}`, { //^ For coordinates tracking
            fontSize: 30,
            fill: 0xffffff,
            align: "left",
            stroke: "#cccccc",
            strokeThickness: 0,
        });
        app2.stage.addChild(this.info);
    }
    updateInfo = (XX, YY, additionText = '') => {
        this.info.text = `X: ${XX}, Y: ${YY}` + '\n' + additionText;
    };


};