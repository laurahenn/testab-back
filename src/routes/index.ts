import { Router } from 'express';

import permissoesRouter from './permissoes.routes';

import usuariosRouter from './usuarios.routes';
import usuariosnovosRouter from './usuariosnovos.routes';

import organizacoesRouter from './organizacoes.routes';
import organizacoesUsuariosRouter from './organizacoesusuarios.routes';

import equipesRouter from './equipes.routes';
import equipesUsuariosRouter from './equipesusuarios.routes';

import sessionsRouter from './sessions.routes';

const routes = Router();
// routes.get('/', (request, response) => response.json({ message: 'Hello World!' }));

// Rotas publicas
routes.use('/sessions', sessionsRouter);
routes.use('/novo-usuario', usuariosnovosRouter);

// Rotas autenticadas
routes.use('/permissoes', permissoesRouter);
routes.use('/usuarios', usuariosRouter);

routes.use('/organizacoes', organizacoesRouter);
routes.use('/organizacoes-usuarios', organizacoesUsuariosRouter);

routes.use('/equipes', equipesRouter);
routes.use('/equipes-usuarios', equipesUsuariosRouter);



export default routes;
