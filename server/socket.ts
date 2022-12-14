import http from 'http';
import { Server } from 'socket.io';
import crypto from 'crypto';
import { generateMaze, MazeType } from './utils/maze';
import { User } from './models/user';
import { Game } from './models/game';

export interface animal {
  pathFindingAlgo: 'dfs' | 'bfs' | 'dijk' | 'a*';
  sortingAlgo: 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick';
  sortingSpeed: number;
  type: 'Squirrel' | 'Badger' | 'Hare' | 'Deer' | 'Koala' | 'Bear'
}

function generateRoomId() {
  const roomId = crypto.randomBytes(3).toString('hex');
  // TODO: Check this isn't already an active game
  return roomId;
}

export let mazes: {[id: string]: MazeType} = {};

export default function Connect(server: http.Server) {

  let waiting: {socketId: string, roomId: string}[] = [];
  let ready: {[roomId: string]: string} = {};
  let readyHost: {[roomId: string]: string} = {};
  let playerSearch: {socketId: string, roomId: string}[] = [];
  let activeGames: {
    roomId: string,
    p1Id: string,
    p1Username: string,
    p2Id: string,
    p2Username: string,
    timeRemaining: number,
    playersLoaded: number,
    p1Coins: number,
    p2Coins: number,
    p1Towers: number[],
    p2Towers: number[],
    p1Minions: [number, animal][],
    p2Minions: [number, animal][],
  }[] = [];
  let intervals: {[roomId: string]: NodeJS.Timer} = {};

  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  function clearRoomsBySocket(socket) {
    console.log(socket.rooms);
    console.log({intervals});
    for (let room of socket.rooms) {
      console.log(room);
      if (intervals[room]) {clearInterval(intervals[room]); delete intervals[room]};
      socket.leave(room);
      delete ready[room];
    }
    console.log({intervals});
    socket.join(socket.id);
    playerSearch = playerSearch.filter(room => {
      if (room.socketId === socket.id) {
        socket.leave(room.roomId);
        return false;
      }
      return true;
    });
    waiting = waiting.filter(room => {
      if (room.socketId === socket.id) {
        socket.leave(room.roomId);
        return false;
      }
      return true;
    });
    activeGames = activeGames.filter(game => game.p1Id !== socket.id && game.p2Id !== socket.id);
  }

  function createNewGame(roomId: string, p1Id: string, p1Username: string) {
    const maze = generateMaze(86, 40) // TODO: Generalize this;
    mazes[roomId] = maze;
    activeGames.push({
      roomId,
      p1Id,
      p1Username,
      p2Id: '',
      p2Username: '',
      playersLoaded: 0,
      timeRemaining: 60,
      p1Coins: 0,
      p2Coins: 0,
      p1Towers: [],
      p2Towers: [],
      p1Minions: [],
      p2Minions: [],
    })
  };

  function addP2ToGame(roomID: string, p2Id:string, p2Username: string) {
    const game = activeGames.find(game => game.roomId === roomID);
    if (!game) return false;
    game.p2Id = p2Id;
    game.p2Username = p2Username;
  };

  function increaseLoadedGame(roomID: string) {
    const game = activeGames.find(game => game.roomId === roomID);
    if (!game) return false;
    game.playersLoaded++;
    if (game.playersLoaded === 2) return true;
    return false;
  }

  function decreaseGameTimer(roomID: string) {
    const game = activeGames.find(game => game.roomId === roomID);
    if (!game) return false;
    game.timeRemaining--;
    for (let tower of game.p1Towers) {
      addCoinsGame(roomID, 20, 'p1');
    }
    for (let tower of game.p2Towers) {
      addCoinsGame(roomID, 20, 'p2');
    }
    return game;
  }

  function addNewMinionGame(roomID: string, type: animal, player: 'p1' | 'p2') {
    const game = activeGames.find(game => game.roomId === roomID);
    if (!game) return false;
    const newEntry: [number, animal] = [game.p1Minions.length + game.p2Minions.length, type];
    if (player === 'p1') game.p1Minions.push(newEntry);
    else game.p2Minions.push(newEntry);
    return game;
  }

  function addCoinsGame(roomID: string, amount: number, player: 'p1' | 'p2') {
    const game = activeGames.find(game => game.roomId === roomID);
    if (!game) return false;
    if (player === 'p1') game.p1Coins += amount;
    else game.p2Coins += amount;
    return game;
  }

  function addTowerGame(roomID: string, towerID: number, player: 'p1' | 'p2', firstCapture: boolean) {
    const game = activeGames.find(game => game.roomId === roomID);
    if (!game) return false;
    if (player === 'p1') {
      game.p1Towers.push(towerID);
      game.p2Towers = game.p2Towers.filter(tower => tower !== towerID);
    } else {
      game.p2Towers.push(towerID);
      game.p1Towers = game.p1Towers.filter(tower => tower !== towerID);
    }
    if (firstCapture) addCoinsGame(roomID, 200, player);
    return game;
  }

  function sendGameState(newGameState, roomId, io) {
    if (newGameState) {
      io.to(roomId).emit('updateGameState', {
        timeRemaining: newGameState.timeRemaining, 
        p1Coins: newGameState.p1Coins, 
        p2Coins: newGameState.p2Coins, 
        p1Towers: newGameState.p1Towers, 
        p2Towers: newGameState.p2Towers, 
        p1MinionCount: newGameState.p1Minions.length, 
        p2MinionCount: newGameState.p1Minions.length});
    }
  }

  async function endGame(roomId) {
    let finalState = activeGames.find(game => game.roomId === roomId);
    activeGames = activeGames.filter(game => game.roomId !== roomId);
    let user1 = await User.findOne({email: finalState.p1Username});
    let user2 = await User.findOne({email: finalState.p2Username});
    console.log({user1});
    console.log({user2});
    if (!user1 || !user2) return;

    const result1 = finalState.p1Towers.length > finalState.p2Towers.length ? 'win' :
                    finalState.p1Towers.length < finalState.p2Towers.length ? 'loss' : 'draw';
    const result2 = finalState.p2Towers.length > finalState.p1Towers.length ? 'win' :
                    finalState.p2Towers.length < finalState.p1Towers.length ? 'loss' : 'draw';

    const p1State = {
      minions: finalState.p1Minions.length,
      result: result1,
      gold: finalState.p1Coins,
      opponentUsername: user2.username,
      towers: finalState.p1Towers.length,
      finishedAt: Date.now()
    }
    const p2State = {
      minions: finalState.p2Minions.length,
      result: result2,
      gold: finalState.p2Coins,
      opponentUsername: user1.username,
      towers: finalState.p2Towers.length,
      finishedAt: Date.now()
    }

    user1.games.push(p1State);
    user1.overallWins[result1 === 'win' ? 'wins' : result1 === 'loss' ? 'losses' : 'draws']++;
    user1.totalGold += p1State.gold;
    user1.save();
    
    user2.games.push(p2State);
    user2.overallWins[result2 === 'win' ? 'wins' : result2 === 'loss' ? 'losses' : 'draws']++;
    user2.totalGold += p2State.gold;
    user2.save();

    Game.create({player1: user1.username, player2: user2.username, result: result1});
  }

  io.on('connection', socket => {
    console.log('user connected');
    socket.on('host', (p1Username: string) => {
      console.log('hosting');
      const roomId = generateRoomId();
      if (waiting.find(waitingRoom => waitingRoom.socketId === socket.id)) return;
      waiting.push({socketId: socket.id, roomId});
      createNewGame(roomId, socket.id, p1Username)
      socket.join(socket.id);
      console.log('generated room id', roomId)
      socket.join(roomId);
      io.emit('receiveRoomId', roomId, 'p1', 'Host');
    })

    socket.on('join', (roomId, p2Username) => {
      console.log('joining');
      const found = waiting.find(room => room.roomId === roomId);
      if (found) {
        socket.join(roomId);
        const game = activeGames.find(game => game.roomId === roomId);
        game.p2Id = socket.id;
        addP2ToGame(roomId, socket.id, p2Username);
        io.to(socket.id).emit('receiveRoomId', roomId, 'p2', 'Join');
      }
    })

    socket.on('play', (username: string) => {
      console.log({playerSearch});
      if (playerSearch.length !== 0) {
        const game = playerSearch.pop();
        console.log(game);
        const roomId = game.roomId;
        console.log('joining room', roomId);
        addP2ToGame(roomId, socket.id, username);
        io.to(socket.id).emit('receiveRoomId', roomId, 'p2', 'Play');
        socket.join(roomId);
        // io.to(socket.id).emit('set player 2');
      } else {
        const roomId = generateRoomId();
        console.log({socket});
        io.to(socket.id).emit('receiveRoomId', roomId, 'p1', 'Play');
        console.log('creating room', roomId);
        playerSearch.push({socketId: socket.id, roomId});
        createNewGame(roomId, socket.id, username);
        console.log({mazes});
        // io.to(socket.id).emit('set player 1', 'p1');
        console.log('sending room id');
        console.log('room id sent');
        socket.join(roomId);
        
      }
    });

    socket.on('readyPlay', (roomId) => {
      console.log('roomId ready', roomId, socket.id);
      console.log({ready})
      if (ready[roomId] && ready[roomId] !== socket.id) {
        delete ready[roomId];
        io.to(roomId).emit('Game start');
      } else {
        ready[roomId] = socket.id;
      }
    });

    socket.on('readyHost', (roomId) => {
      console.log('roomId readyHost', roomId, socket.id);
      console.log({readyHost}) // TODO: prevent making more than one room
      readyHost[roomId] = socket.id;
    });

    socket.on('readyJoin', (roomId) => {
      console.log('roomId readyJoin', roomId, socket.id);
      console.log({readyHost})
      if (readyHost[roomId] && readyHost[roomId] !== socket.id) {
        delete ready[roomId];
        io.to(roomId).emit('Game start');
      }
    });

    socket.on('maze generated', roomId => {
      if (increaseLoadedGame(roomId)) {
        io.to(roomId).emit('maze generated');
        const intervalId = setInterval(() => {
          const newGameState = decreaseGameTimer(roomId);
          if (!newGameState) return;
          sendGameState(newGameState, roomId, io);
          if (newGameState.timeRemaining === 0) {
            clearInterval(intervalId);
            delete intervals[roomId];
            endGame(roomId);
          }
        }, 1000);
        intervals[roomId] = intervalId;
      }
    })

    socket.on('new minion', (type, roomId, player) => {
      console.log('new minion', type, roomId);
      socket.to(roomId).emit('new minion', type);
      const newGameState = addNewMinionGame(roomId, type, player);
    });
    socket.on('minion move', (direction, minionId, roomId) => {
        socket.to(roomId).emit('minion move', direction, minionId);
    });

    socket.on('enterTower', (towerId, minionId, roomID, player) => {
      socket.to(roomID).emit('enterTower', towerId, minionId);
      
    })
    
    socket.on('conquerTower', (roomID, towerId, firstCapture, player) => {
      let newGameState = addTowerGame(roomID, towerId, player, firstCapture);
      console.log(newGameState);
      sendGameState(newGameState, roomID, io);
    })

    socket.on('clear waiting', () => {
      console.log('clearing waiting');
      clearRoomsBySocket(socket);
    })

    socket.on('disconnect', ()=>{
      clearRoomsBySocket(socket);
      console.log('a user disconnected')
    })
  })
}

