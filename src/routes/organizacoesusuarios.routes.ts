import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import OrganizacoesUsuariosRepository from '../repositories/OrganizacoesUsuariosRepository';
import CreateOrganizacoesUsuariosService from '../services/CreateOrganizacoesUsuariosService';

const organizacoesusuariosRouter = Router();

organizacoesusuariosRouter.get('/', async (request, response) => {
  const organizacoesusuariosRepository = getCustomRepository(OrganizacoesUsuariosRepository);
  const organizacoes_usuarios = await organizacoesusuariosRepository.find();

  return response.json(organizacoes_usuarios);
});

organizacoesusuariosRouter.post('/', async (request, response) => {
  const { organizacao_id, usuario_id } = request.body;

  const createOrganizacaoUsuario = new CreateOrganizacoesUsuariosService();
  const organizacao_usuario = await createOrganizacaoUsuario.execute({ organizacao_id, usuario_id });

  return response.json(organizacao_usuario);
});

organizacoesusuariosRouter.delete('/', async (request, response) => {
  try {
    const { id } = request.body;

    const organizacaousuarioRepository = getCustomRepository(OrganizacoesUsuariosRepository);
    const organizacao_usuario = await organizacaousuarioRepository.findOne({
      where: { id },
    });

    if (!organizacao_usuario) {
      throw new Error('Usuário da organização não encontrado');
    }

    await organizacaousuarioRepository.delete(organizacao_usuario);

    return response.status(200).json({ sucess: "Usuário da organização deletado com sucesso!" });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default organizacoesusuariosRouter;
