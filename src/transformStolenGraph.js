const fs = require('fs');
const targetFile = './scene.json';
const sourceFile = './sceneBackup.json';
const file = require(sourceFile);


// console.log(file.map);
const newMap = file.map.map(({id, x, y, ...rest}) => {
    return {
        "id": id,
        "position": {
            "x": x + 3,
            "y": y + 3
        },
        "edges" : {
            ...rest
        }
    };
});
// console.log(newMap);
file.map = newMap;
function writeJSON(err) {
    if (err) return console.log(err);
    console.log('writing to ' + targetFile);
};

fs.writeFile(targetFile, JSON.stringify(file, null, 2), writeJSON);