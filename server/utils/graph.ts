import { bFS, dFS, dFSShortest } from "./path-finding-algo";

export type value = string | number;
export class Graph {
  vertices: value[] = []; // ! Vertices must be unique
  edges: [value, value, number][] = []; 

  addVertex (value: value) {
    
    if (!this.vertices.includes(value)) {
      this.vertices.push(value);
      return true;
    }
    return false;
  }

  addEdge (valueX: value, valueY: value,  weight: number = 1, directed: boolean = false) {
    if (!this.vertices.includes(valueX) || !this.vertices.includes(valueY)) return false;
    if (this.edges.some(edge => edge[0] === valueX && edge[1] === valueY && edge[2] === weight)) return false;
    this.edges.push([valueX, valueY, weight]);
    if (!directed && valueX != valueY) this.edges.push([valueY, valueX, weight]);
    return true;
  }

  removeEdge (valueX: value, valueY: value) {
    if (!this.vertices.includes(valueX) || !this.vertices.includes(valueY)) return false;
    this.edges = this.edges.filter(edge => !(edge[0] === valueX && edge[1] === valueY));
  }

  getEdgeValue (valueX: value, valueY: value) {
    if (!this.vertices.includes(valueX) || !this.vertices.includes(valueY)) return false;
    let edge = this.edges.filter(edge => (edge[0] === valueX && edge[1] === valueY));
    if (edge.length === 1) return edge[0][2];
    return false;
  }
  
  removeVertex (valueX: value) {
    if (!this.vertices.includes(valueX)) return false;
    this.vertices = this.vertices.filter(vertex => vertex !== valueX);
    this.edges = this.edges.filter(edge => !(edge[0] === valueX || edge[1] === valueX));
    return true;
  }

  adjacent (valueX: value, valueY: value) {
    if (!this.vertices.includes(valueX) || !this.vertices.includes(valueY)) return false;
    return this.edges.some(edge => edge[0] === valueX && edge[1] === valueY);
  }

  neighbors (valueX: value) {
    let out: value[] = [];
    this.edges.forEach(edge => {
      if (edge[0] === valueX) out.push(edge[1]);
    });
    return out;
  }



  isConnected () {
    for (let vertex1 of this.vertices) {
      for (let vertex2 of this.vertices) {
        if (!this.findPath(vertex1, vertex2)) {
          return false;
        }
      }
    }
    return true;
  }

  findPath (valueX: value, valueY: value, method = 'dfs') {
    if (!this.vertices.includes(valueX) || !this.vertices.includes(valueY)) return false;
    let path;
    if (valueX === valueY) return true;
    switch (method) {
    case 'bfs':
      path = bFS(valueX, valueY, this);
      break;
    case 'dfsShort':
      path = dFSShortest(valueX, valueY, this);
      break;
    default:
      path = dFS(valueX, valueY, this);
      break;
    }
    if (path) return path;
    return false;
  }
}

