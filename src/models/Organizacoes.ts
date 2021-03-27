import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("organizacoes")
class Organizacoes {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  url: string;

}

export default Organizacoes;
