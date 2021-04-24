import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TestesMonitoramentosService from '../services/TestesMonitoramentosService';
import TestesMonitoramentosRepository from '../repositories/TestesMonitoramentosRepository';

import Mail from "../mail/mail";

const testesMonitoramentosRouter = Router();

// listar todos
testesMonitoramentosRouter.get('/', async (request, response) => {
  const testesMonitoramentosRepository = getCustomRepository(TestesMonitoramentosRepository);

  const testes_monitoramentos = await testesMonitoramentosRepository.find();
  return response.json(testes_monitoramentos);
});

// novo registro
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

// Atualizando registro
// testesMonitoramentosRouter.put('/', async(request, response) => {
//   const { user_id, nome, email, foto, permissao_id, ativo, senha_velha, senha } = request.body;

//   const updateUser = new TestesMonitoramentosService();

//   const usuario = await updateUser.execute({
//     user_id, nome, email, foto, permissao_id, ativo, senha_velha, senha
//   });

//   return response.json(usuario);
// });

// deletar
testesMonitoramentosRouter.delete('/', async (request, response) => {
  const { id } = request.body;

  const usuarioRepository = getCustomRepository(TestesMonitoramentosRepository);

  // const where = {};
  //  if (id) where.id = id;

  // await usuarioRepository.delete(where);

  return response.json({ success: 'Excluído com sucesso!' });
});

export default testesMonitoramentosRouter;
