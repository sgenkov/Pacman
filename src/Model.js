import scene from './scene.json';
export default class Model extends EventTarget {
    constructor() {
        super();
        this.gameElements = [];
        this.freeGameElements = [];
        this.vertices = [];
        this.player = null;
        const vertex = this.calculatePositions(); //* To avoid recalculations. Think about this later!
        this.defaultLocations = {
            pacman: {
                vertex
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
        return scene.map.find(vertex => vertex.id == scene.startingVertices.pacman);
    };
};
// export default new Model();