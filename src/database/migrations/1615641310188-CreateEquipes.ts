import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateEquipes1615641310188 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "equipes",
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
                        name: 'titulo',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'organizacao_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            })
        ), 
        await queryRunner.createForeignKey(
            'equipes', new TableForeignKey({
                columnNames: ['organizacao_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'organizacoes',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("equipes");
    }

}
