import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateTestesABService from '../services/CreateTestesABService';
import TestesABRepository from '../repositories/TestesABRepository';

const testesABRouter = Router();

testesABRouter.get('/', async (request, response) => {
  const testesABRepository = getCustomRepository(TestesABRepository);

  const testesAB = await testesABRepository.find();
  return response.json(testesAB);
});

testesABRouter.post('/', async (request, response) => {
  try {

    const { titulo, data_inicio, data_fim, url, ativo, created_at, organizacao_id } = request.body;

    const createUser = new CreateTestesABService();

    const usuario = await createUser.execute({
      titulo, data_inicio, data_fim, url, ativo, created_at, organizacao_id
    });

    return response.json(usuario);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

testesABRouter.delete('/', async (request, response) => {
  try {
    const { id } = request.body;

    const testeABRepository = getCustomRepository(TestesABRepository);
    const testeAB = await testeABRepository.findOne({
      where: { id },
    });

    if (!testeAB) {
      throw new Error('Teste AB não encontrada');
    }

    await testeABRepository.delete(testeAB);

    return response.status(200).json({ sucess: "Teste AB deletado com sucesso!" });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default testesABRouter;
