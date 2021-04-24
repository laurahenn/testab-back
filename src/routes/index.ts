import { Router } from 'express';

import permissoesRouter from './permissoes.routes';

import usuariosRouter from './usuarios.routes';

import organizacoesRouter from './organizacoes.routes';
import organizacoesUsuariosRouter from './organizacoesusuarios.routes';

import equipesRouter from './equipes.routes';
import equipesUsuariosRouter from './equipesusuarios.routes';

import sessionsRouter from './sessions.routes';
import getinfosRouter from './sessions.getinfos';

// foco
import testesABRouter from './testesAB.routes';
import monitoramentosRouter from './monitoramentos.routes';
import testesRouter from './testes.routes';
import testesMonitoramentosRouter from './testesmonitoramentos.routes';

const routes = Router();

// Rotas publicas
routes.use('/sessions', sessionsRouter);
routes.use('/get-infos', getinfosRouter);

// Rotas autenticadas
routes.use('/permissoes', permissoesRouter);
routes.use('/usuarios', usuariosRouter);

routes.use('/organizacoes', organizacoesRouter);
routes.use('/organizacoes-usuarios', organizacoesUsuariosRouter);

routes.use('/equipes', equipesRouter);
routes.use('/equipes-usuarios', equipesUsuariosRouter);

// foco
routes.use('/testesAB', testesABRouter);
routes.use('/monitoramentos', monitoramentosRouter);
routes.use('/testes', testesRouter);
routes.use('/testes-monitoramentos', testesMonitoramentosRouter);

export default routes;
