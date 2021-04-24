import { Router, json } from 'express';
import { getRepository } from 'typeorm'
import { getCustomRepository } from 'typeorm';

import EquipesRepository from '../repositories/EquipesRepository';
import CreateEquipesService from '../services/CreateEquipesService';

import Mail from "../mail/mail";

const equipesRouter = Router();

// listar
equipesRouter.get('/', async (request, response) => {
  const equipesRepository = getCustomRepository(EquipesRepository);
  const equipes = await equipesRepository.find();

  return response.json(equipes);
  // return response.json({ success: 'Sucesso lista' });
});

// novo registro
equipesRouter.post('/', async (request, response) => {
  const { titulo, descricao, organizacao_id } = request.body;

  const createEquipes = new CreateEquipesService();
  const equipe = await createEquipes.execute({ titulo, descricao, organizacao_id });

  return response.json(equipe);
});

// deletar
equipesRouter.delete('/', async (request, response) => {
  const { id } = request.body;

  const equipeRepository = getCustomRepository(EquipesRepository);

  // const where = {};
  //  if (id) where.id = id;

  // await equipeRepository.delete(where);

  return response.json({ success: 'Excluído com sucesso!' });
});

export default equipesRouter;