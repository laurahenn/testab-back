import { getRepository } from 'typeorm'

import EquipesUsuarios from '../models/EquipesUsuarios';

interface Request {
  equipe_id: string;
  usuario_id: string;
}

class CreateEquipesUsuariosService {
  public async execute({ equipe_id, usuario_id }: Request): Promise<EquipesUsuarios>{
    const equipesusuariossRepository = getRepository(EquipesUsuarios);

    const equipesusuarios = equipesusuariossRepository.create({ equipe_id, usuario_id });
    await equipesusuariossRepository.save(equipesusuarios);

    return equipesusuarios;
  }
}

export default CreateEquipesUsuariosService;
