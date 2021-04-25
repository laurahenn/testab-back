import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateMonitoramentosService from '../services/CreateMonitoramentosService';
import MonitoramentosRepository from '../repositories/MonitoramentosRepository';

const monitoramentosRouter = Router();

monitoramentosRouter.get('/', async (request, response) => {
  const testesABRepository = getCustomRepository(MonitoramentosRepository);

  const testesAB = await testesABRepository.find();
  return response.json(testesAB);
});

monitoramentosRouter.post('/', async (request, response) => {
  try {

    const { id_monitorado, formulario, formulario_sucesso, testeAB_id } = request.body;

    const createUser = new CreateMonitoramentosService();

    const usuario = await createUser.execute({
      id_monitorado, formulario, formulario_sucesso, testeAB_id
    });

    return response.json(usuario);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

monitoramentosRouter.delete('/', async (request, response) => {
  try {
    const { id } = request.body;

    const monitoramentoRepository = getCustomRepository(MonitoramentosRepository);
    const monitoramento = await monitoramentoRepository.findOne({
      where: { id },
    });

    if (!monitoramento) {
      throw new Error('Monitoramento não encontrado');
    }

    await monitoramentoRepository.delete(monitoramento);

    return response.status(200).json({ sucess: "Monitoramento deletado com sucesso!" });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default monitoramentosRouter;
