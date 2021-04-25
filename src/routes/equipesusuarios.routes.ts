import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import EquipesUsuariosRepository from '../repositories/EquipesUsuariosRepository';
import CreateEquipesUsuariosService from '../services/CreateEquipesUsuariosService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import equipesRouter from './equipes.routes';
import EquipesRepository from '../repositories/EquipesRepository';

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

equipesusuariosRouter.delete('/', async (request, response) => {
  try {
    const { id } = request.body;

    const equipesusuariosRepository = getCustomRepository(EquipesUsuariosRepository);
    const equipe_usuario = await equipesusuariosRepository.findOne({
      where: { id },
    });

    if (!equipe_usuario) {
      throw new Error('Usuário da equipe não encontrado');
    }

    await equipesusuariosRepository.delete(equipe_usuario);

    return response.status(200).json({ sucess: "Usuário da equipe deletado com sucesso!" });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default equipesusuariosRouter;
