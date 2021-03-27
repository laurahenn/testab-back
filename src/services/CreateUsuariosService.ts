import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import AppError from '../errors/AppError'
import Usuarios from '../models/Usuarios'

interface Request {
  nome: string;
  email: string;
  senha: string;
  foto: string;
  permissao_id: number;
  ativo: boolean;
}

class CreateUsuariosService {
  public async execute({ nome, email, senha, foto, permissao_id, ativo }: Request): Promise<Usuarios>{
    const usuariosRepository = getRepository(Usuarios);

    const checkUserExists = await usuariosRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Login already used.')
    }

    const hashedPassword = await hash(senha, 6);

    const usuario = usuariosRepository.create({
      nome, email, foto, permissao_id, ativo,
      senha: hashedPassword,
    });
    await usuariosRepository.save(usuario);
    return usuario;
  }
}

export default CreateUsuariosService;
