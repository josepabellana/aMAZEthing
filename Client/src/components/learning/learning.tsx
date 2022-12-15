import '../../css/learning/learning.css';
import CurveSort from './curveSortSVG';
import CurvePath from './curvePathSVG';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function LearningPage() {
  const scrollTo = useRef<HTMLInputElement>(null as any);
  const scrollToPath = useRef<HTMLInputElement>(null as any);
  const isPhone = useMediaQuery({ maxWidth: 600 });

  return (
    <div className="disable-horizontal-scroll">
      <div className="initial-view">
        <div>
          <h1 className={isPhone ? 'title-small' : ''}>
            Welcome to the amazing{' '}
            <span className="yellow-learning">learning</span> experience.
          </h1>
          <h1 className={isPhone ? 'title-small' : ''}>
            Learn <span className="yellow-learning">sorting</span> and{' '}
            <span className="yellow-learning">path finding</span> algorithms.
          </h1>
        </div>
        <button
          className="scroll-learning"
          onClick={() => {
            window.scrollTo(
              0,
              scrollTo.current.getBoundingClientRect().top +
                window.scrollY -
                window.innerHeight * 0.1
            );
          }}
        >
          <h3>Scroll to learn more.</h3>
          <h3 className="bounce">↓</h3>
        </button>
      </div>

      <div className="sorting-algs">
        <div className="explanation">
          <div className="sorting-algo" ref={scrollTo}>
            <div className='sorting-title'>
              <h3 className="explanation-title">Sorting algorithms</h3>
              <button
                className="scroll-learning scroll-algo"
                onClick={() => {
                  window.scrollTo(
                    0,
                    scrollToPath.current.getBoundingClientRect().top +
                      window.scrollY -
                      window.innerHeight * 0.1
                  );
                }}
              >
                <h3>Go forward</h3>
                <h3 className="bounce">↓</h3>
              </button>
            </div>
            <p className="explanation-text">
              Sorting Algorithms are used to arrange elements of a list into a
              specific order.
            </p>
            <p className="explanation-text">
              Sorts are most commonly used with numerical or alphabetical elements.
            </p>
            <p className="explanation-text">
              There are many sorting algorithms, but some are better than
              others.
            </p>
          </div>
          <div className={!isPhone ? 'title-small' : ''}>
            <CurveSort />
          </div>
          <div className="path-algo" ref={scrollToPath}>
            <div className='path-title'>
            <h3 className="explanation-title">Path finding algorithms</h3>
            <button
                className="scroll-learning scroll-algo"
                onClick={() => {
                  window.scrollTo(
                    0,
                    scrollTo.current.getBoundingClientRect().top +
                      window.scrollY -
                      window.innerHeight * 0.1
                  );
                }}
              >
                <h3>Go back</h3>
                <h3 className="bounce bounce-up">↓</h3>
              </button>
              </div>
            <p className="explanation-text">
              At its core, a path finding algorithm seeks to find a
              path between two points.
            </p>
            <p className="explanation-text">
              More advanced algorithms take into account weights and distance to the goal.
            </p>
          </div>
        </div>
        <div className={!isPhone ? 'title-small' : ''}>
          <CurvePath />
        </div>
      </div>
    </div>
  );
}
