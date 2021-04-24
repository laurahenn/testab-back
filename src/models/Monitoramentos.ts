import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";

import TestesAB from "./TestesAB";

@Entity("monitoramentos")
class Monitoramentos {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  id_monitorado: string;

  @Column()
  formulario: boolean;

  @Column()
  formulario_sucesso: boolean;

  @Column()
  testeAB_id: number;

  @ManyToOne(() => TestesAB)
  @JoinColumn({ name: 'testeAB_id' })
  testeAB: TestesAB;
}

export default Monitoramentos;
