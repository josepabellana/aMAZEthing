import React from 'react';
import '../../css/game/minion.css';
import { updateCurrentMinion, updateCurrentTile, updateCurrentTower } from '../../features/game_slice';
import { useAppDispatch, useAppSelector, whichAnimalSVG } from '../../features/hooks';
import { minionType, TowerType } from '../../utils/types';
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from '../svg/animalsSVG';

function Minion({ minion }: { minion: minionType }) {

  const { boxSize, currentPlayer } = useAppSelector(state => state.game);

  const dispatch = useAppDispatch();

  function handleClick() {
    if (minion.alignment === currentPlayer) {
      dispatch(updateCurrentTile(null));
      dispatch(updateCurrentTower(null));
      dispatch(updateCurrentMinion(minion.id));
    }
  }

  function handleContextMenu() {
    dispatch(updateCurrentTile({
      xPos: minion.xPos,
      yPos: minion.yPos
    }));
  }

  return (
    <div onClick={handleClick} onContextMenu={handleContextMenu}  id={`${minion.id}`} className={`minion ${minion.rotation} ${(minion.inTower !== false) && 'minionInTower'}`} style={{fill: `red`, height: `${boxSize + 30}px`, width: `${boxSize + 30}px`, top: `${boxSize*minion.yPos - 15}px`, left: `${boxSize*minion.xPos - 15}px`}}>
    {whichAnimalSVG(minion)}
  </div>
  )
}

export default Minion;
