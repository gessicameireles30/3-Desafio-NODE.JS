import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1728054381841 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table(
      {
        name: 'Users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(50)'
          },
          {
            name: 'cpf',
            type: 'int',
          },
          {
            name: 'birth',
            type: 'date',
          },
          {
            name: 'cep',
            type: 'int'
          },
          {
            name: 'email',
            type: 'varchar(50)'
          },
          {
            name: 'password',
            type: 'int'
          }

        ]
      }
    ))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }

}
