import { onKeyDown, onKeyUp } from './ControlsHandler';
import { app, model } from './index';
import CommonBehaviours from './CommonBehaviours';
import GameElementFactory from './GameElementFactory';
import DC from './debugConfig.json'; // ^FLOW
import scene from './scene.json';
import * as PIXI from 'pixi.js';
import { assetsLoader } from './index';
import { colideWithCircle } from './utils';
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
    this.behaviours = new CommonBehaviours().commonBehaviours;
    model.assignPlayer(this.factory.getUnit("player"));
    document.addEventListener("keydown", (e) => onKeyDown(e, this.behaviours));
    document.addEventListener("keyup", (e) => onKeyUp(e));
    this.addBackground();
    this.verticesCreate();
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

    model.vertices.forEach(vertex => {
      if (colideWithCircle(vertex, model.player)) {
        //? What next?
        let vertexEdges = '';
        for (let edge in vertex.EDGES) {
            vertexEdges += edge + ' : ' + vertex.EDGES[edge] + '\n';
        };
        model.player.currentVertex = vertex;
        model.player.updateInfo(`vertex Id: ${vertex.ID}` + '\n' + vertexEdges);
      } else {
        // model.player.currentVertex = null;
      };
    });

    delegate.render(model.gameElements);
  };

  verticesCreate = () => {
    scene.map.forEach((el) => {
      let graphic = new PIXI.Graphics();
      graphic.beginFill(0x346123);
      graphic.drawCircle(el.position.x, el.position.y, 10);
      graphic.endFill(); //? What is this used for in PIXI.js ?
      graphic.interactive = true;
      graphic.buttonMode = true;
      graphic.ID = el.id;
      graphic.EDGES = el.edges;
      // graphic.anchor.set(0.5); //* WHY THIS DOESN'T WORK?
      graphic.on('click', () => console.log(el));
      model.vertices.push(graphic);
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
