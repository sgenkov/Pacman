import Model from './Model';
import { app } from './index';
import Pacman from './GameUnits/Pacman';


export default class GameElementFactory {
    constructor() {
        this.init();
    };

    init = () => {
        this.unitMap = new Map([
            ["ghost", this.createEnemy],
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

    createEnemy = () => {
        const newEnemy = new Enemy();
        console.log('new enemy', newEnemy);
        return newEnemy;
    };

    createBullet = ({ rect: { x, y, width }, name }) => {
        const bulletParams = this.getBulletParams(name, x);

        const newBullet = new Bullet({
            "name": "bullet",
            "owner": name,
            "behaviours": ["move"],
            "hitGroup": ["bullet"],
            "speed": [bulletParams.speed, 0],
            "colides": {
                "enemy": ["explode"],
                "player": ["explode"]
            },
            "dimensions": [bulletParams.X, y + 29, 30, 10] //TODO: Make the dimensions scalable
        });

        return newBullet;
    };

};

