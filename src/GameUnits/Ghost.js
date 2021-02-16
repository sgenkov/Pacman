import { app } from '../index';
import DC from '../debugConfig.json';
export default class Ghost {
    constructor() {
        DC.objectsCreation && console.log("Ghost created"); //^ FLOW
        // this.id = getIndex(); //? Is it necessary
        this.position = { x: 200, y: 200 };
        this.direction = "right";
        this.behaviours = [];
        this.name = 'ghost';
    };
};