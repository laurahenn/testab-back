import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrganizacoesUsuarios1615641291201 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "organizacoes_usuarios",
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
                        name: 'organizacao_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'usuario_id',
                        type: 'integer',
                        isNullable: false,
                    },
                ]
            })
        ),
        await queryRunner.createForeignKey(
            'organizacoes_usuarios', new TableForeignKey({
                columnNames: ['organizacao_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'organizacoes',
            })
        ),
        await queryRunner.createForeignKey(
            'organizacoes_usuarios', new TableForeignKey({
                columnNames: ['usuario_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("organizacoes_usuarios");
    }

}
