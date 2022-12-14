import '../../css/game/mazeTile.css';
import { updateCurrentMinion, updateCurrentTile, updateCurrentTower } from '../../features/game_slice';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { TowerType } from '../../utils/types';
import Path from './path';

function MazeTile({value, classes, path, generated}: {
  value: string,
  classes: string[],
  generated: boolean,
  path: '' | 'THOUGHTPROCESS' | 'PATH'
}) {

  const dispatch = useAppDispatch();
  const {width, boxSize} = useAppSelector(state => state.game)

  function setCurrentTileHelper(value: number) {
    dispatch(updateCurrentTile({
      xPos: value%width,
      yPos: Math.floor(value / width)
    }))
  }

  return (
    <>
      <div onContextMenu={() => setCurrentTileHelper(Number(value))} onClick={() => {
        dispatch(updateCurrentMinion(null));
        dispatch(updateCurrentTile(null));
        dispatch(updateCurrentTower(null));
      }} className={`mazeTile ${classes.join(' ')} ${value} ${generated && 'showNone'}`} style={{height: `${boxSize}px`, width: `${boxSize}px`}}>
        {path && <Path thoughtProcess={path}/>}
      </div>
    </>
  );
}

export default MazeTile;