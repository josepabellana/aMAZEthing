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

export function aStar (valueX: value, valueY: value, graph: Graph, distance: (start:value, end: value) => number, h=10) {
  let unvisitedNodes: {[key: value]: [number, number]} = {};
  let visitedNodes = new Map();
  let thoughtProcess: value[] = [];
  for (let vertex of graph.vertices) {
    unvisitedNodes[vertex] = [Infinity, distance(vertex, valueY)*h];
  }
  unvisitedNodes[valueX][0] = 0;
  while (true) {
    let node = Object.keys(unvisitedNodes).reduce((acc, key) => {
      return unvisitedNodes[key][0] + unvisitedNodes[key][1] < (acc[1] as number) + (acc[2] as number) ? [key, unvisitedNodes[key][0], unvisitedNodes[key][1]] : acc;
    }, ['null', Infinity, Infinity]);
    node = [Number(node[0]), Number(node[1])]
    let cost = unvisitedNodes[node[0]][0];
    visitedNodes.set(Number(node[0]), cost);
    delete unvisitedNodes[node[0]];
    if (node[1] === Infinity) return false;
    if (Number(node[0]) === valueY) {
      break;
    };
    if (Number(node[0])!==valueX) thoughtProcess.push(node[0]);
    let neighbors = graph.neighbors(node[0]).filter(neighbor => !visitedNodes.has(neighbor));
    for (let neighbor of neighbors) {
      let weight = graph.getEdgeValue(node[0], neighbor) as number;
      let sum = cost + weight;
      if (sum < unvisitedNodes[neighbor][0]) {
        unvisitedNodes[neighbor] = [sum, unvisitedNodes[neighbor][1]]
      };
    }
  }

  let path: value[] = [valueY];
  let inPath: {[key: value]: boolean} = {valueY:true};
  while (path[path.length-1] !== valueX) {
    let to = path[path.length-1];
    for (let from of graph.neighbors(to)) {
      if (inPath[from]) continue;
      let weight = graph.getEdgeValue(from, to);
      if (weight && visitedNodes.get(to) - weight === visitedNodes.get(from)) {
        path.push(from);
        inPath[from] = true;
        break;
      }
    } 
  }
  path.push(valueX);
  return {
    path: path.map(el=>Number(el)).reverse().slice(2),
    visited: thoughtProcess
  };
}