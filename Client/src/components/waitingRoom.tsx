import '../css/waitingRoom.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import socket from '../services/socket';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { defaultState, receiveRoomId, updatePlayer, updateRoomID } from '../features/game_slice';


function WaitingRoom() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userRedux = useAppSelector((state) => state.user);
  const {roomId} = useAppSelector(state => state.game);
  const [createClicked, setCreateClicked] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);
  const [playClicked, setPlayClicked] = useState(false);
  const [id, setId] = useState('');
  const [copyTextClicked, setCopyTextClicked] = useState(false);

  useEffect(() => {
    dispatch(defaultState());
    socket.on('receiveRoomId', (roomId: string, player: 'p1' | 'p2', type: 'Host' | 'Join' | 'Play') => {
      console.log('Received room ID', {roomId})
      setId(roomId);
      dispatch(receiveRoomId({roomId, player}));
      console.log('Emitting ready');
      socket.emit(`ready${type}`, roomId);
    });
    socket.on('Game start', () => {
      if (roomId) {
        console.log('Game started', roomId);
        navigate('/game');
      } else {
        socket.emit('retry game start');
      }
    });
    return ()=>{
      // console.log('clearing waiting');
      // socket.emit('clear waiting', store.getState().game.roomId) // TODO: Currently this prevents them from joining the game on game start
      socket.off('receiveRoomId');
      socket.off('receiveRoomIdHost');
      socket.off('receiveRoomIdJoin');
      socket.off('Game start');
      setPlayClicked(false);
    }
  }, []);

  function hostRoom() {
    socket.emit('clear waiting');
    socket.emit('host', userRedux.email);
  }

  function joinRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      fname: { value: string };
    };
    const room = target.fname.value;
    socket.emit('clear waiting');
    socket.emit('join', room, userRedux.email);
  }

  function play() {
    console.log('play pressed');
    socket.emit('clear waiting');
    socket.emit('play', userRedux.email);
  }

  function setButtonsClicked(createButton: boolean, joinButton: boolean, playButton: boolean) {
    setCreateClicked(createButton);
    setJoinClicked(joinButton);
    setPlayClicked(playButton);
  }

  function onCreateCLicked() {
    if (!createClicked) {
      setButtonsClicked(true, false, false);
      hostRoom();
    } else {
      console.log('clearing waiting');
      socket.emit('clear waiting', socket.id)
      setButtonsClicked(false, false, false);
    }
  }

  function onJoinCLicked() {
    console.log('joining');
    if (!joinClicked) {
      setButtonsClicked(false, true, false);
    } else {
      setButtonsClicked(false, false, false);
    }
  }

  function onPlayClicked() {
    if (!playClicked) {
      setButtonsClicked(false, false, true);
      play();
    } else {
      setButtonsClicked(false, false, false);
      console.log('clearing waiting');
      socket.emit('clear waiting')
    }
  }

  useEffect(() => {
    console.log(roomId);
  }, [roomId])

  return (
    <div className="waiting-room">
      <h3 className="wr-explanation-text">
        <span className="wait-r-yellow">Create</span>/<span className="wait-r-yellow">Join</span> a private party or{' '}
        <span className="wait-r-red">search</span> for a game
      </h3>
      <div className="selection-panel">
        <div className="left-side-selection">
          <form className='wr-form' onSubmit={joinRoom}>
            <button className="wr-main-button" type="button" onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}>
              <h1
                className={`waiting-page-create-button ${
                  createClicked && 'wait-r-yellow'
                } ${playClicked && 'playClicked'} ${
                  joinClicked && 'joinClicked'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onCreateCLicked();
                }}
              >
                Create
              </h1>
            </button>
            {createClicked ? (
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
