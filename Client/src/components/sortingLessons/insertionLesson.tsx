import "../../css/sorting.css";
import { useState, useEffect } from "react";
import { insertionSortAlgo, generateArray } from "../../utils/sorting-algo";
import Visualization from "./visualization";
import { useAlgo } from "../../features/hooks";
import { insertionSortVisual } from "../../utils/sorting-helper-visual";

export default function InsertionLesson() {
  const [array, setArray] = useState([3, 5, 7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]]);
  const [isSorted, setIsSorted] = useState(false);

  const WIDTH = 35;
  const MIN_VAL = 3;
  const MAX_VAL = 50;
  const NUM_BARS = 20;
  const DELAY = 150;
  const PADTOP = 10;
  const MARGIN = 3;
  const HEIGHT = 5;

  const paragraphs = {
    sortName: "Insertion sort",
    firstP:
      "Starts on one side and compares two first items, sorts them and moves on to the next item checking if it is smaller than the previous items and places it in its place. Worst time complexity O(N^2). ",
  };

  useEffect(() => {
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }, []);

  useEffect(() => {
    console.log(array);
    const copyArr = array.slice();
    setAnimations(useAlgo("insertion", copyArr, false));
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
          height={HEIGHT}
          paddingTop={PADTOP}
          array={array}
          key={array}
          animations={animations}
          clicked={clicked}
          sortingAlgo={insertionSortVisual}
          setClicked={setClicked}
          setIsSorted={setIsSorted}
        />
      </div>
    </div>
  );
}
