import { Graph } from "./graph";

export function getWeightPositions(graph: Graph, width: number) {
  const edges = graph.edges;
  const output: {[key: string]: {xPos: number, yPos: number}} = {};
  for (let edge of edges) {
    if (edge[2] === 1) continue;
    const max = Math.max(edge[0] as number, edge[1] as number);
    const min = Math.min(edge[0] as number, edge[1] as number);
    let key = `${min}-${max}`;
    if (output[key]) continue;
    let position = {xPos: 0, yPos: 0};
    if (max - min === 1) position = {xPos: max%width - 0.5, yPos: Math.floor(max/width)};
    else position = {xPos: max%width, yPos: Math.floor(max/width) - 0.5};
    output[key] = position;
  }
  return output;
}