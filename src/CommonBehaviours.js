import DC from './debugConfig.json'; //^ FLOW


export default class CommonBehaviours {
  constructor(factory) {
    const complexSpeed = (el) => {
      const commonSpeed = 1;
      const resultSpeed = commonSpeed + el.baseSpeed;
      return resultSpeed;
    };

    this.commonBehaviours = {
      "move": (el) => {
        DC.traceBehaviours && console.log('move behaviour'); //^ FLOW
        el.rect.x += el.speed.x;
        el.rect.y += el.speed.y;
      },
      "moveUp": (el) => {
        DC.traceBehaviours && console.log('moveUp behaviour'); //^ FLOW
        if (!el.allowedDirections.some(direction => direction === "up" || direction === "all")) {
          console.log('Forbidden direction');
          return;
        };
        el.speed.y = -complexSpeed(el);
        el.prevSpeed.y = -complexSpeed(el);
      },
      "moveDown": (el) => {
        DC.traceBehaviours && console.log('moveDown behaviour'); //^ FLOW
        if (!el.allowedDirections.some(direction => direction === "down" || direction === "all")) {
          console.log('Forbidden direction');
          return;
        };
        el.speed.y = complexSpeed(el);
        el.prevSpeed.y = complexSpeed(el);
      },
      "moveLeft": (el) => {
        DC.traceBehaviours && console.log('moveLeft behaviour'); //^ FLOW
        if (!el.allowedDirections.some(direction => direction === "left" || direction === "all")) {
          console.log('Forbidden direction');
          return;
        };
        el.speed.x = -complexSpeed(el);
        el.prevSpeed.x = -complexSpeed(el);
      },
      "moveRight": (el) => {
        DC.traceBehaviours && console.log('moveRight behaviour'); //^ FLOW
        if (!el.allowedDirections.some(direction => direction === "right" || direction === "all")) {
          console.log('Forbidden direction');
          return;
        };
        el.speed.x = complexSpeed(el);
        el.prevSpeed.x = complexSpeed(el);
      },
      "stop": (el) => {
        DC.traceBehaviours && console.log('stop behaviour'); //^ FLOW
        el.speed.x = 0;
        el.speed.y = 0;
        el.behaviours = el.behaviours.filter(e => e !== "stop"); //^ FLOW
      },
      "debugger": () => {
        debugger;
      },
      "updateInfo": (el) => {
        el.updateInfo();
      }
    };
  }
}