import { useEffect, useState } from "react";
import "../../css/pathFinding.css";
import { generateConnectedGraph } from "../../utils/maze";
import { value } from "../../utils/graph";
import GraphVertex from "./graphVertex";
import { delay } from "../../utils/functionalities";

function AStarLesson() {
  const [graph, setGraph] = useState<any>();
  const [clicked, setClicked] = useState(false);
  const [width] = useState(25);
  const [end, setEnd] = useState<any>(width * width - 1);

  let paragraphs = {
    sortName: "aStar (A*) algorithm",
    firstP:
      "A* assigns a weight to each open node equal to the weight of the edge to that node plus the approximate distance between that node and the finish. This approximate distance is found by the heuristic, and represents a minimum possible distance between that node and the end.",
    secondP:
      "(weighted) arguably the best pathfinding algorithm; uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm"
  };

  useEffect(() => {
    newGraph();
  }, []);

  function newGraph() {
    const newgraph = generateConnectedGraph(width, width, true);
    newgraph.removeUnweightedEdges();
    setGraph(newgraph);
  }

  async function aStar() {
    const aStarVisualpaths = graph.findPath(
      0,
      end ? end : width * width,
      "aStar",
      width,
      10
    ); //TODO - ADD heuristic value as slider
    if (aStarVisualpaths) {
      let path: any = Array.from(aStarVisualpaths.visited);
      console.log("PATH", path);
      await showPath(path, true);
      path = Array.from(aStarVisualpaths.path);
      await showPath(path);
    }
  }

  async function showPath(path: number[], visited: boolean = false) {
    document.getElementById(`0`)!.style.backgroundColor = visited
      ? "var(--sand)"
      : "var(--yellow)";
    for (let i = 0; i < path.length; i++) {
      await delay(100);
      document.getElementById(`${path[i]}`)!.style.backgroundColor = visited
        ? "var(--sand)"
        : "var(--yellow)";
      await delay(100);
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
        <h1 className="explanation-title">{paragraphs.sortName}</h1>
        <p className="explanation-text">{paragraphs.firstP}</p>
        <p className="explanation-text centered-text">{paragraphs.secondP}</p>
      </div>
      <div className="buttons-pos">
        <button 
        className={clicked ? "button disabled": "button"}
        disabled={clicked}  
        onClick={() =>{
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
          aStar()
          setClicked(false);
          }}>
          Visualize A*
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
                  setEnd={setEnd}
                  end={end}
                  weightedGraph={true}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AStarLesson;
