import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateMonitoramentosService from '../services/CreateMonitoramentosService';
import MonitoramentosRepository from '../repositories/MonitoramentosRepository';

import Mail from "../mail/mail";

const monitoramentosRouter = Router();

// listar todos
monitoramentosRouter.get('/', async (request, response) => {
  const testesABRepository = getCustomRepository(MonitoramentosRepository);

  const testesAB = await testesABRepository.find();
  return response.json(testesAB);
});

// novo registro
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

// Atualizando registro
// monitoramentosRouter.put('/', async(request, response) => {
//   const { user_id, nome, email, foto, permissao_id, ativo, senha_velha, senha } = request.body;

//   const updateUser = new TestesABService();

//   const usuario = await updateUser.execute({
//     user_id, nome, email, foto, permissao_id, ativo, senha_velha, senha
//   });

//   return response.json(usuario);
// });

// deletar
monitoramentosRouter.delete('/', async (request, response) => {
  const { id } = request.body;

  const usuarioRepository = getCustomRepository(MonitoramentosRepository);

  // const where = {};
  //  if (id) where.id = id;

  // await usuarioRepository.delete(where);

  return response.json({ success: 'Excluído com sucesso!' });
});

export default monitoramentosRouter;
