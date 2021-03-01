import { colide } from "./utils";
import GraphicElement from './GraphicElement';
export default class PixiDelegate {
    constructor(app, size) {
        this.app = app;
        this.size = size;
        this.isInRangeBypass = false; //* Delete this later
        this.graphics = [];
    };

    createElement = (el) => {
        console.log(el);
        let graphic = new GraphicElement(el);
        graphic.sheet.scale.x = 2; //todo: Modify this to be scalable
        graphic.sheet.scale.y = 2; //todo: Modify this to be scalable
        graphic.sheet.PREV_SPEED = el.prevSpeed;
        graphic.sheet.SPEED = el.speed;
        this.graphics.push(graphic);
        return graphic.sheet;
    }

    getGraphic = (el) => {
        let {
            graphics,
            createElement,
            app: {
                stage,
            }
        } = this;

        let graphic;
        const foundIndex = graphics.findIndex(g => {
            return (g.name === el.name);
        });

        if (graphics.length == 0 || foundIndex === -1) {
            graphic = createElement(el);
        } else {
            graphic = graphics[foundIndex].sheet;
            // console.log('GraphicElement founded'); //^ flow
            // freeGraphics.splice(foundIndex, 1);
        };
        // console.log(graphic);
        // graphic.angle = graphic.PREV_SPEED.x < 0? 90 : 0;
        if (graphic.PREV_SPEED.x > 0) {
            graphic.angle = 0;
        };
        if (graphic.PREV_SPEED.x < 0) {
            graphic.angle = 180;
        };
        if (graphic.PREV_SPEED.y > 0) {
            graphic.angle = 90;
        };
        if (graphic.PREV_SPEED.y < 0) {
            graphic.angle = -90;
        };
        if (graphic.SPEED.x === 0 && graphic.SPEED.y === 0) {
            //TODO: how to stop the animation here
        };

        graphic.geId = el.id;
        stage.addChild(graphic);

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
            size,
            applySize,
            freeUpGraphic,
            getGraphic
        } = this;

        let map = children.reduce((acc, el) => {
            if (el.geId == null) {
                return acc;
            } else {
                return {
                    ...acc,
                    [el.geId]: el,
                }
            }
        }, {});
        gameElements.forEach(el => {
            if (colide(el.rect, size || screen)) {
                let graphic;

                if (map[el.id]) {
                    graphic = map[el.id];
                } else {
                    graphic = getGraphic(el);
                    if (graphic.SPEED.x === 0 && graphic.SPEED.y === 0) {
                        graphic.stop();
                    } else {
                        graphic.play();
                    };
                };
                applySize(el, graphic);
            } else {
                if (map[el.id]) {
                    freeUpGraphic(map[el.id]);
                };
            };
        });

        // console.log(`Stage.children.length : ${this.app.stage.children.length}`);
        // console.log(`free graphics length : ${this.freeGraphics.length}`);
    };
};