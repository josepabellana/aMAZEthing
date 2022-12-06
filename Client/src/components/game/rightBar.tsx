import '../../css/game/rightBar.css';
import ShopSVG from '../svg/ShopSVG';
import { animal, minionType } from '../../utils/types';
import { useEffect, useState } from 'react';
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
    (minion as unknown as HTMLElement).style.backgroundColor = 'var(--main-green)';
    // (minion as unknown as HTMLElement).style.borderColor = 'var(--main-green)';
    (minion as unknown as HTMLElement).classList.remove('right-bar-selected-animal');

  });

  const allYourMinionsTextColor = document.querySelectorAll('.your-minion-button .right-bar-name');
  allYourMinionsTextColor.forEach(text => {
    (text as unknown as HTMLElement).style.color = 'var(--white-green)';
  });

  (document.querySelector(`.right-bar-selector-${currentMinId}`) as unknown as HTMLElement).style.backgroundColor = 'var(--purple)';
  // (document.querySelector(`.right-bar-selector-${currentMinId}`) as unknown as HTMLElement).style.borderColor = 'var(--yellow)';
  (document.querySelector(`.right-bar-selector-${currentMinId} .right-bar-name`) as unknown as HTMLElement).style.color = 'var(--yellow)';
  (document.querySelector(`.right-bar-selector-${currentMinId}`) as unknown as HTMLElement).classList.add('right-bar-selected-animal');
}

function RightBar({addNewMinion}: {addNewMinion: (type: animal, player: 'p1' | 'p2') => void}) {

  const [shopOpen, setShopOpen] = useState(false);
  const { allTilesHidden, currentPlayer, minions, currentMinion } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  let allPlayerMinions: Array<minionType> = [];

  [minions].forEach((allMinions) => {
    for (const minion in allMinions) {
      if (allMinions[minion].alignment === currentPlayer) {
        allPlayerMinions.push(allMinions[minion]);
      }
    }
  });

  // console.log(allPlayerMinions.length);
  useEffect(() => {
    if (currentMinion !== null) styleCurrentMinionBorder(currentMinion as number);
  }, [currentMinion]);


  let minionsToRender = allPlayerMinions.map((p1minion) => {

    return (
      <>
        <div className={`your-minion-button right-bar-selector-${p1minion.id}`} onClick={() => {
            dispatch(updateCurrentMinion(p1minion.id));
            styleCurrentMinionBorder(currentMinion as number);
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
                  <h3>↓</h3>
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
