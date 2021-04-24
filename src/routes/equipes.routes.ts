import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import EquipesRepository from '../repositories/EquipesRepository';
import CreateEquipesService from '../services/CreateEquipesService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const equipesRouter = Router();

equipesRouter.use(ensureAuthenticated);

equipesRouter.get('/', async (request, response) => {
  const equipesRepository = getCustomRepository(EquipesRepository);
  const equipes = await equipesRepository.find();

  return response.json(equipes);
});

equipesRouter.post('/', async (request, response) => {
  try {
    const { titulo, descricao, organizacao_id } = request.body;

    const createEquipes = new CreateEquipesService();
    const equipe = await createEquipes.execute({
      titulo,
      descricao,
      organizacao_id
    });

    return response.json(equipe);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default equipesRouter;
