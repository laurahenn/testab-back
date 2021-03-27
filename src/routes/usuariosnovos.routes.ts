import { Router } from 'express';
import CreateUsuariosService from '../services/CreateUsuariosService';
import Mail from "../mail/mail";

const usuariosnovosRouter = Router();

// novo registro
usuariosnovosRouter.post('/', async (request, response) => {
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


export default usuariosnovosRouter;
