import Model from "./Model";


export default class CommonBehaviours {
  constructor(factory) {
    // this.gameElements = Model.gameElements;
    // this.factory = factory;

    this.commonBehaviours = {
      "move": (el) => {
        el.rect.x += el.speed.x;
        el.rect.y += el.speed.y;
      },
      "moveUp": (el) => {
        el.speed.y = -4;
      },
      "moveDown": (el) => {
        el.speed.y = 4;
      },
      "moveLeft": (el) => {
        el.speed.x = -4;
      },
      "moveRight": (el) => {
        el.speed.x = 4;
      },
      "stop": (el) => {
        el.speed.x = 0;
        el.speed.y = 0;
        el.behaviours = el.behaviours.filter(e => e != "stop");
      },
      "debugger": () => {
        debugger;
      },
    };
  }
}