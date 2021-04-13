import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTestesMonitoramentos1617144762017 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "testes_monitoramentos",
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
                        name: 'cliques',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'cliques_sucesso',
                        type: 'integer',
                    },
                    {
                        name: 'teste_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'monitoramento_id',
                        type: 'integer',
                        isNullable: false,
                    },
                ]
            })
        ),
        await queryRunner.createForeignKey(
            'testes_monitoramentos', new TableForeignKey({
                columnNames: ['teste_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'testes',
            })
        ),
        await queryRunner.createForeignKey(
            'testes_monitoramentos', new TableForeignKey({
                columnNames: ['monitoramento_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'monitoramentos',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("testes_monitoramentos");
    }

}
