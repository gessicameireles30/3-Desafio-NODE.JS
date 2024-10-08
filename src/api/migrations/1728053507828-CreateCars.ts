import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1728053507828 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',

        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int'
          },
          {
            name: 'model',
            type: 'varchar(50)',

          },
          {
            name: 'color',
            type: 'varchar(30)'
          },

          {
            name: 'year',
            type: 'int'
          },
          {
            name: 'valuePerDay',
            type: 'int'
          },
          {
            name: 'acessories',
            type: 'varchar(30)'
          },
          {
            name: 'numberOfPassengers',
            type: 'int'
          }
        ]

      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars')
  }

}
