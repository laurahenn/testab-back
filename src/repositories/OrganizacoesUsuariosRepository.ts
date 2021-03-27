import { EntityRepository, Repository } from 'typeorm';

import OrganizacoesUsuarios from '../models/OrganizacoesUsuarios';

@EntityRepository(OrganizacoesUsuarios)
class OrganizacoesUsuariosRepository extends Repository<OrganizacoesUsuarios> {

}

export default OrganizacoesUsuariosRepository;
