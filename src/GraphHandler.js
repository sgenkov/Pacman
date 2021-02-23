import { map } from './scene.json';
import { app, model } from './index';
import * as PIXI from 'pixi.js';
import Graph from 'node-dijkstra';
export default class GraphHandler {
  constructor() {
    this.nodesCreate();
    this.maze = this.createGraph();
    console.log(this.maze);
    console.log(this.calculateShortestPath('2', 8));
  };

  createGraph = () => {
    const maze = new Graph();
    // maze.addNode('B', { A: 1, C: 2, D: 4, E: 4 });
    map.forEach(node => {
      let neighbours = {};
      for (let edge in node.edges) {
        const targetPosition = map.find(el => el.id === node.edges[edge]).position;
        neighbours = {
          ...neighbours,
          [node.edges[edge]]: Math.sqrt(Math.pow(node.position.x - targetPosition.x, 2) + Math.pow(node.position.y - targetPosition.y, 2)) //TODO: Try if this works without SQRT
        };
        console.log(neighbours);
      }
      maze.addNode(node.id, neighbours);
    });
    return maze;
  };

  calculateShortestPath = (from, to) => {
    return this.maze.path(from, to);
  };

  nodesCreate = () => {
    map.forEach((el) => {
      let graphic = new PIXI.Graphics();
      graphic.beginFill(0x346123);
      graphic.drawCircle(el.position.x, el.position.y, 5); //TODO: Turn back the 3-th param to 1
      graphic.endFill(); //? What is this used for in PIXI.js ?
      graphic.interactive = true;
      graphic.buttonMode = true;
      graphic.ID = el.id;
      graphic.EDGES = el.edges;
      // graphic.anchor.set(0.5); //* WHY THIS DOESN'T WORK?
      graphic.on('click', () => console.log(el));
      model.nodes.push(graphic);
      app.stage.addChild(graphic);
    });
  };
};