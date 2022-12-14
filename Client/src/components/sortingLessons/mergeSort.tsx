import "../../css/sorting.css";
import { useEffect, useState } from "react";
import { mergeSortAlgo, generateArray } from "../../utils/sorting-algo";
import Visualization from "./visualization";
import { mergeSortVisual } from "../../utils/sorting-helper-visual";
import { useAlgo } from "../../features/hooks";

export default function MergeLesson() {
  const [array, setArray] = useState([3, 5, 7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]]);
  const [isSorted, setIsSorted] = useState(false);

  const WIDTH = 35;
  const MIN_VAL = 10;
  const MAX_VAL = 100;
  const NUM_BARS = 25;
  const DELAY = 5;
  const PADTOP = 10;
  const MARGIN = 3;
  const HEIGHT = 3;

  const paragraphs = {
    sortName: "Merge sort",
    firstP:
      "Bubble Sort is the simplest sorting algorithm that swaps two elements if they are in the wrong order. As we go through each element, if the current element is bigger than the next one, we swap them. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.",
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
    <div className="whole-page-wrapper">
      <div className="sorting-algo">
        <h1 className="explanation-title">{paragraphs.sortName}</h1>
        <p className="explanation-text">{paragraphs.firstP}</p>
      </div>

      <div className="lesson-wrapper-2">
        <div>
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

        <Visualization
          fontColor={"white"}
          width={WIDTH}
          delay={DELAY}
          margin={MARGIN}
          paddingTop={PADTOP}
          height={HEIGHT}
          array={array}
          key={array}
          animations={animations}
          clicked={clicked}
          sortingAlgo={mergeSortVisual}
          setClicked={setClicked}
          setIsSorted={setIsSorted}
        />
      </div>
    </div>
  );
}
