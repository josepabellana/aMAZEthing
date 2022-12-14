import { useNavigate } from 'react-router-dom';
import NutSVG from './learningNut';
import GrassSVG from './learningGrass';
import TreeFilledSVG from './treeFilled';
import TreeWinterSVG from './treeWinter';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../features/hooks';
import apiService from '../../services/apiService';
import { refreshPathLessons } from '../../features/user_slice';

function CurvePath() {
  const navigate = useNavigate();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);

  function updateSVGHelper(
    e: any,
    numCheck: number,
    updateNum: number,
    navigateURL: string
  ) {
    if (
      isAuthenticated &&
      user.pathLessons[numCheck] &&
      !user.pathLessons[updateNum]
    ) {
      updatePathLessons(e, updateNum);
    }
    if (isAuthenticated && user.pathLessons[numCheck]) {
      navigate(navigateURL);
    }
    if (
      !isAuthenticated &&
      JSON.parse(localStorage.getItem('path') as any)[numCheck] &&
      !JSON.parse(localStorage.getItem('path') as any)[updateNum]
    ) {
      updatePathLessons(e, updateNum);
    }
    if (
      !isAuthenticated &&
      JSON.parse(localStorage.getItem('path') as any)[numCheck]
    ) {
      navigate(navigateURL);
    }
  }

  function localArray(num: number) {
    const pathArray = Array(4).fill(false);
    for (let i = 0; i < pathArray.length; i++) {
      if (i <= num) pathArray[i] = true;
      else break;
    }
    return pathArray;
  }

  async function updatePathLessons(e: any, num: number) {
    e.preventDefault();
    const pathArray = localArray(num);
    if (!isAuthenticated) {
      window.localStorage.setItem('path', JSON.stringify(pathArray));
    }
    try {
      const accessToken = await getAccessTokenSilently();
      const obj = await apiService.updatePathLearning(accessToken, {
        email: user.email,
        pathArr: pathArray,
      });
      if (obj.user) dispatch(refreshPathLessons(obj.user));
    } catch (err) {
      console.log(err);
    }
  }

  function helperCSS(updateNum: number) {
    if (isAuthenticated) return user.pathLessons[updateNum];
    if( JSON.parse(localStorage.getItem('path') as any)[updateNum]) return JSON.parse(localStorage.getItem('path') as any)[updateNum];
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
                20, 10
            "
        />
        <path
          className="learning-path"
          d="
              M 20, 10
              L 20, 5
            "
        />
        <path
          className="learning-path"
          d="
              M 20, 5
              Q 20, 0
                25, 0
            "
        />
        <path
          className="learning-path"
          d="
              M 25, 0
              L 40, 0
            "
        />
        <path
          className="learning-path"
          d="
              M 40, 0
              Q 45, 0
                45, 5
            "
        />
        <path
          className="learning-path"
          d="
              M 45, 5
              Q 45, 10
                50, 10
            "
        />
        <path
          className="learning-path"
          d="
              M 50, 10
              L 60, 10
            "
        />
        <path
          className="learning-path"
          d="
              M 60, 10
              Q 65, 10
                65, 15
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
                95, 15
            "
        />
        <path
          className="learning-path"
          d="
              M 95, 15
              L 95, 10
            "
        />
        <path
          className="learning-path"
          d="
              M 95, 10
              Q 95, 5
                100, 5
            "
        />
        <path
          className="learning-path"
          d="
              M 100, 5
              L 130, 5
            "
        />
        <circle
          className={helperCSS(0) ? 'circles doneLesson' : 'circles'}
          id="circle-bubble-sort"
          onClick={(e) => {
            if (!helperCSS(0)) {
              updatePathLessons(e, 0);
            }
            navigate('/learning/BfsLesson');
          }}
          cx="10"
          cy="14.6"
          r="3"
        />
        <svg className="nut" x="7.75" y="12.25">
          <NutSVG />
        </svg>{' '}
        <text x="8" y="10" className="lesson-name">
          BFS
        </text>
        <circle
          className={
            helperCSS(1)
              ? 'circles doneLesson'
              : helperCSS(0)
              ? 'circles'
              : 'circles disabled'
          }
          onClick={(e) => updateSVGHelper(e, 0, 1, '/learning/DfsLesson')}
          cx="40"
          cy="0"
          r="3"
        />
        <svg className="nut" x="37.75" y="-2.25">
          <NutSVG />
        </svg>{' '}
        <text x="38" y="-5" className="lesson-name">
          DFS
        </text>
        <circle
          className={
            helperCSS(2)
              ? 'circles doneLesson'
              : helperCSS(1)
              ? 'circles'
              : 'circles disabled'
          }
          onClick={(e) => updateSVGHelper(e, 1, 2, '/learning/DijkstraLesson')}
          cx="65.2"
          cy="12.6"
          r="3"
        />
        <svg className="nut" x="63" y="10.5">
          <NutSVG />
        </svg>{' '}
        <text x="62" y="8" className="lesson-name">
          Dijkstra
        </text>
        <circle
          className={
            helperCSS(3)
              ? 'circles doneLesson'
              : helperCSS(2)
              ? 'circles'
              : 'circles disabled'
          }
          onClick={(e) => updateSVGHelper(e, 2, 3, '/learning/AStarLesson')}
          cx="102"
          cy="6"
          r="3"
        />
        <svg className="nut" x="99.75" y="3.75">
          <NutSVG />
        </svg>
        <text x="101" y="0" className="lesson-name">
          A*
        </text>
        <svg x="10" y="-7">
          <TreeFilledSVG />
        </svg>
        <svg x="85" y="10">
          <TreeFilledSVG />
        </svg>
        <svg x="-6" y="26" height="4" width="4">
          <GrassSVG />
        </svg>
        <svg x="53" y="0" height="4" width="4">
          <GrassSVG />
        </svg>
        <svg x="80" y="30" height="4" width="4">
          <GrassSVG />
        </svg>
        <svg x="115" y="0" height="4" width="4">
          <GrassSVG />
        </svg>
        <svg x="40" y="15" height="4" width="4">
          <GrassSVG />
        </svg>
        <svg x="20" y="20" height="6" width="6">
          <TreeWinterSVG />
        </svg>
        <svg x="80" y="0" height="6" width="6">
          <TreeWinterSVG />
        </svg>
      </svg>
    </div>
  );
}

export default CurvePath;
