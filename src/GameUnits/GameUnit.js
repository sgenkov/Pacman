import { model } from '../index';
import DC from '../config/debugConfig.json'; //^ debug
import Rectangle from '../Rectangle';
import { app2 } from '../index';
import * as PIXI from 'pixi.js'
export default class GameUnit {
    constructor(unitName, color) {
        DC.objectsCreation && console.log("Unit created"); //^ FLOW
        this.name = unitName;
        this.currentNode = color? model.defaultLocations[`${color}Ghost`].node : model.defaultLocations[unitName].node;
        this.hitGroup = unitName; //? Obsolete
        this.previousNode = null;
        this.radius = 1;
        this.lastMovementDirection = 'left';
        this.nextAction = null;
        this.allowedDirections = [];
        this.baseSpeed = 0;
        this.speed = { x: 0, y: 0 };
        this.prevSpeed = this.speed;
        this.rect = new Rectangle(this.currentNode.position.x, this.currentNode.position.y, 12, 12);
    };
    nextMove = () => {
        return this.strategy.calculateAction(this);
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
    };
    updateInfo = (X, Y, additionText = '') => {
        this.info.text = `X: ${X}, Y: ${Y}` + '\n' + additionText;
    };
};