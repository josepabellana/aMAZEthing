import React from 'react';
import '../../css/game/minion.css';
import { updateCurrentMinion, updateCurrentTile, updateCurrentTower } from '../../features/game_slice';
import { useAppDispatch, useAppSelector, whichAnimalSVG } from '../../features/hooks';
import { minionType, TowerType } from '../../utils/types';
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from '../svg/animalsSVG';

function Minion({ minion }: { minion: minionType }) {

  const { boxSize, currentPlayer, currentMinion } = useAppSelector(state => state.game);

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
    <div onClick={handleClick} onContextMenu={handleContextMenu}  id={`${minion.id}`} className={`minion ${minion.rotation} ${(minion.inTower !== false) ? 'minionInTower' : ''} ${currentMinion === minion.id ? 'selected' : ''}`} style={{fill: `red`, height: `${boxSize}px`, width: `${boxSize}px`, top: `${boxSize*minion.yPos}px`, left: `${boxSize*minion.xPos}px`, transition: `${minion.movementSpeed}ms`}}>
    {whichAnimalSVG(minion)}
  </div>
  )
}

export default Minion;
