import scene from './scene.json';
export default class Model extends EventTarget {
    constructor() {
        super();
        this.gameElements = [];
        this.freeGameElements = [];
        this.nodes = [];
        this.player = null;
        const node = this.calculatePositions(); //* To avoid recalculations. Think about this later!
        this.defaultLocations = {
            pacman: {
                node: node
            },
            blueGhost: {},
            orangeGhost: {},
            pinkGhost: {},
            redGhost: {}
        };
    };
    assignPlayer = (unit) => {
        this.gameElements.push(unit);
        this.player = unit;
    };

    calculatePositions = () => { //* To avoid recalculations. Think about this later!
        return scene.map.find(node => node.id === scene.startingNodes.pacman);
    };
};
// export default new Model();