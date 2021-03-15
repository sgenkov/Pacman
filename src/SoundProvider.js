import { Howl } from "howler";
import { truncate } from "lodash";

export class SoundProvider {
    constructor() {
        this.eatDot = new Howl({
            src: ['../sound/eatDot.wav'],
            volume: 0.5,
            loop: true
        });

        this.eatGhost = new Howl({
            src: ['../sound/eatGhost.wav'],
            volume: 1,
        });

        // this.mainMenu = new Howl({
        //     src: ['../assets/MAINMENU.MP3'],
        //     volume: 0.5,
        // });

        // this.winBattle = new Howl({
        //     src: ['../assets/WinBattle.mp3'],
        //     volume: 0.5,
        // });

        // this.loseBattle = new Howl({
        //     src: ['../assets/LoseCombat.mp3'],
        //     volume: 0.5,
        // });
    }

};