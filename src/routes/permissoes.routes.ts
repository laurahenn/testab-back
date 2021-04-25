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

permissoesRouter.delete('/', async (request, response) => {
  try {
    const { id } = request.body;

    const permissoesRepository = getCustomRepository(PermissoesRepository);
    const permissao = await permissoesRepository.findOne({
      where: { id },
    });

    if (!permissao) {
      throw new Error('Permissão não encontrada');
    }

    await permissoesRepository.delete(permissao);

    return response.status(200).json({ sucess: "Permissão deletada com sucesso!" });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default permissoesRouter;
