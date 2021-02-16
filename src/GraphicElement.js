import * as PIXI from 'pixi.js';
import GameAssetsLoader from "./GameAssetsLoader";
import DC from './debugConfig.json';

export default class GraphicElement {
  constructor(el) {
    // console.log('el rect', el.rect);
    this.name = el.name;
    this.sheet = null;
    this.createSprite(el);
  };

  createSprite = (el) => {
    if (this.name === "pacman") {
      DC.objectsCreation && console.log('New GraphicElement created'); //^ FLOW
      // this.sheet = new PIXI.Sprite.from(GameAssetsLoader.SHEETS["player"]);
      // console.log(GameAssetsLoader.SHEETS);
      this.sheet = new PIXI.AnimatedSprite([
        GameAssetsLoader.SHEETS.pacmanR1,
        GameAssetsLoader.SHEETS.pacmanR2,
        GameAssetsLoader.SHEETS.pacman3,
      ]);
      // this.sheet.scale.x = -1; //* this works well
      // this.sheet.angle = -90;
      // console.log('sheet', this.sheet);
      this.sheet.anchor.set(0.5);
      this.sheet.animationSpeed = 0.2;
      this.sheet.loop = true;
      // this.sheet.play();
      this.sheet.NAME = this.name; //* future use   
      // this.sprite.STATE = el.state; //* future use

    } else if (this.name === "ghost") {
      throw new Error("Ghost not implemented!");
    } else {
      throw new Error("GraphicElement.js : unknown graphic type");
    };
  };
};
