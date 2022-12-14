import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Config, names, uniqueNamesGenerator } from 'unique-names-generator';
import { GameStatsType } from '../components/game/game';
import { Graph, value } from '../utils/graph';
import { bubbleSortAlgo, insertionSortAlgo, mergeSortAlgo, quickSortAlgo, selectionSortAlgo } from '../utils/sorting-algo';
import { animal, minionType, TowerType } from '../utils/types';
import { initialGameState } from './game_initial_state';

const customConfig: Config = {
  dictionaries: [names]
}


const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    defaultState(state) {
      let defaultState = {...initialGameState};
      defaultState.minions = {};
      defaultState.movingMinions = [];
      defaultState.towers = [];
      defaultState.towersSorting = {};
      defaultState.gameStats = {
        timeRemaining: 300,
        p1Coins: 0,
        p2Coins: 0,
        p1Towers: [],
        p2Towers: [],
        p1MinionCount: 0,
        p2MinionCount: 0,
      }
      defaultState.finalGameStats = {
        timeRemaining: 300,
        p1Coins: 0,
        p2Coins: 0,
        p1Towers: [],
        p2Towers: [],
        p1MinionCount: 0,
        p2MinionCount: 0,
      }
      defaultState.displayVisited = [];
      return defaultState;
    },
    updateRoomID(state, action: PayloadAction<string>) {
      state.roomId = action.payload;
    },
    updatePlayer(state, action: PayloadAction<'p1' | 'p2'>) {
      state.currentPlayer = action.payload;
    },
    zoomIn(state, action: PayloadAction<number>) {
      state.currentTower = null;
      state.zoomed = true;
      if (state.boxSize + action.payload > state.maxBoxSize) state.boxSize = state.maxBoxSize;
      else state.boxSize += action.payload;
    },
    zoomOut(state, action: PayloadAction<number>) {
      state.currentTower = null;
      state.zoomed = true;
      if (state.boxSize - action.payload < state.minBoxSize) state.boxSize = state.minBoxSize;
      else state.boxSize -= action.payload;
    },
    mazeComplete(state) {
      state.mazeCompleted = true;
    },
    setWaitingForTile(state, action: PayloadAction<boolean>) {
      state.waitingForTile = action.payload;
    },
    setCurrentGraph(state, action: PayloadAction<Graph>) {
      state.currentGraph = action.payload;
    },
    setAllTilesHidden(state, action: PayloadAction<boolean>) {
      state.allTilesHidden = action.payload;
    },
    updateCurrentTile(state, action: PayloadAction<null | {xPos: number, yPos: number}>) {
      state.currentTile = action.payload;
    },
    updateCurrentMinion(state, action: PayloadAction<null | number>) {
      state.currentMinion = action.payload;
    },
    updateCurrentTower(state, action: PayloadAction<null | TowerType>) {
      state.currentTower = action.payload;
    },
    updateGameStats(state, action: PayloadAction<GameStatsType>) {
      state.gameStats = action.payload;
    },
    finalGameStats(state) {
      state.finalGameStats = state.gameStats;
    },
    updateZoomed(state, action: PayloadAction<boolean>) {
      state.zoomed = action.payload;
    },
    updateGameEnded(state) {
      state.gameEnded = true;
      state.finalGameStats = state.gameStats;
    },
    addNewMinionState(state, action: PayloadAction<{type: animal, player: 'p1' | 'p2'}>) {
      const newId = Object.keys(state.minions).length;
      const {type, player} = action.payload;
      let playerSpecific = {
        xPos: 0,
        yPos: 3,
        alignment: 'p1' as 'p1' | 'p2'
      };
      if (player ===  'p2') {
        playerSpecific = {
          xPos: state.width - 1,
          yPos: state.height - 4,
          alignment: 'p2'
        }
      }
      state.minions[newId] = {
        id: newId,
        name: uniqueNamesGenerator(customConfig),
        rotation: 'minionR',
        path: [],
        thoughtProcess: [],
        inTower: false,
        ...playerSpecific,
        ...type
      }
    },
    opponentMinionMovement(state, action: PayloadAction<{direction: {xPos: number, yPos: number, rotation: 'minionU' | 'minionR' | 'minionL' | 'minionD' | '' }, minionId: number}>) {
      const {direction, minionId} = action.payload;
      const minionToUpdate = state.minions[minionId];
      minionToUpdate.xPos = minionToUpdate.xPos + direction.xPos,
      minionToUpdate.yPos = minionToUpdate.yPos + direction.yPos,
      minionToUpdate.rotation = direction.rotation
      state.minions[minionId] = minionToUpdate;
    },
    updateMinion(state, action: PayloadAction<{minionId: number, updatedMinion: minionType}>) {
      const {minionId, updatedMinion} = action.payload;
      state.minions[minionId] = updatedMinion;
    },
    minionEnterTower(state, action: PayloadAction<{minionId: number, towerId: number}>) {
      const {minionId, towerId} = action.payload;
      const minion = state.minions[minionId];
      minion.yPos--;
      minion.inTower = towerId;
      state.towers = state.towers.map(tower => {
        if (towerId !== tower.id) return tower;
        else {
          let animations = (
            minion.sortingAlgo === 'bubble' ? bubbleSortAlgo([...tower.numbers], minion.alignment === 'p1') :
            minion.sortingAlgo === 'insertion' ? insertionSortAlgo([...tower.numbers], minion.alignment === 'p1') :
            minion.sortingAlgo === 'selection' ? selectionSortAlgo([...tower.numbers], minion.alignment === 'p1') :
            minion.sortingAlgo === 'merge' ? mergeSortAlgo([...tower.numbers], minion.alignment === 'p1') :
            quickSortAlgo([...tower.numbers], minion.alignment === 'p1')
          )
          return {
          ...tower,
          minion: minion.id,
          minionAlignment: minion.alignment,
          minionSortingSpeed: minion.sortingSpeed,
          sortingAlgo: minion.sortingAlgo,
          animations: [...animations],
          }
        }
      })
      state.zoomed = false;
      state.towersSorting[towerId] = 0;
    },
    minionExitTower(state, action: PayloadAction<{minionId: number, towerId: number}>) {
      const {minionId, towerId} = action.payload;
      const minion = state.minions[minionId];
      minion.yPos++;
      minion.inTower = false;
      minion.rotation = 'minionR';
      state.towers = state.towers.map(tower => {
        if (towerId !== tower.id) return tower;
        else return {
          ...tower,
          minion: null,
          alignment: minion.alignment
        }
      })
      state.towersSorting[towerId] = 0;
    },
    removeMovingMinion(state, action: PayloadAction<number>) {
      const minionId = action.payload;
      state.movingMinions = state.movingMinions.filter(id => id !== minionId);
    },
    addMovingMinion(state, action: PayloadAction<number>) {
      const minionId = action.payload;
      state.movingMinions = [...state.movingMinions, minionId];
    },
    newTowers(state, action: PayloadAction<any[]>) {
      const towers = action.payload;
      const width = state.width;
      state.towers = towers.map(tower => {
        return {
          id: tower[0],
          xPos: tower[0]%width,
          yPos: Math.floor(tower[0]/width),
          numbers: tower[1],
          color: 'red',
          minion: null,
          minionAlignment: null,
          alignment: 'none',
          animations: [],
          minionSortingSpeed: null,
          sortingAlgo: 'bubble'
        }
      })
    },
    updateTower(state, action: PayloadAction<{towerId: number, updatedTower: any}>) {
      const {towerId, updatedTower} = action.payload;
      state.towers = state.towers.map(tower => {
        if (towerId !== tower.id) return tower;
        return {
          ...tower,
          ...updatedTower
        }
      })
    },
    updateTowerNumbers(state, action: PayloadAction<{towerId: number, newNumbers: number[]}>) {
      const {towerId, newNumbers} = action.payload;
      state.towers = state.towers.map(tower => {
        if (tower.id !== towerId) return tower;
        return {
          ...tower,
          numbers: [...newNumbers]
        }
      })
    },
    updateMazePath(state, action: PayloadAction<{path: number[], visited: number[], minionId: number | null}>) {
      let {path, visited, minionId} = action.payload;
      if (state.currentMinion !== minionId) {
        path = [];
        visited = [];
      }
      for (let i = 0; i < state.maze.length; i++) {
        if (path.includes(i)) state.maze[i].path = 'PATH';
        else if (visited.includes(i)) state.maze[i].path = 'THOUGHTPROCESS';
        else state.maze[i].path = '';
      }
    },
    updateMazeClasses(state, action: PayloadAction<{classes: {[key: value]: ('b'|'t'|'r'|'l')[]}, visited: number[]}>) {
      const {classes, visited} = action.payload;
      for (let value of visited) {
        state.maze[value] = {
          ...state.maze[value],
          classes: classes[value]
        }
      }
    },
    updateDisplayVisited(state, action: PayloadAction<value[]>) {
      state.displayVisited = action.payload;
    },
    increaseTowersSorting(state, action: PayloadAction<number>) {
      state.towersSorting[action.payload]++;
    },
    updateMazeGenerated(state, action: PayloadAction<boolean>) {
      state.mazeGenerated = action.payload;
    },
    receiveRoomId(state, action: PayloadAction<{roomId: string, player: 'p1' | 'p2'}>) {
      const { roomId, player } = action.payload;
      state.roomId = roomId;
      state.currentPlayer = player;
    }
  }
})

export const { 
  defaultState, 
  updateRoomID, 
  updatePlayer, 
  zoomIn, 
  zoomOut, 
  mazeComplete,
  setWaitingForTile,
  setCurrentGraph,
  setAllTilesHidden,
  updateCurrentMinion,
  updateCurrentTower,
  updateGameStats,
  finalGameStats,
  updateZoomed,
  updateGameEnded,
  addNewMinionState,
  opponentMinionMovement,
  updateMinion,
  minionEnterTower,
  minionExitTower,
  updateCurrentTile,
  removeMovingMinion,
  addMovingMinion,
  newTowers,
  updateTower,
  updateTowerNumbers,
  updateMazePath,
  updateMazeClasses,
  updateDisplayVisited,
  increaseTowersSorting,
  updateMazeGenerated,
  receiveRoomId
} = gameSlice.actions;
export default gameSlice.reducer;