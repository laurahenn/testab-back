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

testesRouter.delete('/', async (request, response) => {
  try {
    const { id } = request.body;

    const testeRepository = getCustomRepository(TestesRepository);
    const teste = await testeRepository.findOne({
      where: { id },
    });

    if (!teste) {
      throw new Error('Teste não encontrada');
    }

    await testeRepository.delete(teste);

    return response.status(200).json({ sucess: "Teste deletado com sucesso!" });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

testesRouter.get('/me', async (request, response) => {

  const testeRepository = getCustomRepository(TestesRepository);

  const { testeAB, identificacao } = request.body;

  const teste = await testeRepository.manager.query(`select tt.identificacao, tt.acessos from testes tt inner join "testesAB" t on(tt."testeAB_id" = t.id) where t.id = ${testeAB} and tt.identificacao = '${identificacao}';`);

  return response.json(teste);
});

export default testesRouter;
