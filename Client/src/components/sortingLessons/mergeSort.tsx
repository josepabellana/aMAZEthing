import "../../css/sorting.css";
import { useEffect, useState } from "react";
import { mergeSortAlgo, generateArray } from "../../utils/sorting-algo";
import Visualization from "./visualization";
import { mergeSortVisual } from "../../utils/sorting-helper-visual";
import { useAlgo } from "../../features/hooks";
import Pagination from "../learning/pagination";
import SortSteps from "./sortSteps";
import MapKeys from "./sortStats";

export default function MergeLesson() {
  const [array, setArray] = useState([3, 5, 7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]]);
  const [isSorted, setIsSorted] = useState(false);
  let steps = [
    "Divide the list of items into two smaller lists.",
    "Repeat this process for each of the two smaller lists until each list contains only a single item.",
    "Compare the first item in each (sorted) sub-list, choose the smaller item until 'merged' into a larger (sorted) list.",
    "Continue merging sub lists until there is only one, fully-sorted list remaining.",
  ];

  let isMerge = true


  const WIDTH = 27;
  const MIN_VAL = 7;
  const MAX_VAL = 100;
  const NUM_BARS = 20;
  const FONTSIZE = 15
  const DELAY = 10;
  const PADTOP = 3;
  const MARGIN =1.5;
  const HEIGHT = 2.5;

  const paragraphs = {
    sortName: "Merge sort",
    firstP:
      "Merge sort is a recursive, divide-and-conquer algorithm. It breaks down a list into (sorted) single elements, and then efficiently merges them back into a sorted list.",
  };

  useEffect(() => {
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }, []);

  useEffect(() => {
    console.log(array);
    const copyArr = array.slice();
    setAnimations(useAlgo("merge", copyArr, false));
  }, [array]);

  function initArr() {
    setClicked(false);
    setIsSorted(false);
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }

  return (
    <Pagination   clicked={clicked} leftName={'Selection'} rightName={'Quick'} leftLink={'learning/selectionLesson'} rightLink={'learning/quickLesson'}>
    <div className="whole-page-wrapper">
      <div className="sorting-algo">
        <h1 className="explanation-title">{paragraphs.sortName}</h1>
        <p className="explanation-text">{paragraphs.firstP}</p>
      </div>

     < div className="lesson-wrapper-2">
          <div className="visualRow">
            <MapKeys isTrue ={'Merge'} animations={animations}   ></MapKeys>

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
                sortingAlgo={mergeSortVisual}
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
