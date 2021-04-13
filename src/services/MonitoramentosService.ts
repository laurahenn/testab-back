import { getRepository, Timestamp } from 'typeorm'
import { hash } from 'bcryptjs'

import AppError from '../errors/AppError'
import Monitoramentos from '../models/Monitoramentos';

interface Request {
  id_monitoramento: string;
  formulario: boolean;
  formulario_sucesso: boolean;
  testeAB_id: number;
}

class CreateMonitoramentosService {
  public async execute({ id_monitoramento, formulario, formulario_sucesso, testeAB_id }: Request): Promise<Monitoramentos>{
    
    const monitoramentosRepository = getRepository(Monitoramentos);

    const monitoramento = monitoramentosRepository.create({ 
      id_monitoramento, formulario, formulario_sucesso, testeAB_id
    });

    await monitoramentosRepository.save(monitoramento);

    return monitoramento;
  }
}

export default CreateMonitoramentosService;
