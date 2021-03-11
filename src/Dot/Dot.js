import * as PIXI from 'pixi.js';
import { app } from '../index';
import Rectangle from '../Rectangle';
export default class Dot {
    constructor(position, type = "small") {
        this.name = "dot";
        this.type = type;
        this.speed = { x: 0, y: 0 };
        this.position = position;
        this.radius = (type === "small")
            ? 2
            : 7;
        this.eaten = false;
        this.rect = new Rectangle(this.position.x, this.position.y, 12, 12);
        this.behaviours = [];
        // this.draw(); 
    };

    draw = () => { //? Obsolete?
        let { position, radius } = this;
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(0xFFF748);
        this.graphic.drawCircle(position.x, position.y, radius);
        this.graphic.endFill();
        app.stage.addChild(this.graphic);
    };


};