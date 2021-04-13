import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateMonitoramentos1617144756951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "monitoramentos",
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
                        name: 'id_monitoramento',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: "formulario",
                        type: "boolean",
                        default: false,
                        isNullable: false,
                    },
                    {
                        name: "formulario_sucesso",
                        type: "boolean",
                        default: false,
                        isNullable: false,
                    },
                    {
                        name: 'testeAB_id',
                        type: 'integer',
                        isNullable: false,
                    },

                ]
            })
        ),
        await queryRunner.createForeignKey(
            'monitoramentos', new TableForeignKey({
                columnNames: ['testeAB_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'testesAB',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("monitoramentos");
    }

}
