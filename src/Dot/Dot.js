import * as PIXI from 'pixi.js';
import { app } from '../index';
export default class Dot {
    constructor(position, type = "small") {
        this.position = position;
        this.radius = (type === "small")
            ? 2
            : 7;
        this.graphic = null;
        this.eaten = false;

        this.draw();
    };

    draw = () => {
        let { graphic, position, radius } = this;
        graphic = new PIXI.Graphics();
        graphic.beginFill(0xFFF748);
        graphic.drawCircle(position.x, position.y, radius);
        graphic.endFill();

        app.stage.addChild(graphic);
        // graphic.ID = el.id;
        // graphic.EDGES = el.edges;
        // model.nodes.push(graphic);
    };


};