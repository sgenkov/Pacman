import * as PIXI from 'pixi.js';
import { app } from '../index';
import Rectangle from '../Rectangle';
export default class Dot {
    constructor(position, type = "small") {
        this.name = "dot";
        this.type = type;
        this.position = position;
        this.radius = (type === "small")
            ? 2
            : 7;
        // this.graphic = {};
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
        // graphic.ID = el.id;
        // graphic.EDGES = el.edges;
        // model.nodes.push(graphic);
    };


};