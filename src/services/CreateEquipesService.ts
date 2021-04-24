import { getRepository } from 'typeorm'

import Equipes from '../models/Equipes';

interface Request {
  titulo: string;
  descricao: string;
  organizacao_id: number;
}

class CreateEquipesService {
  public async execute({ titulo, descricao, organizacao_id }: Request): Promise<Equipes>{
    const equipesRepository = getRepository(Equipes);

    const equipe = equipesRepository.create({ titulo, descricao, organizacao_id });
    await equipesRepository.save(equipe);

    return equipe;
  }
}

export default CreateEquipesService;
