import { Text } from 'pixi.js';
import { app, model, soundProvider } from './index';
import gameStateModel from './GameStateModel';
import * as PIXI from 'pixi.js';
import { assetsLoader } from './index';
import { soundEnabled, mainFlow } from './config/debugConfig.json';
export default class Menu {
    constructor() {
        this.name = "menu";
        this.backGround = null;
    };

    init = () => {
        mainFlow && console.log('Menu.js : MENU INIT'); //^ FLOW
        soundEnabled && soundProvider.mainMenu.play();
        this.render();
    };

    deInit = () => {
        mainFlow && console.log("Menu.js : MENU DEINIT"); //^ FLOW
        // app.stage.removeChild(this.text);
        app.stage.removeChildren()
        this.text.removeListener("pointerdown", this.onClick);
        this.text = null;
    };

    render = () => {
        this.text = new PIXI.Text("New Game", {
            fontSize: 35,
            fill: "#fcc000",
            align: "center",
            stroke: "#ff0d00",
            // fontFamily: "Arcade",
            strokeThickness: 1,
        });
        this.text.anchor.set(0.5);
        // this.text.position.x = app.view.width / 2;
        // this.text.position.y = app.view.height / 2;
        this.text.position.x = app.view.width / 5;
        this.text.position.y = app.view.height / 4;
        this.text.interactive = true;
        this.text.buttonMode = true;

        this.text.style = new PIXI.TextStyle({
            fill: 0xFCC000,
            fontSize:40,
            fontFamily: "Arcade"
        });

        app.stage.addChild(this.text);
        this.text.on("pointerdown", this.onClick);
        app.ticker.add(this.ticker);
    };

    ticker = () => {
        // console.log("menu ticker");
        if (!model.ASSETS_LOADED) return;
        this.addBackground();
        app.ticker.remove(this.ticker)
    };

    onClick = () => {
        gameStateModel.setState({
            currentScreen: "play",
        });
    };

    addBackground = () => {
        let { backGround } = this;
        // console.log(assetsLoader.SHEETS.background);
        backGround = PIXI.Sprite.from(assetsLoader.SHEETS.logo);
        backGround.anchor.set(0.5);
        backGround.position.x = app.view.width / 2;
        backGround.position.y = app.view.height / 2;
        backGround.scale.x = 1;
        backGround.scale.y = 1;
        // this.backGround = backGround; 
        app.stage.addChild(backGround);
    };
};