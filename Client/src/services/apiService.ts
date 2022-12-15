import { store } from "../features/store";
import { generateMaze } from "../utils/maze";

const BASE_URL = 'http://localhost:3000'; //TODO Add to .env

const profile = function (accessToken:any,user:any) {
  return fetch(`${BASE_URL}/profile`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(user), 
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const updateUsername = function (accessToken:any,user:any) { //TODO solve type -> in redux userSlice
  return fetch(`${BASE_URL}/updateUsername`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(user), 
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

const createMaze = function () { 
  const roomId = store.getState().game.roomId;
  console.log(roomId);
  if (roomId) {
    return fetch(`${BASE_URL}/createMaze`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({roomId}), 
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  } else {
    console.log('front end generating maze')
    const {graph,visited,classes,towers, weightPositions} = generateMaze(86, 40, true, 8);
    return {graphBE:graph,visited,classes,towers, weightPositions};
  }
}

const updateSortLearning = function(accessToken:any,user:any){
  return fetch(`${BASE_URL}/updateSortingPath`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(user), 
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

}

const updatePathLearning = function(accessToken:any,user:any){
  return fetch(`${BASE_URL}/updatePathLearning`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(user), 
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

}

type ApiService = {
  profile: Function,
  updateUsername: Function,
  createMaze:Function,
  updateSortLearning:Function,
  updatePathLearning:Function
}
const apiService: ApiService = {
  profile,
  updateUsername,
  createMaze,
  updateSortLearning,
  updatePathLearning
};

export default apiService;