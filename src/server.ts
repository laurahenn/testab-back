import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express'
import routes from './routes'
import AppError from './errors/AppError'
import cors from 'cors';
import 'express-async-errors'

import './database'

const app = express();

app.use(cors());

// app.use(cors({
  // origin: "http://localhost:3000" // futuramente aqui vai o endereço que está executando em produção as requisições pra essa api
// }));

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