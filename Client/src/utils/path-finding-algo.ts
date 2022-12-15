import { Graph, value } from "./graph";

export function getDirection(valueX: number, valueY: number, width:number): {
  xPos: -1 | 0 | 1,
  yPos: -1 | 0 | 1,
  rotation: 'minionL' | 'minionR' | 'minionD' | 'minionU'
} {
  if (valueX - valueY === 1) return {xPos: -1, yPos: 0, rotation: 'minionL'};
  if (valueX - valueY === -1) return {xPos: 1, yPos: 0, rotation: 'minionR'};
  if (valueX - valueY === width) return {xPos: 0, yPos: -1, rotation: 'minionD'};
  return {xPos: 0, yPos: 1, rotation: 'minionU'};
}

export function dFSShortest (valueX: value, valueY: value, graph: Graph, path = [valueX]) { // TODO: Will we ever use this?
  let paths: value[][] = [];
  let neighbors = graph.neighbors(valueX);
  if (neighbors.includes(valueY)) return path.concat([valueY]);
  for (let neighbor of neighbors) {
    if (path.includes(neighbor)) continue;
    let search = dFSShortest(neighbor, valueY, graph, path.concat(neighbor));
    if (search) paths.push(search);
  }
  if (paths.length) {
    const shortestPath = paths.reduce((acc, path) => path.length < acc.length ? path : acc);
    return shortestPath;
  }
  return false;
}

export function dFS (valueX: value, valueY: value, graph: Graph, path = [valueX]): (false | value[]) {
  let neighbors = graph.neighbors(valueX);
  if (neighbors.includes(valueY)) return path.concat([valueY]);
  let shuffledNeighbors = Array(neighbors.length).fill(null);
  for (let i = 0; i < shuffledNeighbors.length; i++) {
      let index = Math.floor(Math.random() * shuffledNeighbors.length);
      while (shuffledNeighbors[index] !== null) {
          index = Math.floor(Math.random() * shuffledNeighbors.length);
      }
      shuffledNeighbors[index] = neighbors[i];
  }
  for (let neighbor of shuffledNeighbors) {
    if (path.includes(neighbor)) continue;
    let search = dFS(neighbor, valueY, graph, path.concat(neighbor));
    if (search) return search;
  }
  return false;
}

export function vDFS (valueX: value, valueY: value, graph: Graph) {
  let set = new Set<value>();
  console.log('hello')
  let stack: [value, Set<value>][] = [[valueX, set]];
  let thoughtProcess: value[] = [];
  let visited: {[key: value]: boolean} = {[valueX]: true};
  while (stack.length) {
    let [neighbor, path] = stack.pop() as [value, Set<value>];
    if (neighbor === valueY) return {visited: thoughtProcess, path: Array.from(path)}
    thoughtProcess.push(neighbor);
    for (let nextNeighbor of graph.neighbors(neighbor)) {
      if (visited[nextNeighbor]) continue;
      visited[nextNeighbor] = true;
      let newPath = new Set(path);
      newPath.add(nextNeighbor);
      stack.push([nextNeighbor, newPath]);
    }
  }
  return false;
}

export function bFS (valueX: value, valueY: value, graph: Graph) {
  let set = new Set<value>();
  let neighbors: [value, Set<value>][] = [[valueX, set]];
  let visited: {[key: value]: boolean} = {};
  for (let i = 0; i < neighbors.length; i++) {
    let neighbor = neighbors[i][0];
    let path = neighbors[i][1];
    if (neighbor === valueY) {
      return path.values();
    }
    for (let nextNeighbor of graph.neighbors(neighbor)) {
      if (visited[nextNeighbor]) continue;
      visited[nextNeighbor] = true;
      let newPath = new Set(path);
      newPath.add(nextNeighbor);
      neighbors.push([nextNeighbor, newPath]);

    }
  }
  return false;
}

export function vBFS(valueX: value, valueY: value, graph: Graph) {
  const thoughtProcess: value[] = [];
  function modifiedBFS (valueX: value, valueY: value, graph: Graph) {
    let set = new Set<value>();
    let neighbors: [value, Set<value>][] = [[valueX, set]];
    let visited: {[key: value]: boolean} = {};
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i][0];
      let path = neighbors[i][1];
      if (neighbor === valueY) {
        return path.values();
      }
      for (let nextNeighbor of graph.neighbors(neighbor)) {
        if (visited[nextNeighbor]) continue;
        thoughtProcess.push(nextNeighbor);
        visited[nextNeighbor] = true;
        let newPath = new Set(path);
        newPath.add(nextNeighbor);
        neighbors.push([nextNeighbor, newPath]);
  
      }
    }
    return false;
  }
  const path = modifiedBFS(valueX, valueY, graph);

  if (path === false) return false;
  return {visited: thoughtProcess, path: Array.from(path)};
}

export function vDijk (valueX: number, valueY: number, graph: Graph) {
  const visited: Set<number> = new Set();
  let unvisitedNodes: Map<number, [number, number | null]> = new Map();
  let visitedNodes: Map<number, [number, number]> = new Map();
  let nNodes = graph.vertices.length;
  for (let vertex of graph.vertices as number[]) {
    if (vertex === valueX) unvisitedNodes.set(vertex, [0, null]);
    else unvisitedNodes.set(vertex, [Infinity, null]);
  }
  for (let i = 0; i < nNodes; i++) {
    let currentNode: [number, [number, number | null]] = [-1, [Infinity, -1]];
    unvisitedNodes.forEach((value, key) => {
      if (value[0] < currentNode[1][0]) currentNode = [key, value];
    })
    visited.add(currentNode[0]);
    if (currentNode[0] === valueX) {
      visitedNodes.set(currentNode[0], [currentNode[1][0], -1]);
    } else {
      visitedNodes.set(currentNode[0], currentNode[1] as [number, number]);
    }
    if (currentNode[0] === valueY) break;
    if (currentNode[1][0] === Infinity) return false;
    let neighbors = graph.neighbors(currentNode[0]).map(neighbor => Number(neighbor));
    for (let neighbor of neighbors) {
      if (visited.has(neighbor)) continue;
      let weight = graph.getEdgeValue(currentNode[0], neighbor);
      let sum = currentNode[1][0] + (weight as number);
      let neighborCurrent = unvisitedNodes.get(neighbor) as [number, number];
      if (sum < neighborCurrent[0]) unvisitedNodes.set(neighbor, [sum as number, currentNode[0]]);
    }
    unvisitedNodes.delete(currentNode[0]);
  }
  const path = [valueY];
  while(path[0] !== valueX) {
    path.unshift(visitedNodes.get(path[0])![1])
  }
  return {path: path.slice(1), visited: Array.from(visited)}
}

export function distanceConstruct (width: number) {
  return function distance (start: value, end: value) { // TODO: Generalize distance function
    start = Number(start);
    end = Number(end);
    let x = start%width - end%width;
    let y = Math.floor(start/width) - Math.floor(end/width);
    return Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
  }
}
export function distance (start: value, end: value, width: number) { // TODO: Generalize distance function
  start = Number(start);
  end = Number(end);
  let x = start%width - end%width;
  let y = Math.floor(start/width) - Math.floor(end/width);
  return Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
}

export function aStar (valueX: number, valueY: number, graph: Graph, distance: (start:value, end: value) => number, h=10) {
  const visited: Set<number> = new Set();
  let unvisitedNodes: Map<number, [number, number, number | null]> = new Map();
  let visitedNodes: Map<number, [number, number]> = new Map();
  let nNodes = graph.vertices.length;
  for (let vertex of graph.vertices as number[]) {
    if (vertex === valueX) unvisitedNodes.set(vertex, [0, 0, null]);
    else unvisitedNodes.set(vertex, [Infinity, distance(vertex, valueY)*h, null]);
  }
  for (let i = 0; i < nNodes; i++) {
    let currentNode: [number, [number, number, number | null]] = [-1, [Infinity, Infinity, -1]];
    unvisitedNodes.forEach((value, key) => {
      if (value[0] + value[1] < currentNode[1][0] + currentNode[1][1]) currentNode = [key, value];
    })
    visited.add(currentNode[0]);
    if (currentNode[0] === valueX) {
      visitedNodes.set(currentNode[0], [currentNode[1][0], -1]);
    } else {
      visitedNodes.set(currentNode[0], [currentNode[1][0], currentNode[1][2]] as [number, number]);
    }
    if (currentNode[0] === valueY) break;
    if (currentNode[1][0] === Infinity) return false;
    let neighbors = graph.neighbors(currentNode[0]).map(neighbor => Number(neighbor));
    for (let neighbor of neighbors) {
      if (visited.has(neighbor)) continue;
      let weight = graph.getEdgeValue(currentNode[0], neighbor);
      let sum = currentNode[1][0] + (weight as number);
      let neighborCurrent = unvisitedNodes.get(neighbor) as [number, number, number];
      if (sum < neighborCurrent[0]) unvisitedNodes.set(neighbor, [sum as number, neighborCurrent[1],currentNode[0]]);
    }
    unvisitedNodes.delete(currentNode[0]);
  }
  const path = [valueY];
  while(path[0] !== valueX) {
    path.unshift(visitedNodes.get(path[0])![1])
  }
  return {path: path.slice(1), visited: Array.from(visited)}
}