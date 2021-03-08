import Vector from '../Vector';
export const colide = (rect1, rect2) => {
    // console.log(rect1, rect2);
    return (rect1.x < rect2.x + rect2.width
        && rect1.x + rect1.width > rect2.x
        && rect1.y < rect2.y + rect2.height
        && rect1.y + rect1.height > rect2.y)
};

export const colideWithCircle = (node, unit) => {
    if (node.vertexData === null) return;
    const dx = node.vertexData[0] - unit.rect.x;
    const dy = node.vertexData[1] - unit.rect.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < node.width / 2 + unit.radius);
};

export const binaryReprezentation = [
    "player",
    "ghost",
].reduce((map, key, index) => {
    return {
        ...map,
        [key]: 1 << index,
    }
}, {});

export const defaultGameElement = {
    behaviours: [],
};

let INDEX = 0;
export const getIndex = () => {
    return INDEX++;
};

export const getSpeed = (el, target) => {
    let dx = target.x - el.rect.x;
    let dy = target.y - el.rect.y;

    let c = Math.sqrt(
        Math.pow(dx, 2)
        + Math.pow(dy, 2)
    );

    let speed = new Vector(
        dx / c * el.velocity,
        dy / c * el.velocity
    );
    return speed;
};

export const possibleMove = (edges, direction) => {
    // console.log(edges);
    return Object.keys(edges).includes(direction);
};