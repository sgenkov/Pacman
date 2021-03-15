import * as PIXI from 'pixi.js';
import { assetsLoader } from "./index";
import DC from './config/debugConfig.json';

export default class GraphicElement {
  constructor(el) {
    this.name = el.name;
    this.type = el.type;
    this.color = el.color;
    this.sheet = null;
    this.lastMovementDirection = el.lastMovementDirection;
    // this.LAST_MOVEMENT_DIRECTION = el.lastMovementDirection;
    this.unitMap = new Map([
      ["pacman", this.createPacman],
      ["ghost", this.createGhost],
      ["dot", this.createDot],
    ]);
    this.createSprite(el);
  };

  createSprite = (el) => {
    try {
      this.unitMap.get(el.name)(el);
    } catch {
      console.log("UNKNOWN GRAPHIC TYPE!");
    };

  };

  createPacman = (el) => {
    DC.objectsCreation && console.log('New GraphicElement created'); //^ FLOW
    const directionIndex = el.lastMovementDirection[0].toUpperCase();
    this.sheet = new PIXI.AnimatedSprite([
      assetsLoader.SHEETS[`pacman${directionIndex}1`],
      assetsLoader.SHEETS[`pacman${directionIndex}2`],
      assetsLoader.SHEETS.pacman3,
    ]);
    this.sheet.REVERSE = false;
    this.sheet.anchor.set(0.5);
    this.sheet.animationSpeed = 0.2;
    this.sheet.loop = true;
  };

  createGhost = (el) => {
    DC.objectsCreation && console.log('New GraphicElement created'); //^ FLOW
    let directionIndex = el.lastMovementDirection[0].toUpperCase();
    if (el.state === "scared") {
      this.sheet = new PIXI.AnimatedSprite([
        assetsLoader.SHEETS[`ghost_scared1`],
        assetsLoader.SHEETS[`ghost_scared2`],
      ]);
      this.sheet.REVERSE = true;
    } else if (el.state === "eaten") {
      
      this.sheet = new PIXI.AnimatedSprite([
        assetsLoader.SHEETS[`eyes_D`],
      ]);
    } else {
      if (directionIndex === "L") {
        directionIndex = "R";
        this.sheet = new PIXI.AnimatedSprite([
          assetsLoader.SHEETS[`ghost_${el.color}_${directionIndex}1`],
          assetsLoader.SHEETS[`ghost_${el.color}_${directionIndex}2`],
        ]);
        this.sheet.REVERSE = true;
      } else {
        this.sheet = new PIXI.AnimatedSprite([
          assetsLoader.SHEETS[`ghost_${el.color}_${directionIndex}1`],
          assetsLoader.SHEETS[`ghost_${el.color}_${directionIndex}2`],
        ]);
        this.sheet.REVERSE = false;
      };
    };
    this.sheet.anchor.set(0.5);
    this.sheet.animationSpeed = 0.2;
    // this.sheet.scale.x = 4 //? Why this doesn't work?
    this.sheet.loop = true;
    this.sheet.NAME = this.name;
  };

  createDot = (el) => {
    this.sheet = new PIXI.AnimatedSprite([
      assetsLoader.SHEETS[`${el.type}Dot`]
    ]);
    this.sheet.anchor.set(0.5);
  };

};
