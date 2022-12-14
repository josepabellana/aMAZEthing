import { store } from "../features/store";

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
  console.log('apiService roomId:', store.getState().game.roomId);
  return fetch(`${BASE_URL}/createMaze`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({roomId: store.getState().game.roomId}), 
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
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