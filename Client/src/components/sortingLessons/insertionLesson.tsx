import "../../css/sorting.css";
import { useState, useEffect } from "react";
import { insertionSortAlgo, generateArray } from "../../utils/sorting-algo";
import Visualization from "./visualization";
import { useAlgo } from "../../features/hooks";
import { insertionSortVisual } from "../../utils/sorting-helper-visual";
import Pagination from "../learning/pagination";
import SortSteps from "./sortSteps";
import MapKeys from "./sortStats";

export default function InsertionLesson() {
  const [array, setArray] = useState([3, 5, 7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]]);
  const [isSorted, setIsSorted] = useState(false);
  let steps = [
    "Assume the elements to the left are sorted.",
    "Compare the current element to the previous element.",
    "Swap if the current element is out of place.",
    "Repeat until the current element is sorted.",
    "Repeat for the rest of the array.",
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
    sortName: "Insertion sort",
    firstP:
      "Insertion sort compares an element to the previous elements one by one, 'bubbling' down until the sub array is sorted.",
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
    <Pagination
      clicked={clicked}
      leftName={"Bubble"}
      rightName={"Selection"}
      leftLink={"learning/bubbleLesson"}
      rightLink={"learning/selectionLesson"}
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
                sortingAlgo={insertionSortVisual}
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
