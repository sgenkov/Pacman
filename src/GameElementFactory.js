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

    getUnit = (type, el) => {
        return this.createUnit(type, el);
    };

    createUnit = (type, el) => {
        return this.unitMap.get(type)(el);
    };

    createPlayer = () => {
        const newPlayer = new Pacman();
        return newPlayer;
    };

    createGhost = () => {
        const newGhost = new Ghost();
        return newGhost;
    };


};

