import { app, Model } from './index';
import Pacman from './GameUnits/Pacman';
import Ghost from './GameUnits/Ghost';


export default class GameElementFactory {
    constructor() {
        this.init();
    };

    init = () => {
        this.unitMap = new Map([
            ["ghost", this.createGhost],
            ["player", this.createPlayer],
            // ["bullet", this.createBullet],
            // ["obstacle", this.createObstacle]
        ]);

        // scene.elements.forEach((sceneElement) => {
        //     this.createUnit(sceneElement.name);
        // });

    };

    getUnit = (type, color) => {
        return this.createUnit(type, color);
    };

    createUnit = (type, color) => {
        return this.unitMap.get(type)(color);
    };

    createPlayer = () => {
        const newPlayer = new Pacman("pacman");
        return newPlayer;
    };

    createGhost = (color) => {
        const newGhost = new Ghost("ghost", color);
        return newGhost;
    };


};

