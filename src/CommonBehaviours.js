import DC, { soundEnabled } from './config/debugConfig.json'; //^ FLOW
import { possibleMove } from './Utils/utils';
import { model, app, soundProvider } from './index';


export default class CommonBehaviours {
  constructor() {
    // soundEnabled && (this.soundProvider = new SoundProvider());
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
        el.behaviours = el.behaviours.filter(e => e !== "moveUp");
        if (!possibleMove(el, "up")) {
          el.nextAction = "moveUp";
          return;
        };
        el.nextAction = null;
        el.allowedDirections.length = 0;
        el.allowedDirections.push("down");
        el.lastMovementDirection = "up";
        el.speed.x = 0;
        el.speed.y = -complexSpeed(el);

        el.behaviours.length = 2;
      },
      moveDown: (el) => {
        DC.traceBehaviours && console.log('moveDown behaviour'); //^ FLOW
        el.behaviours = el.behaviours.filter(e => e !== "moveDown");
        if (!possibleMove(el, "down"))  {
          el.nextAction = "moveDown";
          return;
        };
        el.nextAction = null;
        el.allowedDirections.length = 0;
        el.allowedDirections.push("up");
        el.lastMovementDirection = "down";
        el.speed.x = 0;
        el.speed.y = complexSpeed(el);
      },
      moveLeft: (el) => {
        DC.traceBehaviours && console.log('moveLeft behaviour'); //^ FLOW
        el.behaviours = el.behaviours.filter(e => e !== "moveLeft");
        if (!possibleMove(el, "left"))  {
          el.nextAction = "moveLeft";
          return;
        };
        el.nextAction = null;
        el.allowedDirections.length = 0;
        el.allowedDirections.push("right");
        el.lastMovementDirection = "left";
        el.speed.y = 0;
        el.speed.x = -complexSpeed(el);
      },
      moveRight: (el) => {
        DC.traceBehaviours && console.log('moveRight behaviour'); //^ FLOW
        el.behaviours = el.behaviours.filter(e => e !== "moveRight");
        if (!possibleMove(el, "right"))  {
          el.nextAction = "moveRight";
          return;
        };
        el.nextAction = null;
        el.allowedDirections.length = 0;
        el.allowedDirections.push("left");
        el.lastMovementDirection = "right";
        el.speed.y = 0;
        el.speed.x = complexSpeed(el);
      },
      stop: (el) => {
        DC.traceBehaviours && console.log('stop behaviour'); //^ FLOW
        el.behaviours = el.behaviours.filter(e => e !== "stop");
        console.log('stop');
        el.speed.x = 0;
        el.speed.y = 0;
      },
      debugger: () => {
        debugger;
      },
      updateInfo: (el) => {
        el.updateInfo();
      },
      disappear: (el) => {
        DC.unitsCollisionTrace && console.log('Disappear behaviour triggered');
        if (soundEnabled) {
          const isPlaying = soundProvider.eatDot.playing(soundProvider.eatDot);
          if (isPlaying) {
            soundProvider.eatDot.stop();
            soundProvider.eatDot.play();
          } else {
            soundProvider.eatDot.play();
          };
        };
        app.stage.removeChild(el.GRAPHIC);
        if (el.type === "small") {
          ++model.score;
        } else {
          model.ghosts.forEach(ghost => ghost.innerStateMachine.setState("scared"));
          // model.player.baseSpeed = 0.5;
          // model.loopCount = 0;
          const timer = model.loopCounter.find(counter => counter.owner === "pacman");
          timer.reset();
          timer.state = "active";
          model.player.innerStateMachine.setState("fast");
        };

        model.updateScoreInfo();
        model.gameElements = model.gameElements.filter(ge => ge !== el);
        el.behaviours = el.behaviours.filter(e => e !== "disappear");

      },
      backToBase: (el) => {
        DC.unitsCollisionTrace && console.log('BackToBase behaviour triggered');
        soundEnabled && soundProvider.eatGhost.play();
        model.score += 15;
        model.updateScoreInfo()
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