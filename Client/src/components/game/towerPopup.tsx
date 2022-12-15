import '../../css/game/towerPopup.css';
import { useAppSelector } from '../../features/hooks';
import { bubbleSortAlgo } from '../../utils/sorting-algo';
import { bubbleSortVisual, insertionSortVisual, mergeSortVisual, quickSortVisual, selectionSortVisual } from '../../utils/sorting-helper-visual';
import { minionType, TowerType } from '../../utils/types';
import Visualization from '../sortingLessons/visualization';


function TowerPopup ({tower, width, height}: {tower: TowerType, width: number, height: number}) {

  const {zoomed, towersSorting, boxSize} = useAppSelector(state => state.game);

  return <div style={tower.minion !== null && !zoomed ? {'opacity': 1, 'zIndex': 1} : {'opacity': 0, 'zIndex': -1000}} className={`towerPopup ${
    tower.id/width < height/4 ? 'downPopup' :
    tower.id/width > 3*height/4 ? 'upPopup' :
    width - tower.id%width < width/3 ? 'leftPopup' : 
    'rightPopup'
  }`
  }>
    <Visualization 
      array={tower.numbers} 
      width={3*boxSize/5} 
      margin={2} 
      height={3*boxSize/5} 
      animations={tower.animations} 
      sortingAlgo={
        tower.sortingAlgo === 'bubble' ? bubbleSortVisual :
        tower.sortingAlgo === 'selection' ? selectionSortVisual :
        tower.sortingAlgo === 'insertion' ? insertionSortVisual :
        tower.sortingAlgo === 'merge' ? mergeSortVisual :
        quickSortVisual
      } 
      key={tower.numbers as any} 
      clicked={tower.minion !== null && !towersSorting[tower.id]} 
      delay={tower.minionSortingSpeed as number} 
      tower={tower.id}/>
  </div>
}

export default TowerPopup;