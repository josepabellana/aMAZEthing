import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";
import minion from "../components/game/minion";
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from "../components/svg/animalsSVG";
import { Graph, value } from "../utils/graph";
import { aStar, distanceConstruct, vBFS, vDFS, vDijk } from "../utils/path-finding-algo";
import { bubbleSortAlgo, insertionSortAlgo, mergeSortAlgo, quickSortAlgo, selectionSortAlgo } from "../utils/sorting-algo";
import { minionType } from "../utils/types";
import { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>();
//adding types to functions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;







export function useAlgo(algoName: string = 'bubble', array: any = [], reversed: boolean = false) {

    switch (algoName) {
        case 'bubble':
            return bubbleSortAlgo(array, reversed);
        case 'insertion':
            return insertionSortAlgo(array, reversed);
        case 'selection':
            return selectionSortAlgo(array, reversed);
        case 'merge':
            return mergeSortAlgo(array, reversed);
        case 'quick':
            return quickSortAlgo(array, reversed);
    }
    return [[]]
}

export function whichAnimalSVG(minion: minionType) {
  return minion.type === 'Squirrel' ? (
    <Squirrel currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Badger' ? (
    <Badger currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Hare' ? (
    <Hare currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Deer' ? (
    <Deer currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Koala' ? (
    <Koala currentPlayer={`${minion.alignment}-color`} />
  ) : (
    minion.type === 'Bear' && (
      <Bear currentPlayer={`${minion.alignment}-color`} />
    )
  );
}

export function usePathAlgo(pathFindingAlgo: 'bfs' | 'dfs' | 'dijk' | 'a*', comeFrom: {xPos: number, yPos: number}, goTo: {xPos: number, yPos: number}, currentGraph: Graph, width: number) {
  let directions: false | { visited: value[]; path: value[]; } = false;
  if (pathFindingAlgo === 'bfs') {
    directions = vBFS(comeFrom.xPos + comeFrom.yPos*width, goTo.xPos + goTo.yPos*width, currentGraph);
  }
  else if (pathFindingAlgo === 'dfs') {
    directions = vDFS(comeFrom.xPos + comeFrom.yPos*width, goTo.xPos + goTo.yPos*width, currentGraph);
  }
  else if (pathFindingAlgo === 'dijk') {
    directions = vDijk(comeFrom.xPos + comeFrom.yPos*width, goTo.xPos + goTo.yPos*width, currentGraph)
  }
  else if (pathFindingAlgo === 'a*') {
    directions = aStar(comeFrom.xPos + comeFrom.yPos*width, goTo.xPos + goTo.yPos*width, currentGraph, distanceConstruct(width))
  }
  else {
    directions = vBFS(comeFrom.xPos + comeFrom.yPos*width, goTo.xPos + goTo.yPos*width, currentGraph);
  }
  return directions;
}
