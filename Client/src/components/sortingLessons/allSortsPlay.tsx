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
  generateArray,
} from "../../utils/sorting-algo";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useAlgo } from "../../features/hooks";
import Pagination from "../learning/pagination";

export default function AllSortsPlay() {
  const [array, setArray] = useState([] as number[]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]]);
  const [isSorted, setIsSorted] = useState(false);
  const [choiceOfAlgo, setChoiceOfAlgo] = useState(null as any);
  const [DELAY, setDELAY] = useState(5);
  const [width, setWidth] = useState(0);
  const [ascendTRUE, setAscendTRUE] = useState(true);

  let delayRef = useRef<HTMLInputElement>(null);
  let containerRef = useRef(null as any);
  let arrayRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useLayoutEffect(() => {
    setWidth(containerRef.current.offsetWidth);
  }, []);

  const MIN_VAL = 20;
  const MAX_VAL = 300;
  const PADTOP = 2;
  let MARGIN = 1;
  const HEIGHT = 2;
  let FONTSIZE: number;
  
 
  const WIDTH = Number(`${width / array.length - MARGIN * 2}`);

  if (array.length >= 55) {
    FONTSIZE = 0;
  } else {
    FONTSIZE = Number(`${WIDTH / 4}`);
  }

 
  useEffect(() => {
    setArray(generateArray(20, MIN_VAL, MAX_VAL));
  }, []);

  function algoChosen(choice: string) {
    choice = choice?.toLowerCase()
    const copyArr = array.slice();
    setAnimations(useAlgo(choice, copyArr, ascendTRUE))
  }

  useEffect(() => {
    algoChosen(choiceOfAlgo);

    return () => console.log("stop listening");
  }, [choiceOfAlgo, array, ascendTRUE]);

  function initArr(NUM_BARS: number) {
    setIsSorted(false);
    setArray(generateArray(NUM_BARS, MIN_VAL, MAX_VAL));
  }

  function initSpeed(NUM_DELAY: any) {
    setDELAY(NUM_DELAY);
  }

  return (
    <Pagination  clicked={clicked} leftName={'Quick'} rightName={'Learning'} leftLink={'learning/quickLesson'} rightLink={'learning/'}>
    <div className="playContainer">
      <div className="formContainer">
        <label className="sorting-label">
          Array Size: {arrayRef.current?.value + " "}
          <input
          className="allSorts-slider"
            type="range"
            ref={arrayRef}
            disabled={clicked ? true : false}
            name="array-size"
            value={array.length}
            min="8"
            max="150"
            onChange={(e) => {
              setIsSorted(false);
              initArr(e.target.valueAsNumber);
            }}
          />
        </label>

        <label className="sorting-label">
          Delay: {delayRef.current?.value + "% "}
          <input
          className="allSorts-slider"
            ref={delayRef}
            type="range"
            name="speed"
            step="5"
            value={DELAY}
            disabled={clicked ? true : false}
            min="0"
            max="100"
            onChange={(e) => initSpeed(e.target.valueAsNumber)}
          />
        </label>

        {!clicked ? (
          <button
            disabled={
              selectRef.current?.value === "SelectAValue"
                ? true
                : !isSorted
                ? false
                : true
            }
            className={
              selectRef.current?.value === "SelectAValue"
                ? "button disabled clickSort"
                : isSorted
                ? "button disabled clickSort"
                : "button clickSort visual"
            }
            onClick={() => {
              setClicked(true);
            }}
          >
            visualize
          </button>
        ) : (
          <button className="button clickSort">Visualizing</button>
        )}

        <label className="sorting-label">
          {"Algorithms: "}
          <select
            id="sorts"
            className="nice-select"
            defaultValue={"SelectAValue"}
            ref={selectRef}
            disabled={clicked ? true : false}
            placeholder="please select"
            onChange={(e) => {
              setChoiceOfAlgo(e.target.value);
            }}
          >
            <option value="SelectAValue" disabled>
              Select A Value
            </option>
            <option value="Bubble">Bubble</option>

            <option value="Insertion">Insertion</option>

            <option value="Selection">Selection</option>

            <option value="Merge">Merge</option>

            <option value="Quick">Quick</option>
          </select>
        </label>

        <button
          className={
            clicked && !isSorted
              ? "button disabled clickSort ASCEND"
              : "button clickSort ASCEND"
          }
          disabled={clicked ? true : false}
          onClick={() => setAscendTRUE(!ascendTRUE)}
        >
          {ascendTRUE ? "DESCENDING?" : "ASCENDING?"}
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
          fontColor={"white"}
          key={array as any}
          fontSize={FONTSIZE}
          animations={animations}
          clicked={clicked}
          setClicked={setClicked}
          setIsSorted={setIsSorted}
          isSorted={isSorted}
          sortingAlgo={choiceOfAlgo === "Bubble"
            ? bubbleSortVisual
            : choiceOfAlgo === "Insertion"
              ? insertionSortVisual
              : choiceOfAlgo === "Selection"
                ? selectionSortVisual
                : choiceOfAlgo === "Merge"
                  ? mergeSortVisual
                  : quickSortVisual} tower={undefined}        />
      </div>
    </div>
    </Pagination>
  );
}
