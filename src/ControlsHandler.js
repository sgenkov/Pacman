import { model } from './index';
import scene from './scene.json';

const disabled = false; //^ Debug mode
export const onKeyDown = ({ keyCode }, behaviours) => {
  // console.log('Key Down', keyCode);
  let { keyBindings } = scene;
  // const player = model.player;
  if(keyCode === 88) debugger;
  // model.gameElements.forEach(el => { //* No need to iterate over the whole gameElements
  //   el.behaviours.forEach(b => {
    //     if (keyBindings[b] && keyBindings[b][keyCode]) {
      //       keyBindings[b][keyCode].forEach(bb => {
        //         behaviours[bb](el)
        //       })
        //     }
        //   })
        // });
        
        model.player.nextAction = scene.keyBindings.player1[keyCode][0];
        model.player.allowedDirections.length = 0;
        model.player.allowedDirections.push(scene.keyBindings.player1[keyCode][1]);
        // console.log('player nextAction assigned : ', model.player.nextAction);
        //TODO: Add protection against foreign buttons pressed
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