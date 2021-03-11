import { map } from './config/scene.json';
import { app, model } from './index';
import * as PIXI from 'pixi.js';
import Graph from 'node-dijkstra';
import DC from './config/debugConfig.json';
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

  calculateLongestPath = (ghost, pacman) => {
    // console.log(ghost);
    let longestPath = 0; //todo: try with null

    for (let i = 0; i < this.maze.graph.size; ++i) {
      const currentPath = this.maze.path(`${ghost}`, `${i}`, { cost: true });
      if (currentPath.cost > longestPath) longestPath = currentPath.path.map(el => +el);
    };
    // console.log(longestPath);
    return longestPath;
  };

  nodesCreate = () => {
    map.forEach((el) => {
      let graphic = new PIXI.Graphics();
      graphic.beginFill(0xffffff);
      graphic.drawCircle(el.position.x, el.position.y, DC.nodesInteractive?5:0); //TODO: Turn back the 3-th param to 1
      graphic.endFill(); //? What is this used for in PIXI.js ?
      DC.nodesInteractive && (graphic.interactive = true); //^ DEBUG
      DC.nodesInteractive && (graphic.buttonMode = true); //^ DEBUG
      graphic.ID = el.id;
      graphic.EDGES = el.edges;
      DC.nodesInteractive && (graphic.on('click', () => console.log(el))); //^ DEBUG
      model.nodes.push(graphic);
    });
    app.stage.addChild(...model.nodes);
  };
};