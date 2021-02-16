import { onKeyDown, onKeyUp } from './ControlsHandler';
import { app, model } from './index';
import CommonBehaviours from './CommonBehaviours';
import GameElementFactory from './GameElementFactory';
import DC from './debugConfig.json'; // ^FLOW
import scene from './scene.json';
import * as PIXI from 'pixi.js';
import GameAssetsLoader from './GameAssetsLoader';
import { deleteThis } from './scene.json';
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
    this.behaviours = new CommonBehaviours(this.factory).commonBehaviours;
    model.assignPlayer(this.factory.getUnit("player"));
    document.addEventListener("keydown", (e) => onKeyDown(e, this.behaviours));
    document.addEventListener("keyup", (e) => onKeyUp(e));
    this.addBackground();
    DC.verticesPreview && this.verticesPreview();
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

    this.delegate.render(model.gameElements);
  };

  verticesPreview = () => {
    const output = scene.map.map((el) => {
      let graphic = new PIXI.Graphics();
      graphic.beginFill(0x346123);
      graphic.drawCircle(el.position.x, el.position.y, 5);
      graphic.endFill(); //? What is this used for in PIXI.js ?
      graphic.interactive = true;
      graphic.buttonMode = true;
      // graphic.anchor.set(0.5); //* WHY THIS DOESN'T WORK?
      graphic.on('click', () => console.log(el));
      app.stage.addChild(graphic);
    });
  };

  addBackground = () => {
    let { backGround } = this;
    backGround = PIXI.Sprite.from(GameAssetsLoader.SHEETS.background);
    backGround.anchor.set(0.5);
    backGround.position.x = app.view.width / 2;
    backGround.position.y = app.view.height / 2;
    backGround.scale.x = 2.75;
    backGround.scale.y = 2.75;
    this.backGround = backGround;
    app.stage.addChild(backGround);
  };

};
