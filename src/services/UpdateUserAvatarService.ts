import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import uploadConfig from "../config/upload";
import Usuarios from "../models/Usuarios";

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFilename,
  }: Request): Promise<Usuarios> {
    const usersRepository = getRepository(Usuarios);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error("Autentique-se para alterar sua Foto.");
    }

    if (user.foto) {
      if(user.foto != "perfil.jpg") {
        const userAvatarFilePath = path.join(uploadConfig.directory, user.foto);
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

        if (userAvatarFileExists) {
          await fs.promises.unlink(userAvatarFilePath);
        }
      }
    }

    user.foto = avatarFilename;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
