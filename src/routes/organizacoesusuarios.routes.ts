import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import OrganizacoesUsuariosRepository from '../repositories/OrganizacoesUsuariosRepository';
import CreateOrganizacoesUsuariosService from '../services/CreateOrganizacoesUsuariosService';

const organizacoesusuariosRouter = Router();

// listar
organizacoesusuariosRouter.get('/', async (request, response) => {
  const organizacoesusuariosRepository = getCustomRepository(OrganizacoesUsuariosRepository);
  const organizacoes_usuarios = await organizacoesusuariosRepository.find();

  return response.json(organizacoes_usuarios);
  // return response.json({ success: 'Sucesso lista' });
});

// novo registro
organizacoesusuariosRouter.post('/', async (request, response) => {
  const { organizacao_id, usuario_id } = request.body;

  const createOrganizacaoUsuario = new CreateOrganizacoesUsuariosService();
  const organizacao_usuario = await createOrganizacaoUsuario.execute({ organizacao_id, usuario_id });

  return response.json(organizacao_usuario);
});

// deletar
organizacoesusuariosRouter.delete('/', async (request, response) => {
  const { id } = request.body;

  const organizacaoUsuarioRepository = getCustomRepository(OrganizacoesUsuariosRepository);

  const where = {};
   if (id) where.id = id;

  await organizacaoUsuarioRepository.delete(where);

  return response.json({ success: 'Excluído com sucesso!' });
});

export default organizacoesusuariosRouter;
