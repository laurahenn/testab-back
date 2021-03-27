import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUsuarios1615641270766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "usuarios",
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment', // auto increment
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'senha',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'foto',
                        type: 'varchar',
                    },
                    {
                        name: 'permissao_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                      name: "ativo",
                      type: "boolean",
                      default: true,
                      isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            })
        ),
        await queryRunner.createForeignKey('usuarios', new TableForeignKey({
            columnNames: ['permissao_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'permissoes',
            // onDelete: 'SET NULL',
            // onUpdate: 'CASCADE',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("usuarios");
    }

}
