import React, { useEffect, useState } from "react";
import '../../css/game/maze.css';
import apiService from "../../services/apiService";
import { Graph, value } from "../../utils/graph";
import { MazeTileType, minionType, TowerType } from "../../utils/types";
import MazeTile from "./mazeTile";
import Minion from "./minion";
import Tower from "./tower";
import Home from './home'
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { mazeComplete, newTowers, setAllTilesHidden, setCurrentGraph, updateCurrentTile, updateDisplayVisited, updateMazeClasses, updateMazeGenerated } from "../../features/game_slice";

function Maze({ towers, currentPlayer}: {
  towers: TowerType[],
  currentPlayer: 'p1' | 'p2'
}) {

  // TODO: Set as state
  const { height, width, currentGraph, allTilesHidden, minions, maze, displayVisited, mazeGenerated } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();


  useEffect(() => {
    async function mazeInit(){
      if (mazeGenerated === false) {
        dispatch(updateMazeGenerated(true));

        const {graphBE, visited, classes, towers} = await apiService.createMaze()
        let graph = new Graph()
        graph.reAssign(graphBE)
        dispatch(newTowers(towers));
        dispatch(setCurrentGraph(graph));
        dispatch(updateDisplayVisited(visited));
        dispatch(updateMazeClasses({classes, visited}));
      }
      else if (allTilesHidden && currentGraph) {
        const mazeTiles = document.getElementsByClassName('mazeTile');
        const halfway = Math.floor(mazeTiles.length/2);
        let index = -1;
        function step() {
          for (let i = 0; i < 50 - 49*((Math.abs(halfway - index)/halfway)); i++) {
            index++;
            if (index === displayVisited.length) break;
            const currentTile = mazeTiles[displayVisited[index] as number];
            currentTile.classList.remove('showNone');
          }

          if (index < displayVisited.length) requestAnimationFrame(step)
          else {
            dispatch(setAllTilesHidden(false));
            dispatch(mazeComplete());
          };
        }
        requestAnimationFrame(step);
      }
    }
    mazeInit();
  },[maze]);

  return (
      <div className="mazeOuter" onContextMenu={(e)=> e.preventDefault()}>
        <div className="mazeInner" style={{gridTemplateColumns: `repeat(${width}, 1fr)`}}>
          <Home xPos={0} yPos={0} player='p1'/>
          <Home xPos={width - 3} yPos={height - 3} player='p2'/>
          {Object.values(minions).map(minion => <Minion key={minion.id} minion={minion}/>)}
          {!allTilesHidden && towers.map(tower => <Tower key={tower.id} tower={tower}/>)}
          {maze.map((value: {value: value, classes: string[], path: '' | 'THOUGHTPROCESS' | 'PATH'}, index) => <MazeTile key={index} generated={allTilesHidden} value={value.value as string} path={value.path} classes={value.classes} />)}
        </div>
      </div>
  );
}

export default Maze;