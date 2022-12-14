import { useEffect, useState } from "react";
import "../../css/pathFinding.css";
import { generateConnectedGraph } from "../../utils/maze";
import { value } from "../../utils/graph";
import GraphVertex from "./graphVertex";
import { delay } from "../../utils/functionalities";

function DijkstraLesson() {
  const [graph, setGraph] = useState<any>();
  const [clicked, setClicked] = useState(false);
  const [width] = useState(15);
  const [end, setEnd] = useState<any>(width * width - 1);

  let paragraphs = {
    sortName: "Dijkstra algorithm",
    firstP:
      "This algorithm uses the weights of the edges to find the path that minimizes the total distance (weight) between the source node and all other nodes.",
    secondP:
      "(weighted) the father of pathfinding algorithms; guarantees the shortest path"
  };

  useEffect(() => {
    const graph = generateConnectedGraph(width, width, true);
    setGraph(graph);
  }, []);

  function newGraph() {
    const newgraph = generateConnectedGraph(width, width, true);
    setGraph(newgraph);
  }

  async function dijkstra() {
    const DIJKVisualpaths = graph.findPath(0, end, "vdijk");
    console.log("PATH", DIJKVisualpaths);
    if (DIJKVisualpaths) {
      let path: any = Array.from(DIJKVisualpaths.visited);
      await showPath(path, true);
      path = Array.from(DIJKVisualpaths.path);
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
        <h1 className="explanation-title">{paragraphs.sortName}</h1>
        <p className="explanation-text">{paragraphs.firstP}</p>
        <p className="explanation-text centered-text">{paragraphs.secondP}</p>
      </div>
      <div className="buttons-pos">
        <button 
        className={clicked ? "button disabled": "button"} 
        disabled={clicked} 
        onClick={() => {
          setClicked(true);
          newGraph()
          setClicked(false);
          }}>
          NEW Graph{" "}
        </button>
        <button 
        className={clicked ? "button disabled": "button"}  
        disabled={clicked}
        onClick={() => {
          setClicked(true);
          dijkstra()
          setClicked(false);
          }}>
          Visualize Dijkstra
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

export default DijkstraLesson;
