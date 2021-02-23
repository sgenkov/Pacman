import { model } from '../index';
import DC from '../debugConfig.json'; //^ debug
import Rectangle from '../Rectangle';
import { app2 } from '../index';
import * as PIXI from 'pixi.js'
export default class Ghost {
    constructor(color) { //TODO: Refactor this constructor
        DC.objectsCreation && console.log("Ghost created"); //^ FLOW
        this.name = 'ghost';
        this.color = color;
        this.currentNode = model.defaultLocations[`${color}Ghost`].node;
        // console.log('Ghost current node : ', this.currentNode);
        this.previousNode = null;
        this.radius = 1; 
        this.lastMovementDirection = null;
        this.nextAction = null;
        this.allowedDirections = [];
        this.baseSpeed = 0;
        this.speed = { x: 0, y: 0 };
        this.prevSpeed = this.speed;
        this.behaviours = ["move"];
        this.rect = new Rectangle(this.currentNode.position.x, this.currentNode.position.y, 12, 12);
    };

    createInfo = () => {
        // this.info = new PIXI.Text(`X: ${this.rect.x}, Y: ${this.rect.y}`, { //^ For coordinates tracking
        //     fontSize: 30,
        //     fill: 0xffffff,
        //     align: "left",
        //     stroke: "#cccccc",
        //     strokeThickness: 0,
        // });
        // app2.stage.addChild(this.info);
    }
    updateInfo = (X, Y, additionText = '') => {
        // this.info.text = `X: ${X}, Y: ${Y}` + '\n' + additionText;
    };
};