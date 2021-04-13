import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";

import Organizacoes from "./Organizacoes";

@Entity("testesAB")
class TestesAB {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  titulo: string;

  @Column()
  data_inicio: Date;

  @Column()
  data_fim: Date;

  @Column()
  url: string;

  @Column()
  ativo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  organizacao_id: number;

  @ManyToOne(() => Organizacoes)
  @JoinColumn({ name: 'organizacao_id' })
  organizacao: Organizacoes;
}

export default TestesAB;
