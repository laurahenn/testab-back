import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateEquipesUsuarios1615641320090 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "equipes_usuarios",
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
                        name: 'equipe_id',
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
            'equipes_usuarios', new TableForeignKey({
                columnNames: ['equipe_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'equipes',
            })
        ),
        await queryRunner.createForeignKey(
            'equipes_usuarios', new TableForeignKey({
                columnNames: ['usuario_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("equipes_usuarios");
    }

}
