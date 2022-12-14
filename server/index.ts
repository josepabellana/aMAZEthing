const cors = require('cors');
require("dotenv").config();
import express from 'express';
import http from 'http';
const helmet = require("helmet");
const nocache = require("nocache");
import { userRouter } from './routers/userRouter';
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import Connect from './socket';

const app = express();

const server = http.createServer(app);
Connect(server);

app.use(express.json());
app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        "default-src": ["'none'"],
        "frame-ancestors": ["'none'"],
      },
    },
    frameguard: {
      action: "deny",
    },
  })
);
app.use((req, res, next) => {
  res.contentType("application/json; charset=utf-8");
  next();
});
app.use(nocache());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  })
);
app.use(userRouter);
app.use(errorHandler);
app.use(notFoundHandler);



server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});