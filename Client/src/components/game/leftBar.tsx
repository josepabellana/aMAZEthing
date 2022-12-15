import '../../css/game/leftBar.css';
import { minionType, TowerType } from '../../utils/types';
import FlagSVG from '../svg/flagSVG';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { ZoomInSVG, ZoomOutSVG } from '../svg/zoomButtonsSVG';
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from '../svg/animalsSVG';
import TowerSVG from '../svg/towerSVG';
import { zoomIn, zoomOut } from '../../features/game_slice';
import { whichAnimalSVG } from '../../features/hooks';

export function zoomHover(zoomInOrOut: string, color: string) {
  document.querySelectorAll(`.zoom-${zoomInOrOut}-svg`).forEach((svgEl) => {
    (svgEl as unknown as HTMLElement).style.fill = `${color}`;
    (svgEl as unknown as HTMLElement).style.stroke = `${color}`;
  });
}



export default function LeftBar () {

  const user = useAppSelector((state) => state.user);
  const {gameStats, minions, currentPlayer, currentMinion, currentTower, towers} = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  return (
    <div className="leftBarContainer">
      <div className="flags">
        <div className="p1Flag">
          <FlagSVG
            playerName={(currentPlayer === 'p1') ? user.username : 'Opponent'}
            playerScore={gameStats.p1Towers.length}
            playerClass="p1FlagColor"
            textReverse="text-reverse-nope"
          />
        </div>
        <div className="p2Flag">
          <FlagSVG
            playerName={(currentPlayer === 'p2') ? user.username : 'Opponent'}
            playerScore={gameStats.p2Towers.length}
            playerClass="p2FlagColor"
            textReverse="text-reverse-yep"
          />
        </div>
      </div>

      <div className="money-time">
        <h3 className="time-money-text">Time remaining</h3>
        <h3 className="time-count">{gameStats.timeRemaining}</h3>
        <h3 className="time-money-text">Money</h3>
        <h3 className="money-count price">{currentPlayer === 'p1' ? gameStats.p1Coins : gameStats.p2Coins}</h3>
      </div>
      <div className="scores"></div>
      <div className="selected-info">
        {currentMinion !== null && minions[currentMinion] && (
          <div className="current-minion-left-bar">
            <div className="left-just-top">
              <h1 className="current-minion-name-left-bar">
                {minions[currentMinion].name}
              </h1>
              <h1 className="current-minion-svg-left-bar">
                {whichAnimalSVG(minions[currentMinion])}
              </h1>
            </div>

            <h1 className="left-just-stats">{minions[currentMinion].type}</h1>

            <h1 className="left-just-text">Alignment</h1>
            <h1 className="left-just-stats">
              {minions[currentMinion].alignment}
            </h1>

            <h1 className="left-just-text">Path finding</h1>
            <h1 className="left-just-stats">
              {minions[currentMinion].pathFindingAlgo}
            </h1>

            <h1 className="left-just-text">Sorting</h1>
            <h1 className="left-just-stats">
              {minions[currentMinion].sortingAlgo}
            </h1>

            <h1 className="left-just-text">Sorting speed</h1>
            <h1 className="left-just-stats">
              {minions[currentMinion].sortingSpeed}
            </h1>

            <h1 className='left-just-text'>Speed</h1>
            <h1 className='left-just-stats'>{minions[currentMinion].movementSpeed}</h1>
          </div>
        )}

        {currentTower !== null && (
          <div>
            {towers.find((tower) => tower.id === currentTower.id)!.alignment ===
            'none' ? (
              <h1 className="current-minion-name-left-bar">unsorted</h1>
            ) : (
              <h1 className="current-minion-name-left-bar left-bar-tower-alignment">
                {currentTower && currentTower.alignment === 'none' ? 'neutral tower' :
                                currentTower.alignment === currentPlayer ? 'your tower' : "opponent's tower"
                }
              </h1>
            )}
            {towers.find((tower) => tower.id === currentTower.id)!.alignment ===
            'none' ? (
              <h1 className="current-minion-svg-left-bar">
                {
                  <TowerSVG
                    playerClass={'neutralTower'}
                  />
                }
              </h1>
            ) : (
              <h1 className="current-minion-svg-left-bar">
                {
                  <TowerSVG
                    playerClass={
                      towers.find((tower) => tower.id === currentTower.id)!
                        .alignment + '-color'
                    }
                  />
                }
              </h1>
            )}
            <h1 className="left-bar-tower-array">
              {currentTower &&
                towers
                  .find((tower) => tower.id === currentTower.id)!
                  .numbers.join(', ')}
            </h1>
            {currentTower.minion !== null && (
              <h1 className="left-just-text">
                Tower contains minion{' '}
                {currentTower &&
                  towers.find((tower) => tower.id === currentTower.id)!.minion}
              </h1>
            )}
          </div>
        )}
      </div>

      <div className="zoom-buttons">
        <div
          className="zoomInButton"
          onMouseEnter={() => zoomHover('in', 'var(--yellow)')}
          onMouseLeave={() => zoomHover('in', 'var(--white-green)')}
          onClick={() => dispatch(zoomIn(10))}
        >
          <ZoomInSVG />
        </div>
        <div
          className="zoomOutButton"
          onMouseEnter={() => zoomHover('out', 'var(--yellow)')}
          onMouseLeave={() => zoomHover('out', 'var(--white-green)')}
          onClick={() => dispatch(zoomOut(10))}
        >
          <ZoomOutSVG />
        </div>
      </div>
    </div>
  );
}