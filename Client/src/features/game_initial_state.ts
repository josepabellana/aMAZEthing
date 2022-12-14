import { GameStatsType } from "../components/game/game";
import { Graph, value } from "../utils/graph";
import { MazeTileType, minionType, TowerType } from "../utils/types";

export interface GameState{ //shape of the state inside inside of the slice
  roomId: string,
  currentPlayer: 'p1' | 'p2',
  boxSize: number,
  mazeCompleted: boolean,
  minions: {[key: number]: minionType},
  currentMinion: null | number,
  currentTile: null | {xPos: number, yPos: number},
  currentTower: null | TowerType,
  waitingForTile: boolean,
  currentGraph: undefined | Graph,
  height: number,
  width: number,
  movingMinions: number[],
  towers: TowerType[],
  allTilesHidden: boolean,
  towersSorting: {[key: number]: number},
  gameStats: GameStatsType,
  finalGameStats: GameStatsType,
  gameEnded: boolean,
  zoomed: boolean,
  maze: MazeTileType[],
  maxBoxSize: number,
  minBoxSize: number,
  displayVisited: value[],
  mazeGenerated: boolean
}
const width = 86;
const height = 40;
const array: MazeTileType[] = [];

for (let i = 0; i < width*height; i++) {
  array.push({value: i, classes: [], path: ''})
}

export const initialGameState: GameState = {
  roomId: '',
  currentPlayer: 'p1',
  boxSize: 20,
  mazeCompleted: false,
  minions: {},
  currentMinion: null,
  currentTile: null,
  currentTower: null,
  waitingForTile: false,
  currentGraph: undefined,
  height, // ! Change in server if you change it here
  width,
  movingMinions: [],
  towers: [],
  allTilesHidden: true,
  towersSorting: {},
  gameStats: {
    timeRemaining: 300,
    p1Coins: 0,
    p2Coins: 0,
    p1Towers: [],
    p2Towers: [],
    p1MinionCount: 0,
    p2MinionCount: 0,
  },
  finalGameStats: {
    timeRemaining: 300,
    p1Coins: 0,
    p2Coins: 0,
    p1Towers: [],
    p2Towers: [],
    p1MinionCount: 0,
    p2MinionCount: 0,
  },
  gameEnded: false,
  zoomed: false,
  maze: array,
  minBoxSize: 20,
  maxBoxSize: 100,
  displayVisited: [],
  mazeGenerated: false
}