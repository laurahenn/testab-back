import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";

import Testes from './Testes';
import Monitoramentos from './Monitoramentos';

@Entity("testes_monitoramentos")
class TestesMonitoramentos {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  cliques: number;

  @Column()
  cliques_sucesso: number;

  @Column()
  teste_id: number;

  @ManyToOne(() => Testes)
  @JoinColumn({ name: 'teste_id' })
  teste: Testes;

  @Column()
  monitoramento_id: number;

  @ManyToOne(() => Monitoramentos)
  @JoinColumn({ name: 'monitoramento_id' })
  monitoramento: Monitoramentos;

}

export default TestesMonitoramentos;
