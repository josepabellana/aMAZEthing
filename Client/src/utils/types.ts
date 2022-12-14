import { Squirrel } from "../components/svg/animalsSVG";
import { value } from "./graph";

export interface minionType {
  id: number;
  name: string;
  xPos: number;
  yPos: number;
  rotation: 'minionR' | 'minionL' | 'minionU' | 'minionD' | '';
  path: number[];
  alignment: 'p1' | 'p2';
  thoughtProcess: number[];
  inTower: false | number;
  pathFindingAlgo: 'dfs' | 'bfs' | 'dijk' | 'a*';
  sortingAlgo: 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick';
  sortingSpeed: number;
  movementSpeed: number;
  type: 'Squirrel' | 'Badger' | 'Hare' | 'Deer' | 'Koala' | 'Bear'
}

export interface MazeTileType {
  value: value,
  classes: ('b' | 't' | 'l' | 'r')[],
  path: '' | 'THOUGHTPROCESS' | 'PATH'
}

export interface TowerType {
  id: number;
  xPos: number;
  yPos: number;
  numbers: number[];
  color: 'red' | 'blue';
  minion: null | number;
  minionAlignment: null | 'p1' | 'p2';
  minionSortingSpeed: null | number;
  alignment: 'none' | 'p1' | 'p2';
  animations: number[][];
  sortingAlgo: 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick';
}

export interface animal {
  pathFindingAlgo: 'dfs' | 'bfs' | 'dijk' | 'a*';
  sortingAlgo: 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick';
  sortingSpeed: number;
  movementSpeed: number;
  type: 'Squirrel' | 'Badger' | 'Hare' | 'Deer' | 'Koala' | 'Bear'
}

export const squirrel: animal = {
  pathFindingAlgo: 'dfs',
  sortingAlgo: 'bubble',
  sortingSpeed: 300,
  movementSpeed: 300,
  type: 'Squirrel'
}

export const badger: animal = {
  pathFindingAlgo: 'bfs',
  sortingAlgo: 'selection',
  sortingSpeed: 300,
  movementSpeed: 500,
  type: 'Badger'
}

export const hare: animal = {
  pathFindingAlgo: 'dijk',
  sortingAlgo: 'insertion',
  sortingSpeed: 300,
  movementSpeed: 300,
  type: 'Hare'
}

export const deer: animal = {
  pathFindingAlgo: 'a*',
  sortingAlgo: 'merge',
  sortingSpeed: 50,
  movementSpeed: 400,
  type: 'Deer'
}

export const koala: animal = {
  pathFindingAlgo: 'a*',
  sortingAlgo: 'quick',
  sortingSpeed: 50,
  movementSpeed: 350,
  type: 'Koala'
}

export const bear: animal = {
  pathFindingAlgo: 'a*',
  sortingAlgo: 'quick',
  sortingSpeed: 50,
  type: 'Bear',
  movementSpeed: 300,
}

