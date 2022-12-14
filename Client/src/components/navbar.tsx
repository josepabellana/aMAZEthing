import '../css/navbar.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import MediaQuery from 'react-responsive';
import apiService from '../services/apiService';
import { useAppDispatch } from '../features/hooks';
import { refreshData } from '../features/user_slice';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const {
    loginWithRedirect,
    logout,
    user,
    isLoading,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  const dispatch = useAppDispatch();

  const toggleNavbar = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const getMessage = async () => {
      if (isAuthenticated === true) {
        try {
          const accessToken = await getAccessTokenSilently();
          const data = await apiService.profile(accessToken, user);
          if (data.user) dispatch(refreshData(data.user));
        } catch (error) {
          console.error('error', error);
        }
      }
    };
    getMessage();
  }, [user]);

  function helperNavigate(navigateURL: string) {
    navigate(navigateURL);
    toggleNavbar();
  }

  return (
    <>
      <div className="navbar">
        <div className="navbar-start">
          <button className="button" onClick={() => navigate('/')}>
            aMAZEthing
          </button>
          <MediaQuery minWidth={951}>
            {!(location.pathname === '/') &&
              !(location.pathname === '/learning') && (
                <button
                  className="button"
                  onClick={() => navigate('/learning')}
                >
                  LEARN
                </button>
              )}
            {!(location.pathname === '/') &&
              !(
                location.pathname === '/game' ||
                location.pathname === '/waitingRoom'
              ) && (
                <button
                  className="button"
                  onClick={() => navigate('/waitingRoom')}
                >
                  PLAY
                </button>
              )}
          </MediaQuery>
        </div>
        <div className="navbar-end">
          <MediaQuery minWidth={951}>
            {location.pathname === '/' && (
              <button className="button" onClick={() => navigate('/about')}>
                ABOUT
              </button>
            )}
            {isAuthenticated && !(location.pathname === '/profile') && (
              <button
                id="profile"
                className="button"
                onClick={() => navigate('/profile')}
              >
                PROFILE
              </button>
            )}
            {!isLoading && !user && (
              <button
                id="login"
                className="button"
                onClick={() => loginWithRedirect()}
              >
                LOGIN
              </button>
            )}
            {!isLoading && user && (
              <button className="button" onClick={() => logout()}>
                LOGOUT
              </button>
            )}
          </MediaQuery>
          <MediaQuery maxWidth={950}>
            <div
              className="container"
              onClick={() => {
                toggleNavbar();
              }}
            >
              <div className={`bar1 ${toggle && 'active'}`} />
              <div className={`bar2 ${toggle && 'active'}`} />
              <div className={`bar3 ${toggle && 'active'}`} />
            </div>
          </MediaQuery>
        </div>
        <MediaQuery maxWidth={950}>
          <div className={`modal-body open-${toggle}`}>
            {location.pathname === '/' && (
              <button
                className="button"
                onClick={() => {
                  helperNavigate('/about');
                }}
              >
                ABOUT
              </button>
            )}
            {!(location.pathname === '/') &&
              !(location.pathname === '/learning') &&
              user && (
                <button
                  className="button"
                  onClick={() => {
                    helperNavigate('/learning');
                  }}
                >
                  LEARN
                </button>
              )}
            {!(location.pathname === '/') &&
              !(
                location.pathname === '/game' ||
                location.pathname === '/waitingRoom'
              ) &&
              user && (
                <button
                  className="button"
                  onClick={() => {
                    helperNavigate('/waitingRoom');
                  }}
                >
                  PLAY
                </button>
              )}
            {!(location.pathname === '/profile') && user && (
              <button
                id="profile"
                className="button"
                onClick={() => {
                  helperNavigate('/profile');
                }}
              >
                PROFILE
              </button>
            )}
            {!user && (
              <button
                id="login"
                className="button"
                onClick={() => {
                  loginWithRedirect();
                  toggleNavbar();
                }}
              >
                LOGIN
              </button>
            )}
            {user && (
              <button
                className="button"
                onClick={() => {
                  logout();
                  toggleNavbar();
                }}
              >
                LOGOUT
              </button>
            )}
          </div>
        </MediaQuery>
      </div>
    </>
  );
}

export default Navbar;
