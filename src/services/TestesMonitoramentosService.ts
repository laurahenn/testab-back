import { getRepository } from 'typeorm'

import TestesMonitoramentos from '../models/TestesMonitoramentos';

interface Request {
  cliques: number;
  cliques_sucesso: number;
  teste_id: number;
  monitoramento_id: number;
}

class CreateTestesMonitoramentosService {
  public async execute({ cliques, cliques_sucesso, teste_id, monitoramento_id }: Request): Promise<TestesMonitoramentos>{

    const testesMonitoramentosRepository = getRepository(TestesMonitoramentos);

    const permissao = testesMonitoramentosRepository.create({ cliques, cliques_sucesso, teste_id, monitoramento_id });

    await testesMonitoramentosRepository.save(permissao);

    return permissao;
  }
}

export default CreateTestesMonitoramentosService;
