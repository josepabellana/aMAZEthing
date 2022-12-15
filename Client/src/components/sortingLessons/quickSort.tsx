import "../../css/sorting.css";
import { useEffect, useState } from "react";
import { generateArray } from "../../utils/sorting-algo";
import Visualization from "./visualization";
import { quickSortVisual } from "../../utils/sorting-helper-visual";
import { quickSortAlgo } from "../../utils/sorting-algo";
import { useAlgo } from "../../features/hooks";
import Pagination from "../learning/pagination";
import SortSteps from "./sortSteps";
import MapKeys from "./sortStats";

export default function QuickLesson() {
  const [array, setArray] = useState([3, 5, 7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]]);
  const [isSorted, setIsSorted] = useState(false);



  let steps = [
    "Choose a pivot element from the list",
    "Divide the list into two sub-lists. First sub-list contains all the elements that are less than the pivot element, and the second sub-list vice-versa.",
    "Sort each sub-list using the Quick Sort algorithm.",
    "Combine the two sorted sub-lists and the pivot element to create a fully sorted list.",
    "Repeat the process until the entire list is sorted",
  ];


  let isQuick = true


  const WIDTH = 27;
  const MIN_VAL = 5;
  const MAX_VAL = 100;
  const NUM_BARS = 20;
  const FONTSIZE = 15
  const DELAY = 10;
  const PADTOP = 5;
  const MARGIN = 1.5;
  const HEIGHT = 2.5;

  const paragraphs = {
    sortName: "Quick sort",
    firstP:
      "Quick sort is a sorting algorithm that works by partitioning a list of items into two smaller sub-lists. The algorithm then sorts each sub-list recursively until the entire list is sorted.",
  };

  useEffect(() => {
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }, []);

  useEffect(() => {
    console.log(array);
    const copyArr = array.slice();
    setAnimations(useAlgo("quick", copyArr, false));
  }, [array]);

  function initArr() {
    setClicked(false);
    setIsSorted(false);
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }

  return (
    <Pagination  clicked={clicked} leftName={'Merge'} rightName={'Customize'} leftLink={'learning/mergeLesson'} rightLink={'learning/allSortsPlay'}>
    <div className="whole-page-wrapper">
      <div className="sorting-algo">
        <h1 className="explanation-title">{paragraphs.sortName}</h1>
        <p className="explanation-text">{paragraphs.firstP}</p>
      </div>

      < div className="lesson-wrapper-2">
          <div className="visualRow">
            <MapKeys isTrue ={'Quick'} animations={animations}></MapKeys>

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
                sortingAlgo={quickSortVisual}
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
