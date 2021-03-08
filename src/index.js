import registerServiceWorker from "./registerServiceWorker";
import { Application } from "pixi.js";
import StateMachine from "./StateMachine";
import Menu from "./Menu";
import gameStateModel from "./GameStateModel";
import Game from "./Game";
import PixiDelegate from './PixiDelegate';
import GameAssetsLoader from "./GameAssetsLoader";
import DC from './config/debugConfig.json'; // ^FLOW
import Model from './Model';
import GraphHandler from "./GraphHandler";

export const app = new Application({
  // width: window.innerWidth - 15,
  // height: window.innerHeight - 25,
  width: 620,
  height: 680,
  backgroundColor: 0x000000,
});
export const app2 = new Application({ //^ For coordinates tracking
  width: 200,
  height: 200,
  backgroundColor: 0x000000,
});
export const assetsLoader = new GameAssetsLoader();
assetsLoader.loadAssets();
export const model = new Model();
export const graphHandler = new GraphHandler();

document.body.appendChild(app.view);
// document.body.appendChild(app2.view); //^ For coordinates tracking


let screen;
const stateMachine = new StateMachine(
  {
    menu: {
      allowedStates: ["play"],
      init: () => {
        DC.mainFlow && console.log("State machine MENU init"); //^ FLOW
        screen = new Menu();
        screen.init();
      },
      deInit: () => {
        DC.mainFlow && console.log("State machine MENU deinit"); //^ FLOW
        screen.deInit();
        screen = null;
      },
    },
    play: {
      allowedStates: ["menu"],
      init: () => {
        DC.mainFlow && console.log("State machine GAME init"); //^ FLOW
        screen = new Game(new PixiDelegate(app));
        screen.init();
      },
      deInit: () => {
        DC.mainFlow && console.log("State machine GAME deinit"); //^ FLOW
        screen.deInit();
        screen = null;
      },
    },
  },
  "menu"
);

gameStateModel.addEventListener("stateUpdated", (event) => {
  if (event.target.lastChangedProps.some((e) => e == "currentScreen")) {
    DC.mainFlow && console.log(`MainStateMachine switched to : ${gameStateModel.currentScreen}`); //^ FLOW
    stateMachine.setState(gameStateModel.currentScreen);
  };
});


registerServiceWorker();
