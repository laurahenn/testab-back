import { getRepository } from 'typeorm'

import TestesAB from '../models/TestesAB';

interface Request {
  titulo: string;
  data_inicio: Date;
  data_fim: Date;
  url: string;
  ativo: boolean;
  created_at: Date;
  organizacao_id: number;
}

class CreateTestesABService {
  public async execute({ titulo, data_inicio, data_fim, url, ativo, created_at, organizacao_id }: Request): Promise<TestesAB>{

    const permissoesRepository = getRepository(TestesAB);

    const permissao = permissoesRepository.create({ 
      titulo, data_inicio, data_fim, url, ativo, created_at, organizacao_id 
    });

    await permissoesRepository.save(permissao);

    return permissao;
  }
}

export default CreateTestesABService;
