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

organizacoesRouter.delete('/', async (request, response) => {
  try {
    const { id } = request.body;

    const organizacaoRepository = getCustomRepository(OrganizacoesRepository);
    const organizacao = await organizacaoRepository.findOne({
      where: { id },
    });

    if (!organizacao) {
      throw new Error('Organização não encontrado');
    }

    await organizacaoRepository.delete(organizacao);

    return response.status(200).json({ sucess: "Organização deletada com sucesso!" });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default organizacoesRouter;
