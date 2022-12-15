import "../../css/sorting.css";
import { useEffect, useState } from "react";
import { bubbleSortAlgo, generateArray } from "../../utils/sorting-algo";
import Visualization from "./visualization";
import { bubbleSortVisual } from "../../utils/sorting-helper-visual";
import { useAlgo, useAppSelector } from "../../features/hooks";
import Pagination from "../learning/pagination";
import MapKeys from "./sortStats";
import SortSteps from "./sortSteps";

export default function BubbleLesson() {
  const user = useAppSelector((state) => state.user);
  const [array, setArray] = useState([3, 5, 7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]]);
  const [isSorted, setIsSorted] = useState(false);
  let steps = [
    "Start from the first Index, we check the next element",
    "If the first element is greater than the second",
    "They are swapped",
    "Repeat for subsequent indexes",
    "The above process goes on until all sorted",
  ];

  let psuedoCode = [
    "bubbleSort(array)",
    "for i <- 1 to indexOfLastUnsortedElement-1",
    " if leftElement > rightElement",
    "swap leftElement and rightElement",
    "end bubbleSort",
  ];

  const WIDTH = 27;
  const MIN_VAL = 7;
  const MAX_VAL = 50;
  const NUM_BARS = 20;
  const DELAY = 100;
  const PADTOP = 3;
  const MARGIN = 1.5;
  const HEIGHT = 5;
  const FONTSIZE = 15;

  const paragraphs = {
    sortName: "Bubble sort",
    firstP:
      "Bubble Sort swaps adjacent elements if they are in the wrong order, 'bubbling' up the list.",
  };

  useEffect(() => {
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }, []);

  useEffect(() => {
    const copyArr = array.slice();
    setAnimations(useAlgo("bubble", copyArr, false));
  }, [array]);

  function initArr() {
    setClicked(false);
    setIsSorted(false);
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }

  return (
    <Pagination
      clicked={clicked}
      leftName={"Learning"}
      rightName={"Insertion"}
      leftLink={"learning/"}
      rightLink={"learning/insertionLesson"}
    >
      <div className="whole-page-wrapper">
        <div className="sorting-algo">
          <h1 className="explanation-title">{paragraphs.sortName}</h1>
          <p className="explanation-text">{paragraphs.firstP}</p>
        </div>

        <div className="lesson-wrapper-2">
          <div className="visualRow">
            <MapKeys animations={animations}></MapKeys>

            <div className="visual-arrayAndButtons">
              <div className="visual-buttons">
              <button
                className={
                  clicked ? "button disabled clickSort" : "button clickSort"
                }
                disabled={clicked ? true : false}
                onClick={() => initArr()}
              >
                new array
              </button>

              <button
                className={
                  clicked && !isSorted
                    ? "button disabled clickSort"
                    : isSorted
                    ? "button disabled clickSort"
                    : "button clickSort"
                }
                disabled={!isSorted && clicked ? true : isSorted ? true : false}
                onClick={() => {
                  setClicked(true);
                }}
              >
                visualize
              </button>
              </div>
             
              <div className="visual-array">
              <Visualization
                width={WIDTH}
                delay={DELAY}
                margin={MARGIN}
                paddingTop={PADTOP}
                array={array}
                height={HEIGHT}
                fontColor={"white"}
                key={array as any}
                animations={animations}
                clicked={clicked}
                sortingAlgo={bubbleSortVisual}
                setClicked={setClicked}
                setIsSorted={setIsSorted}
                fontSize={FONTSIZE}
                tower={undefined}
                isSorted={false}
              />
              </div>
            </div>

            <SortSteps steps={steps}></SortSteps>
          </div>
        </div>
      </div>
    </Pagination>
  );
}
