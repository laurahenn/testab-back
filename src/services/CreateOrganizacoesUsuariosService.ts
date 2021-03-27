import { getRepository } from 'typeorm'

import OrganizacoesUsuarios from '../models/OrganizacoesUsuarios';

interface Request {
  organizacao_id: number,
  usuario_id: number,
}

class CreateOrganizacoesUsuariosService {
  public async execute({ organizacao_id, usuario_id }: Request): Promise<OrganizacoesUsuarios>{
    const organizacoesusuariosRepository = getRepository(OrganizacoesUsuarios);

    const organizacoesusuarios = organizacoesusuariosRepository.create({ organizacao_id, usuario_id });
    await organizacoesusuariosRepository.save(organizacoesusuarios);

    return organizacoesusuarios;
  }
}

export default CreateOrganizacoesUsuariosService;
