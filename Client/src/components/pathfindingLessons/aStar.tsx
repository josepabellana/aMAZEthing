import { useEffect, useState } from 'react';
import '../../css/pathFinding.css';
import { generateConnectedGraph } from '../../utils/maze';
import { value } from '../../utils/graph';
import GraphVertex from './graphVertex';
import { showPath } from '../../utils/functionalities';
import Pagination from '../learning/pagination';
import MapKeys from './map-keys';
import StepsPath from './stepsPath';

function AStarLesson() {
  const [stats, setStats] = useState({ visited: 0, path: 0 });
  const [graph, setGraph] = useState<any>();
  const [graphNumber, setGraphNumber] = useState<number>(0);
  const [clicked, setClicked] = useState(false);
  const [width] = useState(10);
  const [end, setEnd] = useState<any>(width * width - 1);
  const [heuristicValue, setHeuristic] = useState(50);
  let steps = [
    'Start at a node',
    'Assign neighbors a \'cost\' to visit, taking into account the heuristic',
    'Select the neighbor with the lowest cost',
    'Repeat until goal reached',
  ];
  useEffect(() => {
    newGraph();
  }, []);

  function newGraph() {
    const newgraph = generateConnectedGraph(width, width, true);
    newgraph.removeUnweightedEdges();
    setGraph(newgraph);
    setClicked(false);
    setGraphNumber(prev => prev + 1);
    setStats({ visited: 0, path: 0 });
  }

  async function aStar() {
    const aStarVisualpaths = graph.findPath(
      0,
      end ? end : width * width,
      'aStar',
      width,
      heuristicValue / 20
    );
    if (aStarVisualpaths) {
      setStats({
        visited: aStarVisualpaths.visited.length,
        path: aStarVisualpaths.path.length,
      });
      let path: any = Array.from(aStarVisualpaths.visited);
      console.log('PATH', path);
      await showPath(path, true, `${graphNumber}aStar`);
      path = Array.from(aStarVisualpaths.path);
      await showPath(path, false, `${graphNumber}aStar`);
    }
    // setClicked(false)
  }

  return (
    <Pagination
      clicked={false}
      leftName={'Dijkstra'}
      rightName={'Learning'}
      leftLink={'learning/dijkstraLesson'}
      rightLink={'learning'}
    >
      <div className="whole-page-wrapper">
        <div className="sorting-algo">
          <h1 className="explanation-title">aStar (A*) algorithm</h1>
          <p className="explanation-text">
            A* is similar to Dijkstra, however it has a bias defined by a heuristic function. This could be distance to the goal, and allows A* to make more efficient choices.
          </p>
          <p className="explanation-text centered-text">
            <span className="yellow-learning">WEIGHTED</span> - arguably the
            best path finding algorithm.
          </p>
        </div>
        <div className="heuristicDiv">
          {heuristicValue < 15 ? (
            <p>
              A* acts as <span className="yellow-learning">Dijkstra</span>, just
              taking the weights into account
            </p>
          ) : heuristicValue > 95 ? (
            <p>
              A* is totally <span className="yellow-learning">heuristic</span>,
              not taking care of the weights but distance to the Endpoint
            </p>
          ) : (
            <p>
              You can modify how{' '}
              <span className="yellow-learning">'heuristic heavy'</span> the A*
              algorithm can be
            </p>
          )}
          <label>
            <input
              type="range"
              className="slider"
              name="heuristic-range"
              value={heuristicValue}
              min="0"
              max="100"
              onChange={(e: any) => {
                setHeuristic(e.target.value);
              }}
            />
            {'     '}
            {heuristicValue}%
          </label>
        </div>
        <div className="visualization-wrapper">
          <MapKeys stats={stats}></MapKeys>
          <div className="lesson-wrapper">
            <div className="buttons-pos margin-for-a-star">
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
                  aStar();
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
                      algorithm={`${graphNumber}aStar`}
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

export default AStarLesson;
