import "../../css/profile.css";
import { User } from "@auth0/auth0-react";
import { useAppSelector } from "../../features/hooks";
import apiService from "../../services/apiService";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { refreshUsername } from "../../features/user_slice";
import ProfileGameHistory from "./profileGameHistory";
import sort from "../../assets/profile/sort.png";
import path from "../../assets/profile/path.png";
import changeMe from "../../assets/profile/changeMe.png";

function Profile() {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const userRedux = useAppSelector((state) => state.user);
  const [inputOpen, setInputOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null as any);

  let currentSortProgress = 0;
  let currentPathProgress = 0;

  for (let isLessonComplete of userRedux.sortLessons) {
    if (isLessonComplete === true) currentSortProgress++;
    else break;
  }

  for (let isLessonComplete of userRedux.pathLessons) {
    if (isLessonComplete === true) currentPathProgress++;
    else break;
  }

  function changeUsername(e: any) {
    //TODO if type is Event value is not recognized
    const { value } = e.target;
    setUsername(value);
  }

  async function updateChanges(e: any) {
    e.preventDefault();
    if (!isAuthenticated) return;
    try {
      const accessToken = await getAccessTokenSilently();
      const obj = await apiService.updateUsername(accessToken, {
        email: userRedux.email,
        username: username,
      });
      if (obj.user) dispatch(refreshUsername(obj.user));
    } catch (err) {
      console.log(err);
    }
    inputRef.current.value = "";
  }

  const toggleInput = () => {
    setInputOpen(!inputOpen);
  };

  return (
    <div className="profile-page">
      <div className="user-dashboard">
        <div className="user-info">
          <div className="user-part">
            <div className="avatar">
              {user && <img className="avatar" src={`${user?.picture}`} />}
            </div>
            <div className="user-name">
              <h1 id="username">
                HELLO{" "}
                {inputOpen === false && userRedux.username
                  ? (userRedux as User).username
                  : "THERE"}
                ,
                <img
                  id="changeMe-profile"
                  className="changeMe"
                  src={changeMe}
                  onClick={toggleInput}
                />
              </h1>
              <form className={`open-${inputOpen}`}>
                <input
                  ref={inputRef}
                  id="input-username-profile"
                  type="text"
                  placeholder="username"
                  name="username"
                  onChange={changeUsername}
                  className="input-body"
                  maxLength={15}
                />
                <button
                  id="change-username-profile"
                  className="input-button"
                  onClick={(e) => {
                    updateChanges(e);
                    setInputOpen(false);
                  }}
                >
                  Save
                </button>
              </form>
              <h2>Email: {userRedux.email}</h2>
            </div>
          </div>
          <div className="learning-progress">
            <h1 className="learning-progress">Learning progress:</h1>
            <div className="progress">
              <div className="sort-progress">
                <div>
                  <img className="sort-progress-img" src={sort} />
                </div>
                <h3 className="algo-name">Sorting Algorithms</h3>
                <h3>{userRedux.sortLessons}</h3>
                <h3 className="progress-number">{currentSortProgress}/6</h3>
              </div>
              <div className="path-progress">
                <div>
                  <img className="path-progress-img" src={path} />
                </div>
                <h3 className="algo-name">Path Finding Algorithms</h3>
                <h3>{userRedux.pathLessons}</h3>
                <h3 className="progress-number">{currentPathProgress}/4</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="user-stats">
          <h1 className="achievements">ACHIEVEMENTS</h1>
          <div className="circles">
            <div className="circle" onClick={() => alert("are you circle?")}>
            </div>
            <div
              className="circle"
              onClick={() => alert("are you circle?")}
            ></div>
            <div
              className="circle"
              onClick={() => alert("are you circle?")}
            ></div>
            <div
              className="circle"
              onClick={() => alert("are you circle?")}
            ></div>
          </div>
          <div className="stats-line">
            <h4 className="stats-text">
              MATCHES
              <h5 className="stats-text">
                {Object.values(userRedux.overallWins).reduce(
                  (acc, el) => acc + el
                )}
              </h5>
            </h4>
            <h4 className="stats-text">
              WINS<h5 className="wins-yellow">{userRedux.overallWins.wins}</h5>
            </h4>
            <h4 className="stats-text">
              LOSSES
              <h5 className="losses-red">{userRedux.overallWins.losses}</h5>
            </h4>
            <h4 className="stats-text">
              WIN RATE
              <h5 className="stats-text">
                {Math.floor(
                  (userRedux.overallWins.wins * 100) /
                    Object.values(userRedux.overallWins).reduce(
                      (acc, el) => acc + el
                    )
                )}
                %
              </h5>
            </h4>
            <h4 className="stats-text">
              GOLD EARNED<h5 className="stats-text">{userRedux.totalGold}</h5>
            </h4>
          </div>
          <h3 className="created">
            Account created {new Date().toLocaleDateString()}
          </h3>{" "}
          {/* get the date when the account was created */}
        </div>
      </div>
      <ProfileGameHistory />
    </div>
  );
}

export default Profile;
