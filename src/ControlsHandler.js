import { model } from './index';
import scene from './scene.json';

const disabled = false; //^ Debug mode
export const onKeyDown = ({ keyCode }, behaviours) => {
  // console.log('Key Down', keyCode);
  let { keyBindings } = scene;
  const player = model.player;
  
  // model.gameElements.forEach(el => { //* No need to iterate over the whole gameElements
  //   el.behaviours.forEach(b => {
  //     if (keyBindings[b] && keyBindings[b][keyCode]) {
  //       keyBindings[b][keyCode].forEach(bb => {
  //         behaviours[bb](el)
  //       })
  //     }
  //   })
  // });

    player.behaviours.forEach(b => {
      if (keyBindings[b] && keyBindings[b][keyCode]) {
        keyBindings[b][keyCode].forEach(bb => {
          behaviours[bb](player)
        })
      }
    })
};

export const onKeyUp = ({ keyCode }) => {
  // console.log("Key Up", keyCode);
  const player = model.player;
  if (disabled) return; //^ DEBUGGING

  let { keyBindings } = scene;
  player.behaviours.forEach(b => {
      if (keyBindings[b] && keyBindings[b][keyCode]) { 
        player.behaviours.push("stop");
      };
    });
};