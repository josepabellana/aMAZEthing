import '../../css/sorting.css';
import { increaseTowersSorting } from '../../features/game_slice';
import { useAppDispatch } from '../../features/hooks';


export default function Visualization({
  array, 
  animations, 
  clicked, 
  sortingAlgo, 
  margin = 5, 
  fontColor = 'var(--white-green)', 
  fontSize = 15, 
  paddingTop,
  width, 
  delay = 100, 
  height = 20, 
  tower = '', 
  setClicked = () => {},
  setIsSorted
}:{
  array: number[],
  animations: number[][],
  sortingAlgo:any,
  clicked:boolean,
  margin:number,
  fontColor?: string,
  fontSize?: number,
  paddingTop?: number,
  width: number,
  delay: number,
  height: number,
  tower: string|any,
  isSorted?:boolean,
  setClicked?: (value: boolean | ((prevVar: boolean) => boolean)) => void,
  setIsSorted?:(value: boolean | ((prevVar: boolean) => boolean)) => void,
}
) {

    const dispatch = useAppDispatch();  

    if(clicked) {
      if (tower) dispatch(increaseTowersSorting(tower));
        sortingAlgo(animations, delay, width, margin, tower, height, () => {
          setClicked(false) 
          setIsSorted?.(true)})
    }

    return(
        <div className="array">
            {array.map((element:number, index:number) => {
            return (
            <div
              className={`array-el${tower}`}
              style={{
                backgroundColor: 'grey',
                height: `${element*height}px`,
                width: `${width}px`,
                margin: `${margin}px`,
                paddingTop: `${paddingTop}px`,
                transition: `transform ${delay/1000}s ease-in-out `,
                color: `${fontColor}`,
                fontSize:`${fontSize}px`
              }}
              id={`${index}arrayColumn${tower}`}
              key={`${index}`}
            >
              {element}
            </div>
          )})}        
        </div>
    )
}