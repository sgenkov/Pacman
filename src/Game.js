import { onKeyDown, onKeyUp } from './ControlsHandler';
import { app, model } from './index';
import CommonBehaviours from './CommonBehaviours';
import GameElementFactory from './GameElementFactory';
import DC from './debugConfig.json'; // ^FLOW
import scene from './scene.json';
import * as PIXI from 'pixi.js';
import { assetsLoader } from './index';
import { colideWithCircle } from './utils';
import Model from './Model';
export default class Game {
  constructor(delegate) {
    this.name = "play";
    this.delegate = delegate;
    this.score = 0;
    this.backGround = null;
  };

  init = () => {
    DC.mainFlow && console.log('Game.js : Game init'); //^ FLOW
    this.factory = new GameElementFactory();
    // this.behaviours = new CommonBehaviours().commonBehaviours;
    this.commonBehavioursInstance = new CommonBehaviours();              //TODO: Refactor this V
    this.behaviours = this.commonBehavioursInstance.commonBehaviours;    //TODO: Refactor this ^
    model.assignPlayer(this.factory.getUnit("player"));
    model.assignGhost(this.factory.getUnit("ghost"));
    document.addEventListener("keydown", (e) => onKeyDown(e, this.behaviours));
    document.addEventListener("keyup", (e) => onKeyUp(e));
    this.addBackground();
    this.nodesCreate();
    app.ticker.add(this.gameTicker);
  };

  deInit = () => {
    DC.mainFlow && console.log('Game.js : Game deInit'); //^ FLOW
    document.removeEventListener("keyup", onKeyUp);
    document.removeEventListener("keydown", onKeyDown);
  };

  gameTicker = () => {
    let {
      behaviours,
      delegate,
    } = this;


    model.gameElements.forEach(el => {
      el.behaviours.forEach(b => {
        let behaviour = behaviours[b];
        if (behaviour) {
          behaviour(el, model.gameElements);
        };
      });
    });

    model.nodes.forEach(node => {
      // if (colideWithCircle(node, model.player)) {
      if (node.vertexData && node.vertexData[0] === model.player.rect.x && node.vertexData[1] === model.player.rect.y) {
        model.player.currentNode = node;
        model.player.allowedDirections.length = 0;

        for (let allowedDirection in model.player.currentNode.EDGES) {
          model.player.allowedDirections.push(allowedDirection);
        };
        // console.log(model.player.allowedDirections);

        if (!node.EDGES.hasOwnProperty(model.player.lastMovementDirection)) {
          // (!model.player.behaviours.includes("stop")) && model.player.behaviours.unshift("stop");
          model.player.speed.x = 0; //* ~~SOLUTION
          model.player.speed.y = 0; //* ~~SOLUTION
        };
      };

      const currentAction = behaviours[model.player.nextAction];
      if (currentAction && model.player.allowedDirections.includes(model.player.nextAction.replace('move','').toLowerCase())) {
        // console.log(model.player.nextAction.replace('move','').toLowerCase());
        currentAction(model.player);
      };


      let nodeEdges = '';
      for (let edge in model.player.currentNode.EDGES) {
        nodeEdges += edge + ' : ' + model.player.currentNode.EDGES[edge] + '\n';
      };
      // console.log('infoUp');
      model.player.updateInfo(model.player.rect.x, model.player.rect.y, `node Id: ${model.player.currentNode.ID}` + '\n' + nodeEdges);
    });

    delegate.render(model.gameElements);
  };

  nodesCreate = () => {
    scene.map.forEach((el) => {
      let graphic = new PIXI.Graphics();
      graphic.beginFill(0x346123);
      graphic.drawCircle(el.position.x, el.position.y, 1);
      graphic.endFill(); //? What is this used for in PIXI.js ?
      graphic.interactive = true;
      graphic.buttonMode = true;
      graphic.ID = el.id;
      graphic.EDGES = el.edges;
      // graphic.anchor.set(0.5); //* WHY THIS DOESN'T WORK?
      graphic.on('click', () => console.log(el));
      model.nodes.push(graphic);
      app.stage.addChild(graphic);
    });
  };

  addBackground = () => {
    let { backGround } = this;
    backGround = PIXI.Sprite.from(assetsLoader.SHEETS.background);
    backGround.anchor.set(0.5);
    backGround.position.x = app.view.width / 2;
    backGround.position.y = app.view.height / 2;
    backGround.scale.x = 2.75;
    backGround.scale.y = 2.75;
    // this.backGround = backGround; 
    app.stage.addChild(backGround);
  };

};
