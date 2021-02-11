import { app } from '../index';
export default class Pacman {
    constructor() {
        this.position = { x: app.view.width / 2, y: app.view.height / 2 };
        this.direction = "right";
    };
};