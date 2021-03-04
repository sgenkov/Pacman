import { map } from './scene.json';
import { app, model } from './index';
import * as PIXI from 'pixi.js';
import Graph from 'node-dijkstra';
export default class GraphHandler {
  constructor() {
    this.maze = this.createGraph();
  };

  createGraph = () => {
    const maze = new Graph();
    map.forEach(node => {
      let neighbours = {};
      for (let edge in node.edges) {
        const targetPosition = map.find(el => el.id === node.edges[edge]).position;
        neighbours = {
          ...neighbours,
          [node.edges[edge]]: Math.sqrt(Math.pow(node.position.x - targetPosition.x, 2) + Math.pow(node.position.y - targetPosition.y, 2)) //TODO: Try if this works without SQRT
        };
      };
      maze.addNode(`${node.id}`, neighbours);
    });
    return maze;
  };

  calculateShortestPath = (from, to) => {
    return this.maze.path(`${from}`, `${to}`)?.map(el => +el);
  };

  nodesCreate = () => {
    map.forEach((el) => {
      let graphic = new PIXI.Graphics();
      const color = 0xffffff;
      graphic.beginFill(color);
      graphic.drawCircle(el.position.x, el.position.y, 5); //TODO: Turn back the 3-th param to 1
      graphic.endFill(); //? What is this used for in PIXI.js ?
      graphic.interactive = true;
      graphic.buttonMode = true;
      graphic.ID = el.id; 
      graphic.EDGES = el.edges;
      graphic.on('click', () => console.log(el));
      model.nodes.push(graphic);
    });
    app.stage.addChild(...model.nodes);
  };
};