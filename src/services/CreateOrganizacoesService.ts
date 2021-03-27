import { getRepository } from 'typeorm'

import AppError from '../errors/AppError'
import Organizacoes from '../models/Organizacoes';

interface Request {
  nome: string;
  descricao: string;
  url: string;
}

class CreateOrganizacoesService {
  public async execute({ nome, descricao, url }: Request): Promise<Organizacoes>{
    const eventosRepository = getRepository(Organizacoes);

    const organizacoes = eventosRepository.create({ nome, descricao, url });
    await eventosRepository.save(organizacoes);

    return organizacoes;
  }
}

export default CreateOrganizacoesService;
