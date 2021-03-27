import { EntityRepository, Repository } from 'typeorm';

import Organizacoes from '../models/Organizacoes';

@EntityRepository(Organizacoes)
class OrganizacoesRepository extends Repository<Organizacoes> {

}

export default OrganizacoesRepository;
