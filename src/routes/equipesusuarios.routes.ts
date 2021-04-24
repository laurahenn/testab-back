import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import EquipesUsuariosRepository from '../repositories/EquipesUsuariosRepository';
import CreateEquipesUsuariosService from '../services/CreateEquipesUsuariosService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const equipesusuariosRouter = Router();

equipesusuariosRouter.use(ensureAuthenticated);

equipesusuariosRouter.get('/', async (request, response) => {
  const equipesusuariosRepository = getCustomRepository(EquipesUsuariosRepository);
  const equipes = await equipesusuariosRepository.find();

  return response.json(equipes);
});

equipesusuariosRouter.post('/', async (request, response) => {
  const { equipe_id, usuario_id } = request.body;

  const createEquipesUsuarios = new CreateEquipesUsuariosService();
  const equipe_usuario = await createEquipesUsuarios.execute({ equipe_id, usuario_id });

  return response.json(equipe_usuario);
});

export default equipesusuariosRouter;