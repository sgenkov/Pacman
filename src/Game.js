import { onKeyDown, onKeyUp } from './ControlsHandler';
import { app } from './index';
import CommonBehaviours from './CommonBehaviours';
import Pacman from './GameUnits/Pacman';
import GameElementFactory from './GameElementFactory';

export default class Game {
  constructor(delegate) {
    this.name = "play";
    this.delegate = delegate;
    this.score = 0;
  };
  
  init = () => {
    console.log('Game');
    this.factory = new GameElementFactory();
    this.behaviours = new CommonBehaviours(this.factory).commonBehaviours;
    document.addEventListener("keydown", (e) => onKeyDown(e, this.behaviours));
    document.addEventListener("keyup", (e) => onKeyUp(e));
    app.ticker.add(this.gameTicker);
  };

  deInit = () => {
    document.removeEventListener("keyup", onKeyUp);
    document.removeEventListener("keydown", onKeyDown);
  };

  gameTicker = () => {
    // delegate.render(Model.gameElements);
  };

};
