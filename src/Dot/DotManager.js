import { map, bigFoodPositionsByNodeId } from '../config/scene.json';
import Dot from './Dot';
export default class DotManager {
    constructor() {
        this.buildDirections = ["right", "down"];
    };

    createDots = () => {
        this.createBigDots();
        this.createSmallDots();
    };

    createBigDots = () => {
        bigFoodPositionsByNodeId.forEach(nodeId => {
            const position = map.find(node => node.id === nodeId).position;
            new Dot(position, "big");
        });

    };

    createSmallDots = () => {
        const { buildDirections } = this;
        map.forEach((node) => {
            buildDirections.forEach(buildDirection => {
                if (node.edges[buildDirection] === undefined) return;
                let max;
                const dotsGap = 22;
                if (node.edges.hasOwnProperty(buildDirection)) {
                    if (buildDirection === "right") {
                        max = map.find(el => el.id === node.edges[buildDirection]).position.x;
                        for (let i = 0; (node.position.x + dotsGap * i) < max ; ++i) {
                            const newPosition = {
                                ...node.position,
                                x: node.position.x + dotsGap * i,
                            };
                            new Dot(newPosition);
                        };
                    } else {
                        max = map.find(el => el.id === node.edges[buildDirection]).position.y;
                        for (let i = 0; (node.position.y + dotsGap * i) <= max; ++i) {
                            const newPosition = {
                                ...node.position,
                                y: node.position.y + dotsGap * i
                            };
                            new Dot(newPosition);
                        };
                    }


                };
            });
        });
    };

};