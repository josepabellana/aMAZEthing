import "../../css/allSortsPlay.css";
import Visualization from "./visualization";

import {
  bubbleSortVisual,
  insertionSortVisual,
  mergeSortVisual,
  selectionSortVisual,
  quickSortVisual,
} from "../../utils/sorting-helper-visual";
import {
  bubbleSortAlgo,
  insertionSortAlgo,
  mergeSortAlgo,
  selectionSortAlgo,
  quickSortAlgo,
  generateArray
} from "../../utils/sorting-algo";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

export default function AllSortsPlay() {
  const [array, setArray] = useState([] as number[])
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]]);
  const [isSorted, setIsSorted] = useState(false);
  const [choiceOfAlgo, setChoiceOfAlgo] = useState(null as any)
  const [DELAY, setDELAY] = useState(5)
  const [width, setWidth] = useState(0);
  const [ascendTRUE, setAscendTRUE] = useState(true)

  let delayRef = useRef<HTMLInputElement>(null)
  let containerRef = useRef(null as any)
  let arrayRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null);

  console.log(selectRef.current?.value )

  useLayoutEffect(() => {
    setWidth(containerRef.current.offsetWidth);
  }, []);



  let MIN_VAL = 20;
  let MAX_VAL = 300;
  let PADTOP = 10;
  let MARGIN = 1;
  let HEIGHT = 2;
  let WIDTH = Number(`${(width/array.length)-(MARGIN*2)}`) ;
  let FONTSIZE:number

  if(array.length >= 55) {
    FONTSIZE = 0.0000000001
  } else {
    FONTSIZE = Number(`${WIDTH/4}`)
  }

  useEffect(() => {
    setArray(generateArray(20, MIN_VAL, MAX_VAL));
  }, []);

  function algoChosen(choice:string) {
    const copyArr = array.slice()
    if(choice === 'Bubble')  {
      setAnimations(bubbleSortAlgo(copyArr, ascendTRUE));
    }
    if(choice === 'Insertion')  {
      setAnimations(insertionSortAlgo(copyArr, ascendTRUE));
    }
    if(choice === 'Selection')  {
      setAnimations(selectionSortAlgo(copyArr, ascendTRUE));
    }
    if(choice === 'Merge')  {
      setAnimations(mergeSortAlgo(copyArr, ascendTRUE));
    }
    if(choice === 'Quick')  {
      setAnimations(quickSortAlgo(copyArr, ascendTRUE));
    }
  }

  useEffect(() => {
    algoChosen(choiceOfAlgo)

    return(() => console.log('stop listening'))

  }, [choiceOfAlgo, array, ascendTRUE]);

  function initArr(NUM_BARS:number) {
    setIsSorted(false)
    setArray(generateArray(NUM_BARS, MIN_VAL, MAX_VAL));
  }

  function initSpeed(NUM_DELAY:any) {
    setDELAY(NUM_DELAY)
  }


  return (
    <div className="playContainer">
      <div className="formContainer">
          <label className="sorting-label">
            Array Size:{arrayRef.current?.value+ " "}
            <input type="range" ref={arrayRef}  disabled={clicked ? true : false} name="array-size" value={array.length}
         min="8" max="150" onChange={(e) => {
          setIsSorted(false)
          initArr(e.target.valueAsNumber)}} />
          </label>


          <label className="sorting-label">
            Delay: {delayRef.current?.value+ " "}
            <input ref={delayRef} type="range" name="speed" step="5" value={DELAY} disabled={clicked ? true : false} min="1" max="101" onChange={(e) => initSpeed(e.target.valueAsNumber)}/>
          </label>

          {!clicked ? 
            <button
            disabled={selectRef.current?.value === 'SelectAValue' ? true : isSorted ? true : false}
            className={selectRef.current?.value === 'SelectAValue' ? "button disabled clickSort" : isSorted ? "button disabled clickSort" : "button clickSort visual"}
              onClick={() => {
                setClicked(true);
              }}
            >
              visualize
            </button>
            :
            <button className="button clickSort"> Hol up...</button>
          }


          <label className="sorting-label">
            {'Algorithms: '}
          <select id="sorts" className="nice-select" defaultValue={'SelectAValue'} ref={selectRef} disabled={clicked ? true : false} placeholder="please select" onChange={(e) => {
            setChoiceOfAlgo(e.target.value)}
          }
            >
          <option value= 'SelectAValue' disabled >
             Select A Value
            </option >
             <option value= 'Bubble' >
              Bubble
            </option >

            <option value= 'Insertion' >
              Insertion
            </option >

            <option value= 'Selection' >
              Selection
            </option >

            <option value= 'Merge' >
              Merge
            </option >

            <option value= 'Quick' >
              Quick
            </option >
          </select>
          </label>

        

          <button  className={ clicked && !isSorted ? "button disabled clickSort ASCEND" : "button clickSort ASCEND"}  disabled={clicked ? true : false} onClick={() => setAscendTRUE(!ascendTRUE)}>
            {ascendTRUE ? 'DESCENDING?' : 'ASCENDING?'}
          </button>

      </div>
      <div className="visualize-container" ref={containerRef}>
      <Visualization 
       width={WIDTH}
          delay={DELAY}
          margin={MARGIN}
          paddingTop={PADTOP}
          array={array}
          height={HEIGHT}
          fontColor={'white'}
          key={array}
          fontSize={FONTSIZE}
          animations={animations}
          clicked={clicked}
          setClicked={setClicked}
          setIsSorted={setIsSorted}
          isSorted={isSorted}
          sortingAlgo={
            choiceOfAlgo === 'Bubble' ? bubbleSortVisual :
            choiceOfAlgo === 'Insertion' ? insertionSortVisual :
            choiceOfAlgo === 'Selection' ? selectionSortVisual :
            choiceOfAlgo === 'Merge' ? mergeSortVisual :
            quickSortVisual
          }
          />
      </div>
    </div>
  );
}
