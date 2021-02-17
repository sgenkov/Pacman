import DC from './debugConfig.json'; //^ FLOW
import { possibleMove } from './utils';


export default class CommonBehaviours {
  constructor() {
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
        if (possibleMove(el.currentVertex.EDGES, "up")) return;
        // console.log(el.currentVertex.vertexData);
        console.log(`el.rect.x : ${el.rect.x} === el.currentVertex.vertexData[0] : ${el.currentVertex.vertexData[0]}`);
        console.log(`el.rect.y : ${el.rect.y} === el.currentVertex.vertexData[1] : ${el.currentVertex.vertexData[1]}`);
        if ((el.rect.x === el.currentVertex.vertexData[0]) && (el.rect.y === el.currentVertex.vertexData[1])) {
          el.behaviours.push("stop");
        };
        el.speed.y = -complexSpeed(el);
        el.prevSpeed.y = -complexSpeed(el);
      },
      "moveDown": (el) => {
        DC.traceBehaviours && console.log('moveDown behaviour'); //^ FLOW
        if (possibleMove(el.currentVertex.EDGES, "down")) return; 
        if ((el.rect.x === el.currentVertex.vertexData[0]) && (el.rect.y === el.currentVertex.vertexData[1])) {
          el.behaviours.push("stop");
        };
        el.speed.y = complexSpeed(el);
        el.prevSpeed.y = complexSpeed(el);
      },  
      "moveLeft": (el) => {
        DC.traceBehaviours && console.log('moveLeft behaviour'); //^ FLOW
        if (possibleMove(el.currentVertex.EDGES, "left")) return;
        if ((el.rect.x === el.currentVertex.vertexData[0]) && (el.rect.y === el.currentVertex.vertexData[1])) {
          el.behaviours.push("stop");
        };
        el.speed.x = -complexSpeed(el);
        el.prevSpeed.x = -complexSpeed(el);
      },
      "moveRight": (el) => {
        DC.traceBehaviours && console.log('moveRight behaviour'); //^ FLOW
        if (possibleMove(el.currentVertex.EDGES, "right")) return;
        if ((el.rect.x === el.currentVertex.vertexData[0]) && (el.rect.y === el.currentVertex.vertexData[1])) {
          el.behaviours.push("stop");
        };
        el.speed.x = complexSpeed(el);
        el.prevSpeed.x = complexSpeed(el);
      },
      "stop": (el) => {
        DC.traceBehaviours && console.log('stop behaviour'); //^ FLOW
        el.speed.x = 0;
        el.speed.y = 0;
        el.behaviours = el.behaviours.filter(e => e !== "stop");
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