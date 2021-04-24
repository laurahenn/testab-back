import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TestesMonitoramentosService from '../services/TestesMonitoramentosService';
import TestesMonitoramentosRepository from '../repositories/TestesMonitoramentosRepository';

const testesMonitoramentosRouter = Router();

testesMonitoramentosRouter.get('/', async (request, response) => {
  const testesMonitoramentosRepository = getCustomRepository(TestesMonitoramentosRepository);

  const testes_monitoramentos = await testesMonitoramentosRepository.find();
  return response.json(testes_monitoramentos);
});

testesMonitoramentosRouter.post('/', async (request, response) => {
  try {
    
    const { cliques, cliques_sucesso, teste_id, monitoramento_id } = request.body;

    const createUser = new TestesMonitoramentosService();

    const usuario = await createUser.execute({
      cliques, cliques_sucesso, teste_id, monitoramento_id
    });

    return response.json(usuario);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default testesMonitoramentosRouter;
