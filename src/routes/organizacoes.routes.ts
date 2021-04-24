import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import OrganizacoesRepository from '../repositories/OrganizacoesRepository';
import CreateOrganizacoesService from '../services/CreateOrganizacoesService';

const organizacoesRouter = Router();

// listar
organizacoesRouter.get('/', async (request, response) => {
  const organizacoesRepository = getCustomRepository(OrganizacoesRepository);
  const organizacoes = await organizacoesRepository.find();

  return response.json(organizacoes);
  // return response.json({ success: 'Sucesso lista' });
});

// novo registro
organizacoesRouter.post('/', async (request, response) => {
  const { nome, descricao, url } = request.body;

  const createOrganizacao = new CreateOrganizacoesService();
  const organizacao = await createOrganizacao.execute({ nome, descricao, url });

  return response.json(organizacao);
});

// deletar
organizacoesRouter.delete('/', async (request, response) => {
  const { id } = request.body;

  const organizacoesRepository = getCustomRepository(OrganizacoesRepository);

  // const where = {};
  //  if (id) where.id = id;

  // await organizacoesRepository.delete(where);

  return response.json({ success: 'Excluído com sucesso!' });
});

export default organizacoesRouter;
