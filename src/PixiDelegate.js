import { colide } from "./Utils/utils";
import GraphicElement from './GraphicElement';
export default class PixiDelegate {
    constructor(app, size) {
        this.app = app;
        this.size = size;
        this.isInRangeBypass = false; //* Delete this later
        this.graphics = [];
    };

    createElement = (el) => {


        let graphic = new GraphicElement(el);
        graphic.sheet.scale.x = graphic.sheet.REVERSE ? -2 : 2;
        graphic.sheet.scale.y = 2;
        graphic.sheet.PREV_SPEED = el.prevSpeed;
        graphic.sheet.SPEED = el.speed;
        graphic.state = el.state;
        this.graphics.push(graphic);
        return graphic.sheet;
    }

    getGraphic = (el) => {
        this.app.stage.removeChild(el.GRAPHIC); //TODO: Ask Evgeni for this solution
        let {
            graphics,
            createElement,
            app: {
                stage,
            }
        } = this;

        let graphic;
        const foundIndex = graphics.findIndex(g => {
            // console.log(el.state);
            return (
                (g.name === el.name)
                && (g.color === el.color)
                && (g.LAST_MOVEMENT_DIRECTION === el.lastMovementDirection)
                && (g.state === el.state)
                );
        });

        if (graphics.length == 0 || foundIndex === -1) {
            graphic = createElement(el);
        } else {
            graphic = graphics[foundIndex].sheet;
        };

        stage.addChild(graphic);
        graphic.geId = el.id;
        el.GRAPHIC = graphic; //* Suspicious - Ask Evgeni
        return graphic;
    };

    freeUpGraphic = (graphic) => {
        let {
            freeGraphics,
            app: {
                stage,
            }
        } = this;

        delete graphic.geId;
        stage.removeChild(graphic);
        freeGraphics.push(graphic);
    }

    applySize = ({ rect: { x, y, width, height } }, graphic) => {
        graphic.x = x;
        graphic.y = y;
        // graphic.width = width;
        // graphic.height = height;
    };

    deInit = () => {

        this.app.stage.removeChildren();

        this.app = null;
    }

    render(gameElements) {
        if (this.app == null) {
            return;
        };

        let {
            app: {
                stage: {
                    children,
                },
                screen,
                stage
            },
            app,
            size,
            applySize,
            freeUpGraphic,
            getGraphic
        } = this;
        // console.log(children);
        // app.stage.removeChildren();

        // let map = children.reduce((acc, el) => {
        //     if (el.geId == null) {
        //         return acc;
        //     } else {
        //         return {
        //             ...acc,
        //             [el.geId]: el,
        //         }
        //     }
        // }, {});
        gameElements.forEach(el => {
            if (colide(el.rect, size || screen)) {
                let graphic;

                // if (map[el.id]) {
                //     graphic = map[el.id];
                // } else {
                // graphic = getGraphic(el);
                // if (graphic.SPEED.x === 0 && graphic.SPEED.y === 0) {
                //     graphic.stop();
                // } else {
                //     graphic.play();
                // };
                // };
                graphic = getGraphic(el);
                if (graphic.SPEED.x === 0 && graphic.SPEED.y === 0) {
                    graphic.stop();
                    // console.log('stop');
                } else {
                    graphic.play();
                    // console.log('play');
                };
                applySize(el, graphic);
            } else {
                // if (map[el.id]) {
                //     freeUpGraphic(map[el.id]);
                // };
            };
        });

        // console.log(`Stage.children.length : ${this.app.stage.children.length}`);
        // console.log(`free graphics length : ${this.freeGraphics.length}`);
    };
};