import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateTestesABService from '../services/CreateTestesABService';
import TestesABRepository from '../repositories/TestesABRepository';

import Mail from "../mail/mail";

const testesABRouter = Router();

// listar todos
testesABRouter.get('/', async (request, response) => {
  const testesABRepository = getCustomRepository(TestesABRepository);

  const testesAB = await testesABRepository.find();
  return response.json(testesAB);
});

// novo registro
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

// Atualizando registro
// testesABRouter.put('/', async(request, response) => {
//   const { user_id, nome, email, foto, permissao_id, ativo, senha_velha, senha } = request.body;

//   const updateUser = new TestesABService();

//   const usuario = await updateUser.execute({
//     user_id, nome, email, foto, permissao_id, ativo, senha_velha, senha
//   });

//   return response.json(usuario);
// });

// deletar
testesABRouter.delete('/', async (request, response) => {
  const { id } = request.body;

  const usuarioRepository = getCustomRepository(TestesABRepository);

  // const where = {};
  //  if (id) where.id = id;

  // await usuarioRepository.delete(where);

  return response.json({ success: 'Excluído com sucesso!' });
});

export default testesABRouter;
