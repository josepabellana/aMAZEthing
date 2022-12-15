import '../../css/game/tutorial.css';
import { useState } from 'react';
import { useTutorial } from '../../features/hooks';
function StepsTutorial({ setSkipTutorial }: { setSkipTutorial: any }) {
  const [steps, setSteps] = useState(1);
  const [maxStates] = useState(5);

  return (
    <div className="tutorial-background">
      <div id="tutorial">
        {useTutorial(steps)}
        <div id="tutorialCounter">
          {steps}/{maxStates}
        </div>
        <div className="tutorialButtons">
        <button
          className="btn-tutorial"
          id="skipButton"
          onClick={() => {
            setSkipTutorial(false);
          }}
          type="button"
        >
          <h1>Skip Tutorial</h1>
        </button>
        <button
          className="btn-tutorial"
          id="previousButton"
          onClick={() => {
            if (steps > 1) setSteps(steps - 1);
          }}
          type="button"
        >
          <h1>Previous</h1>
        </button>
        <button
          className="btn-tutorial"
          id="nextButton"
          onClick={() => {
            if (steps === maxStates) setSkipTutorial(false);
            setSteps(steps + 1);
          }}
          type="button"
        >
          <h1>Next</h1>
        </button>
        </div>
      </div>
    </div>
  );
}

export default StepsTutorial;
