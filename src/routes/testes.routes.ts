import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateTestesService from '../services/CreateTestesService';
import TestesRepository from '../repositories/TestesRepository';

import Mail from "../mail/mail";

const testesRouter = Router();

// listar todos
testesRouter.get('/', async (request, response) => {
  const testesRepository = getCustomRepository(TestesRepository);

  const testes = await testesRepository.find();
  return response.json(testes);
});

// novo registro
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

// Atualizando registro
// testesRouter.put('/', async(request, response) => {
//   const { user_id, nome, email, foto, permissao_id, ativo, senha_velha, senha } = request.body;

//   const updateUser = new TestesService();

//   const usuario = await updateUser.execute({
//     user_id, nome, email, foto, permissao_id, ativo, senha_velha, senha
//   });

//   return response.json(usuario);
// });

// deletar
testesRouter.delete('/', async (request, response) => {
  const { id } = request.body;

  const usuarioRepository = getCustomRepository(TestesRepository);

  // const where = {};
  //  if (id) where.id = id;

  // await usuarioRepository.delete(where);

  return response.json({ success: 'Excluído com sucesso!' });
});

export default testesRouter;
