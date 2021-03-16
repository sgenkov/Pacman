import { map, bigFoodPositionsByNodeId, exceptionDots, additionalBigDotsDebug } from '../config/scene.json';
import Dot from './Dot';
import { additionalBigDots } from '../config/debugConfig.json';
export default class DotManager {
    constructor() {
        this.dots = [];
        this.buildDirections = ["right", "down"];
    };

    createDots = () => { //Todo: Reduce this function
        const bigDots = this.createBigDots();
        const smallDots = this.createSmallDots();
        const res = bigDots.concat(smallDots);
        // console.log(res);
        return res;
    };

    createBigDots = () => {
        const bigDots = [];
        bigFoodPositionsByNodeId.forEach(nodeId => {
            const position = map.find(node => node.id === nodeId).position;
            bigDots.push(new Dot(position, "big"));
        });

        additionalBigDots && additionalBigDotsDebug.forEach(nodeId => { //^ Faster testing
            const position = map.find(node => node.id === nodeId).position;
            bigDots.push(new Dot(position, "big"));
        });


        return bigDots;
    };

    createSmallDots = () => {
        const { buildDirections } = this;
        const smallDots = [];
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
                        smallDots.push(new Dot(newPosition));
                    };
                };
            });
        });
        return smallDots;
    };

};