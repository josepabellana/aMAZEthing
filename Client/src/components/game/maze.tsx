import React, { useEffect, useRef, useState } from "react";
import '../../css/game/maze.css';
import apiService from "../../services/apiService";
import { Graph, value } from "../../utils/graph";
import { MazeTileType, minionType, TowerType } from "../../utils/types";
import MazeTile from "./mazeTile";
import Minion from "./minion";
import Tower from "./tower";
import Home from './home'
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { addNewInterval, mazeComplete, newTowers, setAllTilesHidden, setCurrentGraph, updateBoxSize, updateCurrentTile, updateDisplayVisited, updateMazeClasses, updateMazeGenerated, updateMinBoxSize, updateWeightPositions } from "../../features/game_slice";
import { MazeType } from "../../utils/maze";
import Mud from "./mud";

function Maze({ towers, currentPlayer}: {
  towers: TowerType[],
  currentPlayer: 'p1' | 'p2'
}) {

  // TODO: Set as state
  const { height, width, currentGraph, allTilesHidden, minions, maze, displayVisited, mazeGenerated, weightPositions } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const mazeOuterRef = useRef<HTMLInputElement>(null);
  const mazeInnerRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    async function mazeInit(){
      if (mazeGenerated === false) {
        dispatch(updateMazeGenerated(true));
        let graph: Graph;
        const {graphBE, visited, classes, towers, weightPositions} = await apiService.createMaze();
        console.log({graphBE})
        if (graphBE instanceof Graph) graph = graphBE;
        else {
          graph = new Graph()
          graph.reAssign(graphBE)
        }
        dispatch(newTowers(towers));
        dispatch(setCurrentGraph(graph));
        dispatch(updateDisplayVisited(visited));
        dispatch(updateWeightPositions(weightPositions));
        dispatch(updateMazeClasses({classes, visited}));
        const newBoxSize = mazeOuterRef.current?.clientHeight!/height;
        dispatch(updateMinBoxSize(newBoxSize));
        dispatch(updateBoxSize(newBoxSize));

      }
      else if (allTilesHidden && currentGraph) {
        const mazeTiles = document.getElementsByClassName('mazeTile');
        const halfway = Math.floor(mazeTiles.length/2);
        let index = -1;
        const interval = setInterval(() => {
          for (let i = 0; i < 50 - 49*((Math.abs(halfway - index)/halfway)); i++) {
            index++;
            if (index === displayVisited.length) break;
            const currentTile = mazeTiles[displayVisited[index] as number];
            currentTile.classList.remove('showNone');
          }

          if (index >= displayVisited.length) {
            clearInterval(interval);
            dispatch(setAllTilesHidden(false));
            dispatch(mazeComplete());
          };
        }, 0);
        dispatch(addNewInterval(interval));
      }
    }
    mazeInit();
  },[maze]);

  useEffect(() => {
    if (currentPlayer === 'p2' && allTilesHidden === false) {
      mazeOuterRef.current!.scrollTo({top: mazeInnerRef.current!.clientHeight, left: mazeInnerRef.current!.clientWidth * 2, behavior: 'auto'})
    }
  }, [allTilesHidden])

  return (
      <div className="mazeOuter" onContextMenu={(e)=> e.preventDefault()} ref={mazeOuterRef}>
        <div className="mazeInner" style={{gridTemplateColumns: `repeat(${width}, 1fr)`}} ref={mazeInnerRef}>
          <Home xPos={0} yPos={0} player='p1'/>
          <Home xPos={width - 3} yPos={height - 3} player='p2'/>
          {Object.values(weightPositions).map(weightPosition => <Mud key={weightPosition.xPos + weightPosition.yPos*width} xPos={weightPosition.xPos} yPos={weightPosition.yPos}/>)}
          {Object.values(minions).map(minion => <Minion key={minion.id} minion={minion}/>)}
          {!allTilesHidden && towers.map(tower => <Tower key={tower.id} tower={tower}/>)}
          {maze.map((value: {value: value, classes: string[], path: '' | 'THOUGHTPROCESS' | 'PATH'}, index) => <MazeTile key={index} generated={allTilesHidden} value={value.value as string} path={value.path} classes={value.classes} />)}
        </div>
      </div>
  );
}

export default Maze;