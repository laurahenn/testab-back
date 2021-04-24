import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import OrganizacoesRepository from '../repositories/OrganizacoesRepository';
import CreateOrganizacoesService from '../services/CreateOrganizacoesService';

const organizacoesRouter = Router();

organizacoesRouter.get('/', async (request, response) => {
  const organizacoesRepository = getCustomRepository(OrganizacoesRepository);
  const organizacoes = await organizacoesRepository.find();

  return response.json(organizacoes);
});

organizacoesRouter.post('/', async (request, response) => {
  const { nome, descricao, url } = request.body;

  const createOrganizacao = new CreateOrganizacoesService();
  const organizacao = await createOrganizacao.execute({ nome, descricao, url });

  return response.json(organizacao);
});

export default organizacoesRouter;
