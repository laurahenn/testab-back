import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";

import Permissoes from '../models/Permissoes';

@Entity("usuarios")
class Usuarios {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  foto: string;

  @Column()
  permissao_id: number;

  @ManyToOne(() => Permissoes)
  @JoinColumn({ name: 'permissao_id' })
  permissao: Permissoes;

  @Column()
  ativo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Usuarios;
