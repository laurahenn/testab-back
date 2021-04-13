import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTestes1617144749573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "testes",
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
                        name: 'identificacao',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'acessos',
                        type: 'integer',
                    },
                    {
                        name: 'testeAB_id',
                        type: 'integer',
                        isNullable: false,
                    }
                ]
            })
        ),
        await queryRunner.createForeignKey('testes', new TableForeignKey({
            columnNames: ['testeAB_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'testesAB',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("testes");
    }

}
