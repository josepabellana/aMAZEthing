import '../../css/learning/curveSortSVG.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../features/hooks';
import { refreshSortingPath } from '../../features/user_slice';
import NutSVG from './learningNut';
import apiService from '../../services/apiService';
import GrassSVG from './learningGrass';
import TreeFilledSVG from './treeFilled';
import TreeWinterSVG from './treeWinter';

function CurveSort() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  function updateSVGHelper(
    e: any,
    numCheck: number,
    updateNum: number,
    navigateURL: string
  ) {
    if (
      isAuthenticated &&
      user.sortLessons[numCheck] &&
      !user.sortLessons[updateNum]
    ) {
      updateSortingPaths(e, updateNum);
    }
    if (isAuthenticated && user.sortLessons[numCheck]) {
      navigate(navigateURL);
    }
    if (
      !isAuthenticated &&
      JSON.parse(localStorage.getItem('sorting') as any)[numCheck] &&
      !JSON.parse(localStorage.getItem('sorting') as any)[updateNum]
    ) {
      updateSortingPaths(e, updateNum);
    }
    if (
      !isAuthenticated &&
      JSON.parse(localStorage.getItem('sorting') as any)[numCheck]
    ) {
      navigate(navigateURL);
    }
  }

  function localArray(num: number) {
    const sortArray = Array(6).fill(false);
    for (let i = 0; i < sortArray.length; i++) {
      if (i <= num) sortArray[i] = true;
      else break;
    }
    return sortArray;
  }

  async function updateSortingPaths(e: any, num: number) {
    e.preventDefault();
    const sortArray = localArray(num);
    if (!isAuthenticated) {
      window.localStorage.setItem('sorting', JSON.stringify(sortArray));
    }
    try {
      const accessToken = await getAccessTokenSilently();
      const obj = await apiService.updateSortLearning(accessToken, {
        email: user.email,
        sortArr: sortArray,
      });
      if (obj.user) dispatch(refreshSortingPath(obj.user));
    } catch (err) {
      console.log(err);
    }
  }

  function helperCSS(updateNum: number) {
    if (isAuthenticated) return user.sortLessons[updateNum];
    else return JSON.parse(localStorage.getItem('sorting') as any)[updateNum];
  }

  return (
    <div className="curve">
      <svg viewBox="-10 4 140 24">
        {/* L - line, Q - curve */}
        <path
          className="learning-path"
          d="
              M -10, 15
              L 15, 15
            "
        />
        <path
          className="learning-path"
          d="
              M 15, 15
              Q 20, 15
                20, 20
            "
        />
        <path
          className="learning-path"
          d="
              M 20, 20
              L 20, 25
            "
        />
        <path
          className="learning-path"
          d="
              M 20, 25
              Q 20, 30
                25, 30
            "
        />
        <path
          className="learning-path"
          d="
              M 25, 30
              L 35, 30
            "
        />
        <path
          className="learning-path"
          d="
              M 35, 30
              Q 40, 30
                40, 25
            "
        />
        <path
          className="learning-path"
          d="
              M 40, 25
              L 40, 10
            "
        />
        <path
          className="learning-path"
          d="
              M 40, 10
              Q 40, 5
                45, 5
            "
        />
        <path
          className="learning-path"
          d="
              M 45, 5
              L 60, 5
            "
        />
        <path
          className="learning-path"
          d="
              M 60, 5

              Q 65, 5
                65, 10
            "
        />
        <path
          className="learning-path"
          d="
              M 65, 10
              L 65, 15
            "
        />
        <path
          className="learning-path"
          d="
              M 65, 15
              Q 65, 20
                70, 20
            "
        />
        <path
          className="learning-path"
          d="
              M 70, 20
              L 90, 20
            "
        />
        <path
          className="learning-path"
          d="
              M 90, 20
              Q 95, 20
                95, 25
            "
        />
        <path
          className="learning-path"
          d="
              M 95, 25
              L 95, 30
            "
        />
        <path
          className="learning-path"
          d="
              M 95, 30
              Q 95, 35
                100, 35
            "
        />
        <path
          className="learning-path"
          d="
              M 100, 35
              L 130, 35
            "
        />
        <circle
          className={helperCSS(0) ? 'circles doneLesson' : 'circles'}
          id="circle-bubble-sort"
          onClick={(e) => {
            if (!helperCSS(0)) {
              updateSortingPaths(e, 0);
            }
            navigate('/learning/bubbleLesson');
          }}
          cx="10"
          cy="14.6"
          r="3"
        />
        <svg className="nut" x="7.75" y="12.25">
          <NutSVG />
        </svg>
        <text x="5" y="10" className="lesson-name">
          Bubble sort
        </text>
        <circle //INSERTION
          className={
            helperCSS(1)
              ? 'circles doneLesson'
              : helperCSS(0)
              ? 'circles'
              : 'circles disabled'
          }
          onClick={(e) => updateSVGHelper(e, 0, 1, '/learning/insertionLesson')}
          cx="30.2"
          cy="29.6"
          r="3"
        />
        <svg className="nut" x="28" y="27.25">
          <NutSVG />
        </svg>
        <text x="24" y="36" className="lesson-name">
          insertion sort
        </text>
        <circle
          className={
            helperCSS(2)
              ? 'circles doneLesson'
              : helperCSS(1)
              ? 'circles'
              : 'circles disabled'
          }
          onClick={(e) => updateSVGHelper(e, 1, 2, '/learning/selectionLesson')}
          cx="43"
          cy="6"
          r="3"
        />
        <svg className="nut" x="40.75" y="3.75">
          <NutSVG />
        </svg>
        <text x="37" y="1" className="lesson-name">
          Selection sort
        </text>
        <circle
          className={
            helperCSS(3)
              ? 'circles doneLesson'
              : helperCSS(2)
              ? 'circles'
              : 'circles disabled'
          }
          onClick={(e) => updateSVGHelper(e, 2, 3, '/learning/mergeLesson')}
          cx="65.2"
          cy="12.6"
          r="3"
        />
        <svg className="nut" x="63" y="10.5">
          <NutSVG />
        </svg>{' '}
        <text x="53" y="18" className="lesson-name">
          Merge sort
        </text>
        <circle
          className={
            helperCSS(4)
              ? 'circles doneLesson'
              : helperCSS(3)
              ? 'circles'
              : 'circles disabled'
          }
          onClick={(e) => updateSVGHelper(e, 3, 4, '/learning/quickLesson')}
          cx="85"
          cy="20"
          r="3"
        />
        <svg className="nut" x="82.75" y="17.75">
          <NutSVG />
        </svg>{' '}
        <text x="80.5" y="15" className="lesson-name">
          Quick sort
        </text>
        <circle
          className={
            helperCSS(5)
              ? 'circles doneLesson'
              : helperCSS(4)
              ? 'circles'
              : 'circles disabled'
          }
          onClick={(e) => updateSVGHelper(e, 4, 5, '/learning/allSortsPlay')}
          cx="103.25"
          cy="34.5"
          r="3"
        />
        <svg className="nut" x="101" y="32.25">
          <NutSVG />
        </svg>{' '}
        <text x="99" y="30" className="lesson-name">
          Customize
        </text>
        <svg x="-2" y="20">
          <TreeFilledSVG />
        </svg>
        <svg x="90" y="0">
          <TreeFilledSVG />
        </svg>
        <svg x="-6" y="36" height="4" width="4">
          <GrassSVG />
        </svg>
        <svg x="53" y="10" height="4" width="4">
          <GrassSVG />
        </svg>
        <svg x="80" y="-4" height="4" width="4">
          <GrassSVG />
        </svg>
        <svg x="115" y="25" height="4" width="4">
          <GrassSVG />
        </svg>
        <svg x="60" y="40" height="4" width="4">
          <GrassSVG />
        </svg>
        <svg x="20" y="0" height="6" width="6">
          <TreeWinterSVG />
        </svg>
        <svg x="80" y="30" height="6" width="6">
          <TreeWinterSVG />
        </svg>
      </svg>
    </div>
  );
}

export default CurveSort;
