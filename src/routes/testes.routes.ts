import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateTestesService from '../services/CreateTestesService';
import TestesRepository from '../repositories/TestesRepository';

const testesRouter = Router();

testesRouter.get('/', async (request, response) => {
  const testesRepository = getCustomRepository(TestesRepository);

  const testes = await testesRepository.find();
  return response.json(testes);
});

testesRouter.post('/', async (request, response) => {
  try {
    
    const { identificacao, acessos, testeAB_id } = request.body;

    const createUser = new CreateTestesService();

    const usuario = await createUser.execute({
      identificacao, acessos, testeAB_id
    });

    return response.json(usuario);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default testesRouter;
