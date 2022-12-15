import '../../css/flagSVG.css';
export default function FlagSVG({ playerClass, textReverse, playerScore, playerName }: { playerName: string, playerScore: number, playerClass: string, textReverse: string }) {
  let currentNameOffsetX;

  if (playerClass.includes('p1')) {
    currentNameOffsetX = '120';
  } else if (playerClass.includes('p2')) {
    currentNameOffsetX = '-70';
  }


  return (
    <svg
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 711.998 611.998'
      >
      <path
        className={playerClass}
        d='M82.659,27.601C145.91,27.601,145.91,0,209.16,0c63.254,0,63.254,27.601,126.507,27.601
        S398.921,0,462.174,0v245.607c-63.254,0-63.254,27.601-126.507,27.601s-63.254-27.601-126.507-27.601
        c-63.251,0-63.251,27.601-126.501,27.601L82.659,27.601L82.659,27.601z'
      />
      <rect x='49.823' y='0' fill='#000000;' width='35.881' height='511.998' />
      <text id={textReverse} x="220" y="200" fontSize="200" fill="black">{playerScore}</text>
      <text id={textReverse} className='player-name' x={currentNameOffsetX} y="430" fontSize="130" fill="var(--white-green)">{playerName}</text>
    </svg>
  );
}
