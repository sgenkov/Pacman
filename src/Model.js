import scene from './scene.json';
export default class Model extends EventTarget {
    constructor() {
        super();
        this.gameElements = [];
        this.freeGameElements = [];
        this.nodes = [];
        this.player = null;
        this.ghost = null;
        this.defaultLocations = {
            pacman: { node: this.calculatePosition('pacman') },
            blueGhost: { node: this.calculatePosition('blueGhost') },
            orangeGhost: { node: this.calculatePosition('orangeGhost') },
            pinkGhost: { node: this.calculatePosition('pinkGhost') },
            redGhost: { node: this.calculatePosition('redGhost') }
        };
    };

    assignPlayer = (unit) => {
        this.gameElements.push(unit);
        this.player = unit;
    };

    assignGhost = (unit) => {
        this.gameElements.push(unit);
        this.ghost = unit;
    };

    calculatePosition = (name) => {
        return scene.map.find(node => node.id === scene.startingNodes[name]);
    };
};
// export default new Model();