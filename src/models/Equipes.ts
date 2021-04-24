import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Organizacoes from '../models/Organizacoes';

@Entity("equipes")
class Equipes {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column()
  organizacao_id: number;

  @ManyToOne(() => Organizacoes)
  @JoinColumn({ name: 'organizacao_id' })
  organizacao: Organizacoes;
}

export default Equipes;
