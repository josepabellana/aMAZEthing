import '../../css/game/mud.css';
import { useAppSelector } from '../../features/hooks';

function Mud ({xPos, yPos}: {xPos: number, yPos: number}) {
  const {boxSize} = useAppSelector(state => state.game);
  return (
    <div className="mud" style={{left: `${(xPos + 0.25) * boxSize}px`, top: `${(yPos + 0.25) * boxSize}px`, width: `${boxSize*0.5}px`, height: `${boxSize*0.5}px`}}>
    </div>
  )
}

export default Mud;