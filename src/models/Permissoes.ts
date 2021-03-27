import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("permissoes")
class Permissoes {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  titulo: string;

  @Column()
  admin: boolean;
}

export default Permissoes;
