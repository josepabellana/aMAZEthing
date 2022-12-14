import { TowerType } from "../../utils/types";
import TowerSVG from "../svg/towerSVG";
import '../../css/game/tower.css'
import TowerPopup from "./towerPopup";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { updateCurrentMinion, updateCurrentTile, updateCurrentTower } from "../../features/game_slice";

function Tower({ tower }: {
  tower: TowerType
} ) {

  const dispatch = useAppDispatch();
  const { boxSize, width, height } = useAppSelector(state => state.game);

  function handleContextMenu() {
    if (tower.minion === null) {
      dispatch(updateCurrentTile({
        xPos: tower.xPos,
        yPos: tower.yPos
      }))
    }
  }



  function handleClick() {
    dispatch(updateCurrentTower(tower));
    dispatch(updateCurrentMinion(null));

  }

  return (
    <div id={`${tower.id}`} style={{width: `${boxSize*3}px`, top: `${(tower.yPos-2)*boxSize}px`, left: `${(tower.xPos-1)*boxSize}px`}} className='tower' onContextMenu={handleContextMenu} onClick={handleClick}>
      <TowerSVG playerClass={
                  tower.minion !== null? 'contestedTower' :
                  tower.alignment === 'p1' ? 'p1Tower' :
                  tower.alignment === 'p2' ? 'p2Tower' :
                  'neutralTower'}
      />
      <TowerPopup boxSize={boxSize} tower={tower} width={width} height={height}/>
    </div>
  )
}

export default Tower;