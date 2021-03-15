import DC from './config/debugConfig.json'; //^ FLOW
import { possibleMove } from './Utils/utils';
import { model, app } from './index';
import { SoundProvider } from './SoundProvider';


export default class CommonBehaviours {
  constructor() {
    this.soundProvider = new SoundProvider();
    const complexSpeed = (el) => {
      const commonSpeed = 1;
      const resultSpeed = commonSpeed + el.baseSpeed;
      return resultSpeed;
    };

    this.commonBehaviours = {
      move: (el) => {
        DC.traceBehaviours && console.log('move behaviour'); //^ FLOW
        el.rect.x += el.speed.x;
        el.rect.y += el.speed.y;
        (el.rect.x > 620) && (el.rect.x = 0);
        (el.rect.x < 0) && (el.rect.x = 620);
      },
      moveUp: (el) => {
        DC.traceBehaviours && console.log('moveUp behaviour'); //^ FLOW
        if (!possibleMove(el.currentNode.EDGES, "up")) return;
        el.lastMovementDirection = "up";
        el.speed.x = 0;
        el.speed.y = -complexSpeed(el);
        el.prevSpeed.y = -complexSpeed(el);
      },
      moveDown: (el) => {
        DC.traceBehaviours && console.log('moveDown behaviour'); //^ FLOW
        if (!possibleMove(el.currentNode.EDGES, "down")) return;
        el.lastMovementDirection = "down";
        el.speed.x = 0;
        el.speed.y = complexSpeed(el);
        el.prevSpeed.y = complexSpeed(el);
      },
      moveLeft: (el) => {
        DC.traceBehaviours && console.log('moveLeft behaviour'); //^ FLOW
        if (!possibleMove(el.currentNode.EDGES, "left")) return;
        el.lastMovementDirection = "left";
        el.speed.y = 0;
        el.speed.x = -complexSpeed(el);
        el.prevSpeed.x = -complexSpeed(el);
      },
      moveRight: (el) => {
        DC.traceBehaviours && console.log('moveRight behaviour'); //^ FLOW
        if (!possibleMove(el.currentNode.EDGES, "right")) return;
        el.lastMovementDirection = "right";
        el.speed.y = 0;
        el.speed.x = complexSpeed(el);
        el.prevSpeed.x = complexSpeed(el);
      },
      stop: (el) => {
        DC.traceBehaviours && console.log('stop behaviour'); //^ FLOW
        console.log('stop');
        el.speed.x = 0;
        el.speed.y = 0;
        el.behaviours = el.behaviours.filter(e => e !== "stop");
      },
      debugger: () => {
        debugger;
      },
      updateInfo: (el) => {
        el.updateInfo();
      },
      disappear: (el) => {
        DC.unitsCollisionTrace && console.log('Disappear behaviour triggered');
        // this.soundProvider.eatDot.play();
        app.stage.removeChild(el.GRAPHIC);
        if (el.type === "small") {
          ++model.score;
        } else {
          model.ghosts.forEach(ghost => ghost.innerStateMachine.setState("scared"));
          model.loopCount = 0;
        }

        model.updateScoreInfo();
        model.gameElements = model.gameElements.filter(ge => ge !== el);
        el.behaviours = el.behaviours.filter(e => e !== "disappear");

      },
      backToBase: (el) => {
        DC.unitsCollisionTrace && console.log('BackToBase behaviour triggered');
        this.soundProvider.eatGhost.play();
        model.score += 15;
        el.innerStateMachine.setState("eaten");
        el.behaviours = el.behaviours.filter(e => e !== "backToBase");
      },
      die: (el) => {
        DC.unitsCollisionTrace && console.log('Die behaviour triggered');
        el.behaviours = el.behaviours.filter(e => e !== "die");
      },
      suffer: (el) => {
        DC.unitsCollisionTrace && console.log('Suffer behaviour triggered');
        el.behaviours = el.behaviours.filter(e => e !== "suffer");
      },
      score: (el) => {
        DC.unitsCollisionTrace && console.log('Score behaviour triggered');
        el.behaviours = el.behaviours.filter(e => e !== "score");
      },
      nullBehaviour: (el) => {
        DC.unitsCollisionTrace && console.log('Null behaviour triggered');
        el.behaviours = el.behaviours.filter(e => e !== "nullBehaviour");
      }
    };
  }
}