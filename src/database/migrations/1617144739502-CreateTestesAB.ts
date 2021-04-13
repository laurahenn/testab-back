import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTestesAB1617144739502 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "testesAB",
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
                        name: "data_inicio",
                        type: "date",
                        default: "now()",
                        isNullable: false,
                    },
                    {
                        name: "data_fim",
                        type: "date",
                        isNullable: false,
                    },
                    {
                        name: 'url',
                        type: 'varchar',
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
                        name: 'organizacao_id',
                        type: 'integer',
                        isNullable: false,
                    },

                ]
            })
        ),
        await queryRunner.createForeignKey(
            'testesAB', new TableForeignKey({
                columnNames: ['organizacao_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'organizacoes',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("testesAB");
    }

}
