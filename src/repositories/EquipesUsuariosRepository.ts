import { EntityRepository, Repository } from 'typeorm';

import EquipesUsuarios from '../models/EquipesUsuarios';

@EntityRepository(EquipesUsuarios)
class EquipesUsuariosRepository extends Repository<EquipesUsuarios> {

}

export default EquipesUsuariosRepository;