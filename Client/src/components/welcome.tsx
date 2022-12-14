import '../css/welcome.css';
import { useNavigate } from 'react-router-dom';
import MediaQuery, { useMediaQuery } from 'react-responsive';

function Welcome() {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({minWidth: 951});
  const isTablet = useMediaQuery({minWidth: 651, maxWidth:950});
  const isPhone = useMediaQuery({maxWidth: 650});

  return (
    <div className="welcome-page">
      {isDesktop && (
        <>
          <h1 className="welcome">WELCOME.</h1>
          <button className="options" onClick={() => navigate('/waitingRoom')}>
            PLAY
          </button>
          <button className="options" onClick={() => navigate('/learning')}>
            LEARN
          </button>
        </>
      )}
      {isTablet && (
        <div className="medium">
          <h1 className="welcome-medium">WELCOME.</h1>
          <button
            className="options-medium"
            onClick={() => navigate('/waitingRoom')}
          >
            PLAY
          </button>
          <button
            className="options-medium"
            onClick={() => navigate('/learning')}
          >
            LEARN
          </button>
        </div>
      )}
      {isPhone && (
        <div className="small">
          <h1 className="welcome-small">WEL</h1>
          <h1 className="welcome-small">COME.</h1>
          <button
            className="options-small"
            onClick={() => navigate('/waitingRoom')}
          >
            PLAY
          </button>
          <button
            className="options-small"
            onClick={() => navigate('/learning')}
          >
            LEARN
          </button>
        </div>
      )}
    </div>
  );
}

export default Welcome;
