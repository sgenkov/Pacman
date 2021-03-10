import { colide } from "./Utils/utils";
import GraphicElement from './GraphicElement';
export default class PixiDelegate {
    constructor(app, size) {
        this.app = app;
        this.size = size;
        this.isInRangeBypass = false; //* Delete this later
        this.graphics = [];
        this.counter = 0; //!Del this
    };

    createElement = (el) => {
        let graphic = new GraphicElement(el);
        graphic.sheet.scale.x = graphic.sheet.REVERSE ? -2 : 2;
        graphic.sheet.scale.y = 2;
        // graphic.sheet.PREV_SPEED = el.prevSpeed;
        graphic.sheet.SPEED = el.speed;
        graphic.sheet.TYPE = el.type;
        // graphic.rect = el.rect;
        graphic.TYPE = el.type;
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
        let foundIndex;

        if (el.name !== "dot") {
            // console.log('first');
            foundIndex = graphics.findIndex(g => {
                return (
                    (g.name === el.name)
                    && (g.color === el.color)
                    && (g.lastMovementDirection === el.lastMovementDirection) //g.LAST_MOVEMENT_DIRECTION
                    && (g.state === el.state)
                );
            });
        } else {
            // console.log('second');
            foundIndex = graphics.findIndex(g => {
                // return false;
                // console.log(el.rect);
                const res = (
                    (g.name === el.name)
                    && (g.type === el.type)
                    // && (g.NAME === el.name)
                );
                // console.log(res);
                return res;
            });
            // console.log(foundIndex);
        }

        this.counter++;
        if (this.counter > 100000 && this.counter < 100002) console.log(graphics);

        if (graphics.length === 0 || foundIndex === -1) {
            // console.log('create');
            graphic = createElement(el);
            // console.log(graphic);
        } else {
            // console.log('found');
            graphic = graphics[foundIndex].sheet;
            // console.log(graphic);
        };
        // console.log(graphic);
        stage.addChild(graphic);
        // console.log(stage);
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
        // console.log(graphic.x);
        // console.log('apply : ', x, y);
        // graphic.width = width;
        // graphic.height = height;
    };

    deInit = () => {

        this.app.stage.removeChildren();

        this.app = null;
    }

    render(gameElements) {
        // if (this.app == null) {
        //     return;
        // };

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
            // console.log(el);
            if (true) {//colide(el.rect, size || screen)
                let graphic;

                if (map[el.id]) {
                    graphic = map[el.id];
                } else {
                    graphic = getGraphic(el);
                    if (graphic.SPEED) {
                        if (graphic.SPEED.x === 0 && graphic.SPEED.y === 0) {
                            graphic.stop();
                        } else {
                            graphic.play();
                        };
                    }
                };


                // graphic = getGraphic(el);
                // if (graphic.SPEED) { //  if (graphic.SPEED) {
                //     if (graphic.SPEED.x === 0 && graphic.SPEED.y === 0) {
                //         graphic.stop();
                //     } else {
                //         graphic.play();
                //     };
                // }

            applySize(el, graphic);
            } else {
                if (map[el.id]) {
                    freeUpGraphic(map[el.id]);
                };
            };
        });
        // this.app.ticker.stop(); //* !!!!!!
        // console.log(`Stage.children.length : ${this.app.stage.children.length}`);
        // console.log(`free graphics length : ${this.freeGraphics.length}`);
    };
};