import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import AppError from '../errors/AppError'
import authConfig from '../config/auth'
import Usuarios from '../models/Usuarios'

interface Request {
  email: string;
  senha: string;
}

interface Response {
  user: Usuarios;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, senha }: Request): Promise<Usuarios> {
    const usuariosRepository = getRepository(Usuarios);

    const user = await usuariosRepository.findOne({ where: { email } });

    if(!user) {
      throw new AppError('Combinação incorreta de e-mail/senha.', 401)
    }

    const senhaMatched = await compare(senha, user.senha);
    if(!senhaMatched) {
      throw new AppError('Combinação incorreta de e-mail/senha.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt;

    const user_id = user.id+'';

    const token = sign({}, secret, {
      subject: user_id,
      expiresIn,
    });

    return { user, token }
  }
}

export default AuthenticateUserService;
