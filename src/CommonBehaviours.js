import { model } from "./index";
import DC from './debugConfig.json'; //^ FLOW
import scene from './scene.json';


export default class CommonBehaviours {
  constructor(factory) {
    const complexSpeed = (el) => {
      const commonSpeed = 0;
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
        // console.log(el.allowedDirections);
        if (el.currentVertex.edges.hasOwnProperty("up") && el.rect.y === scene.map.find(Vertex => Vertex.id === el.currentVertex.id).position.y) {
          console.log('TRUE');
          console.log('el.currentVertex.edges', el.currentVertex.edges);
          console.log('el.rect.y : ', el.rect.y );
          console.log('Found in scene');
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