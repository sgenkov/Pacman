import scene from './config/scene.json';
export default class Model extends EventTarget {
    constructor() {
        super();
        this.ASSETS_LOADED = false;
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
        const found = scene.map.find(node => node.id === scene.startingNodes[name]);
        return found;
    };
};