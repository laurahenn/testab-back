import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express'
import routes from './routes'
import uploadConfig from './config/upload';
import AppError from './errors/AppError'
import cors from 'cors';
import 'express-async-errors'

import './database'

const app = express();

app.use('/files', express.static(uploadConfig.directory));
app.use(cors());

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log("Server started on port 3333");
});
