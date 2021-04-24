import { Router, json } from 'express';
import { getRepository } from 'typeorm'
import { getCustomRepository } from 'typeorm';

import EquipesUsuariosRepository from '../repositories/EquipesUsuariosRepository';
import CreateEquipesUsuariosService from '../services/CreateEquipesUsuariosService';

import Mail from "../mail/mail";

const equipesusuariosRouter = Router();

// listar
equipesusuariosRouter.get('/', async (request, response) => {
  const equipesusuariosRepository = getCustomRepository(EquipesUsuariosRepository);
  const equipes = await equipesusuariosRepository.find();

  return response.json(equipes);
  // return response.json({ success: 'Sucesso lista' });
});

// novo registro
equipesusuariosRouter.post('/', async (request, response) => {
  const { equipe_id, usuario_id } = request.body;

  const createEquipesUsuarios = new CreateEquipesUsuariosService();
  const equipe_usuario = await createEquipesUsuarios.execute({ equipe_id, usuario_id });

  return response.json(equipe_usuario);
});

// deletar
equipesusuariosRouter.delete('/', async (request, response) => {
  const { id } = request.body;

  const equipeUsuarioRepository = getCustomRepository(EquipesUsuariosRepository);

  // const where = {};
  //  if (id) where.id = id;

  // await equipeUsuarioRepository.delete(where);

  return response.json({ success: 'Excluído com sucesso!' });
});

export default equipesusuariosRouter;