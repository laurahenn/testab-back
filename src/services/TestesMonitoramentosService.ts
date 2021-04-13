import { getRepository, Timestamp } from 'typeorm'
import { hash } from 'bcryptjs'

import AppError from '../errors/AppError'
import Permissoes from '../models/Permissoes';

interface Request {
  titulo: string;
  admin: boolean;
}

class CreatePermissoesService {
  public async execute({ titulo, admin }: Request): Promise<Permissoes>{

    const permissoesRepository = getRepository(Permissoes);

    const permissao = permissoesRepository.create({ titulo, admin });

    await permissoesRepository.save(permissao);

    return permissao;
  }
}

export default CreatePermissoesService;
