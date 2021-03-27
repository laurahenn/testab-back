import { EntityRepository, Repository } from 'typeorm';

import Permissoes from '../models/Permissoes';

@EntityRepository(Permissoes)
class PermissoesRepository extends Repository<Permissoes> {

}

export default PermissoesRepository;
