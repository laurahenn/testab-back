import { Router } from "express";
import multer from "multer";
import { getCustomRepository, useContainer } from "typeorm";
import uploadConfig from "../config/upload";

import CreateUsuariosService from "../services/CreateUsuariosService";
import UpdateUserService from "../services/UpdateUsuariosService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import UsuariosRepository from "../repositories/UsuariosRepository";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import Mail from "../mail/mail";

const usuariosRouter = Router();
const upload = multer(uploadConfig);

usuariosRouter.get("/", async (request, response) => {
  const usuariosRepository = getCustomRepository(UsuariosRepository);

  const usuarios = await usuariosRepository.find();
  return response.json(usuarios);
});

usuariosRouter.post("/", async (request, response) => {
  try {
    const { nome, email, senha, foto, permissao_id, ativo } = request.body;

    const createUser = new CreateUsuariosService();

    const usuario = await createUser.execute({
      nome,
      email,
      senha,
      foto,
      permissao_id,
      ativo,
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

usuariosRouter.use(ensureAuthenticated).put("/", async (request, response) => {
  const {
    user_id,
    nome,
    email,
    foto,
    permissao_id,
    ativo,
    senha_velha,
    senha,
  } = request.body;

  const updateUser = new UpdateUserService();

  const usuario = await updateUser.execute({
    user_id,
    nome,
    email,
    foto,
    permissao_id,
    ativo,
    senha_velha,
    senha,
  });

  return response.json(usuario);
});

usuariosRouter.use(ensureAuthenticated).patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("foto"),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      return response.json({ user });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);

usuariosRouter.use(ensureAuthenticated).delete('/', async (request, response) => {
  try {
    const { id } = request.body;

    const usuariosRepository = getCustomRepository(UsuariosRepository);
    const usuario = await usuariosRepository.findOne({
      where: { id },
    });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    usuario.ativo = false;
    await usuariosRepository.save(usuario);

    return response.status(200).json({ sucess: "Usuário desativado com sucesso!", usuario });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usuariosRouter;
