import { getRepository } from 'typeorm'

import Testes from '../models/Testes';

interface Request {
  identificacao: string;
  acessos: number;
  testeAB_id: number;
}

class CreateTestesService {
  public async execute({ identificacao, acessos, testeAB_id }: Request): Promise<Testes>{

    const testesRepository = getRepository(Testes);

    const teste = testesRepository.create({ identificacao, acessos, testeAB_id });

    await testesRepository.save(teste);

    return teste;
  }
}

export default CreateTestesService;
