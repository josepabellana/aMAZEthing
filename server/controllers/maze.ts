import express from 'express'
import { generateMaze } from "../utils/maze";

async function createMaze(req: express.Request, res: express.Response) {
    try {
        const {width, height} = req.body;
        console.log(width,height)
        const {graph, visited, classes, towers} =  generateMaze(width, height);
        res.status(201).json( {graph, visited, classes, towers});

    } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 500, "message": error });
    }
}



export { createMaze }