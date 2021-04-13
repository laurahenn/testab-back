import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";

import TestesAB from './TestesAB';

@Entity("testes")
class Testes {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  identificacao: string;

  @Column()
  acessos: number;

  @Column()
  testeAB_id: number;

  @ManyToOne(() => TestesAB)
  @JoinColumn({ name: 'testeAB_id' })
  testeAB: TestesAB;

  @Column()
  ativo: boolean;

}

export default Testes;
