import '../../css/game/rightBar.css';
import ShopSVG from '../svg/ShopSVG';
import { animal, minionType } from '../../utils/types';
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from '../svg/animalsSVG';
import { useState } from 'react';
import Shop from './shop';
import CloseCross from '../svg/closeCross';
import { useAppDispatch, useAppSelector, whichAnimalSVG } from '../../features/hooks';
import { updateCurrentMinion } from '../../features/game_slice';

function storeButtonHover(isOnHover: boolean) {
  document.querySelectorAll('.store-button-yellow').forEach((svgEl) => {
    isOnHover
      ? ((svgEl as unknown as HTMLElement).style.fill = `var(--red)`)
      : ((svgEl as unknown as HTMLElement).style.fill = `var(--yellow)`);
  });
  document.querySelectorAll('.store-button-red').forEach((svgEl) => {
    isOnHover
      ? ((svgEl as unknown as HTMLElement).style.fill = `var(--yellow)`)
      : ((svgEl as unknown as HTMLElement).style.fill = `var(--red)`);
  });
}

function crossButtonHover(isOnHover: boolean) {
  document.querySelectorAll('.close-cross-green').forEach((svgEl) => {
    isOnHover
      ? ((svgEl as unknown as HTMLElement).style.fill = `--white-green-hover`)
      : ((svgEl as unknown as HTMLElement).style.fill = `var(--white-green)`)

  });
}

function styleCurrentMinionBorder(currentMinId: number) {
  const allYourMinions = document.querySelectorAll('.your-minion-button');

  allYourMinions.forEach(minion => {
    (minion as unknown as HTMLElement).style.backgroundColor = 'var(--green)';
  });

  (document.querySelector(`.right-bar-selector-${currentMinId}`) as unknown as HTMLElement).style.backgroundColor = 'var(--purple)';
}

function RightBar({addNewMinion}: {addNewMinion: (type: animal, player: 'p1' | 'p2') => void}) {

  const [shopOpen, setShopOpen] = useState(false);
  const { allTilesHidden, currentPlayer, minions } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  let allPlayerMinions: Array<minionType> = [];

  [minions].forEach((allMinions) => {
    for (const minion in allMinions) {
      if (allMinions[minion].alignment === currentPlayer) {
        allPlayerMinions.push(allMinions[minion]);
      }
    }
  });

  let minionsToRender = allPlayerMinions.map((p1minion) => {
    return (
      <>
        <div className={`your-minion-button right-bar-selector-${p1minion.id}`} onClick={() => {
            dispatch(updateCurrentMinion(p1minion.id));
            styleCurrentMinionBorder(p1minion.id);
          }}>
          <h1 className='right-bar-name'>{p1minion.name}</h1>
          <h1 className='current-minion-svg-left-bar'>{whichAnimalSVG(minions[p1minion.id])}</h1>
        </div>
      </>
    )
  })



  return (
    <div className='right-bar'>

      {shopOpen ? (
        <Shop minions={minions} currentPlayer = {currentPlayer} addNewMinion={addNewMinion}/>
      ) : <div className='your-minions'>
      {minions &&
        // Should be a name instead
        <>
          <ul className='your-minions-list'>
            {minionsToRender}
          </ul>
        </>
      }
      </div>}


      {!allTilesHidden && (
        <button

          className='store-button'
          style={shopOpen ? {backgroundColor: 'var(--sand)'} : {backgroundColor: 'transparent'}}
          onClick={() => {shopOpen ? setShopOpen(false) : setShopOpen(true)}}
          onMouseEnter={() => {storeButtonHover(true); crossButtonHover(true)}}
          onMouseLeave={() => {storeButtonHover(false); crossButtonHover(false)}}
        >
          <div id="store-button" className='shopSVG'>
            {shopOpen
              ? <div className='cross-size'><CloseCross /></div>
              : <ShopSVG />
            }

          </div>
        </button>
      )}
    </div>
  );
}

export default RightBar;
