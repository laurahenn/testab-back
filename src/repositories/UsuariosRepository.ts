import { EntityRepository, Repository } from 'typeorm';

import Usuarios from '../models/Usuarios';

@EntityRepository(Usuarios)
class UsuariosRepository extends Repository<Usuarios> {

}

export default UsuariosRepository;
