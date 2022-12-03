import '../css/waitingRoom.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import socket from '../services/socket';
import ProfileGameHistory from './profile/profileGameHistory';
import { io } from 'socket.io-client';
import { store } from '../features/store';
import { useAppDispatch } from '../features/hooks';
import { updatePlayer, updateRoomID } from '../features/game_slice';


function WaitingRoom() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createClicked, setCreateClicked] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);
  const [playClicked, setPlayClicked] = useState(false);
  const [id, setId] = useState('');
  const [copyTextClicked, setCopyTextClicked] = useState(false);

  useEffect(() => {
    socket.off('receiveRoomId');
    socket.off('Game start');
    socket.on('receiveRoomId', (roomId: string, player: 'p1' | 'p2') => {
      console.log('Received room ID', {roomId})
      setId(roomId);
      dispatch(updateRoomID(roomId));
      dispatch(updatePlayer(player));
      socket.emit('ready', roomId);
    });
    socket.on('Game start', () => {
      const roomId = store.getState().game.roomId;
      if (roomId) {
        console.log('Game started', store.getState().game.roomId);
        console.log('Game state', store.getState().game)
        navigate('/game');
      } else {
        socket.emit('retry game start');
      }
    });
    return ()=>{ 
      // console.log('clearing waiting');
      // socket.emit('clear waiting', store.getState().game.roomId) // TODO: Currently this prevents them from joining the game on game start
      setPlayClicked(false);
    } 
  }, []);

  function hostRoom() {
    socket.emit('host');
  }

  function joinRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      fname: { value: string };
    };
    const room = target.fname.value;
    socket.emit('join', room);
  }

  function play() {
    console.log('play pressed');
    socket.emit('play');
  }

  function onCreateCLicked() {
    if (!createClicked) {
      // greyOutOtherButtons('Create');
      setCreateClicked(true);
      setJoinClicked(false);
      setPlayClicked(false);
    } else {
      
      setCreateClicked(false);
    }
  }

  function onJoinCLicked() {
    if (!joinClicked) {
      setJoinClicked(true);
      setCreateClicked(false);
      setPlayClicked(false);
    } else {
      setJoinClicked(false);
    }
  }

  function onPlayClicked() {
    if (!playClicked) {
      socket.emit('host');
      setPlayClicked(true);
      setJoinClicked(false);
      setCreateClicked(false);
      play();
    } else {
      console.log('clearing waiting');
      socket.emit('clear waiting')
      setPlayClicked(false);
    }
  }

  // useEffect(() => {
  //   if (!(playClicked || joinClicked || createClicked)) {
  //     socket.emit('clear waiting', socket.id);
  //     dispatch(updateRoomID(''));
  //   }
  // }, [playClicked, joinClicked, createClicked]);

  return (
    <div className="waiting-room">
      <h3 className="wr-explanation-text">
        <span className="wait-r-yellow">Create</span>/<span className="wait-r-yellow">Join</span> a private party or{' '}
        <span className="wait-r-red">search</span> for a game
      </h3>
      <div className="selection-panel">
        <div className="left-side-selection">
          <form className='wr-form' onSubmit={joinRoom}>
            <button className="wr-main-button" type="button">
              <h1
                className={`waiting-page-create-button ${
                  createClicked && 'wait-r-yellow'
                } ${playClicked && 'playClicked'} ${
                  joinClicked && 'joinClicked'
                }`}
                onClick={() => onCreateCLicked()}
              >
                Create
              </h1>
            </button>
            {createClicked ? (
              // <p>
              //   {id}
              // </p>
              <>
                <div className="wr-amazing-text wr-copy-text">
                  <p>Copy the code and send</p>
                  <p> to another player</p>
                </div>
                {copyTextClicked
                  ? (<input className='create-room-code'
                  readOnly
                    placeholder='text copied to clipboard' onClick={() => {
                      navigator.clipboard.writeText(`${id}`);
                      setCopyTextClicked(false);
                      }}></input>)
                  : (<input className='create-room-code'
                  readOnly
                    placeholder={id} onClick={() => {
                      navigator.clipboard.writeText(`${id}`);
                      setCopyTextClicked(true);
                      }}></input>)}

              </>
            ) : (
              <button className="wr-main-button">
                <h1
                  className={`waiting-page-join-button ${
                    joinClicked && 'wait-r-yellow'
                  } ${playClicked && 'playClicked'} ${
                    createClicked && 'createClicked'
                  }`}
                  onClick={() => onJoinCLicked()}
                >
                  Join
                </h1>
              </button>
            )}
            {joinClicked && (
              <>
                <div className="join-code-input">
                  <input
                    className="create-room-code join-room-code"
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="type the code here"
                  />
                  <button className="submit-the-code-button">✓</button>
                </div>
              </>
            )}
          </form>
        </div>
        <div className="right-side-selection">
          <button className="wr-main-button" onClick={() => onPlayClicked()}>
            <h1
              className={`wr-play-button ${playClicked && 'wait-r-red'} ${
                joinClicked && 'joinClicked'
              } ${createClicked && 'createClicked'}`}
            >
              Search
            </h1>
          </button>
          {playClicked ? (
            <>
              <h3 className="play-h3 wr-amazing-text">
                <span className="wait-r-red">Search</span>ing for a game
              </h3>
              <div className="loading-animation" />
            </>
          ) : (
            <div className="wr-amazing-text">
              <p>The most amazing</p>
              <p>learning game.</p>
            </div>
          )}
        </div>
      </div>
      <div className='wr-game-history'>

      </div>
    </div>
  );
}

export default WaitingRoom;
