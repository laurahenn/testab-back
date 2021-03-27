import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'

import { hash } from 'bcryptjs'

import AppError from '../errors/AppError'
import Usuarios from '../models/Usuarios'

interface Request {
  user_id: number;
  nome: string;
  email: string;
  foto: string;
  ativo: boolean;
  permissao_id: number;

  senha_velha: string;
  senha: string;
}

class UpdateUsuariosService {
  public async execute({ user_id, nome, email, foto, permissao_id, ativo, senha_velha, senha }: Request): Promise<Usuarios>
  {
    const usersRepository = getRepository(Usuarios);

    const id = user_id;
    const usuario = await usersRepository.findOne({
      where: { id },
    });

    if (!usuario) {
      throw new AppError('Usuario não encontrado');
    }

    if (senha && !senha_velha) {
      throw new AppError(
        'Você precisa informar a senha antiga para definir uma nova senha.',
      );
    }

    if (senha && senha_velha) {
      const checkOldPassword = await compare(senha_velha, usuario.senha);
      if (!checkOldPassword) {
        throw new AppError('A senha antiga não corresponde.');
      }

      usuario.nome = nome;
      usuario.email = email;
      usuario.foto = foto;
      usuario.permissao_id = permissao_id;
      usuario.ativo = ativo;
      usuario.senha = await hash(senha, 8);
    }

    await usersRepository.save(usuario);
    return usuario;
  }
}

export default UpdateUsuariosService;
// Quando ta caindo nos throw new AppError fica em loop e buga
