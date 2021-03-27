import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Equipes from './Equipes';
import Usuarios from './Usuarios';
import { id } from "date-fns/locale";

@Entity("equipes_usuarios")
class EquipesUsuarios {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  equipe_id: string;

  @ManyToOne(() => Equipes)
  @JoinColumn({ name: 'equipe_id' })
  equipe: Equipes;

  @Column()
  usuario_id: string;

  @ManyToOne(() => Usuarios)
  @JoinColumn({ name: 'id' })
  usuario: Usuarios;
}

export default EquipesUsuarios;