import '../../css/game/rightBar.css';
import ShopSVG from '../svg/ShopSVG';
import { animal, minionType, TowerType } from '../../utils/types';
import { useEffect, useState } from 'react';
import Shop from './shop';
import CloseCross from '../svg/closeCross';
import { useAppDispatch, useAppSelector, whichAnimalSVG } from '../../features/hooks';
import { updateCurrentMinion, updateCurrentTower } from '../../features/game_slice';

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

function RightBar({addNewMinion}: {addNewMinion: (type: animal, player: 'p1' | 'p2') => void}) {

  const [shopOpen, setShopOpen] = useState(false);
  const { allTilesHidden, currentPlayer, minions, currentMinion, movingMinions, towers } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  let allPlayerMinions: Array<minionType> = [];

  [minions].forEach((allMinions) => {
    for (const minion in allMinions) {
      if (allMinions[minion].alignment === currentPlayer) {
        allPlayerMinions.push(allMinions[minion]);
      }
    }
  });


  console.log(movingMinions);
  console.log(allPlayerMinions);

  let minionsToRender = allPlayerMinions.map((p1minion) => {

    return (
      <>
        <div className={`your-minion-button right-bar-selector-${p1minion.id} ${currentMinion === p1minion.id ? 'right-bar-selected-animal' : ''}`} onClick={() => {
            dispatch(updateCurrentMinion(p1minion.id));
            dispatch(updateCurrentTower(null));
          }}>
          <h1 className='right-bar-name'>{p1minion.name}</h1>
          <h1 className='current-minion-svg-left-bar'>{whichAnimalSVG(minions[p1minion.id])}</h1>
          {movingMinions.includes(p1minion.id) && <h3 className='right-just-text'>moving</h3>}
          {p1minion.inTower && <h3 className='right-just-text'>in tower</h3>}

        </div>
      </>
    )
  })




  return (
    <div className='right-bar'>

      {shopOpen ? (
        <Shop currentPlayer = {currentPlayer} addNewMinion={addNewMinion} setShopOpen={setShopOpen}/>
      ) : <div className='your-minions'>

      {minions &&

        <>
            <h1 className='your-animals-sign'>your animals</h1>
            <ul className='your-minions-list'>
            {minionsToRender}
            {allPlayerMinions.length < 1 &&
              <div className='open-shop-arrow'>
                <button
                  className="scroll-learning"
                  onClick={() => {setShopOpen(true)}} //TODO THis is not taking care of the navbar - Either we add an offset of 10VH or we take out the navbar after certain files
                >
                  <h3>Buy an animal</h3>
                  <h3 className='bounce'>↓</h3>
                </button>
              </div>
            }
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
