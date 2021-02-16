import { app } from './index';
import * as PIXI from 'pixi.js';
import sheetSource from './pacmanSheet.json';
import { assets } from './scene.json';
import DC from './debugConfig.json';

class GameAssetsLoader {

    constructor() {
        this.SHEETS = {};
    };

    loadAssets = () => {
        app.loader.baseUrl = "./assets";
        assets.forEach(asset => app.loader.add(asset[0], asset[1]));

        app.loader.onProgress.add(this.showProgress);
        app.loader.onComplete.add(() => this.doneLoading(app));
        app.loader.onError.add(this.reportError);

        app.loader.load();
        app.stage.interactive = true; //TODO: Examine this. What it does? It shouldn't be in this place
    };

    showProgress = (e) => {
        DC.assetsLoading && console.log(e.progress);
    };
    reportError = (e) => {
        console.log('ERROR : ' + e.message);
    };

    doneLoading = () => {
        DC.assetsLoading && console.log('DONE LOADING!!!');
        this.createSheets();
    };

    createSheets = () => {
        let baseSheet = new PIXI.BaseTexture.from(app.loader.resources["pacmanSheet"].url);
        for (let key in sheetSource.frames) {
          const { x, y, w, h } = sheetSource.frames[key].frame;
          this.SHEETS[key.split('.')[0]] = new PIXI.Texture(baseSheet, new PIXI.Rectangle(x, y, w, h));
        };
      };

};

export default new GameAssetsLoader();