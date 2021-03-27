import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import PermissoesRepository from '../repositories/PermissoesRepository';
import CreatePermissoesService from '../services/CreatePermissoesService';

const permissoesRouter = Router();

// listar
permissoesRouter.get('/', async (request, response) => {

  const permissoesRepository = getCustomRepository(PermissoesRepository);
  const permissoes = await permissoesRepository.find();

  return response.json(permissoes);
  // return response.json({ success: 'Sucesso lista' });
});

// novo registro
permissoesRouter.post('/', async (request, response) => {
  const { titulo, admin } = request.body;

  const createPermissao = new CreatePermissoesService();
  const permissao = await createPermissao.execute({ titulo, admin });
  
  return response.json(permissao);
});

// deletar
permissoesRouter.delete('/', async (request, response) => {
  const { id } = request.body;

  const permissoesRepository = getCustomRepository(PermissoesRepository);

  const where = {};
   if (id) where.id = id;

  await permissoesRepository.delete(where);

  return response.json({ success: 'Excluído com sucesso!' });

});

export default permissoesRouter;
