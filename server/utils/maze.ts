import { getWeightPositions } from './getWeightPositions';
import { Graph, value } from './graph';

export function generateConnectedGraph(width: number, height: number, weightedGraph:boolean = false, maxWeight = 4, minWeight = 0) {
  const nodeNum = width * height;
  
  const connectedGraph = new Graph();
  for (let i = 0; i < nodeNum; i++) {
    connectedGraph.addVertex(i);
  }
  if(!weightedGraph){
    for (let i = 0; i < nodeNum; i++) {
      if (i > width) connectedGraph.addEdge(i, i - width);
      if (i < nodeNum - width) connectedGraph.addEdge(i, i + width);
      if (i%width > 0) connectedGraph.addEdge(i, i - 1);
      if (i%width < width - 1) connectedGraph.addEdge(i, i + 1);
    }
  } else {
    let rand:number;
    for (let i = 0; i < nodeNum; i++) {
      rand = Math.floor(Math.random()*(maxWeight - minWeight) + minWeight);
      if (i > width && !connectedGraph.getEdgeValue(i, i-width) && rand) connectedGraph.addEdge(i, i - width,rand);
      rand = Math.floor(Math.random()*(maxWeight - minWeight) + minWeight);
      if (i < nodeNum - width && !connectedGraph.getEdgeValue(i, i+width) && rand) connectedGraph.addEdge(i, i + width,rand);
      rand = Math.floor(Math.random()*(maxWeight - minWeight) + minWeight);
      if (i%width > 0 && !connectedGraph.getEdgeValue(i, i-1) && rand) connectedGraph.addEdge(i, i - 1,rand);
      rand = Math.floor(Math.random()*(maxWeight - minWeight) + minWeight);
      if (i%width < width - 1 && !connectedGraph.getEdgeValue(i, i+1) && rand) connectedGraph.addEdge(i, i + 1,rand);
    }
  }
  return connectedGraph;
}

export function resetGraph(graph: Graph, edges: [value, value, number][]) {
  // TODO: reset
}

function generateRandomNumbers() {
  return [Math.floor(Math.random()*8)+2, Math.floor(Math.random()*8)+2, Math.floor(Math.random()*8)+2, Math.floor(Math.random()*8)+2, Math.floor(Math.random()*8)+2, Math.floor(Math.random()*8)+2, Math.floor(Math.random()*8)+2]
}

function addTowers(width: number, height: number, graph: Graph) {
  const midW = Math.floor(width / 2);
  const midH = Math.floor(height / 2);
  const towers: [number, number[]][] = [[midW + midH * width, generateRandomNumbers()]];
  const nTowers = 6;
  // let radius = Math.floor(Math.min(width, height)/3);
  for (let i = 0; i < nTowers; i++) {
    const secondaryRadiusWidth = Math.floor(Math.random() * ((width/6) - 5));
    const secondaryRadiusHeight = Math.floor(Math.random() * ((height/6) - 5));
    const secondaryAngle = 2 * Math.PI * Math.random();
    towers.push(
      [(midW +
        Math.floor((width / 3) * Math.sin((2 * i * Math.PI) / nTowers) + secondaryRadiusWidth*Math.sin(secondaryAngle))) +
        width *
          (midH +
            Math.floor((height / 3) * Math.cos((2 * i * Math.PI) / nTowers) + secondaryRadiusHeight*Math.cos(secondaryAngle))), generateRandomNumbers()]
    );
  }
  for (let tower of towers) {
    graph.removeVertex(tower[0] - 1);
    graph.removeVertex(tower[0] + 1);
    graph.removeVertex(tower[0] - width);
    graph.removeVertex(tower[0] - width - 1);
    graph.removeVertex(tower[0] - width + 1);
    graph.removeVertex(tower[0] - 2 * width);
    graph.removeVertex(tower[0] - 2 * width - 1);
    graph.removeVertex(tower[0] - 2 * width + 1);
  }
  return towers;
}

function addBases(width: number, height: number, graph: Graph) {
  graph.removeVertex(0);
  graph.removeVertex(1);
  graph.removeVertex(2);
  graph.removeVertex(width);
  graph.removeVertex(width + 1);
  graph.removeVertex(width + 2);
  graph.removeVertex(2 * width);
  graph.removeVertex(2 * width + 1);
  graph.removeVertex(2 * width + 2);

  let last = width * height - 1;

  graph.removeVertex(last);
  graph.removeVertex(last - 1);
  graph.removeVertex(last - 2);
  graph.removeVertex(last - width);
  graph.removeVertex(last - width - 1);
  graph.removeVertex(last - width - 2);
  graph.removeVertex(last - 2 * width);
  graph.removeVertex(last - 2 * width - 1);
  graph.removeVertex(last - 2 * width - 2);
}

export function generateMaze(
  width: number,
  height: number,
  weighted: boolean = false,
  chanceWeighted: number = 0,
  graph: Graph | false = false
) {
  if (graph === false) {
    graph = generateConnectedGraph(width, height);
  }
  const nodeNum = width * height;
  const classes: { [key: value]: ('b' | 't' | 'r' | 'l')[] } = {};
  const visited: value[] = [3 * width];
  const stack: value[] = [3 * width];
  const edges: [value, value, number][] = [];
  const towers: [number, number[]][] = addTowers(width, height, graph);
  addBases(width, height, graph);
  while (stack.length) {
    let i = stack.pop() as number;
    let neighbors = graph
      .neighbors(i)
      .filter((neighbor) => !visited.includes(neighbor));
    if (neighbors.length) {
      stack.push(i);
      let neighbor = neighbors[
        Math.floor(Math.random() * neighbors.length)
      ] as number;
      let rand = weighted && Math.floor(Math.random() * chanceWeighted) === 0 ? 5 : 1;
      edges.push([i, neighbor, rand]);
      edges.push([neighbor, i, rand]);
      if (i - neighbor === 1) {
        if (classes[i]) {
          if (!classes[i].includes('l')) classes[i].push('l');
        } else classes[i] = ['l'];
        if (classes[neighbor]) {
          if (!classes[neighbor].includes('r')) classes[neighbor].push('r');
        } else classes[neighbor] = ['r'];
      } else if (i - neighbor === -1) {
        if (classes[i]) {
          if (!classes[i].includes('r')) classes[i].push('r');
        } else classes[i] = ['r'];
        if (classes[neighbor]) {
          if (!classes[neighbor].includes('l')) classes[neighbor].push('l');
        } else classes[neighbor] = ['l'];
      } else if (i - neighbor === width) {
        if (classes[i]) {
          if (!classes[i].includes('t')) classes[i].push('t');
        } else classes[i] = ['t'];
        if (classes[neighbor]) {
          if (!classes[neighbor].includes('b')) classes[neighbor].push('b');
        } else classes[neighbor] = ['b'];
      } else if (neighbor - i === width) {
        if (classes[i]) {
          if (!classes[i].includes('b')) classes[i].push('b');
        } else classes[i] = ['b'];
        if (classes[neighbor]) {
          if (!classes[neighbor].includes('t')) classes[neighbor].push('t');
        } else classes[neighbor] = ['t'];
      }
      stack.push(neighbor);
      visited.push(neighbor);
    }
  }
  graph.edges = edges;
  function conflictWithTowers(towers: [number, number[]][], num: number) {
    for (let towerArr of towers) {
      let tower = towerArr[0]
      if (num >= tower - 2 && num <= tower + 2) return true;
      if (num >= tower + width - 2 && num <= tower + width + 2) return true;
      if (num >= tower - width - 2 && num <= tower - width + 2) return true;
      if (num >= tower - 2 * width - 2 && num <= tower - 2 * width + 2)
        return true;
      if (num >= tower - 3 * width - 2 && num <= tower - 3 * width + 2)
        return true;
    }
    return false;
  }
  for (let j = 0; j < 3 * width; j++) {
    let i = Math.floor(Math.random() * nodeNum);
    while (conflictWithTowers(towers, i)) {
      i = Math.floor(Math.random() * nodeNum);
    }
    if (i > width) {
      graph.removeEdge(i, i-width);
      graph.addEdge(i, i - width);
      if (classes[i]) {
        if (!classes[i].includes('t')) classes[i].push('t');
      } else classes[i] = ['t'];
      if (classes[i - width]) {
        if (!classes[i - width].includes('b')) classes[i - width].push('b');
      } else classes[i - width] = ['b'];
    }
    if (i < nodeNum - width) {
      graph.removeEdge(i, i + width);
      graph.addEdge(i, i + width);
      if (classes[i]) {
        if (!classes[i].includes('b')) classes[i].push('b');
      } else classes[i] = ['b'];
      if (classes[i + width]) {
        if (!classes[i + width].includes('t')) classes[i + width].push('t');
      } else classes[i + width] = ['t'];
    }
    if (i % width > 0) {
      graph.removeEdge(i, i - 1);
      graph.addEdge(i, i - 1);
      if (classes[i]) {
        if (!classes[i].includes('l')) classes[i].push('l');
      } else classes[i] = ['l'];
      if (classes[i - 1]) {
        if (!classes[i - 1].includes('r')) classes[i - 1].push('r');
      } else classes[i - 1] = ['r'];
    }
    if (i % width < width - 1) {
      graph.removeEdge(i, i + 1);
      graph.addEdge(i, i + 1);
      if (classes[i]) {
        if (!classes[i].includes('r')) classes[i].push('r');
      } else classes[i] = ['r'];
      if (classes[i + 1]) {
        if (!classes[i + 1].includes('l')) classes[i + 1].push('l');
      } else classes[i + 1] = ['l'];
    }
  }
  const weightPositions = getWeightPositions(graph, width);
  return {
    graph,
    visited,
    classes,
    towers,
    weightPositions
  };
}

export interface MazeType {
  graph: Graph;
  visited: value[];
  classes: {
      [key: string]: ("b" | "t" | "r" | "l")[];
      [key: number]: ("b" | "t" | "r" | "l")[];
  };
  towers: [number, number[]][];
  weightPositions: {[key: string]: { xPos: number; yPos: number}}
}