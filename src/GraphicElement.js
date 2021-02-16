import * as PIXI from 'pixi.js';
import { assetsLoader } from "./index";
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
      this.sheet = new PIXI.AnimatedSprite([
        assetsLoader.SHEETS.pacmanR1,
        assetsLoader.SHEETS.pacmanR2,
        assetsLoader.SHEETS.pacman3,
      ]);
      // this.sheet.scale.x = -1; //* this works well
      // this.sheet.angle = -90;
      // console.log('sheet', this.sheet);
      this.sheet.anchor.set(0.5);
      this.sheet.animationSpeed = 0.2;
      this.sheet.loop = true;
      this.sheet.NAME = this.name; //* future use   
      // this.sprite.STATE = el.state; //* future use

    } else if (this.name === "ghost") {
      throw new Error("Ghost not implemented!");
    } else {
      throw new Error("GraphicElement.js : unknown graphic type");
    };
  };
};
