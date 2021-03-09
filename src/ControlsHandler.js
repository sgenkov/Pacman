import { model } from './index';
import scene from './config/scene.json';

const disabled = false; //^ Debug mode
export const onKeyDown = ({ keyCode }, behaviours) => {
  // console.log('Key Down', keyCode);
  let { keyBindings } = scene;
  if ( keyCode === 88 ) debugger;
  if (isUndefinedKey(keyBindings, keyCode)) return; //* BEWARE THE KEY PROTECTION!

  model.gameElements.forEach( gameElement => {
    if (gameElement.name !== "pacman") return;
    gameElement.nextAction = scene.keyBindings.player1[keyCode][0];
    gameElement.allowedDirections.length = 0;
    gameElement.allowedDirections.push(scene.keyBindings.player1[keyCode][1]);
  });
};

export const onKeyUp = ({ keyCode }) => {
  // console.log("Key Up", keyCode);
  const player = model.player;
  if (disabled) return; //^ DEBUGGING

  let { keyBindings } = scene;
  // player.behaviours.forEach(b => {
  //   if (keyBindings[b] && keyBindings[b][keyCode]) {
  //     player.behaviours.push("stop");
  //   };
  // });
};

const isUndefinedKey = (keyBindings, keyCode) => {
  let escape = true;
  for (let key in keyBindings.player1) {
    if (+key === keyCode) {
      escape = false;
      break;
    };
  };
  return escape;
};  