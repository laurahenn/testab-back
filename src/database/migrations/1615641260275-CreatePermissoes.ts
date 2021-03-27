import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePermissoes1615641260275 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "permissoes",
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
                      name: "admin",
                      type: "boolean",
                      default: false,
                      isNullable: false,
                    },
                ]
            })
        )
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("permissoes");
    }

}
