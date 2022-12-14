import express from 'express';
const userRouter = express.Router();

import {
    checkRequiredPermissions,
    validateAccessToken,
  } from "../middleware/auth0.middleware.js";

const users = require('../controllers/user');
const mazes = require('../controllers/maze')

//public route
userRouter.post('/createMaze', mazes.createMaze);

// This route needs authentication
userRouter.post('/profile', validateAccessToken, users.getUserData);
userRouter.post('/updateUsername', validateAccessToken, users.updateUsername);
userRouter.post('/updateSortingPath',validateAccessToken, users.updateSortLearning );
userRouter.post('/updatePathLearning',validateAccessToken, users.updatePathLearning );


export {userRouter};