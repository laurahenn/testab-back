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

export default organizacoesusuariosRouter;
