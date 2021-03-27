import { EntityRepository, Repository } from 'typeorm';

import Equipes from '../models/Equipes';

@EntityRepository(Equipes)
class EquipesRepository extends Repository<Equipes> {

}

export default EquipesRepository;