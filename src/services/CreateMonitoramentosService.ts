import { getRepository } from 'typeorm'

import Monitoramentos from '../models/Monitoramentos';

interface Request {
  id_monitorado: string;
  formulario: boolean;
  formulario_sucesso: boolean;
  testeAB_id: number;
}

class CreateMonitoramentosService {
  public async execute({ id_monitorado, formulario, formulario_sucesso, testeAB_id }: Request): Promise<Monitoramentos>{
    
    const monitoramentosRepository = getRepository(Monitoramentos);

    const monitoramento = monitoramentosRepository.create({ 
      id_monitorado, formulario, formulario_sucesso, testeAB_id
    });

    await monitoramentosRepository.save(monitoramento);

    return monitoramento;
  }
}

export default CreateMonitoramentosService;
