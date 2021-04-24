import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Usuarios from '../models/Usuarios';
import Organizacoes from '../models/Organizacoes';

@Entity("organizacoes_usuarios")
class OrganizacoesUsuarios {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  organizacao_id: number;

  @ManyToOne(() => Organizacoes)
  @JoinColumn({ name: 'organizacao_id' })
  organizacao: Organizacoes;

  @Column()
  usuario_id: number;

  @ManyToOne(() => Usuarios)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuarios;

}

export default OrganizacoesUsuarios;
