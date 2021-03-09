import { map, bigFoodPositionsByNodeId, exceptionDots } from '../config/scene.json';
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
            if (exceptionDots.some(el => el === node.id)) return;
            buildDirections.forEach(buildDirection => {
                if (node.edges[buildDirection] === undefined) return;
                let max;
                const dotsGap = 22;
                if (buildDirection in node.edges) { // node.edges.hasOwnProperty(buildDirection)
                    const currentDirection = buildDirection === "right" ? "x" : "y";
                    max = map.find(el => el.id === node.edges[buildDirection]).position[currentDirection];
                    for (let i = 0; (node.position[currentDirection] + dotsGap * i) < max + 1; ++i) {
                        const newPosition = {
                            ...node.position,
                            [currentDirection]: node.position[currentDirection] + dotsGap * i
                        };
                        new Dot(newPosition);
                    };


                };
            });
        });
    };

};