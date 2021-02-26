import { model } from './index';
import scene from './scene.json';

const disabled = false; //^ Debug mode
export const onKeyDown = ({ keyCode }, behaviours) => {
  // console.log('Key Down', keyCode);
  let { keyBindings } = scene;
  if ( keyCode === 88 ) debugger;
  if (isUndefinedKey(keyBindings, keyCode)) return; //* BEWARE THE KEY PROTECTION!

  // scene.keyBindings.player1[keyCode] &&

  // model.player.nextAction = scene.keyBindings.player1[keyCode][0];
  // model.player.allowedDirections.length = 0;
  // model.player.allowedDirections.push(scene.keyBindings.player1[keyCode][1]);

  model.gameElements.forEach( gameElement => {
    gameElement.nextAction = scene.keyBindings.player1[keyCode][0];
    gameElement.allowedDirections.length = 0;
    gameElement.allowedDirections.push(scene.keyBindings.player1[keyCode][1]);
  });
  // console.log(scene.keyBindings.player1[keyCode][1]);
  // console.log('player nextAction assigned : ', model.player.nextAction);
  // if (model.player.allowedDirections.includes(scene.keyBindings.player1[keyCode][1])) {
  // console.log('true');
  // model.player.behaviours.forEach(b => {
  // if (keyBindings[b] && keyBindings[b][keyCode][0]) {
  // console.log(keyBindings[b][keyCode][0]);
  // console.log('TRUE');
  // console.log('keyBindings[b][keyCode][0]', keyBindings[b][keyCode]);
  // keyBindings[b][keyCode][0].forEach(bb => {
  //   behaviours[bb](model.player);
  // });
  // behaviours[keyBindings[b][keyCode][0]](model.player);

  // };
  // });
  // };
  // player.behaviours.forEach(b => {
  //   if (keyBindings[b] && keyBindings[b][keyCode]) {
  //     keyBindings[b][keyCode].forEach(bb => {
  //       behaviours[bb](player);
  //     });
  //   };
  // });
};

export const onKeyUp = ({ keyCode }) => {
  // console.log("Key Up", keyCode);
  const player = model.player;
  if (disabled) return; //^ DEBUGGING

  let { keyBindings } = scene;
  player.behaviours.forEach(b => {
    if (keyBindings[b] && keyBindings[b][keyCode]) {
      // player.behaviours.push("stop");
    };
  });
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