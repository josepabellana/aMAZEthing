import '../../css/game/shop.css';
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from '../svg/animalsSVG';
import { animal, badger, bear, deer, hare, koala, minionType, squirrel } from '../../utils/types';
import { useAppDispatch } from '../../features/hooks';

export default function Shop({
  minions,
  currentPlayer,
  addNewMinion 
}: {
  minions: {[key: number]: minionType},
  currentPlayer: 'p1' | 'p2',
  addNewMinion: (type: animal, player: 'p1' | 'p2') => void
}) {

  const dispatch = useAppDispatch();

  function shopItem(animal: animal) {
    return (
    <div  className='buy-minion-button' onClick={() => addNewMinion(animal, currentPlayer)}>
    <div className='shop-stats'>
      <h1 className='shop-just-stats'>{animal.type}</h1>

      <h1 className='shop-just-text'>Price</h1>
      <h1 className='shop-just-stats price'>3000</h1>

      <h1 className='shop-just-text'>Sorting</h1>
      <h1 className='shop-just-stats'>{animal.sortingAlgo}</h1>

      <h1 className='shop-just-text'>Path finding</h1>
      <h1 className='shop-just-stats'>{animal.pathFindingAlgo}</h1>

      <h1 className='shop-just-text'>Speed</h1>
      <h1 className='shop-just-stats'>{animal.sortingSpeed}</h1>
    </div>
    <div className='in-shop-svg-large'>
      {theRightSVG(animal.type)}
    </div>
  </div>
  )
  }

  function theRightSVG (animalType: string) {
    if (animalType === 'Squirrel') return <Squirrel currentPlayer='neutralTower' />
    if (animalType === 'Badger') return <Badger currentPlayer='neutralTower' />
    if (animalType === 'Hare') return <Hare currentPlayer='neutralTower' />
    if (animalType === 'Deer') return <Deer currentPlayer='neutralTower' />
    if (animalType === 'Koala') return <Koala currentPlayer='neutralTower' />
    if (animalType === 'Bear') return <Bear currentPlayer='neutralTower' />
  }

  return (

    <div className='shop-page'>
      <h1 className='the-shop-sign'>Shop</h1>
      <ul className='shop-list'>
        {shopItem(squirrel)}
        {shopItem(badger)}
        {shopItem(hare)}
        {shopItem(deer)}
        {shopItem(koala)}
        {shopItem(bear)}
      </ul>
    </div>
  );
}
