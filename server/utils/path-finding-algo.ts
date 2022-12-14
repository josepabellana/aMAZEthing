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
  for (let neighbor of neighbors) {
    if (path.includes(neighbor)) continue;
    let search = dFS(neighbor, valueY, graph, path.concat(neighbor));
    if (search) return search;
  }
  return false;
}

export function vDFS (valueX: value, valueY: value, graph: Graph) {
  const visited: value[] = [];
  function modifiedDFS (valueX: value, valueY: value, graph: Graph, path = [valueX]): (false | value[]) {
    visited.push(valueX);
    let neighbors = graph.neighbors(valueX);
    if (neighbors.includes(valueY)) return path.concat([valueY]);
    for (let neighbor of neighbors) {
      if (path.includes(neighbor)) continue;
      let search = modifiedDFS(neighbor, valueY, graph, path.concat(neighbor));
      if (search) return search;
    }
    return false;
  }
  const path = modifiedDFS(valueX, valueY, graph);
  if (path === false) return false;
  return { path, visited };
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

export function dijkstra (valueX: value, valueY: value, graph: Graph) {
  let unvisitedNodes: {[key: value]: number} = {};
  let visitedNodes: {[key: value]: number} = {};
  for (let vertex of graph.vertices) {
    if (vertex === valueX) unvisitedNodes[valueX] = 0;
    else unvisitedNodes[vertex] = Infinity;
  }
  while (Object.keys(unvisitedNodes).length) {
    let node = Object.keys(unvisitedNodes).reduce((acc, key) => {
      return unvisitedNodes[key] < acc[1] ? [key, unvisitedNodes[key]] : acc;
    }, ['null', Infinity]);
    visitedNodes[node[0]] = unvisitedNodes[node[0]];
    if (node[0] === valueY) break;
    if (node[1] === Infinity) return false;
    let neighbors = graph.neighbors(node[0]);
    for (let neighbor of neighbors) {
      let weight = graph.getEdgeValue(node[0], neighbor);
      let sum = unvisitedNodes[node[0]] + (weight as number);
      if (sum < unvisitedNodes[neighbor]) unvisitedNodes[neighbor] = sum;
    }
    delete unvisitedNodes[node[0]];
  }
  
  let keys = Object.keys(visitedNodes).reverse();
  let path = [keys[0]];
  for (let i = 0; i < keys.length; i++) {
    let to = path[path.length-1];
    for (let j = i; j < keys.length; j++) {
      let from = keys[j];
      let weight = graph.getEdgeValue(from, to);
      if (weight) {
        if (visitedNodes[to] - weight === visitedNodes[from]) {
          path.push(from);
          i = j;
        }
      }
    }
  }
  return path.reverse().map(el=>Number(el));
}


export function vDijkstra(valueX: value, valueY: value, graph: Graph) {
  const visited: value[] = [];
  function modifiedDijkstra (valueX: value, valueY: value, graph: Graph) {
    let unvisitedNodes: {[key: value]: number} = {};
    let visitedNodes: {[key: value]: number} = {};
    for (let vertex of graph.vertices) {
      if (vertex === valueX) unvisitedNodes[valueX] = 0;
      else unvisitedNodes[vertex] = Infinity;
    }
    while (Object.keys(unvisitedNodes).length) {
      let node = Object.keys(unvisitedNodes).reduce((acc, key) => {
        return unvisitedNodes[key] < acc[1] ? [key, unvisitedNodes[key]] : acc;
      }, ['null', Infinity]);
      visitedNodes[node[0]] = unvisitedNodes[node[0]];
      if (node[0] === valueY) break;
      if (node[1] === Infinity) return false;
      visited.push(node[0]);
      let neighbors = graph.neighbors(node[0]);
      for (let neighbor of neighbors) {
        let weight = graph.getEdgeValue(node[0], neighbor);
        let sum = unvisitedNodes[node[0]] + (weight as number);
        if (sum < unvisitedNodes[neighbor]) unvisitedNodes[neighbor] = sum;
      }
      delete unvisitedNodes[node[0]];
    }
    
    let keys = Object.keys(visitedNodes).reverse();
    let path = [keys[0]];
    for (let i = 0; i < keys.length; i++) {
      let to = path[path.length-1];
      for (let j = i; j < keys.length; j++) {
        let from = keys[j];
        let weight = graph.getEdgeValue(from, to);
        if (weight) {
          if (visitedNodes[to] - weight === visitedNodes[from]) {
            path.push(from);
            i = j;
          }
        }
      }
    }
    return path.reverse().map(el=>Number(el));
  }
  const path = modifiedDijkstra(valueX, valueY, graph);
  
  if (path === false) return false;
  return {path, visited};
}

// function distance (start: number, end: number, graph: Graph) { // TODO: Generalize distance function
//   let x = start%graph.width - end%graph.width;
//   let y = Math.floor(start/this.width) - Math.floor(end/this.width);
//   return Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
// }

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
    path: path.map(el=>Number(el)).reverse(),
    visited: thoughtProcess
  };
}