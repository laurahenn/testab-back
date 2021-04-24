import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateUsuariosService from '../services/CreateUsuariosService';
import UpdateUserService from '../services/UpdateUsuariosService';
import UsuariosRepository from '../repositories/UsuariosRepository';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import Mail from "../mail/mail";

const usuariosRouter = Router();

usuariosRouter.use(ensureAuthenticated);

usuariosRouter.get('/', async (request, response) => {
  const usuariosRepository = getCustomRepository(UsuariosRepository);

  const usuarios = await usuariosRepository.find();
  return response.json(usuarios);
});

usuariosRouter.post('/', async (request, response) => {
  try {
    
    const { nome, email, senha, foto, permissao_id, ativo } = request.body;

    const createUser = new CreateUsuariosService();

    const usuario = await createUser.execute({
      nome, email, senha, foto, permissao_id, ativo
    });

    // delete usuario.senha; // ???  

    /* E-MAIL */
    // Mail.to = email;
    // Mail.subject = 'Bem vindo ao X [Novo Usuário]';
    // Mail.message = 'Adoramos te ver aqui, espero que curta muitos eventos. <br> Abraços';
    // let result = Mail.sendMail();

    return response.json(usuario);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usuariosRouter.put('/', async(request, response) => {
  const { user_id, nome, email, foto, permissao_id, ativo, senha_velha, senha } = request.body;

  const updateUser = new UpdateUserService();

  const usuario = await updateUser.execute({
    user_id, nome, email, foto, permissao_id, ativo, senha_velha, senha
  });

  return response.json(usuario);
});

export default usuariosRouter;
