import { useEffect, useState, useRef } from "react";
import { generateConnectedGraph } from "../../utils/maze";
import "../../css/pathFinding.css";
import { value } from "../../utils/graph";
import GraphVertex from "./graphVertex";
import { delay } from "../../utils/functionalities";

function BfsLesson() {
  const [graph, setGraph] = useState<any>();
  const [clicked, setClicked] = useState(false);
  const [width] = useState(15);
  const [end, setEnd] = useState<any>(width * width - 1);

  useEffect(() => {
    const graph = generateConnectedGraph(width, width, true);
    graph.removeUnweightedEdges();
    setGraph(graph);
  }, []);

  function newGraph() {
    const newgraph = generateConnectedGraph(width, width, true);
    graph.removeUnweightedEdges();
    setGraph(newgraph);
  }

  async function bfs() {
    const BFSVisualpaths = graph.findPath(0, end, "vbfs");
    if (BFSVisualpaths) {
      let path: any = Array.from(BFSVisualpaths.visited);
      console.log("PATH", path);
      await showPath(path, true);
      path = Array.from(BFSVisualpaths.path);
      await showPath(path);
    }
  }

  async function showPath(path: number[], visited: boolean = false) {
    for (let i = 0; i < path.length; i++) {
      await delay(10);
      document.getElementById(`${path[i]}`)!.style.backgroundColor = visited
        ? "var(--sand)"
        : "var(--yellow)";
      await delay(10);
      if (i + 1 !== path.length) {
        if (
          document.getElementById(
            `${path[i]},${path[i + 1]}-${path[i + 1]},${path[i]}`
          ) ||
          document.getElementById(
            `${path[i + 1]},${path[i]}-${path[i]},${path[i + 1]}`
          )
        ) {
          if (path[i] < path[i + 1])
            document.getElementById(
              `${path[i]},${path[i + 1]}-${path[i + 1]},${path[i]}`
            )!.style.backgroundColor = visited
              ? "var(--sand)"
              : "var(--yellow)";
          else
            document.getElementById(
              `${path[i + 1]},${path[i]}-${path[i]},${path[i + 1]}`
            )!.style.backgroundColor = visited
              ? "var(--sand)"
              : "var(--yellow)";
        }
      }
    }
  }

  return (
    <div className="whole-page-wrapper">
      <div className="sorting-algo">
        <h1 className="explanation-title">Breath First Search (BFS) algorithm</h1>
        <p className="explanation-text">Investigates all nodes at the current depth level (neighbours) before moving on to nodes at the next depth level.</p>
        <p className="explanation-text centered-text">(unweighted) guarantees the shortest path</p>
      </div>
      <div className="buttons-pos">
        <button 
        className={clicked ? "button disabled": "button"}  
        disabled={clicked}
        onClick={() => {
          setClicked(true);
          newGraph();
          setClicked(false);
          }}>
          NEW Graph
        </button>
        <button 
          className={clicked ? "button disabled": "button"} 
          disabled={clicked} 
          onClick={() => {
            setClicked(true);
            bfs();
            setClicked(false);
            }}>
          Visualize bfs
        </button>
      </div>
      <div className="lesson-wrapper-2">
        <div id="myCanvas">
          <div
            className="graph-vertices"
            style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
          >
            {graph &&
              graph.vertices.map((vertex: value) => (
                <GraphVertex
                  key={Math.random()}
                  width={width}
                  vertex={vertex}
                  edges={graph.edges.filter((edge: any) => edge[0] === vertex)}
                  end={end}
                  setEnd={setEnd}
                  weightedGraph={false}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BfsLesson;
