import { onKeyDown, onKeyUp } from './ControlsHandler';
import { app, model, graphHandler } from './index';
import CommonBehaviours from './CommonBehaviours';
import GameElementFactory from './GameElementFactory';
import DC from './config/debugConfig.json'; // ^FLOW
import * as PIXI from 'pixi.js';
import { assetsLoader } from './index';
import DotManager from './Dot/DotManager';
import { colide, colideWithCircle } from './Utils/utils';


export default class Game extends EventTarget {
  constructor(delegate) {
    super();
    this.name = "play";
    this.delegate = delegate;
    // this.score = 0;
    this.backGround = null;
    this.info = model.info;
    // this.loopCount = 0;
  };

  init = () => {
    DC.mainFlow && console.log('Game.js : Game init'); //^ FLOW
    this.factory = new GameElementFactory();
    this.dotManager = new DotManager();
    graphHandler.nodesCreate();
    this.commonBehavioursInstance = new CommonBehaviours();              //TODO: Refactor this V
    this.behaviours = this.commonBehavioursInstance.commonBehaviours;    //TODO: Refactor this ^
    this.createUnits();
    document.addEventListener("keydown", (e) => onKeyDown(e, this.behaviours));
    document.addEventListener("keyup", (e) => onKeyUp(e));
    this.addBackground();
    this.addInfo();
    // this.addEventListener("testEvent", (event) => {console.log(event)});
    app.ticker.add(this.gameTicker);
  };

  deInit = () => {
    DC.mainFlow && console.log('Game.js : Game deInit'); //^ FLOW
    document.removeEventListener("keyup", onKeyUp);
    document.removeEventListener("keydown", onKeyDown);
    // app.stage.removeChildren(); //TODO: add this row later
  };

  gameTicker = () => {
    // console.log(model.player.behaviours);
    model.loopUpdate();
    model.loopCounter.forEach(loopCounter => { //TODO: Move this in custom EventHandler
      if (loopCounter.owner === "pacman") {
        if (loopCounter.state === "active" && loopCounter.value % 300 === 0) {
          model.player.innerStateMachine.setState("normal");
          loopCounter.reset();
          loopCounter.state = "inactive";
        }
        return;
      };

      if ((loopCounter.state === "active") && loopCounter.value % 300 === 0) {
        const currentGhost = model.ghosts.find(ghost => ghost.color === loopCounter.owner);
        currentGhost?.innerStateMachine.setState(currentGhost.getNextState());
      };
    });

    let {
      behaviours,
      delegate,
    } = this;

    model.gameElements.forEach(el => {
      el.behaviours?.forEach(b => {
        let behaviour = behaviours[b];
        if (behaviour) {
          behaviour(el, model.gameElements);
        };
      });
    });

    model.gameElements.forEach(gameElement => {
      // gameElement.name === "pacman" && console.log('All Dir from game.js', gameElement.behaviours);
      model.nodes.forEach(node => {
        if ((gameElement.overriddenByNodeId !== node.ID) && gameElement.name !== "dot" && node.vertexData && colideWithCircle(node, gameElement)) { //* ALT1 // && gameElement.currentNode !== node
          // if (gameElement.name !== "dot" && node.vertexData && node.vertexData[0] === gameElement.rect.x && node.vertexData[1] === gameElement.rect.y) { //*ALT2
          gameElement.rect.x = node.vertexData[0]; //* ALT1
          gameElement.rect.y = node.vertexData[1]; //* ALT1
          gameElement.currentNode = node;
          gameElement.allowedDirections.length = 0;

          for (let allowedDirection in gameElement.currentNode.EDGES) {
            gameElement.allowedDirections.push(allowedDirection);
          };

          if (!node.EDGES.hasOwnProperty(gameElement.lastMovementDirection)) {
            // (!model.player.behaviours.includes("stop")) && model.player.behaviours.unshift("stop");
            gameElement.speed.x = 0; //* ~~NOT GOOD SOLUTION
            gameElement.speed.y = 0; //* ~~NOT GOOD SOLUTION
            // gameElement.behaviours.unshift('stop');
          };
          const currentAction = behaviours[gameElement.nextMove()];
          if (currentAction && gameElement.allowedDirections.includes(gameElement.nextAction.replace('move', '').toLowerCase())) {
            console.log('current action', currentAction(gameElement));
            currentAction(gameElement);
          };

          gameElement.overriddenByNodeId = node.ID;
        } else {
          gameElement.overriddenByNodeId = -666;
        }

      });
    });

    model.gameElements.forEach(gameElement1 => { //TODO: merge this loop with the upper one
      model.gameElements.forEach(gameElement2 => {
        if (gameElement1 === gameElement2) return;
        if (colide(gameElement1.rect, gameElement2.rect) && (gameElement2.hitGroup in gameElement1.colides)) {
          gameElement1.behaviours.push(gameElement1.colides[`${gameElement2.hitGroup}`])
        };
      });
    });

    delegate.render(model.gameElements);
  };

  createUnits = () => {
    model.emplaceDots(this.dotManager.createDots());
    model.assignPlayer(this.factory.getUnit("player"));
    model.assignGhost(this.factory.getUnit("ghost", "pink"));
    model.assignGhost(this.factory.getUnit("ghost", "orange"));
    model.assignGhost(this.factory.getUnit("ghost", "blue"));
    model.assignGhost(this.factory.getUnit("ghost", "red"));
  };
  addBackground = () => {
    let { backGround } = this;
    backGround = PIXI.Sprite.from(assetsLoader.SHEETS.background);
    backGround.anchor.set(0.5);
    backGround.position.x = app.view.width / 2;
    backGround.position.y = app.view.height / 2 - 20;
    backGround.scale.x = 2.75;
    backGround.scale.y = 2.75;
    app.stage.addChild(backGround);
  };
  addInfo = () => {
    app.stage.addChild(this.info);
  }

};
