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
        graphic.sheet.SPEED = el.speed;
        graphic.sheet.TYPE = el.type;
        graphic.TYPE = el.type;
        graphic.state = el.state;
        graphic.rect = el.rect;
        graphic.EATEN = el.eaten;
        this.graphics.push(graphic);
        return graphic;
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
            foundIndex = graphics.findIndex(g => {
                return (
                    (g.name === el.name)
                    && (g.color === el.color)
                    && (g.lastMovementDirection === el.lastMovementDirection)
                    && (g.state === el.state)
                );
            });
        } else {
            foundIndex = graphics.findIndex(g => {
                const res = (
                    (g.name === el.name)
                    && (g.type === el.type)
                    && (g.rect.x === el.rect.x) //TODO: Optimise this with custom RECT ?????
                    && (g.rect.y === el.rect.y)
                    && (g.EATEN === false)
                );
                return res;
            });
        }


        if (graphics.length === 0 || foundIndex === -1) {
            graphic = createElement(el).sheet;
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
    };

    // deInit = () => {
    //     this.app.stage.removeChildren();
    //     this.app = null;
    // }

    render(gameElements) {
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
        });
    };
};