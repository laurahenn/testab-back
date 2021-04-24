import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import PermissoesRepository from '../repositories/PermissoesRepository';
import CreatePermissoesService from '../services/CreatePermissoesService';

const permissoesRouter = Router();

permissoesRouter.get('/', async (request, response) => {

  const permissoesRepository = getCustomRepository(PermissoesRepository);
  const permissoes = await permissoesRepository.find();

  return response.json(permissoes);
});

permissoesRouter.post('/', async (request, response) => {
  const { titulo, admin } = request.body;

  const createPermissao = new CreatePermissoesService();
  const permissao = await createPermissao.execute({ titulo, admin });
  
  return response.json(permissao);
});

export default permissoesRouter;
