import DC from './config/debugConfig.json'; //^ FLOW
import { possibleMove } from './Utils/utils';


export default class CommonBehaviours {
  constructor() {
    const complexSpeed = (el) => {
      const commonSpeed = 1;
      const resultSpeed = commonSpeed + el.baseSpeed;
      return resultSpeed;
    };

    this.commonBehaviours = {
      "move": (el) => {
        // DC.traceBehaviours && console.log('move behaviour'); //^ FLOW
        el.rect.x += el.speed.x;
        el.rect.y += el.speed.y;
      },
      "moveUp": (el) => {
        DC.traceBehaviours && console.log('moveUp behaviour'); //^ FLOW
        // console.log(el.currentNode);
        if (!possibleMove(el.currentNode.EDGES, "up")) return;
        // el.prevNode = el.currentNode;
        // el.currentNode = null;
        el.lastMovementDirection = "up";
        el.speed.x = 0;
        el.speed.y = -complexSpeed(el);
        el.prevSpeed.y = -complexSpeed(el);
      },
      "moveDown": (el) => {
        DC.traceBehaviours && console.log('moveDown behaviour'); //^ FLOW
        if (!possibleMove(el.currentNode.EDGES, "down")) return;
        el.lastMovementDirection = "down";
        el.speed.x = 0;
        el.speed.y = complexSpeed(el);
        el.prevSpeed.y = complexSpeed(el);
      },
      "moveLeft": (el) => {
        DC.traceBehaviours && console.log('moveLeft behaviour'); //^ FLOW
        if (!possibleMove(el.currentNode.EDGES, "left")) return;
        el.lastMovementDirection = "left";
        el.speed.y = 0;
        el.speed.x = -complexSpeed(el);
        el.prevSpeed.x = -complexSpeed(el);
      },
      "moveRight": (el) => {
        DC.traceBehaviours && console.log('moveRight behaviour'); //^ FLOW
        if (!possibleMove(el.currentNode.EDGES, "right")) return;
        el.lastMovementDirection = "right";
        el.speed.y = 0;
        el.speed.x = complexSpeed(el);
        el.prevSpeed.x = complexSpeed(el);
      },
      "stop": (el) => {
        DC.traceBehaviours && console.log('stop behaviour'); //^ FLOW
        console.log('stop');
        el.speed.x = 0;
        el.speed.y = 0;
        el.behaviours = el.behaviours.filter(e => e !== "stop");
        // el.behaviours.shift();
      },
      "debugger": () => {
        debugger;
      },
      "updateInfo": (el) => {
        el.updateInfo();
      },
    };
  }
}