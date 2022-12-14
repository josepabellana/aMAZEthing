import express from 'express'
import { mazes } from '../socket';

async function createMaze(req: express.Request, res: express.Response) {
    try {
        const {roomId} = req.body;
        console.log(req.body)
        const {graph,visited,classes,towers} = mazes[roomId];
        res.status(201).json({graphBE:graph,visited,classes,towers});
    } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 500, "message": error });
    }
}



export { createMaze }