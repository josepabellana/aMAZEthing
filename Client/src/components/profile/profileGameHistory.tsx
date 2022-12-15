import '../../css/profileGameHistory.css';
import { useAppSelector } from '../../features/hooks';
import TowerSVG from '../svg/towerSVG';
import { Squirrel } from '../svg/animalsSVG';
import CoinSVG from './coin';

export default function ProfileGameHistory() {
  const user = useAppSelector((state) => state.user);
  const games = [...user.games].reverse();

  return (
    <div className="gameDashboard">
      {games.map((element: any, index: number) => {
        // console.log(element);
        return (
          <div
            className={` match
          ${element.result === 'win' && 'match-win'}
          ${element.result === 'loss' && 'match-loss'}
          ${element.result === 'draw' && 'match-draw'}
          `}
            key={index}
          >
            <div className="gameDuration">
              <div className='game-status'>
              <div>
                {element.result === 'win' && (
                  <h1 className="result-win">{element.result}</h1>
                )}
                {element.result === 'loss' && (
                  <h1 className="result-loss">{element.result}</h1>
                )}
                {element.result === 'draw' && (
                  <h1 className="result-draw">{element.result}</h1>
                )}
              </div>
              <div className="date">
                <h3 className="durationDate">
                  DATE: {new Date(element.finishedAt).toLocaleString()}
                </h3>
              </div>
              </div>
              <div className="stats-profile">
                <div className="minionStats">
                  <h3 className="gameStatsText">{element.minions}</h3>
                  <h3>Minions</h3>
                </div>
                <div className="towerStats">
                  <h3 className="gameStatsText">{element.towers}</h3>
                  <h3>Towers</h3>
                </div>
                <div className="goldStats">
                  <h3 className="gameStatsText">{element.gold}</h3>
                  <h3>Gold</h3>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
