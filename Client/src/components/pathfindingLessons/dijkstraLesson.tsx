import { useEffect, useState } from 'react';
import '../../css/pathFinding.css';
import { generateConnectedGraph } from '../../utils/maze';
import { value } from '../../utils/graph';
import GraphVertex from './graphVertex';
import { showPath } from '../../utils/functionalities';
import Pagination from '../learning/pagination';
import MapKeys from './map-keys';
import StepsPath from './stepsPath';

function DijkstraLesson() {
  const [stats, setStats] = useState({ visited: 0, path: 0 });
  const [graph, setGraph] = useState<any>();
  const [graphNumber, setGraphNumber] = useState<number>(0);
  const [clicked, setClicked] = useState(false);
  const [width] = useState(10);
  const [end, setEnd] = useState<any>(width * width - 1);
  let steps = [
    'Start at a node',
    'Assign neighbors a \'cost\' to visit',
    'Select the neighbor with the lowest cost',
    'Repeat until goal reached',
  ];

  useEffect(() => {
    newGraph();
  }, []);

  function newGraph() {
    const newgraph = generateConnectedGraph(width, width, true);
    setGraph(newgraph);
    setClicked(false);
    setGraphNumber(prev => prev + 1);
    setStats({ visited: 0, path: 0 });
  }

  async function dijkstra() {
    const DIJKVisualpaths = graph.findPath(0, end, 'vdijk');
    console.log('PATH', DIJKVisualpaths);
    if (DIJKVisualpaths) {
      setStats({
        visited: DIJKVisualpaths.visited.length,
        path: DIJKVisualpaths.path.length,
      });
      let path: any = Array.from(DIJKVisualpaths.visited);
      await showPath(path, true, `${graphNumber}dijk`);
      path = Array.from(DIJKVisualpaths.path);
      await showPath(path, false, `${graphNumber}dijk`);
    }
  }

  return (
    <Pagination
      clicked={false}
      leftName={'Dfs'}
      rightName={'aStar'}
      leftLink={'learning/dfsLesson'}
      rightLink={'learning/aStarLesson'}
    >
      <div className="whole-page-wrapper">
        <div className="sorting-algo">
          <h1 className="explanation-title">Dijkstra algorithm</h1>
          <p className="explanation-text">
            Instead of exploring all possible paths equally, Dijkstra favors lower
            cost paths. Distances between nodes are assigned weights that slow other algorithms down.
          </p>
          <p className="explanation-text centered-text">
            <span className="yellow-learning">WEIGHTED</span> - the father of
            path finding algorithms; guarantees the shortest path.
          </p>
        </div>
        <div className="visualization-wrapper">
          <MapKeys stats={stats}></MapKeys>
          <div className="lesson-wrapper">
            <div className="buttons-pos">
              <button
                className={'button'}
                onClick={() => {
                  newGraph();
                }}
              >
                NEW Graph
              </button>
              <button
                className={clicked ? 'button disabled' : 'button'}
                disabled={clicked}
                onClick={() => {
                  setClicked(true);
                  dijkstra();
                }}
              >
                Visualize
              </button>
            </div>
            <div id="myCanvas">
              <div
                className="graph-vertices"
                style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
              >
                {graph &&
                  graph.vertices.map((vertex: value) => (
                    <GraphVertex
                      algorithm={`${graphNumber}dijk`}
                      key={Math.random()}
                      width={width}
                      vertex={vertex}
                      edges={graph.edges.filter(
                        (edge: any) => edge[0] === vertex
                      )}
                      setEnd={setEnd}
                      end={end}
                      weightedGraph={true}
                    />
                  ))}
              </div>
            </div>
          </div>
          <StepsPath steps={steps}></StepsPath>
        </div>
      </div>
    </Pagination>
  );
}

export default DijkstraLesson;
